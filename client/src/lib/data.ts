export type UseCase = "work" | "study" | "daily";

export interface PricingTier {
  name: string;
  price: string;
  period: string;
}

export type Origin = "global" | "china";

export interface AITool {
  id: string;
  name: string;
  tagline: string;
  category: string;
  logo: string;
  brandColor: string;
  freeTier: boolean;
  pricing: PricingTier[];
  lowestPaid: number;
  pros: string[];
  cons: string[];
  useCases: UseCase[];
  workScore: number;
  studyScore: number;
  dailyScore: number;
  bestFor: string;
  website: string;
  origin: Origin;
}

export const tools: AITool[] = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    tagline: "General-purpose conversational AI with the broadest ecosystem",
    category: "Conversational AI",
    logo: "GPT",
    brandColor: "#10A37F",
    freeTier: true,
    pricing: [
      { name: "Free", price: "$0", period: "/mo" },
      { name: "Plus", price: "$20", period: "/mo" },
      { name: "Pro", price: "$200", period: "/mo" },
    ],
    lowestPaid: 20,
    pros: [
      "Most versatile — text, code, images, video (Sora), voice",
      "Massive plugin/GPT Store ecosystem",
      "Deep Research for complex analysis (10–250 runs/mo)",
      "Agent Mode & Codex for autonomous coding tasks",
      "60+ app integrations on Business tier",
    ],
    cons: [
      "Free & Go tiers now show ads (since Feb 2026)",
      "Pro tier at $200/mo is expensive for most users",
      "Can be verbose — sometimes over-explains",
      "Occasional hallucinations on niche topics",
      "Rate limits hit quickly on free tier",
    ],
    useCases: ["work", "study", "daily"],
    workScore: 9,
    studyScore: 8,
    dailyScore: 9,
    bestFor: "All-around generalist with the widest feature set",
    website: "https://chatgpt.com",
    origin: "global",
  },
  {
    id: "claude",
    name: "Claude",
    tagline: "Best-in-class reasoning and long-document analysis",
    category: "Conversational AI",
    logo: "CL",
    brandColor: "#D4A27F",
    freeTier: true,
    pricing: [
      { name: "Free", price: "$0", period: "/mo" },
      { name: "Pro", price: "$20", period: "/mo" },
      { name: "Max 5x", price: "$100", period: "/mo" },
      { name: "Max 20x", price: "$200", period: "/mo" },
    ],
    lowestPaid: 20,
    pros: [
      "Superior reasoning and nuanced analysis",
      "1M token context window (Opus 4.6) — entire books at once",
      "Cowork feature for autonomous multi-step tasks",
      "Excellent at coding, document review, and long-form writing",
      "Artifacts for shareable code and documents",
    ],
    cons: [
      "No native image generation capabilities",
      "$80 gap between Pro ($20) and Max ($100) tiers",
      "Message caps can be restrictive (5-hour cooldown)",
      "Smaller plugin/integration ecosystem vs ChatGPT",
      "No video generation features",
    ],
    useCases: ["work", "study"],
    workScore: 9,
    studyScore: 9,
    dailyScore: 6,
    bestFor: "Deep analysis, coding, and long document processing",
    website: "https://claude.ai",
    origin: "global",
  },
  {
    id: "gemini",
    name: "Gemini",
    tagline: "Tightly integrated with Google Workspace and massive context",
    category: "Conversational AI",
    logo: "GE",
    brandColor: "#4285F4",
    freeTier: true,
    pricing: [
      { name: "Free", price: "$0", period: "/mo" },
      { name: "AI Pro", price: "$20", period: "/mo" },
      { name: "AI Ultra", price: "$42", period: "/mo" },
    ],
    lowestPaid: 20,
    pros: [
      "2TB Google One storage included (worth $10/mo alone)",
      "Deep Google Workspace integration (Gmail, Docs, Drive)",
      "1M+ token context window — largest in the industry",
      "Multimodal: text, images, audio, video natively",
      "AI Ultra at ~$42/mo is cheaper than competitors' top tier",
    ],
    cons: [
      "Best value only if you're in the Google ecosystem",
      "Creative writing quality lags behind ChatGPT and Claude",
      "Ultra pricing structure is awkward ($124.99/quarter)",
      "Deep Research feature less mature than competitors",
      "Fewer third-party integrations outside Google",
    ],
    useCases: ["work", "study", "daily"],
    workScore: 8,
    studyScore: 8,
    dailyScore: 8,
    bestFor: "Google ecosystem power users who want AI + storage",
    website: "https://gemini.google.com",
    origin: "global",
  },
  {
    id: "perplexity",
    name: "Perplexity",
    tagline: "AI-powered search engine with real-time citations",
    category: "AI Search",
    logo: "PP",
    brandColor: "#20808D",
    freeTier: true,
    pricing: [
      { name: "Free", price: "$0", period: "/mo" },
      { name: "Pro", price: "$20", period: "/mo" },
      { name: "Max", price: "$200", period: "/mo" },
    ],
    lowestPaid: 20,
    pros: [
      "Every answer cites real sources — verifiable and trustworthy",
      "Access to multiple frontier models (GPT, Claude, etc.)",
      "Perplexity Computer for agentic workflows (Max tier)",
      "Excellent for research, fact-checking, and staying current",
      "Labs for spreadsheet and report generation",
    ],
    cons: [
      "Less capable for creative writing and brainstorming",
      "Free tier limited to 5 Pro searches/day",
      "Max tier at $200/mo is pricey for search",
      "Not ideal for long-form content generation",
      "No image or video generation capabilities",
    ],
    useCases: ["work", "study", "daily"],
    workScore: 8,
    studyScore: 9,
    dailyScore: 8,
    bestFor: "Research, fact-checking, and questions that need sourced answers",
    website: "https://perplexity.ai",
    origin: "global",
  },
  {
    id: "midjourney",
    name: "Midjourney",
    tagline: "Premium AI image generation with unmatched aesthetic quality",
    category: "Image Generation",
    logo: "MJ",
    brandColor: "#5865F2",
    freeTier: false,
    pricing: [
      { name: "Basic", price: "$10", period: "/mo" },
      { name: "Standard", price: "$30", period: "/mo" },
      { name: "Pro", price: "$60", period: "/mo" },
      { name: "Mega", price: "$120", period: "/mo" },
    ],
    lowestPaid: 10,
    pros: [
      "Best aesthetic quality for AI-generated images",
      "Unique artistic styles that competitors can't match",
      "Commercial usage rights on all paid plans",
      "Relax Mode on Standard+ for unlimited slower generations",
      "Stealth Mode on Pro+ for private commercial work",
    ],
    cons: [
      "No free tier — must pay $10/mo minimum",
      "No text chat or conversation capabilities",
      "GPU-hour based limits can be confusing",
      "Still primarily Discord-based workflow (web editor improving)",
      "Limited to images — no text, code, or video generation",
    ],
    useCases: ["work", "daily"],
    workScore: 7,
    studyScore: 3,
    dailyScore: 7,
    bestFor: "Creative professionals who need high-quality AI images",
    website: "https://midjourney.com",
    origin: "global",
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    tagline: "Open-source reasoning powerhouse at a fraction of the cost",
    category: "Conversational AI",
    logo: "DS",
    brandColor: "#4D6BFE",
    freeTier: true,
    pricing: [
      { name: "Free", price: "$0", period: "/mo" },
      { name: "API", price: "~$1", period: "/mo" },
    ],
    lowestPaid: 1,
    pros: [
      "API pricing 94-97% cheaper than GPT-4 — unbeatable value",
      "Open-source weights — can self-host with full control",
      "V3.2 unifies chat and reasoning at the same price",
      "128K context window with 90% cache discount",
      "Math and coding benchmarks rival top proprietary models",
    ],
    cons: [
      "No subscription tier — API/pay-per-token only (suits developers)",
      "Web chat UI is basic compared to ChatGPT/Claude",
      "English proficiency slightly trails top US models",
      "No native image, video, or voice generation",
      "Service stability can be inconsistent during peak times",
    ],
    useCases: ["work", "study"],
    workScore: 8,
    studyScore: 8,
    dailyScore: 6,
    bestFor: "Developers and researchers who want top reasoning at minimal cost",
    website: "https://chat.deepseek.com",
    origin: "china",
  },
  {
    id: "kimi",
    name: "Kimi",
    tagline: "Agentic AI with 256K context and powerful tool orchestration",
    category: "Agentic AI",
    logo: "KM",
    brandColor: "#1A1A2E",
    freeTier: true,
    pricing: [
      { name: "Free", price: "$0", period: "/mo" },
      { name: "Moderato", price: "$19", period: "/mo" },
      { name: "Allegretto", price: "$199", period: "/mo" },
    ],
    lowestPaid: 19,
    pros: [
      "256K ultra-long context window — handles massive documents",
      "Kimi K2.5: 1T-parameter MoE model, among the strongest open-source",
      "Kimi Claw agent for autonomous multi-step workflows",
      "Supports 200+ sequential tool calls without losing coherence",
      "Strong coding ability — SWE-Bench score surpasses GPT-4.1",
    ],
    cons: [
      "Ecosystem mostly China-focused, limited global integrations",
      "Token-based billing (since Jan 2026) can be unpredictable",
      "Tool compatibility restrictions — only approved tools allowed",
      "Kimi Claw agent limited to 20 runs/mo on Moderato tier",
      "Brand awareness outside China is still low",
    ],
    useCases: ["work", "study"],
    workScore: 8,
    studyScore: 7,
    dailyScore: 6,
    bestFor: "Agentic workflows, long documents, and coding in the Chinese market",
    website: "https://kimi.moonshot.cn",
    origin: "china",
  },
  {
    id: "qwen",
    name: "通义千问 (Qwen)",
    tagline: "Alibaba's open-source multilingual AI with massive free quota",
    category: "Conversational AI",
    logo: "QW",
    brandColor: "#FF6A00",
    freeTier: true,
    pricing: [
      { name: "Free", price: "$0", period: "/mo" },
      { name: "Coding", price: "¥7.9", period: "/mo" },
      { name: "Pro", price: "¥200", period: "/mo" },
    ],
    lowestPaid: 1,
    pros: [
      "70M+ free tokens for new users — extremely generous",
      "Qwen3-Max and Qwen3.6-Plus are industry-competitive",
      "Full Apache 2.0 open-source — commercial use allowed",
      "119-language support — best multilingual coverage",
      "Deep Alibaba Cloud ecosystem integration",
    ],
    cons: [
      "Best experience tied to Alibaba Cloud platform",
      "Consumer chat app less polished than ChatGPT",
      "Complex pricing tiers that change with context length",
      "Agentic capabilities still maturing vs Kimi/Claude",
      "International availability more limited outside Asia",
    ],
    useCases: ["work", "study", "daily"],
    workScore: 8,
    studyScore: 8,
    dailyScore: 7,
    bestFor: "Budget-conscious teams needing multilingual open-source AI",
    website: "https://tongyi.aliyun.com",
    origin: "china",
  },
];

export const useCaseLabels: Record<UseCase, string> = {
  work: "Work",
  study: "Study",
  daily: "Daily Life",
};

export type SortField = "name" | "lowestPaid" | "workScore" | "studyScore" | "dailyScore";
export type SortDirection = "asc" | "desc";

export function sortTools(
  toolList: AITool[],
  field: SortField,
  direction: SortDirection
): AITool[] {
  return [...toolList].sort((a, b) => {
    let cmp = 0;
    if (field === "name") {
      cmp = a.name.localeCompare(b.name);
    } else {
      cmp = (a[field] as number) - (b[field] as number);
    }
    return direction === "desc" ? -cmp : cmp;
  });
}

export function filterByUseCase(
  toolList: AITool[],
  useCaseFilters: UseCase[]
): AITool[] {
  if (useCaseFilters.length === 0) return toolList;
  return toolList.filter((t) =>
    useCaseFilters.every((uc) => t.useCases.includes(uc))
  );
}

export function filterByOrigin(
  toolList: AITool[],
  originFilter: Origin | "all"
): AITool[] {
  if (originFilter === "all") return toolList;
  return toolList.filter((t) => t.origin === originFilter);
}
