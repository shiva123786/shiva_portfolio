import { Trophy } from "lucide-react";
import { achievements, extracurricular } from "@/data/portfolio";
import { SectionHeader } from "../section-header";

export function Achievements() {
  return (
    <section id="achievements" className="scroll-mt-20 px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow="Achievements" title="Milestones &amp; involvement" />

        <div className="grid gap-10 lg:grid-cols-2">
          <div data-reveal className="reveal-left space-y-3">
            {achievements.map((a) => (
              <div key={a} className="flex items-start gap-3 rounded-xl border border-border-soft bg-bg-card p-4">
                <Trophy size={16} className="mt-0.5 shrink-0 text-accent" />
                <p className="text-sm text-text-muted">{a}</p>
              </div>
            ))}
          </div>

          <div data-reveal className="reveal-right space-y-4" style={{ transitionDelay: "120ms" }}>
            {extracurricular.map((e) => (
              <div key={e.role} className="card-glow rounded-2xl border border-border-soft bg-bg-card p-6">
                <p className="font-mono text-sm text-accent">{e.role}</p>
                <p className="text-sm font-medium text-text">{e.org}</p>
                <p className="mt-2 text-sm text-text-muted">{e.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
