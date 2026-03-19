import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import ReservationPage from "./ReservationPage";

function renderReservationPage() {
    return render(
        <MemoryRouter>
            <ReservationPage />
        </MemoryRouter>
    );
}

describe("ReservationPage", () => {
    it("renders step 1 by default with title 'Reserve a table'", () => {
        renderReservationPage();
        expect(
            screen.getByRole("heading", { level: 1, name: "Reserve a table" })
        ).toBeInTheDocument();
        expect(screen.getByText("Find your perfect spot.")).toBeInTheDocument();
    });

    it("renders date, party size, and time fields on step 1", () => {
        renderReservationPage();
        expect(screen.getByLabelText("Date")).toBeInTheDocument();
        expect(screen.getByLabelText("Party Size")).toBeInTheDocument();
        expect(screen.getByLabelText("Occasion")).toBeInTheDocument();
    });

    it("has a disabled Continue button initially", () => {
        renderReservationPage();
        const continueBtn = screen.getByRole("button", {
            name: /Continue to guest details/i,
        });
        expect(continueBtn).toBeDisabled();
    });

    it("navigates to step 2 after filling required fields and clicking Continue", async () => {
        const user = userEvent.setup();
        renderReservationPage();

        // Fill date
        const dateSelect = screen.getByLabelText("Date");
        const dateOptions = dateSelect.querySelectorAll("option");
        await user.selectOptions(dateSelect, dateOptions[1].value);

        // Fill party size
        const partySizeSelect = screen.getByLabelText("Party Size");
        await user.selectOptions(partySizeSelect, "2");

        // Select a time
        const timeBtn = screen.getByText("8:00 PM");
        await user.click(timeBtn);

        // Click Continue
        const continueBtn = screen.getByRole("button", {
            name: /Continue to guest details/i,
        });
        await user.click(continueBtn);

        // Step 2 should render
        expect(
            screen.getByRole("heading", { level: 1, name: "Guest Details" })
        ).toBeInTheDocument();
        expect(screen.getByLabelText(/First Name/)).toBeInTheDocument();
    });

    it("navigates back to step 1 when Edit is clicked on step 2", async () => {
        const user = userEvent.setup();
        renderReservationPage();

        // Navigate to step 2
        const dateSelect = screen.getByLabelText("Date");
        const dateOptions = dateSelect.querySelectorAll("option");
        await user.selectOptions(dateSelect, dateOptions[1].value);
        await user.selectOptions(screen.getByLabelText("Party Size"), "2");
        await user.click(screen.getByText("8:00 PM"));
        await user.click(
            screen.getByRole("button", {
                name: /Continue to guest details/i,
            })
        );

        // Click Edit
        const editBtn = screen.getByRole("button", {
            name: /Edit reservation details/i,
        });
        await user.click(editBtn);

        // Should be back on step 1
        expect(
            screen.getByRole("heading", { level: 1, name: "Reserve a table" })
        ).toBeInTheDocument();
    });

    it("completes the full 3-step flow", async () => {
        const user = userEvent.setup();
        renderReservationPage();

        // Step 1: Fill reservation details
        const dateSelect = screen.getByLabelText("Date");
        const dateOptions = dateSelect.querySelectorAll("option");
        await user.selectOptions(dateSelect, dateOptions[1].value);
        await user.selectOptions(screen.getByLabelText("Party Size"), "2");
        await user.click(screen.getByText("8:00 PM"));
        await user.click(
            screen.getByRole("button", {
                name: /Continue to guest details/i,
            })
        );

        // Step 2: Fill guest details
        await user.type(screen.getByLabelText(/First Name/), "Mario");
        await user.type(screen.getByLabelText(/Last Name/), "Rossi");
        await user.type(
            screen.getByLabelText(/Email Address/),
            "mario@example.com"
        );
        await user.type(screen.getByLabelText(/Phone Number/), "3125551234");

        const submitBtn = screen.getByRole("button", {
            name: /Confirm your reservation/i,
        });
        await user.click(submitBtn);

        // Step 3: Confirmation
        expect(
            screen.getByRole("heading", { level: 1, name: "Table Reserved!" })
        ).toBeInTheDocument();
        expect(screen.getByText(/Party of 2 Guests/)).toBeInTheDocument();
    });

    it("renders back button on step 1", () => {
        renderReservationPage();
        const backBtn = screen.getByRole("button", { name: /Go back/i });
        expect(backBtn).toBeInTheDocument();
    });
});
