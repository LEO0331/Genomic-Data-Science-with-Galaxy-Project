"use client";

type VcfUploaderProps = {
  onFileSelected: (file: File) => void;
};

export function VcfUploader({ onFileSelected }: VcfUploaderProps) {
  return (
    <label className="card-surface flex cursor-pointer flex-col gap-3 p-5 text-sm text-[var(--text-muted)] transition hover:border-[var(--line-strong)]">
      <span className="display-title text-2xl text-white">Upload VCF File</span>
      <span>
        Choose a local <span className="mono-data">.vcf</span> file to parse in the browser.
      </span>
      <input
        className="block w-full text-sm file:mr-3 file:rounded-md file:border file:border-[var(--line)] file:bg-[rgba(143,243,223,0.1)] file:px-3 file:py-2 file:font-mono file:text-[var(--accent)]"
        type="file"
        accept=".vcf,text/plain"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) {
            onFileSelected(file);
          }
        }}
      />
    </label>
  );
}
