import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-7 px-6 text-center">
      <span className="eyebrow">Error 404</span>
      <h1 className="font-display text-[clamp(3.5rem,14vw,9rem)] leading-none font-semibold tracking-tighter">
        <span className="text-treasure animate-sheen">Lost in orbit</span>
      </h1>
      <p className="max-w-sm text-sm leading-relaxed text-haze">
        That page drifted off somewhere. The work, however, is still right where
        you left it.
      </p>
      <Link
        href="/"
        className="glass glass-rim rounded-full px-7 py-3.5 text-sm font-medium transition-colors duration-500 hover:text-white"
      >
        Back to the surface
      </Link>
    </div>
  );
}
