"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { services, servicesIntro } from "@/data/services";
import SectionHeading from "@/components/SectionHeading";
import SpotlightCard from "@/components/SpotlightCard";
import Reveal from "@/components/Reveal";

export default function Services() {
  const reduced = useReducedMotion();

  // Parent drives the children's timing, so the deliverables fan out after
  // their own card has settled rather than every list in the grid firing at once.
  const list = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } },
  };
  const item = reduced
    ? { hidden: {}, show: {} }
    : {
        hidden: { opacity: 0, x: -8 },
        show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
      };

  return (
    <section id="services" className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <SectionHeading
        index="08"
        eyebrow="Services"
        title={servicesIntro.title}
        description={servicesIntro.description}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={Math.min(i * 0.08, 0.24)}>
            <SpotlightCard className="group flex h-full flex-col p-6 sm:p-7">
              <div className="mb-5 flex items-center justify-between">
                <span className="font-mono text-[11px] tracking-[0.2em] text-subtle-foreground uppercase">
                  {String(i + 1).padStart(2, "0")} / Service
                </span>
                <ArrowUpRight
                  size={16}
                  className="text-subtle-foreground transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  style={{ color: s.accent }}
                  aria-hidden
                />
              </div>

              <div
                className="mb-5 h-1 w-12 rounded-full transition-all duration-500 group-hover:w-24"
                style={{ background: s.accent, boxShadow: `0 0 16px ${s.accent}66` }}
                aria-hidden
              />

              <h3 className="font-display mb-3 text-xl leading-snug font-semibold tracking-tight sm:text-2xl">
                {s.title}
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">{s.description}</p>

              <motion.ul
                variants={list}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                className="mb-6 space-y-2.5"
              >
                {s.deliverables.map((d) => (
                  <motion.li
                    key={d}
                    variants={item}
                    className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: s.accent }}
                      aria-hidden
                    />
                    {d}
                  </motion.li>
                ))}
              </motion.ul>

              <div className="mt-auto">
                <div className="relative mb-4 h-px w-full bg-border-soft" aria-hidden>
                  <div
                    className="flow-rule absolute inset-0"
                    style={{ background: `linear-gradient(90deg, ${s.accent}, transparent)` }}
                  />
                </div>
                <p className="font-mono text-[11px] leading-relaxed text-subtle-foreground">
                  {s.engagement}
                </p>
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1} className="mt-10 text-center">
        <a
          href="#contact"
          data-cursor
          className="glass glass-btn inline-flex h-12 items-center gap-2 rounded-full px-7 text-sm font-medium text-foreground hover:text-primary"
        >
          Tell me what you&apos;re building
          <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:rotate-45" />
        </a>
      </Reveal>
    </section>
  );
}
