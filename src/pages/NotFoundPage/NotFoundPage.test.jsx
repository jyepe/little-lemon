import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import NotFoundPage from "./NotFoundPage";

function renderNotFound() {
    return render(
        <MemoryRouter>
            <NotFoundPage />
        </MemoryRouter>
    );
}

describe("NotFoundPage", () => {
    it("renders the 404 code", () => {
        renderNotFound();
        expect(
            screen.getByRole("heading", { level: 1, name: "404" })
        ).toBeInTheDocument();
    });

    it("renders the 'Page Not Found' title", () => {
        renderNotFound();
        expect(
            screen.getByRole("heading", { level: 2, name: /Page Not Found/i })
        ).toBeInTheDocument();
    });

    it("renders a descriptive message", () => {
        renderNotFound();
        expect(
            screen.getByText(/the page you are looking for/i)
        ).toBeInTheDocument();
    });

    it("renders a link back to the homepage", () => {
        renderNotFound();
        const link = screen.getByRole("link", { name: /Return to homepage/i });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "/");
    });

    it("has an accessible section label", () => {
        renderNotFound();
        expect(screen.getByLabelText("Page not found")).toBeInTheDocument();
    });
});
