import { BadgeCheck, Award, ShieldCheck } from "lucide-react";
import { certifications } from "@/data/portfolio";
import { SectionHeader } from "../section-header";

export function Certifications() {
  return (
    <section id="certifications" className="scroll-mt-20 px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow="Certifications" title="Credentials" description="Hover a card to verify it." />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, i) => {
            const Icon = cert.title.includes("Hackathon") ? Award : BadgeCheck;
            return (
              <div
                key={cert.title}
                data-reveal
                className="reveal-scale flip-card h-44"
                style={{ transitionDelay: `${(i % 3) * 90}ms` }}
                tabIndex={0}
              >
                <div className="flip-card-inner h-full">
                  <div className="flip-card-face card-glow flex h-full flex-col justify-center rounded-2xl border border-border-soft bg-bg-card p-6">
                    <Icon size={18} className="mb-3 text-accent" />
                    <h3 className="font-semibold leading-snug">{cert.title}</h3>
                    <p className="mt-1 text-sm text-text-muted">{cert.issuer}</p>
                    <p className="mt-2 font-mono text-xs text-text-faint">{cert.year}</p>
                  </div>
                  <div className="flip-card-face flip-card-back flex h-full flex-col items-center justify-center rounded-2xl border border-accent/40 bg-bg-card p-6 text-center">
                    <ShieldCheck size={22} className="mb-2 text-accent" />
                    <p className="font-mono text-sm text-accent">Verified</p>
                    <p className="mt-1 text-xs text-text-faint">{cert.issuer} · {cert.year}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
