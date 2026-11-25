import type { Metadata } from "next";
import { newsItems, projects, type Localized } from "@/lib/content";
import { localizePath, type Language } from "@/lib/locale";

const PRODUCTION_SITE_URL = "https://www.freymcompanygroup.com";

function resolveSiteUrl() {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    PRODUCTION_SITE_URL;
  const urlWithProtocol = /^https?:\/\//i.test(configuredUrl)
    ? configuredUrl
    : `https://${configuredUrl}`;

  try {
    return new URL(urlWithProtocol).origin;
  } catch {
    return PRODUCTION_SITE_URL;
  }
}

export const siteConfig = {
  name: "Frey-M",
  fullName: "Frey-M Company Group",
  arabicName: "مجموعة فري إم",
  description:
    "مجموعة فري إم للمقاولات والهندسة في مصر: حلول متكاملة في التشييد والصيانة والتجهيزات الطبية والتوريدات والتصميم الداخلي.",
  url: resolveSiteUrl(),
  email: "freymcompanygroup@gmail.com",
  phone: "+201227060667",
} as const;

export const isIndexableDeployment =
  process.env.SITE_INDEXABLE !== "false" &&
  (!process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production");

export function absoluteUrl(path = "/") {
  return new URL(path, `${siteConfig.url}/`).toString();
}

type PageSeo = {
  title: Localized;
  description: Localized;
  image: string;
};

const pages: Record<string, PageSeo> = {
  "/": {
    title: { ar: "مجموعة فري إم للمقاولات والهندسة في مصر", en: "Engineering and Contracting in Egypt" },
    description: { ar: siteConfig.description, en: "Frey-M Company Group delivers construction, facility maintenance, medical fit-out and general supplies for projects in Egypt." },
    image: "/images/field/foundation-site-a.webp",
  },
  "/about": {
    title: { ar: "عن مجموعة فري إم", en: "About Frey-M Company Group" },
    description: { ar: "تعرف على قصة مجموعة فري إم للمقاولات والهندسة، رؤيتنا وقيمنا وخبرات فريق القيادة في تنفيذ المشروعات داخل مصر.", en: "Meet the Frey-M leadership team and learn about the values and experience behind our engineering and contracting work in Egypt." },
    image: "/images/field/building-exterior.webp",
  },
  "/contact": {
    title: { ar: "تواصل مع مجموعة فري إم", en: "Contact Frey-M" },
    description: { ar: "تواصل مع مجموعة فري إم لطلب استشارة أو عرض سعر لمشروعات المقاولات والتشييد والصيانة والتجهيزات الطبية والتوريدات.", en: "Ask Frey-M for a consultation or quote for construction, maintenance, medical fit-out or general supplies in Egypt." },
    image: "/images/illustrations/engineering-consultation.webp",
  },
  "/news": {
    title: { ar: "الأخبار والرؤى الهندسية", en: "Engineering News and Insights" },
    description: { ar: "أخبار المشروعات والرؤى الهندسية من مجموعة فري إم.", en: "Read Frey-M project updates and practical insights on construction quality, maintenance and facility operations." },
    image: "/images/field/site-supervision.webp",
  },
  "/privacy": {
    title: { ar: "سياسة الخصوصية", en: "Privacy Policy" },
    description: { ar: "كيفية التعامل مع البيانات التي ترسلها عبر موقع مجموعة فري إم.", en: "Learn how Frey-M handles information you send through its website contact form." },
    image: "/images/brand/frey-m-logo-adaptive.png",
  },
  "/profile": {
    title: { ar: "سابقة الأعمال والقدرات الحالية", en: "Project Experience and Current Capabilities" },
    description: { ar: "سابقة أعمال مجموعة فري إم ومسارات العمل والتشغيل الحالية.", en: "Explore Frey-M’s project experience and current capabilities in construction, medical fit-out and facility maintenance." },
    image: "/images/field/site-survey.webp",
  },
  "/projects": {
    title: { ar: "مشروعات فري إم الهندسية", en: "Engineering and Construction Projects" },
    description: { ar: "استعرض مشروعات مجموعة فري إم في التشييد والصيانة والتجهيزات الطبية والتوريدات للقطاعات الحكومية والمنشآت الحيوية في مصر.", en: "Explore Frey-M’s construction, maintenance and medical fit-out projects for public-sector and critical facilities in Egypt." },
    image: "/images/field/demolition-site.webp",
  },
  "/projects/operating-rooms": {
    title: { ar: "تجهيز غرف العمليات والغازات الطبية", en: "Operating Room Fit-Out and Medical Gases" },
    description: { ar: "مشروع مجموعة فري إم لاستكمال وتأهيل غرف العمليات الكبرى وشبكات الغازات الطبية والأنظمة الكهروميكانيكية بمستشفى كفر الشيخ العام.", en: "See Frey-M’s operating room rehabilitation, medical gas network and electromechanical work at Kafr El Sheikh General Hospital." },
    image: "/images/illustrations/operating-room.webp",
  },
  "/services": {
    title: { ar: "خدمات المقاولات والتشييد والصيانة", en: "Construction and Engineering Services" },
    description: { ar: "خدمات مجموعة فري إم في المقاولات والتشييد والصيانة والتجهيزات الطبية والتوريدات العمومية والتصميم الداخلي وتنسيق المواقع.", en: "Explore Frey-M’s construction, maintenance, medical fit-out, general supplies, interior design and landscaping services in Egypt." },
    image: "/images/field/construction-crew.webp",
  },
  "/terms": {
    title: { ar: "الشروط والأحكام", en: "Terms of Use" },
    description: { ar: "شروط استخدام موقع مجموعة فري إم وإرسال طلبات التواصل.", en: "Read the terms for using the Frey-M website and submitting project enquiries." },
    image: "/images/brand/frey-m-logo-adaptive.png",
  },
};

export function createPageMetadata(path: string, language: Language = "ar"): Metadata {
  const [, section, slug] = path.split("/");
  const entries = section === "news" ? newsItems : section === "projects" ? projects : [];
  const page = pages[path] ?? entries.find((entry) => entry.slug === slug);
  if (!page) return {};

  const title = page.title[language];
  const description = page.description[language];
  const canonical = absoluteUrl(localizePath(path, language));
  const socialTitle = `${title} | ${siteConfig.name}`;
  const image = absoluteUrl(page.image ?? "/images/brand/frey-m-logo-adaptive.png");
  const arabicUrl = absoluteUrl(localizePath(path, "ar"));

  return {
    title: path === "/" ? { absolute: socialTitle } : title,
    description,
    alternates: {
      canonical,
      languages: {
        ar: arabicUrl,
        en: absoluteUrl(localizePath(path, "en")),
        "x-default": arabicUrl,
      },
    },
    openGraph: {
      title: socialTitle,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: language === "ar" ? "ar_EG" : "en_US",
      alternateLocale: language === "ar" ? "en_US" : "ar_EG",
      type: path.startsWith("/news/") ? "article" : "website",
      images: [{ url: image, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [{ url: image, alt: title }],
    },
  };
}
