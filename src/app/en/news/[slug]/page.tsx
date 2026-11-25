import { createPageMetadata } from "@/lib/seo";

export { default, generateStaticParams } from "@/app/(ar)/news/[slug]/page";

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return createPageMetadata(`/news/${slug}`, "en");
}
