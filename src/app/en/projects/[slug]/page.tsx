import { createPageMetadata } from "@/lib/seo";

export { default, generateStaticParams } from "@/app/(ar)/projects/[slug]/page";

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return createPageMetadata(`/projects/${slug}`, "en");
}
