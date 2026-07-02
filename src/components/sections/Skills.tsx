import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { getSkillGroups } from "@/lib/skills";
import type { SkillGroup } from "@/types/portfolio";

function SkillGroupRow({ group }: { group: SkillGroup }) {
  return (
    <div className="grid gap-2 sm:grid-cols-[11rem_1fr] sm:gap-8">
      <h3 className="text-sm font-medium text-slate-200">
        <span aria-hidden className="mr-2 text-neon">
          {">"}
        </span>
        {group.category}
      </h3>
      <div className="flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <Tag key={skill} label={skill} />
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  const skillGroups = getSkillGroups();
  return (
    <section className="py-12">
      <SectionHeading id="skills" title="Skills" />
      <div className="mt-8 space-y-6">
        {skillGroups.map((group, index) => (
          <Reveal key={group.category} delayMs={index * 100}>
            <SkillGroupRow group={group} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
