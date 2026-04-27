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
      <section className="card-surface page-hero motion-rise p-6 sm:p-10">
        <p className="label-chip">Bioinformatics Workflow Case Study</p>
        <h1 className="display-title mt-4 max-w-5xl text-4xl leading-[1.02] text-white sm:text-6xl">
          Galaxy Variant Calling Results, Presented as a Modern Interactive Engineering Portfolio
        </h1>
        <p className="mt-5 max-w-3xl text-base text-[var(--text-muted)] sm:text-lg">
          This project analyzes DNA polymorphic sites from father-mother-child paired-end resequencing data. Heavy
          genomic computation was performed in Galaxy, while this web app focuses on transparent workflow
          communication and interactive VCF result exploration.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/variants" className="btn-primary">
            Open Variant Explorer
          </Link>
          <Link href="/workflow" className="btn-secondary">
            Review Workflow
          </Link>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-5">
        <article className="card-surface md:col-span-3 p-6">
          <h2 className="display-title text-2xl text-white sm:text-3xl">Project Positioning</h2>
          <p className="mt-3 text-[var(--text-muted)]">
            This site does not replace Galaxy and does not run raw sequencing workloads online. It presents the actual
            Galaxy pipeline and lets viewers inspect filtered results in-browser as a portfolio-ready engineering case
            study.
          </p>
        </article>
        <article className="card-surface md:col-span-2 p-6">
          <h2 className="display-title text-2xl text-white sm:text-3xl">Tech & Toolchain</h2>
          <p className="mt-3 text-[var(--text-muted)]">
            Frontend: <span className="mono-data">Next.js + TypeScript + Tailwind CSS</span>
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {tools.map((tool) => (
              <span
                key={tool}
                className="mono-data rounded-md border border-[var(--line)] bg-[rgba(217,237,255,0.05)] px-2 py-1 text-[11px] text-[var(--accent)]"
              >
                {tool}
              </span>
            ))}
          </div>
        </article>
      </section>

      <section className="card-surface p-6">
        <h2 className="display-title text-2xl text-white sm:text-3xl">Workflow Summary</h2>
        <p className="mt-3 max-w-4xl text-[var(--text-muted)]">
          FASTQ input and QC with FastQC are followed by Bowtie2 mapping, read-group and BAM cleanup, FreeBayes
          variant calling, VCF filtering, ANNOVAR annotation, and gene-level variant counting for interpretation.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {highlights.map((item, index) => (
          <Link
            key={item.href}
            href={item.href}
            className="card-surface motion-rise group p-6 transition duration-300 hover:-translate-y-1 hover:border-[var(--line-strong)]"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <h3 className="display-title text-2xl text-white transition group-hover:text-[var(--accent)]">{item.title}</h3>
            <p className="mt-2 text-sm text-[var(--text-muted)]">{item.description}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
