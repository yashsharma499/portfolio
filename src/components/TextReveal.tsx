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
  /**
   * "chars"/"words"/"lines" use SplitText.
   * "block" slides the whole element up behind a mask — required for
   * gradient (background-clip:text) headings, which SplitText breaks.
   */
  split?: "chars" | "lines" | "words" | "block";
  delay?: number;
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

      const common = {
        duration: split === "chars" ? 0.9 : 0.85,
        ease: "power4.out" as const,
        delay,
        ...(immediate
          ? {}
          : { scrollTrigger: { trigger: el, start: "top 85%", once: true } }),
      };

      if (split === "block") {
        const inner = el.querySelector("[data-reveal-inner]");
        if (!inner) return;
        gsap.set(inner, { yPercent: 110 });
        gsap.to(inner, { yPercent: 0, ...common });
        return;
      }

      const splitter = new SplitText(el, {
        type: split === "chars" ? "chars,lines" : split === "words" ? "words,lines" : "lines",
        linesClass: "split-line",
      });
      const targets =
        split === "chars" ? splitter.chars : split === "words" ? splitter.words : splitter.lines;

      gsap.set(targets, { yPercent: 110 });
      gsap.to(targets, {
        yPercent: 0,
        stagger: split === "chars" ? 0.025 : 0.08,
        ...common,
      });
    },
    { scope: ref, dependencies: [] }
  );

  if (split === "block") {
    return (
      <div ref={ref} className="overflow-hidden py-[0.08em]">
        <Tag data-reveal-inner className={cn("block", className)}>
          {children}
        </Tag>
      </div>
    );
  }

  return (
    <Tag ref={ref as React.Ref<never>} className={cn(className)}>
      {children}
    </Tag>
  );
}
