"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import { scrollToTop } from "@/lib/scroll";

export function Brand({
  compact = false,
  onClick,
  className = "",
}: {
  compact?: boolean;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
}) {
  const pathname = usePathname();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;

    if (pathname === "/") {
      event.preventDefault();
      scrollToTop({ resetUrl: true });
    }
  };

  return (
    <Link
      className={`brand ${compact ? "brand-compact" : ""} ${className}`.trim()}
      href="/"
      aria-label="Frey-M Group"
      onClick={handleClick}
    >
      <span className="brand-logo" aria-hidden="true" />
    </Link>
  );
}
