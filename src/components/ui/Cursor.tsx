"use client";

import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { gsap, registerGsap } from "@/lib/gsap";

/**
 * Two-part cursor: a crisp dot that tracks exactly, and a soft glass bubble
 * that lags behind and swells over interactive elements. Pointer-fine only.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const bubble = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    registerGsap();

    const dotEl = dot.current;
    const bubbleEl = bubble.current;
    if (!dotEl || !bubbleEl) return;

    gsap.set([dotEl, bubbleEl], { xPercent: -50, yPercent: -50, opacity: 0 });

    const dotX = gsap.quickTo(dotEl, "x", { duration: 0.15, ease: "power3" });
    const dotY = gsap.quickTo(dotEl, "y", { duration: 0.15, ease: "power3" });
    const bubbleX = gsap.quickTo(bubbleEl, "x", {
      duration: 0.75,
      ease: "liquid",
    });
    const bubbleY = gsap.quickTo(bubbleEl, "y", {
      duration: 0.75,
      ease: "liquid",
    });

    let revealed = false;

    const onMove = (event: PointerEvent) => {
      if (!revealed) {
        revealed = true;
        gsap.to([dotEl, bubbleEl], { opacity: 1, duration: 0.4 });
      }
      dotX(event.clientX);
      dotY(event.clientY);
      bubbleX(event.clientX);
      bubbleY(event.clientY);

      const interactive = (event.target as HTMLElement | null)?.closest(
        "a, button, input, textarea, [data-cursor-grow]",
      );

      gsap.to(bubbleEl, {
        scale: interactive ? 2.4 : 1,
        opacity: interactive ? 0.55 : 1,
        duration: 0.6,
        ease: "liquid",
        overwrite: "auto",
      });
    };

    const onLeave = () => gsap.to([dotEl, bubbleEl], { opacity: 0, duration: 0.3 });

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf([dotEl, bubbleEl]);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100] hidden [@media(pointer:fine)]:block"
    >
      <div
        ref={bubble}
        className="absolute top-0 left-0 size-9 rounded-full border border-white/25 bg-white/8 backdrop-blur-[2px] will-change-transform"
      />
      <div
        ref={dot}
        className="absolute top-0 left-0 size-1.5 rounded-full bg-aurora will-change-transform"
      />
    </div>
  );
}
