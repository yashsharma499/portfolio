"use client";

import { Sparkles, MonitorSmartphone, Server, Database, Cloud, Braces } from "lucide-react";
import { skillGroups } from "@/data/skills";
import SectionHeading from "@/components/SectionHeading";
import SpotlightCard from "@/components/SpotlightCard";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";

const icons: Record<string, React.ElementType> = {
  ai: Sparkles,
  frontend: MonitorSmartphone,
  backend: Server,
  data: Database,
  infra: Cloud,
  languages: Braces,
};

export default function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionHeading
        index="04"
        eyebrow="Stack"
        title="Tools of the trade"
        description="The AI layer is the differentiator — everything else exists to ship it reliably."
      />

      <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((g, i) => {
          const Icon = icons[g.key] ?? Braces;
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
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <Icon size={20} />
                  </span>
                  <h3 className="font-display text-lg font-semibold">{g.title}</h3>
                </div>
                {g.blurb && <p className="mb-4 text-sm text-muted-foreground">{g.blurb}</p>}
                <div className="mt-auto flex flex-wrap gap-2">
                  {g.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-border-soft bg-surface px-3 py-1 font-mono text-xs text-muted-foreground transition-colors hover:border-accent/60 hover:text-accent"
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
    </section>
  );
}
