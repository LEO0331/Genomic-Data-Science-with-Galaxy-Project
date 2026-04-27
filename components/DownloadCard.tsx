import Link from "next/link";

type DownloadCardProps = {
  title: string;
  description: string;
  fileName: string;
  href: string;
  ctaLabel?: string;
};

export function DownloadCard({ title, description, fileName, href, ctaLabel = "Download" }: DownloadCardProps) {
  return (
    <article className="card-surface flex flex-col justify-between gap-4 p-6">
      <div>
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <p className="mt-2 text-sm text-slate-300">{description}</p>
        <p className="mt-3 rounded-md border border-slate-700 bg-slate-800 px-2 py-1 font-mono text-xs text-cyan-200">
          {fileName}
        </p>
      </div>
      <Link
        href={href}
        className="inline-flex w-fit rounded-md bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
      >
        {ctaLabel}
      </Link>
    </article>
  );
}
