"use client";

import { FileDown, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { profile } from "@/data/profile";
import TextReveal from "@/components/TextReveal";
import MagneticButton from "@/components/MagneticButton";
import Reveal from "@/components/Reveal";

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden px-6 py-36">
      {/* ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-144 w-144 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-12 blur-[120px]"
        style={{ background: "radial-gradient(circle, #7c3aed 0%, #0891b2 60%, transparent 75%)" }}
        aria-hidden
      />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
        <p className="mb-4 font-mono text-xs tracking-[0.3em] text-accent uppercase">06 / Contact</p>
        <TextReveal
          as="h2"
          split="words"
          className="font-display text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl"
        >
          Let&apos;s build something
        </TextReveal>
        <TextReveal
          as="h2"
          split="words"
          delay={0.15}
          className="text-gradient glow-text font-display text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl"
        >
          worth governing.
        </TextReveal>

        <Reveal delay={0.2}>
          <p className="mt-8 max-w-lg text-muted-foreground">
            Open to full-stack and AI engineering roles, freelance systems work, and
            interesting conversations about agents with accountability.
          </p>
        </Reveal>

        <Reveal delay={0.3} className="mt-12">
          <MagneticButton strength={0.4}>
            <a
              href={`mailto:${profile.email}`}
              data-cursor
              className="group inline-flex h-16 items-center gap-3 rounded-full bg-primary px-10 text-lg font-medium text-white shadow-[0_10px_36px_rgba(124,58,237,0.32)] transition-shadow hover:shadow-[0_14px_52px_rgba(124,58,237,0.48)]"
            >
              {profile.email}
              <ArrowUpRight size={20} className="transition-transform group-hover:rotate-45" />
            </a>
          </MagneticButton>
        </Reveal>

        <Reveal delay={0.4} className="mt-10 flex items-center gap-4">
          {[
            { href: profile.socials.github, icon: GithubIcon, label: "GitHub" },
            { href: profile.socials.linkedin, icon: LinkedinIcon, label: "LinkedIn" },
            { href: profile.resumeUrl, icon: FileDown, label: "Resume" },
          ].map(({ href, icon: Icon, label }) => (
            <MagneticButton key={label} strength={0.3}>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                aria-label={label}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-border-soft text-muted-foreground transition-colors hover:border-accent hover:text-accent"
              >
                <Icon size={18} />
              </a>
            </MagneticButton>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
