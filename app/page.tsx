import Link from "next/link";

const tools = [
  "FastQC",
  "Bowtie2",
  "AddOrReplaceReadGroups",
  "MergeSamFiles",
  "MarkDuplicates",
  "CleanSam",
  "FreeBayes",
  "VCFfilter",
  "ANNOVAR"
];

const highlights = [
  {
    title: "Workflow",
    description: "Step-by-step Galaxy pipeline from FASTQ quality control to annotated variant reporting.",
    href: "/workflow"
  },
  {
    title: "Variant Explorer",
    description: "Client-side VCF viewer with search, chromosome/type filters, and CSV export.",
    href: "/variants"
  },
  {
    title: "Downloads",
    description: "Direct access to workflow, PDF project report, and filtered variant artifacts.",
    href: "/downloads"
  }
];

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="card-surface p-6 sm:p-10">
        <p className="mb-3 inline-block rounded-full border border-cyan-500/40 bg-cyan-500/10 px-3 py-1 font-mono text-xs text-cyan-300">
          Bioinformatics Workflow Case Study
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
          Galaxy-Based Genomic Variant Calling, Reframed as an Interactive Portfolio Web App
        </h1>
        <p className="mt-4 max-w-3xl text-slate-300">
          This project analyzes DNA polymorphic sites from father-mother-child paired-end resequencing data. Heavy
          genomic computation was performed in Galaxy, while this website presents the workflow, artifacts, and VCF
          results in a portfolio-friendly interactive format.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <article className="card-surface p-6">
          <h2 className="text-xl font-semibold text-white">Project Overview</h2>
          <p className="mt-3 text-slate-300">
            The original pipeline demonstrates quality control, alignment, BAM processing, variant calling, filtering,
            annotation, and result interpretation. This web app positions the work as engineering-driven scientific
            communication rather than an online raw-sequencing compute platform.
          </p>
        </article>
        <article className="card-surface p-6">
          <h2 className="text-xl font-semibold text-white">Tech Stack & Tools</h2>
          <p className="mt-3 text-slate-300">
            Frontend: <span className="font-mono">Next.js + TypeScript + Tailwind CSS</span>
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {tools.map((tool) => (
              <span key={tool} className="rounded-md border border-slate-700 bg-slate-800 px-2 py-1 font-mono text-xs">
                {tool}
              </span>
            ))}
          </div>
        </article>
      </section>

      <section className="card-surface p-6">
        <h2 className="text-xl font-semibold text-white">Workflow Summary</h2>
        <p className="mt-3 text-slate-300">
          FASTQ input and QC with FastQC are followed by Bowtie2 mapping, read-group and BAM cleanup, FreeBayes
          variant calling, VCF filtering, and ANNOVAR-based annotation before gene-level variant counting.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {highlights.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="card-surface p-6 transition hover:border-cyan-400/40 hover:bg-slate-900"
          >
            <h3 className="text-lg font-semibold text-white">{item.title}</h3>
            <p className="mt-2 text-sm text-slate-300">{item.description}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
