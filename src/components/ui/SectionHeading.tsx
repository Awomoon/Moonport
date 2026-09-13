import { SplitHeading } from "@/components/ui/SplitHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  lede?: string;
  className?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  lede,
  className,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <Reveal from="up">
        <span className="eyebrow">
          <span className="size-1.5 rounded-full bg-aurora shadow-[0_0_10px_var(--color-aurora)]" />
          {eyebrow}
        </span>
      </Reveal>

      <SplitHeading
        as="h2"
        className="max-w-3xl text-4xl leading-[1.05] sm:text-5xl lg:text-[3.5rem]"
      >
        {title}
      </SplitHeading>

      {lede ? (
        <Reveal from="up" delay={0.1}>
          <p className="max-w-xl text-base leading-relaxed text-haze">{lede}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
