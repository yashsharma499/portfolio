import type { Workflow } from "@/components/WorkflowCanvas";

export const systemsOrder = ["CPS — Procurement", "Finance", "Hagerstone Hub", "HR & Marketing"];

export const automationStats = [
  { value: "46", label: "workflows built in n8n" },
  { value: "23", label: "running live in production" },
  { value: "5", label: "systems automated end-to-end" },
  { value: "11", label: "graphs mapped in full below" },
];

const CPS = "#6366f1";
const FIN = "#0891b2";
const HUB = "#7c3aed";
const HRM = "#9333ea";

export const workflows: Workflow[] = [
  /* ───────────────────────── CPS ───────────────────────── */
  {
    id: "cps-build5",
    name: "Build 5 — Founder PO Approval",
    system: "CPS — Procurement",
    description:
      "Purchase order goes out to both founders on WhatsApp with the comparison sheet, PDF and a tokenised approval link — then writes the audit trail.",
    accent: CPS,
    live: true,
    nodeCount: 21,
    nodes: [
      { id: "wh", label: "Webhook — PO Approval Request", kind: "webhook", col: 0, row: 1, trigger: true },
      { id: "resp", label: "Respond 200 Immediately", kind: "respond", col: 1, row: 0 },
      { id: "fmt", label: "Format Approval Message", kind: "code", col: 1, row: 1 },
      { id: "pay", label: "Build Maytapi Payloads", kind: "code", col: 2, row: 1 },
      { id: "if", label: "Has Comparison PDF?", kind: "if", col: 3, row: 1 },
      { id: "cd", label: "Send Comparison — Dhruv", kind: "whatsapp", col: 4, row: 0 },
      { id: "w2d", label: "Wait 2s — Dhruv", kind: "wait", col: 5, row: 0 },
      { id: "pd", label: "Send PDF — Dhruv", kind: "whatsapp", col: 6, row: 0 },
      { id: "ld", label: "Send Link Text — Dhruv", kind: "whatsapp", col: 7, row: 0 },
      { id: "w4", label: "Wait 4s — Between Founders", kind: "wait", col: 8, row: 0 },
      { id: "cb", label: "Send Comparison — Bhaskar", kind: "whatsapp", col: 9, row: 0 },
      { id: "w2b", label: "Wait 2s — Bhaskar", kind: "wait", col: 10, row: 0 },
      { id: "pb", label: "Send PDF — Bhaskar", kind: "whatsapp", col: 11, row: 0 },
      { id: "lb", label: "Send Link Text — Bhaskar", kind: "whatsapp", col: 12, row: 0 },
      { id: "pdn", label: "Send PDF — Dhruv (no comp)", kind: "whatsapp", col: 4, row: 2 },
      { id: "ldn", label: "Send Link Text — Dhruv (no comp)", kind: "whatsapp", col: 5, row: 2 },
      { id: "w4n", label: "Wait 4s — Between Founders (no comp)", kind: "wait", col: 6, row: 2 },
      { id: "pbn", label: "Send PDF — Bhaskar (no comp)", kind: "whatsapp", col: 7, row: 2 },
      { id: "lbn", label: "Send Link Text — Bhaskar (no comp)", kind: "whatsapp", col: 8, row: 2 },
      { id: "upd", label: "Update PO: founder_approval_status = sent", kind: "db", col: 13, row: 1 },
      { id: "aud", label: "Write Audit Log", kind: "db", col: 14, row: 1 },
    ],
    edges: [
      { from: "wh", to: "resp" }, { from: "wh", to: "fmt" },
      { from: "fmt", to: "pay" }, { from: "pay", to: "if" },
      { from: "if", to: "cd", label: "true" }, { from: "if", to: "pdn", label: "false" },
      { from: "cd", to: "w2d" }, { from: "w2d", to: "pd" }, { from: "pd", to: "ld" },
      { from: "ld", to: "w4" }, { from: "w4", to: "cb" }, { from: "cb", to: "w2b" },
      { from: "w2b", to: "pb" }, { from: "pb", to: "lb" }, { from: "lb", to: "upd" },
      { from: "pdn", to: "ldn" }, { from: "ldn", to: "w4n" }, { from: "w4n", to: "pbn" },
      { from: "pbn", to: "lbn" }, { from: "lbn", to: "upd" },
      { from: "upd", to: "aud" },
    ],
  },
  {
    id: "cps-build1",
    name: "Build 1 — RFQ WhatsApp Dispatch",
    system: "CPS — Procurement",
    description:
      "New RFQ fans out to suppliers and line items in parallel, merges them into one message, and dispatches to every supplier on WhatsApp.",
    accent: CPS,
    live: true,
    nodeCount: 9,
    nodes: [
      { id: "wh", label: "CPS Webhook — RFQ Created", kind: "webhook", col: 0, row: 1, trigger: true },
      { id: "resp", label: "Respond 200 OK", kind: "respond", col: 1, row: 0 },
      { id: "sup", label: "Fetch Suppliers", kind: "db", col: 1, row: 1 },
      { id: "li", label: "Fetch Line Items", kind: "db", col: 1, row: 2 },
      { id: "mg", label: "Merge Suppliers + Items", kind: "merge", col: 2, row: 1 },
      { id: "cmp", label: "Compose WhatsApp Message", kind: "code", col: 3, row: 1 },
      { id: "snd", label: "Send WhatsApp via Maytapi", kind: "whatsapp", col: 4, row: 1 },
      { id: "upd", label: "Update whatsapp_sent_at", kind: "db", col: 5, row: 0 },
      { id: "aud", label: "Write Audit Log", kind: "db", col: 5, row: 2 },
    ],
    edges: [
      { from: "wh", to: "resp" }, { from: "wh", to: "sup" }, { from: "wh", to: "li" },
      { from: "sup", to: "mg" }, { from: "li", to: "mg" },
      { from: "mg", to: "cmp" }, { from: "cmp", to: "snd" },
      { from: "snd", to: "upd" }, { from: "snd", to: "aud" },
    ],
  },
  {
    id: "cps-build6",
    name: "Build 6 — Payment Release Approval",
    system: "CPS — Procurement",
    description:
      "Gate 2 of the two-gate payment system — each tranche release needs its own founder sign-off before money moves.",
    accent: CPS,
    live: true,
    nodeCount: 5,
    nodes: [
      { id: "wh", label: "Webhook — Release Request", kind: "webhook", col: 0, row: 0, trigger: true },
      { id: "fmt", label: "Format Release Message", kind: "code", col: 1, row: 0 },
      { id: "d", label: "Send Release — Dhruv", kind: "whatsapp", col: 2, row: 0 },
      { id: "w", label: "Wait 4s — Between Founders", kind: "wait", col: 3, row: 0 },
      { id: "b", label: "Send Release — Bhaskar", kind: "whatsapp", col: 4, row: 0 },
    ],
    edges: [
      { from: "wh", to: "fmt" }, { from: "fmt", to: "d" },
      { from: "d", to: "w" }, { from: "w", to: "b" },
    ],
  },
  {
    id: "cps-invoice",
    name: "Invoice Deadline Reminders & Auto-Block",
    system: "CPS — Procurement",
    description:
      "Runs daily at 10 AM IST: chases missing invoices and automatically blocks defaulters from raising new requests.",
    accent: CPS,
    live: true,
    nodeCount: 3,
    nodes: [
      { id: "s", label: "Schedule — Daily 10 AM IST", kind: "schedule", col: 0, row: 0, trigger: true },
      { id: "p", label: "Process Deadlines", kind: "code", col: 1, row: 0 },
      { id: "w", label: "Send WhatsApp via Maytapi", kind: "whatsapp", col: 2, row: 0 },
    ],
    edges: [{ from: "s", to: "p" }, { from: "p", to: "w" }],
  },

  /* ─────────────────────── FINANCE ─────────────────────── */
  {
    id: "fin-wf2",
    name: "WF2 — Founder / Director WhatsApp Approval",
    system: "Finance",
    description:
      "Two-way approval loop: routes high-value imprests to the right approver, then parses their WhatsApp reply back into the backend — validating the request ID before acting.",
    accent: FIN,
    live: true,
    nodeCount: 13,
    nodes: [
      { id: "t1", label: "New High-Value Imprest", kind: "webhook", col: 0, row: 0, trigger: true },
      { id: "bld", label: "Build Approval Message", kind: "set", col: 1, row: 0 },
      { id: "rt", label: "Route to Approver", kind: "switch", col: 2, row: 0 },
      { id: "sd", label: "Send WhatsApp to Dhruv Sir", kind: "whatsapp", col: 3, row: 0 },
      { id: "sb", label: "Send WhatsApp to Bhaskar Sir", kind: "whatsapp", col: 3, row: 1 },
      { id: "rs", label: "Respond Sent", kind: "respond", col: 4, row: 0 },
      { id: "t2", label: "Founder Button Reply", kind: "webhook", col: 0, row: 3, trigger: true },
      { id: "pr", label: "Parse Reply and Extract Data", kind: "set", col: 1, row: 3 },
      { id: "ic", label: "Inject Backend Config", kind: "set", col: 2, row: 3 },
      { id: "iv", label: "Has Valid Imprest ID?", kind: "if", col: 3, row: 3 },
      { id: "po", label: "POST Founder Review to Backend", kind: "http", col: 4, row: 3 },
      { id: "ok", label: "Respond Reply OK", kind: "respond", col: 5, row: 3 },
      { id: "bad", label: "Respond Invalid Reply", kind: "respond", col: 4, row: 4 },
    ],
    edges: [
      { from: "t1", to: "bld" }, { from: "bld", to: "rt" },
      { from: "rt", to: "sd" }, { from: "rt", to: "sb" },
      { from: "sd", to: "rs" }, { from: "sb", to: "rs" },
      { from: "t2", to: "pr" }, { from: "pr", to: "ic" }, { from: "ic", to: "iv" },
      { from: "iv", to: "po", label: "true" }, { from: "iv", to: "bad", label: "false" },
      { from: "po", to: "ok" },
    ],
  },
  {
    id: "fin-wf4",
    name: "WF4 — PO Finance Dispatch Bridge",
    system: "Finance",
    description:
      "The bridge between procurement and finance: validates director-approved PO payment terms, ingests them into the finance backend, and alerts the finance team.",
    accent: FIN,
    live: true,
    nodeCount: 5,
    nodes: [
      { id: "wh", label: "Receive PO Finance Dispatch", kind: "webhook", col: 0, row: 0, trigger: true },
      { id: "v", label: "Validate Payload", kind: "code", col: 1, row: 0 },
      { id: "i", label: "Ingest to Finance Backend", kind: "http", col: 2, row: 0 },
      { id: "f", label: "Format WhatsApp Message", kind: "code", col: 3, row: 0 },
      { id: "w", label: "WhatsApp to Finance Team", kind: "whatsapp", col: 4, row: 0 },
    ],
    edges: [
      { from: "wh", to: "v" }, { from: "v", to: "i" },
      { from: "i", to: "f" }, { from: "f", to: "w" },
    ],
  },
  {
    id: "fin-ageing",
    name: "Daily Imprest Ageing Digest",
    system: "Finance",
    description:
      "Every evening at 7 PM IST the founder gets a WhatsApp brief naming exactly where money is stuck and who is holding it.",
    accent: FIN,
    live: true,
    nodeCount: 3,
    nodes: [
      { id: "s", label: "Every Day 7 PM IST", kind: "schedule", col: 0, row: 0, trigger: true },
      { id: "f", label: "Fetch Ageing Digest", kind: "http", col: 1, row: 0 },
      { id: "w", label: "Send Ageing Brief to Founder", kind: "whatsapp", col: 2, row: 0 },
    ],
    edges: [{ from: "s", to: "f" }, { from: "f", to: "w" }],
  },

  /* ───────────────────────── HUB ───────────────────────── */
  {
    id: "hub-score",
    name: "Del Score Task — AI Scoring Pipeline",
    system: "Hagerstone Hub",
    description:
      "Claude scores every submitted task against a department knowledge base, writes the points ledger, and moves the task to human review — AI proposes, a head disposes.",
    accent: HUB,
    live: true,
    nodeCount: 9,
    nodes: [
      { id: "wh", label: "Receive Submission", kind: "webhook", col: 0, row: 0, trigger: true },
      { id: "bp", label: "Build Scoring Prompt", kind: "code", col: 1, row: 0 },
      { id: "ai", label: "Score with Claude", kind: "ai", col: 2, row: 0 },
      { id: "ps", label: "Parse Score", kind: "code", col: 3, row: 0 },
      { id: "ce", label: "Check Existing Points", kind: "db", col: 4, row: 0 },
      { id: "pw", label: "Prepare Write Payload", kind: "code", col: 5, row: 0 },
      { id: "wp", label: "Write Points", kind: "db", col: 6, row: 0 },
      { id: "ut", label: "Update Task to under_review", kind: "db", col: 7, row: 0 },
      { id: "au", label: "Insert Audit Log", kind: "db", col: 8, row: 0 },
    ],
    edges: [
      { from: "wh", to: "bp" }, { from: "bp", to: "ai" }, { from: "ai", to: "ps" },
      { from: "ps", to: "ce" }, { from: "ce", to: "pw" }, { from: "pw", to: "wp" },
      { from: "wp", to: "ut" }, { from: "ut", to: "au" },
    ],
  },
  {
    id: "hub-gie",
    name: "GIE — Capture",
    system: "Hagerstone Hub",
    description:
      "Listens to leadership WhatsApp groups, filters to an allow-list of directors, and hands their instructions to the summariser that turns chatter into tracked tasks.",
    accent: HUB,
    live: false,
    nodeCount: 5,
    nodes: [
      { id: "wh", label: "Maytapi Inbound Webhook", kind: "webhook", col: 0, row: 0, trigger: true },
      { id: "cap", label: "Capture Group Message", kind: "code", col: 1, row: 0 },
      { id: "flt", label: "Only Leadership Mentions", kind: "filter", col: 2, row: 0 },
      { id: "w", label: "Wait 1 Minute", kind: "wait", col: 3, row: 0 },
      { id: "tr", label: "Trigger Summarise", kind: "code", col: 4, row: 0 },
    ],
    edges: [
      { from: "wh", to: "cap" }, { from: "cap", to: "flt" },
      { from: "flt", to: "w" }, { from: "w", to: "tr" },
    ],
  },

  /* ──────────────────── HR & MARKETING ──────────────────── */
  {
    id: "mkt-leads",
    name: "Meta Leads → Supabase Processor",
    system: "HR & Marketing",
    description:
      "Polls two campaign sheets every minute, deduplicates against the database, AI-scores each new lead, and sends the acknowledgement — all before a human sees it.",
    accent: HRM,
    live: true,
    nodeCount: 11,
    nodes: [
      { id: "s1", label: "Construction Manager Sheet", kind: "sheets", col: 0, row: 0, trigger: true },
      { id: "s2", label: "MEP Engineer Sheet", kind: "sheets", col: 0, row: 1, trigger: true },
      { id: "sv", label: "Set Variables", kind: "code", col: 1, row: 0 },
      { id: "cd", label: "Check Duplicate", kind: "http", col: 2, row: 0 },
      { id: "nl", label: "Is New Lead?", kind: "if", col: 3, row: 0 },
      { id: "is", label: "Insert Survey", kind: "db", col: 4, row: 0 },
      { id: "st", label: "Stop — Already Exists", kind: "noop", col: 4, row: 1 },
      { id: "ex", label: "Extract ID", kind: "code", col: 5, row: 0 },
      { id: "ai", label: "AI Analysis", kind: "ai", col: 6, row: 0 },
      { id: "wa", label: "WhatsApp Acknowledgement", kind: "whatsapp", col: 7, row: 0 },
      { id: "mk", label: "Mark WhatsApp Sent", kind: "db", col: 8, row: 0 },
    ],
    edges: [
      { from: "s1", to: "sv" }, { from: "s2", to: "sv" },
      { from: "sv", to: "cd" }, { from: "cd", to: "nl" },
      { from: "nl", to: "is", label: "true" }, { from: "nl", to: "st", label: "false" },
      { from: "is", to: "ex" }, { from: "ex", to: "ai" },
      { from: "ai", to: "wa" }, { from: "wa", to: "mk" },
    ],
  },
  {
    id: "hr-gmail",
    name: "Gmail Resume Collector",
    system: "HR & Marketing",
    description:
      "Watches the careers inbox, extracts the sender, files the applicant against the latest open role, and fires AI resume screening automatically.",
    accent: HRM,
    live: false,
    nodeCount: 6,
    nodes: [
      { id: "g", label: "Gmail — New Email (careers inbox)", kind: "mail", col: 0, row: 0, trigger: true },
      { id: "ex", label: "Extract Sender Details", kind: "code", col: 1, row: 0 },
      { id: "jb", label: "Supabase — Get Latest Job", kind: "db", col: 2, row: 0 },
      { id: "br", label: "Build Applicant Record", kind: "code", col: 3, row: 0 },
      { id: "ia", label: "Supabase — Insert Applicant", kind: "db", col: 4, row: 0 },
      { id: "ai", label: "Edge Fn — AI Screen Resume", kind: "ai", col: 5, row: 0 },
    ],
    edges: [
      { from: "g", to: "ex" }, { from: "ex", to: "jb" }, { from: "jb", to: "br" },
      { from: "br", to: "ia" }, { from: "ia", to: "ai" },
    ],
  },
];
