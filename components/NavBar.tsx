import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/workflow", label: "Workflow" },
  { href: "/variants", label: "Variant Explorer" },
  { href: "/downloads", label: "Downloads" }
];

export function NavBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[rgba(5,10,18,0.8)] backdrop-blur-xl">
      <div className="main-container flex items-center justify-between py-4">
        <Link href="/" className="mono-data text-xs tracking-[0.2em] text-[var(--accent)] sm:text-sm">
          GENOME.CASESTUDY
        </Link>
        <nav className="flex gap-1 sm:gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-xs uppercase tracking-[0.14em] text-[var(--text-muted)] transition hover:bg-[rgba(217,237,255,0.08)] hover:text-[var(--text)] sm:text-sm"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
