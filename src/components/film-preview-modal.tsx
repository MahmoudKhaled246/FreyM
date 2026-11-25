"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Play, X } from "lucide-react";
import { filmModalPlaybackEvent } from "@/components/home-hero-video";
import { usePreferences } from "@/components/preferences";

const filmPoster = "/images/heroes/thumbnail.webp";

export function FilmPreviewModal() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { language } = usePreferences();
  const isArabic = language === "ar";

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const trigger = triggerRef.current;
    document.body.style.overflow = "hidden";
    document.dispatchEvent(new Event(filmModalPlaybackEvent));

    const frame = requestAnimationFrame(() => {
      closeRef.current?.focus();
      videoRef.current?.play().catch(() => {
        // The visible video controls allow playback if the browser blocks autoplay.
      });
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key !== "Tab") return;

      const dialog = closeRef.current?.closest<HTMLElement>("[role='dialog']");
      const focusable = dialog?.querySelectorAll<HTMLElement>(
        "button, video[controls]",
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      document.dispatchEvent(new Event(filmModalPlaybackEvent));
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        className="home-hero-visual home-hero-film-preview"
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-label={isArabic ? "شاهد الفيلم التعريفي لفري إم" : "Watch the Frey-M company film"}
      >
        <span className="home-hero-film-media">
          <Image
            src={filmPoster}
            alt=""
            fill
            quality={90}
            preload
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </span>
        <span className="home-hero-film-accent" aria-hidden="true" />
        <span className="home-hero-film-play" aria-hidden="true">
          <Play size={31} fill="currentColor" />
        </span>
        <span className="home-hero-visual-caption">
          <span>FREY-M / FILM</span>
          <strong>{isArabic ? "شاهد فيلم الشركة" : "Watch our company film"}</strong>
        </span>
      </button>

      {open && typeof document !== "undefined" &&
        createPortal(
          <div className="film-modal" onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}>
            <div
              className="film-modal-panel"
              role="dialog"
              aria-modal="true"
              aria-label={isArabic ? "الفيلم التعريفي لفري إم" : "Frey-M company film"}
            >
              <button
                ref={closeRef}
                className="film-modal-close"
                type="button"
                onClick={() => setOpen(false)}
                aria-label={isArabic ? "إغلاق الفيديو" : "Close video"}
              >
                <X size={24} />
              </button>
              <video
                ref={videoRef}
                className="film-modal-video"
                autoPlay
                controls
                playsInline
                preload="metadata"
                tabIndex={0}
                poster={filmPoster}
              >
                <source src="/videos/Main%20Video.mp4" type="video/mp4" />
              </video>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
