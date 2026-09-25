"use client";

import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { gsap, registerGsap, scrollToTarget } from "@/lib/gsap";
import { prefersReducedMotion, settle } from "@/lib/motion";
import { hero, heroPanels, site } from "@/content/site";
import { Emblem } from "@/components/ui/Emblem";
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
      className="relative flex min-h-svh flex-col justify-center overflow-hidden pt-28 pb-14 md:pt-32"
    >
      <div className="shell grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Copy */}
        <div data-hero className="invisible flex flex-col gap-6">
          <div data-hero-eyebrow className="flex flex-col gap-4">
            {/* Callsign — the ship's name board */}
            <div className="flex items-center gap-3">
              <Emblem ring={false} className="size-5 text-gold" />
              <span className="font-mono text-[11px] tracking-[0.3em] text-gold uppercase">
                {hero.callsign}
              </span>
            </div>

            <span className="eyebrow w-fit rounded-full border border-gold/20 bg-gold/5 px-3.5 py-2 backdrop-blur-sm">
              <span className="relative flex size-1.5">
                <span className="absolute inset-0 animate-[pulse-ring_2.4s_ease-out_infinite] rounded-full bg-tide" />
                <span className="relative size-1.5 rounded-full bg-tide" />
              </span>
              {hero.eyebrow}
            </span>
          </div>

          <h1 className="font-display text-[clamp(2.5rem,min(7vw,8.6vh),5rem)] leading-[0.96] font-semibold tracking-[-0.045em]">
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
                      "text-treasure animate-sheen",
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

          <div data-hero-cta className="flex items-center gap-3">
            <span className="coord">{site.coordinates}</span>
            <span className="h-px flex-1 bg-linear-90 from-gold/35 to-transparent" />
          </div>

          <dl className="grid max-w-lg grid-cols-3 gap-4 border-t border-white/8 pt-6">
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

        {/* Decorative deck stack */}
        <div
          aria-hidden
          className="relative hidden h-[32rem] lg:block"
          data-speed="0.88"
        >
          <div
            data-hero-panel
            className="deck absolute top-4 right-6 w-64 rounded-3xl p-5"
          >
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-signal/80" />
              <span className="size-2 rounded-full bg-tide/80" />
              <span className="size-2 rounded-full bg-gold/80" />
              <span className="ml-auto font-mono text-[10px] tracking-widest text-faint uppercase">
                {heroPanels.code.filename}
              </span>
            </div>
            <div className="mt-4 space-y-2 font-mono text-[11px] leading-relaxed">
              {heroPanels.code.lines.map((line) => (
                <p
                  key={line.text}
                  className={cn(
                    line.tone === "accent" ? "text-sea" : "text-gold",
                    line.indent && "pl-4",
                  )}
                >
                  {line.text}
                </p>
              ))}
            </div>
          </div>

          <div
            data-hero-panel
            className="deck absolute top-44 left-0 w-56 rounded-3xl p-5"
          >
            <p className="eyebrow">{heroPanels.metric.label}</p>
            <div className="mt-4 flex items-end gap-3">
              <span className="font-display text-5xl leading-none font-semibold text-gold">
                {heroPanels.metric.value}
              </span>
              <span className="pb-1 text-xs text-faint">
                {heroPanels.metric.caption}
              </span>
            </div>
            <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-white/8">
              <div className="h-full w-full rounded-full bg-linear-90 from-gold to-tide" />
            </div>
          </div>

          <div
            data-hero-panel
            className="deck absolute right-0 bottom-6 w-60 rounded-3xl p-5"
          >
            <p className="eyebrow">{heroPanels.note.label}</p>
            <p className="mt-3 text-sm leading-relaxed text-mist">
              {heroPanels.note.text}
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
        className="shell invisible mt-10 flex items-center gap-3 text-left md:mt-14"
        data-hero
      >
        <span className="relative flex h-12 w-7 items-start justify-center rounded-full border border-white/15 pt-2">
          <span className="size-1 animate-bounce rounded-full bg-gold" />
        </span>
        <span className="font-mono text-[11px] tracking-[0.24em] text-faint uppercase">
          Set course — {site.homePort}
        </span>
      </button>
    </section>
  );
}
