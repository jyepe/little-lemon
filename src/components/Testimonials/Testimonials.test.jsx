import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Testimonials from "./Testimonials";

describe("Testimonials", () => {
    it("renders the section title", () => {
        render(<Testimonials />);
        expect(
            screen.getByRole("heading", { level: 2, name: /testimonials/i })
        ).toBeInTheDocument();
    });

    it("renders all 4 testimonial names", () => {
        render(<Testimonials />);
        expect(screen.getByText("Anthony")).toBeInTheDocument();
        expect(screen.getByText("Mary")).toBeInTheDocument();
        expect(screen.getByText("John")).toBeInTheDocument();
        expect(screen.getByText("Sarah")).toBeInTheDocument();
    });

    it("renders 4 avatar images with correct alt text", () => {
        render(<Testimonials />);
        const avatars = screen.getAllByRole("img");
        expect(avatars).toHaveLength(4);
        expect(screen.getByAltText("Anthony")).toBeInTheDocument();
        expect(screen.getByAltText("Mary")).toBeInTheDocument();
        expect(screen.getByAltText("John")).toBeInTheDocument();
        expect(screen.getByAltText("Sarah")).toBeInTheDocument();
    });

    it("renders star ratings for each testimonial", () => {
        render(<Testimonials />);
        const ratings = screen.getAllByLabelText(/out of 5 stars/i);
        expect(ratings).toHaveLength(4);
    });

    it("renders review text in each card", () => {
        render(<Testimonials />);
        const reviews = screen.getAllByText(/Lorem ipsum dolor sit amet/i);
        expect(reviews).toHaveLength(4);
    });

    it("has an accessible section label", () => {
        render(<Testimonials />);
        const section = screen.getByLabelText("Customer testimonials");
        expect(section).toBeInTheDocument();
    });
});
