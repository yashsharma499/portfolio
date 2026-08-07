"use client";

import { Sparkles, MonitorSmartphone, Server, Database, Cloud, Braces } from "lucide-react";
import { skillGroups } from "@/data/skills";
import SectionHeading from "@/components/SectionHeading";
import SpotlightCard from "@/components/SpotlightCard";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";

const meta: Record<string, { icon: React.ElementType; color: string }> = {
  ai: { icon: Sparkles, color: "#7c3aed" },
  frontend: { icon: MonitorSmartphone, color: "#0891b2" },
  backend: { icon: Server, color: "#d946ef" },
  data: { icon: Database, color: "#0284c7" },
  infra: { icon: Cloud, color: "#0d9488" },
  languages: { icon: Braces, color: "#9333ea" },
};

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative overflow-hidden border-y border-border-soft bg-linear-to-br from-[#f5f2ff] via-[#fdf4ff] to-[#effcff]"
    >
      <div className="relative mx-auto max-w-6xl px-6 py-28">
        <SectionHeading
          index="06"
          eyebrow="Stack"
          title="Tools of the trade"
          description="The AI layer is the differentiator — everything else exists to ship it reliably."
        />

        <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((g, i) => {
            const { icon: Icon, color } = meta[g.key] ?? meta.languages;
            return (
              <Reveal
                key={g.key}
                delay={i * 0.05}
                className={cn(
                  g.size === "lg" && "sm:col-span-2 lg:col-span-2 lg:row-span-2",
                  g.size === "md" && "lg:col-span-2"
                )}
              >
                <SpotlightCard className="flex h-full flex-col p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{ background: `${color}15`, color }}
                    >
                      <Icon size={20} />
                    </span>
                    <h3 className="font-display text-lg font-semibold">{g.title}</h3>
                  </div>
                  {g.blurb && <p className="mb-4 text-sm text-muted-foreground">{g.blurb}</p>}
                  <div className="mt-auto flex flex-wrap gap-2">
                    {g.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border px-3 py-1 font-mono text-xs transition-colors"
                        style={{
                          borderColor: `${color}2e`,
                          background: `${color}0a`,
                          color: "var(--muted-foreground)",
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
