"use client";

export function SplitText({ text, startDelay = 0, step = 28 }: { text: string; startDelay?: number; step?: number }) {
  return (
    <span aria-label={text} className="inline-block">
      {text.split("").map((char, i) => (
        <span
          key={i}
          data-reveal
          className="reveal-scale inline-block"
          style={{ transitionDelay: `${startDelay + i * step}ms`, transitionDuration: "0.5s" }}
          aria-hidden="true"
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}