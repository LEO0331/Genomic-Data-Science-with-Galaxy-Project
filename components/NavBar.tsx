import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/workflow", label: "Workflow" },
  { href: "/variants", label: "Variant Explorer" },
  { href: "/downloads", label: "Downloads" }
];

export function NavBar() {
  return (
    <header className="border-b border-slate-800 bg-slate-950/90">
      <div className="main-container flex items-center justify-between py-4">
        <Link href="/" className="font-mono text-sm text-cyan-300 sm:text-base">
          galaxy-variant-case-study
        </Link>
        <nav className="flex gap-2 sm:gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
