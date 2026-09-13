"use client";

import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { ScrollTrigger, gsap, registerGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

type CounterProps = {
  value: number;
  suffix?: string;
  className?: string;
};

/**
 * Counts up to `value` when it scrolls into view.
 *
 * The markup renders the real number, not a zero: the count-up only blanks it
 * at the moment it actually starts. So if the trigger never fires — the stat
 * sits just below the fold, JavaScript fails, motion is reduced — the visitor
 * still reads the true figure instead of a row of zeros.
 */
export function Counter({ value, suffix = "", className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    registerGsap();

    // The markup already shows the final value, so there is nothing to do.
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const counter = { n: 0 };

      // The count-up is a standalone tween kicked off by the trigger, NOT a
      // tween owned by it. A ScrollTrigger-owned tween gets rewound by
      // ScrollTrigger.refresh() (which ScrollSmoother triggers on load and on
      // fonts.ready), which could leave the label stuck on the 0 it was blanked
      // to and never replay, because the trigger is `once`.
      ScrollTrigger.create({
        trigger: el,
        start: "top 98%",
        once: true,
        onEnter: () => {
          el.textContent = `0${suffix}`;
          gsap.to(counter, {
            n: value,
            duration: 1.8,
            ease: "swell",
            snap: { n: 1 },
            onUpdate: () => {
              el.textContent = `${Math.round(counter.n)}${suffix}`;
            },
            // Land exactly on the real figure, whatever rounding did.
            onComplete: () => {
              el.textContent = `${value}${suffix}`;
            },
          });
        },
      });
    }, el);

    return () => {
      ctx.revert();
      // Reverting can leave the label mid-count; land it on the real number.
      el.textContent = `${value}${suffix}`;
    };
  }, [value, suffix]);

  return (
    <span ref={ref} className={className}>
      {`${value}${suffix}`}
    </span>
  );
}
