import { WorkflowStep } from "@/lib/types";

type WorkflowStepCardProps = {
  step: WorkflowStep;
  index: number;
};

export function WorkflowStepCard({ step, index }: WorkflowStepCardProps) {
  return (
    <article className="card-surface p-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="rounded-md border border-slate-700 bg-slate-800 px-2 py-1 font-mono text-xs text-cyan-200">
          Step {index + 1}
        </span>
        <span className="rounded-md border border-slate-700 px-2 py-1 text-xs text-slate-300">{step.category}</span>
      </div>
      <h3 className="text-lg font-semibold text-white">{step.title}</h3>
      <p className="mt-2 text-sm text-slate-300">{step.description}</p>
      <p className="mt-3 text-sm text-slate-400">
        <span className="font-semibold text-slate-200">Purpose:</span> {step.purpose}
      </p>
    </article>
  );
}
