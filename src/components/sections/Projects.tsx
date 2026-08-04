"use client";

import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { personalProjects } from "@/data/personal-projects";
import SectionHeading from "@/components/SectionHeading";
import SpotlightCard from "@/components/SpotlightCard";
import Reveal from "@/components/Reveal";

export default function Projects() {
  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionHeading
        index="02"
        eyebrow="Personal Projects"
        title="Things I build after hours"
        description="Agents, RAG, realtime — the personal lab where the production ideas start."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {personalProjects.map((p, i) => (
          <Reveal key={p.title} delay={Math.min(i * 0.05, 0.25)}>
            <SpotlightCard className="group flex h-full flex-col p-6">
              <div
                className="mb-5 h-1 w-12 rounded-full transition-all duration-500 group-hover:w-20"
                style={{ background: p.accent, boxShadow: `0 0 16px ${p.accent}66` }}
                aria-hidden
              />
              <h3 className="font-display mb-2 text-lg font-semibold">{p.title}</h3>
              <p className="mb-5 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
              <div className="mt-auto">
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span key={s} className="rounded bg-surface px-2 py-0.5 font-mono text-[10px] text-subtle-foreground">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor
                    className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border-soft px-4 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                  >
                    <GithubIcon size={13} /> Code
                  </a>
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor
                      className="inline-flex h-9 items-center gap-1.5 rounded-full px-4 text-xs font-medium text-white transition-shadow"
                      style={{ background: p.accent, boxShadow: `0 0 18px ${p.accent}44` }}
                    >
                      <ExternalLink size={13} /> Live
                    </a>
                  )}
                </div>
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
