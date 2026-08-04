"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { profile } from "@/data/profile";
import MagneticButton from "@/components/MagneticButton";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#projects", label: "Projects" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-4 left-1/2 z-100 w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2"
    >
      <nav className="glass flex items-center justify-between rounded-full px-5 py-3">
        <Link href="/" className="font-display text-lg font-bold tracking-tight" data-cursor>
          <span className="text-gradient">YS</span>
          <span className="ml-2 hidden font-mono text-[10px] font-normal text-muted-foreground sm:inline">
            {pathname?.startsWith("/work") ? "← back home" : "portfolio v1"}
          </span>
        </Link>
        <ul className="flex items-center gap-1 sm:gap-2">
          {links.map((l) => (
            <li key={l.href}>
              <MagneticButton strength={0.25}>
                <Link
                  href={l.href}
                  className="rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                </Link>
              </MagneticButton>
            </li>
          ))}
          <li className="hidden items-center gap-2 pl-2 sm:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="font-mono text-[10px] text-muted-foreground">
              {profile.available ? "open to work" : "booked"}
            </span>
          </li>
        </ul>
      </nav>
    </motion.header>
  );
}
