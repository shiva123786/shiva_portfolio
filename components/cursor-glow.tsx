"use client";

import { useEffect, useRef } from "react";

// Two-layer cursor accent: a small dot that tracks the pointer exactly
// (crisp, instant) and a large soft glow that lags behind via lerp
// (ambient). Both are additive on top of the real OS cursor — never
// hides it, so this stays accessible. Skipped entirely on touch devices.
export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    const dot = dotRef.current;
    if (!glow || !dot) return;
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;

    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;

    function onMove(e: MouseEvent) {
      tx = e.clientX; ty = e.clientY;
      glow!.classList.add("active");
      dot!.classList.add("active");
      dot!.style.transform = `translate(${tx}px, ${ty}px) translate(-50%, -50%)`;
    }
    function onLeave() {
      glow!.classList.remove("active");
      dot!.classList.remove("active");
    }
    function onDown() { dot!.classList.add("pressed"); }
    function onUp() { dot!.classList.remove("pressed"); }

    function loop() {
      cx += (tx - cx) * 0.15;
      cy += (ty - cy) * 0.15;
      if (glow) glow.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    }
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div id="cursor-glow" ref={glowRef} aria-hidden="true" />
      <div id="cursor-dot" ref={dotRef} aria-hidden="true" />
    </>
  );
}
