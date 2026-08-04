"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { ArrowDown, FileDown } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { profile } from "@/data/profile";
import TextReveal from "@/components/TextReveal";
import MagneticButton from "@/components/MagneticButton";

const MeshGradient = dynamic(
  () => import("@paper-design/shaders-react").then((m) => m.MeshGradient),
  { ssr: false }
);

export default function Hero() {
  return (
    <section className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6">
      {/* soft pastel shader background */}
      <div className="absolute inset-0 opacity-70" aria-hidden>
        <MeshGradient
          colors={["#fafaff", "#ede9fe", "#c7d2fe", "#cffafe"]}
          speed={0.18}
          style={{ width: "100%", height: "100%" }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-background/30 via-transparent to-background" />
      </div>

      <div className="relative z-10 flex max-w-5xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.6 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-5 py-2"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <span className="font-mono text-xs font-semibold tracking-[0.2em] text-primary uppercase">
            {profile.role}
          </span>
        </motion.div>

        <TextReveal
          as="h1"
          split="chars"
          immediate
          delay={1.8}
          className="font-display text-[13vw] leading-[0.95] font-bold tracking-tight sm:text-7xl md:text-8xl lg:text-[7rem]"
        >
          Yash Kumar
        </TextReveal>
        <TextReveal
          as="h1"
          split="chars"
          immediate
          delay={2.0}
          className="text-gradient glow-text font-display text-[13vw] leading-[0.95] font-bold tracking-tight sm:text-7xl md:text-8xl lg:text-[7rem]"
        >
          Sharma
        </TextReveal>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.7 }}
          className="mt-8 max-w-xl text-base text-muted-foreground sm:text-lg"
        >
          {profile.tagline} Eight production systems governing procurement, finance
          and payments for a company running 27+ sites.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 0.7 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton>
            <a
              href="#work"
              data-cursor
              className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-7 font-medium text-white shadow-[0_8px_28px_rgba(124,58,237,0.32)] transition-shadow hover:shadow-[0_10px_40px_rgba(124,58,237,0.45)]"
            >
              See my work <ArrowDown size={16} />
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href={profile.resumeUrl}
              download
              data-cursor
              className="inline-flex h-12 items-center gap-2 rounded-full border border-border-soft bg-card px-7 font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <FileDown size={16} /> Resume
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              data-cursor
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border-soft bg-card text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <GithubIcon size={18} />
            </a>
          </MagneticButton>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-border-soft bg-card/60 p-1.5">
          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="h-2 w-1 rounded-full bg-primary"
          />
        </div>
      </motion.div>
    </section>
  );
}
