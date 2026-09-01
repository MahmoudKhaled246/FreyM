import type { Metadata } from "next";
import { CheckCircle2, MapPin } from "lucide-react";
import { notFound } from "next/navigation";
import { ProjectCard } from "@/components/cards";
import { Reveal } from "@/components/reveal";
import { T } from "@/components/preferences";
import { CTA, PageHero, SectionHeading } from "@/components/ui";
import { localize, projects, type Localized } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

const scopes: Record<string, Localized[]> = {
  construction: [
    localize("مراجعة المتطلبات والتنسيق الهندسي", "Requirements review and engineering coordination"),
    localize("إدارة الأعمال المدنية والتشطيبات", "Civil works and finishes management"),
    localize("اختبارات الجودة والتسليم", "Quality testing and handover"),
  ],
  maintenance: [
    localize("الفحص الفني وتحديد الحالة", "Technical inspection and condition assessment"),
    localize("الصيانة الوقائية والتصحيحية", "Preventive and corrective maintenance"),
    localize("اختبارات التشغيل وتوثيق النتائج", "Operational testing and documented results"),
  ],
  supplies: [
    localize("تحديد المواصفات واعتماد البدائل", "Specification and approved alternatives"),
    localize("الفحص وضبط الجودة قبل التوريد", "Pre-delivery inspection and quality control"),
    localize("التوريد والتركيب والتشغيل", "Supply, installation and commissioning"),
  ],
  interiors: [
    localize("دراسة الحالة ومتطلبات الاستخدام", "Condition and use-case assessment"),
    localize("التطوير والتشطيبات المتخصصة", "Specialist upgrading and finishes"),
    localize("اختبارات الأمان والاعتمادية", "Safety and reliability testing"),
  ],
};

export function generateStaticParams() {
  return projects.filter((project) => project.slug !== "operating-rooms").map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};
  return createPageMetadata({
    title: project.title.ar,
    description: project.description.ar,
    path: `/projects/${project.slug}`,
    image: project.image,
  });
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  const projectScope = scopes[project.category] ?? scopes.construction;
  const related = projects.filter((item) => item.slug !== project.slug).slice(0, 3);

  return (
    <>
      <PageHero
        image={project.image}
        eyebrow={project.tag}
        title={project.title}
        body={project.description}
        className="project-record-hero"
      />
      <section className="section">
        <div className="container project-record-layout">
          <Reveal className="project-record-main">
            <div className="project-record-location"><MapPin size={18} /><T value={project.location} /></div>
            <h2><T value={localize("ملخص المشروع", "Project overview")} /></h2>
            <p><T value={project.description} /></p>
            <h3><T value={localize("نطاق العمل", "Scope of work")} /></h3>
            <div className="project-scope-list">
              {projectScope.map((item) => (
                <div key={item.ar}><CheckCircle2 size={19} /><T value={item} /></div>
              ))}
            </div>
          </Reveal>
          <Reveal className="project-record-panel">
            <span><T value={localize("تصنيف المشروع", "Project category")} /></span>
            <strong><T value={project.tag} /></strong>
            <span><T value={localize("الموقع", "Location")} /></span>
            <strong><T value={project.location} /></strong>
            <span><T value={localize("حالة الملف", "Record status")} /></span>
            <strong className="success"><T value={localize("موثق ضمن سابقة الأعمال", "Documented project record")} /></strong>
          </Reveal>
        </div>
      </section>
      <section className="section section-muted">
        <div className="container">
          <SectionHeading centered title={localize("مشروعات ذات صلة", "Related projects")} />
          <div className="project-grid">
            {related.map((item, index) => <ProjectCard key={item.slug} project={item} index={index} />)}
          </div>
        </div>
      </section>
      <CTA
        title={localize("هل تخطط لمشروع مشابه؟", "Planning a similar project?")}
        body={localize("فريقنا جاهز لدراسة المتطلبات وتحديد نطاق عمل واضح وقابل للتنفيذ.", "Our team can assess your requirements and define a clear, buildable scope.")}
      />
    </>
  );
}
