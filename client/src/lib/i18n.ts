import { createContext, useContext } from "react";

export type Locale = "en" | "zh";

export interface Translations {
  // Header
  title: string;
  subtitle: (shown: number, total: number) => string;
  pricingDate: string;

  // Filters
  work: string;
  study: string;
  daily: string;

  // Sort
  sortName: string;
  sortPrice: string;
  sortWork: string;
  sortStudy: string;
  sortDaily: string;

  // Views
  cards: string;
  table: string;
  expandAll: string;
  collapseAll: string;
  showProscons: string;
  hideDetails: string;

  // Card content
  freeTier: string;
  bestFor: string;
  pros: string;
  cons: string;

  // Table
  colTool: string;
  colCategory: string;
  colFree: string;
  colLowestPaid: string;
  colWork: string;
  colStudy: string;
  colDaily: string;
  colBestFor: string;

  // Empty state
  emptyTitle: string;
  emptyHint: string;

  // Footer
  footer: string;

  // Theme
  switchToLight: string;
  switchToDark: string;

  // Language
  langLabel: string;

  // Origin filter
  originAll: string;
  originGlobal: string;
  originChina: string;

  // Tool data
  tools: Record<string, {
    tagline: string;
    bestFor: string;
    category: string;
    pros: string[];
    cons: string[];
  }>;
}

const en: Translations = {
  title: "AI Tools Compared",
  subtitle: (shown, total) => `${shown} of ${total} tools · Pricing as of April 2026`,
  pricingDate: "April 2026",

  work: "Work",
  study: "Study",
  daily: "Daily Life",

  sortName: "Name",
  sortPrice: "Price (lowest paid)",
  sortWork: "Work Score",
  sortStudy: "Study Score",
  sortDaily: "Daily Life Score",

  cards: "Cards",
  table: "Table",
  expandAll: "Expand all",
  collapseAll: "Collapse all",
  showProscons: "Show pros & cons",
  hideDetails: "Hide details",

  freeTier: "Free tier",
  bestFor: "Best for",
  pros: "Pros",
  cons: "Cons",

  colTool: "Tool",
  colCategory: "Category",
  colFree: "Free",
  colLowestPaid: "Lowest Paid",
  colWork: "Work",
  colStudy: "Study",
  colDaily: "Daily",
  colBestFor: "Best For",

  emptyTitle: "No tools match the selected filters",
  emptyHint: "Try removing a filter to see more results",

  footer: "Pricing and features sourced from official websites. Last updated April 2026.",

  switchToLight: "Switch to light mode",
  switchToDark: "Switch to dark mode",

  langLabel: "EN",

  originAll: "All",
  originGlobal: "Global",
  originChina: "China",

  tools: {
    chatgpt: {
      tagline: "General-purpose conversational AI with the broadest ecosystem",
      category: "Conversational AI",
      bestFor: "All-around generalist with the widest feature set",
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
    },
    claude: {
      tagline: "Best-in-class reasoning and long-document analysis",
      category: "Conversational AI",
      bestFor: "Deep analysis, coding, and long document processing",
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
    },
    gemini: {
      tagline: "Tightly integrated with Google Workspace and massive context",
      category: "Conversational AI",
      bestFor: "Google ecosystem power users who want AI + storage",
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
    },
    perplexity: {
      tagline: "AI-powered search engine with real-time citations",
      category: "AI Search",
      bestFor: "Research, fact-checking, and questions that need sourced answers",
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
    },
    midjourney: {
      tagline: "Premium AI image generation with unmatched aesthetic quality",
      category: "Image Generation",
      bestFor: "Creative professionals who need high-quality AI images",
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
    },
    deepseek: {
      tagline: "Open-source reasoning powerhouse at a fraction of the cost",
      category: "Conversational AI",
      bestFor: "Developers and researchers who want top reasoning at minimal cost",
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
    },
    kimi: {
      tagline: "Agentic AI with 256K context and powerful tool orchestration",
      category: "Agentic AI",
      bestFor: "Agentic workflows, long documents, and coding in the Chinese market",
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
    },
    qwen: {
      tagline: "Alibaba's open-source multilingual AI with massive free quota",
      category: "Conversational AI",
      bestFor: "Budget-conscious teams needing multilingual open-source AI",
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
    },
  },
};

const zh: Translations = {
  title: "AI 工具对比",
  subtitle: (shown, total) => `显示 ${shown} / ${total} 个工具 · 定价截至 2026 年 4 月`,
  pricingDate: "2026 年 4 月",

  work: "工作",
  study: "学习",
  daily: "日常生活",

  sortName: "名称",
  sortPrice: "价格（最低付费）",
  sortWork: "工作评分",
  sortStudy: "学习评分",
  sortDaily: "日常评分",

  cards: "卡片",
  table: "表格",
  expandAll: "全部展开",
  collapseAll: "全部收起",
  showProscons: "查看优缺点",
  hideDetails: "收起详情",

  freeTier: "免费版",
  bestFor: "最适合",
  pros: "优点",
  cons: "缺点",

  colTool: "工具",
  colCategory: "类型",
  colFree: "免费",
  colLowestPaid: "最低付费",
  colWork: "工作",
  colStudy: "学习",
  colDaily: "日常",
  colBestFor: "最适合",

  emptyTitle: "没有工具匹配当前筛选条件",
  emptyHint: "试试移除一个筛选条件",

  footer: "定价和功能信息来源于各产品官网，最后更新于 2026 年 4 月。",

  switchToLight: "切换为浅色模式",
  switchToDark: "切换为深色模式",

  langLabel: "中",

  originAll: "全部",
  originGlobal: "国际",
  originChina: "国产",

  tools: {
    chatgpt: {
      tagline: "功能最全面的通用对话式 AI，拥有最广泛的生态系统",
      category: "对话式 AI",
      bestFor: "全能型选手，功能覆盖面最广",
      pros: [
        "最全能 —— 文本、代码、图像、视频（Sora）、语音全覆盖",
        "庞大的插件和 GPT Store 生态系统",
        "Deep Research 深度研究功能（每月 10–250 次）",
        "Agent Mode 和 Codex 支持自主编程任务",
        "Business 版支持 60+ 应用集成",
      ],
      cons: [
        "免费版和 Go 版已开始展示广告（2026 年 2 月起）",
        "Pro 版 $200/月，对多数用户偏贵",
        "回答有时过于冗长、过度解释",
        "在冷门话题上偶有幻觉问题",
        "免费版速率限制较严格",
      ],
    },
    claude: {
      tagline: "推理能力与长文档分析领域的标杆",
      category: "对话式 AI",
      bestFor: "深度分析、编程和长文档处理",
      pros: [
        "推理能力出色，分析细腻深入",
        "100 万 token 上下文窗口（Opus 4.6）—— 可一次处理整本书",
        "Cowork 功能支持自主完成多步骤任务",
        "编程、文档审查和长篇写作表现优秀",
        "Artifacts 功能可生成可分享的代码和文档",
      ],
      cons: [
        "不支持图像生成",
        "Pro（$20）和 Max（$100）之间有 $80 的价格跳跃",
        "消息配额限制较严（5 小时冷却期）",
        "插件和集成生态不如 ChatGPT 丰富",
        "不支持视频生成",
      ],
    },
    gemini: {
      tagline: "与 Google Workspace 深度整合，拥有超大上下文窗口",
      category: "对话式 AI",
      bestFor: "Google 生态用户，想要 AI + 存储的完美组合",
      pros: [
        "包含 2TB Google One 存储（单独价值 $10/月）",
        "深度集成 Google Workspace（Gmail、Docs、Drive）",
        "100 万+ token 上下文窗口 —— 业界最大",
        "原生多模态：文本、图像、音频、视频",
        "AI Ultra 约 $42/月，比竞品高端版便宜",
      ],
      cons: [
        "只有深度使用 Google 生态才能发挥最大价值",
        "创意写作质量落后于 ChatGPT 和 Claude",
        "Ultra 定价方式不直观（$124.99/季度）",
        "Deep Research 功能成熟度不如竞品",
        "Google 之外的第三方集成较少",
      ],
    },
    perplexity: {
      tagline: "支持实时引用的 AI 搜索引擎",
      category: "AI 搜索",
      bestFor: "研究、事实核查和需要来源引用的问答",
      pros: [
        "每个回答都引用真实来源 —— 可验证、可信赖",
        "可访问多个前沿模型（GPT、Claude 等）",
        "Perplexity Computer 支持智能体工作流（Max 版）",
        "在研究、事实核查和追踪时事方面表现出色",
        "Labs 支持电子表格和报告生成",
      ],
      cons: [
        "创意写作和头脑风暴能力较弱",
        "免费版每日仅 5 次 Pro 搜索",
        "Max 版 $200/月，作为搜索工具偏贵",
        "不适合长篇内容生成",
        "不支持图像或视频生成",
      ],
    },
    midjourney: {
      tagline: "审美品质无与伦比的 AI 图像生成工具",
      category: "图像生成",
      bestFor: "需要高质量 AI 图像的创意工作者",
      pros: [
        "AI 生成图像中审美品质最高",
        "独特的艺术风格，竞品难以匹敌",
        "所有付费版均可商用",
        "Standard 及以上版本有 Relax 模式，可无限慢速生成",
        "Pro 及以上版本有 Stealth 模式，适合保密商业项目",
      ],
      cons: [
        "没有免费版 —— 最低 $10/月起",
        "不支持文本对话功能",
        "基于 GPU 时长的限制容易混淆",
        "仍以 Discord 为主要使用方式（网页编辑器在改进中）",
        "仅限图像 —— 不支持文本、代码或视频生成",
      ],
    },
    deepseek: {
      tagline: "开源推理王者，成本仅为 GPT-4 的 3-6%",
      category: "对话式 AI",
      bestFor: "追求极致性价比的开发者和研究人员",
      pros: [
        "API 价格比 GPT-4 便宜 94-97% —— 性价比无敌",
        "开源模型权重 —— 可自行部署，完全可控",
        "V3.2 统一了对话和推理，同一价格",
        "128K 上下文窗口，缓存命中享 90% 折扣",
        "数学和编程基准测试媲美顶级闭源模型",
      ],
      cons: [
        "无订阅制 —— 仅按 token 计费（更适合开发者）",
        "网页聊天界面简陋，不如 ChatGPT/Claude",
        "英文能力略逊于美国顶级模型",
        "不支持图像、视频或语音生成",
        "高峰期服务稳定性不太一致",
      ],
    },
    kimi: {
      tagline: "智能体能力突出，256K 超长上下文，强大的工具编排",
      category: "智能体 AI",
      bestFor: "智能体工作流、长文档处理和编程",
      pros: [
        "256K 超长上下文窗口 —— 轻松处理超大文档",
        "Kimi K2.5：万亿参数 MoE 模型，开源最强之一",
        "Kimi Claw 智能体支持自主多步骤工作流",
        "支持 200+ 次连续工具调用，不丢失上下文",
        "编程能力强 —— SWE-Bench 得分超越 GPT-4.1",
      ],
      cons: [
        "生态以国内为主，国际集成有限",
        "Token 计费制（2026 年 1 月起）实际消耗不好预估",
        "工具兼容性限制 —— 仅支持认证工具",
        "Moderato 版 Claw 智能体每月仅 20 次",
        "在海外市场品牌知名度较低",
      ],
    },
    qwen: {
      tagline: "阿里巴巴开源多语言 AI，免费额度极其慷慨",
      category: "对话式 AI",
      bestFor: "注重预算的团队，需要多语言开源 AI",
      pros: [
        "新用户 7000 万+ 免费 token —— 慷慨至极",
        "Qwen3-Max 和 Qwen3.6-Plus 达到业界一线水平",
        "完全 Apache 2.0 开源 —— 可商用",
        "支持 119 种语言 —— 多语言覆盖最广",
        "深度融入阿里云生态",
      ],
      cons: [
        "最佳体验依赖阿里云平台",
        "面向消费者的聊天应用不如 ChatGPT 精致",
        "定价分层复杂，随上下文长度变化",
        "智能体能力相比 Kimi/Claude 仍在追赶",
        "亚洲以外地区可用性较有限",
      ],
    },
  },
};

export const translations: Record<Locale, Translations> = { en, zh };

export const I18nContext = createContext<{
  locale: Locale;
  t: Translations;
  setLocale: (l: Locale) => void;
}>({
  locale: "zh",
  t: zh,
  setLocale: () => {},
});

export function useI18n() {
  return useContext(I18nContext);
}
