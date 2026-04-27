"use client";

import { useMemo, useState } from "react";
import { VariantRecord, VariantType } from "@/lib/types";
import { VariantTable } from "@/components/VariantTable";
import { VariantSummaryCards } from "@/components/VariantSummaryCards";
import { VcfUploader } from "@/components/VcfUploader";

type ParseResult = {
  variants: VariantRecord[];
  error?: string;
};

const SAMPLE_VCF_PATH = "/filtered-variants.vcf";

function detectVariantType(ref: string, alt: string): VariantType {
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

function parseVcf(content: string): ParseResult {
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

function toCsv(variants: VariantRecord[]): string {
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

function downloadCsv(variants: VariantRecord[]) {
  const csv = toCsv(variants);
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
  }, [variants, search, chromosomeFilter, typeFilter]);

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
      if (result.error) {
        setVariants([]);
        setStatusMessage(result.error);
        return;
      }
      setVariants(result.variants);
      setStatusMessage(`Loaded sample VCF with ${result.variants.length} variants.`);
    } catch {
      setStatusMessage("Failed to load sample VCF.");
    }
  }

  async function handleFile(file: File) {
    if (!file.name.toLowerCase().endsWith(".vcf")) {
      setVariants([]);
      setStatusMessage("Invalid file type. Please upload a .vcf file.");
      return;
    }

    const text = await file.text();
    const result = parseVcf(text);
    if (result.error) {
      setVariants([]);
      setStatusMessage(result.error);
      return;
    }
    setVariants(result.variants);
    setStatusMessage(`Loaded ${file.name} with ${result.variants.length} variants.`);
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-2">
        <VcfUploader onFileSelected={handleFile} />
        <div className="card-surface flex flex-col justify-between gap-3 p-4">
          <div>
            <h2 className="text-lg font-semibold text-white">Load Built-In Sample</h2>
            <p className="mt-2 text-sm text-slate-300">
              Use the filtered VCF artifact packaged from this Galaxy project.
            </p>
          </div>
          <button
            type="button"
            onClick={loadSampleVcf}
            className="w-fit rounded-md bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Load Sample VCF
          </button>
          <p className="text-xs text-slate-400">{statusMessage}</p>
        </div>
      </div>

      <VariantSummaryCards variants={filteredVariants} />

      <div className="card-surface grid gap-3 p-4 md:grid-cols-[2fr_1fr_1fr_auto] md:items-end">
        <label className="text-sm text-slate-300">
          Search
          <input
            className="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 font-mono text-sm"
            placeholder="chr, pos, id, ref, alt, filter, info"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>

        <label className="text-sm text-slate-300">
          Chromosome
          <select
            className="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 font-mono text-sm"
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

        <label className="text-sm text-slate-300">
          Variant Type
          <select
            className="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 font-mono text-sm"
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
          className="rounded-md bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-950 transition enabled:hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          Export CSV
        </button>
      </div>

      <VariantTable variants={filteredVariants} />
    </div>
  );
}
