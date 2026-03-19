import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import HomePage from "./HomePage";

function renderHomePage() {
    return render(
        <MemoryRouter>
            <HomePage />
        </MemoryRouter>
    );
}

describe("HomePage", () => {
    it("renders the Hero section", () => {
        renderHomePage();
        expect(
            screen.getByRole("heading", { level: 1, name: "Little Lemon" })
        ).toBeInTheDocument();
    });

    it("renders the Specials section", () => {
        renderHomePage();
        expect(
            screen.getByRole("heading", {
                level: 2,
                name: /This weeks specials/i,
            })
        ).toBeInTheDocument();
    });

    it("renders the Reserve a Table CTA", () => {
        renderHomePage();
        expect(
            screen.getByRole("link", { name: /Reserve a table/i })
        ).toBeInTheDocument();
    });

    it("renders all special menu items", () => {
        renderHomePage();
        expect(screen.getByText("Greek salad")).toBeInTheDocument();
        expect(screen.getByText("Bruschetta")).toBeInTheDocument();
        expect(screen.getByText("Lemon Dessert")).toBeInTheDocument();
    });
});
