/**
 * Single source of truth for everything on the site.
 * Edit this file to change the portfolio — no component changes needed.
 *
 * Content here is drawn from the Awomoon GitHub profile README and the
 * repositories themselves, so blurbs describe what each project actually does.
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

/** A period of work. Deliberately not framed as employment. */
export type Chapter = {
  period: string;
  title: string;
  summary: string;
  highlights: string[];
};

export type SkillGroup = {
  label: string;
  items: string[];
};

export const site = {
  name: "Moontech",
  /** One name form, used everywhere on the site. */
  fullName: "Awoyemi Raphael",
  alias: "The Dev Pirate",
  handle: "@awomoon",
  title: "Moontech — Awoyemi Raphael, The Dev Pirate",
  description:
    "Awoyemi Raphael — Moontech, The Dev Pirate. Full-stack developer in Ibadan, Nigeria. Flutter, React and Node, with a habit of building things that keep working offline.",
  url: "https://awomoon.github.io/Moonport",
  locale: "en_NG",
  /** Home port. Real coordinates for Ibadan, used as chart annotation. */
  coordinates: "07°22'39\"N  003°56'49\"E",
  homePort: "Ibadan · Oyo State · Nigeria",
} as const;

export const hero = {
  eyebrow: "Open for freelance & collaboration",
  callsign: "Moontech — The Dev Pirate",
  // Rendered one line per array entry; the last line gets the aurora gradient.
  headline: ["Apps that work", "when the", "network won't"],
  lede: `I'm ${site.fullName} — a full-stack developer in Ibadan, Nigeria, building mobile and web products with Flutter, React and Firebase. Lately that means software for shops that can't count on the network.`,
  primaryCta: { label: "See the treasure", href: "#work" },
  secondaryCta: { label: "Send a message", href: "#contact" },
  stats: [
    { value: 1, suffix: "+", label: "Years at sea" },
    { value: 25, suffix: "+", label: "Public repositories" },
    { value: 5, suffix: "", label: "Languages in daily use" },
  ],
} as const;

/** The three floating glass panels beside the hero headline. */
export const heroPanels = {
  code: {
    filename: "main.dart",
    lines: [
      { text: "void main() => runApp(", tone: "accent", indent: false },
      { text: "const MoontechApp(),", tone: "muted", indent: true },
      { text: ");", tone: "accent", indent: false },
    ],
  },
  metric: {
    label: "Flagship · Shoka",
    value: "0",
    caption: "Backend servers",
  },
  note: {
    label: "Next destination",
    text: "Adding cloud backup, Paystack payments and barcode scanning to Shoka.",
  },
} as const;

export const about = {
  eyebrow: "Captain's log",
  heading: "Ibadan-based, Flutter-first, and stubborn about apps that survive a dead signal.",
  paragraphs: [
    `I'm ${site.fullName}, and I build cross-platform products under the name Moontech — Flutter and Dart on mobile, React and Next.js on the web, Node and Firebase behind both. Most of what I ship is aimed at people on cheap Android phones and unreliable connections, which turns offline-first from a nice-to-have into the actual design constraint.`,
    "That shows up in the work. Shoka, my point-of-sale app, has no server at all: every sale is a single SQLite transaction that rolls back rather than let stock go negative. I care about the same things on the web — clean, maintainable code, a user-first interface, and no spinner where a local read would do.",
  ],
  logLabel: "Current heading",
  nowPlaying: [
    "Deepening advanced Flutter patterns and Firebase architecture",
    "Adding cloud backup, Paystack and barcode scanning to Shoka",
    "Exploring AI/ML features inside mobile apps",
  ],
} as const;

export const skills: SkillGroup[] = [
  {
    label: "Mobile",
    items: ["Flutter", "Dart", "React Native", "Expo", "SQLite", "Android Studio"],
  },
  {
    label: "Web",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "HTML",
      "CSS",
    ],
  },
  {
    label: "Backend & data",
    items: [
      "Node.js",
      "Express",
      "Firebase",
      "Supabase",
      "MongoDB",
      "MySQL",
      "PHP",
      "Laravel",
    ],
  },
  {
    label: "Tooling",
    items: ["Git", "GitHub", "VS Code", "Postman", "Vite", "UI/UX design"],
  },
];

export const projects: Project[] = [
  {
    slug: "shoka",
    title: "Shoka",
    blurb:
      "An offline-first point-of-sale and inventory tracker for small Nigerian shops — record a sale in under five seconds while the customer waits. No account, no backend, no network: everything lives in SQLite on the device, and a sale writes its line items and stock decrements in one transaction that rolls back rather than let stock go negative.",
    year: "2026",
    role: "Solo build",
    stack: ["Expo", "React Native", "SQLite", "Reanimated"],
    live: "https://awomoon.github.io/shoka/",
    repo: "https://github.com/Awomoon/shoka",
    featured: true,
  },
  {
    slug: "moon-directory",
    title: "Moon Directory",
    blurb:
      "A directory where founders pitch startup ideas and the community votes them up. Built on the Next.js App Router with NextAuth for sessions and a Radix-based component layer.",
    year: "2025",
    role: "Full-stack",
    stack: ["Next.js", "NextAuth", "TypeScript", "Tailwind"],
    repo: "https://github.com/Awomoon/Moon-Pitch",
  },
  {
    slug: "moonconvert",
    title: "MoonConvert",
    blurb:
      "One upload box for every file type. An Express backend routes each job to the right engine — sharp for images, ffmpeg for audio and video, LibreOffice for documents — behind a React and Vite front end.",
    year: "2025",
    role: "Full-stack",
    stack: ["React", "Vite", "Express", "FFmpeg"],
    repo: "https://github.com/Awomoon/MoonConvert",
  },
  {
    slug: "notes-flutter",
    title: "Notes",
    blurb:
      "A Flutter notes app with local persistence through sqflite. Create, edit and delete notes that survive a restart, with the database layer kept behind a single module and no cloud dependency.",
    year: "2025",
    role: "Mobile",
    stack: ["Flutter", "Dart", "sqflite"],
    repo: "https://github.com/Awomoon/Note-app-Flutter-",
  },
  {
    slug: "node-blog",
    title: "Node Blog",
    blurb:
      "A server-rendered blog with full CRUD on Express and MongoDB — EJS templates, Mongoose models, and method-override so plain HTML forms can still issue PUT and DELETE.",
    year: "2025",
    role: "Backend",
    stack: ["Node.js", "Express", "MongoDB", "EJS"],
    repo: "https://github.com/Awomoon/Node_Blog",
  },
  {
    slug: "weather",
    title: "Weather",
    blurb:
      "A weather lookup built on the OpenWeatherMap API in plain JavaScript — no framework, no build step. Fetch, handle the error states properly, and keep the layout responsive.",
    year: "2025",
    role: "Front-end",
    stack: ["JavaScript", "REST API", "CSS"],
    repo: "https://github.com/Awomoon/WeatherProject",
  },
];

export const experience: Chapter[] = [
  {
    period: "Next",
    title: "Next destination",
    summary:
      "Where the route runs from here — taken from what is already on the workbench, not a wish list.",
    highlights: [
      "Cloud backup and multi-device sync for Shoka",
      "Paystack payments and barcode scanning aboard",
      "Deeper Flutter patterns and Firebase architecture",
    ],
  },
  {
    period: "2026",
    title: "Building for real users",
    summary:
      "Moved from practice projects to software meant to be used daily by people who are not developers.",
    highlights: [
      "Shipped Shoka, an offline-first POS and inventory tracker for small shops",
      "Designed a zero-backend architecture around SQLite in WAL mode",
      "Made soft deletes and denormalised sale history keep past receipts intact",
    ],
  },
  {
    period: "2025",
    title: "The full-stack year",
    summary:
      "Worked across the whole stack in one run — Next.js on the front, Express and MongoDB behind it, Flutter on mobile.",
    highlights: [
      "Built Moon Directory on the Next.js App Router with NextAuth sessions",
      "Wrote MoonConvert's conversion backend around sharp, ffmpeg and LibreOffice",
      "Shipped a Flutter notes app backed by local sqflite storage",
    ],
  },
  {
    period: "2024",
    title: "Foundations",
    summary:
      "Learned the server side first — authentication, templating and databases — before moving up to frameworks.",
    highlights: [
      "Built authentication from scratch with Node.js rather than a library",
      "Worked through PHP and Laravel alongside the JavaScript track",
      "Started publishing everything publicly on GitHub",
    ],
  },
];

/** Headings for each section, so all page copy lives in this file. */
export const sections = {
  work: {
    eyebrow: "Treasure log",
    title: "Everything I've hauled back so far.",
    lede: "Mostly solo builds — a point-of-sale app in daily-driver shape, a few full-stack experiments, and the projects I learned the back end on. All of it is public on GitHub.",
  },
  stack: {
    eyebrow: "Dev arsenal",
    title: "What I carry aboard.",
    lede: "Flutter first on mobile, React and Next.js on the web, Node and Firebase underneath. The list matters less than knowing when not to add to it.",
  },
  path: {
    eyebrow: "The voyage",
    title: "Self-taught, in public.",
    lede: "No bootcamp and no agency — just a couple of years of shipping, with every leg of the route visible in the commit history.",
  },
} as const;

export const contact = {
  eyebrow: "Contact",
  heading: "Got something you want built?",
  lede: "I take on freelance projects and collaborations. Tell me what you're making — email works, and WhatsApp is usually faster.",
  signOff: "Still sailing.",
  email: "raphaelasiwaju1@gmail.com",
  whatsapp: "+234 706 836 7213",
  whatsappHref: "https://wa.me/2347068367213",
  location: "Ibadan, Oyo State, Nigeria",
} as const;

export const socials = [
  { label: "GitHub", href: "https://github.com/Awomoon" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/awoyemi-raphael/" },
  { label: "X", href: "https://twitter.com/raphaelawoyemi" },
  { label: "WhatsApp", href: "https://wa.me/2347068367213" },
] as const;

export const navLinks = [
  { label: "Treasure", href: "#work" },
  { label: "Log", href: "#about" },
  { label: "Arsenal", href: "#stack" },
  { label: "Voyage", href: "#path" },
  { label: "Contact", href: "#contact" },
] as const;
