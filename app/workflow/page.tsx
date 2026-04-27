import { WorkflowTimeline } from "@/components/WorkflowTimeline";
import { workflowSteps } from "@/data/workflowSteps";

export default function WorkflowPage() {
  return (
    <div className="space-y-6">
      <header className="card-surface p-6 sm:p-8">
        <h1 className="text-3xl font-semibold text-white">Galaxy Workflow Pipeline</h1>
        <p className="mt-3 max-w-3xl text-slate-300">
          This page visualizes the core pipeline used to process father-mother-child paired-end sequencing data and
          produce annotated variant insights.
        </p>
      </header>
      <WorkflowTimeline steps={workflowSteps} />
    </div>
  );
}
