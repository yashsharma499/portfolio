"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

const words = ["Build", "Automate", "Govern", "Ship"];

export default function Preloader() {
  const reduced = useReducedMotion();
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    if (reduced) {
      setDone(true);
      return;
    }
    const start = performance.now();
    const total = 1400;
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min((now - start) / total, 1);
      setCount(Math.round(p * 100));
      setWordIndex(Math.min(Math.floor(p * words.length), words.length - 1));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 150);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-500 flex items-center justify-center bg-background"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden
        >
          <div className="flex flex-col items-center gap-4">
            <span className="font-display text-3xl font-semibold text-gradient">
              {words[wordIndex]}.
            </span>
            <span className="font-mono text-sm text-muted-foreground tabular-nums">{count}%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
