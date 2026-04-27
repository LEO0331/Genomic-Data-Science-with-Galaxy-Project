import { VariantRecord } from "@/lib/types";

type VariantTableProps = {
  variants: VariantRecord[];
};

export function VariantTable({ variants }: VariantTableProps) {
  if (variants.length === 0) {
    return <div className="card-surface p-6 text-sm text-[var(--text-muted)]">No variants match the current filters.</div>;
  }

  return (
    <div className="card-surface overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-[rgba(217,237,255,0.03)]">
          <tr className="border-b border-[var(--line)]">
            {["Chromosome", "Position", "ID", "Reference", "Alternate", "Quality", "Filter", "Info", "Type"].map(
              (column) => (
                <th key={column} className="whitespace-nowrap px-3 py-3 font-semibold text-[var(--text)]">
                  {column}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {variants.map((variant, idx) => (
            <tr
              key={`${variant.chrom}-${variant.pos}-${variant.ref}-${variant.alt}-${idx}`}
              className="border-b border-[var(--line)]/80 transition hover:bg-[rgba(143,243,223,0.06)]"
            >
              <td className="mono-data px-3 py-2">{variant.chrom}</td>
              <td className="mono-data px-3 py-2">{variant.pos}</td>
              <td className="mono-data px-3 py-2">{variant.id}</td>
              <td className="mono-data px-3 py-2">{variant.ref}</td>
              <td className="mono-data px-3 py-2">{variant.alt}</td>
              <td className="mono-data px-3 py-2">{variant.qual}</td>
              <td className="mono-data px-3 py-2">{variant.filter}</td>
              <td className="mono-data max-w-[300px] truncate px-3 py-2 text-xs" title={variant.info}>
                {variant.info}
              </td>
              <td className="px-3 py-2 text-[var(--accent)]">{variant.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
