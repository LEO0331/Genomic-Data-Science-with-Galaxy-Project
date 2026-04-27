"use client";

type VcfUploaderProps = {
  onFileSelected: (file: File) => void;
};

export function VcfUploader({ onFileSelected }: VcfUploaderProps) {
  return (
    <label className="card-surface flex cursor-pointer flex-col gap-3 p-4 text-sm text-slate-300">
      <span className="font-semibold text-white">Upload VCF File</span>
      <span>Choose a local <span className="font-mono">.vcf</span> file to parse in the browser.</span>
      <input
        className="block w-full text-sm file:mr-3 file:rounded-md file:border-0 file:bg-cyan-500/20 file:px-3 file:py-2 file:font-mono file:text-cyan-200"
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
