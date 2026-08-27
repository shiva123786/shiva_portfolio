"use client";

import { useRef, ReactNode } from "react";

// Generic 3D tilt + cursor-follow radial glow wrapper for cards.
export function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (y - 0.5) * -8;
    const rotateY = (x - 0.5) * 8;
    el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(200px circle at ${x * 100}% ${y * 100}%, var(--accent-soft), transparent 70%)`;
      glowRef.current.style.opacity = "1";
    }
  }
  function onLeave() {
    if (ref.current) ref.current.style.transform = "perspective(800px) rotateX(0) rotateY(0) translateY(0)";
    if (glowRef.current) glowRef.current.style.opacity = "0";
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`card-glow relative rounded-2xl border border-border-soft bg-bg-card transition-transform ${className}`}
    >
      <div ref={glowRef} className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300" />
      <div className="relative">{children}</div>
    </div>
  );
}
