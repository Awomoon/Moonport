"use client";

import { useRef, type CSSProperties } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { gsap, registerGsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
  /** Degrees of 3D lean toward the pointer. 0 disables the tilt. */
  tilt?: number;
  as?: "div" | "article" | "li";
  /** Inline style — used to pass per-card `--rim-*` / `--spot-*` tints. */
  style?: CSSProperties;
};

/**
 * Frosted panel with a pointer-tracking specular highlight and optional 3D
 * tilt. The highlight is driven by CSS custom properties so it costs one
 * composited repaint rather than a React render per pointer move.
 */
export function GlassCard({
  children,
  className,
  tilt = 6,
  as: Tag = "div",
  style,
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;

    registerGsap();

    const rotX = gsap.quickTo(el, "rotateX", { duration: 0.7, ease: "liquid" });
    const rotY = gsap.quickTo(el, "rotateY", { duration: 0.7, ease: "liquid" });

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;

      el.style.setProperty("--spot-x", `${px * 100}%`);
      el.style.setProperty("--spot-y", `${py * 100}%`);

      if (tilt > 0) {
        rotX((0.5 - py) * tilt);
        rotY((px - 0.5) * tilt);
      }
    };

    const onLeave = () => {
      el.style.setProperty("--spot-opacity", "0");
      if (tilt > 0) {
        gsap.to(el, {
          rotateX: 0,
          rotateY: 0,
          duration: 1.1,
          ease: "elastic.out(1, 0.5)",
        });
      }
    };

    const onEnter = () => el.style.setProperty("--spot-opacity", "1");

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf(el);
    };
  }, [tilt]);

  return (
    <Tag
      // @ts-expect-error — one ref type across the small set of allowed tags
      ref={ref}
      style={style}
      className={cn(
        "glass glass-rim group relative isolate overflow-hidden rounded-3xl [transform-style:preserve-3d] [perspective:1200px]",
        className,
      )}
    >
      {/* Pointer spotlight: a broad tinted wash plus a tighter hot spot, so the
          surface reads as wet glass catching a light rather than a flat tint. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[var(--spot-opacity,0)] transition-opacity duration-500 [background:radial-gradient(460px_circle_at_var(--spot-x,50%)_var(--spot-y,50%),color-mix(in_oklab,var(--spot-tint,var(--color-plasma))_26%,transparent),transparent_62%),radial-gradient(140px_circle_at_var(--spot-x,50%)_var(--spot-y,50%),color-mix(in_oklab,var(--spot-hot,var(--color-aurora))_20%,transparent),transparent_70%)]"
      />
      {children}
    </Tag>
  );
}
