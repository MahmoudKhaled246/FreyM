import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  Building2,
  Check,
  Headphones,
  ShieldCheck,
} from "lucide-react";
import {
  CompanyCard,
  NewsCard,
  ProjectCard,
  ServiceCard,
} from "@/components/cards";
import { AnimatedStats } from "@/components/animated-stats";
import { CEOMessageSection } from "@/components/ceo-message";
import { ContactForm } from "@/components/contact-form";
import { FAQ } from "@/components/faq";
import { PartnersMarquee } from "@/components/partners-marquee";
import { Reveal } from "@/components/reveal";
import { T } from "@/components/preferences";
import { Eyebrow, SectionHeading } from "@/components/ui";
import { VideoPlayer } from "@/components/video-player";
import {
  common,
  companies,
  localize,
  newsItems,
  processSteps,
  projects,
  services,
} from "@/lib/content";

const stats = [
  {
    value: 890,
    label: localize("مشروع قيد التنفيذ", "Projects in delivery"),
  },
  {
    value: 789,
    label: localize("مشروع منجز بنجاح", "Successfully delivered"),
  },
  { value: 485, label: localize("عميل ومؤسسة معتمدة", "Trusted clients") },
  {
    value: 15,
    label: localize("سنوات الخبرة والتراكم", "Years of combined expertise"),
  },
];

const promises = [
  {
    icon: BadgeCheck,
    title: localize("عامل الخبرة والتاريخ", "Experience with a track record"),
    body: localize(
      "نمتلك خبرة طويلة في إدارة المشاريع الهندسية الكبرى والبنية التحتية الدقيقة.",
      "Deep delivery experience across large engineering and critical-infrastructure projects.",
    ),
  },
  {
    icon: ShieldCheck,
    title: localize("جودة العمل القياسية", "Quality as a standard"),
    body: localize(
      "الالتزام بمعايير السلامة والجودة في كافة مراحل العمل من التخطيط حتى التسليم.",
      "Safety and quality are built into every phase, from planning through handover.",
    ),
  },
  {
    icon: Headphones,
    title: localize("دعم واستجابة 24/7", "Responsive support"),
    body: localize(
      "فرق طوارئ وصيانة متخصصة لمتابعة المشروعات دون انقطاع.",
      "Specialist maintenance and response teams keep operations moving.",
    ),
  },
];

export default function HomePage() {
  return (
    <>
      <section
        className="home-hero"
        style={
          {
            "--hero-image": "url(/images/heroes/home.png)",
          } as React.CSSProperties
        }
      >
        <Reveal className="container home-hero-inner">
          <div className="hero-badge">
            <T
              value={localize(
                "FREY-M COMPANY GROUP • التميز الهندسي المتكامل",
                "FREY-M COMPANY GROUP • INTEGRATED ENGINEERING",
              )}
            />
          </div>
          <h1>
            <T
              value={localize(
                "نبني ما يستحق أن يدوم",
                "We build what deserves to last",
              )}
            />
          </h1>
          <p className="lead">
            <T
              value={localize(
                "حلول متكاملة في التشييد والهندسة وإدارة المشروعات وأعمال الصيانة والتوريدات العمومية، تجمع بين عراقة الخبرة ودقة المعايير وجودة التنفيذ الاستثنائية.",
                "Integrated construction, engineering, project-management, maintenance and supply solutions—uniting proven experience with exacting standards and exceptional delivery.",
              )}
            />
          </p>
          <div className="button-row">
            <Link className="button button-primary" href="/projects">
              <T value={common.exploreProjects} />
              <ArrowLeft size={18} />
            </Link>
            <Link className="button button-secondary" href="/contact">
              <T value={common.contactUs} />
            </Link>
          </div>
          <AnimatedStats items={stats} />
        </Reveal>
      </section>

      <section className="feature-strip">
        <div className="container feature-grid">
          {promises.map(({ icon: Icon, title, body }, index) => (
            <Reveal className="feature-card" key={title.ar} delay={index * 70}>
              <Icon size={27} />
              <div>
                <h3>
                  <T value={title} />
                </h3>
                <p>
                  <T value={body} />
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section company-film-section" aria-labelledby="company-film-title">
        <div className="container company-film-layout">
          <Reveal className="company-film-copy">
            <Eyebrow>
              <T value={localize("فري أم عن قرب", "Frey-M in focus")} />
            </Eyebrow>
            <h2 id="company-film-title">
              <T
                value={localize(
                  "تعرّف على المجموعة من خلال فيلمنا التعريفي",
                  "Meet the group through our company film",
                )}
              />
            </h2>
            <p>
              <T
                value={localize(
                  "لمحة سريعة عن فري أم، ورؤيتنا في تقديم أعمال هندسية وتنفيذية تقوم على الخبرة والدقة والجودة.",
                  "A brief look at Frey-M and our approach to engineering and delivery—built on experience, precision and quality.",
                )}
              />
            </p>
          </Reveal>

          <Reveal className="company-film-frame" delay={90}>
            <div className="company-film-accent" aria-hidden="true" />
            <VideoPlayer />
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container about-split">
          <Reveal className="about-visual">
            <Image
              src="/images/about/construction-experience-hd.png"
              alt="فريق فري أم الهندسي يراجع أعمال مشروع إنشائي"
              fill
              quality={90}
              sizes="(max-width: 900px) 100vw, 50vw"
            />
            <div className="about-visual-note">
              <Building2 size={27} className="gold" />
              <div>
                <small className="gold">
                  <T
                    value={localize("شعارنا في الميدان ", "Our field principle ")}
                  />
                </small>
                <strong>
                  <T
                    value={localize(
                      "الدقة في التخطيط • الإتقان في التنفيذ",
                      "Plan precisely. Deliver exceptionally.",
                    )}
                  />
                </strong>
              </div>
            </div>
          </Reveal>
          <Reveal className="about-copy">
            <Eyebrow>
              <T value={localize("عن مجموعة فري أم", "About Frey-M Group")} />
            </Eyebrow>
            <h2>
              <T
                value={localize(
                  "15 عامًا من الخبرة في صياغة المشهد الإنشائي",
                  "15 years of expertise shaping the built environment",
                )}
              />
            </h2>
            <p>
              <T
                value={localize(
                  "على مدار 15 عامًا، طوّرت مجموعة Frey-M منظومة متكاملة للمقاولات والهندسة في مصر والشرق الأوسط وأفريقيا؛ تجمع التشييد والبنية التحتية والتشطيبات والمنشآت المعدنية والتوريدات والاستشارات داخل فريق واحد. ونستثمر باستمرار في أحدث تقنيات البناء وتدريب كوادرنا لنضمن تنفيذًا آمنًا ودقيقًا وخدمة تحافظ على ثقة عملائنا.",
                  "Over 15 years, Frey-M has built an integrated contracting and engineering system across Egypt, the Middle East and Africa—bringing construction, infrastructure, fit-out, steel structures, supply and consultancy together in one team. We continually invest in modern building technology and specialist training to deliver safely, precisely and reliably.",
                )}
              />
            </p>
            <div className="check-grid">
              {[
                localize(
                  "إشراف هندسي ورقابة فنية شاملة",
                  "Comprehensive engineering oversight",
                ),
                localize(
                  "التزام صارم بالجداول الزمنية",
                  "Disciplined schedules",
                ),
                localize(
                  "شراكات استراتيجية مع كبرى الهيئات",
                  "Strategic institutional partnerships",
                ),
                localize(
                  "كوادر فنية مدربة على أحدث النظم",
                  "Specialist, trained technical teams",
                ),
              ].map((item) => (
                <div className="check-item" key={item.ar}>
                  <Check size={17} />
                  <T value={item} />
                </div>
              ))}
            </div>
            <Link className="button button-primary" href="/about">
              <T
                value={localize(
                  "تعرف على المجموعة وتاريخنا",
                  "Discover our group and history",
                )}
              />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <SectionHeading
            eyebrow={localize("مجالات التخصص", "Areas of expertise")}
            title={localize(
              "حلول وخدمات هندسية متكاملة",
              "Integrated engineering solutions",
            )}
            body={localize(
              "نقدم منظومة شاملة تغطي كافة مراحل البناء والتجهيز والتشغيل لتلبية متطلبات المشروعات الحكومية والصناعية والخاصة.",
              "A connected service system covering construction, fit-out and operations for public, industrial and private projects.",
            )}
          />
          <div className="service-grid">
            {services.map((service, index) => (
              <ServiceCard
                key={service.slug}
                service={service}
                visual
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            centered
            eyebrow={localize(
              "منهجية العمل الهندسية",
              "Engineering methodology",
            )}
            title={localize(
              "كيف ندير وننفذ المشروعات الكبرى",
              "How we deliver major projects",
            )}
            body={localize(
              "نعتمد نموذج عمل هندسي دقيق يضمن سلامة المعايير وتحقيق أعلى مستويات الجودة من نقطة البداية وحتى التسليم والتشغيل.",
              "A disciplined project system protects quality, safety and accountability from first study to handover.",
            )}
          />
          <div className="process-grid process-grid-six">
            {processSteps.slice(0, 6).map((step, index) => (
              <Reveal className="process-step" key={step.ar} delay={index * 55} tabIndex={0}>
                <strong>{String(index + 1).padStart(2, "0")}</strong>
                <h3>
                  <T value={step} />
                </h3>
                <p>
                  <T
                    value={localize(
                      "مرحلة موثقة بمعايير واضحة",
                      "A clearly governed stage",
                    )}
                  />
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow={localize("آخر الأخبار والرؤى", "News & insights")}
            title={localize("من مواقعنا وغرفة الأخبار", "From our sites and newsroom")}
            body={localize(
              "تحديثات مختارة من المشروعات وممارسات الصيانة والحلول الهندسية التي تطور أداء المنشآت.",
              "Selected project updates and practical insight into maintenance and engineering performance.",
            )}
          />
          <div className="news-grid">
            {newsItems.map((item, index) => <NewsCard key={item.slug} item={item} index={index} />)}
          </div>
          <div className="section-action">
            <Link className="button button-secondary" href="/news">
              <T value={localize("استعرض كل الأخبار", "View all news")} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <SectionHeading
            eyebrow={localize("سجل الإنجازات", "Selected work")}
            title={localize(
              "مشروعات واقعية نعتز بتنفيذها",
              "Projects we are proud to deliver",
            )}
            body={localize(
              "نماذج من مشروعاتنا في القطاعات الطبية والإنشائية والتوريدات والصيانة.",
              "Selected medical, construction, supply and maintenance projects.",
            )}
          />
          <div className="project-grid home-project-grid">
            {projects.slice(0, 4).map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="companies">
        <div className="container">
          <SectionHeading
            centered
            eyebrow={localize("الهيكل المؤسسي", "Group structure")}
            title={localize("شركات مجموعة فري أم", "Frey-M group companies")}
            body={localize(
              "ثلاثة كيانات تكاملية متخصصة تغطي كافة الأنشطة الهندسية والتنفيذية والتوريدات.",
              "Three complementary specialist entities across engineering, delivery and supply.",
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

      <section className="section partner-section">
        <div className="container partner-heading">
          <div className="eyebrow centered">
            <span />
            <T
              value={localize(
                "شركاء النجاح والجهات المعتمدة",
                "Trusted institutions",
              )}
            />
            <span />
          </div>
        </div>
        <PartnersMarquee />
      </section>

      <section className="section section-muted">
        <div className="container">
          <SectionHeading
            centered
            eyebrow={localize("الأسئلة الشائعة", "Frequently asked questions")}
            title={localize(
              "إجابات على استفسارات عملائنا",
              "Answers for our clients",
            )}
            body={localize(
              "تعرف على تفاصيل خدماتنا وآليات التعاقد ونطاق أعمال مجموعة فري أم.",
              "Key details about our services, engagement model and capabilities.",
            )}
          />
          <FAQ />
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <Reveal className="contact-side">
            <Eyebrow>
              <T value={localize("تواصل معنا", "Contact us")} />
            </Eyebrow>
            <div className="about-copy">
              <h2>
                <T
                  value={localize(
                    "جاهزون لبدء مشروعك القادم وتلبية احتياجاتك",
                    "Ready to shape your next project",
                  )}
                />
              </h2>
              <p>
                <T
                  value={localize(
                    "فريقنا الهندسي والاستشاري مستعد لدراسة متطلبات مشروعك وتقديم الحلول الهندسية والتقنية الأنسب.",
                    "Our engineering and consulting team is ready to study your requirements and recommend the right delivery path.",
                  )}
                />
              </p>
            </div>
            <div className="contact-card">
              <h3>
                <T
                  value={localize(
                    "المقر الرئيسي - جمهورية مصر العربية",
                    "Head office — Egypt",
                  )}
                />
              </h3>
              <p>
                <T value={common.address} />
              </p>
            </div>
            <div className="contact-card">
              <h3>
                <T
                  value={localize(
                    "الاتصال المباشر والدعم الفني",
                    "Direct support",
                  )}
                />
              </h3>
              <a dir="ltr" href={`tel:${common.phone}`}>
                {common.phone} +20
              </a>
            </div>
          </Reveal>
          <Reveal>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
