import type { Metadata } from "next";
import { Cairo, Inter } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { PreferencesProvider } from "@/components/preferences";
import "./globals.css";

const arabic = Cairo({ subsets: ["arabic"], variable: "--font-arabic", display: "swap" });
const latin = Inter({ subsets: ["latin"], variable: "--font-latin", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: "Frey-M Company Group", template: "%s | Frey-M" },
  description: "مجموعة هندسية متكاملة للتشييد والصيانة والتجهيزات الطبية والتوريدات والتصميم.",
  keywords: ["Frey-M", "construction", "engineering", "maintenance", "Egypt", "مقاولات", "تشييد"],
  openGraph: { title: "Frey-M Company Group", description: "Integrated construction, maintenance, medical fit-out and supply solutions.", type: "website", images: ["/images/heroes/home.png"] },
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
      <head><script dangerouslySetInnerHTML={{ __html: preferenceScript }} /></head>
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
