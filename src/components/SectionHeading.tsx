import TextReveal from "@/components/TextReveal";

type Props = {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
};

export default function SectionHeading({ index, eyebrow, title, description }: Props) {
  return (
    <div className="mb-14">
      <p className="mb-3 font-mono text-xs tracking-[0.3em] text-accent uppercase">
        <span className="text-subtle-foreground">{index} /</span> {eyebrow}
      </p>
      <TextReveal as="h2" split="words" className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
        {title}
      </TextReveal>
      {description && (
        <p className="mt-5 max-w-2xl text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
