import { CodeTag } from "@/components/ui/CodeTag";

interface SectionHeadingProps {
  id: string;
  title: string;
}

export function SectionHeading({ id, title }: SectionHeadingProps) {
  return (
    <div className="group flex items-baseline gap-3">
      <CodeTag
        label="<h2>"
        className="transition-colors duration-300 group-hover:text-neon/80"
      />
      <h2
        id={id}
        className="scroll-mt-24 text-lg font-bold uppercase tracking-[0.3em] text-neon text-glow"
      >
        {title}
      </h2>
      <CodeTag
        label="</h2>"
        className="transition-colors duration-300 group-hover:text-neon/80"
      />
    </div>
  );
}
