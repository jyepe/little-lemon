import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import GuestDetails from "./GuestDetails";

const baseData = {
    date: "2026-03-20",
    partySize: "2",
    occasion: "Birthday",
    time: "8:00 PM",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialInstructions: "",
};

const filledData = {
    ...baseData,
    firstName: "Mario",
    lastName: "Rossi",
    email: "mario@example.com",
    phone: "3125551234",
};

function renderGuestDetails(data = baseData, overrides = {}) {
    const onUpdate = overrides.onUpdate || vi.fn();
    const onNext = overrides.onNext || vi.fn();
    const onEdit = overrides.onEdit || vi.fn();
    render(
        <GuestDetails
            data={data}
            onUpdate={onUpdate}
            onNext={onNext}
            onEdit={onEdit}
        />
    );
    return { onUpdate, onNext, onEdit };
}

describe("GuestDetails", () => {
    it("renders reservation summary with date and time", () => {
        renderGuestDetails();
        expect(screen.getByText(/8:00 PM/)).toBeInTheDocument();
    });

    it("renders party size in summary", () => {
        renderGuestDetails();
        expect(screen.getByText(/Party of 2 Guests/)).toBeInTheDocument();
    });

    it("displays occasion in summary when provided", () => {
        renderGuestDetails();
        expect(screen.getByText(/Birthday/)).toBeInTheDocument();
    });

    it("does not display occasion separator when no occasion is set", () => {
        const dataNoOccasion = { ...baseData, occasion: "" };
        renderGuestDetails(dataNoOccasion);
        const partyText = screen.getByText(/Party of 2/);
        expect(partyText.textContent).not.toContain("·");
    });

    it("shows singular 'Guest' for party of 1", () => {
        const dataPartyOne = { ...baseData, partySize: "1", occasion: "" };
        renderGuestDetails(dataPartyOne);
        const partyText = screen.getByText((content, element) => {
            return element?.className === "guest-details__summary-party" &&
                element?.textContent?.includes("1") &&
                element?.textContent?.includes("Guest") &&
                !element?.textContent?.includes("Guests");
        });
        expect(partyText).toBeInTheDocument();
    });

    it("renders all form fields", () => {
        renderGuestDetails();
        expect(screen.getByLabelText(/First Name/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Last Name/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email Address/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Phone Number/)).toBeInTheDocument();
        expect(
            screen.getByLabelText(/Special Instructions/)
        ).toBeInTheDocument();
    });

    it("disables submit button when required fields are empty", () => {
        renderGuestDetails();
        const submitBtn = screen.getByRole("button", {
            name: /Confirm your reservation/i,
        });
        expect(submitBtn).toBeDisabled();
    });

    it("enables submit button when all required fields are filled", () => {
        renderGuestDetails(filledData);
        const submitBtn = screen.getByRole("button", {
            name: /Confirm your reservation/i,
        });
        expect(submitBtn).not.toBeDisabled();
    });

    it("calls onUpdate when first name is typed", async () => {
        const user = userEvent.setup();
        const { onUpdate } = renderGuestDetails();
        const firstNameInput = screen.getByLabelText(/First Name/);
        await user.type(firstNameInput, "M");
        expect(onUpdate).toHaveBeenCalledWith({ firstName: "M" });
    });

    it("calls onNext on valid form submission", async () => {
        const user = userEvent.setup();
        const onNext = vi.fn();
        renderGuestDetails(filledData, { onNext });
        const submitBtn = screen.getByRole("button", {
            name: /Confirm your reservation/i,
        });
        await user.click(submitBtn);
        expect(onNext).toHaveBeenCalledOnce();
    });

    it("calls onEdit when Edit button is clicked", async () => {
        const user = userEvent.setup();
        const onEdit = vi.fn();
        renderGuestDetails(baseData, { onEdit });
        const editBtn = screen.getByRole("button", {
            name: /Edit reservation details/i,
        });
        await user.click(editBtn);
        expect(onEdit).toHaveBeenCalledOnce();
    });

    it("has an accessible form label", () => {
        renderGuestDetails();
        const form = screen.getByRole("form", {
            name: "Guest details form",
        });
        expect(form).toBeInTheDocument();
    });

    it("shows error message when phone number is invalid", () => {
        const invalidPhoneData = { ...filledData, phone: "123" };
        renderGuestDetails(invalidPhoneData);
        expect(
            screen.getByText("Please enter a valid 10-digit phone number")
        ).toBeInTheDocument();
    });

    it("does not show error message for a valid 10-digit phone", () => {
        renderGuestDetails(filledData);
        expect(
            screen.queryByText("Please enter a valid 10-digit phone number")
        ).not.toBeInTheDocument();
    });

    it("does not show error when phone field is empty", () => {
        renderGuestDetails(baseData);
        expect(
            screen.queryByText("Please enter a valid 10-digit phone number")
        ).not.toBeInTheDocument();
    });

    it("disables submit button when phone is invalid", () => {
        const invalidPhoneData = { ...filledData, phone: "123" };
        renderGuestDetails(invalidPhoneData);
        const submitBtn = screen.getByRole("button", {
            name: /Confirm your reservation/i,
        });
        expect(submitBtn).toBeDisabled();
    });

    it("does not call onNext when phone is invalid", async () => {
        const user = userEvent.setup();
        const onNext = vi.fn();
        const invalidPhoneData = { ...filledData, phone: "12345" };
        renderGuestDetails(invalidPhoneData, { onNext });
        const submitBtn = screen.getByRole("button", {
            name: /Confirm your reservation/i,
        });
        await user.click(submitBtn);
        expect(onNext).not.toHaveBeenCalled();
    });
});
