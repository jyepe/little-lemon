import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import Confirmation from "./Confirmation";

const mockData = {
    date: "2026-03-20",
    partySize: "2",
    occasion: "Birthday",
    time: "8:00 PM",
    firstName: "Mario",
    lastName: "Rossi",
    email: "mario@example.com",
    phone: "3125551234",
    specialInstructions: "",
};

function renderConfirmation(data = mockData, overrides = {}) {
    const onBrowseMenu = overrides.onBrowseMenu || vi.fn();
    const onContinue = overrides.onContinue || vi.fn();
    render(
        <Confirmation
            data={data}
            onBrowseMenu={onBrowseMenu}
            onContinue={onContinue}
        />
    );
    return { onBrowseMenu, onContinue };
}

describe("Confirmation", () => {
    it("renders 'Table Reserved!' title", () => {
        renderConfirmation();
        expect(
            screen.getByRole("heading", { level: 1, name: "Table Reserved!" })
        ).toBeInTheDocument();
    });

    it("renders the confirmation subtitle", () => {
        renderConfirmation();
        expect(screen.getByText(/can't wait to host you/i)).toBeInTheDocument();
    });

    it("renders reservation details with date and time", () => {
        renderConfirmation();
        expect(screen.getByText(/8:00 PM/)).toBeInTheDocument();
    });

    it("renders party size", () => {
        renderConfirmation();
        expect(screen.getByText(/Party of 2 Guests/)).toBeInTheDocument();
    });

    it("renders occasion when provided", () => {
        renderConfirmation();
        expect(screen.getByText(/Birthday/)).toBeInTheDocument();
    });

    it("shows singular 'Guest' for party of 1", () => {
        const dataPartyOne = { ...mockData, partySize: "1", occasion: "" };
        renderConfirmation(dataPartyOne);
        const partyText = screen.getByText((content, element) => {
            return element?.className === "confirmation__card-party" &&
                element?.textContent?.includes("1") &&
                element?.textContent?.includes("Guest") &&
                !element?.textContent?.includes("Guests");
        });
        expect(partyText).toBeInTheDocument();
    });

    it("does not display occasion separator when no occasion", () => {
        const dataNoOccasion = { ...mockData, occasion: "" };
        renderConfirmation(dataNoOccasion);
        const partyText = screen.getByText(/Party of 2/);
        expect(partyText.textContent).not.toContain("·");
    });

    it("renders confirmation notice about email and SMS", () => {
        renderConfirmation();
        expect(
            screen.getByText(/Confirmation sent via Email & SMS/i)
        ).toBeInTheDocument();
    });

    it("calls onBrowseMenu when Browse Menu is clicked", async () => {
        const user = userEvent.setup();
        const onBrowseMenu = vi.fn();
        renderConfirmation(mockData, { onBrowseMenu });
        const btn = screen.getByRole("button", { name: /Browse the menu/i });
        await user.click(btn);
        expect(onBrowseMenu).toHaveBeenCalledOnce();
    });

    it("calls onContinue when Continue is clicked", async () => {
        const user = userEvent.setup();
        const onContinue = vi.fn();
        renderConfirmation(mockData, { onContinue });
        const btn = screen.getByRole("button", {
            name: /Return to home page/i,
        });
        await user.click(btn);
        expect(onContinue).toHaveBeenCalledOnce();
    });

    it("renders the 'Reservation Details' heading", () => {
        renderConfirmation();
        expect(
            screen.getByRole("heading", {
                level: 2,
                name: "Reservation Details",
            })
        ).toBeInTheDocument();
    });
});
