"use client";

import { useRef, useState } from "react";
import { CheckCircle2, ArrowUpRight, Heart } from "lucide-react";
import type { Project } from "@/data/portfolio";
import { GithubIcon } from "../brand-icons";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [likes, setLikes] = useState<number | null>(null);
  const [liking, setLiking] = useState(false);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) translateY(-4px)`;
  }
  function onMouseLeave() {
    if (cardRef.current) cardRef.current.style.transform = "perspective(800px) rotateX(0) rotateY(0) translateY(0)";
  }

  async function onLike() {
    if (liking) return;
    setLiking(true);
    try {
      const res = await fetch("/api/visit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId: project.id }),
      });
      const data = await res.json();
      if (res.ok) setLikes(data.count);
    } catch {
      // MongoDB not configured yet — fail silently in the UI.
    } finally {
      setLiking(false);
    }
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      data-reveal
      className={`reveal card-glow rounded-2xl border p-7 transition-transform ${
        project.featured
          ? "border-accent/40 bg-bg-card sm:col-span-2"
          : "border-border-soft bg-bg-card"
      }`}
      style={{ transitionDelay: `${(index % 3) * 90}ms` }}
    >
      {project.featured && (
        <span className="mb-4 inline-block rounded-full bg-accent-soft px-3 py-1 font-mono text-xs text-accent">
          Featured
        </span>
      )}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">{project.name}</h3>
          <p className="font-mono text-xs text-accent">{project.subtitle}</p>
        </div>
        <button
          onClick={onLike}
          disabled={liking}
          aria-label={`Like ${project.name}`}
          className="magnetic flex items-center gap-1 rounded-full border border-border-soft px-3 py-1.5 text-xs text-text-muted hover:border-accent hover:text-accent disabled:opacity-60"
        >
          <Heart size={13} /> {likes ?? ""}
        </button>
      </div>

      <p className="mt-4 text-sm text-text-muted">{project.description}</p>

      <ul className="mt-4 space-y-1.5">
        {project.features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-sm text-text-muted">
            <CheckCircle2 size={14} className="shrink-0 text-accent" /> {f}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span key={t} className="rounded-md border border-border-soft px-2 py-1 font-mono text-xs text-text-faint">
            {t}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-3">
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="magnetic shine flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-semibold hover:border-accent hover:text-accent"
        >
          <GithubIcon size={14} /> Code
        </a>
        {project.demo ? (
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="magnetic shine rounded-full bg-accent px-4 py-2 text-xs font-semibold text-bg"
          >
            Live Demo
          </a>
        ) : (
          <span className="flex items-center gap-1 text-xs text-text-faint">
            Demo coming soon <ArrowUpRight size={12} />
          </span>
        )}
      </div>
    </div>
  );
}
