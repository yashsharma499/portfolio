import TextReveal from "@/components/TextReveal";

type Props = {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
};

export default function SectionHeading({ index, eyebrow, title, description }: Props) {
  return (
    <div className="mb-10 sm:mb-14">
      <p className="mb-3 font-mono text-[11px] tracking-[0.2em] text-accent uppercase sm:text-xs sm:tracking-[0.3em]">
        <span className="text-subtle-foreground">{index} /</span> {eyebrow}
      </p>
      <TextReveal as="h2" split="words" className="font-display text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl">
        {title}
      </TextReveal>
      {description && (
        <p className="mt-4 max-w-2xl text-sm text-muted-foreground sm:mt-5 sm:text-base">{description}</p>
      )}
    </div>
  );
}
