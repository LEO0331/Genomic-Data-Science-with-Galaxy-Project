# Genome Variant Case Study Explorer

A customer-facing web app for presenting genomic variant-calling results from a Galaxy workflow.

This project turns offline bioinformatics outputs into a clear, interactive web experience with:
- visual workflow storytelling
- in-browser VCF exploration
- downloadable project artifacts

## Product Positioning

This is an **interactive web presentation and VCF exploration tool** built on top of results generated in Galaxy.

It is designed for:
- bioinformatics project demos
- portfolio/case-study presentation
- stakeholder-friendly result review

## What You Can Do

- Explore the workflow steps on `/workflow`
- Open and filter variant records on `/variants`
- Load bundled sample VCF data or upload a local `.vcf`
- Export filtered results to CSV
- Download published project artifacts on `/downloads`

## What This App Is Not

- Not an online Galaxy replacement
- Not a raw FASTQ/BAM processing platform
- Not a server-side variant-calling service

All heavy genomic computation (QC, alignment, calling, filtering, annotation) is performed outside this app.

## Core Workflow Context

The source analysis pipeline includes:
- FastQC
- Bowtie2
- BAM processing (read groups, merge, filtering, duplicate marking, cleanup)
- FreeBayes
- VCFfilter
- ANNOVAR

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Client-side VCF parsing
- Deployable on Vercel

## Local Development

```bash
npm install
npm run dev
```

Open: [http://localhost:3000](http://localhost:3000)

## Quality Checks

```bash
npm run lint
npm run typecheck
npm run build
npm run coverage
npm run test:e2e
```

Coverage is enforced at **>=85%** for frontend and backend lanes.

## CI/CD

- Lighthouse CI: `.github/workflows/lighthouse-ci.yml`
- E2E CI (Playwright): `.github/workflows/e2e.yml`
- Unit coverage CI: `.github/workflows/test-coverage.yml`
- Deployment (Vercel): `.github/workflows/deploy.yml`

Required deployment secrets:
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

## Public Artifacts

Bundled web-safe artifacts:
- `public/galaxy-workflow.ga`
- `public/galaxy-project.pdf`
- `public/filtered-variants.vcf`

## Privacy and Data Handling

- Uploaded VCF files are parsed in-browser.
- No raw sequencing compute is executed online by this app.
- For production use, do not upload sensitive or regulated genomic data unless your hosting and compliance requirements are fully addressed.
