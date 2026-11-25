import { LocalizedLink as Link } from "@/components/localized-link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { T } from "@/components/preferences";
import type { Localized } from "@/lib/content";

export function Eyebrow({ children, centered = false }: { children: React.ReactNode; centered?: boolean }) {
  return <div className={`eyebrow ${centered ? "centered" : ""}`}><span />{children}<span /></div>;
}

export function SectionHeading({ eyebrow, title, body, centered = false }: { eyebrow?: Localized; title: Localized; body?: Localized; centered?: boolean }) {
  return (
    <Reveal className={`section-heading ${centered ? "centered" : ""}`}>
      {eyebrow && <Eyebrow centered={centered}><T value={eyebrow} /></Eyebrow>}
      <h2><T value={title} /></h2>
      {body && <p><T value={body} /></p>}
    </Reveal>
  );
}

export function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link className="text-link" href={href}>{children}<span className="rtl-arrow"><ArrowLeft size={16} /></span><span className="ltr-arrow"><ArrowRight size={16} /></span></Link>;
}

export function PageHero({ image, eyebrow, title, body, className = "" }: { image: string | null; eyebrow: Localized; title: Localized; body: Localized; className?: string }) {
  return (
    <section
      className={`page-hero ${image ? "" : "no-photo"} ${className}`}
      style={image ? { "--hero-image": `url(${image})` } as React.CSSProperties : undefined}
    >
      <div className="page-hero-overlay" />
      <Reveal className="container page-hero-content">
        <Eyebrow centered><T value={eyebrow} /></Eyebrow>
        <h1><T value={title} /></h1>
        <p><T value={body} /></p>
      </Reveal>
      {image?.startsWith("/images/illustrations/") && (
        <span className="illustration-label"><T value={{ ar: "صورة توضيحية", en: "Illustrative image" }} /></span>
      )}
    </section>
  );
}

export function CTA({ title, body, servicesHref = "/services" }: { title: Localized; body: Localized; servicesHref?: string }) {
  return (
    <section className="section cta-section">
      <Reveal className="container cta-card">
        <h2><T value={title} /></h2>
        <p><T value={body} /></p>
        <div className="button-row">
          <Link href="/contact#contact-form" className="button button-primary"><T value={{ ar: "ابدأ مشروعك الآن", en: "Start your project" }} /></Link>
          <Link href={servicesHref} className="button button-secondary"><T value={{ ar: "استكشف خدماتنا", en: "Explore services" }} /></Link>
        </div>
      </Reveal>
    </section>
  );
}
