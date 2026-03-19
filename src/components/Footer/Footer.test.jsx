import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import Footer from "./Footer";

function renderFooter() {
    return render(
        <MemoryRouter>
            <Footer />
        </MemoryRouter>
    );
}

describe("Footer", () => {
    it("renders the footer logo", () => {
        renderFooter();
        const logo = screen.getByAltText("Little Lemon logo");
        expect(logo).toBeInTheDocument();
        expect(logo).toHaveAttribute("src", "/Logo.svg");
    });

    it("renders all navigation links", () => {
        renderFooter();
        const expectedLinks = [
            "Home",
            "About",
            "Menu",
            "Reservations",
            "Order Online",
            "Login",
        ];
        expectedLinks.forEach((label) => {
            expect(screen.getByRole("link", { name: label })).toBeInTheDocument();
        });
    });

    it("renders contact information", () => {
        renderFooter();
        expect(screen.getByText("123 Lemon Street")).toBeInTheDocument();
        expect(screen.getByText("Chicago, IL 60601")).toBeInTheDocument();
        expect(screen.getByText("(312) 555-1234")).toBeInTheDocument();
        expect(screen.getByText("info@littlelemon.com")).toBeInTheDocument();
    });

    it("renders phone link with correct href", () => {
        renderFooter();
        const phoneLink = screen.getByText("(312) 555-1234");
        expect(phoneLink).toHaveAttribute("href", "tel:+13125551234");
    });

    it("renders email link with correct href", () => {
        renderFooter();
        const emailLink = screen.getByText("info@littlelemon.com");
        expect(emailLink).toHaveAttribute("href", "mailto:info@littlelemon.com");
    });

    it("renders social media links that open in new tab", () => {
        renderFooter();
        const socialLinks = ["Facebook", "Instagram", "Twitter"];
        socialLinks.forEach((label) => {
            const link = screen.getByRole("link", { name: label });
            expect(link).toHaveAttribute("target", "_blank");
            expect(link).toHaveAttribute("rel", "noopener noreferrer");
        });
    });

    it("renders copyright text", () => {
        renderFooter();
        expect(
            screen.getByText(/© 2026 Little Lemon\. All rights reserved\./)
        ).toBeInTheDocument();
    });

    it("has footer navigation with accessible label", () => {
        renderFooter();
        const nav = screen.getByRole("navigation", {
            name: "Footer navigation",
        });
        expect(nav).toBeInTheDocument();
    });

    it("has contentinfo role", () => {
        renderFooter();
        expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    });
});
