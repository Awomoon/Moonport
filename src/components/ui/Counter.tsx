"use client";

import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { gsap, registerGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

type CounterProps = {
  value: number;
  suffix?: string;
  className?: string;
};

/** Counts up to `value` when it scrolls into view. */
export function Counter({ value, suffix = "", className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    registerGsap();

    if (prefersReducedMotion()) {
      el.textContent = `${value}${suffix}`;
      return;
    }

    const ctx = gsap.context(() => {
      const counter = { n: 0 };

      gsap.to(counter, {
        n: value,
        duration: 1.8,
        ease: "swell",
        snap: { n: 1 },
        onUpdate: () => {
          el.textContent = `${Math.round(counter.n)}${suffix}`;
        },
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
      });
    }, el);

    return () => ctx.revert();
  }, [value, suffix]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
