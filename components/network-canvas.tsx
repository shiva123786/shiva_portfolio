"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number };

// Fixed full-viewport canvas that paints the page background itself, then
// draws a slowly drifting node network over it. Link opacity and node
// brightness scale with scroll progress, so the network "wakes up" as the
// person scrolls further into the page. Repaints the CSS bg color each
// frame, so it degrades gracefully to a flat background if JS is slow.
export function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let raf = 0;
    let frame = 0;
    let bgColor = "#0a0b0f";
    let accentRgb = "45, 212, 191";

    function readColors() {
      const styles = getComputedStyle(document.documentElement);
      bgColor = styles.getPropertyValue("--bg").trim() || bgColor;
      const hex = styles.getPropertyValue("--accent").trim().replace("#", "");
      if (hex.length === 6) {
        const r = parseInt(hex.slice(0, 2), 16);
        const g = parseInt(hex.slice(2, 4), 16);
        const b = parseInt(hex.slice(4, 6), 16);
        if (!Number.isNaN(r)) accentRgb = `${r}, ${g}, ${b}`;
      }
    }

    function seedNodes() {
      const density = width < 640 ? 22000 : 15000;
      const count = Math.max(18, Math.min(70, Math.floor((width * height) / density)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
      }));
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedNodes();
    }

    function scrollProgress() {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      return max > 0 ? Math.min(Math.max(h.scrollTop / max, 0), 1) : 0;
    }

    function draw() {
      frame++;
      if (frame % 45 === 0) readColors();
      const progress = scrollProgress();

      ctx!.fillStyle = bgColor;
      ctx!.fillRect(0, 0, width, height);

      const linkDist = 130;
      const baseAlpha = 0.1 + progress * 0.26;

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < linkDist) {
            ctx!.strokeStyle = `rgba(${accentRgb}, ${(1 - dist / linkDist) * baseAlpha})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }

      for (const n of nodes) {
        ctx!.fillStyle = `rgba(${accentRgb}, ${0.3 + progress * 0.3})`;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, 1.6, 0, Math.PI * 2);
        ctx!.fill();
      }

      if (!reduceMotion) raf = requestAnimationFrame(draw);
    }

    function onResize() {
      resize();
      if (reduceMotion) draw();
    }

    function onVisibility() {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else if (!reduceMotion) {
        raf = requestAnimationFrame(draw);
      }
    }

    readColors();
    resize();
    draw();

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, zIndex: -1, pointerEvents: "none" }}
    />
  );
}
