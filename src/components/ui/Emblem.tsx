"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

type EmblemProps = {
  className?: string;
  /** Draws the compass ring and cardinal ticks. Off for small marks. */
  ring?: boolean;
  title?: string;
};

/**
 * The Moontech mark: a crescent moon held inside a compass ring, flanked by
 * code brackets. Drawn from scratch — no borrowed insignia.
 *
 * The crescent is a masked circle rather than an arc path, which keeps the
 * inner curve predictable at every size.
 */
export function Emblem({ className, ring = true, title }: EmblemProps) {
  const id = useId();
  const moonMask = `${id}-moon`;

  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={cn("shrink-0", className)}
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <defs>
        <mask id={moonMask}>
          <rect width="48" height="48" fill="#000" />
          <circle cx="23" cy="24" r="10.5" fill="#fff" />
          <circle cx="29.5" cy="20.5" r="9.4" fill="#000" />
        </mask>
      </defs>

      {ring ? (
        <>
          {/* Compass ring */}
          <circle
            cx="24"
            cy="24"
            r="21"
            stroke="currentColor"
            strokeWidth="1.4"
            opacity="0.3"
          />
          {/* Cardinal ticks — N is longest, the way a rose is drawn */}
          <path
            d="M24 1.6v5.2M24 41.2v5.2M1.6 24h4.2M42.2 24h4.2"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity="0.55"
          />
        </>
      ) : null}

      {/* Crescent */}
      <circle
        cx="23"
        cy="24"
        r="10.5"
        fill="currentColor"
        mask={`url(#${moonMask})`}
      />

      {/* Code brackets, closing around the moon like a ship's hull */}
      <path
        d="M14.5 17.5 8.8 24l5.7 6.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M33.5 17.5 39.2 24l-5.7 6.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Compass rose used as a large, slow-drifting decoration. */
export function CompassRose({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden
      className={cn("shrink-0", className)}
    >
      <circle cx="100" cy="100" r="96" stroke="currentColor" strokeWidth="0.75" />
      <circle cx="100" cy="100" r="74" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="100" cy="100" r="38" stroke="currentColor" strokeWidth="0.5" />

      {/* Degree ticks every 15° */}
      {Array.from({ length: 24 }).map((_, i) => (
        <line
          key={i}
          x1="100"
          y1="4"
          x2="100"
          y2={i % 6 === 0 ? 22 : 13}
          stroke="currentColor"
          strokeWidth={i % 6 === 0 ? 1.2 : 0.6}
          transform={`rotate(${i * 15} 100 100)`}
        />
      ))}

      {/* Four-point star */}
      <path
        d="M100 26 108 92 174 100 108 108 100 174 92 108 26 100 92 92Z"
        stroke="currentColor"
        strokeWidth="0.9"
      />
    </svg>
  );
}
