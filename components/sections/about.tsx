import { GraduationCap, Award, MapPin } from "lucide-react";
import { profile } from "@/data/portfolio";
import { numericStats } from "@/data/stats-numeric";
import { SectionHeader } from "../section-header";
import { AnimatedCounter } from "../animated-counter";

export function About() {
  return (
    <section id="about" className="scroll-mt-20 px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow="About" title="Building at the intersection of research and product" />

        <div className="grid gap-10 lg:grid-cols-3">
          <div data-reveal className="reveal-left lg:col-span-2">
            {profile.about.map((p, i) => (
              <p key={i} className="mb-4 text-text-muted">{p}</p>
            ))}

            <div className="mt-8 flex flex-wrap gap-2">
              {profile.focusAreas.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-border-soft bg-bg-card px-3 py-1.5 font-mono text-xs text-text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>

          <div data-reveal className="reveal-right space-y-4" style={{ transitionDelay: "120ms" }}>
            {[
              { icon: GraduationCap, label: "Education", value: profile.education },
              { icon: Award, label: "Academic standing", value: `CGPA ${profile.cgpa}` },
              { icon: MapPin, label: "Location", value: profile.location },
            ].map((card) => (
              <div key={card.label} className="card-glow rounded-2xl border border-border-soft bg-bg-card p-5">
                <card.icon size={18} className="mb-3 text-accent" />
                <p className="font-mono text-xs uppercase tracking-wide text-text-faint">{card.label}</p>
                <p className="mt-1 text-sm text-text">{card.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {numericStats.map((s, i) => (
            <div
              key={s.label}
              data-reveal
              className="reveal-scale stat-card card-glow rounded-2xl border border-border-soft bg-bg-card p-6 text-center"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <p className="font-mono text-3xl font-bold text-accent">
                <AnimatedCounter value={s.value} decimals={s.decimals} suffix={s.suffix} />
              </p>
              <p className="mt-1 text-xs text-text-faint">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
