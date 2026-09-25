import { sections, skills } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";

function Chip({ label }: { label: string }) {
  return (
    <span className="deck mx-2 inline-flex items-center gap-2.5 rounded-full px-5 py-3 text-sm whitespace-nowrap text-mist">
      <span className="size-1.5 rounded-full bg-linear-90 from-gold to-sea" />
      {label}
    </span>
  );
}

export function Skills() {
  return (
    <section id="stack" className="band">
      <div className="shell">
        <SectionHeading
          eyebrow={sections.stack.eyebrow}
          title={sections.stack.title}
          lede={sections.stack.lede}
        />
      </div>

      <div className="mt-14 flex flex-col gap-4 md:mt-20">
        {skills.map((group, i) => (
          <Marquee key={group.label} speed={30 + i * 8} reverse={i % 2 === 1}>
            {group.items.map((item) => (
              <Chip key={item} label={item} />
            ))}
          </Marquee>
        ))}
      </div>

      <div className="shell mt-14 md:mt-20">
        <Reveal
          from="up"
          stagger={0.12}
          className="grid gap-4 border-t border-white/8 pt-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {skills.map((group) => (
            <div key={group.label} className="flex flex-col gap-3">
              <h3 className="font-mono text-[11px] tracking-[0.2em] text-gold uppercase">
                {group.label}
              </h3>
              <p className="text-sm leading-relaxed text-haze">
                {group.items.join(" · ")}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
