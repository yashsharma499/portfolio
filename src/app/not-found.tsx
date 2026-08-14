"use client";

import Link from "next/link";
import { motion } from "motion/react";
import MagneticButton from "@/components/MagneticButton";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-gradient glow-text font-display text-[26vw] leading-none font-bold sm:text-[12rem]"
      >
        404
      </motion.h1>
      <p className="mt-4 text-muted-foreground">This route escaped the audit log.</p>
      <MagneticButton className="mt-10">
        <Link
          href="/"
          data-cursor
          className="glass-solid inline-flex h-12 items-center rounded-full bg-primary px-7 font-medium text-white"
        >
          Back home
        </Link>
      </MagneticButton>
    </div>
  );
}
