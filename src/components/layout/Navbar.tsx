"use client";

import { useRef, useState } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { ScrollTrigger, gsap, registerGsap, scrollToTarget } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { contact, navLinks, site } from "@/content/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const bar = useRef<HTMLElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string>(navLinks[0].href);
  const [open, setOpen] = useState(false);

  /* Condense on scroll, hide going down, reveal going up, and track the
     section currently under the fold. */
  useIsomorphicLayoutEffect(() => {
    const el = bar.current;
    if (!el) return;

    registerGsap();

    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      const shell = el.querySelector<HTMLElement>("[data-nav-shell]");

      ScrollTrigger.create({
        start: 80,
        end: 99999,
        onUpdate: (self) => {
          // Auto-hiding the bar is motion for its own sake; keep it pinned
          // when motion is reduced.
          if (reduced) return;

          gsap.to(el, {
            yPercent: self.direction === 1 && self.scroll() > 320 ? -160 : 0,
            duration: 0.55,
            overwrite: true,
          });
        },
        onToggle: (self) => {
          if (!shell) return;
          gsap.to(shell, {
            paddingTop: self.isActive ? 10 : 16,
            paddingBottom: self.isActive ? 10 : 16,
            duration: reduced ? 0 : 0.5,
            overwrite: true,
          });
          shell.classList.toggle("glass-solid", self.isActive);
          shell.classList.toggle("glass", !self.isActive);
        },
      });

      navLinks.forEach(({ href }) => {
        const section = document.querySelector(href);
        if (!section) return;

        ScrollTrigger.create({
          trigger: section,
          start: "top 45%",
          end: "bottom 45%",
          onToggle: (self) => self.isActive && setActive(href),
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  /* Mobile sheet */
  useIsomorphicLayoutEffect(() => {
    const el = menu.current;
    if (!el) return;

    registerGsap();

    if (prefersReducedMotion()) {
      gsap.set(el, {
        display: open ? "flex" : "none",
        clipPath: open ? "circle(140% at 92% 6%)" : "circle(0% at 92% 6%)",
        autoAlpha: 1,
      });
      document.body.style.overflow = open ? "hidden" : "";
      return;
    }

    const ctx = gsap.context(() => {
      if (open) {
        gsap.set(el, { display: "flex" });
        gsap
          .timeline()
          .fromTo(
            el,
            { clipPath: "circle(0% at 92% 6%)" },
            { clipPath: "circle(140% at 92% 6%)", duration: 0.85 },
          )
          .from(
            "[data-menu-item]",
            { y: 34, autoAlpha: 0, stagger: 0.06, duration: 0.6 },
            "-=0.45",
          );
      } else {
        gsap.to(el, {
          clipPath: "circle(0% at 92% 6%)",
          duration: 0.5,
          onComplete: () => gsap.set(el, { display: "none" }),
        });
      }
    }, el);

    document.body.style.overflow = open ? "hidden" : "";
    return () => ctx.revert();
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    setActive(href);
    // Let the sheet start closing before the scroll kicks in.
    window.setTimeout(() => scrollToTarget(href), open ? 220 : 0);
  };

  return (
    <>
      <header
        ref={bar}
        className="fixed inset-x-0 top-0 z-[95] will-change-transform"
      >
        <div className="shell pt-3 md:pt-5">
          <div
            data-nav-shell
            className="glass flex items-center justify-between gap-4 rounded-full py-4 pr-2 pl-5 md:pl-6"
          >
            <button
              type="button"
              onClick={() => go("#top")}
              className="group flex items-center gap-2.5 text-sm font-medium tracking-tight"
            >
              <span className="relative flex size-2.5">
                <span className="absolute inset-0 animate-[pulse-ring_2.4s_ease-out_infinite] rounded-full bg-aurora" />
                <span className="relative size-2.5 rounded-full bg-aurora" />
              </span>
              <span className="transition-colors duration-300 group-hover:text-white">
                {site.name}
              </span>
            </button>

            <nav className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => go(link.href)}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm transition-colors duration-300",
                    active === link.href
                      ? "text-white"
                      : "text-haze hover:text-mist",
                  )}
                >
                  {active === link.href ? (
                    <span className="absolute inset-0 rounded-full bg-white/8 ring-1 ring-white/10 ring-inset" />
                  ) : null}
                  <span className="relative">{link.label}</span>
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => go("#contact")}
                className="hidden rounded-full bg-linear-100 from-aurora to-plasma px-5 py-2.5 text-sm font-medium text-void transition-transform duration-500 hover:scale-[1.04] md:inline-flex"
              >
                Let&rsquo;s talk
              </button>

              <button
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className="grid size-11 place-items-center rounded-full border border-white/10 bg-white/5 md:hidden"
              >
                <span className="relative flex h-3 w-4 flex-col justify-between">
                  <span
                    className={cn(
                      "h-px w-full bg-mist transition-transform duration-300",
                      open && "translate-y-[5.5px] rotate-45",
                    )}
                  />
                  <span
                    className={cn(
                      "h-px w-full bg-mist transition-opacity duration-300",
                      open && "opacity-0",
                    )}
                  />
                  <span
                    className={cn(
                      "h-px w-full bg-mist transition-transform duration-300",
                      open && "-translate-y-[5.5px] -rotate-45",
                    )}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        ref={menu}
        className="fixed inset-0 z-[94] hidden flex-col justify-center gap-2 bg-abyss px-8 backdrop-blur-2xl md:!hidden"
        style={{ clipPath: "circle(0% at 92% 6%)" }}
      >
        {navLinks.map((link, i) => (
          <button
            key={link.href}
            data-menu-item
            type="button"
            onClick={() => go(link.href)}
            className="flex items-baseline gap-4 border-b border-white/8 py-5 text-left"
          >
            <span className="font-mono text-xs text-faint">0{i + 1}</span>
            <span className="font-display text-4xl font-semibold tracking-tight">
              {link.label}
            </span>
          </button>
        ))}

        <a
          data-menu-item
          href={`mailto:${contact.email}`}
          className="mt-8 inline-flex items-center justify-between rounded-full bg-linear-100 from-aurora to-plasma px-6 py-4 text-sm font-medium text-void"
        >
          {contact.email}
          <svg
            viewBox="0 0 16 16"
            className="size-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            aria-hidden
          >
            <path d="M4 12L12 4M6 4h6v6" strokeLinecap="round" />
          </svg>
        </a>
      </div>
    </>
  );
}
