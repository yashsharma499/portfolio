export type SkillGroup = {
  key: string;
  title: string;
  blurb: string;
  items: string[];
  /** bento sizing hint */
  size: "lg" | "md" | "sm";
};

export const skillGroups: SkillGroup[] = [
  {
    key: "ai",
    title: "AI Engineering",
    blurb: "Agentic systems that ship to production — grounded, governed, cost-routed.",
    items: ["RAG", "LangGraph", "LangChain", "MCP", "Claude API", "OpenAI", "Groq", "Gemini", "Pinecone", "Prompt Engineering", "Multi-Agent Workflows"],
    size: "lg",
  },
  {
    key: "frontend",
    title: "Frontend",
    blurb: "Interfaces that feel expensive and load fast.",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Framer Motion", "GSAP", "React Native / Expo"],
    size: "md",
  },
  {
    key: "backend",
    title: "Backend",
    blurb: "APIs, realtime, auth — the boring parts done right.",
    items: ["Node.js", "Express", "FastAPI", "Flask", "REST", "WebSockets", "JWT", "Zod / Pydantic"],
    size: "md",
  },
  {
    key: "data",
    title: "Data & Storage",
    blurb: "One Postgres, many schemas, zero mystery.",
    items: ["PostgreSQL", "Supabase", "MongoDB", "SQLAlchemy", "SQLite", "Pinecone", "RLS Policies"],
    size: "sm",
  },
  {
    key: "infra",
    title: "Infra & Automation",
    blurb: "Deploy, automate, observe.",
    items: ["Vercel", "Railway", "Docker", "n8n", "Edge Functions", "GitHub", "Cloudinary", "WhatsApp APIs"],
    size: "sm",
  },
  {
    key: "languages",
    title: "Languages",
    blurb: "",
    items: ["TypeScript", "JavaScript", "Python", "Java", "SQL"],
    size: "sm",
  },
];

export const marqueeSkills = [
  "Next.js", "React", "TypeScript", "Python", "FastAPI", "LangGraph", "RAG", "MCP",
  "PostgreSQL", "Supabase", "Claude", "OpenAI", "Node.js", "Tailwind", "GSAP",
  "n8n", "Docker", "WebSockets", "MongoDB", "Pinecone", "Expo",
];
