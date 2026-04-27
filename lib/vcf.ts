import { VariantRecord, VariantType } from "@/lib/types";

export type ParseResult = {
  variants: VariantRecord[];
  error?: string;
};

export function detectVariantType(ref: string, alt: string): VariantType {
  if (ref.length === 1 && alt.length === 1) {
    return "SNP";
  }
  if (alt.length > ref.length) {
    return "Insertion";
  }
  if (ref.length > alt.length) {
    return "Deletion";
  }
  return "Complex";
}

export function parseVcf(content: string): ParseResult {
  const lines = content.split(/\r?\n/).filter((line) => line.trim().length > 0);
  if (lines.length === 0) {
    return { variants: [], error: "VCF file is empty." };
  }

  let headerLine = "";
  const dataLines: string[] = [];

  for (const line of lines) {
    if (line.startsWith("##")) {
      continue;
    }
    if (line.startsWith("#CHROM")) {
      headerLine = line;
      continue;
    }
    if (!line.startsWith("#")) {
      dataLines.push(line);
    }
  }

  if (!headerLine) {
    return { variants: [], error: "Invalid VCF: missing #CHROM header." };
  }

  const variants: VariantRecord[] = dataLines
    .map((line) => {
      const columns = line.split("\t");
      if (columns.length < 8) {
        return null;
      }

      const [chrom, posRaw, idRaw, ref, altRaw, qualRaw, filterRaw, infoRaw] = columns;
      const pos = Number.parseInt(posRaw, 10);
      if (Number.isNaN(pos)) {
        return null;
      }

      const normalizedAlt = altRaw ?? ".";
      const primaryAlt = normalizedAlt.split(",")[0] || ".";

      return {
        chrom,
        pos,
        id: idRaw && idRaw !== "" ? idRaw : ".",
        ref: ref || ".",
        alt: normalizedAlt,
        qual: qualRaw && qualRaw !== "" ? qualRaw : ".",
        filter: filterRaw && filterRaw !== "" ? filterRaw : ".",
        info: infoRaw && infoRaw !== "" ? infoRaw : ".",
        type: detectVariantType(ref || ".", primaryAlt)
      } satisfies VariantRecord;
    })
    .filter((record): record is VariantRecord => Boolean(record));

  return { variants };
}

export function filterVariants(
  variants: VariantRecord[],
  search: string,
  chromosomeFilter: string,
  typeFilter: "ALL" | VariantType
): VariantRecord[] {
  const normalizedSearch = search.trim().toLowerCase();

  return variants.filter((variant) => {
    const matchesChromosome = chromosomeFilter === "ALL" || variant.chrom === chromosomeFilter;
    const matchesType = typeFilter === "ALL" || variant.type === typeFilter;

    const searchable = [
      variant.chrom,
      variant.pos.toString(),
      variant.id,
      variant.ref,
      variant.alt,
      variant.filter,
      variant.info
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch = normalizedSearch.length === 0 || searchable.includes(normalizedSearch);

    return matchesChromosome && matchesType && matchesSearch;
  });
}

export function variantsToCsv(variants: VariantRecord[]): string {
  const header = ["chrom", "pos", "id", "ref", "alt", "qual", "filter", "info", "type"];
  const rows = variants.map((variant) =>
    [
      variant.chrom,
      variant.pos.toString(),
      variant.id,
      variant.ref,
      variant.alt,
      variant.qual,
      variant.filter,
      variant.info,
      variant.type
    ]
      .map((value) => `"${value.replaceAll("\"", '""')}"`)
      .join(",")
  );

  return [header.join(","), ...rows].join("\n");
}

export function getVariantSummary(variants: VariantRecord[]) {
  const snpCount = variants.filter((variant) => variant.type === "SNP").length;
  const insertionCount = variants.filter((variant) => variant.type === "Insertion").length;
  const deletionCount = variants.filter((variant) => variant.type === "Deletion").length;
  const complexCount = variants.filter((variant) => variant.type === "Complex").length;
  const uniqueChromosomes = new Set(variants.map((variant) => variant.chrom)).size;

  return {
    totalVariants: variants.length,
    snpCount,
    insertionCount,
    deletionCount,
    complexCount,
    uniqueChromosomes
  };
}
