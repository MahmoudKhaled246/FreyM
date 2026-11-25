import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { PreferencesProvider } from "@/components/preferences";
import { ScrollToTop } from "@/components/scroll-to-top";
import { absoluteUrl, isIndexableDeployment, siteConfig } from "@/lib/seo";
import { type Language } from "@/lib/locale";
import "@/app/globals.css";

export const siteMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: { template: `%s | ${siteConfig.name}`, default: siteConfig.fullName },
  authors: [{ name: siteConfig.fullName, url: siteConfig.url }],
  creator: siteConfig.fullName,
  publisher: siteConfig.fullName,
  icons: { icon: "/favicon.svg" },
  robots: isIndexableDeployment
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      }
    : {
        index: false,
        follow: false,
      },
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
  category: "construction and engineering",
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": absoluteUrl("/#website"),
      url: absoluteUrl("/"),
      name: siteConfig.name,
      alternateName: [
        "FreyM",
        "Frey M",
        siteConfig.fullName,
        siteConfig.arabicName,
        "فري ام",
      ],
      inLanguage: ["ar-EG", "en"],
    },
    {
      "@type": "Organization",
      "@id": absoluteUrl("/#organization"),
      name: siteConfig.name,
      legalName: siteConfig.fullName,
      alternateName: ["FreyM", "Frey M", siteConfig.arabicName, "فري ام"],
      url: absoluteUrl("/"),
      description: siteConfig.description,
      email: siteConfig.email,
      telephone: siteConfig.phone,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/images/brand/frey-m-logo-adaptive.png"),
        contentUrl: absoluteUrl("/images/brand/frey-m-logo-adaptive.png"),
        width: 1254,
        height: 1254,
      },
      image: absoluteUrl("/images/field/foundation-site-a.webp"),
      address: {
        "@type": "PostalAddress",
        streetAddress: "شارع مسجد الأبرار",
        addressLocality: "بركة السبع",
        addressRegion: "المنوفية",
        addressCountry: "EG",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: siteConfig.phone,
        email: siteConfig.email,
        contactType: "customer service",
        availableLanguage: ["Arabic", "English"],
      },
    },
  ],
};

const preferenceScript = `(() => {
  try {
    const root = document.documentElement;
    const savedTheme = localStorage.getItem('frey-theme');
    const theme = savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : 'dark';
    root.dataset.theme = theme;
  } catch (_) {}
})();`;

export function SiteLayout({
  children,
  language,
}: Readonly<{ children: React.ReactNode; language: Language }>) {
  return (
    <html
      lang={language}
      dir={language === "ar" ? "rtl" : "ltr"}
      data-theme="dark"
      data-lang={language}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      {/* eslint-disable-next-line @next/next/no-head-element -- This is the App Router document head. */}
      <head>
        <link
          rel="preload"
          href={language === "ar" ? "/fonts/cairo-arabic.woff2" : "/fonts/inter-latin.woff2"}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        <script dangerouslySetInnerHTML={{ __html: preferenceScript }} />
      </head>
      <body>
        <PreferencesProvider language={language}>
          <a className="skip-link" href="#main-content">
            {language === "ar" ? "تجاوز إلى المحتوى" : "Skip to content"}
          </a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <ScrollToTop />
        </PreferencesProvider>
      </body>
    </html>
  );
}
