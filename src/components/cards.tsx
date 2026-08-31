import Image from "next/image";
import { BriefcaseBusiness, Building2, HeartHandshake, Leaf, PackageOpen, Palette, ShieldCheck, Stethoscope, Wrench } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { T } from "@/components/preferences";
import { TextLink } from "@/components/ui";
import type { companies, projects, services, team, values } from "@/lib/content";
import { common } from "@/lib/content";

type Service = (typeof services)[number];
type Project = (typeof projects)[number];
type TeamMember = (typeof team)[number];
type Company = (typeof companies)[number];
type Value = (typeof values)[number];

const serviceIcons = {
  construction: Building2,
  medical: Stethoscope,
  supplies: PackageOpen,
  maintenance: Wrench,
  interiors: Palette,
  landscape: Leaf,
};

export function ServiceCard({ service, visual = false, index = 0 }: { service: Service; visual?: boolean; index?: number }) {
  const Icon = serviceIcons[service.icon as keyof typeof serviceIcons] ?? Building2;
  return (
    <Reveal className={`service-card ${visual ? "visual" : ""}`} delay={Math.min(index, 2) * 70}>
      {visual && (
        <div className="card-image">
          <Image src={service.image} alt="" fill sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw" />
          <span className="card-number">{service.number}</span>
        </div>
      )}
      <div className="service-card-body">
        {!visual && <div className="icon-tile"><Icon size={23} /></div>}
        <h3><T value={service.title} /></h3>
        <p><T value={service.description} /></p>
        {!visual && <ul>{service.features.map((item) => <li key={item.ar}><ShieldCheck size={15} /><T value={item} /></li>)}</ul>}
        <TextLink href="/services"><T value={visual ? common.discoverMore : service.link} /></TextLink>
      </div>
    </Reveal>
  );
}

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const href = project.slug === "operating-rooms" ? "/projects/operating-rooms" : `/projects#${project.slug}`;
  return (
    <Reveal className="project-card" delay={Math.min(index, 2) * 70}>
      <div className="card-image">
        <Image src={project.image} alt="" fill sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw" />
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

export function TeamCard({ member, index = 0 }: { member: TeamMember; index?: number }) {
  const isPrimary = index === 0;
  const position = isPrimary ? "primary" : index === 2 ? "admin" : "projects";
  const revealDelay = isPrimary ? 0 : index === 2 ? 90 : 160;

  return (
    <Reveal className={`team-card-stage team-card-stage--${position}`} delay={revealDelay}>
      <article className={`team-card ${isPrimary ? "team-card--primary" : "team-card--secondary"}`}>
        <div className="team-image"><Image src={member.image} alt={member.name.ar} fill sizes="(max-width: 700px) 100vw, (max-width: 1180px) 34vw, 35vw" /></div>
        <div className="team-card-copy">
          <h3><T value={member.name} /></h3>
          <div className="team-role-row">
            <p><T value={member.role} /></p>
            <span className="team-accent" aria-hidden="true" />
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
