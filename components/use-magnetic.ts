"use client";

import { useEffect } from "react";

// Adds a magnetic pull + click-ripple effect to every [data-magnetic] element.
export function useMagnetic() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".magnetic"));
    const strength = 18;

    function onMove(e: Event) {
      const element = e.currentTarget as HTMLElement;
      const mouseEvent = e as MouseEvent;
      const rect = element.getBoundingClientRect();
      const x = mouseEvent.clientX - rect.left - rect.width / 2;
      const y = mouseEvent.clientY - rect.top - rect.height / 2;
      element.style.transform = `translate(${(x / rect.width) * strength}px, ${(y / rect.height) * strength}px)`;
    }
    function onLeave(e: Event) {
      const element = e.currentTarget as HTMLElement;
      element.style.transform = "translate(0, 0)";
    }
    function onClick(e: Event) {
      const element = e.currentTarget as HTMLElement;
      const mouseEvent = e as MouseEvent;
      const rect = element.getBoundingClientRect();
      const ripple = document.createElement("span");
      const size = Math.max(rect.width, rect.height) * 1.2;
      ripple.className = "ripple";
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${mouseEvent.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${mouseEvent.clientY - rect.top - size / 2}px`;
      element.classList.add("ripple-container");
      element.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    }

    els.forEach((el) => {
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      el.addEventListener("click", onClick);
    });
    return () => {
      els.forEach((el) => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
        el.removeEventListener("click", onClick);
      });
    };
  }, []);
}
