"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { profile } from "@/data/profile";
import Reveal from "@/components/Reveal";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }
    const duration = 1400;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

export default function Impact() {
  return (
    <section className="relative border-y border-border-soft bg-surface/60">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <Reveal>
          <p className="mb-10 text-center font-mono text-xs tracking-[0.3em] text-accent uppercase">
            Delivered to date — real production numbers
          </p>
        </Reveal>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          {profile.delivered.map((d, i) => (
            <Reveal key={d.label} delay={Math.min(i * 0.05, 0.25)}>
              <div className="text-center">
                <p className="text-gradient font-display text-3xl font-bold sm:text-4xl">
                  <Counter value={d.value} suffix={d.suffix} />
                </p>
                <p className="mx-auto mt-2 max-w-36 text-xs leading-relaxed text-muted-foreground">
                  {d.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
