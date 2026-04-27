import type { Metadata } from "next";
import "./globals.css";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Galaxy Genomic Variant Workflow Case Study",
  description:
    "Interactive web presentation and VCF exploration tool based on a Galaxy genomic variant-calling workflow."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col">
          <NavBar />
          <main className="main-container flex-1 py-10">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
