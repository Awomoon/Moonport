"use client";

import { useState } from "react";
import { contact, socials } from "@/content/site";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { Reveal } from "@/components/ui/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (insecure context or denied) — the mailto link below
      // still works, so there is nothing to recover from.
    }
  };

  return (
    <section id="contact" className="band">
      <div className="shell">
        <GlassCard
          tilt={0}
          className="overflow-hidden rounded-[2rem] px-6 py-14 md:px-14 md:py-20"
        >
          {/* Aurora wash behind the panel */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_120%_at_20%_0%,rgba(94,234,212,0.16),transparent_60%),radial-gradient(70%_110%_at_90%_100%,rgba(167,139,250,0.2),transparent_60%)]"
          />

          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex max-w-2xl flex-col gap-6">
              <Reveal from="up">
                <span className="eyebrow">
                  <span className="size-1.5 rounded-full bg-ember shadow-[0_0_10px_var(--color-ember)]" />
                  {contact.eyebrow}
                </span>
              </Reveal>

              <SplitHeading
                as="h2"
                className="text-4xl leading-[1.03] sm:text-5xl lg:text-[4rem]"
              >
                {contact.heading}
              </SplitHeading>

              <Reveal from="up" delay={0.1}>
                <p className="max-w-lg text-base leading-relaxed text-haze">
                  {contact.lede}
                </p>
              </Reveal>
            </div>

            <Reveal from="left" className="flex flex-col gap-5">
              <MagneticButton href={`mailto:${contact.email}`}>
                {contact.email}
                <svg
                  viewBox="0 0 16 16"
                  className="size-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  aria-hidden
                >
                  <path d="M4 12L12 4M6 4h6v6" strokeLinecap="round" />
                </svg>
              </MagneticButton>

              <button
                type="button"
                onClick={copyEmail}
                className="font-mono text-[11px] tracking-[0.2em] text-faint uppercase transition-colors duration-300 hover:text-aurora"
              >
                {copied ? "Copied to clipboard" : "Or copy the address"}
              </button>
            </Reveal>
          </div>

          <Reveal
            from="up"
            stagger={0.08}
            className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="group flex items-center justify-between gap-3 bg-abyss/70 px-5 py-5 transition-colors duration-400 hover:bg-abyss/30"
              >
                <span className="text-sm text-mist">{social.label}</span>
                <svg
                  viewBox="0 0 16 16"
                  className="size-3.5 text-faint transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-aurora"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  aria-hidden
                >
                  <path d="M4 12L12 4M6 4h6v6" strokeLinecap="round" />
                </svg>
              </a>
            ))}
          </Reveal>
        </GlassCard>
      </div>
    </section>
  );
}
