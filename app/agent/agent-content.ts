import { experiments, projects, publications } from "../(main)/content";
import type { Answer, Block, CardTone, ProjectCard } from "./types";

/**
 * Everything the agent knows, as plain data.
 *
 * The project / experiment / publication lists are imported from the shared
 * `(main)/content.ts` used by the classic site, so the agent can never fall
 * behind the rest of edgaras.com.
 *
 * This is deliberately the only place answers live: when the real backend
 * lands, `answerFor()` gets swapped for a call to the model and this file
 * becomes the retrieval source / system prompt material.
 */

const EMAIL = ["hi", "edgaras.com"].join("@");

/** Presentation details per project; anything unlisted still renders. */
const projectPresentation: Record<string, { meta: string; tone: CardTone }> = {
  Craftled: { meta: "Product studio", tone: "violet" },
  "Service Intent": { meta: "Design consultancy", tone: "emerald" },
  "UI Things": { meta: "Design · Writing", tone: "amber" },
  "AI Turnpoint": { meta: "AI · Publication", tone: "rose" },
  "Know Me If You Can": { meta: "iOS app", tone: "sky" },
  "Expired Domains": { meta: "Digital product", tone: "violet" },
};

const fallbackTones: CardTone[] = ["sky", "violet", "amber", "emerald", "rose"];

const projectCards: ProjectCard[] = projects.map((project, index) => ({
  title: project.name,
  href: project.href,
  meta: projectPresentation[project.name]?.meta ?? "Project",
  tone:
    projectPresentation[project.name]?.tone ??
    fallbackTones[index % fallbackTones.length],
}));

const projectsBlock: Block = { kind: "projects", items: projectCards };

const experimentsBlock: Block = {
  kind: "links",
  items: experiments.map((item) => ({ label: item.name, href: item.href })),
};

const publicationsBlock: Block = {
  kind: "links",
  items: [
    ...publications.map((item) => ({ label: item.name, href: item.href })),
    {
      label: "Bookmarks",
      href: "https://bookmarks.craftled.com",
      note: "What I'm reading and saving",
    },
  ],
};

export type Topic = {
  id: string;
  /** Canonical question, also used as the pill label. */
  prompt: string;
  keywords: string[];
  answer: Answer;
};

export const topics: Topic[] = [
  {
    id: "work",
    prompt: "Show my recent work",
    keywords: [
      "work",
      "recent",
      "latest",
      "portfolio",
      "projects",
      "project",
      "case",
      "studies",
      "built",
      "building",
      "product",
      "products",
      "strongest",
      "best",
    ],
    answer: {
      text: "My days split between a multi-brand design system for football clubs and the products I build on my own. Here's everything I'm working on:",
      blocks: [projectsBlock],
      followUps: [
        "How I work",
        "Experiments I've shipped",
        "Technical skills",
        "My experience",
      ],
    },
  },
  {
    id: "design-code",
    prompt: "Design + code",
    keywords: [
      "design",
      "code",
      "coding",
      "developer",
      "development",
      "engineer",
      "both",
      "hybrid",
      "designer",
      "ship",
    ],
    answer: {
      text: "I design it and then I build it. That loop is the whole point — decisions get tested in real code instead of dying in a Figma file.",
      blocks: [
        {
          kind: "bullets",
          items: [
            "Design systems, tokens and multi-brand theming",
            "Next.js, React, TypeScript, Tailwind on the web",
            "React Native for mobile apps",
            "AI agents wired into the everyday workflow, not bolted on",
          ],
        },
      ],
      followUps: ["Show my recent work", "Technical skills", "Why me?"],
    },
  },
  {
    id: "startups",
    prompt: "Startups I've built",
    keywords: [
      "startup",
      "startups",
      "founder",
      "business",
      "indie",
      "side",
      "venture",
      "company",
      "saas",
      "own",
    ],
    answer: {
      text: "I run a one-person design consultancy, co-build a small product studio with friends, and keep shipping things on the side. All of it:",
      blocks: [projectsBlock],
      followUps: [
        "Experiments I've shipped",
        "What I'm doing now",
        "Why me?",
        "Let's work together",
      ],
    },
  },
  {
    id: "experiments",
    prompt: "Experiments I've shipped",
    keywords: [
      "experiment",
      "experiments",
      "plugin",
      "plugins",
      "extension",
      "chrome",
      "tools",
      "toys",
      "small",
      "playground",
    ],
    answer: {
      text: "Smaller things built to scratch an itch — plugins, extensions and tools I use myself.",
      blocks: [experimentsBlock],
      followUps: [
        "Show my recent work",
        "What I write about",
        "Technical skills",
      ],
    },
  },
  {
    id: "why-me",
    prompt: "Why me?",
    keywords: [
      "why",
      "hire",
      "hiring",
      "different",
      "unique",
      "value",
      "strength",
      "strengths",
      "good",
      "fit",
    ],
    answer: {
      text: "Because you get one person instead of a handoff chain — and a lot less translation loss.",
      blocks: [
        {
          kind: "bullets",
          items: [
            "I've kept a design system alive across many brands in production, not just in a library file",
            "I write the front-end, so the system survives contact with engineering",
            "I've founded my own products, so I argue about scope and business value, not just pixels",
            "One contractor, direct communication, no agency overhead",
          ],
        },
      ],
      followUps: ["My CV", "How I work", "Let's work together"],
    },
  },
  {
    id: "cv",
    prompt: "My CV",
    keywords: [
      "cv",
      "resume",
      "background",
      "career",
      "history",
      "bio",
      "about",
      "yourself",
    ],
    answer: {
      text: "I'm a designer, developer, social bachata dancer and business founder living in Lithuania. The short version:",
      blocks: [
        {
          kind: "facts",
          items: [
            {
              label: "Now",
              value:
                "Founder & designer at Service Intent — design systems for Sports Innovation",
            },
            {
              label: "Also",
              value: "Co-building Craftled, a small product studio",
            },
            {
              label: "Craft",
              value:
                "Product design, design systems, front-end, a bit of everything else",
            },
            { label: "Based", value: "Vilnius, Lithuania" },
          ],
        },
        {
          kind: "links",
          items: [
            {
              label: "LinkedIn",
              href: "https://www.linkedin.com/in/edgarasben/",
              note: "Full history",
            },
          ],
        },
      ],
      followUps: ["My experience", "Technical skills", "Let's work together"],
    },
  },
  {
    id: "contact",
    prompt: "Let's work together",
    keywords: [
      "contact",
      "together",
      "email",
      "mail",
      "available",
      "availability",
      "freelance",
      "contract",
      "talk",
      "reach",
      "call",
      "book",
      "rate",
      "rates",
    ],
    answer: {
      text: "I take on a small number of contracts at a time, usually design systems or product design with front-end attached. Email is the fastest way in.",
      blocks: [
        {
          kind: "links",
          items: [
            { label: "Email", href: `mailto:${EMAIL}`, note: EMAIL },
            { label: "X", href: "https://x.com/edgarasben" },
            {
              label: "LinkedIn",
              href: "https://linkedin.com/in/edgarasben/",
            },
            {
              label: "GitHub",
              href: "https://github.com/edgarasben/",
            },
            { label: "Figma", href: "https://figma.com/@edgaras" },
          ],
        },
      ],
      followUps: ["What I'm doing now", "Why me?", "How I work"],
    },
  },
  {
    id: "how-i-work",
    prompt: "How I work",
    keywords: [
      "how",
      "process",
      "workflow",
      "collaborate",
      "collaboration",
      "method",
      "approach",
      "principles",
      "team",
    ],
    answer: {
      text: "Small vertical slices, shipped often. I'd rather have one real screen working end to end than ten polished mockups nobody can use.",
      blocks: [
        {
          kind: "bullets",
          items: [
            "Start from the constraint — brand, platform, team size — not from a blank canvas",
            "Build the system while building the first real feature, never before it",
            "Write things down: tokens, decisions, docs that outlive the thread",
            "Stay reachable and async-friendly across time zones",
          ],
        },
      ],
      followUps: ["Show my recent work", "Technical skills", "Why me?"],
    },
  },
  {
    id: "skills",
    prompt: "Technical skills",
    keywords: [
      "technical",
      "skills",
      "skill",
      "stack",
      "tech",
      "tooling",
      "languages",
      "framework",
      "frameworks",
      "figma",
      "react",
      "typescript",
    ],
    answer: {
      text: "Roughly split between design tooling and shipping code.",
      blocks: [
        {
          kind: "facts",
          items: [
            {
              label: "Design",
              value: "Figma, design tokens, multi-brand theming, prototyping",
            },
            {
              label: "Web",
              value: "Next.js, React, TypeScript, Tailwind CSS, shadcn/ui",
            },
            { label: "Mobile", value: "React Native, Expo, a little Swift" },
            {
              label: "AI",
              value: "Agent workflows, MCP tooling, automation for real work",
            },
          ],
        },
      ],
      followUps: ["Design + code", "Show my recent work", "My experience"],
    },
  },
  {
    id: "experience",
    prompt: "My experience",
    keywords: [
      "experience",
      "worked",
      "clients",
      "client",
      "companies",
      "roles",
      "years",
      "job",
    ],
    answer: {
      text: "Years of product design work, most recently as a contractor for sports and tech clients.",
      blocks: [
        {
          kind: "facts",
          items: [
            {
              label: "Sports Innovation",
              value:
                "Whitelabel design system powering apps for football clubs and their fans",
            },
            {
              label: "Service Intent",
              value: "My consultancy — design systems and product design",
            },
            {
              label: "Craftled",
              value: "Products, directories, templates and AI tooling",
            },
            {
              label: "Epigraph Media",
              value: "Our publications on design, tech and AI",
            },
          ],
        },
      ],
      followUps: ["My CV", "Show my recent work", "Let's work together"],
    },
  },
  {
    id: "writing",
    prompt: "What I write about",
    keywords: [
      "writing",
      "write",
      "blog",
      "article",
      "articles",
      "publication",
      "publications",
      "posts",
      "essay",
      "read",
      "reading",
      "ideas",
      "thinking",
      "bookmarks",
    ],
    answer: {
      text: "I write about design tooling, AI and where the two collide — mostly for our Epigraph Media publications.",
      blocks: [publicationsBlock],
      followUps: [
        "Design + code",
        "Experiments I've shipped",
        "Life outside work",
      ],
    },
  },
  {
    id: "now",
    prompt: "What I'm doing now",
    keywords: [
      "now",
      "currently",
      "today",
      "lately",
      "these",
      "days",
      "busy",
      "up",
    ],
    answer: {
      text: "Right now, in no particular order:",
      blocks: [
        {
          kind: "bullets",
          items: [
            "Writing design, tech and AI posts for our Epigraph Media publications",
            "As a contractor, making design systems and mobile apps for top Danish and international football clubs",
            "Practicing bachata twice a week and social dancing",
            "Getting back to my 3-times-a-week gym routine",
            "Recently started living in Vilnius, Lithuania",
          ],
        },
        {
          kind: "links",
          items: [{ label: "The full /now page", href: "/now" }],
        },
      ],
      followUps: [
        "Show my recent work",
        "Life outside work",
        "Let's work together",
      ],
    },
  },
  {
    id: "personal",
    prompt: "Life outside work",
    keywords: [
      "life",
      "personal",
      "hobbies",
      "hobby",
      "fun",
      "dance",
      "dancing",
      "bachata",
      "salsa",
      "gym",
      "health",
      "vilnius",
      "lithuania",
      "live",
      "living",
    ],
    answer: {
      text: "Social dancing is the big one — bachata mostly, salsa when the night allows. Otherwise: gym, mobility, food that doesn't wreck the afternoon, and long walks around Vilnius.",
      followUps: [
        "What I'm doing now",
        "Show my recent work",
        "Let's work together",
      ],
    },
  },
];

/** Pills shown on the landing state, in order. */
export const openingPromptIds = [
  "work",
  "design-code",
  "startups",
  "why-me",
  "cv",
  "contact",
] as const;

export const openingPrompts = openingPromptIds.map((id) => {
  const topic = topics.find((t) => t.id === id);
  if (!topic) throw new Error(`Unknown opening topic: ${id}`);
  return topic.prompt;
});

/** Header nav items — each one just asks the agent something. */
export const navPrompts = [
  { label: "Work", prompt: "Show my recent work" },
  { label: "About", prompt: "My CV" },
  { label: "Ideas", prompt: "What I write about" },
  { label: "Now", prompt: "What I'm doing now" },
  { label: "Contact", prompt: "Let's work together" },
];

const fallback: Answer = {
  text: "I don't have a good answer for that one yet — this version of me is still running on a handwritten script. Try one of these instead:",
  followUps: ["Show my recent work", "My CV", "Let's work together"],
};

const stopWords = new Set([
  "a",
  "an",
  "and",
  "are",
  "can",
  "did",
  "do",
  "does",
  "for",
  "from",
  "have",
  "how",
  "is",
  "it",
  "me",
  "my",
  "of",
  "on",
  "or",
  "show",
  "tell",
  "that",
  "the",
  "to",
  "was",
  "what",
  "who",
  "with",
  "you",
  "your",
]);

function tokenize(input: string): string[] {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s'-]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

/**
 * Local stand-in for the model. Exact pill matches win, otherwise we score
 * keyword overlap and fall back to a menu.
 */
export function answerFor(input: string): Answer {
  const normalized = input.trim().toLowerCase();
  if (!normalized) return fallback;

  const exact = topics.find((t) => t.prompt.toLowerCase() === normalized);
  if (exact) return exact.answer;

  const words = tokenize(normalized).filter((w) => !stopWords.has(w));

  let best: Topic | undefined;
  let bestScore = 0;

  for (const topic of topics) {
    let score = 0;
    for (const word of words) {
      if (topic.keywords.includes(word)) score += 2;
      else if (
        topic.keywords.some((k) => k.startsWith(word) && word.length > 3)
      )
        score += 1;
    }
    if (score > bestScore) {
      bestScore = score;
      best = topic;
    }
  }

  return best && bestScore >= 2 ? best.answer : fallback;
}

/** Fake network latency so the UI has something to stream into. */
export function replyDelay(answer: Answer): number {
  const blockCount = answer.blocks?.length ?? 0;
  return 420 + Math.min(answer.text.length * 4, 500) + blockCount * 120;
}

export type { Block };
