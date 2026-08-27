import { experience } from "@/data/portfolio";
import { SectionHeader } from "../section-header";

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow="Experience" title="Where the work happens" />

        <div className="relative">
          <div
            className="absolute left-4 top-0 h-full w-px sm:left-1/2"
            style={{ background: "linear-gradient(to bottom, var(--accent), var(--border-soft) 60%, transparent)" }}
          />
          <div className="space-y-10">
            {experience.map((item, i) => {
              const alignRight = i % 2 === 1;
              return (
                <div key={item.role} className={`relative flex flex-col sm:flex-row ${alignRight ? "sm:flex-row-reverse" : ""}`}>
                  <span className="timeline-dot absolute left-4 top-1.5 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-accent bg-bg sm:left-1/2" />
                  <div className="w-full pl-10 sm:w-1/2 sm:pl-0" style={alignRight ? { paddingLeft: 0 } : {}}>
                    <div
                      data-reveal
                      className={`${alignRight ? "reveal-right" : "reveal-left"} card-glow ml-10 rounded-2xl border border-border-soft bg-bg-card p-6 sm:ml-0 ${
                        alignRight ? "sm:mr-10" : "sm:ml-10"
                      }`}
                    >
                      <p className="font-mono text-xs text-accent">{item.period}</p>
                      <h3 className="mt-2 font-semibold">{item.role}</h3>
                      <p className="text-sm text-text-muted">{item.org}</p>
                      <p className="mt-3 text-sm text-text-muted">{item.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span key={tag} className="rounded-full border border-border-soft px-2 py-0.5 font-mono text-xs text-text-faint">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
