import { VariantRecord } from "@/lib/types";

type VariantTableProps = {
  variants: VariantRecord[];
};

export function VariantTable({ variants }: VariantTableProps) {
  if (variants.length === 0) {
    return (
      <div className="card-surface p-6 text-sm text-slate-300">No variants match the current filters.</div>
    );
  }

  return (
    <div className="card-surface overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-900">
          <tr className="border-b border-slate-800">
            {["Chromosome", "Position", "ID", "Reference", "Alternate", "Quality", "Filter", "Info", "Type"].map(
              (column) => (
                <th key={column} className="whitespace-nowrap px-3 py-3 font-semibold text-slate-200">
                  {column}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {variants.map((variant, idx) => (
            <tr key={`${variant.chrom}-${variant.pos}-${variant.ref}-${variant.alt}-${idx}`} className="border-b border-slate-800/80">
              <td className="px-3 py-2 font-mono">{variant.chrom}</td>
              <td className="px-3 py-2 font-mono">{variant.pos}</td>
              <td className="px-3 py-2 font-mono">{variant.id}</td>
              <td className="px-3 py-2 font-mono">{variant.ref}</td>
              <td className="px-3 py-2 font-mono">{variant.alt}</td>
              <td className="px-3 py-2 font-mono">{variant.qual}</td>
              <td className="px-3 py-2 font-mono">{variant.filter}</td>
              <td className="max-w-[280px] truncate px-3 py-2 font-mono text-xs" title={variant.info}>
                {variant.info}
              </td>
              <td className="px-3 py-2 text-cyan-200">{variant.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
