"use client";

import { useRef, ReactNode } from "react";

// Wraps a single interactive child and pulls it toward the cursor on hover.
// Note: buttons/links across the site already get this behavior for free via
// the global `.magnetic` class + useMagnetic() hook — use this wrapper only
// for one-off elements that aren't natural anchor/button targets.
export function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  }
  function onLeave() {
    if (ref.current) ref.current.style.transform = "translate(0, 0)";
  }

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className="inline-block transition-transform duration-200 ease-out">
      {children}
    </div>
  );
}
