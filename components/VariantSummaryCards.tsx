import { VariantRecord } from "@/lib/types";

type VariantSummaryCardsProps = {
  variants: VariantRecord[];
};

export function VariantSummaryCards({ variants }: VariantSummaryCardsProps) {
  const snpCount = variants.filter((variant) => variant.type === "SNP").length;
  const insertionCount = variants.filter((variant) => variant.type === "Insertion").length;
  const deletionCount = variants.filter((variant) => variant.type === "Deletion").length;
  const complexCount = variants.filter((variant) => variant.type === "Complex").length;
  const chromosomeCount = new Set(variants.map((variant) => variant.chrom)).size;

  const stats = [
    { label: "Total Variants", value: variants.length },
    { label: "SNP", value: snpCount },
    { label: "Insertion", value: insertionCount },
    { label: "Deletion", value: deletionCount },
    { label: "Complex", value: complexCount },
    { label: "Unique Chromosomes", value: chromosomeCount }
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => (
        <article key={stat.label} className="card-surface p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">{stat.label}</p>
          <p className="mt-2 font-mono text-2xl text-cyan-200">{stat.value}</p>
        </article>
      ))}
    </div>
  );
}
