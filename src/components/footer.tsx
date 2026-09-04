import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Brand } from "@/components/brand";
import { T } from "@/components/preferences";
import { common, localize, services } from "@/lib/content";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-about">
          <Brand compact />
          <p><T value={localize("15 عامًا من الخبرة نبني بها المستقبل بدقة الحاضر، عبر مجموعة هندسية متكاملة تخدم قطاعات التشييد والتوريدات.", "Building the future with 15 years of experience and the precision of today—an integrated engineering group serving construction and supply sectors.")} /></p>
        </div>
        <div>
          <h3><T value={localize("روابط سريعة", "Quick links")} /></h3>
          <ul>
            {common.nav.slice(1, 5).map((item) => <li key={item.href}><Link href={item.href}><T value={item.label} /></Link></li>)}
          </ul>
        </div>
        <div>
          <h3><T value={localize("الخدمات", "Services")} /></h3>
          <ul>
            {services.slice(0, 4).map((service) => <li key={service.slug}><Link href="/services"><T value={service.title} /></Link></li>)}
          </ul>
        </div>
        <div>
          <h3><T value={localize("تواصل معنا", "Contact us")} /></h3>
          <ul className="contact-list">
            <li><MapPin size={17} /><T value={common.address} /></li>
            <li><Phone size={17} /><a dir="ltr" href={`tel:${common.phone}`}>{common.phone}</a></li>
            <li><Mail size={17} /><a href={`mailto:${common.email}`}>{common.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <p><T value={localize("جميع الحقوق محفوظة © 2026 مجموعة فري أم للهندسة والمقاولات.", "© 2026 Frey-M Company Group. All rights reserved.")} /></p>
        <div><Link href="#"><T value={localize("سياسة الخصوصية", "Privacy")} /></Link><span>•</span><Link href="#"><T value={localize("الشروط والأحكام", "Terms")} /></Link></div>
      </div>
    </footer>
  );
}
