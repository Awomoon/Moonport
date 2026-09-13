# Moonport

A personal portfolio built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**
and **GSAP** — dark, glassy, and animated end to end.

---

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # eslint
```

## Make it yours

Everything you'd want to change lives in **`src/content/site.ts`** — name, headline, stats,
projects, experience, skills, socials and contact details. No component edits required.

```ts
export const site = { name: "Moonport", url: "https://moonport.dev", ... };
export const projects: Project[] = [ ... ];
```

Project images are optional. Drop a file in `public/` and set `image: "/work/helios.png"` on
the project — without one, the card falls back to a generated gradient cover with a large
index number.

### Theming

Design tokens are Tailwind v4 `@theme` variables at the top of `src/app/globals.css`:

| Token | Role |
| --- | --- |
| `--color-void` / `--color-abyss` / `--color-ink` | Surfaces, darkest first |
| `--color-mist` / `--color-haze` / `--color-faint` | Text, brightest first |
| `--color-aurora` / `--color-glow` / `--color-plasma` / `--color-ember` | Accent ramp |

Changing those four accents re-tints the whole site: the background blobs, gradient text,
scroll bar, card rims and the generated social card all read from them.

Custom utilities defined in the same file:

- `glass` / `glass-solid` — frosted panel surfaces
- `glass-rim` — conic gradient border that fades in on hover
- `text-aurora` — gradient text fill
- `shell` — page gutter, `band` — section rhythm, `eyebrow` — small label
- `goo` — the SVG metaball filter used by the background
- `edge-fade` — horizontal mask for marquees

## Layout

```
src/
  app/                     layout, page, 404, icon, generated OG image
  content/site.ts          ← all copy and data
  components/
    providers/             MotionProvider — GSAP registration + smooth scroll
    layout/                Navbar, Footer
    sections/              Hero, Projects, About, Skills, Experience, Contact
    ui/                    GlassCard, Reveal, SplitHeading, MagneticButton,
                           Marquee, Counter, Cursor, Preloader, LiquidBackground…
  lib/gsap.ts              plugin registration + scroll helpers
  lib/motion.ts            reduced-motion helpers
  hooks/                   useIsomorphicLayoutEffect
```

## How the animation is wired

- **`MotionProvider`** registers every GSAP plugin once, adds `js-ready` to `<html>`, and
  creates a `ScrollSmoother` instance. Anything `position: fixed` (nav, cursor, background,
  progress bar) is rendered *outside* `#smooth-wrapper`, which is what ScrollSmoother requires.
- Every animating component runs inside a **`gsap.context()`** and reverts on unmount, so
  React Fast Refresh and route changes don't leave orphaned tweens or ScrollTriggers.
- Elements that start hidden are marked `data-anim`. The rule that hides them is scoped to
  `.js-ready`, so **if JavaScript fails the content is still visible** — no blank page.
- `data-speed` attributes on decorative elements are ScrollSmoother parallax effects.

### Reduced motion

`prefers-reduced-motion: reduce` is respected properly, not cosmetically. Entrance
animations, the preloader, the custom cursor, the marquees, the background drift and the
auto-hiding nav are all skipped, and content is placed directly in its final state
(`settle()` in `src/lib/motion.ts`).

## Notes

- GSAP 3.15 ships every plugin free, including `SplitText` and `ScrollSmoother` — both are
  used here and need no licence key.
- Inertial scrolling is enabled only on fine-pointer devices; touch keeps native momentum.
- `overflow-x: clip` is set on **both** `html` and `body` on purpose: on `body` alone it
  propagates to the viewport, which lets mobile browsers widen the layout viewport instead
  of clipping.
