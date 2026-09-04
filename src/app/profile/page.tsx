import type { Metadata } from "next";
import { Activity, ClipboardCheck, Gauge, ShieldCheck } from "lucide-react";
import { ProjectCard, ServiceCard } from "@/components/cards";
import { Reveal } from "@/components/reveal";
import { T } from "@/components/preferences";
import { CTA, PageHero, SectionHeading } from "@/components/ui";
import { localize, projects, services } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "سابقة الأعمال والقدرات الحالية",
  description: "سابقة أعمال مجموعة فري أم ومسارات العمل والتشغيل الحالية.",
  path: "/profile",
  image: "/images/heroes/profile.png",
});

const activePrograms = services.filter((service) =>
  ["construction", "medical", "maintenance"].includes(service.slug),
);

const controls = [
  { icon: ClipboardCheck, title: localize("خطة تنفيذ موثقة", "Documented delivery plan"), body: localize("مسؤوليات ومراحل اعتماد واضحة قبل بدء العمل.", "Clear ownership and approvals before work begins.") },
  { icon: Gauge, title: localize("متابعة مؤشرات الأداء", "Performance tracking"), body: localize("متابعة الجودة والوقت والتكلفة بصورة مستمرة.", "Continuous visibility across quality, time and cost.") },
  { icon: ShieldCheck, title: localize("سلامة وجودة", "Safety and quality"), body: localize("ضوابط فنية ومراجعات ميدانية طوال دورة المشروع.", "Technical controls and field reviews throughout the project.") },
  { icon: Activity, title: localize("دعم ما بعد التسليم", "Post-handover support"), body: localize("استجابة فنية وخطط صيانة تحافظ على استمرارية الأداء.", "Technical response and maintenance plans that protect uptime.") },
];

export default function ProfilePage() {
  return (
    <>
      <PageHero
        image="/images/heroes/profile.png"
        eyebrow={localize("الخبرة بالأرقام والمواقع", "Experience in practice")}
        title={localize("سابقة الأعمال والقدرات الحالية", "Work profile and current capabilities")}
        body={localize(
          "عرض مركز لمسارات العمل التي نديرها اليوم ونماذج من المشروعات التي نفذناها في القطاعات الحيوية.",
          "A focused view of the programs we operate today and selected projects delivered across essential sectors.",
        )}
      />

      <section className="section" id="current">
        <div className="container">
          <SectionHeading
            eyebrow={localize("الأعمال الحالية", "Current work")}
            title={localize("برامج تشغيل وتنفيذ مستمرة", "Active delivery programs")}
            body={localize(
              "نركّز جهودنا الحالية على مسارات ذات أثر مباشر في جاهزية المنشآت واستدامة أدائها.",
              "Our current focus is on programs that directly improve facility readiness and long-term performance.",
            )}
          />
          <div className="service-grid profile-programs">
            {activePrograms.map((service, index) => <ServiceCard key={service.slug} service={service} visual index={index} />)}
          </div>
        </div>
      </section>

      <section className="section section-muted" id="previous">
        <div className="container">
          <SectionHeading
            eyebrow={localize("الأعمال السابقة", "Previous work")}
            title={localize("مشروعات تمثل خبرتنا الميدانية", "Projects that represent our field experience")}
            body={localize(
              "نماذج مختارة من أعمال التوريد والصيانة والتجهيزات الطبية والأنظمة الكهروميكانيكية.",
              "Selected supply, maintenance, medical fit-out and electromechanical work.",
            )}
          />
          <div className="project-grid">
            {projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            centered
            eyebrow={localize("كيف نحمي نتيجة المشروع", "How we protect the outcome")}
            title={localize("حوكمة واضحة من البداية إلى ما بعد التسليم", "Clear governance from kickoff through aftercare")}
          />
          <div className="control-grid">
            {controls.map(({ icon: Icon, title, body }, index) => (
              <Reveal className="control-card" key={title.ar} delay={index * 60}>
                <Icon size={25} />
                <h3><T value={title} /></h3>
                <p><T value={body} /></p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTA
        title={localize("هل تريد مناقشة مشروع مشابه؟", "Planning a similar project?")}
        body={localize("شاركنا المتطلبات وسيتواصل معك فريقنا لتحديد نطاق العمل والخطوة التالية.", "Share your requirements and our team will help define scope and next steps.")}
      />
    </>
  );
}
