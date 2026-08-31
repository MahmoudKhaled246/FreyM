"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/cards";
import { T } from "@/components/preferences";
import { localize, projects } from "@/lib/content";

const filters = [
  { value: "all", label: localize("الكل", "All") },
  { value: "construction", label: localize("مقاولات عامة", "Construction") },
  { value: "medical-supplies", label: localize("مشروعات الصيانة", "Medical & maintenance") },
  { value: "elevators", label: localize("ديكورات وتشطيبات", "Finishes & elevators") },
  { value: "electromechanical", label: localize("توريدات عمومية", "Electromechanical") },
];

export function ProjectsGrid() {
  const [active, setActive] = useState("all");
  const visible = active === "all" ? projects : projects.filter((project) => project.category === active);
  return (
    <>
      <div className="filter-row" role="group" aria-label="Project filters">
        {filters.map((filter) => (
          <button key={filter.value} className={active === filter.value ? "active" : ""} onClick={() => setActive(filter.value)}>
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
