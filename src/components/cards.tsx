import Image from "next/image";
import Link from "next/link";
import { ArrowUpLeft, BriefcaseBusiness, Building2, Droplets, HeartHandshake, Leaf, PackageOpen, Palette, ShieldCheck, Stethoscope, Wrench } from "lucide-react";
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

export function ServiceCard({ service, visual = false, index = 0 }: { service: Service; visual?: boolean; index?: number }) {
  const Icon = serviceIcons[service.icon as keyof typeof serviceIcons] ?? Building2;
  return (
    <Reveal id={service.slug} className={`service-card ${visual ? "visual" : ""}`} delay={Math.min(index, 2) * 70}>
      {visual && (
        <div className="card-image">
          <Image src={service.image} alt={service.title.ar} fill sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw" />
          <span className="card-number">{service.number}</span>
        </div>
      )}
      <div className="service-card-body">
        {!visual && <div className="icon-tile"><Icon size={23} /></div>}
        <h3><T value={service.title} /></h3>
        <p><T value={service.description} /></p>
        {!visual && <ul>{service.features.map((item) => <li key={item.ar}><ShieldCheck size={15} /><T value={item} /></li>)}</ul>}
        <TextLink href={`/services#${service.slug}`}><T value={visual ? common.discoverMore : service.link} /></TextLink>
      </div>
    </Reveal>
  );
}

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const href = `/projects/${project.slug}`;
  return (
    <Reveal className="project-card" delay={Math.min(index, 2) * 70}>
      <div className="card-image">
        <Image src={project.image} alt={`${project.title.ar} — ${project.location.ar}`} fill sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw" />
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
  return (
    <Reveal className="news-card" delay={Math.min(index, 2) * 70}>
      <Link className="news-card-image" href={item.href} aria-label={item.title.ar}>
        <Image src={item.image} alt={item.title.ar} fill sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw" />
      </Link>
      <div className="news-card-body">
        <span className="news-tag"><T value={item.tag} /></span>
        <h3><T value={item.title} /></h3>
        <p><T value={item.description} /></p>
        <Link className="news-link" href={item.href}>
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
        <div className="leadership-image"><Image src={leader.image} alt={leader.name.ar} fill sizes="(max-width: 700px) 100vw, (max-width: 1180px) 560px, 600px" /></div>
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

export function CompanyCard({ company, featured = false, index = 0 }: { company: Company; featured?: boolean; index?: number }) {
  return (
    <Reveal className={`company-card ${featured ? "featured" : ""}`} delay={index * 70}>
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
