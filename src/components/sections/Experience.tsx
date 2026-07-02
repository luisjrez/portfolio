import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { getExperience } from "@/lib/experience";
import type { ExperienceItem } from "@/types/portfolio";

function ExperienceEntry({ item }: { item: ExperienceItem }) {
  return (
    <article className="relative pl-8">
      <span
        aria-hidden
        className="absolute top-1.5 -left-[5px] h-2.5 w-2.5 rounded-full bg-neon animate-neon-pulse"
      />
      <p className="text-xs font-medium uppercase tracking-wider text-neon/70">
        {item.period}
      </p>
      <h3 className="mt-2 font-semibold text-slate-100">
        {item.role} <span className="text-neon/50">·</span> {item.company}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-400">
        {item.description}
      </p>
      <ul className="mt-3 space-y-1 text-sm leading-relaxed text-slate-400">
        {item.highlights.map((highlight) => (
          <li key={highlight} className="flex gap-2">
            <span aria-hidden className="text-neon">
              {">"}
            </span>
            {highlight}
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-wrap gap-2">
        {item.stack.map((tech) => (
          <Tag key={tech} label={tech} />
        ))}
      </div>
    </article>
  );
}

export function Experience() {
  const experience = getExperience();
  return (
    <section className="py-12">
      <SectionHeading id="experience" title="Experience" />
      <div className="mt-8 space-y-12 border-l border-neon/20">
        {experience.map((item, index) => (
          <Reveal key={`${item.company}-${item.period}`} delayMs={index * 120}>
            <ExperienceEntry item={item} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
