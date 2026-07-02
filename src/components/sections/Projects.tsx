import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { getProjects } from "@/lib/projects";
import type { Project } from "@/types/portfolio";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const orderLabel = `//${String(index + 1).padStart(2, "0")}`;
  return (
    <article className="group flex h-full flex-col rounded-lg border border-hacker-border bg-hacker-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-neon/60 hover:shadow-neon motion-reduce:transition-none motion-reduce:hover:transform-none">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p aria-hidden className="text-xs text-neon/40">
            {orderLabel}
          </p>
          <h3 className="mt-1 font-semibold text-slate-100 transition-colors group-hover:text-neon">
            {project.href ? (
              <a href={project.href} target="_blank" rel="noopener noreferrer">
                {project.name}
              </a>
            ) : (
              project.name
            )}
          </h3>
        </div>
        <span
          aria-hidden
          className="text-sm text-slate-600 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neon"
        >
          →
        </span>
      </div>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
        {project.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <Tag key={tech} label={tech} />
        ))}
      </div>
    </article>
  );
}

export function Projects() {
  const projects = getProjects();
  return (
    <section className="py-12">
      <SectionHeading id="projects" title="Projects" />
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {projects.map((project, index) => (
          <Reveal key={project.name} delayMs={index * 120} className="h-full">
            <ProjectCard project={project} index={index} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
