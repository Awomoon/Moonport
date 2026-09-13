"use client";

import { useRef, useState } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { getSmoother, gsap, registerGsap } from "@/lib/gsap";

/**
 * Brief entry curtain: a counter runs to 100 while four glass panels slide
 * away. Scrolling is parked until it finishes so the hero animation is not
 * missed. Skipped entirely under reduced motion.
 */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    registerGsap();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      document.body.classList.remove("is-loading");
      return;
    }

    document.body.classList.add("is-loading");
    const smoother = getSmoother();
    smoother?.paused(true);

    const ctx = gsap.context(() => {
      const progress = { n: 0 };

      const tl = gsap.timeline({
        onComplete: () => {
          setDone(true);
          document.body.classList.remove("is-loading");
          smoother?.paused(false);
        },
      });

      tl.to(progress, {
        n: 100,
        duration: 1.25,
        ease: "swell",
        onUpdate: () => {
          if (count.current) {
            count.current.textContent = String(Math.round(progress.n)).padStart(
              3,
              "0",
            );
          }
        },
      })
        .to("[data-preloader-meta]", { autoAlpha: 0, duration: 0.35 }, "-=0.2")
        .to(
          "[data-curtain]",
          {
            yPercent: -100,
            duration: 1.05,
            stagger: 0.07,
            ease: "liquid",
          },
          "-=0.1",
        )
        .set(el, { display: "none" });
    }, el);

    return () => {
      ctx.revert();
      document.body.classList.remove("is-loading");
      smoother?.paused(false);
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={root}
      aria-hidden
      className="fixed inset-0 z-[200] flex items-end justify-between overflow-hidden"
    >
      <div className="absolute inset-0 flex">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            data-curtain
            className="h-full flex-1 border-r border-white/5 bg-abyss last:border-r-0"
          />
        ))}
      </div>

      <div
        data-preloader-meta
        className="relative z-10 flex w-full items-end justify-between px-6 pb-8 md:px-10 md:pb-10"
      >
        <span className="font-mono text-xs tracking-[0.28em] text-faint uppercase">
          Loading
        </span>
        <span
          ref={count}
          className="font-display text-[18vw] leading-[0.8] font-semibold text-mist/90 tabular-nums md:text-[9vw]"
        >
          000
        </span>
      </div>
    </div>
  );
}
