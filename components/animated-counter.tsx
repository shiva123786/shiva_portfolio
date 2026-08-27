"use client";

import { useEffect, useRef, useState } from "react";

// Counts up from 0 to `value` (integer or float) once the element scrolls
// into view. Preserves any non-numeric prefix/suffix in `display` if given
// (e.g. "8.61" -> counts with 2 decimals, "6+" -> counts to 6 then appends "+").
export function AnimatedCounter({ value, suffix = "", decimals = 0, duration = 1600 }: {
  value: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState((0).toFixed(decimals));
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            function frame(now: number) {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setDisplay((value * eased).toFixed(decimals));
              if (progress < 1) requestAnimationFrame(frame);
            }
            requestAnimationFrame(frame);
            observer.unobserve(el);
          }
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, decimals, duration]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}
