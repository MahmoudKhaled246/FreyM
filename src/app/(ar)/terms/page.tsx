import { LocalizedLink as Link } from "@/components/localized-link";
import { T } from "@/components/preferences";
import { common, localize } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

const title = localize("الشروط والأحكام", "Terms of use");

export const metadata = createPageMetadata("/terms");

export default function TermsPage() {
  return (
    <article className="section">
      <div className="container reading-copy about-copy">
        <h1><T value={title} /></h1>
        <h2><T value={localize("محتوى الموقع", "Website content")} /></h2>
        <p><T value={localize(
          "يعرض الموقع خدمات مجموعة فري إم وأمثلة على أعمالها ومعلومات التواصل معها. يُحدَّد نطاق كل مشروع وتكلفته وجدوله الزمني في عرض أو اتفاق منفصل بعد مراجعة متطلباته.",
          "This website presents Frey-M’s services, examples of its work and contact information. Each project’s scope, price and schedule are set in a separate proposal or agreement after its requirements have been reviewed.",
        )} /></p>
        <h2><T value={localize("استخدام نموذج التواصل", "Using the contact form")} /></h2>
        <p><T value={localize(
          "يُستخدم النموذج للاستفسار عن الخدمات والمشروعات. يُرجى إدخال بيانات تواصل صحيحة وإرسال المعلومات التي يحتاجها الفريق لمراجعة الطلب.",
          "Use the form for enquiries about services and projects. Please provide accurate contact details and the information the team needs to review your request.",
        )} /></p>
        <Link className="button button-secondary" href="/contact"><T value={common.contactUs} /></Link>
      </div>
    </article>
  );
}
