import { WorkflowStep } from "@/lib/types";

export const workflowSteps: WorkflowStep[] = [
  {
    id: "fastq-input",
    title: "FASTQ Input",
    category: "Input",
    description: "Load father-mother-child paired-end FASTQ datasets into Galaxy.",
    purpose: "Establishes standardized sequence inputs for reproducible downstream analysis."
  },
  {
    id: "fastqc",
    title: "FastQC Quality Control",
    category: "QC",
    description: "Runs FastQC on raw sequencing reads to inspect quality metrics.",
    purpose: "Identifies low-quality cycles, adapter content, and sequencing bias before mapping."
  },
  {
    id: "bowtie2",
    title: "Bowtie2 Mapping",
    category: "Alignment",
    description: "Aligns paired-end reads to the hg19 reference genome using Bowtie2.",
    purpose: "Generates coordinate-aware read mappings required for variant calling."
  },
  {
    id: "add-replace-rg",
    title: "Add/Replace Read Groups",
    category: "BAM Processing",
    description: "Adds standardized read-group metadata to BAM files.",
    purpose: "Preserves sample provenance and supports compatibility with downstream tools."
  },
  {
    id: "merge-bam",
    title: "Merge BAM",
    category: "BAM Processing",
    description: "Merges sample-level BAM outputs into a unified alignment dataset.",
    purpose: "Consolidates mapped reads into a single source for filtering and calling."
  },
  {
    id: "filter-low-quality",
    title: "Filter Low Quality Reads",
    category: "Filtering",
    description: "Removes weak or low-confidence mapped reads from BAM data.",
    purpose: "Reduces noise to improve precision in downstream duplicate marking and calling."
  },
  {
    id: "mark-duplicates",
    title: "Mark Duplicates",
    category: "BAM Processing",
    description: "Flags duplicate alignments likely originating from PCR artifacts.",
    purpose: "Prevents duplicated evidence from biasing variant frequency estimates."
  },
  {
    id: "cleansam",
    title: "CleanSam",
    category: "BAM Processing",
    description: "Normalizes and cleans BAM formatting inconsistencies.",
    purpose: "Ensures alignment files are valid and robust for variant-caller consumption."
  },
  {
    id: "freebayes",
    title: "FreeBayes Variant Calling",
    category: "Variant Calling",
    description: "Calls candidate polymorphic sites from processed BAM alignments.",
    purpose: "Transforms cleaned alignments into a variant-level VCF call set."
  },
  {
    id: "vcffilter",
    title: "VCFfilter",
    category: "Filtering",
    description: "Applies quality-driven filters to reduce false-positive variant calls.",
    purpose: "Retains high-confidence polymorphic sites for biological interpretation."
  },
  {
    id: "annovar",
    title: "ANNOVAR Annotation",
    category: "Annotation",
    description: "Annotates filtered VCF records with gene-level and functional context.",
    purpose: "Maps variants to biological entities to support interpretation and reporting."
  },
  {
    id: "variant-count-by-gene",
    title: "Variant Count by Gene",
    category: "Reporting",
    description: "Aggregates annotated variants to summarize counts per gene.",
    purpose: "Provides interpretable outputs for ranking and downstream case-study insights."
  }
];
