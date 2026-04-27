export function Footer() {
  return (
    <footer className="border-t border-[var(--line)]">
      <div className="main-container flex flex-col gap-2 py-8 text-xs text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between sm:text-sm">
        <p>Interactive web presentation and VCF exploration tool based on a Galaxy genomic variant-calling workflow.</p>
        <p className="mono-data text-[10px] uppercase tracking-[0.18em] sm:text-xs">Next.js · TypeScript · Tailwind · Vercel</p>
      </div>
    </footer>
  );
}
