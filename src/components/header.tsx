"use client";

import { LocalizedLink as Link } from "@/components/localized-link";
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
import { Fragment, useEffect, useState } from "react";
import { Brand } from "@/components/brand";
import { T, useLocalized, usePreferences } from "@/components/preferences";
import { common, localize } from "@/lib/content";
import { localizePath, withoutLanguagePrefix } from "@/lib/locale";
import { scrollToTop } from "@/lib/scroll";

export function Header() {
  const currentPath = usePathname();
  const pathname = withoutLanguagePrefix(currentPath).replace(/\/$/, "") || "/";
  const inProjectArchive = /^\/projects\/?$/.test(pathname);
  const { language, theme, toggleTheme } = usePreferences();
  const alternateLanguage = language === "ar" ? "en" : "ar";
  const alternatePath = localizePath(pathname, alternateLanguage);
  const switchLanguage = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const { search, hash } = window.location;
    if (!search && !hash) return;
    event.preventDefault();
    window.location.assign(alternatePath + search + hash);
  };
  const text = useLocalized();
  const [open, setOpen] = useState(false);
  const [dismissedDropdown, setDismissedDropdown] = useState<string | null>(
    null,
  );

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  useEffect(() => {
    const closeMenu = () => setOpen(false);
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    window.addEventListener("hashchange", closeMenu);
    window.addEventListener("popstate", closeMenu);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.removeEventListener("hashchange", closeMenu);
      window.removeEventListener("popstate", closeMenu);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.includes("#")) return false;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const dismissDesktopDropdown = (href: string) => {
    setDismissedDropdown(href);
    window.requestAnimationFrame(() => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    });
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
              {[false, true].map((isDuplicate) => (
                <div
                  key={isDuplicate ? "marquee-copy" : "marquee-original"}
                  className="topbar-marquee-group"
                  aria-hidden={isDuplicate ? true : undefined}
                >
                  {[0, 1, 2].map((index) => {
                    const isExtra = index > 0;
                    return (
                      <Fragment key={index}>
                        <span
                          className={isExtra ? "topbar-marquee-extra" : undefined}
                          dir={language === "ar" ? "rtl" : "ltr"}
                        >
                          <Clock3 size={15} />
                          <T
                            value={localize(
                              "ساعات العمل: السبت - الخميس، 9:00 ص - 5:00 م",
                              "Hours: Sat–Thu, 9:00 AM–5:00 PM",
                            )}
                          />
                        </span>
                        <a
                          className={isExtra ? "topbar-marquee-extra" : undefined}
                          dir="ltr"
                          href={`tel:${common.phone}`}
                          tabIndex={isDuplicate ? -1 : undefined}
                        >
                          <Phone size={15} />
                          {common.phone}
                        </a>
                        <a
                          className={isExtra ? "topbar-marquee-extra" : undefined}
                          dir="ltr"
                          href={`mailto:${common.email}`}
                          tabIndex={isDuplicate ? -1 : undefined}
                        >
                          <Mail size={15} />
                          {common.email}
                        </a>
                      </Fragment>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          <div className="control-row">
            <a
              className="mini-control language-control"
              href={alternatePath}
              hrefLang={alternateLanguage}
              onClick={switchLanguage}
              aria-label={text(localize("تغيير اللغة", "Change language"))}
            >
              <span className={language === "en" ? "active" : ""}>EN</span>
              <span className={language === "ar" ? "active" : ""}>العربية</span>
            </a>
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
              const nativeProjectLinks = inProjectArchive && item.href === "/projects";
              if (item.children?.length) {
                return (
                  <div
                    className={`nav-item nav-dropdown ${active ? "active" : ""} ${dismissedDropdown === item.href ? "dismissed" : ""}`.trim()}
                    key={item.href}
                    onClickCapture={(event) => {
                      if (
                        event.target instanceof Element &&
                        event.target.closest("a")
                      ) {
                        dismissDesktopDropdown(item.href);
                      }
                    }}
                    onMouseLeave={() => setDismissedDropdown(null)}
                    onFocusCapture={() => setDismissedDropdown(null)}
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
                        nativeProjectLinks ? (
                          <a key={child.href} href={child.href.replace("/projects", currentPath)}><T value={child.label} /></a>
                        ) : (
                          <Link key={child.href} href={child.href}><T value={child.label} /></Link>
                        )
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
                  onClick={(event) => {
                    if (item.href === "/" && pathname === "/") {
                      event.preventDefault();
                      scrollToTop({ resetUrl: true });
                    }
                  }}
                  aria-current={active ? "page" : undefined}
                >
                  <T value={item.label} />
                </Link>
              );
            })}
          </nav>
          <div className="desktop-actions">
            <Link className="button button-primary header-cta" href="/contact#contact-form">
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
          <Brand compact onClick={() => setOpen(false)} />
          <button
            className="mobile-menu-button"
            onClick={() => setOpen(false)}
            aria-label={text(localize("إغلاق القائمة", "Close menu"))}
          >
            <X size={22} />
          </button>
        </div>
        <nav
          aria-label={text(localize("قائمة الهاتف", "Mobile navigation"))}
          onClickCapture={(event) => {
            if (event.target instanceof Element && event.target.closest("a")) {
              setOpen(false);
            }
          }}
        >
          {common.nav.map((item, index) => {
            const active = isActive(item.href);
            const nativeProjectLinks = inProjectArchive && item.href === "/projects";
            if (item.children?.length) {
              const ChildLink = nativeProjectLinks ? "a" : Link;
              return (
                <details
                  className={`mobile-nav-group ${active ? "active" : ""}`}
                  key={item.href}
                >
                  <summary>
                    <Link
                      href={item.href}
                      onClick={(event) => event.stopPropagation()}
                      onNavigate={() => setOpen(false)}
                    >
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <T value={item.label} />
                    </Link>
                    <ChevronDown size={17} />
                  </summary>
                  <div className="mobile-submenu">
                    {item.children.map((child) => (
                      <ChildLink key={child.href} href={nativeProjectLinks ? child.href.replace("/projects", currentPath) : child.href}>
                        <T value={child.label} />
                      </ChildLink>
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
                onClick={(event) => {
                  setOpen(false);
                  if (item.href === "/" && pathname === "/") {
                    event.preventDefault();
                    scrollToTop({ resetUrl: true });
                  }
                }}
                onNavigate={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <T value={item.label} />
              </Link>
            );
          })}
        </nav>
        <div className="mobile-menu-controls">
          <a
            className="button button-secondary"
            href={alternatePath}
            hrefLang={alternateLanguage}
            lang={alternateLanguage}
            onClick={switchLanguage}
          >
            {language === "ar" ? "English" : "العربية"}
          </a>
          <button className="button button-secondary" onClick={toggleTheme}>
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            <T value={localize("المظهر", "Theme")} />
          </button>
        </div>
        <Link
          className="button button-primary mobile-start"
          href="/contact#contact-form"
          onClick={() => setOpen(false)}
          onNavigate={() => setOpen(false)}
        >
          <T value={common.startProject} />
          <ArrowUpLeft size={18} />
        </Link>
      </aside>
    </header>
  );
}
