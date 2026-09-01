import type { Metadata } from "next";
import { NewsCard } from "@/components/cards";
import { Reveal } from "@/components/reveal";
import { T } from "@/components/preferences";
import { CTA, PageHero, SectionHeading } from "@/components/ui";
import { localize, newsItems } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "الأخبار والرؤى الهندسية",
  description: "أخبار المشروعات والرؤى الهندسية من مجموعة فري أم.",
  path: "/news",
  image: "/images/heroes/news.png",
});

export default function NewsPage() {
  return (
    <>
      <PageHero
        image="/images/heroes/news.png"
        eyebrow={localize("المعرفة من قلب الموقع", "Insight from the field")}
        title={localize("الأخبار والرؤى الهندسية", "News and engineering insight")}
        body={localize(
          "تحديثات المشروعات ومقالات عملية حول جودة التنفيذ والصيانة واستدامة المنشآت.",
          "Project updates and practical perspectives on delivery quality, maintenance and resilient facilities.",
        )}
      />
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow={localize("أحدث التحديثات", "Latest updates")}
            title={localize("من مشروعاتنا وخبراتنا", "From our projects and practice")}
          />
          <div className="news-grid">
            {newsItems.map((item, index) => <NewsCard key={item.slug} item={item} index={index} />)}
          </div>
        </div>
      </section>
      <section className="section section-muted">
        <Reveal className="container newsroom-note">
          <span>FREY-M INSIGHT</span>
          <h2><T value={localize("قرارات أفضل تبدأ بمعلومة أوضح", "Better decisions start with clearer information")} /></h2>
          <p><T value={localize(
            "نشارك الدروس العملية التي تساعد فرق المشاريع والمنشآت على رفع الجاهزية وتقليل المخاطر وتحسين دورة التشغيل.",
            "We share practical lessons that help project and facility teams improve readiness, reduce risk and strengthen operations.",
          )} /></p>
        </Reveal>
      </section>
      <CTA
        title={localize("لديك استفسار هندسي؟", "Have an engineering question?")}
        body={localize("تواصل مع فريقنا للحصول على إجابة مرتبطة باحتياجات مشروعك.", "Speak with our team for guidance grounded in your project's needs.")}
      />
    </>
  );
}
