export type VariantType = "SNP" | "Insertion" | "Deletion" | "Complex";

export type VariantRecord = {
  chrom: string;
  pos: number;
  id: string;
  ref: string;
  alt: string;
  qual: string;
  filter: string;
  info: string;
  type: VariantType;
};

export type WorkflowCategory =
  | "Input"
  | "QC"
  | "Alignment"
  | "BAM Processing"
  | "Variant Calling"
  | "Filtering"
  | "Annotation"
  | "Reporting";

export type WorkflowStep = {
  id: string;
  title: string;
  category: WorkflowCategory;
  description: string;
  purpose: string;
};
