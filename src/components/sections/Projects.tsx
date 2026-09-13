"use client";

import Image from "next/image";
import { useRef, type CSSProperties } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { gsap, registerGsap } from "@/lib/gsap";
import { prefersReducedMotion, settle } from "@/lib/motion";
import { projects, sections, type Project } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { cn, pad } from "@/lib/utils";

/**
 * Card covers. Two accent tokens per card bloom from opposite corners over a
 * dark base, which keeps every cover in the same family while staying
 * distinct — a single linear ramp to transparent just washed out to grey.
 */
const COVER_PAIRS: ReadonlyArray<readonly [string, string]> = [
  ["--color-aurora", "--color-glow"],
  ["--color-plasma", "--color-ember"],
  ["--color-glow", "--color-plasma"],
  ["--color-ember", "--color-aurora"],
  ["--color-aurora", "--color-plasma"],
  ["--color-glow", "--color-ember"],
];

function coverStyle(index: number): CSSProperties {
  const [warm, cool] = COVER_PAIRS[index % COVER_PAIRS.length];
  // Shift the bloom origins per card so a repeated pair never reads identical.
  const drift = (index % 3) * 11;
  const tint = (token: string, pct: number) =>
    `color-mix(in oklab, var(${token}) ${pct}%, transparent)`;

  return {
    backgroundImage: [
      // Main bloom, top-left.
      `radial-gradient(92% 132% at ${13 + drift}% -8%, ${tint(warm, 66)}, transparent 58%)`,
      // Counter bloom, upper-right.
      `radial-gradient(78% 108% at ${89 - drift}% 16%, ${tint(cool, 52)}, transparent 60%)`,
      // Faint lift from below so the bottom edge doesn't go flat.
      `radial-gradient(128% 86% at 50% 116%, ${tint(warm, 28)}, transparent 66%)`,
      // Glass sheen over a dark floor.
      "linear-gradient(168deg, rgba(255,255,255,0.08), rgba(4,5,10,0.62))",
    ].join(", "),
  };
}

/** Ties the hover ring and pointer spotlight to this card's cover colours. */
function accentStyle(index: number): CSSProperties {
  const [warm, cool] = COVER_PAIRS[index % COVER_PAIRS.length];
  return {
    "--rim-a": `var(${warm})`,
    "--rim-b": `var(${cool})`,
    "--spot-tint": `var(${cool})`,
    "--spot-hot": `var(${warm})`,
  } as CSSProperties;
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const featured = Boolean(project.featured);

  return (
    <GlassCard
      as="li"
      tilt={featured ? 4 : 7}
      style={accentStyle(index)}
      className={cn(
        "flex flex-col",
        featured ? "lg:col-span-2" : "lg:col-span-1",
      )}
    >
      {/* Cover */}
      <div
        className={cn(
          "relative overflow-hidden border-b border-white/8",
          featured ? "h-52 md:h-64" : "h-40",
        )}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
          />
        ) : (
          <>
            <div
              style={coverStyle(index)}
              className="absolute inset-0 transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
            />
            <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:36px_36px]" />
            <span className="font-display absolute -bottom-6 left-5 text-[7rem] leading-none font-semibold text-white/12 select-none">
              {pad(index + 1)}
            </span>
          </>
        )}

        {/* Sheen sweep on hover */}
        <span
          aria-hidden
          className="absolute inset-0 -translate-x-full bg-linear-100 from-transparent via-white/12 to-transparent transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-full"
        />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-4 p-6 md:p-7">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-xl font-semibold tracking-tight md:text-2xl">
            {project.title}
          </h3>
          <span className="font-mono text-[11px] tracking-widest text-faint">
            {project.year}
          </span>
        </div>

        <p className="text-sm leading-relaxed text-haze">{project.blurb}</p>

        <ul className="mt-auto flex flex-wrap gap-2 pt-2">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-white/10 bg-white/4 px-3 py-1 font-mono text-[10px] tracking-wider text-haze uppercase"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-5 border-t border-white/8 pt-4">
          <span className="font-mono text-[11px] tracking-wider text-faint uppercase">
            {project.role}
          </span>

          <div className="ml-auto flex items-center gap-4">
            {project.live ? (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="group/link inline-flex items-center gap-1.5 text-sm text-mist transition-colors hover:text-aurora"
              >
                Live
                <svg
                  viewBox="0 0 16 16"
                  className="size-3 transition-transform duration-400 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  aria-hidden
                >
                  <path d="M4 12L12 4M6 4h6v6" strokeLinecap="round" />
                </svg>
              </a>
            ) : null}

            {project.repo ? (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-haze transition-colors hover:text-mist"
              >
                Code
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

export function Projects() {
  const root = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    registerGsap();

    if (prefersReducedMotion()) {
      settle(el.querySelectorAll("[data-project-grid] > li"));
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set("[data-project-grid] > li", { visibility: "visible" });

      gsap.from("[data-project-grid] > li", {
        autoAlpha: 0,
        y: 64,
        filter: "blur(16px)",
        duration: 1.15,
        stagger: 0.12,
        scrollTrigger: {
          trigger: "[data-project-grid]",
          start: "top 82%",
          once: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="work" className="band">
      <div className="shell">
        <SectionHeading
          eyebrow={sections.work.eyebrow}
          title={sections.work.title}
          lede={sections.work.lede}
        />

        <ul
          data-project-grid
          className="mt-14 grid gap-5 md:mt-20 lg:grid-cols-2"
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
