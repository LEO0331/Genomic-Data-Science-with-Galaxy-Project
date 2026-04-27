"use client";

import { useMemo, useState } from "react";
import { VariantRecord, VariantType } from "@/lib/types";
import { filterVariants, parseVcf, variantsToCsv } from "@/lib/vcf";
import { VariantTable } from "@/components/VariantTable";
import { VariantSummaryCards } from "@/components/VariantSummaryCards";
import { VcfUploader } from "@/components/VcfUploader";

const SAMPLE_VCF_PATH = "/filtered-variants.vcf";
const MAX_VCF_SIZE_BYTES = 10 * 1024 * 1024;

function downloadCsv(variants: VariantRecord[]) {
  const csv = variantsToCsv(variants);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "filtered-variants.csv";
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export function VariantExplorer() {
  const [variants, setVariants] = useState<VariantRecord[]>([]);
  const [statusMessage, setStatusMessage] = useState<string>("No VCF loaded yet.");
  const [search, setSearch] = useState("");
  const [chromosomeFilter, setChromosomeFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState<"ALL" | VariantType>("ALL");

  const chromosomeOptions = useMemo(() => {
    return ["ALL", ...Array.from(new Set(variants.map((variant) => variant.chrom))).sort((a, b) => a.localeCompare(b))];
  }, [variants]);

  const filteredVariants = useMemo(() => {
    return filterVariants(variants, search, chromosomeFilter, typeFilter);
  }, [variants, search, chromosomeFilter, typeFilter]);

  function setErrorState(message: string) {
    setVariants([]);
    setStatusMessage(message);
  }

  function applyParsedResult(result: ReturnType<typeof parseVcf>, successMessage: string) {
    if (result.error) {
      setErrorState(result.error);
      return false;
    }
    setVariants(result.variants);
    setStatusMessage(successMessage);
    return true;
  }

  async function loadSampleVcf() {
    try {
      setStatusMessage("Loading sample VCF from /public...");
      const response = await fetch(SAMPLE_VCF_PATH);
      if (!response.ok) {
        setStatusMessage("Sample VCF was not found in /public.");
        return;
      }
      const content = await response.text();
      const result = parseVcf(content);
      applyParsedResult(result, `Loaded sample VCF with ${result.variants.length} variants.`);
    } catch {
      setStatusMessage("Failed to load sample VCF.");
    }
  }

  async function handleFile(file: File) {
    if (!file.name.toLowerCase().endsWith(".vcf")) {
      setErrorState("Invalid file type. Please upload a .vcf file.");
      return;
    }

    if (file.size > MAX_VCF_SIZE_BYTES) {
      setErrorState("File is too large. Please upload a VCF file under 10 MB.");
      return;
    }

    const text = await file.text();
    const result = parseVcf(text);
    applyParsedResult(result, `Loaded ${file.name} with ${result.variants.length} variants.`);
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-2">
        <VcfUploader onFileSelected={handleFile} />
        <div className="card-surface flex flex-col justify-between gap-3 p-5">
          <div>
            <h2 className="display-title text-2xl text-white">Load Built-In Sample</h2>
            <p className="mt-2 text-sm text-[var(--text-muted)]">
              Use the filtered VCF artifact packaged from this Galaxy project.
            </p>
          </div>
          <button type="button" onClick={loadSampleVcf} className="btn-primary w-fit">
            Load Sample VCF
          </button>
          <p className="mono-data text-xs text-[var(--text-muted)]">{statusMessage}</p>
        </div>
      </div>

      <VariantSummaryCards variants={filteredVariants} />

      <div className="card-surface grid gap-3 p-4 md:grid-cols-[2fr_1fr_1fr_auto] md:items-end">
        <label className="text-sm text-[var(--text-muted)]">
          Search
          <input
            className="mono-data mt-1 w-full rounded-md border border-[var(--line)] bg-[var(--bg)] px-3 py-2 text-sm text-[var(--text)]"
            placeholder="chr, pos, id, ref, alt, filter, info"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>

        <label className="text-sm text-[var(--text-muted)]">
          Chromosome
          <select
            className="mono-data mt-1 w-full rounded-md border border-[var(--line)] bg-[var(--bg)] px-3 py-2 text-sm text-[var(--text)]"
            value={chromosomeFilter}
            onChange={(event) => setChromosomeFilter(event.target.value)}
          >
            {chromosomeOptions.map((chromosome) => (
              <option key={chromosome} value={chromosome}>
                {chromosome}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm text-[var(--text-muted)]">
          Variant Type
          <select
            className="mono-data mt-1 w-full rounded-md border border-[var(--line)] bg-[var(--bg)] px-3 py-2 text-sm text-[var(--text)]"
            value={typeFilter}
            onChange={(event) => setTypeFilter(event.target.value as "ALL" | VariantType)}
          >
            {["ALL", "SNP", "Insertion", "Deletion", "Complex"].map((variantType) => (
              <option key={variantType} value={variantType}>
                {variantType}
              </option>
            ))}
          </select>
        </label>

        <button
          type="button"
          onClick={() => downloadCsv(filteredVariants)}
          disabled={filteredVariants.length === 0}
          className="btn-secondary disabled:cursor-not-allowed disabled:opacity-40"
        >
          Export CSV
        </button>
      </div>

      <VariantTable variants={filteredVariants} />
    </div>
  );
}
