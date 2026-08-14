"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import MagneticButton from "@/components/MagneticButton";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#automations", label: "Automations" },
  { href: "/#projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  // the glass thickens once content is passing underneath it
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-4 left-1/2 z-100 w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2"
    >
      <nav
        data-scrolled={scrolled}
        className="glass flex items-center justify-between rounded-full px-5 py-3 transition-[background-color,box-shadow] duration-500"
      >
        <Link href="/" className="font-display text-lg font-bold tracking-tight" data-cursor>
          <span className="text-gradient">YS</span>
          {pathname?.startsWith("/work") && (
            <span className="ml-2 hidden font-mono text-[10px] font-normal text-muted-foreground sm:inline">
              ← back home
            </span>
          )}
        </Link>
        <ul className="flex items-center gap-1 sm:gap-2">
          {links.map((l) => (
            <li key={l.href}>
              <MagneticButton strength={0.25}>
                <Link
                  href={l.href}
                  className="block rounded-full px-3 py-2 text-sm text-muted-foreground transition-all duration-300 hover:bg-white/55 hover:text-foreground hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_2px_10px_rgba(23,16,58,0.06)]"
                >
                  {l.label}
                </Link>
              </MagneticButton>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}
