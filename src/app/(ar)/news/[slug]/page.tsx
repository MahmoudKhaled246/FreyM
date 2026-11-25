import { LocalizedLink as Link } from "@/components/localized-link";
import { notFound } from "next/navigation";
import { T } from "@/components/preferences";
import { PageHero } from "@/components/ui";
import { localize, newsItems } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return newsItems.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return createPageMetadata(`/news/${slug}`);
}

export default async function NewsArticle({ params }: Props) {
  const { slug } = await params;
  const article = newsItems.find((item) => item.slug === slug);
  if (!article) notFound();

  return (
    <>
      <PageHero image={article.image} eyebrow={article.tag} title={article.title} body={article.description} />
      <article className="section">
        <div className="container reading-copy about-copy">
          <h2><T value={localize("التفاصيل", "Details")} /></h2>
          {article.paragraphs.map((paragraph) => <p key={paragraph.en}><T value={paragraph} /></p>)}
          <div className="button-row">
            <Link href={article.projectHref} className="button button-primary"><T value={localize("شاهد المشروع المرتبط", "View the related project")} /></Link>
            <Link href="/news" className="button button-secondary"><T value={localize("كل الأخبار", "All news")} /></Link>
          </div>
        </div>
      </article>
    </>
  );
}
