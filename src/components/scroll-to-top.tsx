"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useLocalized } from "@/components/preferences";
import { localize } from "@/lib/content";
import { scrollToTop } from "@/lib/scroll";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const text = useLocalized();

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY || document.documentElement.scrollTop;
          const scrollHeight =
            document.documentElement.scrollHeight - window.innerHeight;

          // Show when scrolled past 320px
          setVisible(scrollY > 320);

          // Calculate scroll progress (0 to 1)
          if (scrollHeight > 0) {
            const pct = Math.min(Math.max(scrollY / scrollHeight, 0), 1);
            setProgress(pct);
          } else {
            setProgress(0);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    scrollToTop();
  };

  const radius = 21;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - progress * circumference;
  const label = text(localize("الرجوع إلى أعلى الصفحة", "Back to top"));

  return (
    <div
      className={`scroll-to-top-wrapper ${visible ? "is-visible" : ""}`}
      aria-hidden={!visible}
    >
      <button
        type="button"
        className="scroll-to-top-btn"
        onClick={handleScrollToTop}
        tabIndex={visible ? 0 : -1}
        aria-label={label}
        title={label}
      >
        <svg
          className="scroll-progress-ring"
          width="48"
          height="48"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <circle
            className="progress-track"
            cx="24"
            cy="24"
            r={radius}
            fill="none"
            strokeWidth="2.5"
          />
          <circle
            className="progress-indicator"
            cx="24"
            cy="24"
            r={radius}
            fill="none"
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>

        <span className="scroll-to-top-icon">
          <ArrowUp size={20} strokeWidth={2.5} />
        </span>

        <span className="scroll-to-top-tooltip" role="tooltip">
          {label}
        </span>
      </button>
    </div>
  );
}
