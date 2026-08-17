"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

/**
 * Reading-progress rail across the top of the page.
 * Driven entirely by `scaleX`, so it stays on the compositor and costs
 * nothing on the scroll path — no layout, no paint.
 */
export default function ScrollProgress() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX: reduced ? scrollYProgress : scaleX }}
      className="fixed inset-x-0 top-0 z-150 h-0.5 origin-left bg-linear-to-r from-primary via-secondary to-accent"
      aria-hidden
    />
  );
}
