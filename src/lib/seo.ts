import type { Metadata } from "next";

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
  arabicName: "مجموعة فري أم",
  description:
    "مجموعة فري أم للمقاولات والهندسة في مصر: حلول متكاملة في التشييد والصيانة والتجهيزات الطبية والتوريدات والتصميم الداخلي.",
  url: resolveSiteUrl(),
  locale: "ar_EG",
  alternateLocale: "en_US",
  email: "freymcompanygroup@gmail.com",
  phone: "+201227060667",
} as const;

export const isIndexableDeployment =
  !process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production";

export function absoluteUrl(path = "/") {
  return new URL(path, `${siteConfig.url}/`).toString();
}

type PageMetadata = {
  title: string;
  description: string;
  path: string;
  image: string;
};

export function createPageMetadata({
  title,
  description,
  path,
  image,
}: PageMetadata): Metadata {
  const canonicalUrl = absoluteUrl(path);
  const socialTitle = `${title} | ${siteConfig.name}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: socialTitle,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      alternateLocale: siteConfig.alternateLocale,
      type: "website",
      images: [
        {
          url: absoluteUrl(image),
          alt: socialTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [absoluteUrl(image)],
    },
  };
}
