"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      aria-label="Toggle color theme"
      onClick={toggle}
      className="magnetic grid h-9 w-9 place-items-center rounded-full border border-border text-text-muted hover:text-accent hover:border-accent transition-colors"
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
