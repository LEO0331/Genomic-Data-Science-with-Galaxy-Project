import { detectVariantType, filterVariants, getVariantSummary, parseVcf, variantsToCsv } from "@/lib/vcf";
import { VariantRecord } from "@/lib/types";

const demoVcf = `##fileformat=VCFv4.2
#CHROM\tPOS\tID\tREF\tALT\tQUAL\tFILTER\tINFO
chr1\t100\trs1\tA\tG\t50\tPASS\tDP=10
chr1\t101\t.\tA\tAT\t.\tq10\tDP=4
chr2\t102\t.\tAT\tA\t.\tPASS\tDP=5
chr3\t103\t.\tAT\tGC\t.\tPASS\tDP=8`;

describe("vcf utilities", () => {
  it("detects variant type", () => {
    expect(detectVariantType("A", "G")).toBe("SNP");
    expect(detectVariantType("A", "AT")).toBe("Insertion");
    expect(detectVariantType("AT", "A")).toBe("Deletion");
    expect(detectVariantType("AT", "GC")).toBe("Complex");
  });

  it("parses VCF text and handles errors", () => {
    const parsed = parseVcf(demoVcf);
    expect(parsed.error).toBeUndefined();
    expect(parsed.variants).toHaveLength(4);
    expect(parsed.variants[1].id).toBe(".");
    expect(parsed.variants[1].qual).toBe(".");
    expect(parsed.variants[0].type).toBe("SNP");

    expect(parseVcf("").error).toContain("empty");
    expect(parseVcf("chr1\t1").error).toContain("#CHROM");
  });

  it("skips malformed records safely", () => {
    const malformed = `##fileformat=VCFv4.2
#CHROM\tPOS\tID\tREF\tALT\tQUAL\tFILTER\tINFO
chr1\tNaN\t.\tA\tG\t.\tPASS\tDP=1
chr1\t1\t.\tA`;

    const parsed = parseVcf(malformed);
    expect(parsed.error).toBeUndefined();
    expect(parsed.variants).toHaveLength(0);
  });

  it("normalizes empty optional VCF fields", () => {
    const withEmptyFields = `##fileformat=VCFv4.2
#comment line should be ignored
#CHROM\tPOS\tID\tREF\tALT\tQUAL\tFILTER\tINFO
chrX\t55\t\t\t\t\t\t`;

    const parsed = parseVcf(withEmptyFields);
    expect(parsed.error).toBeUndefined();
    expect(parsed.variants).toHaveLength(1);
    expect(parsed.variants[0]).toMatchObject({
      id: ".",
      ref: ".",
      alt: "",
      qual: ".",
      filter: ".",
      info: "."
    });
  });

  it("filters, summarizes, and exports CSV", () => {
    const variants = parseVcf(demoVcf).variants;

    const filtered = filterVariants(variants, "chr1", "ALL", "ALL");
    expect(filtered).toHaveLength(2);

    const snpOnly = filterVariants(variants, "", "ALL", "SNP");
    expect(snpOnly).toHaveLength(1);

    const noneByChromosome = filterVariants(variants, "", "chr9", "ALL");
    expect(noneByChromosome).toHaveLength(0);

    const noneBySearch = filterVariants(variants, "notfound", "ALL", "ALL");
    expect(noneBySearch).toHaveLength(0);

    const summary = getVariantSummary(variants);
    expect(summary.totalVariants).toBe(4);
    expect(summary.snpCount).toBe(1);
    expect(summary.insertionCount).toBe(1);
    expect(summary.deletionCount).toBe(1);
    expect(summary.complexCount).toBe(1);
    expect(summary.uniqueChromosomes).toBe(3);

    const csv = variantsToCsv(variants as VariantRecord[]);
    expect(csv).toContain("chrom,pos,id,ref,alt,qual,filter,info,type");
    expect(csv).toContain("\"chr1\"");
  });
});
