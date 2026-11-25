import { createTransport } from "nodemailer";
import { common, services } from "@/lib/content";
import { siteConfig } from "@/lib/seo";

export const runtime = "nodejs";

const limits = { name: 100, phone: 40, email: 254, service: 40, details: 4000 };
const maxRequestBytes = 20_000;
const retryWindowMs = 24 * 60 * 60 * 1000;
const deliveries = new Map<string, { expiresAt: number; sent: Promise<void> }>();
let windowEndsAt = 0;
let attempts = 0;

function responseHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get("origin");
  const allowedOrigin = process.env.CONTACT_ALLOWED_ORIGIN;
  if (!origin || origin !== allowedOrigin) return { Vary: "Origin" };

  return {
    Vary: "Origin",
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export function OPTIONS(request: Request) {
  return new Response(null, { status: 204, headers: responseHeaders(request) });
}

export async function POST(request: Request) {
  const headers = responseHeaders(request);
  const fail = (status: number) => Response.json({ ok: false }, { status, headers });
  const origin = request.headers.get("origin");
  const trustedOrigins = [
    new URL(request.url).origin,
    siteConfig.url,
    process.env.CONTACT_ALLOWED_ORIGIN,
  ];

  if (origin && !trustedOrigins.includes(origin)) return fail(403);
  if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
    return fail(415);
  }
  if (Number(request.headers.get("content-length")) > maxRequestBytes) return fail(413);

  let submitted: Record<string, unknown>;
  try {
    const reader = request.body?.getReader();
    if (!reader) return fail(400);
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxRequestBytes) {
        await reader.cancel().catch(() => {});
        return fail(413);
      }
      chunks.push(value);
    }
    const parsed: unknown = JSON.parse(Buffer.concat(chunks, size).toString("utf8"));
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return fail(400);
    submitted = parsed as Record<string, unknown>;
  } catch {
    return fail(400);
  }

  if (submitted.website) return fail(400);

  const fields = { name: "", phone: "", email: "", service: "", details: "" };
  for (const field of Object.keys(fields) as (keyof typeof fields)[]) {
    const supplied = submitted[field];
    if (typeof supplied !== "string") return fail(400);
    const value = supplied.trim();
    if (!value || value.length > limits[field]) return fail(400);
    fields[field] = value;
  }

  const service = services.find(({ slug }) => slug === fields.service);
  const requestId = submitted.requestId;
  if (
    !service ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email) ||
    !/^[+()\d٠-٩۰-۹ .-]{6,40}$/.test(fields.phone) ||
    typeof requestId !== "string" ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(requestId)
  ) return fail(400);

  const host = process.env.CONTACT_SMTP_HOST;
  const user = process.env.CONTACT_SMTP_USER;
  const pass = process.env.CONTACT_SMTP_PASSWORD;
  if (!host || !user || !pass) return fail(503);

  const now = Date.now();
  if (now >= windowEndsAt) {
    windowEndsAt = now + 60_000;
    attempts = 0;
    for (const [id, delivery] of deliveries) {
      if (delivery.expiresAt <= now) deliveries.delete(id);
    }
  }

  const existingDelivery = deliveries.get(requestId);
  if (existingDelivery) {
    try {
      await existingDelivery.sent;
      return Response.json({ ok: true }, { headers });
    } catch {
      return fail(502);
    }
  }

  if (attempts >= 20) {
    return Response.json({ ok: false }, {
      status: 429,
      headers: { ...headers, "Retry-After": String(Math.ceil((windowEndsAt - now) / 1000)) },
    });
  }
  attempts += 1;

  const transporter = createTransport({
    host,
    port: 465,
    secure: true,
    auth: { user, pass },
    dnsTimeout: 5000,
    connectionTimeout: 5000,
    greetingTimeout: 5000,
    socketTimeout: 10000,
  });

  const sent = transporter.sendMail({
    from: { name: "Frey-M Website", address: user },
    to: process.env.CONTACT_TO_EMAIL || common.email,
    replyTo: { name: fields.name, address: fields.email },
    subject: `Frey-M website enquiry | ${service.title.en}`,
    text: [
      `Name: ${fields.name}`,
      `Phone: ${fields.phone}`,
      `Email: ${fields.email}`,
      `Service: ${service.title.ar} / ${service.title.en}`,
      "",
      fields.details,
    ].join("\n"),
  }).then((info) => {
    if (!info.accepted.length) throw new Error("SMTP rejected the contact recipient");
  });

  deliveries.set(requestId, { expiresAt: now + retryWindowMs, sent });
  try {
    await sent;
    return Response.json({ ok: true }, { headers });
  } catch {
    deliveries.delete(requestId);
    console.error("SMTP contact request could not complete");
    return fail(502);
  }
}
