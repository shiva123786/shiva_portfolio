"use client";

import { useReveal } from "./use-reveal";
import { useMagnetic } from "./use-magnetic";

// Mounts the scroll-reveal and magnetic/ripple interaction hooks once,
// after the whole page (all sections) has rendered.
export function PageEffects() {
  useReveal();
  useMagnetic();
  return null;
}
