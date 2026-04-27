import { WorkflowStep } from "@/lib/types";

type WorkflowStepCardProps = {
  step: WorkflowStep;
  index: number;
};

export function WorkflowStepCard({ step, index }: WorkflowStepCardProps) {
  return (
    <article className="card-surface group p-5 transition duration-300 hover:-translate-y-1 hover:border-[var(--line-strong)]">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="mono-data rounded-md border border-[var(--line)] bg-[rgba(217,237,255,0.06)] px-2 py-1 text-xs text-[var(--accent)]">
          Step {index + 1}
        </span>
        <span className="rounded-md border border-[var(--line)] px-2 py-1 text-xs text-[var(--text-muted)]">{step.category}</span>
      </div>
      <h3 className="display-title text-2xl text-white transition group-hover:text-[var(--accent)]">{step.title}</h3>
      <p className="mt-2 text-sm text-[var(--text-muted)]">{step.description}</p>
      <p className="mt-4 text-sm text-[var(--text-muted)]">
        <span className="font-semibold text-[var(--text)]">Purpose:</span> {step.purpose}
      </p>
    </article>
  );
}
