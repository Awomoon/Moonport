"use client";

import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { ScrollSmoother, ScrollTrigger, gsap, registerGsap } from "@/lib/gsap";

/**
 * Owns the global motion setup: plugin registration, the inertial scroll
 * wrapper, and the `js-ready` flag that lets CSS hide pre-animation elements
 * only when JavaScript is actually running.
 *
 * Anything `position: fixed` must live *outside* the smooth wrapper, so this
 * component renders only the scrolling half of the page.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    registerGsap();

    const root = document.documentElement;
    root.classList.add("js-ready");

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    // Inertial scrolling fights native momentum on touch devices, so it stays
    // on pointer-driven devices only.
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    const ctx = gsap.context(() => {
      if (reduced || !finePointer) return;

      ScrollSmoother.create({
        wrapper: wrapper.current,
        content: content.current,
        smooth: 1.15,
        effects: true,
        normalizeScroll: true,
        ignoreMobileResize: true,
      });
    }, wrapper);

    // Late-loading fonts and images shift layout; recalculate once settled.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh).catch(() => {});

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
      root.classList.remove("js-ready");
    };
  }, []);

  return (
    <div id="smooth-wrapper" ref={wrapper}>
      <div id="smooth-content" ref={content}>
        {children}
      </div>
    </div>
  );
}
