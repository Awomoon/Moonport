"use client";

import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { SplitText, gsap, registerGsap } from "@/lib/gsap";
import { prefersReducedMotion, settle } from "@/lib/motion";
import { cn } from "@/lib/utils";

type SplitHeadingProps = {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  /** Play immediately (hero) instead of waiting for the scroll trigger. */
  immediate?: boolean;
  delay?: number;
};

/**
 * Masked per-line rise using GSAP SplitText. Lines are re-split on resize so
 * the mask never clips a re-wrapped line.
 */
export function SplitHeading({
  children,
  className,
  as: Tag = "h2",
  immediate = false,
  delay = 0,
}: SplitHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    registerGsap();

    if (prefersReducedMotion()) {
      settle(el);
      return;
    }

    let split: SplitText | null = null;

    const ctx = gsap.context(() => {
      gsap.set(el, { visibility: "visible" });

      split = SplitText.create(el, {
        type: "lines",
        mask: "lines",
        linesClass: "split-line",
        autoSplit: true,
        onSplit(self) {
          return gsap.from(self.lines, {
            yPercent: 118,
            opacity: 0,
            duration: 1.25,
            delay,
            stagger: 0.11,
            ease: "liquid",
            scrollTrigger: immediate
              ? undefined
              : { trigger: el, start: "top 86%", once: true },
          });
        },
      });
    }, el);

    return () => {
      split?.revert();
      ctx.revert();
    };
  }, [immediate, delay]);

  return (
    <Tag ref={ref} data-anim="" className={cn(className)}>
      {children}
    </Tag>
  );
}
