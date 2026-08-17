"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

/** Glass pane with a mouse-tracked specular highlight (chronark pattern). */
export default function SpotlightCard({ children, className, ...rest }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const point = useRef({ x: 0, y: 0 });

  // Writing the custom properties straight from the mousemove handler
  // invalidates paint once per event — which can be several times per frame,
  // and mousemove fires while scrolling too. Coalesce into one rAF.
  // getBoundingClientRect forces a layout flush, so it reads inside the frame
  // as well: at most one reflow per frame instead of one per event.
  const flush = () => {
    frame.current = 0;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mouse-x", `${point.current.x - rect.left}px`);
    el.style.setProperty("--mouse-y", `${point.current.y - rect.top}px`);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    point.current = { x: e.clientX, y: e.clientY };
    if (!frame.current) frame.current = requestAnimationFrame(flush);
  };

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  return (
    <div ref={ref} onMouseMove={onMouseMove} className={cn("spotlight-card", className)} {...rest}>
      {children}
    </div>
  );
}
