"use client";

import { useEffect, useState } from "react";

export function Typewriter({ words, className = "" }: { words: string[]; className?: string }) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    let charIndex = 0;
    let deleting = false;
    let cancelled = false;

    function tick() {
      if (cancelled) return;
      if (!deleting) {
        charIndex++;
        setText(current.slice(0, charIndex));
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(tick, 1800);
          return;
        }
        setTimeout(tick, 80);
      } else {
        charIndex--;
        setText(current.slice(0, charIndex));
        if (charIndex === 0) {
          setTimeout(() => setWordIndex((i) => i + 1), 200);
          return;
        }
        setTimeout(tick, 35);
      }
    }
    const timer = setTimeout(tick, 80);
    return () => { cancelled = true; clearTimeout(timer); };
  }, [wordIndex, words]);

  return (
    <span className={className}>
      {text}
      <span className="caret text-accent">|</span>
    </span>
  );
}