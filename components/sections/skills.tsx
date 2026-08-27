import { skills } from "@/data/portfolio";
import { SectionHeader } from "../section-header";
import { TiltCard } from "../tilt-card";

const allTech = Array.from(new Set(skills.flatMap((s) => s.items)));

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow="Skills" title="Toolkit" description="Across the AI lifecycle, from research to production." />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, i) => (
            <div key={group.category} data-reveal className="reveal-scale" style={{ transitionDelay: `${(i % 3) * 90}ms` }}>
              <TiltCard className="p-6">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-semibold">{group.category}</h3>
                  <span className="font-mono text-xs text-text-faint">{group.items.length}</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-md border border-border-soft px-2 py-1 font-mono text-xs text-text-muted transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </div>
          ))}
        </div>

        <div className="relative mt-14 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg to-transparent" />
          <div className="marquee-track flex w-max gap-4">
            {[...allTech, ...allTech].map((tech, i) => (
              <span key={i} className="rounded-full border border-border-soft bg-bg-card px-4 py-2 font-mono text-xs text-text-faint">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
