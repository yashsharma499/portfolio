"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

const systems = [
  { name: "Hagerstone Hub", desc: "Unified portal", color: "#7c3aed" },
  { name: "CPS", desc: "Procurement", color: "#6366f1" },
  { name: "Finance", desc: "Imprest & expense", color: "#0891b2" },
];

export default function VideoShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const start = () => {
    setPlaying(true);
    // let React paint the video before requesting playback
    requestAnimationFrame(() => videoRef.current?.play());
  };

  return (
    <section id="demo" className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <SectionHeading
        index="02"
        eyebrow="Live Walkthrough"
        title="See the systems running"
        description="A guided tour of the three systems at the core of the company — the Hub portal, CPS procurement, and Finance imprest — as they run in production."
      />

      <Reveal>
        <div className="glass glass-flat relative overflow-hidden rounded-3xl p-2 [--glass-shadow:0_24px_70px_rgba(124,58,237,0.18)] [--glass-tint:rgba(255,255,255,0.6)]">
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-[#0d0b1f]">
            {playing ? (
              <video
                ref={videoRef}
                src="/hub-overview.mp4"
                controls
                playsInline
                preload="none"
                className="h-full w-full object-contain"
              />
            ) : (
              <button
                type="button"
                onClick={start}
                data-cursor
                aria-label="Play system overview video"
                className="group absolute inset-0 flex flex-col items-center justify-center gap-3 sm:gap-6"
              >
                {/* animated ambient poster */}
                <span
                  className="pointer-events-none absolute inset-0 opacity-70"
                  style={{
                    background:
                      "radial-gradient(circle at 25% 30%, rgba(124,58,237,0.55), transparent 55%), radial-gradient(circle at 75% 70%, rgba(8,145,178,0.5), transparent 55%)",
                  }}
                  aria-hidden
                />
                <span
                  className="pointer-events-none absolute inset-0 opacity-[0.07]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                  }}
                  aria-hidden
                />

                {/* a 16:9 box is only ~153px tall at 320px wide, so the button
                    and caption have to shrink or they overflow the poster */}
                <span className="glass relative flex h-14 w-14 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 sm:h-20 sm:w-20 [--glass-blur:14px] [--glass-shadow:0_0_50px_rgba(124,58,237,0.6)] [--glass-tint:rgba(255,255,255,0.55)]">
                  <span className="absolute inset-0 animate-ping rounded-full bg-white/40" aria-hidden />
                  <Play size={22} className="relative ml-0.5 fill-primary text-primary sm:hidden" />
                  <Play size={28} className="relative ml-1 hidden fill-primary text-primary sm:block" />
                </span>

                <span className="relative px-4 text-center">
                  <span className="block font-display text-lg font-bold text-white sm:text-2xl md:text-3xl">
                    System Overview
                  </span>
                  <span className="mt-1 block font-mono text-[10px] tracking-[0.2em] text-white/70 uppercase sm:mt-2 sm:text-xs sm:tracking-[0.25em]">
                    Hub · CPS · Finance
                  </span>
                </span>
              </button>
            )}
          </div>
        </div>
      </Reveal>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {systems.map((s, i) => (
          <Reveal key={s.name} delay={i * 0.06}>
            <div className="glass glass-hover flex items-center gap-3 rounded-2xl p-4">
              <span
                className="h-9 w-1.5 shrink-0 rounded-full"
                style={{ background: s.color }}
                aria-hidden
              />
              <div>
                <p className="font-display font-semibold">{s.name}</p>
                <p className="text-xs text-muted-foreground">{s.desc}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
