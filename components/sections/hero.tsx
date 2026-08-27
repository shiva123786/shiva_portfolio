"use client";

import { useEffect, useRef } from "react";
import { Download, Mail, Code2 } from "lucide-react";
import { profile } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon } from "../brand-icons";
import { Typewriter } from "../typewriter";
import { SplitText } from "../split-text";
import { HeroPhoto } from "../hero-photo";

const ROLES = [
  "AI & Data Science Engineer",
  "Machine Learning Engineer",
  "Generative AI Developer",
  "Full-Stack Developer",
  "Data Analytics & BI Specialist",
  "Cloud Security Enthusiast",
];

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    function onMove(e: MouseEvent) {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      el!.style.setProperty("--px", `${x * 14}px`);
      el!.style.setProperty("--py", `${y * 14}px`);
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative flex min-h-screen scroll-mt-20 items-center overflow-hidden px-5"
    >
      <div className="grid-bg absolute inset-0" style={{ transform: "translate(calc(var(--px, 0px) * 0.4), calc(var(--py, 0px) * 0.4))" }} />
      <div
        className="orb absolute left-[10%] top-1/4 h-72 w-72 bg-accent/30"
        style={{ transform: "translate(var(--px, 0px), var(--py, 0px))" }}
      />
      <div
        className="orb absolute right-[8%] top-1/2 h-96 w-96 bg-accent-2/20"
        style={{ animationDelay: "3s", transform: "translate(calc(var(--px, 0px) * -1), calc(var(--py, 0px) * -1))" }}
      />
      <div
        className="orb orb-medium absolute bottom-[6%] left-[38%] h-64 w-64 bg-accent/15"
        style={{ transform: "translate(calc(var(--px, 0px) * 0.6), calc(var(--py, 0px) * 0.6))" }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div
            data-reveal
            className="reveal pulse-dot mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-bg-card/60 px-4 py-1.5 backdrop-blur"
            style={{ transitionDelay: "0ms" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="font-mono text-xs text-text-muted">Open to internships &amp; full-time roles · 2027</span>
          </div>

          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
            <SplitText text="Kethavath Shiva " startDelay={60} />
            <span className="gradient-text">
              <SplitText text="Shiva" startDelay={60 + "Kethavath ".length * 28} />
            </span>
          </h1>

          <p data-reveal className="reveal mt-4 font-mono text-lg text-accent sm:text-xl" style={{ transitionDelay: "420ms" }}>
            <Typewriter words={ROLES} />
          </p>

          <p data-reveal className="reveal mt-6 max-w-2xl text-text-muted" style={{ transitionDelay: "500ms" }}>
            {profile.intro}
          </p>

          <div data-reveal className="reveal mt-9 flex flex-wrap items-center gap-4" style={{ transitionDelay: "580ms" }}>
            <a
              href="#projects"
              className="magnetic shine rounded-full bg-accent px-6 py-3 text-sm font-semibold text-bg transition-transform hover:scale-[1.03]"
            >
              View Projects
            </a>
            <a
              href="/resume.pdf"
              download
              className="magnetic shine flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-text transition-colors hover:border-accent hover:text-accent"
            >
              <Download size={15} /> Download Resume
            </a>
            <a href="#contact" className="magnetic flex items-center gap-2 px-2 py-3 text-sm font-semibold text-text-muted hover:text-accent">
              <Mail size={15} /> Contact Me
            </a>
          </div>

          <div data-reveal className="reveal mt-10 flex items-center gap-5" style={{ transitionDelay: "660ms" }}>
            <a
              href="https://github.com/shiva123786"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="magnetic text-text-muted transition-all hover:scale-110 hover:text-accent"
            >
              <GithubIcon />
            </a>
            <a
              href="https://www.linkedin.com/in/kethavath-shiva-a6a0662b5/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="magnetic text-text-muted transition-all hover:scale-110 hover:text-accent"
            >
              <LinkedinIcon />
            </a>
            <a
              href="https://leetcode.com/u/SHIVA_KETHAVATH/"
              target="_blank"
              rel="noreferrer"
              aria-label="LeetCode"
              className="magnetic text-text-muted transition-all hover:scale-110 hover:text-accent"
            >
              <Code2 size={18} />
            </a>
            <span className="hidden font-mono text-xs text-text-faint sm:inline">Move your cursor ✦</span>
          </div>
        </div>

        <div className="order-first lg:order-last lg:col-span-2">
          <HeroPhoto src="portfolio.jpeg" alt="Kethavath Shiva" />
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About section"
        className="animate-bounce-y absolute bottom-8 left-1/2 -translate-x-1/2 text-text-faint hover:text-accent"
      >
        <span className="flex h-9 w-6 items-start justify-center rounded-full border-2 border-current p-1">
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
        </span>
      </a>
    </section>
  );
}
