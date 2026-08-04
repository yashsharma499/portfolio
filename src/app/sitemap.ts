import type { MetadataRoute } from "next";
import { caseStudies } from "@/data/company-work";
import { profile } from "@/data/profile";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: profile.siteUrl, changeFrequency: "monthly", priority: 1 },
    ...caseStudies.map((cs) => ({
      url: `${profile.siteUrl}/work/${cs.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
