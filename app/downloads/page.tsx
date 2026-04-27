import { DownloadCard } from "@/components/DownloadCard";

const artifacts = [
  {
    title: "Galaxy Workflow File",
    description: "Reusable Galaxy workflow exported from the original project pipeline.",
    fileName: "galaxy-workflow.ga",
    href: "/galaxy-workflow.ga"
  },
  {
    title: "Project Report (PDF)",
    description: "Original project documentation describing analysis stages and interpretation.",
    fileName: "galaxy-project.pdf",
    href: "/galaxy-project.pdf"
  },
  {
    title: "Filtered VCF Result",
    description: "Variant call set filtered for downstream exploration and interpretation.",
    fileName: "filtered-variants.vcf",
    href: "/filtered-variants.vcf"
  },
  {
    title: "GitHub Repository",
    description: "Original source repository and project artifacts.",
    fileName: "LEO0331/Genomic-Data-Science-with-Galaxy-Project",
    href: "https://github.com/LEO0331/Genomic-Data-Science-with-Galaxy-Project"
  }
];

export default function DownloadsPage() {
  return (
    <div className="space-y-6">
      <header className="card-surface p-6 sm:p-8">
        <h1 className="text-3xl font-semibold text-white">Downloads & Artifacts</h1>
        <p className="mt-3 max-w-3xl text-slate-300">
          Download workflow and analysis artifacts produced from the Galaxy-based variant-calling pipeline.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        {artifacts.map((artifact) => (
          <DownloadCard key={artifact.title} {...artifact} ctaLabel={artifact.href.startsWith("http") ? "Open" : "Download"} />
        ))}
      </section>
    </div>
  );
}
