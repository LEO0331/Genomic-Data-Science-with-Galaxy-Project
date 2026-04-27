import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";

const displayFont = Fraunces({
  subsets: ["latin"],
  variable: "--font-display"
});

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body"
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono"
});

export const metadata: Metadata = {
  title: {
    default: "Galaxy Genomic Variant Workflow Case Study",
    template: "%s | Galaxy Variant Case Study"
  },
  description:
    "Interactive web presentation and VCF exploration tool based on a Galaxy genomic variant-calling workflow.",
  applicationName: "Galaxy Variant Case Study",
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    type: "website",
    title: "Galaxy Genomic Variant Workflow Case Study",
    description:
      "Interactive web presentation and VCF exploration tool based on a Galaxy genomic variant-calling workflow."
  },
  twitter: {
    card: "summary_large_image",
    title: "Galaxy Genomic Variant Workflow Case Study",
    description:
      "Interactive web presentation and VCF exploration tool based on a Galaxy genomic variant-calling workflow."
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#070b16"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[999] focus:rounded-md focus:bg-[var(--accent)] focus:px-3 focus:py-2 focus:text-black"
        >
          Skip to content
        </a>
        <div className="site-bg" aria-hidden="true" />
        <div className="relative z-10 flex min-h-screen flex-col">
          <NavBar />
          <main id="main-content" className="main-container flex-1 py-8 sm:py-12">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
