import type { MetadataRoute } from "next";
import { projects } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

const pages = [
  {
    path: "/",
    images: [
      "/images/heroes/home.png",
      "/images/about/construction-legacy.png",
    ],
  },
  { path: "/about", images: ["/images/heroes/about.png"] },
  {
    path: "/services",
    images: [
      "/images/heroes/services.png",
      "/images/services/construction.png",
      "/images/services/medical.png",
      "/images/services/supplies.png",
      "/images/services/maintenance.png",
      "/images/services/interiors.png",
      "/images/services/landscape.png",
      "/images/services/soil-dewatering.png",
    ],
  },
  { path: "/projects", images: ["/images/heroes/projects.png"] },
  { path: "/profile", images: ["/images/heroes/profile.png"] },
  { path: "/news", images: ["/images/heroes/news.png"] },
  { path: "/contact", images: ["/images/heroes/contact.png"] },
  ...projects.map((project) => ({
    path: `/projects/${project.slug}`,
    images: project.slug === "operating-rooms"
      ? ["/images/heroes/project-detail.png", project.image]
      : [project.image],
  })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((page) => ({
    url: absoluteUrl(page.path),
    images: page.images.map((image) => absoluteUrl(image)),
  }));
}
