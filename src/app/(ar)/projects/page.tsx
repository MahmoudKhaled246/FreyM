import { LocalizedImage } from "@/components/localized-image";
import { ProjectsGrid } from "@/components/projects-grid";
import { CTA, PageHero } from "@/components/ui";
import { T } from "@/components/preferences";
import { localize } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata("/projects");

const fieldPhotos = [
  { image: "elevator-team.webp", alt: localize("فريق العمل يتابع أعمالًا داخل منشأة", "Team visiting a facility") },
  { image: "electrical-team.webp", alt: localize("فريق فني يفحص لوحة كهربائية", "Technicians inspecting an electrical panel") },
  { image: "site-survey.webp", alt: localize("أعمال الرفع المساحي بالموقع", "Surveying work on site") },
  { image: "site-sign.webp", alt: localize("لوحة تعريف موقع العمل", "Project site sign") },
  { image: "electrical-maintenance.webp", alt: localize("فني ينفذ أعمال صيانة كهربائية", "Technician carrying out electrical maintenance") },
  { image: "electrical-panel-review.webp", alt: localize("مراجعة لوحة توزيع كهربائية", "Electrical distribution panel inspection") },
  { image: "site-supervision.webp", alt: localize("متابعة الأعمال الإنشائية بالموقع", "Construction site supervision") },
  { image: "demolition-site.webp", alt: localize("أعمال إزالة وتجهيز الموقع", "Site clearance and preparation") },
  { image: "structural-site.webp", alt: localize("أعمال تجهيز الهيكل الإنشائي", "Structural work in progress") },
  { image: "construction-crew.webp", alt: localize("فريق الموقع أثناء تنفيذ الأعمال", "Site crew at work") },
  { image: "foundation-site-a.webp", alt: localize("متابعة أعمال الأساسات", "Foundation work supervision") },
  { image: "foundation-site-b.webp", alt: localize("تجهيزات الأساسات بالموقع", "Foundation preparations on site") },
  { image: "structural-crew-a.webp", alt: localize("تنفيذ الشدات الخشبية", "Timber formwork installation") },
  { image: "structural-crew-b.webp", alt: localize("فريق الإنشاءات أثناء العمل", "Construction team at work") },
  { image: "structural-crew-c.webp", alt: localize("متابعة تنفيذ الأعمال الإنشائية", "Structural work supervision") },
  { image: "site-structure.webp", alt: localize("أعمال إنشائية جارية بالموقع", "Structural work underway") },
  { image: "building-exterior.webp", alt: localize("أعمال الموقع حول مبنى قائم", "Work around an existing building") },
];

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        image="/images/field/demolition-site.webp"
        eyebrow={localize("سجل الإنجازات الهندسية", "Engineering achievements")}
        title={localize("مشروعات مجموعة فري إم", "Frey-M Group projects")}
        body={localize(
          "نستعرض هنا نخبة من أعمالنا في مجالات التشييد، الصيانة، والديكور والتوريدات التي تم تنفيذها لصالح كبرى المؤسسات الحكومية والقطاعات الحيوية.",
          "Selected construction, maintenance, fit-out and supply work delivered for public institutions and essential sectors.",
        )}
      />
      <section className="section">
        <div className="container">
          <ProjectsGrid />
        </div>
      </section>
      <section className="section section-muted" aria-labelledby="field-gallery-title">
        <div className="container">
          <div className="section-heading">
            <h2 id="field-gallery-title">
              <T value={localize("لقطات من مواقع العمل", "From our work sites")} />
            </h2>
            <p>
              <T value={localize(
                "صور حقيقية من فرقنا ومواقع العمل والأعمال الفنية والإنشائية.",
                "Real snapshots of our teams, site visits, and technical and construction work.",
              )} />
            </p>
          </div>
          <div className="field-gallery-grid">
            {fieldPhotos.map((photo, index) => (
              <figure className="field-gallery-card" key={photo.image}>
                <div className="field-gallery-image">
                  <LocalizedImage
                    src={`/images/field/${photo.image}`}
                    alt={photo.alt}
                    fill
                    quality={90}
                    sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  />
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <figcaption><T value={photo.alt} /></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
      <CTA
        title={localize(
          "هل لديك مشروع قادم يحتاج للخبرة؟",
          "Does your next project need proven expertise?",
        )}
        body={localize(
          "سواء كان في التشييد أو الصيانة أو التجهيزات، نحن نوفر الحلول الهندسية المتكاملة التي تضمن النجاح.",
          "From construction and maintenance to specialist fit-outs, we provide the integrated engineering path to success.",
        )}
      />
    </>
  );
}
