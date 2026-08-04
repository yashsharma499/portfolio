"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Zap } from "lucide-react";
import { caseStudies, companyIntro } from "@/data/company-work";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

export default function CompanyWork() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="work" className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionHeading
        index="01"
        eyebrow="Selected Work"
        title="One company, one platform, eight systems"
        description={`${companyIntro.context}`}
      />

      <Reveal className="mb-12 flex flex-wrap gap-3">
        {companyIntro.themes.map((t) => (
          <span
            key={t}
            className="rounded-full border border-primary/30 bg-primary/8 px-4 py-1.5 font-mono text-[11px] text-muted-foreground"
          >
            {t}
          </span>
        ))}
      </Reveal>

      <div className="relative">
        {caseStudies.map((cs, i) => (
          <Reveal key={cs.slug} delay={Math.min(i * 0.04, 0.2)}>
            <Link
              href={`/work/${cs.slug}`}
              data-cursor="view"
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              className="group relative block border-b border-border-soft py-8 transition-colors first:border-t"
            >
              {active === i && (
                <motion.div
                  layoutId="work-hover"
                  className="absolute inset-0 -mx-4 rounded-2xl"
                  style={{ background: `linear-gradient(90deg, ${cs.accent}14, transparent 70%)` }}
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                />
              )}
              <div className="relative flex items-center justify-between gap-6">
                <div className="flex min-w-0 items-baseline gap-4 sm:gap-8">
                  <span className="font-mono text-xs text-subtle-foreground tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-2xl font-semibold tracking-tight transition-transform duration-300 group-hover:translate-x-2 sm:text-4xl">
                      {cs.title}
                      {cs.flagship && (
                        <span className="ml-3 align-middle rounded-full bg-primary/20 px-2.5 py-1 font-mono text-[10px] tracking-wider text-primary uppercase">
                          flagship
                        </span>
                      )}
                    </h3>
                    <p className="mt-1 truncate text-sm text-muted-foreground">{cs.short}</p>
                    <span
                      className="mt-2.5 inline-flex items-start gap-2 rounded-lg px-3 py-1.5 text-xs font-medium"
                      style={{ background: `${cs.accent}12`, color: cs.accent }}
                    >
                      <Zap size={13} className="mt-0.5 shrink-0" aria-hidden />
                      {cs.solution}
                    </span>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-4">
                  <span className="hidden font-mono text-[11px] text-subtle-foreground md:inline">{cs.tag}</span>
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-border-soft transition-all duration-300 group-hover:rotate-45 group-hover:border-transparent"
                    style={{ background: active === i ? cs.accent : undefined }}
                  >
                    <ArrowUpRight size={18} className={active === i ? "text-white" : "text-muted-foreground"} />
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
