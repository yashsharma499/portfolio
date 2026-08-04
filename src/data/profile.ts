export const profile = {
  name: "Yash Kumar Sharma",
  firstName: "Yash",
  role: "Full-Stack & AI Engineer",
  tagline: "I build AI-powered systems that run real companies.",
  intro:
    "Engineer at Hagerstone International, where I designed and shipped the company's entire in-house ERP ecosystem — procurement, finance, HR, labour and analytics — unified on one platform, powered by LLM agents and operated over WhatsApp.",
  email: "yyashkumar8@gmail.com",
  phone: "+91 9958131069",
  location: "Ghaziabad, India",
  timezoneLabel: "IST (UTC+5:30)",
  available: true,
  siteUrl: "https://portfolio-drab-six-48.vercel.app",
  socials: {
    github: "https://github.com/yashsharma499",
    linkedin: "https://www.linkedin.com/in/yashkumar-sharma/",
  },
  about: [
    "I digitised an entire company. At Hagerstone International — a design & build firm running 44 project sites across India — I designed, built and shipped eight production systems that now handle the company's procurement, finance, labour payments, hiring and analytics.",
    "The results are concrete: ₹11.5 Cr of procurement processed through an anti-corruption purchase pipeline, ₹1.96 Cr of payments disbursed with a full audit trail, 837 suppliers under management, and 75 employees running their daily work across 44 project sites. All of it behind one login, on one platform.",
    "My rule for AI in business: it proposes, a named human disposes. An LLM never releases money. That principle — plus ruthless cost engineering — is why these systems run daily operations, not demos.",
  ],
  /** headline numbers — live figures from the production database */
  delivered: [
    { value: 11.5, prefix: "₹", suffix: " Cr", decimals: 1, label: "procurement value processed" },
    { value: 1.96, prefix: "₹", suffix: " Cr", decimals: 2, label: "payments disbursed through the system" },
    { value: 75, prefix: "", suffix: "", decimals: 0, label: "employees using the platform daily" },
    { value: 837, prefix: "", suffix: "", decimals: 0, label: "suppliers onboarded & managed" },
    { value: 486, prefix: "", suffix: "", decimals: 0, label: "purchase requisitions processed" },
    { value: 44, prefix: "", suffix: "", decimals: 0, label: "project sites running on the systems" },
  ],
  principles: [
    { title: "AI proposes, humans dispose", body: "Every AI decision path ends at a named human. Confidence scores, audit logs, and dry-runs before anything irreversible." },
    { title: "Meet users where they are", body: "Field teams live on WhatsApp, not email. Approvals, reminders and dispatch run over chat — in English and Hindi." },
    { title: "Structure over trust", body: "Blind quotes, two-gate payments, append-only logs. Good systems make the honest path the easy path." },
    { title: "Cost is a feature", body: "Model routing by task, cost-gated LLM calls, read-through caches. Intelligence that doesn't burn the budget." },
  ],
};
