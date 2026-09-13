"use client";

import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { ScrollTrigger, gsap, registerGsap } from "@/lib/gsap";

/** Aurora hairline across the top of the viewport, scrubbed to page progress. */
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = bar.current;
    if (!el) return;

    registerGsap();

    const ctx = gsap.context(() => {
      gsap.set(el, { scaleX: 0, transformOrigin: "left center" });

      ScrollTrigger.create({
        start: 0,
        end: () => ScrollTrigger.maxScroll(window),
        onUpdate: (self) => gsap.set(el, { scaleX: self.progress }),
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[90] h-px bg-white/5"
    >
      <div
        ref={bar}
        className="h-full w-full bg-linear-90 from-aurora via-glow to-ember shadow-[0_0_12px_rgba(94,234,212,0.8)]"
      />
    </div>
  );
}
