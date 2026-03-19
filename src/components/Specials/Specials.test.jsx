import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Specials from "./Specials";

describe("Specials", () => {
    it("renders the section title", () => {
        render(<Specials />);
        expect(
            screen.getByRole("heading", { level: 2, name: /This weeks specials/i })
        ).toBeInTheDocument();
    });

    it("renders all 3 special cards", () => {
        render(<Specials />);
        expect(screen.getByText("Greek salad")).toBeInTheDocument();
        expect(screen.getByText("Bruschetta")).toBeInTheDocument();
        expect(screen.getByText("Lemon Dessert")).toBeInTheDocument();
    });

    it("renders the correct prices", () => {
        render(<Specials />);
        expect(screen.getByText("$12.99")).toBeInTheDocument();
        expect(screen.getByText("$5.99")).toBeInTheDocument();
        expect(screen.getByText("$5.00")).toBeInTheDocument();
    });

    it("renders the 'Online Menu' button", () => {
        render(<Specials />);
        const btn = screen.getByRole("button", { name: /View online menu/i });
        expect(btn).toBeInTheDocument();
    });

    it("has an accessible section label", () => {
        render(<Specials />);
        const section = screen.getByLabelText("This week's specials");
        expect(section).toBeInTheDocument();
    });
});
