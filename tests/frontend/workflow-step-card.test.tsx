import { render, screen } from "@testing-library/react";
import { WorkflowStepCard } from "@/components/WorkflowStepCard";

describe("WorkflowStepCard", () => {
  it("renders step metadata and purpose text", () => {
    render(
      <WorkflowStepCard
        index={1}
        step={{
          id: "bowtie2",
          title: "Bowtie2 Mapping",
          category: "Alignment",
          description: "Aligns paired-end reads to reference genome.",
          purpose: "Generate mapped reads for downstream variant calling."
        }}
      />
    );

    expect(screen.getByText("Step 2")).toBeInTheDocument();
    expect(screen.getByText("Alignment")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Bowtie2 Mapping" })).toBeInTheDocument();
    expect(screen.getByText(/Generate mapped reads/)).toBeInTheDocument();
  });
});
