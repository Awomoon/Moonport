"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";

let registered = false;

/**
 * Registers every plugin the site uses, exactly once, on the client.
 * Safe to call from any component — repeat calls are no-ops.
 */
export function registerGsap() {
  if (typeof window === "undefined" || registered) return gsap;
  registered = true;

  gsap.registerPlugin(
    ScrollTrigger,
    ScrollSmoother,
    ScrollToPlugin,
    CustomEase,
    SplitText,
  );

  // Shared easing curves, so every section moves like one system.
  CustomEase.create("liquid", "0.22, 1, 0.36, 1");
  CustomEase.create("swell", "0.65, 0, 0.35, 1");

  gsap.defaults({ ease: "liquid", duration: 1 });

  return gsap;
}

/** The smoother instance, when one is running. */
export function getSmoother() {
  return typeof window === "undefined" ? null : ScrollSmoother.get() ?? null;
}

/** Scrolls to a selector, going through the smoother when it exists. */
export function scrollToTarget(target: string, offset = -88) {
  const smoother = getSmoother();
  if (smoother) {
    smoother.scrollTo(target, true, `top ${offset}px`);
    return;
  }

  const el = document.querySelector(target);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: "smooth" });
}

export {
  gsap,
  ScrollTrigger,
  ScrollSmoother,
  ScrollToPlugin,
  CustomEase,
  SplitText,
};
