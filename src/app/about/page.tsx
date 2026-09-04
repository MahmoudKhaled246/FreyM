import type { Metadata } from "next";
import Image from "next/image";
import { CompanyCard, ValueCard } from "@/components/cards";
import { AnimatedStats } from "@/components/animated-stats";
import { CEOMessageSection } from "@/components/ceo-message";
import { Reveal } from "@/components/reveal";
import { T } from "@/components/preferences";
import { PageHero, SectionHeading } from "@/components/ui";
import { companies, localize, values, whyUs } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "عن مجموعة فري أم",
  description:
    "تعرف على قصة مجموعة فري أم للمقاولات والهندسة، رؤيتنا وقيمنا وخبرات فريق القيادة في تنفيذ المشروعات داخل مصر.",
  path: "/about",
  image: "/images/heroes/about.png",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        image="/images/heroes/about.png"
        eyebrow={localize(
          "إرث هندسي يمتد عبر 15 عامًا",
          "An engineering legacy spanning 15 years",
        )}
        title={localize(
          "قصة عراقة وابتكار",
          "A story of heritage and innovation",
        )}
        body={localize(
          "نحن لسنا مجرد شركة مقاولات، بل نحن شركاء في بناء النهضة المعمارية، نجمع بين عراقة الماضي وأدوات المستقبل.",
          "More than a contractor, we are partners in progress—combining enduring craft with the tools of tomorrow.",
        )}
      />
      <section className="section" id="story">
        <div className="container about-split">
          <Reveal className="about-visual">
            <Image
              src="/images/about/engineering-team-hd.png"
              alt="فريق هندسي يراجع مخططات مشروع إنشائي"
              fill
              quality={90}
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </Reveal>
          <Reveal className="about-copy">
            <h2>
              <T
                value={localize(
                  "منذ عام 2011، نضع حجر الأساس للتميز",
                  "Since 2011, we have laid foundations for excellence",
                )}
              />
            </h2>
            <p>
              <T
                value={localize(
                  "تمتد مجموعة فري أم عبر مسيرة من الخبرات المتراكمة في البناء والتشييد والصيانة والتجهيز. تأسست رؤيتنا على إيمان راسخ بأن الجودة ليست خيارًا إضافيًا، بل هي أساس كل علاقة وكل مشروع.",
                  "Frey-M has grown through accumulated expertise in construction, maintenance and fit-out. Our work is grounded in the belief that quality is not an option—it is the foundation of every relationship and project.",
                )}
              />
            </p>
            <p>
              <T
                value={localize(
                  "نحن ملتزمون دومًا بتقديم قيمة حقيقية للمجتمع والعملاء من خلال حلول مستدامة وكفاءات وطنية ونظم تنفيذ موثوقة.",
                  "We create lasting value through sustainable solutions, skilled national teams and dependable delivery systems.",
                )}
              />
            </p>
            <AnimatedStats
              className="about-stats"
              items={[
                { value: 15, label: localize("عامًا من الخبرة", "Years of expertise") },
                { value: 789, label: localize("مشروعًا منجزًا", "Projects delivered") },
                { value: 485, label: localize("عميلًا وشريكًا", "Clients and partners") },
              ]}
            />
          </Reveal>
        </div>
      </section>
      <section className="section section-muted">
        <div className="container dual-cards">
          <Reveal className="dual-card">
            <h3>
              <T value={localize("رؤيتنا", "Our vision")} />
            </h3>
            <p>
              <T
                value={localize(
                  "نسعى لنصبح إحدى أكثر شركات المقاولات موثوقية في المنطقة، من خلال تقديم حلول هندسية مبتكرة وترك بصمة من الجودة المستدامة.",
                  "To become one of the region's most trusted engineering groups through innovative solutions and a durable standard of quality.",
                )}
              />
            </p>
          </Reveal>
          <Reveal className="dual-card" delay={80}>
            <h3>
              <T value={localize("رسالتنا", "Our mission")} />
            </h3>
            <p>
              <T
                value={localize(
                  "الالتزام بأمانة المهنة وإتقان التنفيذ والتطوير المستمر للأفكار والمعدات، بما يحقق أعلى مستويات الجودة والسلامة في كل مشروع.",
                  "To uphold professional integrity, disciplined delivery and continuous improvement in every project.",
                )}
              />
            </p>
          </Reveal>
        </div>
      </section>
      <section className="section" id="values">
        <div className="container">
          <SectionHeading
            centered
            title={localize("قيمنا ومبادئنا", "Our values and principles")}
            body={localize(
              "الثوابت التي تحكم كل قرار نتخذه وكل مشروع ننفذه.",
              "The principles behind every decision and every delivery.",
            )}
          />
          <div className="value-grid">
            {values.map((value, index) => (
              <ValueCard key={value.title.ar} value={value} index={index} />
            ))}
          </div>
        </div>
      </section>
      <section className="section" id="why-us">
        <div className="container">
          <SectionHeading
            centered
            eyebrow={localize("خبرة تُترجم إلى قيمة", "Experience translated into value")}
            title={localize("لماذا يختار العملاء Frey-M؟", "Why clients choose Frey-M")}
            body={localize(
              "نحوّل خبرة الموقع إلى قرارات أوضح وتنفيذ أكثر انضباطًا ونتائج قابلة للقياس.",
              "We turn field expertise into clearer decisions, disciplined delivery and measurable outcomes.",
            )}
          />
          <div className="why-grid">
            {whyUs.map((item, index) => (
              <Reveal className="why-card" key={item.number} delay={(index % 3) * 70}>
                <span>{item.number}</span>
                <h3><T value={item.title} /></h3>
                <p><T value={item.body} /></p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section section-muted" id="companies">
        <div className="container">
          <SectionHeading
            eyebrow={localize("الهيكل المؤسسي", "Group structure")}
            title={localize("شركات المجموعة", "Group companies")}
            body={localize(
              "تكامل كيانات متخصصة يضمن تقديم منظومة خدمات شاملة بأعلى كفاءة.",
              "Specialist entities working together as one comprehensive delivery system.",
            )}
          />
          <div className="company-grid">
            {companies.map((company, index) => (
              <CompanyCard
                key={company.number}
                company={company}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
      <CEOMessageSection />
    </>
  );
}
