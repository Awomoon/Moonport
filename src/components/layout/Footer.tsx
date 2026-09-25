import { contact, site, socials } from "@/content/site";
import { Emblem } from "@/components/ui/Emblem";
import { Marquee } from "@/components/ui/Marquee";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/8 pt-16">
      <Marquee speed={34} className="pb-10 opacity-[0.18]">
        {Array.from({ length: 4 }).map((_, i) => (
          <span
            key={i}
            className="font-display px-8 text-[12vw] leading-none font-semibold tracking-tighter whitespace-nowrap text-mist"
          >
            {site.name} —
          </span>
        ))}
      </Marquee>

      <div className="shell rope mb-10" />

      <div className="shell flex flex-col gap-8 pb-10 md:flex-row md:items-end md:justify-between">
        <div className="flex items-start gap-4">
          <Emblem className="mt-0.5 size-9 text-gold" />
          <div className="flex flex-col gap-1">
            <span className="font-display text-base font-semibold tracking-tight">
              {site.name}
            </span>
            <span className="font-mono text-[10px] tracking-[0.24em] text-gold uppercase">
              {site.alias}
            </span>
            <p className="mt-2 font-mono text-[11px] tracking-wider text-faint uppercase">
              {contact.signOff} · © {year} · Next.js, Tailwind &amp; GSAP
            </p>
          </div>
        </div>

        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="group relative text-sm text-haze transition-colors duration-300 hover:text-mist"
              >
                {social.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
