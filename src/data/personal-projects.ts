export type PersonalProject = {
  title: string;
  description: string;
  stack: string[];
  github: string;
  live?: string;
  accent: string;
};

export const personalProjects: PersonalProject[] = [
  {
    title: "AI Ticket Management System",
    description:
      "Multi-role ticketing platform (Admin / Agent / Customer) with AI auto-classification, summarization and smart reply suggestions. Zod-validated APIs, Cloudinary uploads, email notifications.",
    stack: ["Next.js", "MongoDB", "Zod", "Cloudinary", "AI APIs"],
    github: "https://github.com/yashsharma499/ticket-system-nextjs",
    live: "https://ticket-system-nextjs-kappa.vercel.app",
    accent: "#7C3AED",
  },
  {
    title: "MCP Secure AI Database Platform",
    description:
      "A GPT-powered agent that generates, validates and executes SQL through Model Context Protocol tools — with role-based access control, dry-run safeguards and full audit logging.",
    stack: ["FastAPI", "PostgreSQL", "SQLAlchemy", "MCP", "OpenAI"],
    github: "https://github.com/yashsharma499/mcp-secure-ai-db",
    accent: "#0e7490",
  },
  {
    title: "AI Interview Scheduler",
    description:
      "Multi-agent scheduling system: LangGraph stateful workflows, LLM intent classification, tool-based execution and a real-time agent observability dashboard.",
    stack: ["FastAPI", "LangGraph", "Groq", "SQLAlchemy"],
    github: "https://github.com/yashsharma499/ai_interviewChatbot",
    live: "https://ai-interview-chatbot-gilt.vercel.app",
    accent: "#6366F1",
  },
  {
    title: "AI Knowledge Assistant (RAG)",
    description:
      "Document Q&A platform: chunking, embedding generation, semantic Top-K retrieval over Pinecone, contextual chat history, and a role-based admin console with usage analytics.",
    stack: ["Flask", "React", "Pinecone", "Groq", "MongoDB"],
    github: "https://github.com/yashsharma499/ai_ragChatbot",
    accent: "#9333ea",
  },
  {
    title: "AI Meeting Notes",
    description:
      "Full-stack app that turns meetings into structured, searchable AI-generated notes and action items.",
    stack: ["JavaScript", "Node.js", "React", "AI APIs"],
    github: "https://github.com/yashsharma499/ai-meeting-notes",
    live: "https://ai-meeting-notes-zeta.vercel.app",
    accent: "#0e7490",
  },
  {
    title: "AI Therapist Agent",
    description:
      "Conversational therapy companion with a calm, focused interface for supportive AI conversations.",
    stack: ["Next.js", "TypeScript", "Tailwind"],
    github: "https://github.com/yashsharma499/ai_therapist_agent_frontend",
    live: "https://ai-therapist-agent-frontend-psi.vercel.app",
    accent: "#8b5cf6",
  },
  {
    title: "Real-Time Chat Application",
    description:
      "Socket.io instant messaging with group chats, photo/video/file sharing, emoji, push notifications and Google OAuth — Redux-managed MERN stack.",
    stack: ["React", "Redux Toolkit", "Node.js", "MongoDB", "Socket.io"],
    github: "https://github.com/yashsharma499/chatapp-frontend",
    live: "https://chatapp-frontend-f2varpu9a-yashsharma499s-projects.vercel.app/login",
    accent: "#0284c7",
  },
  {
    title: "Gesture Control",
    description:
      "Real-time hand tracking from webcam video with MediaPipe landmarks — a foundation for gesture-driven interfaces.",
    stack: ["Python", "OpenCV", "MediaPipe"],
    github: "https://github.com/yashsharma499/Gesture-Control",
    accent: "#0d9488",
  },
];
