"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [variant, setVariant] = useState<"default" | "view">("default");
  const variantRef = useRef<"default" | "view">("default");

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power2.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power2.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    // The ring only changes size when the variant flips (40px <-> 84px), so
    // cache the half-width. Reading offsetWidth per mousemove forced a layout
    // flush on every pointer event, including while scrolling.
    let halfWidth = ring.offsetWidth / 2;
    const measure = () => {
      halfWidth = ring.offsetWidth / 2;
    };

    const move = (e: MouseEvent) => {
      dotX(e.clientX - 4);
      dotY(e.clientY - 4);
      ringX(e.clientX - halfWidth);
      ringY(e.clientY - halfWidth);
    };

    const over = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-cursor]");
      const next = target?.getAttribute("data-cursor") === "view" ? "view" : "default";
      if (next === variantRef.current) return;
      variantRef.current = next;
      setVariant(next);
      // the width transition runs 0.3s; re-measure once it has settled
      setTimeout(measure, 320);
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden />
      <div ref={ringRef} className="cursor-ring" data-variant={variant} aria-hidden>
        <span className="cursor-label font-mono">VIEW</span>
      </div>
    </>
  );
}
