import { expect, test } from "@playwright/test";

test.describe("Portfolio frontend routes", () => {
  test("home page renders core content", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: /Galaxy Variant Calling Results/i })).toBeVisible();
    await expect(page.getByRole("link", { name: "Open Variant Explorer" })).toBeVisible();
  });

  test("workflow page renders timeline", async ({ page }) => {
    await page.goto("/workflow");

    await expect(page.getByRole("heading", { name: "Variant Calling Workflow" })).toBeVisible();
    await expect(page.getByText(/^Step 1$/)).toBeVisible();
    await expect(page.getByText("FastQC Quality Control")).toBeVisible();
  });

  test("downloads page exposes artifact links", async ({ page }) => {
    await page.goto("/downloads");

    await expect(page.getByRole("heading", { name: "Downloads & Artifacts" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Download" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Open" })).toBeVisible();
  });
});
