import path from "node:path";
import { expect, test } from "@playwright/test";

test.describe("Variant explorer", () => {
  test("loads built-in sample and supports CSV export", async ({ page }) => {
    await page.goto("/variants");

    await page.getByRole("button", { name: "Load Sample VCF" }).click();

    await expect(page.getByText(/Loaded sample VCF with \d+ variants\./)).toBeVisible();
    await expect(page.locator("tbody tr").first()).toBeVisible();

    const chromosomeSelect = page.locator('label:has-text("Chromosome") select');
    const options = await chromosomeSelect.locator("option").allTextContents();
    const firstChromosome = options.find((value) => value !== "ALL");

    if (firstChromosome) {
      await chromosomeSelect.selectOption(firstChromosome);
      await expect(page.locator("tbody tr").first()).toBeVisible();
    }

    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("button", { name: "Export CSV" }).click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe("filtered-variants.csv");
  });

  test("uploads a local VCF file", async ({ page }) => {
    await page.goto("/variants");

    const fixturePath = path.resolve(process.cwd(), "public/filtered-variants.vcf");
    await page.locator('input[type="file"]').setInputFiles(fixturePath);

    await expect(page.getByText(/Loaded filtered-variants\.vcf with \d+ variants\./)).toBeVisible();
    await expect(page.locator("tbody tr").first()).toBeVisible();
  });
});
