"use client";

import { ChevronDown, Send } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { T, useLocalized } from "@/components/preferences";
import { common, localize, services } from "@/lib/content";

type Status = "idle" | "sending" | "sent" | "error" | "busy";

export function ContactForm({ title = true }: { title?: boolean }) {
  const text = useLocalized();
  const [status, setStatus] = useState<Status>("idle");
  const serviceRef = useRef<HTMLSelectElement>(null);
  const submitting = useRef(false);
  const requestId = useRef<{ body: string; id: string } | null>(null);

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("service");
    if (requested && serviceRef.current && services.some((service) => service.slug === requested)) {
      serviceRef.current.value = requested;
    }
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;

    const form = event.currentTarget;
    const fields = Object.fromEntries(new FormData(form));
    const body = JSON.stringify(fields);
    submitting.current = true;
    setStatus("sending");

    try {
      if (requestId.current?.body !== body) {
        requestId.current = { body, id: crypto.randomUUID() };
      }
      const response = await fetch(process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || "/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, requestId: requestId.current.id }),
        signal: AbortSignal.timeout(15000),
      });
      const result = await response.json();
      if (response.status === 429) {
        setStatus("busy");
      } else if (response.ok && result.ok === true) {
        form.reset();
        requestId.current = null;
        setStatus("sent");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      submitting.current = false;
    }
  }

  return (
    <form id="contact-form" className="contact-form" onSubmit={submit} aria-busy={status === "sending"}>
      {title && <h2><T value={localize("طلب استشارة هندسية", "Request an engineering consultation")} /></h2>}
      <div className="form-grid">
        <label><span><T value={localize("الاسم بالكامل", "Full name")} /></span><input name="name" autoComplete="name" required maxLength={100} placeholder={text(localize("أدخل اسمك الكريم", "Your full name"))} /></label>
        <label><span><T value={localize("رقم الهاتف", "Phone number")} /></span><input name="phone" type="tel" dir="ltr" autoComplete="tel" required maxLength={40} placeholder="01xxxxxxxxx" /></label>
      </div>
      <label><span><T value={localize("البريد الإلكتروني", "Email address")} /></span><input name="email" type="email" dir="ltr" autoComplete="email" required maxLength={254} placeholder="example@domain.com" /></label>
      <label>
        <span><T value={localize("نوع الخدمة المطلوبة", "Required service")} /></span>
        <span className="contact-service-select">
          <select ref={serviceRef} name="service" defaultValue="construction">
            {services.map((service) => <option key={service.slug} value={service.slug}>{text(service.title)}</option>)}
          </select>
          <ChevronDown size={14} aria-hidden="true" />
        </span>
      </label>
      <label><span><T value={localize("تفاصيل المشروع أو الاستفسار", "Project details")} /></span><textarea name="details" required maxLength={4000} placeholder={text(localize("كيف يمكننا مساعدتكم؟", "How can we help?"))} /></label>
      <div className="contact-trap" aria-hidden="true"><input name="website" tabIndex={-1} autoComplete="off" aria-label="Website" /></div>
      <button className="button button-primary form-submit" type="submit" disabled={status === "sending"}>
        <T value={status === "sending" ? localize("جارٍ الإرسال…", "Sending…") : localize("إرسال الطلب الآن", "Send request")} /><Send size={18} />
      </button>
      {status === "sent" && <p className="form-success" role="status"><T value={localize("شكرًا لك. تم إرسال طلبك وسيتواصل معك فريقنا قريبًا.", "Thank you. Your request was sent and our team will contact you shortly.")} /></p>}
      {(status === "error" || status === "busy") && (
        <p className="form-error" role="alert">
          <T value={status === "busy"
            ? localize("الموقع يستقبل طلبات كثيرة الآن. جرّب مرة أخرى بعد قليل أو راسلنا على", "We’re receiving too many requests. Try again shortly or email us at")
            : localize("تعذّر إرسال الطلب. حاول مرة أخرى أو راسلنا على", "We couldn’t send your request. Try again or email us at")} />
          {" "}<a href={`mailto:${common.email}`}>{common.email}</a>
        </p>
      )}
    </form>
  );
}
