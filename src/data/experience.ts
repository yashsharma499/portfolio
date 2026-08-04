export type ExperienceItem = {
  title: string;
  org: string;
  type?: string;
  location?: string;
  period: string;
  current?: boolean;
  points: string[];
};

export const experience: ExperienceItem[] = [
  {
    title: "Artificial Intelligence Engineer",
    org: "Hagerstone International Pvt. Ltd.",
    type: "Full-time",
    location: "Noida, Uttar Pradesh, India",
    period: "Mar 2026 — Present",
    current: true,
    points: [
      "Designed and shipped the company's complete in-house ERP ecosystem — 8 production systems across procurement, finance, HR, labour and analytics.",
      "Consolidated three database projects into one platform with single sign-on, 14 roles and one audit trail — now used daily by 75 employees across 44 project sites.",
      "Built a WhatsApp-first automation spine: approvals, task dispatch and reminders over chat in English and Hindi.",
      "Systems now govern ₹11.5 Cr of procurement and ₹1.96 Cr of disbursed payments.",
    ],
  },
  {
    title: "Full Stack Engineer",
    org: "Excellence Technologies Pvt. Ltd.",
    type: "Internship",
    period: "Dec 2025 — Feb 2026",
    points: [
      "Designed AI-powered backend systems: multi-agent workflows, RAG pipelines and secure database access platforms using FastAPI, LangGraph, PostgreSQL and Pinecone.",
      "Implemented real-time APIs, LLM integrations and production-grade audit logging.",
    ],
  },
  {
    title: "Web Development Intern",
    org: "Eternity Global Technology Solution LLP",
    type: "Apprenticeship",
    location: "Noida, Uttar Pradesh, India",
    period: "Jul 2025 — Dec 2025",
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
