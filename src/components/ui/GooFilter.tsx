/**
 * SVG filter primitives referenced from CSS.
 * `#liquid-goo` is the metaball blend behind the background blobs.
 */
export function GooFilter() {
  return (
    <svg
      aria-hidden
      focusable="false"
      className="pointer-events-none absolute h-0 w-0"
    >
      <defs>
        <filter id="liquid-goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="42" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 13 -5.5"
            result="goo"
          />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </defs>
    </svg>
  );
}
