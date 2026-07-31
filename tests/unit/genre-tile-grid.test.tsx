import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { GenreTileGrid } from "@/components/music/GenreTileGrid";

describe("GenreTileGrid", () => {
  it("renders all genre tiles", () => {
    render(<GenreTileGrid />);
    expect(screen.getByText("Buồn")).toBeInTheDocument();
    expect(screen.getByText("Electronic")).toBeInTheDocument();
  });

  it("encodes Vietnamese genre links", () => {
    render(<GenreTileGrid />);
    const link = screen.getByText("Buồn").closest("a");
    expect(link).toHaveAttribute("href", "/tag/Bu%E1%BB%93n");
  });
});
