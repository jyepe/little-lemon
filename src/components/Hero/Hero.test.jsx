import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import Hero from "./Hero";

function renderHero() {
    return render(
        <MemoryRouter>
            <Hero />
        </MemoryRouter>
    );
}

describe("Hero", () => {
    it("renders the title 'Little Lemon'", () => {
        renderHero();
        expect(
            screen.getByRole("heading", { level: 1, name: "Little Lemon" })
        ).toBeInTheDocument();
    });

    it("renders the subtitle 'Chicago'", () => {
        renderHero();
        expect(
            screen.getByRole("heading", { level: 2, name: "Chicago" })
        ).toBeInTheDocument();
    });

    it("renders the restaurant description", () => {
        renderHero();
        expect(
            screen.getByText(/family owned Mediterranean restaurant/)
        ).toBeInTheDocument();
    });

    it("renders the 'Reserve a Table' CTA linking to /reservations", () => {
        renderHero();
        const cta = screen.getByRole("link", {
            name: /Reserve a table/i,
        });
        expect(cta).toBeInTheDocument();
        expect(cta).toHaveAttribute("href", "/reservations");
    });

    it("renders the hero image with proper alt text", () => {
        renderHero();
        const img = screen.getByAltText(
            "Mario and Adrian preparing Mediterranean dishes"
        );
        expect(img).toBeInTheDocument();
    });

    it("has an accessible section label", () => {
        renderHero();
        const section = screen.getByLabelText("Welcome to Little Lemon");
        expect(section).toBeInTheDocument();
    });
});
