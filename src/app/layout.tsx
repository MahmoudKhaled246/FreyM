import type { Metadata } from "next";
import { Cairo, Inter } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { PreferencesProvider } from "@/components/preferences";
import {
  absoluteUrl,
  isIndexableDeployment,
  siteConfig,
} from "@/lib/seo";
import "./globals.css";

const arabic = Cairo({ subsets: ["arabic"], variable: "--font-arabic", display: "swap" });
const latin = Inter({ subsets: ["latin"], variable: "--font-latin", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: "Frey-M | مجموعة فري أم للمقاولات والهندسة",
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Frey-M",
    "FreyM",
    "Frey M",
    "Frey-M Company Group",
    "مجموعة فري أم",
    "فري ام",
    "شركة مقاولات في مصر",
    "مقاولات وتشييد",
    "صيانة وتجهيزات طبية",
    "توريدات عمومية",
  ],
  authors: [{ name: siteConfig.fullName, url: siteConfig.url }],
  creator: siteConfig.fullName,
  publisher: siteConfig.fullName,
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    title: "Frey-M | مجموعة فري أم للمقاولات والهندسة",
    description: siteConfig.description,
    url: absoluteUrl("/"),
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    alternateLocale: siteConfig.alternateLocale,
    type: "website",
    images: [
      {
        url: absoluteUrl("/images/heroes/home.png"),
        alt: "Frey-M Company Group — مجموعة فري أم للمقاولات والهندسة",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Frey-M | مجموعة فري أم للمقاولات والهندسة",
    description: siteConfig.description,
    images: [absoluteUrl("/images/heroes/home.png")],
  },
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
      image: absoluteUrl("/images/heroes/home.png"),
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
    const savedLanguage = localStorage.getItem('frey-language');
    const theme = savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : 'dark';
    const language = savedLanguage === 'en' || savedLanguage === 'ar' ? savedLanguage : 'ar';
    root.dataset.theme = theme;
    root.dataset.lang = language;
    root.lang = language;
    root.dir = language === 'ar' ? 'rtl' : 'ltr';
  } catch (_) {}
})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" data-theme="dark" data-lang="ar" data-scroll-behavior="smooth" suppressHydrationWarning className={`${arabic.variable} ${latin.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        <script dangerouslySetInnerHTML={{ __html: preferenceScript }} />
      </head>
      <body>
        <PreferencesProvider>
          <a className="skip-link" href="#main-content">تجاوز إلى المحتوى</a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </PreferencesProvider>
      </body>
    </html>
  );
}
