"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#automations", label: "Automations" },
  { href: "/#projects", label: "Projects" },
  { href: "/#services", label: "Services" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const scrolledRef = useRef(false);
  const [open, setOpen] = useState(false);

  // The glass thickens once content is passing underneath it. This runs on
  // every scroll event, so mirror the state in a ref and only dispatch to
  // React when the boolean actually flips — otherwise we'd push a setState
  // through the scheduler on every frame of the scroll.
  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 24;
      if (next === scrolledRef.current) return;
      scrolledRef.current = next;
      setScrolled(next);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reset on navigation. Adjusting state during render (rather than in an
  // effect) is React's documented pattern for this, and avoids the extra
  // commit-then-rerender pass. Covers back/forward too, not just link taps.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* Sits outside the header on purpose: the header is translated, which
          makes it the containing block for any fixed-position descendant, so
          an overlay nested inside it would only cover the pill itself. */}
      <AnimatePresence>
        {open && (
          <motion.button
            type="button"
            aria-label="Close menu"
            tabIndex={-1}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-90 cursor-default bg-foreground/10 sm:hidden"
          />
        )}
      </AnimatePresence>

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-4 left-1/2 z-100 w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2"
      >
        <nav
          data-scrolled={scrolled}
          className="glass flex items-center justify-between rounded-full px-4 py-2.5 transition-[background-color,box-shadow] duration-500 sm:px-5 sm:py-3"
        >
          <Link href="/" className="font-display text-lg font-bold tracking-tight" data-cursor>
            <span className="text-gradient">YS</span>
            {pathname?.startsWith("/work") && (
              <span className="ml-2 hidden font-mono text-[10px] font-normal text-muted-foreground sm:inline">
                ← back home
              </span>
            )}
          </Link>

          {/* The four labels need ~345px of the ~303px a 375px screen leaves
              inside the pill, so they collapse into a sheet below the sm
              breakpoint rather than wrapping or clipping. */}
          <ul className="hidden items-center gap-1 sm:flex sm:gap-2">
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

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="-mr-1 flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground sm:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.ul
              id="mobile-nav"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="glass mt-2 flex flex-col gap-1 rounded-3xl p-2 sm:hidden"
            >
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/55 hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
