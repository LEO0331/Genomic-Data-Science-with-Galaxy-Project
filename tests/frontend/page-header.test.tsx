import { render, screen } from "@testing-library/react";
import { PageHeader } from "@/components/PageHeader";

describe("PageHeader", () => {
  it("renders eyebrow, title, and description", () => {
    render(
      <PageHeader
        eyebrow="Client-Side Analysis"
        title="VCF Variant Explorer"
        description="Inspect variants in-browser."
      />
    );

    expect(screen.getByText("Client-Side Analysis")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "VCF Variant Explorer" })).toBeInTheDocument();
    expect(screen.getByText("Inspect variants in-browser.")).toBeInTheDocument();
  });
});
