type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <header className="card-surface page-hero p-6 sm:p-8">
      <p className="label-chip">{eyebrow}</p>
      <h1 className="display-title mt-4 text-4xl text-white sm:text-5xl">{title}</h1>
      <p className="mt-3 max-w-3xl text-[var(--text-muted)]">{description}</p>
    </header>
  );
}
