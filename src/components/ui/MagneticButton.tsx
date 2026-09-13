"use client";

import Link from "next/link";
import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { gsap, registerGsap, scrollToTarget } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  children: React.ReactNode;
  href: string;
  variant?: "solid" | "ghost";
  className?: string;
  /** How far the button leans toward the cursor, in px. */
  strength?: number;
};

/**
 * A glass pill that leans toward the pointer and settles back with elastic
 * easing. Falls back to a plain link when the pointer is coarse.
 */
export function MagneticButton({
  children,
  href,
  variant = "solid",
  className,
  strength = 22,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;

    registerGsap();

    const label = el.querySelector<HTMLElement>("[data-magnetic-label]");
    const moveTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "liquid" });
    const moveToY = gsap.quickTo(el, "y", { duration: 0.6, ease: "liquid" });

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = (event.clientX - (rect.left + rect.width / 2)) / rect.width;
      const dy = (event.clientY - (rect.top + rect.height / 2)) / rect.height;

      moveTo(dx * strength * 2);
      moveToY(dy * strength * 2);
      if (label) {
        gsap.to(label, {
          x: dx * strength,
          y: dy * strength,
          duration: 0.6,
          ease: "liquid",
        });
      }
    };

    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 1.1, ease: "elastic.out(1, 0.4)" });
      if (label) {
        gsap.to(label, {
          x: 0,
          y: 0,
          duration: 1.1,
          ease: "elastic.out(1, 0.4)",
        });
      }
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf([el, label]);
    };
  }, [strength]);

  const base =
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-medium tracking-tight transition-colors duration-500 glass-rim will-change-transform";

  const styles =
    variant === "solid"
      ? "text-void bg-linear-100 from-aurora via-glow to-plasma shadow-[0_18px_50px_-18px_rgba(94,234,212,0.75)] hover:shadow-[0_22px_60px_-16px_rgba(167,139,250,0.85)]"
      : "glass text-mist hover:text-white";

  const isAnchor = href.startsWith("#");

  return (
    <Link
      ref={ref}
      href={href}
      scroll={!isAnchor}
      onClick={
        isAnchor
          ? (event) => {
              event.preventDefault();
              scrollToTarget(href);
            }
          : undefined
      }
      className={cn(base, styles, className)}
    >
      <span
        data-magnetic-label
        className="relative z-10 inline-flex items-center gap-2"
      >
        {children}
      </span>
      {variant === "solid" ? (
        <span
          aria-hidden
          className="absolute inset-0 -translate-x-full bg-linear-100 from-transparent via-white/45 to-transparent transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-full"
        />
      ) : null}
    </Link>
  );
}
