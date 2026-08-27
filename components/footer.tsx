"use client";

import { ArrowUp } from "lucide-react";
import { profile } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon } from "./brand-icons";

export function Footer() {
  return (
    <footer className="border-t border-border-soft px-5 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="font-mono text-sm text-text-faint">
          © {new Date().getFullYear()} {profile.name}. Built with Next.js.
        </p>
        <div className="flex items-center gap-4">
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="magnetic text-text-muted hover:text-accent">
            <GithubIcon />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="magnetic text-text-muted hover:text-accent">
            <LinkedinIcon />
          </a>
          <a
            href="#home"
            aria-label="Back to top"
            className="magnetic grid h-9 w-9 place-items-center rounded-full border border-border text-text-muted hover:border-accent hover:text-accent"
          >
            <ArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
