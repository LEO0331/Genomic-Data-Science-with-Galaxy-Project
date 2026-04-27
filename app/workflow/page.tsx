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
      <WorkflowTimeline steps={workflowSteps} />
    </div>
  );
}
