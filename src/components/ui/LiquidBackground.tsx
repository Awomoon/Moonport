"use client";

import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { gsap, registerGsap } from "@/lib/gsap";

/** Blob recipe: size, tint, start position and how fast it wanders. */
const BLOBS = [
  { size: 46, color: "var(--color-plasma)", x: 18, y: 22, drift: 26, dur: 19 },
  { size: 38, color: "var(--color-aurora)", x: 74, y: 30, drift: 22, dur: 23 },
  { size: 30, color: "var(--color-glow)", x: 46, y: 68, drift: 30, dur: 17 },
  { size: 26, color: "var(--color-ember)", x: 84, y: 76, drift: 24, dur: 21 },
  { size: 20, color: "var(--color-plasma)", x: 8, y: 74, drift: 34, dur: 15 },
];

/**
 * The fixed backdrop: gooey metaball blobs behind a blur, plus film grain and
 * a vignette. Sits outside the smooth-scroll wrapper so it never translates.
 */
export function LiquidBackground() {
  const root = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    registerGsap();

    const ctx = gsap.context(() => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduced) return;

      const blobs = gsap.utils.toArray<HTMLElement>("[data-blob]");

      blobs.forEach((blob, i) => {
        const { drift, dur } = BLOBS[i];

        gsap.to(blob, {
          xPercent: gsap.utils.random(-drift, drift),
          yPercent: gsap.utils.random(-drift, drift),
          duration: dur,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          repeatRefresh: true,
        });

        gsap.to(blob, {
          scale: gsap.utils.random(0.82, 1.25),
          duration: dur * 0.6,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          repeatRefresh: true,
        });
      });

      // The whole field leans a little toward the pointer — parallax without
      // tying anything to scroll position.
      if (window.matchMedia("(pointer: fine)").matches) {
        const fieldX = gsap.quickTo("[data-blob-field]", "xPercent", {
          duration: 2.2,
          ease: "liquid",
        });
        const fieldY = gsap.quickTo("[data-blob-field]", "yPercent", {
          duration: 2.2,
          ease: "liquid",
        });

        const onMove = (event: PointerEvent) => {
          fieldX((event.clientX / window.innerWidth - 0.5) * 6);
          fieldY((event.clientY / window.innerHeight - 0.5) * 6);
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
      {/* Deep field wash */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_-10%,#151a33_0%,#080a14_45%,#04050a_100%)]" />

      {/* Gooey blobs */}
      <div
        data-blob-field
        className="goo absolute inset-[-25%] opacity-[0.42] blur-[52px]"
      >
        {BLOBS.map((blob, i) => (
          <span
            key={i}
            data-blob
            className="absolute rounded-full mix-blend-screen"
            style={{
              width: `${blob.size}vmax`,
              height: `${blob.size}vmax`,
              left: `${blob.x}%`,
              top: `${blob.y}%`,
              background: `radial-gradient(circle at 42% 38%, color-mix(in oklab, ${blob.color} 78%, transparent) 0%, transparent 58%)`,
            }}
          />
        ))}
      </div>

      {/* Faint engineering grid */}
      <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(to_right,rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.055)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(88%_70%_at_50%_35%,#000_0%,transparent_100%)]" />

      {/* Film grain */}
      <div className="absolute inset-0 opacity-[0.22] mix-blend-soft-light [background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22160%22 height=%22160%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.55%22/></svg>')]" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(100%_100%_at_50%_50%,transparent_35%,rgba(4,5,10,0.85)_100%)]" />
    </div>
  );
}
