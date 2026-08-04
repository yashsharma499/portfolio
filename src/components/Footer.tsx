"use client";

import { useEffect, useState } from "react";
import { Mail, FileDown } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { profile } from "@/data/profile";
import MagneticButton from "@/components/MagneticButton";

export default function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Asia/Kolkata",
        }).format(new Date())
      );
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="relative z-10 border-t border-border-soft">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row">
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <span className="font-display text-sm font-semibold">{profile.name}</span>
          <span className="font-mono text-xs text-subtle-foreground tabular-nums">
            {profile.location} · {time || "--:--:--"} IST
          </span>
        </div>
        <div className="flex items-center gap-3">
          {[
            { href: profile.socials.github, icon: GithubIcon, label: "GitHub" },
            { href: profile.socials.linkedin, icon: LinkedinIcon, label: "LinkedIn" },
            { href: `mailto:${profile.email}`, icon: Mail, label: "Email" },
            { href: profile.resumeUrl, icon: FileDown, label: "Resume" },
          ].map(({ href, icon: Icon, label }) => (
            <MagneticButton key={label} strength={0.3}>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                aria-label={label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border-soft text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
              >
                <Icon size={18} />
              </a>
            </MagneticButton>
          ))}
        </div>
        <p className="font-mono text-[11px] text-subtle-foreground">
          © {new Date().getFullYear()} — built with Next.js, GSAP & too much coffee
        </p>
      </div>
    </footer>
  );
}
