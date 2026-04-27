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
    <article className="card-surface group flex flex-col justify-between gap-4 p-6 transition duration-300 hover:-translate-y-1 hover:border-[var(--line-strong)]">
      <div>
        <h2 className="display-title text-2xl text-white transition group-hover:text-[var(--accent)]">{title}</h2>
        <p className="mt-2 text-sm text-[var(--text-muted)]">{description}</p>
        <p className="mono-data mt-4 rounded-md border border-[var(--line)] bg-[rgba(217,237,255,0.05)] px-2 py-1 text-xs text-[var(--accent)]">
          {fileName}
        </p>
      </div>
      <Link
        href={href}
        className="btn-primary inline-flex w-fit"
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
      >
        {ctaLabel}
      </Link>
    </article>
  );
}
