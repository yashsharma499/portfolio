"use client";

import { useMemo } from "react";
import {
  Webhook, Clock, Globe, GitBranch, Code2, Database, Mail, MessageCircle,
  Sparkles, CornerDownLeft, Layers, Timer, Settings2, Share2, Filter,
  Table2, CircleDot, Split, Merge,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type WFNode = {
  id: string;
  label: string;
  kind: string;
  col: number;
  row: number;
  trigger?: boolean;
};

export type WFEdge = { from: string; to: string; label?: string };

export type Workflow = {
  id: string;
  name: string;
  system: string;
  description: string;
  accent: string;
  live: boolean;
  nodeCount: number;
  nodes: WFNode[];
  edges: WFEdge[];
};

const KIND: Record<string, { icon: React.ElementType; color: string }> = {
  webhook: { icon: Webhook, color: "#7c3aed" },
  schedule: { icon: Clock, color: "#d97706" },
  http: { icon: Globe, color: "#0284c7" },
  if: { icon: GitBranch, color: "#ea580c" },
  switch: { icon: Split, color: "#ea580c" },
  code: { icon: Code2, color: "#64748b" },
  set: { icon: Settings2, color: "#64748b" },
  db: { icon: Database, color: "#059669" },
  mail: { icon: Mail, color: "#dc2626" },
  whatsapp: { icon: MessageCircle, color: "#16a34a" },
  ai: { icon: Sparkles, color: "#7c3aed" },
  respond: { icon: CornerDownLeft, color: "#0891b2" },
  batch: { icon: Layers, color: "#8b5cf6" },
  wait: { icon: Timer, color: "#d97706" },
  social: { icon: Share2, color: "#2563eb" },
  filter: { icon: Filter, color: "#ea580c" },
  sheets: { icon: Table2, color: "#16a34a" },
  merge: { icon: Merge, color: "#8b5cf6" },
  noop: { icon: CircleDot, color: "#94a3b8" },
};

const COL_W = 176;
const ROW_H = 116;
const NODE = 52;
const PAD_X = 36;
const PAD_Y = 40;

const cx = (n: WFNode) => PAD_X + n.col * COL_W + NODE / 2;
const cy = (n: WFNode) => PAD_Y + n.row * ROW_H + NODE / 2;

export default function WorkflowCanvas({ workflow }: { workflow: Workflow }) {
  const { nodes, edges, accent, id } = workflow;

  const { width, height, paths } = useMemo(() => {
    const maxCol = Math.max(...nodes.map((n) => n.col));
    const maxRow = Math.max(...nodes.map((n) => n.row));
    const w = PAD_X * 2 + maxCol * COL_W + NODE;
    const h = PAD_Y * 2 + maxRow * ROW_H + NODE + 28;

    const byId = new Map(nodes.map((n) => [n.id, n]));
    const p = edges.flatMap((e) => {
      const a = byId.get(e.from);
      const b = byId.get(e.to);
      if (!a || !b) return [];
      const sx = cx(a) + NODE / 2;
      const sy = cy(a);
      const tx = cx(b) - NODE / 2;
      const ty = cy(b);
      const dx = Math.max(36, (tx - sx) * 0.5);
      return [{
        key: `${e.from}->${e.to}`,
        d: `M ${sx} ${sy} C ${sx + dx} ${sy}, ${tx - dx} ${ty}, ${tx} ${ty}`,
        label: e.label,
        lx: (sx + tx) / 2,
        ly: (sy + ty) / 2 - 7,
      }];
    });
    return { width: w, height: h, paths: p };
  }, [nodes, edges]);

  return (
    // overscroll-x-contain stops a horizontal swipe that runs off the end of
    // the graph from chaining into the browser's back-navigation gesture
    <div className="relative overflow-x-auto overscroll-x-contain overflow-y-hidden rounded-2xl border border-white/55 bg-white/55 backdrop-blur-md">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(23,16,58,0.14) 1px, transparent 1px)",
          backgroundSize: "17px 17px",
        }}
        aria-hidden
      />

      <div className="relative" style={{ width, height, minWidth: "100%" }}>
        <svg width={width} height={height} className="absolute inset-0" aria-hidden>
          <defs>
            <marker
              id={`arw-${id}`}
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(23,16,58,0.32)" />
            </marker>
          </defs>

          {paths.map((p, i) => (
            <g key={p.key}>
              <path
                d={p.d}
                fill="none"
                stroke="rgba(23,16,58,0.2)"
                strokeWidth="1.6"
                markerEnd={`url(#arw-${id})`}
              />
              <path
                d={p.d}
                fill="none"
                stroke={accent}
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeDasharray="7 170"
                className="wf-flow"
                style={{ animationDelay: `${(i % 7) * 0.4}s` }}
              />
              {p.label && (
                <text
                  x={p.lx}
                  y={p.ly}
                  textAnchor="middle"
                  fontSize="9"
                  fontFamily="var(--font-mono)"
                  fill={p.label === "false" ? "#dc2626" : "#059669"}
                >
                  {p.label}
                </text>
              )}
            </g>
          ))}
        </svg>

        {nodes.map((n) => {
          const { icon: Icon, color } = KIND[n.kind] ?? KIND.noop;
          return (
            <div
              key={n.id}
              className="group absolute flex flex-col items-center"
              style={{ left: cx(n) - NODE / 2, top: cy(n) - NODE / 2, width: NODE }}
            >
              <div
                className={cn(
                  "flex items-center justify-center border bg-white shadow-[0_2px_8px_rgba(23,16,58,0.08)] transition-transform duration-300 group-hover:scale-110",
                  n.trigger ? "rounded-l-full rounded-r-lg" : "rounded-lg"
                )}
                style={{ width: NODE, height: NODE, borderColor: `${color}40` }}
              >
                <Icon size={20} style={{ color }} />
              </div>
              <span className="mt-1.5 w-[136px] text-center text-[9.5px] leading-[1.25] font-medium text-muted-foreground">
                {n.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
