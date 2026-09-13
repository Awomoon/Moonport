/** Tiny class-name joiner — no runtime dependency needed for this site. */
export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/** Clamp a number into a range. */
export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/** `01`, `02`, … for index labels. */
export function pad(n: number, width = 2) {
  return String(n).padStart(width, "0");
}
