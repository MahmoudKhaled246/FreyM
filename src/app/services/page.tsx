import type { Metadata } from "next";
import { ServiceCard } from "@/components/cards";
import { Reveal } from "@/components/reveal";
import { T } from "@/components/preferences";
import { CTA, PageHero, SectionHeading } from "@/components/ui";
import { localize, processSteps, services } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "خدمات المقاولات والتشييد والصيانة",
  description:
    "خدمات مجموعة فري أم في المقاولات والتشييد والصيانة والتجهيزات الطبية والتوريدات العمومية والتصميم الداخلي ونزح المياه الجوفية.",
  path: "/services",
  image: "/images/heroes/services.png",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero image="/images/heroes/services.png" eyebrow={localize("ما نقدمه لعملائنا", "What we deliver")} title={localize("حلول هندسية متكاملة", "Integrated engineering solutions")} body={localize("نحن في مجموعة فري أم نجمع بين الخبرة العريقة والتقنيات الحديثة لتقديم خدمات تشمل التشييد، الصيانة، التوريدات، والتصميم المعماري بأعلى معايير الدقة.", "Frey-M combines long-standing experience with modern systems across construction, maintenance, supply and architectural design.")} />
      <section className="section section-muted">
        <div className="container"><div className="service-grid">{services.map((service,index)=><ServiceCard key={service.slug} service={service} index={index} />)}</div></div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHeading centered title={localize("منهجية العمل الهندسية", "Our engineering methodology")} body={localize("نتبع دورة حياة دقيقة للمشروع تضمن الجودة من الفكرة وحتى التشغيل النهائي.", "A governed project lifecycle protects quality from initial idea through final operation.")} />
          <div className="process-grid">{processSteps.map((step,index)=><Reveal className="process-step" key={step.ar} delay={index*50} tabIndex={0}><strong>{String(index+1).padStart(2,"0")}</strong><h3><T value={step} /></h3><p><T value={localize("إجراءات موثقة وواضحة", "Documented and controlled")} /></p></Reveal>)}</div>
        </div>
      </section>
      <CTA title={localize("هل تبحث عن شريك هندسي موثوق؟", "Looking for a trusted engineering partner?")} body={localize("نحن هنا لتحويل رؤيتك إلى واقع ملموس بدقة هندسية لا تضاهى. تواصل مع خبرائنا اليوم.", "We turn your vision into a rigorously delivered reality. Speak with our engineering team today.")} />
    </>
  );
}
