import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import Header from "./Header";

function renderHeader(initialRoute = "/") {
    return render(
        <MemoryRouter initialEntries={[initialRoute]}>
            <Header />
        </MemoryRouter>
    );
}

describe("Header", () => {
    it("renders the logo with correct alt text", () => {
        renderHeader();
        const logo = screen.getByAltText("Little Lemon logo");
        expect(logo).toBeInTheDocument();
        expect(logo).toHaveAttribute("src", "/Logo.svg");
    });

    it("renders all 6 navigation links", () => {
        renderHeader();
        const expectedLinks = [
            "Home",
            "About",
            "Menu",
            "Reservations",
            "Order Online",
            "Login",
        ];
        expectedLinks.forEach((label) => {
            expect(screen.getByRole("menuitem", { name: label })).toBeInTheDocument();
        });
    });

    it("highlights the active link with aria-current='page'", () => {
        renderHeader("/reservations");
        const reservationsLink = screen.getByRole("menuitem", {
            name: "Reservations",
        });
        expect(reservationsLink).toHaveAttribute("aria-current", "page");
        expect(reservationsLink).toHaveClass("header__link--active");
    });

    it("does not mark inactive links as current", () => {
        renderHeader("/");
        const homeLink = screen.getByRole("menuitem", { name: "Home" });
        expect(homeLink).toHaveAttribute("aria-current", "page");

        const aboutLink = screen.getByRole("menuitem", { name: "About" });
        expect(aboutLink).not.toHaveAttribute("aria-current");
    });

    it("logo links to home page", () => {
        renderHeader();
        const logoLink = screen.getByLabelText("Little Lemon Home");
        expect(logoLink).toHaveAttribute("href", "/");
    });

    it("has a nav element with accessible label", () => {
        renderHeader();
        const nav = screen.getByRole("navigation", {
            name: "Main navigation",
        });
        expect(nav).toBeInTheDocument();
    });
});
