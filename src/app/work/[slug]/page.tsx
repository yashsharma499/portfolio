import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { caseStudies, companyIntro } from "@/data/company-work";
import Reveal from "@/components/Reveal";
import TextReveal from "@/components/TextReveal";
import SpotlightCard from "@/components/SpotlightCard";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) return {};
  return {
    title: cs.title,
    description: cs.summary,
    openGraph: { title: cs.title, description: cs.short },
  };
}

function Block({ label, items, accent }: { label: string; items: string[]; accent: string }) {
  if (!items.length) return null;
  return (
    <Reveal>
      <div className="mb-14">
        <h2 className="font-display mb-6 text-2xl font-semibold tracking-tight sm:text-3xl">
          <span className="mr-3 font-mono text-sm align-middle" style={{ color: accent }}>
            //
          </span>
          {label}
        </h2>
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item} className="flex gap-3 text-muted-foreground leading-relaxed">
              <Check size={18} className="mt-1 shrink-0" style={{ color: accent }} aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = caseStudies.findIndex((c) => c.slug === slug);
  if (index === -1) notFound();
  const cs = caseStudies[index];
  const next = caseStudies[(index + 1) % caseStudies.length];

  return (
    <article className="relative">
      {/* hero */}
      <header className="relative overflow-hidden px-6 pt-40 pb-20">
        <div
          className="pointer-events-none absolute -top-40 left-1/2 h-120 w-160 -translate-x-1/2 rounded-full opacity-10 blur-[110px]"
          style={{ background: cs.accent }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-4xl">
          <Link
            href="/#work"
            className="mb-10 inline-flex items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={14} /> all work
          </Link>
          <p className="mb-4 font-mono text-xs tracking-[0.3em] uppercase" style={{ color: cs.accent }}>
            {cs.tag} · {companyIntro.company}
          </p>
          <TextReveal
            as="h1"
            split="words"
            immediate
            className="font-display text-4xl font-bold tracking-tight sm:text-6xl"
          >
            {cs.title}
          </TextReveal>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{cs.summary}</p>

          {/* stat strip */}
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {cs.stats.map((s) => (
              <Reveal key={s.label}>
                <SpotlightCard className="p-4 text-center">
                  <p className="font-display text-2xl font-bold tabular-nums sm:text-3xl" style={{ color: cs.accent }}>
                    {s.value}
                  </p>
                  <p className="mt-1 font-mono text-[10px] text-subtle-foreground uppercase tracking-wider">
                    {s.label}
                  </p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </header>

      {/* body */}
      <div className="mx-auto max-w-4xl px-6 pb-24">
        <Reveal>
          <div className="glass mb-14 rounded-2xl p-6 sm:p-8">
            <h2 className="font-display mb-3 text-lg font-semibold">The problem</h2>
            <p className="text-muted-foreground leading-relaxed">{cs.problem}</p>
          </div>
        </Reveal>

        <Block label="What I built" items={cs.built} accent={cs.accent} />
        <Block label="Architecture highlights" items={cs.architecture} accent={cs.accent} />
        <Block label="The AI layer" items={cs.ai} accent={cs.accent} />
        <Block label="Impact" items={cs.impact} accent={cs.accent} />

        <Reveal>
          <div className="mb-16 flex flex-wrap gap-2">
            {cs.stack.map((s) => (
              <span
                key={s}
                className="glass-chip rounded-full px-3 py-1.5 font-mono text-xs text-muted-foreground"
              >
                {s}
              </span>
            ))}
          </div>
        </Reveal>

        {/* next case study */}
        <Reveal>
          <Link href={`/work/${next.slug}`} data-cursor="view" className="group block">
            <SpotlightCard className="flex items-center justify-between p-8">
              <div>
                <p className="mb-1 font-mono text-xs text-subtle-foreground uppercase tracking-wider">
                  next case study
                </p>
                <p className="font-display text-2xl font-semibold sm:text-3xl">{next.title}</p>
              </div>
              <span
                className="glass flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-1"
              >
                <ArrowRight size={18} style={{ color: next.accent }} />
              </span>
            </SpotlightCard>
          </Link>
        </Reveal>
      </div>
    </article>
  );
}
