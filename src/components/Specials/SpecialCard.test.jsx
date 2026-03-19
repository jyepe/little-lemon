import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SpecialCard from "./SpecialCard";

const mockProps = {
    image: "/greek-salad.jpg",
    title: "Greek Salad",
    price: "$12.99",
    description: "A fresh Mediterranean salad.",
};

describe("SpecialCard", () => {
    it("renders the title", () => {
        render(<SpecialCard {...mockProps} />);
        expect(
            screen.getByRole("heading", { level: 3, name: "Greek Salad" })
        ).toBeInTheDocument();
    });

    it("renders the price", () => {
        render(<SpecialCard {...mockProps} />);
        expect(screen.getByText("$12.99")).toBeInTheDocument();
    });

    it("renders the description", () => {
        render(<SpecialCard {...mockProps} />);
        expect(
            screen.getByText("A fresh Mediterranean salad.")
        ).toBeInTheDocument();
    });

    it("renders the image with correct src and alt", () => {
        render(<SpecialCard {...mockProps} />);
        const img = screen.getByAltText("Greek Salad");
        expect(img).toHaveAttribute("src", "/greek-salad.jpg");
    });

    it("renders an 'Order a delivery' link", () => {
        render(<SpecialCard {...mockProps} />);
        expect(screen.getByText(/Order a delivery/)).toBeInTheDocument();
    });

    it("has accessible aria-label combining title and price", () => {
        render(<SpecialCard {...mockProps} />);
        const article = screen.getByRole("article", {
            name: "Greek Salad - $12.99",
        });
        expect(article).toBeInTheDocument();
    });

    it("has an order link with accessible label for the specific dish", () => {
        render(<SpecialCard {...mockProps} />);
        const orderLink = screen.getByRole("link", {
            name: "Order a delivery of Greek Salad",
        });
        expect(orderLink).toBeInTheDocument();
    });
});
