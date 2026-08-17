export type Service = {
  title: string;
  description: string;
  deliverables: string[];
  /** how the engagement is actually shaped and priced */
  engagement: string;
  accent: string;
};

export const servicesIntro = {
  title: "Three ways we can work.",
  description:
    "Same approach every time: understand how the business already runs, then replace the parts that leak time or money with software that answers to a named human.",
};

export const services: Service[] = [
  {
    title: "Custom Business Systems & Automation",
    description:
      "End-to-end internal platforms: procurement, expense and cash-advance management, approvals, task delegation, attendance, vendor management. Built around how the company already works — approvals on WhatsApp, AI to remove data entry, audit trails to remove doubt. Delivered as working software in production, not a slide deck.",
    deliverables: [
      "Process mapping from how your team actually operates today",
      "Postgres schema, role-based access and an append-only audit trail",
      "WhatsApp-first approvals, reminders and dispatch — English and Hindi",
      "Handover docs and a runbook your team can operate without me",
    ],
    engagement: "Scoped build (4–10 weeks) + optional monthly retainer for extension and support.",
    accent: "#7c3aed",
  },
  {
    title: "AI & Agent Engineering",
    description:
      "Retrieval pipelines, tool-using agents and LLM workflows that stay accountable. Model routing by task, cost-gated calls and read-through caches keep the bill predictable. Every decision path ends at a named approver — an LLM never releases money.",
    deliverables: [
      "Grounded RAG over your own documents, with citations",
      "Agents that propose with a confidence score, then wait for a human",
      "Server-side proxy — API keys never reach the browser",
      "Per-task model routing and a cost ceiling you set",
    ],
    engagement: "Fixed-scope sprint(s), typically 3–6 weeks.",
    accent: "#0891b2",
  },
  {
    title: "Web Platforms & Interfaces",
    description:
      "Fast, SEO-ready marketing sites and product interfaces on Next.js. Design, build, deploy and iterate — sprint-based, with the same attention to performance and accessibility as the systems running behind them.",
    deliverables: [
      "Next.js App Router build, statically rendered where it counts",
      "Core Web Vitals and accessibility treated as acceptance criteria",
      "Design system and components you can extend yourself",
      "Deploy pipeline, analytics and a measurable baseline",
    ],
    engagement: "Fixed-scope sprint(s), typically 2–5 weeks.",
    accent: "#d946ef",
  },
];
