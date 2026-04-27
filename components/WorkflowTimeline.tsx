import { WorkflowStep } from "@/lib/types";
import { WorkflowStepCard } from "@/components/WorkflowStepCard";

type WorkflowTimelineProps = {
  steps: WorkflowStep[];
};

export function WorkflowTimeline({ steps }: WorkflowTimelineProps) {
  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <div key={step.id} className="grid gap-4 md:grid-cols-[44px_1fr] md:items-stretch">
          <div className="hidden md:flex md:justify-center">
            <div className="relative w-px bg-[var(--line)]">
              <span className="absolute -left-[8px] top-5 h-4 w-4 rounded-full border-2 border-[var(--line-strong)] bg-[var(--bg-elev)]" />
            </div>
          </div>
          <WorkflowStepCard step={step} index={index} />
        </div>
      ))}
    </div>
  );
}
