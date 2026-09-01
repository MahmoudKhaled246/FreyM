"use client";

import { useEffect, useState } from "react";
import { ProjectCard } from "@/components/cards";
import { T } from "@/components/preferences";
import { localize, projects } from "@/lib/content";

const filters = [
  { value: "all", label: localize("الكل", "All") },
  { value: "construction", label: localize("مقاولات عامة", "Construction") },
  { value: "maintenance", label: localize("الصيانة والتشغيل", "Maintenance") },
  { value: "interiors", label: localize("ديكورات وتشطيبات", "Décor & finishes") },
  { value: "supplies", label: localize("توريدات عمومية", "General supplies") },
];

export function ProjectsGrid() {
  const [active, setActive] = useState("all");

  useEffect(() => {
    const syncFilter = () => {
      const requested = window.location.hash.slice(1);
      setActive(filters.some((filter) => filter.value === requested) ? requested : "all");
    };
    syncFilter();
    window.addEventListener("hashchange", syncFilter);
    return () => window.removeEventListener("hashchange", syncFilter);
  }, []);

  const selectFilter = (value: string) => {
    setActive(value);
    window.history.replaceState(null, "", value === "all" ? "/projects" : `/projects#${value}`);
  };

  const visible = active === "all" ? projects : projects.filter((project) => project.category === active);
  return (
    <>
      <div className="filter-row" role="group" aria-label="Project filters">
        {filters.map((filter) => (
          <button key={filter.value} className={active === filter.value ? "active" : ""} onClick={() => selectFilter(filter.value)} aria-pressed={active === filter.value}>
            <T value={filter.label} />
          </button>
        ))}
      </div>
      <div className="project-grid">
        {visible.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}
      </div>
    </>
  );
}
