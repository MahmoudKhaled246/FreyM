import Image from "next/image";
import { LocalizedImage } from "@/components/localized-image";
import { LocalizedLink as Link } from "@/components/localized-link";
import { ArrowUpLeft, BriefcaseBusiness, Building2, Droplets, HeartHandshake, Leaf, PackageOpen, Palette, ShieldCheck, Stethoscope, Wrench, Zap, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { T } from "@/components/preferences";
import { TextLink } from "@/components/ui";
import type { companies, executiveLeader, newsItems, projects, services, values } from "@/lib/content";
import { common } from "@/lib/content";

type Service = (typeof services)[number];
type Project = (typeof projects)[number];
type ExecutiveLeader = typeof executiveLeader;
type Company = (typeof companies)[number];
type Value = (typeof values)[number];
type NewsItem = (typeof newsItems)[number];

const serviceIcons = {
  construction: Building2,
  medical: Stethoscope,
  supplies: PackageOpen,
  maintenance: Wrench,
  interiors: Palette,
  landscape: Leaf,
  dewatering: Droplets,
};

const projectIcons: Record<string, LucideIcon> = {
  "blood-bank": PackageOpen,
  autoclave: Wrench,
  icu: Stethoscope,
  generator: Zap,
  "operating-rooms": Stethoscope,
  elevators: Building2,
};

function VisualPlaceholder({ icon: Icon, label }: { icon: LucideIcon; label: { ar: string; en: string } }) {
  return (
    <div className="card-visual-fallback" aria-hidden="true">
      <span className="card-visual-brand">FREY-M / ENGINEERING</span>
      <Icon size={58} strokeWidth={1.3} />
      <span className="card-visual-label"><T value={label} /></span>
    </div>
  );
}

export function ServiceCard({ service, visual = false, index = 0 }: { service: Service; visual?: boolean; index?: number }) {
  const Icon = serviceIcons[service.icon as keyof typeof serviceIcons] ?? Building2;
  return (
    <Reveal id={service.slug} className={`service-card ${visual ? "visual" : ""}`} delay={Math.min(index, 2) * 70}>
      {(visual || service.image) && (
        <div className="card-image">
          {service.image ? (
            <LocalizedImage src={service.image} alt={service.title} fill quality={90} sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw" />
          ) : (
            <VisualPlaceholder icon={Icon} label={service.title} />
          )}
          {visual && <span className="card-number">{service.number}</span>}
        </div>
      )}
      <div className="service-card-body">
        {!visual && !service.image && <div className="icon-tile"><Icon size={23} /></div>}
        <h3><T value={service.title} /></h3>
        <p><T value={service.description} /></p>
        {!visual && <ul>{service.features.map((item) => <li key={item.ar}><ShieldCheck size={15} /><T value={item} /></li>)}</ul>}
        <TextLink href={visual ? `/services#${service.slug}` : `/contact?service=${service.slug}#contact-form`}>
          <T value={visual ? common.discoverMore : { ar: "استفسر عن الخدمة", en: "Enquire about this service" }} />
        </TextLink>
      </div>
    </Reveal>
  );
}

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const href = `/projects/${project.slug}`;
  const Icon = projectIcons[project.slug] ?? Building2;
  return (
    <Reveal className="project-card" delay={Math.min(index, 2) * 70}>
      <div className="card-image">
        {project.image ? (
          <Image src={project.image} alt="" fill quality={90} sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw" />
        ) : (
          <VisualPlaceholder icon={Icon} label={project.tag} />
        )}
        {project.image?.startsWith("/images/illustrations/") && (
          <span className="illustration-label"><T value={{ ar: "صورة توضيحية", en: "Illustrative image" }} /></span>
        )}
      </div>
      <div className="project-card-body">
        <span className="project-location"><T value={project.location} /></span>
        <h3><T value={project.title} /></h3>
        <p><T value={project.description} /></p>
        <TextLink href={href}><T value={common.viewProject} /></TextLink>
      </div>
    </Reveal>
  );
}

export function NewsCard({ item, index = 0 }: { item: NewsItem; index?: number }) {
  const href = `/news/${item.slug}`;
  return (
    <Reveal className="news-card" delay={Math.min(index, 2) * 70}>
      <Link className="news-card-image" href={href} label={item.title}>
        {item.image ? (
          <LocalizedImage src={item.image} alt={item.imageAlt} fill quality={90} sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw" />
        ) : (
          <VisualPlaceholder icon={Stethoscope} label={item.tag} />
        )}
      </Link>
      <div className="news-card-body">
        <span className="news-tag"><T value={item.tag} /></span>
        <h3><T value={item.title} /></h3>
        <p><T value={item.description} /></p>
        <Link className="news-link" href={href}>
          <T value={{ ar: "اقرأ التفاصيل", en: "Read more" }} />
          <ArrowUpLeft size={17} />
        </Link>
      </div>
    </Reveal>
  );
}

export function LeadershipSpotlight({ leader }: { leader: ExecutiveLeader }) {
  return (
    <Reveal className="leadership-spotlight-stage">
      <article className="leadership-card">
        <div className="leadership-image"><LocalizedImage src={leader.image} alt={leader.name} fill quality={90} sizes="(max-width: 700px) 100vw, (max-width: 1180px) 560px, 600px" /></div>
        <div className="leadership-card-copy">
          <h3><T value={leader.name} /></h3>
          <div className="leadership-role-row">
            <p><T value={leader.role} /></p>
            <span className="leadership-accent" aria-hidden="true" />
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function CompanyCard({ company, index = 0 }: { company: Company; index?: number }) {
  return (
    <Reveal className="company-card" delay={index * 70} tabIndex={0}>
      <span className="company-number">{company.number}</span>
      <h3><T value={company.title} /></h3>
      <p><T value={company.body} /></p>
      <div className="company-divider" />
      <ul><li><T value={{ ar: "حلول هندسية متكاملة", en: "Integrated engineering solutions" }} /></li><li><T value={{ ar: "إدارة تنفيذ احترافية", en: "Professional delivery management" }} /></li></ul>
    </Reveal>
  );
}

const valueIcons = { integrity: HeartHandshake, quality: ShieldCheck, innovation: BriefcaseBusiness, development: Building2 };

export function ValueCard({ value, index = 0 }: { value: Value; index?: number }) {
  const Icon = valueIcons[value.icon as keyof typeof valueIcons] ?? ShieldCheck;
  return (
    <Reveal className="value-card" delay={index * 60}>
      <Icon size={24} />
      <h3><T value={value.title} /></h3>
      <p><T value={value.body} /></p>
    </Reveal>
  );
}
