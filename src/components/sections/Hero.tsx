"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
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
    // min-h-svh, not dvh: on mobile, dvh grows as the URL bar hides mid-scroll,
    // which resizes the hero, reflows everything below it and invalidates the
    // cached ScrollTrigger positions. svh is stable for the whole scroll.
    <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6">
      {/* soft pastel shader background */}
      <div className="absolute inset-0 opacity-70" aria-hidden>
        {/* The shader defaults to rendering up to 1920*1080*4 px per frame and
            supersamples on retina. It's a soft blur — detail is invisible, so
            cap it and let CSS upscale. Keeps GPU free for scroll compositing.
            (The library already pauses its RAF once the hero leaves view.) */}
        <MeshGradient
          colors={["#fafaff", "#ede9fe", "#c7d2fe", "#cffafe"]}
          speed={0.18}
          minPixelRatio={1}
          maxPixelCount={1280 * 720}
          style={{ width: "100%", height: "100%" }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-background/30 via-transparent to-background" />
      </div>

      <div className="relative z-10 flex max-w-5xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.6 }}
          className="glass glass-violet mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2 sm:px-5"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          {/* 24 chars of tracked-out mono overflows a 320px pill at text-xs */}
          <span className="font-mono text-[10px] font-semibold tracking-[0.15em] text-primary uppercase sm:text-xs sm:tracking-[0.2em]">
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
          split="block"
          immediate
          delay={2.1}
          className="text-gradient font-display text-[13vw] leading-[0.95] font-bold tracking-tight sm:text-7xl md:text-8xl lg:text-[7rem]"
        >
          Sharma
        </TextReveal>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.7 }}
          className="mt-8 max-w-xl text-base text-muted-foreground sm:text-lg"
        >
          {profile.tagline} Eight production systems governing ₹11.5 Cr of
          procurement, company finances and payments across 44 project sites.
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
              className="glass-solid inline-flex h-12 items-center gap-2 rounded-full bg-primary px-7 font-medium text-white transition-shadow"
            >
              See my work <ArrowDown size={16} />
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href="#contact"
              data-cursor
              className="glass glass-btn inline-flex h-12 items-center gap-2 rounded-full px-7 font-medium text-foreground hover:text-primary"
            >
              Get in touch
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              data-cursor
              className="glass glass-btn inline-flex h-12 w-12 items-center justify-center rounded-full text-muted-foreground hover:text-primary"
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
        <div className="glass flex h-10 w-6 items-start justify-center rounded-full p-1.5">
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
