import { useMemo } from "react";
import "./ReserveTable.css";
import FormField from "./FormField";

const AVAILABLE_TIMES = [
    "7:00 PM", "7:30 PM", "8:00 PM",
    "8:15 PM", "8:30 PM", "8:45 PM",
    "9:00 PM", "9:15 PM", "9:30 PM",
    "9:45 PM", "10:00 PM", "10:15 PM",
];

const OCCASIONS = ["Birthday", "Engagement", "Anniversary"];

function ReserveTable({ data, onUpdate, onNext }) {
    const availableDates = useMemo(() => {
        const dates = [];
        const today = new Date();
        for (let i = 0; i < 5; i++) {
            const d = new Date(today);
            d.setDate(today.getDate() + i);
            dates.push({
                value: d.toISOString().split("T")[0],
                label: d.toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                }),
            });
        }
        return dates;
    }, []);

    const isFormValid = data.date && data.partySize && data.time;

    return (
        <div className="reserve-table container">
            <FormField
                id="date"
                label="Date"
                type="select"
                value={data.date}
                onChange={(e) => onUpdate({ date: e.target.value })}
                required
                options={[
                    { value: "", label: "Select a date" },
                    ...availableDates,
                ]}
                hint="Reservations can only be made within 5 days"
            />

            <FormField
                id="party-size"
                label="Party Size"
                type="select"
                value={data.partySize}
                onChange={(e) => onUpdate({ partySize: e.target.value })}
                required
                options={[
                    { value: "", label: "Select party size" },
                    ...[1, 2, 3, 4, 5, 6].map((n) => ({
                        value: n,
                        label: `${n} ${n === 1 ? "Guest" : "Guests"}`,
                    })),
                ]}
                hint="Maximum of 6 people per reservation"
            />

            <FormField
                id="occasion"
                label="Occasion"
                type="select"
                value={data.occasion}
                onChange={(e) => onUpdate({ occasion: e.target.value })}
                options={[
                    { value: "", label: "Select occasion (optional)" },
                    ...OCCASIONS.map((o) => ({ value: o, label: o })),
                ]}
            />

            <fieldset className="reserve-table__times" aria-label="Available time slots">
                <legend className="reserve-table__label">Available Times</legend>
                <div className="reserve-table__times-grid" role="radiogroup">
                    {AVAILABLE_TIMES.map((time) => (
                        <button
                            key={time}
                            type="button"
                            role="radio"
                            aria-checked={data.time === time}
                            className={`reserve-table__time-btn${
                                data.time === time
                                    ? " reserve-table__time-btn--selected"
                                    : ""
                            }`}
                            onClick={() => onUpdate({ time })}
                        >
                            {time}
                        </button>
                    ))}
                </div>
            </fieldset>

            <button
                className="reserve-table__continue"
                onClick={onNext}
                disabled={!isFormValid}
                aria-label="Continue to guest details"
            >
                Continue
            </button>
        </div>
    );
}

export default ReserveTable;
