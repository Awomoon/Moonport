"use client";

import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { gsap, registerGsap, scrollToTarget } from "@/lib/gsap";
import { prefersReducedMotion, settle } from "@/lib/motion";
import { hero, site } from "@/content/site";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Counter } from "@/components/ui/Counter";
import { cn } from "@/lib/utils";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    registerGsap();

    if (prefersReducedMotion()) {
      settle(el.querySelectorAll("[data-hero], [data-hero-panel]"));
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set("[data-hero]", { visibility: "visible" });

      const tl = gsap.timeline({ delay: 1.5 });

      tl.from("[data-hero-eyebrow]", {
        autoAlpha: 0,
        y: 18,
        filter: "blur(10px)",
        duration: 0.9,
      })
        .from(
          "[data-hero-line] > span",
          {
            yPercent: 115,
            duration: 1.35,
            stagger: 0.1,
            ease: "liquid",
          },
          "-=0.5",
        )
        .from(
          "[data-hero-lede]",
          { autoAlpha: 0, y: 22, filter: "blur(8px)", duration: 1 },
          "-=0.85",
        )
        .from(
          "[data-hero-cta] > *",
          { autoAlpha: 0, y: 20, stagger: 0.1, duration: 0.8 },
          "-=0.7",
        )
        .from(
          "[data-hero-stat]",
          { autoAlpha: 0, y: 26, stagger: 0.09, duration: 0.85 },
          "-=0.6",
        )
        .from(
          "[data-hero-panel]",
          {
            autoAlpha: 0,
            scale: 0.9,
            y: 40,
            stagger: 0.12,
            duration: 1.2,
          },
          "-=1",
        )
        .from("[data-hero-cue]", { autoAlpha: 0, duration: 0.8 }, "-=0.6");

      // Idle float on the decorative panels.
      gsap.utils.toArray<HTMLElement>("[data-hero-panel]").forEach((panel, i) => {
        gsap.to(panel, {
          y: i % 2 === 0 ? -18 : 16,
          rotate: i % 2 === 0 ? 1.5 : -1.5,
          duration: 5 + i,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: 1.8 + i * 0.2,
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="top"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden pt-32 pb-20 md:pt-40"
    >
      <div className="shell grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Copy */}
        <div data-hero className="invisible flex flex-col gap-8">
          <span
            data-hero-eyebrow
            className="eyebrow w-fit rounded-full border border-white/10 bg-white/4 px-3.5 py-2 backdrop-blur-sm"
          >
            <span className="relative flex size-1.5">
              <span className="absolute inset-0 animate-[pulse-ring_2.4s_ease-out_infinite] rounded-full bg-aurora" />
              <span className="relative size-1.5 rounded-full bg-aurora" />
            </span>
            {hero.eyebrow}
          </span>

          <h1 className="font-display text-[clamp(2.75rem,8.2vw,6rem)] leading-[0.94] font-semibold tracking-[-0.045em]">
            {hero.headline.map((line, i) => (
              <span
                key={line}
                data-hero-line
                className="block overflow-hidden pb-[0.08em]"
              >
                <span
                  className={cn(
                    "block",
                    i === hero.headline.length - 1 &&
                      "text-aurora animate-aurora",
                  )}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p
            data-hero-lede
            className="max-w-lg text-base leading-relaxed text-haze sm:text-lg"
          >
            {hero.lede}
          </p>

          <div data-hero-cta className="flex flex-wrap items-center gap-3">
            <MagneticButton href={hero.primaryCta.href}>
              {hero.primaryCta.label}
              <svg
                viewBox="0 0 16 16"
                className="size-3.5 transition-transform duration-500 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                aria-hidden
              >
                <path d="M2 8h12M9 3l5 5-5 5" strokeLinecap="round" />
              </svg>
            </MagneticButton>

            <MagneticButton href={hero.secondaryCta.href} variant="ghost">
              {hero.secondaryCta.label}
            </MagneticButton>
          </div>

          <dl className="mt-2 grid max-w-lg grid-cols-3 gap-4 border-t border-white/8 pt-7">
            {hero.stats.map((stat) => (
              <div key={stat.label} data-hero-stat className="flex flex-col gap-1">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-3xl font-semibold tracking-tight text-mist tabular-nums sm:text-4xl">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </dd>
                <span className="text-xs leading-snug tracking-wide text-faint">
                  {stat.label}
                </span>
              </div>
            ))}
          </dl>
        </div>

        {/* Decorative glass stack */}
        <div
          aria-hidden
          className="relative hidden h-[32rem] lg:block"
          data-speed="0.88"
        >
          <div
            data-hero-panel
            className="glass absolute top-4 right-6 w-64 rounded-3xl p-5"
          >
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-ember/80" />
              <span className="size-2 rounded-full bg-glow/80" />
              <span className="size-2 rounded-full bg-aurora/80" />
              <span className="ml-auto font-mono text-[10px] tracking-widest text-faint">
                SHIP.TSX
              </span>
            </div>
            <div className="mt-4 space-y-2 font-mono text-[11px] leading-relaxed">
              <p className="text-plasma">export default function Ship() {`{`}</p>
              <p className="pl-4 text-haze">
                return <span className="text-aurora">&lt;Fast /&gt;</span>;
              </p>
              <p className="text-plasma">{`}`}</p>
            </div>
          </div>

          <div
            data-hero-panel
            className="glass absolute top-44 left-0 w-56 rounded-3xl p-5"
          >
            <p className="eyebrow">Lighthouse</p>
            <div className="mt-4 flex items-end gap-3">
              <span className="font-display text-5xl leading-none font-semibold text-aurora">
                100
              </span>
              <span className="pb-1 text-xs text-faint">Performance</span>
            </div>
            <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-white/8">
              <div className="h-full w-full rounded-full bg-linear-90 from-aurora to-glow" />
            </div>
          </div>

          <div
            data-hero-panel
            className="glass absolute right-0 bottom-6 w-60 rounded-3xl p-5"
          >
            <p className="eyebrow">Currently</p>
            <p className="mt-3 text-sm leading-relaxed text-mist">
              Building a real-time collaboration layer — CRDTs, presence, and
              zero perceived latency.
            </p>
          </div>

          <div className="absolute inset-0 -z-10 rounded-[3rem] bg-[radial-gradient(70%_60%_at_60%_40%,rgba(167,139,250,0.22),transparent_70%)] blur-2xl" />
        </div>
      </div>

      {/* Scroll cue */}
      <button
        type="button"
        data-hero-cue
        onClick={() => scrollToTarget("#work")}
        className="shell invisible mt-16 flex items-center gap-3 text-left md:mt-20"
        data-hero
      >
        <span className="relative flex h-12 w-7 items-start justify-center rounded-full border border-white/15 pt-2">
          <span className="size-1 animate-bounce rounded-full bg-aurora" />
        </span>
        <span className="font-mono text-[11px] tracking-[0.24em] text-faint uppercase">
          Scroll to explore {site.handle}
        </span>
      </button>
    </section>
  );
}
