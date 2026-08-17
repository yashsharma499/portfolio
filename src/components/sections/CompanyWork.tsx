"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Zap } from "lucide-react";
import { caseStudies, companyIntro } from "@/data/company-work";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

export default function CompanyWork() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="work" className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <SectionHeading
        index="01"
        eyebrow="Selected Work"
        title="One company, one platform, eight systems"
        description={`${companyIntro.context}`}
      />

      {/* These are ~100-char sentences, not tags — they wrap to several lines
          at every width, and a wrapped `rounded-full` reads as a lopsided
          ellipse. A fixed corner radius holds up at any line count. */}
      <Reveal className="mb-12 flex flex-wrap gap-2 sm:gap-3">
        {companyIntro.themes.map((t) => (
          <span
            key={t}
            className="glass glass-violet rounded-2xl px-4 py-2 font-mono text-[11px] leading-relaxed text-muted-foreground"
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
              className="group relative block border-b border-border-soft py-6 transition-colors first:border-t sm:py-8"
            >
              {/* a single glass lens that slides between rows on hover */}
              {active === i && (
                <motion.div
                  layoutId="work-hover"
                  className="glass glass-flat absolute inset-0 -mx-4 rounded-2xl"
                  style={
                    {
                      "--glass-tint": `${cs.accent}1f`,
                      "--glass-hairline": `0 0 0 1px ${cs.accent}2e`,
                    } as CSSProperties
                  }
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                />
              )}
              <div className="relative flex items-center justify-between gap-3 sm:gap-6">
                <div className="flex min-w-0 items-baseline gap-3 sm:gap-8">
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
                    {/* truncate left only ~25 of 55 chars visible at 320px */}
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{cs.short}</p>
                    <span
                      className="mt-2.5 inline-flex items-start gap-2 rounded-lg px-3 py-1.5 text-xs font-medium"
                      style={{
                        background: `linear-gradient(150deg, ${cs.accent}1f, ${cs.accent}0a)`,
                        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.55), 0 0 0 1px ${cs.accent}1f`,
                        color: cs.accent,
                      }}
                    >
                      <Zap size={13} className="mt-0.5 shrink-0" aria-hidden />
                      {cs.solution}
                    </span>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-4">
                  <span className="hidden font-mono text-[11px] text-subtle-foreground md:inline">{cs.tag}</span>
                  <span
                    className="glass flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 group-hover:rotate-45 sm:h-11 sm:w-11"
                    style={
                      active === i
                        ? ({
                            "--glass-tint": cs.accent,
                            "--glass-hairline": `0 0 0 1px ${cs.accent}`,
                          } as CSSProperties)
                        : undefined
                    }
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
