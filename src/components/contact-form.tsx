"use client";

import { Send } from "lucide-react";
import { useState } from "react";
import { T, useLocalized } from "@/components/preferences";
import { localize } from "@/lib/content";

export function ContactForm({ title = true }: { title?: boolean }) {
  const text = useLocalized();
  const [sent, setSent] = useState(false);
  return (
    <form className="contact-form" onSubmit={(event) => { event.preventDefault(); setSent(true); }}>
      {title && <h2><T value={localize("طلب استشارة هندسية", "Request an engineering consultation")} /></h2>}
      <div className="form-grid">
        <label><span><T value={localize("الاسم بالكامل", "Full name")} /></span><input name="name" required placeholder={text(localize("أدخل اسمك الكريم", "Your full name"))} /></label>
        <label><span><T value={localize("رقم الهاتف", "Phone number")} /></span><input name="phone" type="tel" dir="ltr" required placeholder="01xxxxxxxxx" /></label>
      </div>
      <label><span><T value={localize("البريد الإلكتروني", "Email address")} /></span><input name="email" type="email" dir="ltr" required placeholder="example@domain.com" /></label>
      <label><span><T value={localize("نوع الخدمة المطلوبة", "Required service")} /></span><select name="service" defaultValue="construction"><option value="construction">{text(localize("التشييد والمقاولات العامة", "Construction & contracting"))}</option><option value="medical">{text(localize("التجهيزات الطبية", "Medical fit-outs"))}</option><option value="maintenance">{text(localize("الصيانة والتشغيل", "Maintenance & operations"))}</option></select></label>
      <label><span><T value={localize("تفاصيل المشروع أو الاستفسار", "Project details")} /></span><textarea name="details" required placeholder={text(localize("كيف يمكننا مساعدتكم؟", "How can we help?"))} /></label>
      <button className="button button-primary form-submit" type="submit"><T value={localize("إرسال الطلب الآن", "Send request")} /><Send size={18} /></button>
      {sent && <p className="form-success" role="status"><T value={localize("شكرًا لك. تم استلام طلبك وسيتواصل معك فريقنا قريبًا.", "Thank you. Your request has been received and our team will contact you shortly.")} /></p>}
    </form>
  );
}
