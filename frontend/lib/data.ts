export const PROFILE = {
  name: "Chukwunonso Ikeji",
  alias: "Codypharm",
  title: "AI Engineer (LLMs & RAG) | Healthcare & Life Sciences",
  titleShort: "AI Engineer",
  tagline: "Building intelligent systems where AI, healthcare, and engineering meet.",
  location: "Lagos, Nigeria",
  email: "williamikeji@gmail.com",
  linkedin: "https://linkedin.com/in/codypharm",
  github: "https://github.com/codypharm",
  yearsExp: 9,
  summary: `I'm an AI Engineer with a background in Pharmacy and several years of experience building
production software systems. My work focuses on LLM-powered applications, particularly
Retrieval-Augmented Generation (RAG) systems designed for high-accuracy domains like healthcare
and pharmaceuticals. Because of my healthcare roots, compliance (HIPAA, GDPR) isn't an afterthought
— it informs how I design data flows, storage, and model access from day one. I work primarily in
Python, building LLM systems with tools like LangChain, vector databases, and custom retrieval
logic, deploying with Docker and AWS.`,
  careerPath: ["Pharmacy", "Full-Stack Web2", "Web3 & Blockchain", "AI Engineering"],
};

export interface SkillCategory {
  label: string;
  icon: string;
  items: string[];
}

export const SKILLS: SkillCategory[] = [
  {
    label: "AI & LLMs",
    icon: "Brain",
    items: ["LangChain", "LangGraph", "RAG Systems", "Amazon Bedrock", "Agentic Workflows", "Prompt Engineering", "Vector DBs", "OpenAI API"],
  },
  {
    label: "Backend",
    icon: "Database",
    items: ["Python", "FastAPI", "PostgreSQL", "REST APIs", "Node.js", "Express.js", "SQLAlchemy"],
  },
  {
    label: "Frontend",
    icon: "Code2",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Apollo GraphQL", "Zustand"],
  },
  {
    label: "Blockchain",
    icon: "Network",
    items: ["Solidity", "Hardhat", "Foundry", "Ethers.js", "Solana Web3.js", "Moralis", "Uniswap V4"],
  },
  {
    label: "DevOps & Cloud",
    icon: "Cpu",
    items: ["AWS Lambda", "API Gateway", "S3", "CloudFront", "Docker", "GitHub Actions", "Terraform"],
  },
];

export interface Project {
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  tech: string[];
  github: string;
  icon: string;
}

export const PROJECTS: Project[] = [
  {
    title: "NovaGuard",
    subtitle: "Clinical AI Safety Workbench",
    description:
      "An AI-powered clinical decision support system leveraging Amazon Nova models and OpenFDA data to automate critical pharmaceutical safety workflows for healthcare professionals.",
    highlights: [
      "Weight-adjusted renal dosing calculations based on patient kidney function",
      "Complex CYP450 drug interaction screening and pharmacogenomics matching",
      "Real-time integration with OpenFDA, RxNorm, and DailyMed for live drug recalls",
      "Streaming updates via Server-Sent Events for real-time safety alerts",
    ],
    tech: ["Python", "FastAPI", "LangGraph", "LangChain", "Amazon Nova", "PostgreSQL", "React", "TypeScript", "shadcn/ui", "OpenFDA"],
    github: "https://github.com/codypharm/NovaGuard",
    icon: "Shield",
  },
  {
    title: "ArcFlow",
    subtitle: "Cross-Chain Payroll with Yield Optimization",
    description:
      "A DeFi payroll platform that eliminates idle capital by depositing USDC into Uniswap V4 liquidity positions earning 3–48% APY, while autonomously executing payroll across chains.",
    highlights: [
      "USDC deposits into Uniswap V4 positions with autonomous yield rebalancing",
      "Cross-chain bridge via Circle Gateway (Base → Arc Chain)",
      "ENS name resolution for recipient addresses (e.g. vitalik.eth)",
      "Natural language chat interface for payroll setup and management",
    ],
    tech: ["Solidity", "Foundry", "TypeScript", "Express", "React", "Vite", "Uniswap V4", "Circle Modular Wallets", "ENS", "DefiLlama"],
    github: "https://github.com/furqaannabi/arcflow",
    icon: "Layers",
  },
];

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
  tech: string[];
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: "DeCenter AI",
    role: "Web3 Lead Engineer & Cofounder",
    period: "Aug 2023 – Dec 2025",
    location: "Gregory Hills, NSW, Australia",
    highlights: [
      "Led frontend and Web3 development for a decentralized AI model training platform",
      "Built robust smart contracts in Solidity following industry best practices",
      "Integrated blockchain with Next.js frontend using Zustand state management",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Solidity", "Hardhat", "Zustand"],
  },
  {
    company: "ZAuth",
    role: "Software Developer (Founding Member)",
    period: "May 2024 – Feb 2025",
    location: "United Arab Emirates",
    highlights: [
      "Led product planning and roadmap development for a Solana-based platform",
      "Designed responsive interfaces and integrated Solana Web3.js for blockchain interaction",
    ],
    tech: ["Solana Web3.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    company: "GamerHub",
    role: "Fullstack Blockchain Developer",
    period: "Apr 2023 – Feb 2025",
    location: "Canberra, ACT, Australia",
    highlights: [
      "Developed a Web3 game aggregator platform rewarding gamers and streamers",
      "Built and deployed smart contracts on Binance Smart Chain using Solidity",
      "Integrated React.js frontend with Web2 backend and blockchain via ethers.js",
    ],
    tech: ["Solidity", "React.js", "Express.js", "Ethers.js", "BSC", "Hardhat"],
  },
  {
    company: "ExC Group of Companies",
    role: "Pharmacy Intern",
    period: "Jul 2023 – Jul 2024",
    location: "Lagos State, Nigeria",
    highlights: [
      "Built a business performance dashboard for operational insights and tracking",
      "Conducted data analysis to improve pharmacy operations and decision-making",
      "Dispensed medications and provided patient counseling in community pharmacy",
    ],
    tech: ["Data Analysis", "Dashboard Development"],
  },
  {
    company: "Learnery Network",
    role: "Software Engineer (Frontend)",
    period: "Oct 2023 – May 2024",
    location: "Singapore",
    highlights: [
      "Integrated AI responses and backend services with Next.js frontend",
      "Implemented responsive interfaces using Apollo GraphQL and TypeScript",
    ],
    tech: ["Next.js", "Tailwind CSS", "Apollo GraphQL", "TypeScript"],
  },
  {
    company: "Freshcoast Blockchain",
    role: "Fullstack Blockchain Developer",
    period: "Jan 2022 – Mar 2023",
    location: "Michigan, United States",
    highlights: [
      "Built smart contracts and play-to-earn game mechanics in Solidity",
      "Integrated Next.js frontends with blockchain backends using Moralis and Hardhat",
    ],
    tech: ["Solidity", "Hardhat", "Next.js", "Tailwind CSS", "Moralis"],
  },
];

export const CERTIFICATIONS = [
  "AI Leader: Generative AI & Agentic",
  "AI for Leaders & Founders",
  "AI Engineer Agentic Track: The Complete Agent & MCP Course",
  "LLM Engineering: Master AI, Large Language Model & Agents",
  "Andela AI Engineering Bootcamp",
];

export const EDUCATION = [
  { degree: "Bachelor of Pharmacy (B.Pharm)", institution: "Delta State University", year: "2022" },
  { degree: "Bachelor of Science (B.Sc)", institution: "Delta State University", year: "2018" },
];

export const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];
