import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { ProjectCard } from "@/components/cards";
import { Reveal } from "@/components/reveal";
import { T } from "@/components/preferences";
import { Eyebrow, SectionHeading } from "@/components/ui";
import { common, localize, projects } from "@/lib/content";

export const metadata: Metadata = { title: "Operating Rooms Project", description: "استكمال وتأهيل غرف العمليات الكبرى ووحدات الغازات." };

const scope = [
  { title: localize("تأهيل غرف العمليات", "Operating-room fit-out"), body: localize("تنفيذ نظام الكبسولة المعقمة بأسطح مقاومة للبكتيريا.", "Sterile capsule systems and hygienic, durable interior surfaces.") },
  { title: localize("شبكات الغازات الطبية", "Medical gas networks"), body: localize("توريد وتركيب شبكات الأكسجين والنيتروز ومخارج الغازات.", "Oxygen, nitrous and clinical gas distribution with tested outlets.") },
  { title: localize("الأنظمة الكهروميكانيكية", "Electromechanical systems"), body: localize("رفع كفاءة منظومة التكييف المركزي وفلاتر HEPA.", "High-performance HVAC, pressure control and HEPA filtration.") },
  { title: localize("التجهيزات الطبية", "Medical equipment"), body: localize("توريد وتركيب أجهزة التعقيم المركزية والإضاءة الجراحية.", "Central sterile equipment and integrated surgical lighting.") },
];

export default function ProjectDetailPage() {
  return (
    <>
      <section className="page-hero detail-hero" style={{ "--hero-image": "url(/images/heroes/project-detail.png)" } as React.CSSProperties}>
        <div className="page-hero-overlay" />
        <Reveal className="container page-hero-content">
          <Eyebrow centered><T value={localize("مشروعات الصيانة والتجهيزات الطبية", "Medical construction & fit-outs")} /></Eyebrow>
          <h1><T value={localize("استكمال وتأهيل غرف العمليات الكبرى ووحدات الغازات", "Major operating-room and medical-gas upgrade")} /></h1>
          <div className="detail-meta">
            <div><span><T value={localize("العميل", "Client")} /></span><strong><T value={localize("مديرية الشؤون الصحية", "Health Affairs Directorate")} /></strong></div>
            <div><span><T value={localize("الموقع", "Location")} /></span><strong><T value={localize("مستشفى كفر الشيخ العام", "Kafr El Sheikh General Hospital")} /></strong></div>
            <div><span><T value={localize("سنة التنفيذ", "Year")} /></span><strong>2023</strong></div>
            <div><span><T value={localize("الحالة", "Status")} /></span><strong className="success"><T value={localize("تم التسليم بنجاح", "Successfully delivered")} /></strong></div>
          </div>
        </Reveal>
      </section>
      <section className="section">
        <div className="container detail-layout">
          <Reveal className="detail-main">
            <Eyebrow><T value={localize("نظرة عامة على المشروع", "Project overview")} /></Eyebrow>
            <h2><T value={localize("تحديث شامل لبنية العمليات الحرجة", "A complete upgrade for critical clinical operations")} /></h2>
            <p><T value={localize("يعتبر هذا المشروع من أهم المشروعات الحيوية التي نفذتها مجموعة فري أم لصالح قطاع الصحة، حيث تضمن تطويرًا شاملًا وتحديث غرف العمليات الكبرى بمستشفى كفر الشيخ العام لتلائم المعايير الطبية المعقمة. تم العمل على إحلال وتجديد البنية التحتية الهندسية وتجهيز الأنظمة الكهروميكانيكية المتطورة لضمان بيئة آمنة ومعقمة تمامًا لإجراء العمليات الجراحية الدقيقة.", "This critical healthcare project delivered a comprehensive upgrade of major operating rooms at Kafr El Sheikh General Hospital. The work renewed engineering infrastructure and introduced advanced electromechanical systems to support safe, sterile and reliable surgery.")} /></p>
            <Eyebrow><T value={localize("نطاق العمل والمهام", "Scope of work")} /></Eyebrow>
            <div className="scope-grid">{scope.map((item)=><div className="scope-card" key={item.title.ar}><h3><T value={item.title} /></h3><p><T value={item.body} /></p></div>)}</div>
            <Eyebrow><T value={localize("المواصفات التقنية", "Technical specifications")} /></Eyebrow>
            <table className="spec-table">
              <thead><tr><th><T value={localize("البند", "Item")} /></th><th><T value={localize("المواصفات المنفذة", "Delivered specification")} /></th></tr></thead>
              <tbody>
                <tr><td><T value={localize("نظام التعقيم", "Filtration")} /></td><td dir="ltr">HEPA Filters H14 with 99.99% efficiency</td></tr>
                <tr><td><T value={localize("الأرضيات", "Flooring")} /></td><td dir="ltr">Conductive vinyl flooring for anti-static protection</td></tr>
                <tr><td><T value={localize("التحكم البيئي", "Controls")} /></td><td dir="ltr">Digital control panels for pressure and temperature</td></tr>
                <tr><td><T value={localize("الإضاءة", "Lighting")} /></td><td dir="ltr">Surgical LED shadowless lamps with backup power</td></tr>
              </tbody>
            </table>
          </Reveal>
          <Reveal className="project-sidebar">
            <h3><T value={localize("هل لديك مشروع مشابه؟", "Planning a similar project?")} /></h3>
            <p><T value={localize("فريقنا جاهز لتقديم الاستشارات الفنية والحلول الهندسية المتكاملة لمشروعك القادم.", "Our specialists can assess your requirements and shape a complete engineering solution.")} /></p>
            <Link className="button button-primary" href="/contact"><T value={localize("طلب استشارة هندسية", "Request a consultation")} /></Link>
            <a className="button button-secondary" href={`tel:${common.phone}`}><T value={localize("اتصال هاتفي مباشر", "Call us directly")} /></a>
            <div className="sidebar-contact"><a href={`mailto:${common.email}`}><Mail size={16} />{common.email}</a><a href={`tel:${common.phone}`}><Phone size={16} /><span dir="ltr">{common.phone} +20</span></a></div>
          </Reveal>
        </div>
      </section>
      <section className="section section-muted">
        <div className="container">
          <SectionHeading centered title={localize("مشروعات ذات صلة", "Related projects")} />
          <div className="project-grid">{[projects[3],projects[2],projects[5]].map((project,index)=><ProjectCard key={project.slug} project={project} index={index} />)}</div>
        </div>
      </section>
    </>
  );
}
