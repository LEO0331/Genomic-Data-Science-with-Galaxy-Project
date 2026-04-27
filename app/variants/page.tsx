import { VariantExplorer } from "@/components/VariantExplorer";
import { PageHeader } from "@/components/PageHeader";

export default function VariantsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Client-Side Analysis"
        title="VCF Variant Explorer"
        description="Load the sample filtered VCF or upload your own file to parse and inspect variant records directly in the browser."
      />
      <VariantExplorer />
    </div>
  );
}
