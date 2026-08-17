"use client";

import { useState, type CSSProperties } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Workflow as WorkflowIcon, Radio, Boxes } from "lucide-react";
import { workflows, automationStats, systemsOrder } from "@/data/workflows";
import WorkflowCanvas from "@/components/WorkflowCanvas";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";

export default function Automations() {
  const [system, setSystem] = useState<string>(systemsOrder[0]);
  const [openId, setOpenId] = useState<string>(
    workflows.find((w) => w.system === systemsOrder[0])!.id
  );

  const visible = workflows.filter((w) => w.system === system);

  const pick = (s: string) => {
    setSystem(s);
    const first = workflows.find((w) => w.system === s);
    if (first) setOpenId(first.id);
  };

  return (
    <section
      id="automations"
      className="relative overflow-hidden border-y border-white/40 bg-linear-to-b from-white/55 via-white/15 to-white/55"
    >
      <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <SectionHeading
          index="03"
          eyebrow="Automation Layer"
          title="46 workflows running the company"
          description="Every approval, reminder and dispatch in the business runs through n8n workflows I designed — WhatsApp-first, AI-scored, and audit-logged. These are the real graphs, pulled from the live instance."
        />

        {/* headline stats */}
        <Reveal>
          <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {automationStats.map((s) => (
              <div key={s.label} className="glass glass-hover rounded-2xl p-4 text-center">
                <p className="text-gradient font-display text-2xl font-bold tabular-nums sm:text-3xl">
                  {s.value}
                </p>
                <p className="mt-1 text-[11px] leading-tight text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* system tabs */}
        <Reveal>
          <div className="mb-6 flex flex-wrap gap-2">
            {systemsOrder.map((s) => {
              const count = workflows.filter((w) => w.system === s).length;
              const active = s === system;
              return (
                <button
                  key={s}
                  onClick={() => pick(s)}
                  data-cursor
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
                    active
                      ? "glass-solid bg-primary text-white"
                      : "glass glass-btn text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Boxes size={14} />
                  {s}
                  <span className={cn("font-mono text-[10px]", active ? "text-white/70" : "text-subtle-foreground")}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* workflow list */}
        <div className="space-y-4">
          {visible.map((wf, i) => {
            const open = wf.id === openId;
            return (
              <Reveal key={wf.id} delay={Math.min(i * 0.04, 0.2)}>
                <div
                  className="glass overflow-hidden rounded-2xl transition-all duration-300"
                  style={
                    open
                      ? ({
                          // the open pane lights up: accent hairline + denser frost
                          "--glass-hairline": `0 0 0 1px ${wf.accent}4d`,
                          "--glass-tint": "rgba(255, 255, 255, 0.6)",
                        } as CSSProperties)
                      : undefined
                  }
                >
                  <button
                    onClick={() => setOpenId(open ? "" : wf.id)}
                    data-cursor
                    className="flex w-full items-center justify-between gap-3 p-4 text-left sm:gap-4 sm:p-5"
                  >
                    <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                      <span
                        className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                        style={{ background: `${wf.accent}15`, color: wf.accent }}
                      >
                        <WorkflowIcon size={18} />
                      </span>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-display font-semibold">{wf.name}</h3>
                          {wf.live && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 font-mono text-[9px] font-semibold tracking-wide text-emerald-600 uppercase">
                              <Radio size={9} /> live
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">{wf.description}</p>
                      </div>
                    </div>
                    {/* the count would eat ~40% of the title's width at 320px,
                        and the graph below already shows every node */}
                    <span className="hidden shrink-0 font-mono text-[10px] text-subtle-foreground sm:block">
                      {wf.nodeCount} nodes
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="px-3 pb-3">
                          <WorkflowCanvas workflow={wf} />
                          <p className="mt-2 px-2 font-mono text-[10px] text-subtle-foreground">
                            ← scroll horizontally to follow the full graph
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
