import type { MetadataRoute } from "next";
import {
  absoluteUrl,
  isIndexableDeployment,
  siteConfig,
} from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  if (!isIndexableDeployment) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteConfig.url,
  };
}
