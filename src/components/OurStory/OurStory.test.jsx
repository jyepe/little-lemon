import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import OurStory from "./OurStory";

describe("OurStory", () => {
    it("renders the section title", () => {
        render(<OurStory />);
        expect(
            screen.getByRole("heading", { level: 2, name: /Little Lemon/i })
        ).toBeInTheDocument();
    });

    it("renders the subtitle", () => {
        render(<OurStory />);
        expect(
            screen.getByRole("heading", { level: 3, name: /Chicago/i })
        ).toBeInTheDocument();
    });

    it("renders the description text", () => {
        render(<OurStory />);
        expect(
            screen.getByText(/charming neighborhood bistro/i)
        ).toBeInTheDocument();
    });

    it("renders both images with correct alt text", () => {
        render(<OurStory />);
        expect(
            screen.getByAltText(/Mediterranean dish/i)
        ).toBeInTheDocument();
        expect(
            screen.getByAltText(/chefs preparing food/i)
        ).toBeInTheDocument();
    });

    it("has an accessible section label", () => {
        render(<OurStory />);
        expect(screen.getByLabelText("Our Story")).toBeInTheDocument();
    });
});
