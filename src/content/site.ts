/**
 * Single source of truth for everything on the site.
 * Edit this file to make the portfolio yours — no component changes needed.
 */

export type Project = {
  slug: string;
  title: string;
  blurb: string;
  year: string;
  role: string;
  stack: string[];
  /** Optional image in /public — falls back to a generated gradient. */
  image?: string;
  live?: string;
  repo?: string;
  featured?: boolean;
};

export type Role = {
  company: string;
  title: string;
  period: string;
  summary: string;
  highlights: string[];
};

export type SkillGroup = {
  label: string;
  items: string[];
};

export const site = {
  name: "Moonport",
  handle: "@awomoon",
  title: "Moonport — Full-stack developer portfolio",
  description:
    "Portfolio of a full-stack web developer building fast, considered interfaces for the web.",
  url: "https://moonport.dev",
  locale: "en_US",
} as const;

export const hero = {
  eyebrow: "Available for new work",
  // Rendered one line per array entry; the last line gets the aurora gradient.
  headline: ["Interfaces that", "feel like", "liquid glass"],
  lede: "I'm a full-stack developer shaping fast, tactile products for the web — from the type scale up to the deploy pipeline.",
  primaryCta: { label: "See the work", href: "#work" },
  secondaryCta: { label: "Get in touch", href: "#contact" },
  stats: [
    { value: 6, suffix: "+", label: "Years shipping" },
    { value: 40, suffix: "+", label: "Projects delivered" },
    { value: 12, suffix: "", label: "Open-source repos" },
  ],
} as const;

export const about = {
  eyebrow: "About",
  heading: "I build the whole thing — not just the pretty half.",
  paragraphs: [
    "I'm a developer who cares about the seam where design meets engineering. Most of my work lives in TypeScript: React and Next.js on the front, Node and Postgres behind it, with a stubborn bias toward things that load fast on a bad connection.",
    "Before this I spent a few years in agency land, which is where I learned to ship on a deadline, read a Figma file properly, and say no to a carousel. These days I take on product work, design engineering, and the occasional performance rescue.",
  ],
  nowPlaying: [
    "Building a real-time collaboration layer with WebRTC",
    "Reading — Designing Data-Intensive Applications",
    "Learning Rust, slowly and badly",
  ],
} as const;

export const skills: SkillGroup[] = [
  {
    label: "Front of house",
    items: [
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "GSAP",
      "Framer Motion",
      "Three.js",
      "Vue",
    ],
  },
  {
    label: "Back of house",
    items: [
      "Node.js",
      "tRPC",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "GraphQL",
      "Python",
      "Go",
    ],
  },
  {
    label: "Everything else",
    items: [
      "Docker",
      "AWS",
      "Vercel",
      "CI/CD",
      "Playwright",
      "Vitest",
      "Figma",
      "Accessibility",
    ],
  },
];

export const projects: Project[] = [
  {
    slug: "helios",
    title: "Helios Analytics",
    blurb:
      "A real-time product analytics dashboard handling 40M events a day. Rebuilt the query layer around materialised rollups and cut p95 dashboard load from 4.1s to 380ms.",
    year: "2025",
    role: "Lead front-end",
    stack: ["Next.js", "TypeScript", "ClickHouse", "tRPC"],
    live: "#",
    repo: "#",
    featured: true,
  },
  {
    slug: "tidepool",
    title: "Tidepool",
    blurb:
      "Collaborative moodboarding for design teams — multiplayer canvas, CRDT sync, and an offline-first cache so the board never blocks on the network.",
    year: "2024",
    role: "Full-stack",
    stack: ["React", "Yjs", "WebRTC", "Postgres"],
    live: "#",
    repo: "#",
  },
  {
    slug: "northwind",
    title: "Northwind Commerce",
    blurb:
      "Headless storefront for a 12k-SKU retailer. Incremental static regeneration, edge-side personalisation, and a checkout that converts 23% better than the old one.",
    year: "2024",
    role: "Design engineer",
    stack: ["Next.js", "Shopify", "Edge Runtime"],
    live: "#",
  },
  {
    slug: "lumen",
    title: "Lumen UI",
    blurb:
      "An open-source component library of 48 accessible primitives, fully typed, themeable via CSS custom properties, and shipped with zero runtime CSS-in-JS.",
    year: "2023",
    role: "Maintainer",
    stack: ["React", "Radix", "Tailwind"],
    repo: "#",
  },
  {
    slug: "driftwood",
    title: "Driftwood",
    blurb:
      "A generative audio-reactive landing experience built with WebGL shaders and GSAP timelines. Runs at 60fps on a five-year-old laptop.",
    year: "2023",
    role: "Creative dev",
    stack: ["Three.js", "GLSL", "GSAP"],
    live: "#",
  },
  {
    slug: "atlas",
    title: "Atlas Docs",
    blurb:
      "Documentation platform with MDX authoring, instant search across 9k pages, and a versioned API reference generated straight from OpenAPI specs.",
    year: "2022",
    role: "Full-stack",
    stack: ["Next.js", "MDX", "Algolia"],
    live: "#",
    repo: "#",
  },
];

export const experience: Role[] = [
  {
    company: "Freelance",
    title: "Independent developer",
    period: "2023 — now",
    summary:
      "Product and design-engineering work for startups and studios, mostly in the Next.js / TypeScript world.",
    highlights: [
      "Shipped 14 production apps across fintech, commerce, and dev tooling",
      "Rescued three projects from render-blocking bundles above 1.4MB",
      "Run the front-end architecture review for two long-term clients",
    ],
  },
  {
    company: "Northbeam Studio",
    title: "Senior front-end engineer",
    period: "2021 — 2023",
    summary:
      "Led the front end on flagship client builds and set up the shared component system the whole studio now uses.",
    highlights: [
      "Built the design system consumed by 9 client projects",
      "Cut average Lighthouse TTI across the portfolio by 46%",
      "Mentored four juniors through their first production launches",
    ],
  },
  {
    company: "Kite & Co.",
    title: "Web developer",
    period: "2019 — 2021",
    summary:
      "Agency work — marketing sites, campaign microsites, and a lot of CMS plumbing on tight deadlines.",
    highlights: [
      "Delivered 25+ sites with a two-person front-end team",
      "Introduced automated visual regression testing",
      "Migrated the agency stack from jQuery to React",
    ],
  },
];

export const contact = {
  eyebrow: "Contact",
  heading: "Got something you want built?",
  lede: "I take on a small number of projects at a time. Tell me what you're making and I'll get back to you within a couple of days.",
  email: "hello@moonport.dev",
} as const;

export const socials = [
  { label: "GitHub", href: "https://github.com/awomoon" },
  { label: "X", href: "https://x.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Email", href: "mailto:hello@moonport.dev" },
] as const;

export const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Path", href: "#path" },
  { label: "Contact", href: "#contact" },
] as const;
