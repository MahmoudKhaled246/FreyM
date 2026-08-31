import type { Metadata } from "next";
import { ProjectsGrid } from "@/components/projects-grid";
import { CTA, PageHero } from "@/components/ui";
import { localize } from "@/lib/content";

export const metadata: Metadata = { title: "Projects", description: "سجل مشروعات مجموعة فري أم في القطاعات الحكومية والحيوية." };

export default function ProjectsPage() {
  return (
    <>
      <PageHero image="/images/heroes/projects.png" eyebrow={localize("سجل الإنجازات الهندسية", "Engineering achievements")} title={localize("مشروعات مجموعة فري أم", "Frey-M Group projects")} body={localize("نستعرض هنا نخبة من أعمالنا في مجالات التشييد، الصيانة، والديكور والتوريدات التي تم تنفيذها لصالح كبرى المؤسسات الحكومية والقطاعات الحيوية.", "Selected construction, maintenance, fit-out and supply work delivered for public institutions and essential sectors.")} />
      <section className="section">
        <div className="container"><ProjectsGrid /></div>
      </section>
      <CTA title={localize("هل لديك مشروع قادم يحتاج للخبرة؟", "Does your next project need proven expertise?")} body={localize("سواء كان في التشييد أو الصيانة أو التجهيزات، نحن نوفر الحلول الهندسية المتكاملة التي تضمن النجاح.", "From construction and maintenance to specialist fit-outs, we provide the integrated engineering path to success.")} />
    </>
  );
}
