export type ExperienceItem = {
  title: string;
  org: string;
  period: string;
  current?: boolean;
  points: string[];
};

export const experience: ExperienceItem[] = [
  {
    title: "Full-Stack & AI Engineer",
    org: "Hagerstone International Pvt. Ltd.",
    period: "2026 — Present",
    current: true,
    points: [
      "Designed and shipped the company's complete in-house ERP ecosystem — 8 production systems across procurement, finance, HR, labour and analytics.",
      "Consolidated three database projects into one platform with single sign-on, 14 roles and one audit trail.",
      "Built a WhatsApp-first automation spine: approvals, task dispatch and reminders over chat in English and Hindi.",
    ],
  },
  {
    title: "Jr. Full Stack Developer (Intern)",
    org: "Excellence Technologies Pvt. Ltd.",
    period: "Dec 2025 — 2026",
    points: [
      "Designed AI-powered backend systems: multi-agent workflows, RAG pipelines and secure database access platforms using FastAPI, LangGraph, PostgreSQL and Pinecone.",
      "Implemented real-time APIs, LLM integrations and production-grade audit logging.",
    ],
  },
  {
    title: "Web Developer Intern",
    org: "Eternity Global Technology Solution LLP",
    period: "Jul — Dec 2025",
    points: [
      "Developed a real-time MERN stack dashboard integrating the OpenAI API for live in-app updates.",
    ],
  },
  {
    title: "B.Tech, Computer Science",
    org: "Ajay Kumar Garg Engineering College, Ghaziabad",
    period: "2021 — 2025",
    points: ["Java with DSA · Web design certification · Foundation in systems and software engineering."],
  },
];
