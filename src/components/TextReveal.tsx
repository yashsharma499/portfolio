"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

type Props = {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  className?: string;
  /** "chars" for hero-scale text, "lines" for paragraphs */
  split?: "chars" | "lines" | "words";
  delay?: number;
  /** animate immediately instead of on scroll (hero) */
  immediate?: boolean;
};

export default function TextReveal({
  children,
  as: Tag = "div",
  className,
  split = "lines",
  delay = 0,
  immediate = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const splitter = new SplitText(el, {
        type: split === "chars" ? "chars,lines" : split === "words" ? "words,lines" : "lines",
        linesClass: "split-line",
      });
      const targets =
        split === "chars" ? splitter.chars : split === "words" ? splitter.words : splitter.lines;

      gsap.set(targets, { yPercent: 110 });
      gsap.to(targets, {
        yPercent: 0,
        duration: split === "chars" ? 0.9 : 0.8,
        ease: "power4.out",
        stagger: split === "chars" ? 0.025 : 0.08,
        delay,
        ...(immediate
          ? {}
          : {
              scrollTrigger: { trigger: el, start: "top 85%", once: true },
            }),
      });
    },
    { scope: ref, dependencies: [] }
  );

  return (
    <Tag ref={ref as React.Ref<never>} className={cn(className)}>
      {children}
    </Tag>
  );
}
