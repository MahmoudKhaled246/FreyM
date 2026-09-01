"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpLeft,
  ChevronDown,
  Clock3,
  Mail,
  Menu,
  Moon,
  Phone,
  Sun,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Brand } from "@/components/brand";
import { T, useLocalized, usePreferences } from "@/components/preferences";
import { common, localize } from "@/lib/content";

export function Header() {
  const pathname = usePathname();
  const { language, theme, setLanguage, toggleTheme } = usePreferences();
  const text = useLocalized();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.includes("#")) return false;
    return pathname.startsWith(href.split("#")[0]);
  };

  return (
    <header className="site-header">
      <div className="topbar">
        <div className="container topbar-inner">
          <div
            className="topbar-marquee"
            aria-label={text(
              localize(
                "معلومات التواصل وساعات العمل",
                "Contact information and working hours",
              ),
            )}
          >
            <div className="topbar-marquee-track">
              <div
                className="topbar-marquee-group"
                dir={language === "ar" ? "rtl" : "ltr"}
              >
                <span>
                  <Clock3 size={15} />
                  <T
                    value={localize(
                      "ساعات العمل: السبت - الخميس، 9:00 ص - 5:00 م",
                      "Hours: Sat–Thu, 9:00 AM–5:00 PM",
                    )}
                  />
                </span>
                <a dir="ltr" href={`tel:${common.phone}`}>
                  <Phone size={15} />
                  {common.phone}
                </a>
                <a dir="ltr" href={`mailto:${common.email}`}>
                  <Mail size={15} />
                  {common.email}
                </a>
              </div>
              <div
                className="topbar-marquee-group"
                dir={language === "ar" ? "rtl" : "ltr"}
                aria-hidden="true"
              >
                <span>
                  <Clock3 size={15} />
                  <T
                    value={localize(
                      "ساعات العمل: السبت - الخميس، 9:00 ص - 5:00 م",
                      "Hours: Sat–Thu, 9:00 AM–5:00 PM",
                    )}
                  />
                </span>
                <span dir="ltr">
                  <Phone size={15} />
                  {common.phone}
                </span>
                <span dir="ltr">
                  <Mail size={15} />
                  {common.email}
                </span>
              </div>
            </div>
          </div>
          <div className="control-row">
            <button
              className="mini-control language-control"
              onClick={() => setLanguage(language === "ar" ? "en" : "ar")}
              aria-label={text(localize("تغيير اللغة", "Change language"))}
            >
              <span className={language === "en" ? "active" : ""}>EN</span>
              <span className={language === "ar" ? "active" : ""}>العربية</span>
            </button>
            <button
              className="icon-control"
              onClick={toggleTheme}
              aria-label={text(localize("تبديل المظهر", "Toggle theme"))}
            >
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </button>
          </div>
        </div>
      </div>
      <div className="nav-shell">
        <div className="container nav-inner">
          <Brand />
          <nav
            className="desktop-nav"
            aria-label={text(localize("التنقل الرئيسي", "Main navigation"))}
          >
            {common.nav.map((item) => {
              const active = isActive(item.href);
              if (item.children?.length) {
                return (
                  <div
                    className={`nav-item nav-dropdown ${active ? "active" : ""}`}
                    key={item.href}
                  >
                    <Link
                      className="nav-dropdown-trigger"
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                    >
                      <T value={item.label} />
                      <ChevronDown size={14} />
                    </Link>
                    <div className="nav-dropdown-menu">
                      {item.children.map((child) => (
                        <Link key={child.href} href={child.href}>
                          <T value={child.label} />
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  key={item.href}
                  className={`nav-item ${active ? "active" : ""}`}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                >
                  <T value={item.label} />
                </Link>
              );
            })}
          </nav>
          <div className="desktop-actions">
            <Link className="button button-primary header-cta" href="/contact">
              <T value={common.startProject} />
              <ArrowUpLeft size={17} />
            </Link>
          </div>
          <button
            className="mobile-menu-button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={text(localize("فتح القائمة", "Open menu"))}
          >
            <Menu size={23} />
          </button>
        </div>
      </div>
      <div
        className={`mobile-menu-backdrop ${open ? "open" : ""}`}
        onClick={() => setOpen(false)}
      />
      <aside
        id="mobile-menu"
        className={`mobile-menu ${open ? "open" : ""}`}
        aria-hidden={!open}
      >
        <div className="mobile-menu-head">
          <Brand compact />
          <button
            className="mobile-menu-button"
            onClick={() => setOpen(false)}
            aria-label={text(localize("إغلاق القائمة", "Close menu"))}
          >
            <X size={22} />
          </button>
        </div>
        <nav aria-label={text(localize("قائمة الهاتف", "Mobile navigation"))}>
          {common.nav.map((item, index) => {
            const active = isActive(item.href);
            if (item.children?.length) {
              return (
                <details
                  className={`mobile-nav-group ${active ? "active" : ""}`}
                  key={item.href}
                >
                  <summary>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <T value={item.label} />
                    <ChevronDown size={17} />
                  </summary>
                  <div className="mobile-submenu">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setOpen(false)}
                      >
                        <T value={child.label} />
                      </Link>
                    ))}
                  </div>
                </details>
              );
            }
            return (
              <Link
                key={item.href}
                className={active ? "active" : ""}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <T value={item.label} />
              </Link>
            );
          })}
        </nav>
        <div className="mobile-menu-controls">
          <button
            className="button button-secondary"
            onClick={() => setLanguage(language === "ar" ? "en" : "ar")}
          >
            {language === "ar" ? "English" : "العربية"}
          </button>
          <button className="button button-secondary" onClick={toggleTheme}>
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            <T value={localize("المظهر", "Theme")} />
          </button>
        </div>
        <Link
          className="button button-primary mobile-start"
          href="/contact"
          onClick={() => setOpen(false)}
        >
          <T value={common.startProject} />
          <ArrowUpLeft size={18} />
        </Link>
      </aside>
    </header>
  );
}
