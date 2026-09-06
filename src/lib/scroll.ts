export function scrollToTop(options?: { resetUrl?: boolean }) {
  if (typeof window === "undefined") return;

  if (options?.resetUrl && (window.location.hash || window.location.search)) {
    window.history.pushState(null, "", window.location.pathname);
  }

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  window.scrollTo({
    top: 0,
    behavior: prefersReducedMotion ? "auto" : "smooth",
  });
}
