"use client";

// Deterministic pseudo-random 26-week contribution heatmap (visual only —
// swap the generator for real GitHub activity data if desired).
function pseudoRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

const WEEKS = 26;
const DAYS = 7;

export function Heatmap() {
  const cells = Array.from({ length: WEEKS * DAYS }, (_, i) => {
    const intensity = Math.floor(pseudoRandom(i * 7.13) * 5);
    return intensity;
  });

  const levelColor = [
    "bg-border-soft",
    "bg-accent/20",
    "bg-accent/40",
    "bg-accent/65",
    "bg-accent",
  ];

  return (
    <div data-reveal className="reveal mt-14 rounded-2xl border border-border-soft bg-bg-card p-6">
      <p className="mb-4 font-mono text-xs uppercase tracking-wide text-text-faint">Activity — last 26 weeks</p>
      <div className="grid grid-flow-col grid-rows-7 gap-1 overflow-x-auto pb-2">
        {cells.map((level, i) => (
          <span
            key={i}
            className={`heat-cell h-3 w-3 rounded-[3px] ${levelColor[level]}`}
            title={`${level} contributions`}
          />
        ))}
      </div>
    </div>
  );
}
