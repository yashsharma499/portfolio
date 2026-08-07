"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { profile } from "@/data/profile";
import { marqueeSkills } from "@/data/skills";
import SectionHeading from "@/components/SectionHeading";
import SpotlightCard from "@/components/SpotlightCard";
import Reveal from "@/components/Reveal";

function Portrait() {
  return (
    <div className="relative mx-auto aspect-square w-56 sm:w-72">
      {/* soft rotating glow behind the photo */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 26, ease: "linear" }}
        className="absolute -inset-2 rounded-full bg-conic from-primary/45 via-accent/35 to-primary/45 opacity-70 blur-2xl"
        aria-hidden
      />
      {/* gradient ring */}
      <div className="absolute inset-0 rounded-full bg-linear-to-br from-primary via-secondary to-accent p-0.75 shadow-[0_12px_40px_rgba(124,58,237,0.22)]">
        <div className="relative h-full w-full overflow-hidden rounded-full bg-card">
          <Image
            src="/yash.jpg"
            alt="Yash Kumar Sharma"
            fill
            sizes="(max-width: 640px) 224px, 288px"
            className="object-cover"
            priority={false}
          />
        </div>
      </div>
      {/* orbiting accent dot */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        className="absolute -inset-2"
        aria-hidden
      >
        <span className="absolute top-0 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_12px_rgba(8,145,178,0.7)]" />
      </motion.div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionHeading
        index="05"
        eyebrow="About"
        title="I ship systems, not demos"
        description="What a business owner gets when they work with me: operations that run themselves, money that can't move without a trail, and AI that answers to a human."
      />

      <div className="grid items-start gap-12 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-5">
          {profile.about.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className="text-lg leading-relaxed text-muted-foreground">{p}</p>
            </Reveal>
          ))}

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {profile.principles.map((pr, i) => (
              <Reveal key={pr.title} delay={i * 0.06}>
                <SpotlightCard className="h-full p-5">
                  <h3 className="font-display mb-2 font-semibold text-foreground">{pr.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{pr.body}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.15} className="lg:sticky lg:top-28">
          <Portrait />
          <p className="mt-5 text-center font-mono text-xs text-subtle-foreground">
            {profile.name}
          </p>
          <p className="mt-1 text-center font-mono text-[11px] text-accent">
            {profile.role}
          </p>
        </Reveal>
      </div>

      {/* skills marquee */}
      <div className="mt-24 overflow-hidden mask-x-from-80% mask-x-to-100%" aria-hidden>
        <div className="animate-marquee flex w-max gap-10 hover:[animation-play-state:paused]">
          {[...marqueeSkills, ...marqueeSkills].map((s, i) => (
            <span key={i} className="font-display text-2xl font-semibold whitespace-nowrap text-transparent" style={{ WebkitTextStroke: "1px rgba(99,102,241,0.75)" }}>
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
