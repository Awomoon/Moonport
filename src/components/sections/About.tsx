"use client";

import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { gsap, registerGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { about, site } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { DeckCard } from "@/components/ui/DeckCard";

export function About() {
  const root = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    registerGsap();

    // The word-by-word scrub is the whole effect here; without motion the
    // paragraphs simply render as paragraphs.
    if (prefersReducedMotion()) return;

    const originals = new Map<HTMLElement, string>();

    const ctx = gsap.context(() => {
      // Body copy fades word by word as the section passes the middle of the
      // viewport — a slow, readable scrub rather than a pop-in.
      gsap.utils.toArray<HTMLElement>("[data-fade-copy]").forEach((para) => {
        originals.set(para, para.innerHTML);

        const words = (para.textContent ?? "").split(/\s+/).filter(Boolean);
        para.replaceChildren(
          ...words.map((word) => {
            const span = document.createElement("span");
            span.className = "inline-block";
            span.textContent = `${word}\u00a0`;
            return span;
          }),
        );

        gsap.fromTo(
          para.children,
          { opacity: 0.16 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.4,
            scrollTrigger: {
              trigger: para,
              start: "top 78%",
              end: "bottom 58%",
              scrub: 0.6,
            },
          },
        );
      });
    }, el);

    return () => {
      ctx.revert();
      // Put the plain paragraphs back so a re-run splits clean text, not spans.
      originals.forEach((html, para) => {
        para.innerHTML = html;
      });
    };
  }, []);

  return (
    <section ref={root} id="about" className="band">
      <div className="shell grid gap-14 lg:grid-cols-[1fr_0.78fr] lg:gap-20">
        <div className="flex flex-col gap-10">
          <SectionHeading eyebrow={about.eyebrow} title={about.heading} />

          <div className="flex max-w-2xl flex-col gap-6 text-base leading-relaxed text-mist sm:text-lg">
            {about.paragraphs.map((paragraph, i) => (
              <p key={i} data-fade-copy>
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <Reveal from="left" className="lg:pt-4">
          <DeckCard className="parchment overflow-hidden p-7 md:p-8" tilt={5}>
            {/* Ruled margin, the way a ship's log is lined */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-4 w-px bg-gold/25 md:left-5"
            />
            <div className="flex items-center gap-3">
              <span className="relative flex size-2">
                <span className="absolute inset-0 animate-[pulse-ring_2.4s_ease-out_infinite] rounded-full bg-gold" />
                <span className="relative size-2 rounded-full bg-gold" />
              </span>
              <span className="eyebrow text-parchment/80">{about.logLabel}</span>
            </div>

            <ul className="mt-6 flex flex-col divide-y divide-white/8">
              {about.nowPlaying.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 py-4 text-sm leading-relaxed text-haze first:pt-0 last:pb-0"
                >
                  <span className="mt-1.5 size-1 shrink-0 rounded-full bg-gold" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex items-center justify-between border-t border-white/8 pt-6">
              <span className="coord">{site.coordinates}</span>
              <span className="font-mono text-[11px] tracking-widest text-gold uppercase">
                Open to work
              </span>
            </div>
          </DeckCard>
        </Reveal>
      </div>
    </section>
  );
}
