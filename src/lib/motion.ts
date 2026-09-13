"use client";

import { gsap } from "gsap";

/** True when the visitor has asked the OS to reduce motion. */
export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Puts elements in their finished state without playing the entrance.
 * Used as the reduced-motion branch of every scroll reveal, so the content is
 * always readable even though nothing moves.
 */
export function settle(targets: gsap.TweenTarget) {
  gsap.set(targets, {
    visibility: "visible",
    autoAlpha: 1,
    clearProps: "transform,filter",
  });
}
