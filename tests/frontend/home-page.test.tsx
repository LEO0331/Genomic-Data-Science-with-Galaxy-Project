import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

describe("HomePage", () => {
  it("renders hero content and primary navigation links", () => {
    render(<HomePage />);

    expect(screen.getByText("Bioinformatics Workflow Case Study")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /Galaxy Variant Calling Results, Presented as a Modern Interactive Engineering Portfolio/i
      })
    ).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "Open Variant Explorer" })).toHaveAttribute("href", "/variants");
    expect(screen.getByRole("link", { name: "Review Workflow" })).toHaveAttribute("href", "/workflow");
  });

  it("renders all highlight cards", () => {
    render(<HomePage />);

    const workflowLinks = screen.getAllByRole("link", { name: /Workflow/i });
    const variantLinks = screen.getAllByRole("link", { name: /Variant Explorer/i });
    const downloadLinks = screen.getAllByRole("link", { name: /Downloads/i });

    expect(workflowLinks.some((link) => link.getAttribute("href") === "/workflow")).toBe(true);
    expect(variantLinks.some((link) => link.getAttribute("href") === "/variants")).toBe(true);
    expect(downloadLinks.some((link) => link.getAttribute("href") === "/downloads")).toBe(true);
  });
});
