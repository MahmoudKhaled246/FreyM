import { LocalizedLink as Link } from "@/components/localized-link";
import { T } from "@/components/preferences";
import { common, localize } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

const title = localize("سياسة الخصوصية", "Privacy policy");

export const metadata = createPageMetadata("/privacy");

export default function PrivacyPage() {
  return (
    <article className="section">
      <div className="container reading-copy about-copy">
        <h1><T value={title} /></h1>
        <h2><T value={localize("طلبات التواصل", "Contact enquiries")} /></h2>
        <p><T value={localize(
          "عند إرسال طلب، يرسل الموقع اسمك ورقم هاتفك وبريدك الإلكتروني والخدمة المختارة وتفاصيل رسالتك إلى فريق فري إم عبر البريد الإلكتروني. يستخدم الفريق هذه البيانات للرد على استفسارك ومتابعة الطلب.",
          "When you submit an enquiry, the website sends your name, phone number, email address, selected service and message to the Frey-M team by email. The team uses this information to respond and follow up on your enquiry.",
        )} /></p>
        <h2><T value={localize("تفضيلات الموقع", "Website preferences")} /></h2>
        <p><T value={localize(
          "يحفظ الموقع اختيار المظهر في متصفحك لتطبيقه في الزيارات التالية. يمكنك إزالة هذا التفضيل من إعدادات بيانات الموقع في المتصفح.",
          "The site stores your theme preference in your browser for future visits. You can clear it in your browser's site-data settings.",
        )} /></p>
        <h2><T value={localize("استفسارات الخصوصية", "Privacy enquiries")} /></h2>
        <p><a href={`mailto:${common.email}`}>{common.email}</a></p>
        <Link className="button button-secondary" href="/contact"><T value={common.contactUs} /></Link>
      </div>
    </article>
  );
}
