"use client";

import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { ScrollTrigger, gsap, registerGsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type MarqueeProps = {
  children: React.ReactNode;
  /** Seconds for one full pass. */
  speed?: number;
  reverse?: boolean;
  className?: string;
};

/**
 * Seamless horizontal ticker. The track is duplicated and translated -50%,
 * and scroll velocity nudges the playback rate so the row "sloshes" as you
 * move through the page.
 */
export function Marquee({
  children,
  speed = 26,
  reverse = false,
  className,
}: MarqueeProps) {
  const root = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    registerGsap();

    const ctx = gsap.context(() => {
      const track = el.querySelector<HTMLElement>("[data-marquee-track]");
      if (!track) return;

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduced) return;

      const tween = gsap.to(track, {
        xPercent: reverse ? 50 : -50,
        duration: speed,
        ease: "none",
        repeat: -1,
      });

      if (reverse) gsap.set(track, { xPercent: -50 });

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 1600, 2.6);
          gsap.to(tween, {
            timeScale: boost,
            duration: 0.5,
            overwrite: true,
          });
        },
        onLeave: () => gsap.to(tween, { timeScale: 1, duration: 0.6 }),
      });

      return () => {
        trigger.kill();
        tween.kill();
      };
    }, el);

    return () => ctx.revert();
  }, [speed, reverse]);

  return (
    <div ref={root} className={cn("edge-fade overflow-hidden", className)}>
      <div data-marquee-track className="flex w-max will-change-transform">
        <div className="flex shrink-0 items-center">{children}</div>
        <div aria-hidden className="flex shrink-0 items-center">
          {children}
        </div>
      </div>
    </div>
  );
}
