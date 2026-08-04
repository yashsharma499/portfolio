export type CaseStudy = {
  slug: string;
  title: string;
  short: string;
  tag: string;
  /** headline real-data metric shown on the work list */
  metric: string;
  summary: string;
  stats: { value: string; label: string }[];
  problem: string;
  built: string[];
  architecture: string[];
  ai: string[];
  impact: string[];
  stack: string[];
  accent: string;
  flagship?: boolean;
};

export const companyIntro = {
  company: "Hagerstone International Pvt. Ltd.",
  role: "Full-Stack & AI Engineer",
  context:
    "An interior design & turnkey build firm operating across 27+ sites in India. I designed and shipped its entire in-house ERP ecosystem — eight production systems unified under one portal, one Postgres, and a WhatsApp-first automation spine.",
  themes: [
    "WhatsApp as the company's operating system — approvals, dispatch and reminders over chat, in English and Hindi",
    "AI proposes, a named human disposes — an LLM never releases money",
    "API keys never touch the browser — every AI call runs through a server-side proxy",
    "Cost engineering built-in — model routing by task, cost-gated LLM calls, free-tier caches",
  ],
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "hagerstone-hub",
    title: "Hagerstone Hub",
    short: "Unified company portal — one login for the entire business",
    tag: "Flagship · Platform",
    metric: "8 apps · 14 roles · 1 login",
    flagship: true,
    summary:
      "The single sign-on operations portal for the whole company: eight business apps behind one login, plus a delegation & gamification engine, a WhatsApp command center, founder analytics, and an agentic SQL chatbot.",
    stats: [
      { value: "8", label: "business apps unified" },
      { value: "14", label: "roles on one identity spine" },
      { value: "15", label: "edge functions" },
      { value: "3→1", label: "databases consolidated" },
    ],
    problem:
      "The company ran on three separate database projects with three logins, plus spreadsheets and WhatsApp threads. No shared identity, no cross-module analytics, no single audit trail.",
    built: [
      "Single sign-on launchpad: every employee gets a role-aware portal into Attendance, Finance, Procurement, HR, Labour, Marketing and more — 14 roles with per-employee overrides and hardened route guards.",
      "One-click employee onboarding that detects and links existing identities across modules instead of duplicating them, auto-assigns employee codes, and delivers WhatsApp invites.",
      "Delegation & gamification engine: tasks flow assigned → submitted → AI-scored → head-verified → pointed → leaderboarded, with a Hinglish Kanban, effort-tier points, late-penalty rules and 3D podium visualisations.",
      "GIE Command Center: leadership WhatsApp group chatter becomes tracked, dispatched, auto-chased tasks — zero re-typing. Escalating nudges with automatic point deductions for non-response.",
      "Founder analytics cockpit: nine headline KPIs unifying finance, procurement and delegation — spend trends, imprest funnels, vendor ageing, per-project cost rollups — all drillable with CSV export.",
      "\"Ask the Data\" chatbot: an agentic loop over guarded read-only SQL with schema grounding, name resolution across identity tables, and chart presentation.",
    ],
    architecture: [
      "Three separate database projects collapsed into one Postgres with schema-per-module and one auth — executed with written cutover runbooks.",
      "Sensitive analytics served only through guarded SECURITY DEFINER RPCs returning aggregates — never raw table reads.",
      "Cost-gated summarisation: the LLM call only fires when a tagged leadership sender posts, not on every message.",
      "Realtime push for gamification and analytics; polling tuned to 90–120s where realtime isn't needed.",
    ],
    ai: [
      "Claude routed by task: a fast model for scoring and OCR, a reasoning model for chat and synthesis.",
      "Anti-hallucination tooling: the SQL agent inspects real column values before filtering and is capped to read-only SELECTs.",
      "AI task scoring always lands on a human head for final say — points are suggestions, not verdicts.",
    ],
    impact: [
      "One login and one audit trail for the whole company.",
      "Leadership decisions leave WhatsApp as tracked tasks with owners and deadlines, automatically chased.",
      "Founders see finance + procurement + execution in one live cockpit instead of five spreadsheets.",
    ],
    stack: ["React 19", "TypeScript", "Vite", "Tailwind", "Supabase", "Postgres", "Edge Functions", "Claude", "n8n", "React Three Fiber", "WhatsApp API"],
    accent: "#7C3AED",
  },
  {
    slug: "cps-procurement",
    title: "CPS — Centralised Procurement",
    short: "Anti-corruption procurement, engineered structurally",
    tag: "Procurement · AI",
    metric: "760+ suppliers · 250+ PRs processed",
    summary:
      "The full procurement lifecycle — requisition to payment — rebuilt to structurally guarantee zero corruption, best market rates and full auditability. Running in production at real scale.",
    stats: [
      { value: "760+", label: "suppliers" },
      { value: "250+", label: "purchase requisitions" },
      { value: "37", label: "pages / modules" },
      { value: "65+", label: "database tables" },
    ],
    problem:
      "Procurement for a construction company is where money leaks: cozy vendor relationships, invisible price gouging, untracked advances. Policy alone doesn't fix it — structure does.",
    built: [
      "End-to-end flow: PR → auto-RFQ → quotes → comparison → PO → delivery → GRN → payment reconciliation, plus work orders, BOQs, site stock and advances.",
      "Blind quoting: quotes are shown by reference only until comparison; a 3-quote minimum and no-self-approval are enforced by the system.",
      "Forced supplier freshness: auto-RFQ targets 5+ suppliers and requires at least two who haven't been awarded in 90 days.",
      "Two-gate payments: a tranche plan approved at PO stage, then a separate founder approval per release — with authorized-vs-executed reconciliation and auto-escalation on stale advances.",
      "Approved comparisons freeze into immutable snapshots — the founder sees exactly what was decided, forever.",
      "Kanban pipeline with a \"currently with\" owner on every item, plus analytics, audit log, and IT-head-only overrides that require a written reason.",
    ],
    architecture: [
      "Runtime rule engine: a ~40-row config table toggles rules (e.g. historical-capture mode) without a deploy.",
      "Simplified Hinglish UI for site roles — designed for low-literacy field usability.",
      "Founder PO approvals happen over a WhatsApp link; the browser never holds an AI key.",
    ],
    ai: [
      "Live market-rate benchmarking: Claude + web search across Indian B2B marketplaces, compared against historical PO rates; quotes >25% over benchmark demand written justification.",
      "Vision-based document intelligence: quote parsing with confidence-scored line extraction, invoice & GRN extraction with variance blocking, supplier visiting-card auto-fill.",
      "BOQ-to-BOM suggestions from Excel/PDF project documents.",
    ],
    impact: [
      "Every rupee of procurement is traceable from request to reconciled payment.",
      "Fresh suppliers get a structural seat at the table — rates stay honest without anyone policing.",
      "1,800+ audit entries and counting; disputes end at the immutable snapshot.",
    ],
    stack: ["React 19", "TypeScript", "Supabase", "Postgres", "Edge Functions", "Claude Vision", "jsPDF", "n8n", "WhatsApp API"],
    accent: "#6366F1",
  },
  {
    slug: "finance-imprest",
    title: "Finance — Imprest & Expense",
    short: "AI-verified field cash, WhatsApp-approved",
    tag: "Finance · Mobile",
    metric: "27+ sites · every rupee traceable",
    summary:
      "Imprest-first expense management across 27+ sites: no receipt exists without an approved, funded advance behind it. AI verifies receipts; approvers reply on WhatsApp.",
    stats: [
      { value: "27+", label: "sites covered" },
      { value: "36", label: "ordered SQL migrations" },
      { value: "94%", label: "auto-verify threshold" },
      { value: "2", label: "languages (EN + HI)" },
    ],
    problem:
      "Field teams need cash fast; finance needs control. Paper receipts, untracked advances and chat-thread approvals meant money moved faster than accountability.",
    built: [
      "Category-aware request wizard: food computed from per-site rate tables, travel estimated from live distance data, cab fares OCR'd from screenshots.",
      "Risk-scaled routing engine: approval depth scales with amount and site — small requests take a short path, big ones go through directors.",
      "Reply-in-WhatsApp approvals: an inbound webhook parses multilingual replies (YES / HAAN / JI / ✅) to advance or reject without opening the app.",
      "Auto-block enforcement: miss the receipt deadline after payment and new advances are barred until finance clears you.",
      "Settlements for partial approvals, a PO-payments bridge synced with procurement, and a leadership Kanban showing money-in-motion with ageing and bottleneck flags.",
      "Bilingual (English/Hindi) React Native mobile app for the field, WebSocket-live web dashboard for finance.",
    ],
    architecture: [
      "Three deployables — Node/Express API with native WebSocket push, Expo mobile app, React dashboard — on one Postgres with RLS.",
      "36 ordered migrations; realtime subscriptions on the tables that matter.",
      "Weighted verification scoring blended with OCR confidence → auto-verified / manual review / blocked tiers.",
    ],
    ai: [
      "Claude OCR extracts amount, transaction ID, date and status from payment screenshots.",
      "Weighted fraud scoring: amount match, date proximity, payment status and txn-ID validity — plus duplicate detection across a 7-day window.",
      "AI travel estimation combining live distance data with model reasoning.",
    ],
    impact: [
      "Every rupee of field cash traces to an authorised, funded request.",
      "Receipt verification went from manual review of everything to manual review of exceptions.",
      "Approvers act in seconds from WhatsApp — in whichever language they reply.",
    ],
    stack: ["Node.js", "Express", "WebSockets", "Expo / React Native", "React", "Supabase", "Postgres", "Claude", "Google Maps APIs", "n8n"],
    accent: "#0891b2",
  },
  {
    slug: "lcs-labour",
    title: "LCS — Labour & Contractor",
    short: "Every wage payment governed, AI-checked, human-confirmed",
    tag: "Payments · Governance",
    metric: "100% of wage payments gated",
    summary:
      "Contractor and daily-wage payments from onboarding to retention release — built for field teams that barely touch software. AI checks everything; a named human confirms; AI never releases money.",
    stats: [
      { value: "2", label: "payment tracks, one pipeline" },
      { value: "1", label: "edge function (by design)" },
      { value: "100%", label: "RLS-enforced tables" },
      { value: "0", label: "backend servers" },
    ],
    problem:
      "Labour payments are high-volume, low-literacy and fraud-prone. The field team needed something as simple as a camera; finance needed gates as strict as a bank.",
    built: [
      "Two payment tracks merging into one pipeline: measured work billed at locked BOQ rates capped at work-order value, and attendance-based daily wages from a confirmed digital muster.",
      "Mobile-first capture: the site team photographs evidence; AI reads, files and flags; a human confirms with one tap.",
      "Full lifecycle: onboarding → daily capture → AI verification → payment → retention release → defect-liability period → closure.",
    ],
    architecture: [
      "Deliberately serverless: business logic lives in Postgres functions — gate checks, deduction math, cumulative ceilings, retention triggers — with RLS on every table and an append-only audit log.",
      "Exactly one Edge Function holds the AI key server-side and routes checks by gate.",
      "Additive integration: lives in an isolated schema, shares platform auth, reads the supplier master read-only — an explicit never-alter-existing-systems rule.",
    ],
    ai: [
      "Gate-routed AI checks return extracted fields, confidence, reasons and flags — humans see why, not just what.",
      "Designed from a PRD that was rewritten after verifying every assumption against the live database.",
    ],
    impact: [
      "Every payment to every worker passes the same gates — no exceptions, no side-channels.",
      "Field capture takes seconds; governance happens in the database, invisibly.",
    ],
    stack: ["React 18", "TypeScript", "Vite", "Tailwind", "Supabase", "Postgres Functions", "RLS", "Claude"],
    accent: "#9333ea",
  },
  {
    slug: "hireflow-hr",
    title: "HireFlow — HR & Attendance",
    short: "AI hiring pipeline + zero-cost geofenced attendance",
    tag: "HR · Automation",
    metric: "18,492 records migrated · ₹0 API cost",
    summary:
      "The company's hiring pipeline — sourcing to offer letter — with AI at every stage, plus a geofenced attendance system built entirely on free infrastructure.",
    stats: [
      { value: "9", label: "AI edge functions" },
      { value: "18,492", label: "attendance rows migrated" },
      { value: "110", label: "live test assertions" },
      { value: "₹0", label: "maps/geo API cost" },
    ],
    problem:
      "Hiring ran on inboxes and gut feel; attendance ran on a Google Sheet. Both needed structure without adding recurring API costs.",
    built: [
      "AI hiring pipeline: resume screening, JD enhancement, call-prep briefs, interview questionnaires, feedback synthesis, reference summaries and offer-letter generation.",
      "Candidate pipeline with duplicate detection, document verification workflow, and a call queue with retry and callback reminders.",
      "Attendance portal: PIN-free punch identified from the session token, live team map and timeline from punch locations, leave records and rosters.",
      "n8n automations alongside: job posting, resume collection from Gmail and WhatsApp, acknowledgements, document and probation reminders.",
    ],
    architecture: [
      "Deliberately free geo stack: browser geolocation, OpenStreetMap tiles, open reverse-geocoding, haversine geofence math — no paid maps API.",
      "An RLS hardening pass closed a real hole where anonymous users could read and write candidate PII across 11 tables.",
      "18,492 attendance rows migrated from Google Sheets to Postgres — with an honest ledger of the 28 ambiguous names that couldn't be auto-mapped.",
    ],
    ai: [
      "Resume parsing across PDF and Word, screening against role requirements with structured verdicts.",
      "Offer letters generated as native documents from templates.",
    ],
    impact: [
      "A 110-assertion end-to-end test pass against live infrastructure found and fixed 12 bugs — including a timezone bug silently scheduling every interview 5.5 hours off.",
      "Hiring decisions carry AI-prepared context; attendance is verifiable without hardware or subscriptions.",
    ],
    stack: ["React 18", "Vite", "Supabase", "Edge Functions", "OpenAI", "Leaflet / OSM", "n8n", "WhatsApp API"],
    accent: "#8b5cf6",
  },
  {
    slug: "facade-management",
    title: "Facade Management System",
    short: "Complete facade business system — rates to tenders to site execution",
    tag: "End-to-End System",
    metric: "6 systems · 75 materials · ₹1 Excel parity",
    summary:
      "The complete facade business on one system: rate calculation across six glazing systems, versioned estimates, client quotation PDFs, tender management, budget sheets, material masters and SLA-tracked site execution — with the costing engine verified to match the legacy Excel to within ₹1.",
    stats: [
      { value: "6", label: "facade systems" },
      { value: "75", label: "material catalogue" },
      { value: "9", label: "auto-created work stages" },
      { value: "₹1", label: "parity vs legacy Excel" },
    ],
    problem:
      "Facade costing lived in a fragile Excel sheet only two people understood. Every estimate was slow, unversioned and impossible to audit.",
    built: [
      "Live per-m² rate calculator across six built-in systems — straight and curved glazing, louvres, ACP, frameless doors, railing — with versioned rate cards.",
      "Multi-system estimates with full version history and risk-based markup tiers plus a separate contingency line.",
      "Client quotation PDF generation with an approve/reject audit trail.",
      "Approval auto-creates nine work stages with SLA-based colour escalation, and material needs raise a purchase requisition directly into the procurement system with one click.",
      "Beyond estimation: tender tracking with per-tender detail pages, project budget sheets, assembly definitions, material/rate masters and a verification console — the whole facade vertical, not just costing.",
    ],
    architecture: [
      "Lives in its own schema on the shared platform database; AI calls go through a server-side proxy.",
      "The calculation engine was validated line-by-line against the company's legacy Excel until outputs matched to within one rupee — trust before rollout.",
    ],
    ai: [
      "AI-assist for parsing tender documents and rate references into structured estimate inputs.",
    ],
    impact: [
      "Estimates that took days now take minutes, with every version and approval on record.",
      "Site execution and procurement flow from the same approved estimate — no re-typing, no drift.",
    ],
    stack: ["React 19", "TypeScript", "Vite", "Tailwind", "Supabase", "Postgres", "Edge Functions", "Claude"],
    accent: "#0284c7",
  },
  {
    slug: "procurement-intelligence",
    title: "Procurement Intelligence",
    short: "Invoice PDFs → structured rate history",
    tag: "Data Pipeline · LLM",
    metric: "every invoice queryable, LLM cost paid once",
    summary:
      "A rate-intelligence database built from vendor invoices: PDFs in, structured LLM-extracted data out, searchable by material or vendor with full historical rate trends.",
    stats: [
      { value: "3", label: "pipeline stages" },
      { value: "1×", label: "LLM cost per document, ever" },
      { value: "GST", label: "keyed vendor dedup" },
    ],
    problem:
      "What did this material actually cost us last year, and from whom? The answer lived in a thousand PDF invoices nobody could query.",
    built: [
      "Batch ingestion pipeline: extract text from PDFs, structure it with an LLM, import to Postgres — skipping failures and continuing.",
      "Search by material or vendor with historical rate trends, via both a data app and a React frontend.",
      "A JSON backfill system that upgrades already-extracted data when the schema evolves — the expensive LLM pass never repeats.",
    ],
    architecture: [
      "Clean separation of extract → JSON → import stages; idempotent duplicate detection by file path.",
      "Vendor deduplication keyed on GST number with exact-name fallback.",
      "Versioned SQL schema and migrations; optional API-key auth on all endpoints.",
    ],
    ai: [
      "LLM-based structured extraction from messy, inconsistent invoice layouts into typed schemas.",
    ],
    impact: [
      "Procurement negotiates with historical truth on screen — the analytical backbone behind live rate benchmarking.",
    ],
    stack: ["Python", "FastAPI", "SQLAlchemy", "PostgreSQL", "pdfplumber", "OpenAI", "Streamlit", "React"],
    accent: "#0891B2",
  },
  {
    slug: "lead-scraper",
    title: "Lead Scraper",
    short: "Vendor discovery with a pay-once cache",
    tag: "Tooling · Cost Engineering",
    metric: "1× API cost per unique search, ever",
    summary:
      "Search contractors and vendors across India, score them for commercial fitness, and never pay for the same search twice — a read-through cache keeps the whole thing inside free-tier limits.",
    stats: [
      { value: "6", label: "scoring signals" },
      { value: "1×", label: "API cost per unique search" },
      { value: "0", label: "workflow changes for adoption" },
    ],
    problem:
      "Finding vendors in new cities meant paid searches, repeated by whoever needed them, with raw results that still needed manual filtering.",
    built: [
      "Places-powered search (\"Painter in Ludhiana\") with results cached in Postgres — subsequent identical searches by anyone return instantly and free.",
      "A scoring model beyond raw API output: website quality, commercial fit, address quality, relevance — rolled into a composite score.",
      "Output columns matched to the team's existing Excel format for zero-friction adoption.",
    ],
    architecture: [
      "FastAPI backend (Dockerised) + React frontend; its own schema on the shared platform database, reachable from the company's cross-schema analytics chatbot.",
      "Read-through cache as the core design: the database is the API's memory.",
    ],
    ai: [],
    impact: [
      "Vendor discovery is instant and free after first search; scored results replace manual filtering.",
    ],
    stack: ["Python", "FastAPI", "httpx", "Supabase", "React", "Vite", "Docker", "Google Places API"],
    accent: "#0d9488",
  },
];
