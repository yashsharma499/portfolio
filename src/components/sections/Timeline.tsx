"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experience } from "@/data/experience";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Timeline() {
  const lineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="experience" className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionHeading index="05" eyebrow="Journey" title="Experience" />

      <div className="relative pl-8 sm:pl-12">
        <div className="absolute top-0 bottom-0 left-2 w-px bg-border-soft sm:left-4" aria-hidden />
        <div
          ref={lineRef}
          className="timeline-line absolute top-0 bottom-0 left-2 w-px bg-linear-to-b from-primary via-secondary to-accent sm:left-4"
          aria-hidden
        />

        <div className="space-y-14">
          {experience.map((item, i) => (
            <Reveal key={item.org + item.period} delay={i * 0.05} className="relative">
              <span
                className="absolute top-1.5 -left-8 flex h-4 w-4 items-center justify-center sm:-left-12"
                aria-hidden
              >
                <span
                  className={
                    item.current
                      ? "h-3 w-3 rounded-full bg-accent shadow-[0_0_12px_rgba(8,145,178,0.55)]"
                      : "h-2.5 w-2.5 rounded-full border-2 border-secondary bg-background"
                  }
                />
              </span>
              <p className="mb-1 font-mono text-xs text-accent tabular-nums">{item.period}</p>
              <h3 className="font-display text-xl font-semibold sm:text-2xl">
                {item.title}
                <span className="text-muted-foreground font-normal"> · {item.org}</span>
              </h3>
              <ul className="mt-3 space-y-2">
                {item.points.map((pt) => (
                  <li key={pt} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden />
                    {pt}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
