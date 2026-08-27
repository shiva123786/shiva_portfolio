"use client";

import { useRef } from "react";

export function HeroPhoto({ src, alt }: { src: string; alt: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) scale(1.03)`;
  }
  function onLeave() {
    if (wrapRef.current) wrapRef.current.style.transform = "perspective(900px) rotateX(0) rotateY(0) scale(1)";
  }

  return (
    <div data-reveal className="reveal-scale relative mx-auto flex items-center justify-center" style={{ transitionDelay: "200ms" }}>
      <div className="float-photo relative h-64 w-64 sm:h-80 sm:w-80">
        <div className="absolute inset-0 -z-10 rounded-full bg-accent/25 blur-3xl" />

        <svg className="ring-spin absolute -inset-4 h-[calc(100%+2rem)] w-[calc(100%+2rem)]" viewBox="0 0 100 100" aria-hidden="true">
          <circle
            cx="50" cy="50" r="47"
            fill="none" stroke="var(--accent)" strokeWidth="0.6"
            strokeDasharray="4 6" strokeLinecap="round" opacity="0.55"
          />
        </svg>

        <div
          ref={wrapRef}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          className="h-full w-full overflow-hidden rounded-full border-2 border-border-soft shadow-[0_0_0_1px_var(--accent-soft),0_25px_60px_-20px_var(--accent-glow)] transition-transform duration-300 ease-out"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} className="h-full w-full object-cover" draggable={false} />
        </div>
      </div>
    </div>
  );
}