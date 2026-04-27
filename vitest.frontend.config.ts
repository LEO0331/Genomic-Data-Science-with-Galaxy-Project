import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    name: "frontend",
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup/frontend.setup.tsx"],
    include: ["tests/frontend/**/*.test.ts", "tests/frontend/**/*.test.tsx"],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
      reportsDirectory: "coverage/frontend",
      include: ["app/page.tsx", "components/VariantSummaryCards.tsx", "components/WorkflowStepCard.tsx", "lib/vcf.ts"],
      thresholds: {
        lines: 85,
        functions: 85,
        branches: 85,
        statements: 85
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, ".")
    }
  }
});
