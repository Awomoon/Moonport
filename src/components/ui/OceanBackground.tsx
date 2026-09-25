"use client";

import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { gsap, registerGsap } from "@/lib/gsap";
import { CompassRose } from "@/components/ui/Emblem";

/** Slow currents under the surface. Kept dim — this is water at night. */
const CURRENTS = [
  { size: 52, color: "var(--color-sea)", x: 12, y: 18, drift: 20, dur: 26 },
  { size: 40, color: "var(--color-tide)", x: 78, y: 34, drift: 17, dur: 31 },
  { size: 30, color: "var(--color-sea)", x: 46, y: 74, drift: 24, dur: 22 },
  { size: 22, color: "var(--color-gold)", x: 86, y: 82, drift: 18, dur: 29 },
];

/**
 * The midnight ocean: a nautical chart grid over slow currents, with a moon
 * glow, a drifting compass rose and a dusting of stars.
 *
 * Fixed and outside the smooth-scroll wrapper so it never translates. Every
 * layer is low-opacity by design — nothing here may compete with body text.
 */
export function OceanBackground() {
  const root = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    registerGsap();

    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.utils.toArray<HTMLElement>("[data-current]").forEach((blob, i) => {
        const { drift, dur } = CURRENTS[i];

        gsap.to(blob, {
          xPercent: gsap.utils.random(-drift, drift),
          yPercent: gsap.utils.random(-drift, drift),
          duration: dur,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          repeatRefresh: true,
        });
      });

      // The swell: two wave bands sliding at different speeds.
      gsap.to("[data-wave='1']", {
        backgroundPositionX: "1200px",
        duration: 44,
        ease: "none",
        repeat: -1,
      });
      gsap.to("[data-wave='2']", {
        backgroundPositionX: "-900px",
        duration: 63,
        ease: "none",
        repeat: -1,
      });

      // The whole field leans toward the pointer — parallax with no scroll tie.
      if (window.matchMedia("(pointer: fine)").matches) {
        const fieldX = gsap.quickTo("[data-current-field]", "xPercent", {
          duration: 2.4,
          ease: "liquid",
        });
        const fieldY = gsap.quickTo("[data-current-field]", "yPercent", {
          duration: 2.4,
          ease: "liquid",
        });

        const onMove = (event: PointerEvent) => {
          fieldX((event.clientX / window.innerWidth - 0.5) * 5);
          fieldY((event.clientY / window.innerHeight - 0.5) * 5);
        };

        window.addEventListener("pointermove", onMove, { passive: true });
        return () => window.removeEventListener("pointermove", onMove);
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={root}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-void"
    >
      {/* Deep water, lit from above */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_85%_at_50%_-12%,#16202c_0%,#0d1219_46%,#0b0d10_100%)]" />

      {/* Currents under the surface */}
      <div
        data-current-field
        className="goo absolute inset-[-25%] opacity-[0.3] blur-[58px]"
      >
        {CURRENTS.map((c, i) => (
          <span
            key={i}
            data-current
            className="absolute rounded-full mix-blend-screen"
            style={{
              width: `${c.size}vmax`,
              height: `${c.size}vmax`,
              left: `${c.x}%`,
              top: `${c.y}%`,
              background: `radial-gradient(circle at 42% 38%, color-mix(in oklab, ${c.color} 70%, transparent) 0%, transparent 58%)`,
            }}
          />
        ))}
      </div>

      {/* Starfield */}
      <div className="absolute inset-0 opacity-[0.5] [background-image:radial-gradient(1px_1px_at_12%_18%,#fff,transparent),radial-gradient(1px_1px_at_68%_9%,#fff,transparent),radial-gradient(1px_1px_at_84%_28%,#fff,transparent),radial-gradient(1px_1px_at_32%_36%,#fff,transparent),radial-gradient(1.4px_1.4px_at_55%_22%,#fff,transparent),radial-gradient(1px_1px_at_22%_6%,#fff,transparent),radial-gradient(1px_1px_at_92%_14%,#fff,transparent)] [mask-image:linear-gradient(to_bottom,#000_0%,transparent_58%)]" />

      {/* Moonlight, upper right */}
      <div className="absolute inset-0 bg-[radial-gradient(38%_30%_at_84%_6%,rgba(231,218,187,0.16),transparent_70%)]" />

      {/* Nautical chart grid */}
      <div className="absolute inset-0 opacity-[0.2] [background-image:linear-gradient(to_right,rgba(154,167,182,0.16)_1px,transparent_1px),linear-gradient(to_bottom,rgba(154,167,182,0.16)_1px,transparent_1px)] [background-size:84px_84px] [mask-image:radial-gradient(92%_72%_at_50%_34%,#000_0%,transparent_100%)]" />

      {/* Finer sub-grid, the way a chart nests minutes inside degrees */}
      <div className="absolute inset-0 opacity-[0.1] [background-image:linear-gradient(to_right,rgba(154,167,182,0.14)_1px,transparent_1px),linear-gradient(to_bottom,rgba(154,167,182,0.14)_1px,transparent_1px)] [background-size:21px_21px] [mask-image:radial-gradient(60%_45%_at_50%_40%,#000_0%,transparent_100%)]" />

      {/* Drifting compass rose */}
      <CompassRose className="animate-compass absolute -right-24 top-[14%] hidden h-[34rem] w-[34rem] text-gold opacity-[0.07] lg:block" />

      {/* Two wave bands near the waterline */}
      <div
        data-wave="1"
        className="absolute inset-x-0 bottom-0 h-[42vh] opacity-[0.18] [background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22600%22 height=%22120%22><path d=%22M0 80 Q 75 50 150 80 T 300 80 T 450 80 T 600 80%22 fill=%22none%22 stroke=%22%232f8079%22 stroke-width=%221.4%22/></svg>')] [background-size:600px_120px]"
      />
      <div
        data-wave="2"
        className="absolute inset-x-0 bottom-0 h-[30vh] opacity-[0.13] [background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22800%22 height=%22140%22><path d=%22M0 100 Q 100 70 200 100 T 400 100 T 600 100 T 800 100%22 fill=%22none%22 stroke=%22%231e5375%22 stroke-width=%221.6%22/></svg>')] [background-size:800px_140px]"
      />

      {/* Film grain */}
      <div className="absolute inset-0 opacity-[0.2] mix-blend-soft-light [background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22160%22 height=%22160%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.55%22/></svg>')]" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(100%_100%_at_50%_50%,transparent_34%,rgba(11,13,16,0.9)_100%)]" />
    </div>
  );
}
