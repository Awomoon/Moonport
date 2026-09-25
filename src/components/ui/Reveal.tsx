"use client";

import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { gsap, registerGsap } from "@/lib/gsap";
import { prefersReducedMotion, settle } from "@/lib/motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Direction the element drifts in from. */
  from?: "up" | "down" | "left" | "right" | "scale";
  /** Seconds to wait once the trigger fires. */
  delay?: number;
  /** Stagger applied to direct children instead of the wrapper itself. */
  stagger?: number;
  /** Render as something other than a div. */
  as?: "div" | "section" | "li" | "article" | "header" | "footer" | "ul";
};

const OFFSETS = {
  up: { y: 42, x: 0 },
  down: { y: -42, x: 0 },
  left: { y: 0, x: 48 },
  right: { y: 0, x: -48 },
  scale: { y: 18, x: 0 },
} as const;

/**
 * Scroll-triggered entrance. Children start hidden via the `[data-anim]` CSS
 * rule (which only applies once JS is confirmed running), so there is no
 * flash of unstyled content and no permanently invisible text if JS fails.
 */
export function Reveal({
  children,
  className,
  from = "up",
  delay = 0,
  stagger,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    registerGsap();

    if (prefersReducedMotion()) {
      settle([el, ...Array.from(el.children)]);
      return;
    }

    // A sideways start offset sticks out past a narrow viewport before the
    // tween runs, which makes mobile browsers widen the layout viewport.
    // The layout is single-column below lg, so horizontal reveals drift up there
    // instead — at exactly 768px the old md check still let them overflow.
    const narrow = window.matchMedia("(width < 64rem)").matches;
    const direction =
      narrow && (from === "left" || from === "right") ? "up" : from;

    const ctx = gsap.context(() => {
      const targets = stagger ? Array.from(el.children) : el;
      const offset = OFFSETS[direction];

      gsap.set(el, { visibility: "visible" });

      gsap.from(targets, {
        autoAlpha: 0,
        y: offset.y,
        x: offset.x,
        scale: direction === "scale" ? 0.94 : 1,
        filter: "blur(14px)",
        duration: 1.1,
        delay,
        stagger: stagger ?? 0,
        ease: "liquid",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [from, delay, stagger]);

  return (
    <Tag
      // @ts-expect-error — one ref type across the small set of allowed tags
      ref={ref}
      data-anim=""
      className={className}
    >
      {children}
    </Tag>
  );
}
