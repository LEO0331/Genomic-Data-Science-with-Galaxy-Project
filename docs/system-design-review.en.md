# System Design Review (English)

## 1. Scope and Product Boundary

This system is a **presentation and exploration layer** for genomic variant-calling outputs produced in Galaxy.

It intentionally does **not** execute raw sequencing compute (FASTQ/BAM alignment/calling) online.

### In-Scope
- Workflow storytelling UI
- Browser-based VCF parsing and filtering
- Artifact download surfaces
- Lightweight API utilities for health and variant summary

### Out-of-Scope
- Distributed genomic compute pipeline orchestration
- Multi-user auth and RBAC
- HIPAA/clinical-compliance data platform

---

## 2. High-Level Architecture

```mermaid
flowchart LR
  U[User Browser] --> N[Next.js App Router UI]
  N --> P[Public Artifacts /public/*.vcf *.ga *.pdf]
  N --> V[Client VCF Parser lib/vcf.ts]
  N --> A1[/api/health]
  N --> A2[/api/variants/summary]
  A2 --> V
  CI[GitHub Actions] --> QA[Lint + Typecheck + Coverage + E2E + Lighthouse]
  QA --> D[Deploy to Vercel]
```

### Key Design Choice
- **Primary data path is client-side parsing** for transparency, low ops cost, and fast iteration.
- Server API remains minimal and stateless.

---

## 3. Major Components and Responsibilities

1. `app/*` routes
- Page composition and navigation.
- `workflow`, `variants`, `downloads` domain pages.

2. `components/*`
- Reusable view units (timeline, tables, cards, uploader, page header).

3. `lib/vcf.ts`
- Core parser/filter/summary/CSV logic.
- Shared by frontend and backend route.

4. `app/api/*`
- `/api/health`: liveness signal.
- `/api/variants/summary`: validates payload and computes summary.

5. CI/CD workflows
- Quality gates: lint/typecheck/coverage/e2e/lighthouse.
- Deployment pipeline to Vercel.

---

## 4. Data Structures: Why These Choices

## 4.1 `VariantRecord[]` (array of typed records)

Chosen:
- VCF naturally maps to row-oriented records.
- Simple iteration for filters and rendering.
- Direct compatibility with table UI and CSV export.

Alternatives:
- `Map<string, VariantRecord[]>` keyed by chromosome
  - Better repeated chromosome queries, but more complexity for combined search.
- Columnar structure (`{chrom:[], pos:[]...}`)
  - Better for analytics scale, worse readability and ergonomics in UI code.

Tradeoff:
- Array + linear scan is O(n) per filter pass; acceptable for moderate VCF sizes and browser UX.

## 4.2 `Set<string>` for unique chromosomes

Chosen:
- O(1) average insert + concise unique counting.

Alternatives:
- Object dictionary (`Record<string, boolean>`)
  - Similar complexity, less semantic clarity.
- Sorting then counting transitions
  - More steps and less direct intent.

Tradeoff:
- `Set` is best readability/performance balance for this use case.

## 4.3 String-based CSV builder

Chosen:
- Minimal dependency footprint.
- Deterministic and fast for current payload sizes.

Alternatives:
- CSV libraries
  - Better edge handling and streaming, but extra dependency/security surface.

Tradeoff:
- Manual escaping is controlled and tested; if scale grows, consider streaming encoder.

## 4.4 Workflow definition as static `WorkflowStep[]`

Chosen:
- Deterministic content, easy translation/maintenance.
- No runtime network dependency.

Alternatives:
- CMS/JSON fetched at runtime
  - Better non-dev editing, but introduces API/CMS reliability concerns.

Tradeoff:
- Static config optimizes reliability; less dynamic authoring flexibility.

---

## 5. Architecture Tradeoffs

## 5.1 Client-side parsing first

Pros:
- Data stays in browser for local file uploads.
- Lower backend cost and simpler scaling model.
- Faster feedback for interactive filtering.

Cons:
- Browser memory/CPU constraints on very large VCFs.
- Device-dependent performance variability.

Mitigation:
- File-size guardrails (10 MB currently).
- Clear error states for invalid/oversized input.

## 5.2 Minimal backend

Pros:
- Smaller attack surface.
- Lower operational complexity.

Cons:
- Limited server-side analytics and centralized query capabilities.

Mitigation:
- Keep backend extension points (`/api/variants/summary`) for gradual expansion.

## 5.3 Strict CI gates

Pros:
- Prevents regressions in reliability, accessibility, and UX quality.

Cons:
- Longer pipeline time, occasional flaky browser-test risk.

Mitigation:
- Keep tests focused and deterministic.
- Maintain scoped retries only where justified.

---

## 6. Deep-Dive Questions and Prepared Answers

## Q1. Why not store variants in a database?
A:
- Product scope prioritizes interactive case-study exploration.
- Current workload is file-level ad hoc analysis, not multi-tenant query serving.
- Database can be introduced when requirements shift to persistence, collaboration, or large-scale querying.

## Q2. How does this scale for larger VCF files?
A:
- Current architecture targets moderate files with in-memory processing.
- Next steps: chunked parsing, Web Worker offloading, optional server-side batch summary APIs, and indexed backend storage.

## Q3. Why keep both client and API summary paths?
A:
- Client path supports privacy-preserving local exploration.
- API path enables validation and future backend expansion.
- Shared `lib/vcf.ts` keeps behavior consistent across both.

## Q4. What are the most important reliability controls?
A:
- Typed parser logic, error-state handling, coverage thresholds, e2e validation, and Lighthouse quality gates.

## Q5. What security boundaries exist today?
A:
- No auth-sensitive backend workflows.
- Input size limits on API payload.
- Security headers and dependency scanning in CI.

## Q6. If asked to support clinical-grade usage, what changes first?
A:
- Data governance/compliance controls, authz, audit logs, encryption posture, PHI handling workflow, and validated server-side processing boundaries.

---

## 7. Risks and Evolution Path

Current risks:
- Performance ceiling for large client-side files.
- Limited observability for production user behavior.

Planned evolution:
1. Web Worker parser path.
2. Optional backend summary/index service.
3. Persistent artifact metadata store.
4. Role-based access and audit logging if collaboration scope expands.
