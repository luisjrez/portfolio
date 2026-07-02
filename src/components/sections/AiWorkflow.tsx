import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAiWorkflow } from "@/lib/ai-workflow";
import type { AiWorkflowPoint } from "@/lib/ai-workflow";

function WorkflowPoint({
  point,
  index,
}: {
  point: AiWorkflowPoint;
  index: number;
}) {
  const number = String(index + 1).padStart(2, "0");
  return (
    <div className="flex gap-4 rounded-lg border border-hacker-border bg-hacker-surface p-5">
      <span aria-hidden className="font-mono text-sm text-neon/50">
        {number}
      </span>
      <div>
        <h3 className="font-semibold text-slate-100">{point.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-slate-400">
          {point.body}
        </p>
      </div>
    </div>
  );
}

export function AiWorkflow() {
  const workflow = getAiWorkflow();
  if (workflow.points.length === 0) {
    return null;
  }
  return (
    <section className="py-12">
      <SectionHeading id="ai" title={workflow.title} />
      {workflow.intro && (
        <p className="mt-8 max-w-2xl leading-relaxed text-slate-400">
          {workflow.intro}
        </p>
      )}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {workflow.points.map((point, index) => (
          <Reveal key={point.title} delayMs={index * 100}>
            <WorkflowPoint point={point} index={index} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
