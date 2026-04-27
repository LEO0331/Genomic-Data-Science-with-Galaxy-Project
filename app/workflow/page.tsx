import { WorkflowTimeline } from "@/components/WorkflowTimeline";
import { PageHeader } from "@/components/PageHeader";
import { workflowSteps } from "@/data/workflowSteps";

export default function WorkflowPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Galaxy Pipeline"
        title="Variant Calling Workflow"
        description="The pipeline below shows the actual sequence used to process father-mother-child paired-end sequencing data, from raw FASTQ inputs to annotated and gene-level variant reporting."
      />
      <section aria-labelledby="workflow-steps-heading" className="space-y-4">
        <h2 id="workflow-steps-heading" className="display-title text-2xl text-white sm:text-3xl">
          Workflow Steps
        </h2>
        <WorkflowTimeline steps={workflowSteps} />
      </section>
    </div>
  );
}
