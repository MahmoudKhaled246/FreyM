import type { Metadata } from "next";
import { Clock3, Globe2, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { FAQ } from "@/components/faq";
import { PartnersMarquee } from "@/components/partners-marquee";
import { Reveal } from "@/components/reveal";
import { T } from "@/components/preferences";
import { PageHero, SectionHeading } from "@/components/ui";
import { common, localize } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "تواصل مع مجموعة فري أم",
  description:
    "تواصل مع مجموعة فري أم لطلب استشارة أو عرض سعر لمشروعات المقاولات والتشييد والصيانة والتجهيزات الطبية والتوريدات.",
  path: "/contact",
  image: "/images/heroes/contact.png",
});

export default function ContactPage() {
  return (
    <>
      <PageHero image="/images/heroes/contact.png" eyebrow={localize("خدمة العملاء والدعم الفني", "Client service & technical support")} title={localize("تواصل مع خبرائنا", "Speak with our experts")} body={localize("نحن هنا للإجابة على استفساراتكم الهندسية وتقديم الدعم اللازم لمشاريعكم القائمة والمستقبلية.", "We are here to answer your engineering questions and support your current and future projects.")} />
      <section className="section">
        <div className="container contact-cards-grid">
          <Reveal className="contact-card"><div className="icon-tile"><MapPin size={23} /></div><h3><T value={localize("المقر الرئيسي", "Head office")} /></h3><p><T value={common.address} /></p></Reveal>
          <Reveal className="contact-card" delay={70}><div className="icon-tile"><Phone size={23} /></div><h3><T value={localize("اتصل بنا", "Call us")} /></h3><a dir="ltr" href={`tel:${common.phone}`}>{common.phone}</a><p><T value={localize("متاحون طوال أيام الأسبوع لخدمتكم", "Available throughout the working week")} /></p></Reveal>
          <Reveal className="contact-card" delay={140}><div className="icon-tile"><Mail size={23} /></div><h3><T value={localize("راسلنا إلكترونيًا", "Email us")} /></h3><a href={`mailto:${common.email}`}>{common.email}</a><p><T value={localize("نرد على جميع الاستفسارات خلال 24 ساعة", "Replies within one business day")} /></p></Reveal>
        </div>
      </section>
      <section className="section section-muted">
        <div className="container contact-grid">
          <Reveal><ContactForm /></Reveal>
          <Reveal className="contact-side">
            <div className="about-copy"><h2><T value={localize("ساعات العمل", "Working hours")} /></h2></div>
            <div className="contact-card"><Clock3 size={22} /><h3><T value={localize("السبت - الخميس", "Saturday – Thursday")} /></h3><p><T value={localize("من 9:00 صباحًا إلى 5:00 مساءً", "9:00 AM to 5:00 PM")} /></p></div>
            <div className="about-copy"><h2><T value={localize("فروعنا الدولية", "International presence")} /></h2></div>
            <div className="contact-card"><h3><T value={localize("فرع ليبيا", "Libya office")} /></h3><p><T value={localize("طرابلس - ليبيا", "Tripoli, Libya")} /></p><a dir="ltr" href="tel:+218916789345">+218 91 6789 345</a></div>
            <div className="about-copy"><h2><T value={localize("تابعونا", "Follow us")} /></h2></div>
            <div className="button-row"><a className="icon-control" href="#" aria-label="Facebook"><Globe2 size={19} /></a><a className="button button-secondary" href="#">LinkedIn</a></div>
          </Reveal>
        </div>
      </section>
      <section className="section">
        <div className="container"><SectionHeading centered title={localize("الأسئلة الشائعة", "Frequently asked questions")} body={localize("كل ما تحتاج معرفته عن خدمات مجموعة فري أم.", "What clients most often ask about Frey-M services.")} /><FAQ compact /></div>
      </section>
      <section className="section section-muted partner-section">
        <div className="container partner-heading"><div className="eyebrow centered"><span /><T value={localize("شركاء النجاح المعتمدون", "Trusted clients")} /><span /></div></div>
        <PartnersMarquee />
      </section>
    </>
  );
}
