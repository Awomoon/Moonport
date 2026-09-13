"use client";

import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { gsap, registerGsap } from "@/lib/gsap";
import { prefersReducedMotion, settle } from "@/lib/motion";
import { experience } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pad } from "@/lib/utils";

export function Experience() {
  const root = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    registerGsap();

    if (prefersReducedMotion()) {
      settle(el.querySelectorAll("[data-role]"));
      gsap.set(el.querySelectorAll("[data-spine]"), { scaleY: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      // The spine draws itself as you scroll the list.
      gsap.fromTo(
        "[data-spine]",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: "[data-timeline]",
            start: "top 70%",
            end: "bottom 75%",
            scrub: 0.8,
          },
        },
      );

      // Same reason as Reveal: no sideways offset on narrow screens.
      const slide = window.matchMedia("(width < 48rem)").matches ? 0 : 44;

      gsap.utils.toArray<HTMLElement>("[data-role]").forEach((role) => {
        gsap.set(role, { visibility: "visible" });

        gsap.from(role, {
          autoAlpha: 0,
          x: slide,
          y: slide ? 0 : 32,
          filter: "blur(12px)",
          duration: 1.05,
          scrollTrigger: { trigger: role, start: "top 84%", once: true },
        });

        gsap.from(role.querySelector("[data-node]"), {
          scale: 0,
          duration: 0.8,
          ease: "back.out(2.4)",
          scrollTrigger: { trigger: role, start: "top 84%", once: true },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="path" className="band">
      <div className="shell">
        <SectionHeading
          eyebrow="The path"
          title="Where I've been putting the hours."
        />

        <ol data-timeline className="relative mt-14 pl-8 md:mt-20 md:pl-14">
          {/* Spine */}
          <span
            aria-hidden
            className="absolute top-2 bottom-2 left-[3px] w-px bg-white/8 md:left-[23px]"
          />
          <span
            aria-hidden
            data-spine
            className="absolute top-2 bottom-2 left-[3px] w-px bg-linear-180 from-aurora via-plasma to-transparent md:left-[23px]"
          />

          {experience.map((role, i) => (
            <li
              key={role.company}
              data-role
              className="invisible relative pb-14 last:pb-0"
            >
              <span
                data-node
                aria-hidden
                className="absolute top-1.5 -left-8 size-[7px] rounded-full bg-aurora shadow-[0_0_14px_var(--color-aurora)] md:-left-14 md:translate-x-[17px]"
              />

              <div className="flex max-w-3xl flex-col gap-4">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="font-mono text-[11px] tracking-widest text-faint">
                    {pad(experience.length - i)}
                  </span>
                  <h3 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
                    {role.title}
                  </h3>
                  <span className="text-plasma">@</span>
                  <span className="text-lg text-mist">{role.company}</span>
                  <span className="ml-auto font-mono text-[11px] tracking-widest text-faint uppercase">
                    {role.period}
                  </span>
                </div>

                <p className="max-w-2xl text-sm leading-relaxed text-haze">
                  {role.summary}
                </p>

                <ul className="glass mt-1 flex max-w-2xl flex-col gap-3 rounded-2xl p-5">
                  {role.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-3 text-sm leading-relaxed text-haze"
                    >
                      <svg
                        viewBox="0 0 16 16"
                        className="mt-0.5 size-3.5 shrink-0 text-aurora"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden
                      >
                        <path
                          d="M3 8.5l3.5 3.5L13 5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
