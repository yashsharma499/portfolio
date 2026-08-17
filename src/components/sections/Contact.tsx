"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { profile } from "@/data/profile";
import TextReveal from "@/components/TextReveal";
import MagneticButton from "@/components/MagneticButton";
import Reveal from "@/components/Reveal";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** wa.me wants a bare international number */
const waNumber = profile.phone.replace(/\D/g, "");

const directLines = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "Location", value: profile.location },
  {
    label: "LinkedIn",
    value: profile.socials.linkedin.split("/in/")[1]?.replace(/\/$/, "") ?? "LinkedIn",
    href: profile.socials.linkedin,
    icon: LinkedinIcon,
  },
  {
    label: "GitHub",
    value: profile.socials.github.split("github.com/")[1] ?? "GitHub",
    href: profile.socials.github,
    icon: GithubIcon,
  },
];

export default function Contact() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [error, setError] = useState<{ field: string; text: string } | null>(null);
  const [sent, setSent] = useState(false);

  const set = (field: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    if (error?.field === field) setError(null);
  };

  // No backend here, so submitting hands off to the visitor's mail client with
  // everything prefilled. Swap this body for a fetch() when an endpoint exists.
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!values.name.trim()) return setError({ field: "name", text: "Please tell me your name." });
    if (!EMAIL_RE.test(values.email))
      return setError({ field: "email", text: "That email address doesn't look right." });
    if (values.message.trim().length < 10)
      return setError({ field: "message", text: "A line or two about the project helps." });

    setError(null);
    const subject = `Project enquiry from ${values.name.trim()}`;
    const body = `${values.message.trim()}\n\n— ${values.name.trim()}\n${values.email.trim()}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section id="contact" className="relative overflow-hidden px-6 py-24 sm:py-32">
      {/* ambient glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-144 w-144 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-12 blur-[120px]"
        style={{ background: "radial-gradient(circle, #7c3aed 0%, #0891b2 60%, transparent 75%)" }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl">
        <p className="mb-4 font-mono text-[11px] tracking-[0.2em] text-accent uppercase sm:text-xs sm:tracking-[0.3em]">
          <span className="text-subtle-foreground">09 /</span> Contact
        </p>

        <div className="grid items-start gap-10 lg:grid-cols-[1fr_22rem] lg:gap-14">
          <div>
            <TextReveal
              as="h2"
              split="words"
              className="font-display text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl"
            >
              Your operations are already running —
            </TextReveal>
            <TextReveal
              as="h2"
              split="block"
              delay={0.15}
              className="text-gradient font-display text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl"
            >
              let&apos;s turn them into software.
            </TextReveal>

            <Reveal delay={0.2}>
              <p className="mt-6 max-w-xl text-muted-foreground">
                Open to full-stack and AI engineering roles, freelance systems work, and
                interesting conversations about agents with accountability.
              </p>
            </Reveal>

            <Reveal delay={0.28}>
              <form onSubmit={onSubmit} noValidate className="mt-10 max-w-2xl">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="c-name"
                      className="mb-2 block font-mono text-[11px] tracking-[0.2em] text-subtle-foreground uppercase"
                    >
                      Name <span className="text-primary">*</span>
                    </label>
                    <input
                      id="c-name"
                      name="name"
                      autoComplete="name"
                      placeholder="Your name"
                      value={values.name}
                      onChange={set("name")}
                      aria-invalid={error?.field === "name"}
                      aria-describedby={error ? "c-error" : undefined}
                      className="field"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="c-email"
                      className="mb-2 block font-mono text-[11px] tracking-[0.2em] text-subtle-foreground uppercase"
                    >
                      Email <span className="text-primary">*</span>
                    </label>
                    <input
                      id="c-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@company.com"
                      value={values.email}
                      onChange={set("email")}
                      aria-invalid={error?.field === "email"}
                      aria-describedby={error ? "c-error" : undefined}
                      className="field"
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label
                    htmlFor="c-message"
                    className="mb-2 block font-mono text-[11px] tracking-[0.2em] text-subtle-foreground uppercase"
                  >
                    Message <span className="text-primary">*</span>
                  </label>
                  <textarea
                    id="c-message"
                    name="message"
                    rows={5}
                    placeholder="What are you trying to build, and what's slowing you down right now?"
                    value={values.message}
                    onChange={set("message")}
                    aria-invalid={error?.field === "message"}
                    aria-describedby={error ? "c-error" : undefined}
                    className="field resize-y"
                  />
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <MagneticButton strength={0.3}>
                    <button
                      type="submit"
                      data-cursor
                      className="glass-solid inline-flex h-12 items-center gap-2 rounded-full bg-primary px-7 text-sm font-medium text-white transition-shadow"
                    >
                      Start a project
                      <ArrowUpRight size={16} />
                    </button>
                  </MagneticButton>
                  <MagneticButton strength={0.3}>
                    <a
                      href={`https://wa.me/${waNumber}`}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor
                      className="glass glass-btn inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm font-medium text-foreground hover:text-primary"
                    >
                      WhatsApp me
                      <ArrowUpRight size={16} />
                    </a>
                  </MagneticButton>
                  <a
                    href={`mailto:${profile.email}`}
                    className="font-mono text-xs text-subtle-foreground transition-colors hover:text-foreground"
                  >
                    {profile.email}
                  </a>
                </div>

                <div className="mt-4 min-h-5" aria-live="polite">
                  <AnimatePresence mode="wait">
                    {error && (
                      <motion.p
                        key={error.text}
                        id="c-error"
                        role="alert"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.25 }}
                        className="font-mono text-xs text-red-600"
                      >
                        {error.text}
                      </motion.p>
                    )}
                    {sent && !error && (
                      <motion.p
                        key="sent"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.25 }}
                        className="inline-flex items-center gap-2 font-mono text-xs text-emerald-600"
                      >
                        <Check size={13} /> Your mail app should be opening — hit send and it reaches me.
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="lg:sticky lg:top-28">
            <div className="glass rounded-3xl p-6">
              <div className="mb-5 flex items-baseline justify-between gap-3">
                <h3 className="font-mono text-[11px] tracking-[0.2em] text-foreground uppercase">
                  Direct lines
                </h3>
                <span className="font-mono text-[10px] text-subtle-foreground">
                  {profile.timezoneLabel}
                </span>
              </div>

              <ul>
                {directLines.map(({ label, value, href, icon: Icon }) => {
                  const row = (
                    <>
                      <span className="shrink-0 text-sm text-muted-foreground">{label}</span>
                      <span className="mx-3 h-px flex-1 bg-border-soft" aria-hidden />
                      <span className="inline-flex min-w-0 items-center gap-1.5 font-mono text-xs text-foreground">
                        {Icon && <Icon size={12} className="shrink-0" />}
                        <span className="truncate">{value}</span>
                      </span>
                    </>
                  );
                  return (
                    <li key={label} className="border-b border-border-soft last:border-0">
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith("http") ? "_blank" : undefined}
                          rel="noreferrer"
                          data-cursor
                          className="flex items-center py-3.5 transition-colors hover:text-primary"
                        >
                          {row}
                        </a>
                      ) : (
                        <div className="flex items-center py-3.5">{row}</div>
                      )}
                    </li>
                  );
                })}
              </ul>

              <p className="mt-5 text-xs leading-relaxed text-subtle-foreground">
                Email is best — I read every message myself.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
