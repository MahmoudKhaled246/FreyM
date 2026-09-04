"use client";

import { useEffect, useRef, useState } from "react";
import { T } from "@/components/preferences";
import type { Localized } from "@/lib/content";

export type AnimatedStatItem = {
  value: number;
  label: Localized;
  prefix?: string;
  suffix?: string;
};

function easeOutCubic(progress: number) {
  return 1 - Math.pow(1 - progress, 3);
}

export function AnimatedStats({
  items,
  className = "",
}: {
  items: AnimatedStatItem[];
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState(() => items.map(() => 0));
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || hasStarted) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setHasStarted(true);
        observer.disconnect();
      },
      { threshold: 0.28 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasStarted, items]);

  useEffect(() => {
    if (!hasStarted) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const animationFrame = window.requestAnimationFrame(() => {
        setValues(items.map((item) => item.value));
      });
      return () => window.cancelAnimationFrame(animationFrame);
    }

    const duration = 1600;
    let animationFrame = 0;
    let startTime: number | null = null;

    const tick = (time: number) => {
      if (startTime === null) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const easedProgress = easeOutCubic(progress);

      setValues(items.map((item) => Math.round(item.value * easedProgress)));
      if (progress < 1) animationFrame = window.requestAnimationFrame(tick);
    };

    animationFrame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [hasStarted, items]);

  return (
    <div ref={containerRef} className={`hero-stats ${className}`.trim()}>
      {items.map((item, index) => {
        const prefix = item.prefix ?? "+";
        const suffix = item.suffix ?? "";

        return (
          <div className="hero-stat" key={`${item.value}-${item.label.ar}`}>
            <strong
              dir="ltr"
              aria-label={`${prefix}${item.value.toLocaleString("en-US")}${suffix}`}
            >
              <span aria-hidden="true">
                {prefix}
                {values[index].toLocaleString("en-US")}
                {suffix}
              </span>
            </strong>
            <span>
              <T value={item.label} />
            </span>
          </div>
        );
      })}
    </div>
  );
}
