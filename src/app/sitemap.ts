import type { MetadataRoute } from "next";
import { newsItems, projects, services } from "@/lib/content";
import { localizePath } from "@/lib/locale";
import { absoluteUrl, isIndexableDeployment } from "@/lib/seo";

export const dynamic = "force-static";

const pages = [
  {
    path: "/",
    images: [
      "/images/field/foundation-site-a.webp",
      "/images/field/structural-site.webp",
      "/images/heroes/thumbnail.webp",
    ],
  },
  { path: "/about", images: ["/images/field/building-exterior.webp", "/images/illustrations/frey-m-facade-bronze.webp", "/images/field/ceo-haggag-studio-retouched.webp"] },
  {
    path: "/services",
    images: services.flatMap((service) => service.image ? [service.image] : []),
  },
  { path: "/projects", images: ["/images/field/demolition-site.webp"] },
  { path: "/profile", images: ["/images/field/site-survey.webp"] },
  { path: "/news", images: ["/images/field/site-supervision.webp"] },
  { path: "/contact", images: ["/images/illustrations/engineering-consultation.webp"] },
  { path: "/privacy", images: [] },
  { path: "/terms", images: [] },
  ...newsItems.map((article) => ({
    path: `/news/${article.slug}`,
    images: [article.image],
  })),
  ...projects.map((project) => ({
    path: `/projects/${project.slug}`,
    images: project.image ? [project.image] : [],
  })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isIndexableDeployment) return [];
  return pages.flatMap(({ path, images }) =>
    (["ar", "en"] as const).map((language) => ({
      url: absoluteUrl(localizePath(path, language)),
      images: images.map((image) => absoluteUrl(image)),
    })),
  );
}
