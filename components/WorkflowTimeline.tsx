import { WorkflowStep } from "@/lib/types";
import { WorkflowStepCard } from "@/components/WorkflowStepCard";

type WorkflowTimelineProps = {
  steps: WorkflowStep[];
};

export function WorkflowTimeline({ steps }: WorkflowTimelineProps) {
  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <div key={step.id} className="grid gap-4 md:grid-cols-[40px_1fr] md:items-stretch">
          <div className="hidden md:flex md:justify-center">
            <div className="relative w-px bg-slate-700">
              <span className="absolute -left-[7px] top-4 h-4 w-4 rounded-full border-2 border-cyan-300 bg-slate-900" />
            </div>
          </div>
          <WorkflowStepCard step={step} index={index} />
        </div>
      ))}
    </div>
  );
}
