import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import ReserveTable from "./ReserveTable";

const MOCK_TIMES = ["17:00", "17:30", "18:00"];

const emptyData = {
    date: "",
    partySize: "",
    occasion: "",
    time: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialInstructions: "",
};

const filledData = {
    ...emptyData,
    date: "2026-03-20",
    partySize: "2",
    time: "17:00",
};

function renderReserveTable(data = emptyData, overrides = {}) {
    const onUpdate = vi.fn();
    const onNext = vi.fn();
    render(
        <ReserveTable
            data={data}
            availableTimes={overrides.availableTimes ?? MOCK_TIMES}
            onUpdate={overrides.onUpdate || onUpdate}
            onNext={overrides.onNext || onNext}
        />
    );
    return { onUpdate: overrides.onUpdate || onUpdate, onNext: overrides.onNext || onNext };
}

describe("ReserveTable", () => {
    it("renders date, party size, and occasion select fields", () => {
        renderReserveTable();
        expect(screen.getByLabelText("Date")).toBeInTheDocument();
        expect(screen.getByLabelText("Party Size")).toBeInTheDocument();
        expect(screen.getByLabelText("Occasion")).toBeInTheDocument();
    });

    it("renders time slot buttons matching availableTimes prop", () => {
        renderReserveTable();
        const timeButtons = screen.getAllByRole("radio");
        expect(timeButtons).toHaveLength(MOCK_TIMES.length);
    });

    it("renders 5 date options plus a placeholder", () => {
        renderReserveTable();
        const dateSelect = screen.getByLabelText("Date");
        const options = dateSelect.querySelectorAll("option");
        expect(options).toHaveLength(6); // 1 placeholder + 5 dates
    });

    it("renders party size options 1-6", () => {
        renderReserveTable();
        const partySizeSelect = screen.getByLabelText("Party Size");
        const options = partySizeSelect.querySelectorAll("option");
        expect(options).toHaveLength(7); // 1 placeholder + 6 sizes
        expect(screen.getByText("1 Guest")).toBeInTheDocument();
        expect(screen.getByText("6 Guests")).toBeInTheDocument();
    });

    it("renders occasion options", () => {
        renderReserveTable();
        expect(screen.getByText("Birthday")).toBeInTheDocument();
        expect(screen.getByText("Engagement")).toBeInTheDocument();
        expect(screen.getByText("Anniversary")).toBeInTheDocument();
    });

    it("disables Continue button when required fields are empty", () => {
        renderReserveTable();
        const continueBtn = screen.getByRole("button", {
            name: /Continue to guest details/i,
        });
        expect(continueBtn).toBeDisabled();
    });

    it("enables Continue button when date, partySize, and time are set", () => {
        renderReserveTable(filledData);
        const continueBtn = screen.getByRole("button", {
            name: /Continue to guest details/i,
        });
        expect(continueBtn).not.toBeDisabled();
    });

    it("calls onUpdate when date is changed", async () => {
        const user = userEvent.setup();
        const { onUpdate } = renderReserveTable();
        const dateSelect = screen.getByLabelText("Date");
        const options = dateSelect.querySelectorAll("option");
        // Select the first real date option (index 1)
        await user.selectOptions(dateSelect, options[1].value);
        expect(onUpdate).toHaveBeenCalledWith({ date: options[1].value });
    });

    it("calls onUpdate when a time slot is clicked", async () => {
        const user = userEvent.setup();
        const { onUpdate } = renderReserveTable();
        const timeBtn = screen.getByText("17:00");
        await user.click(timeBtn);
        expect(onUpdate).toHaveBeenCalledWith({ time: "17:00" });
    });

    it("calls onNext when Continue is clicked with valid data", async () => {
        const user = userEvent.setup();
        const onNext = vi.fn();
        renderReserveTable(filledData, { onNext });
        const continueBtn = screen.getByRole("button", {
            name: /Continue to guest details/i,
        });
        await user.click(continueBtn);
        expect(onNext).toHaveBeenCalledOnce();
    });

    it("marks the selected time slot with aria-checked='true'", () => {
        renderReserveTable(filledData);
        const selectedBtn = screen.getByText("17:00");
        expect(selectedBtn).toHaveAttribute("aria-checked", "true");
    });

    it("marks unselected time slots with aria-checked='false'", () => {
        renderReserveTable(filledData);
        const unselectedBtn = screen.getByText("17:30");
        expect(unselectedBtn).toHaveAttribute("aria-checked", "false");
    });

    it("renders no time slots when availableTimes is empty", () => {
        renderReserveTable(emptyData, { availableTimes: [] });
        const timeButtons = screen.queryAllByRole("radio");
        expect(timeButtons).toHaveLength(0);
    });
});
