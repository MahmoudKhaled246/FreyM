import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BadgeCheck, Building2, Check, Headphones, ShieldCheck } from "lucide-react";
import { CompanyCard, ProjectCard, ServiceCard, TeamCard } from "@/components/cards";
import { ContactForm } from "@/components/contact-form";
import { FAQ } from "@/components/faq";
import { Reveal } from "@/components/reveal";
import { T } from "@/components/preferences";
import { Eyebrow, SectionHeading } from "@/components/ui";
import { clients, common, companies, localize, processSteps, projects, services, team } from "@/lib/content";

const stats = [
  { value: "+890", label: localize("مشروع قيد التنفيذ", "Projects in delivery") },
  { value: "+789", label: localize("مشروع منجز بنجاح", "Successfully delivered") },
  { value: "+485", label: localize("عميل ومؤسسة معتمدة", "Trusted clients") },
  { value: "+109", label: localize("سنوات الخبرة والتراكم", "Years of combined expertise") },
];

const promises = [
  { icon: BadgeCheck, title: localize("عامل الخبرة والتاريخ", "Experience with a track record"), body: localize("نمتلك خبرة طويلة في إدارة المشاريع الهندسية الكبرى والبنية التحتية الدقيقة.", "Deep delivery experience across large engineering and critical-infrastructure projects.") },
  { icon: ShieldCheck, title: localize("جودة العمل القياسية", "Quality as a standard"), body: localize("الالتزام بمعايير السلامة والجودة في كافة مراحل العمل من التخطيط حتى التسليم.", "Safety and quality are built into every phase, from planning through handover.") },
  { icon: Headphones, title: localize("دعم واستجابة 24/7", "Responsive support"), body: localize("فرق طوارئ وصيانة متخصصة لمتابعة المشروعات دون انقطاع.", "Specialist maintenance and response teams keep operations moving.") },
];

export default function HomePage() {
  return (
    <>
      <section className="home-hero" style={{ "--hero-image": "url(/images/heroes/home.png)" } as React.CSSProperties}>
        <Reveal className="container home-hero-inner">
          <div className="hero-badge"><T value={localize("FREY-M COMPANY GROUP • التميز الهندسي المتكامل", "FREY-M COMPANY GROUP • INTEGRATED ENGINEERING")} /></div>
          <h1><T value={localize("نبني ما يستحق أن يدوم", "We build what deserves to last")} /></h1>
          <p className="lead"><T value={localize("حلول متكاملة في التشييد والهندسة وإدارة المشروعات وأعمال الصيانة والتوريدات العمومية، تجمع بين عراقة الخبرة ودقة المعايير وجودة التنفيذ الاستثنائية.", "Integrated construction, engineering, project-management, maintenance and supply solutions—uniting proven experience with exacting standards and exceptional delivery.")} /></p>
          <div className="button-row">
            <Link className="button button-primary" href="/projects"><T value={common.exploreProjects} /><ArrowLeft size={18} /></Link>
            <Link className="button button-secondary" href="/contact"><T value={common.contactUs} /></Link>
          </div>
          <div className="hero-stats">
            {stats.map((stat) => <div className="hero-stat" key={stat.value}><strong dir="ltr">{stat.value}</strong><span><T value={stat.label} /></span></div>)}
          </div>
        </Reveal>
      </section>

      <section className="feature-strip">
        <div className="container feature-grid">
          {promises.map(({ icon: Icon, title, body }, index) => (
            <Reveal className="feature-card" key={title.ar} delay={index * 70}><Icon size={27} /><div><h3><T value={title} /></h3><p><T value={body} /></p></div></Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container about-split">
          <Reveal className="about-visual">
            <Image src="/images/about/construction-legacy.png" alt="" fill sizes="(max-width: 900px) 100vw, 50vw" />
            <div className="about-visual-note"><Building2 size={27} className="gold" /><div><small className="gold"><T value={localize("شعارنا في الميدان", "Our field principle")} /></small><strong><T value={localize("الدقة في التخطيط • الإتقان في التنفيذ", "Plan precisely. Deliver exceptionally.")} /></strong></div></div>
          </Reveal>
          <Reveal className="about-copy">
            <Eyebrow><T value={localize("عن مجموعة فري أم", "About Frey-M Group")} /></Eyebrow>
            <h2><T value={localize("خبرة تمتد عبر أجيال في صياغة المشهد الإنشائي", "Generations of expertise shaping the built environment")} /></h2>
            <p><T value={localize("تعد مجموعة Frey-M إحدى الكيانات الوطنية الرائدة في قطاع المقاولات والهندسة العامة في مصر والشرق الأوسط. حيث تمتد جذورنا لأكثر من نصف قرن من العمل المتواصل الذي يجمع بين أصالة الحرفة وأحدث التقنيات الهندسية العالمية.", "Frey-M is a national engineering and contracting group rooted in more than half a century of continuous field experience, combining craft, governance and modern engineering systems.")} /></p>
            <div className="check-grid">
              {[localize("إشراف هندسي ورقابة فنية شاملة", "Comprehensive engineering oversight"),localize("التزام صارم بالجداول الزمنية", "Disciplined schedules"),localize("شراكات استراتيجية مع كبرى الهيئات", "Strategic institutional partnerships"),localize("كوادر فنية مدربة على أحدث النظم", "Specialist, trained technical teams")].map((item)=><div className="check-item" key={item.ar}><Check size={17} /><T value={item} /></div>)}
            </div>
            <Link className="button button-primary" href="/about"><T value={localize("تعرف على المجموعة وتاريخنا", "Discover our group and history")} /></Link>
          </Reveal>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <SectionHeading eyebrow={localize("مجالات التخصص", "Areas of expertise")} title={localize("حلول وخدمات هندسية متكاملة", "Integrated engineering solutions")} body={localize("نقدم منظومة شاملة تغطي كافة مراحل البناء والتجهيز والتشغيل لتلبية متطلبات المشروعات الحكومية والصناعية والخاصة.", "A connected service system covering construction, fit-out and operations for public, industrial and private projects.")} />
          <div className="service-grid">{services.map((service,index)=><ServiceCard key={service.slug} service={service} visual index={index} />)}</div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading centered eyebrow={localize("منهجية العمل الهندسية", "Engineering methodology")} title={localize("كيف ندير وننفذ المشروعات الكبرى", "How we deliver major projects")} body={localize("نعتمد نموذج عمل هندسي دقيق يضمن سلامة المعايير وتحقيق أعلى مستويات الجودة من نقطة البداية وحتى التسليم والتشغيل.", "A disciplined project system protects quality, safety and accountability from first study to handover.")} />
          <div className="process-grid">{processSteps.slice(0,6).map((step,index)=><Reveal className="process-step" key={step.ar} delay={index*55}><strong>{String(index+1).padStart(2,"0")}</strong><h3><T value={step} /></h3><p><T value={localize("مرحلة موثقة بمعايير واضحة", "A clearly governed stage")} /></p></Reveal>)}</div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <SectionHeading eyebrow={localize("سجل الإنجازات", "Selected work")} title={localize("مشروعات واقعية نعتز بتنفيذها", "Projects we are proud to deliver")} body={localize("نماذج من مشروعاتنا في القطاعات الطبية والإنشائية والتوريدات والصيانة.", "Selected medical, construction, supply and maintenance projects.")} />
          <div className="project-grid home-project-grid">{projects.slice(0,4).map((project,index)=><ProjectCard key={project.slug} project={project} index={index} />)}</div>
        </div>
      </section>

      <section className="section" id="companies">
        <div className="container">
          <SectionHeading centered eyebrow={localize("الهيكل المؤسسي", "Group structure")} title={localize("شركات مجموعة فري أم", "Frey-M group companies")} body={localize("ثلاثة كيانات تكاملية متخصصة تغطي كافة الأنشطة الهندسية والتنفيذية والتوريدات.", "Three complementary specialist entities across engineering, delivery and supply.")} />
          <div className="company-grid">{companies.map((company,index)=><CompanyCard key={company.number} company={company} featured={index===1} index={index} />)}</div>
        </div>
      </section>

      <section className="section section-muted" id="team">
        <div className="container">
          <SectionHeading centered eyebrow={localize("فريق القيادة والإدارة", "Leadership team")} title={localize("قيادة هندسية وإدارية ذات رؤية راسخة", "Engineering leadership with a clear vision")} body={localize("نخبة من القيادات التنفيذية والهندسية الحريصة على تطبيق أعلى معايير الحوكمة والابتكار.", "Experienced leaders applying high standards of governance, delivery and innovation.")} />
          <div className="team-grid">{team.map((member,index)=><TeamCard key={member.name.ar} member={member} index={index} />)}</div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="eyebrow centered"><span /><T value={localize("شركاء النجاح والجهات المعتمدة", "Trusted institutions")} /><span /></div>
          <div className="partner-grid" style={{marginTop:32}}>{clients.concat([localize("مستشفى قفط المركزي","Qift Central Hospital"),localize("مديرية الشؤون الصحية بالبحيرة","Beheira Health Directorate"),localize("مديرية الشؤون الصحية ببني سويف","Beni Suef Health Directorate"),localize("جامعة أسيوط","Assiut University")]).map((client,index)=><Reveal className="partner" key={client.ar} delay={(index%4)*50}><T value={client} /></Reveal>)}</div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <SectionHeading centered eyebrow={localize("الأسئلة الشائعة", "Frequently asked questions")} title={localize("إجابات على استفسارات عملائنا", "Answers for our clients")} body={localize("تعرف على تفاصيل خدماتنا وآليات التعاقد ونطاق أعمال مجموعة فري أم.", "Key details about our services, engagement model and capabilities.")} />
          <FAQ />
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <Reveal className="contact-side">
            <Eyebrow><T value={localize("تواصل معنا", "Contact us")} /></Eyebrow>
            <div className="about-copy"><h2><T value={localize("جاهزون لبدء مشروعك القادم وتلبية احتياجاتك", "Ready to shape your next project")} /></h2><p><T value={localize("فريقنا الهندسي والاستشاري مستعد لدراسة متطلبات مشروعك وتقديم الحلول الهندسية والتقنية الأنسب.", "Our engineering and consulting team is ready to study your requirements and recommend the right delivery path.")} /></p></div>
            <div className="contact-card"><h3><T value={localize("المقر الرئيسي - جمهورية مصر العربية", "Head office — Egypt")} /></h3><p><T value={common.address} /></p></div>
            <div className="contact-card"><h3><T value={localize("الاتصال المباشر والدعم الفني", "Direct support")} /></h3><a dir="ltr" href={`tel:${common.phone}`}>{common.phone} +20</a></div>
          </Reveal>
          <Reveal><ContactForm /></Reveal>
        </div>
      </section>
    </>
  );
}
