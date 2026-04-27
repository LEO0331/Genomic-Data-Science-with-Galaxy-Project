import { render, screen } from "@testing-library/react";
import { VariantSummaryCards } from "@/components/VariantSummaryCards";
import { VariantRecord } from "@/lib/types";

const variants: VariantRecord[] = [
  {
    chrom: "chr1",
    pos: 10,
    id: "rs1",
    ref: "A",
    alt: "G",
    qual: "99",
    filter: "PASS",
    info: "DP=20",
    type: "SNP"
  },
  {
    chrom: "chr1",
    pos: 11,
    id: ".",
    ref: "A",
    alt: "AT",
    qual: "50",
    filter: "PASS",
    info: "DP=10",
    type: "Insertion"
  },
  {
    chrom: "chr2",
    pos: 12,
    id: ".",
    ref: "AT",
    alt: "A",
    qual: ".",
    filter: "q10",
    info: "DP=8",
    type: "Deletion"
  },
  {
    chrom: "chr3",
    pos: 13,
    id: ".",
    ref: "AT",
    alt: "GC",
    qual: ".",
    filter: "PASS",
    info: "DP=7",
    type: "Complex"
  }
];

describe("VariantSummaryCards", () => {
  it("shows summary numbers by type", () => {
    render(<VariantSummaryCards variants={variants} />);

    expect(screen.getByText("Total Variants")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("SNP")).toBeInTheDocument();
    expect(screen.getByText("Insertion")).toBeInTheDocument();
    expect(screen.getByText("Deletion")).toBeInTheDocument();
    expect(screen.getByText("Complex")).toBeInTheDocument();
    expect(screen.getByText("Unique Chromosomes")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });
});
