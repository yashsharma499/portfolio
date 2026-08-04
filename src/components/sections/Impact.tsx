"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { profile } from "@/data/profile";
import Reveal from "@/components/Reveal";

function Counter({
  value,
  prefix,
  suffix,
  decimals,
}: {
  value: number;
  prefix: string;
  suffix: string;
  decimals: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }
    const duration = 1500;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(eased * value);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setDisplay(value);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  const formatted = display.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

export default function Impact() {
  return (
    <section className="relative overflow-hidden border-y border-border-soft bg-linear-to-b from-white/70 to-surface/50">
      <div className="relative mx-auto max-w-6xl px-6 py-16">
        <Reveal>
          <p className="mb-3 text-center font-mono text-xs tracking-[0.3em] text-accent uppercase">
            Delivered in production
          </p>
          <p className="mb-12 text-center text-sm text-subtle-foreground">
            Live figures from the systems I built and run
          </p>
        </Reveal>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          {profile.delivered.map((d, i) => (
            <Reveal key={d.label} delay={Math.min(i * 0.05, 0.25)}>
              <div className="text-center">
                <p className="text-gradient font-display text-3xl font-bold sm:text-4xl">
                  <Counter value={d.value} prefix={d.prefix} suffix={d.suffix} decimals={d.decimals} />
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
