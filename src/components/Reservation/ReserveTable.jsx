import { useMemo } from "react";
import "./ReserveTable.css";

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
            <div className="reserve-table__field">
                <label htmlFor="date" className="reserve-table__label">
                    Date
                </label>
                <select
                    id="date"
                    className="reserve-table__select"
                    value={data.date}
                    onChange={(e) => onUpdate({ date: e.target.value })}
                    aria-required="true"
                >
                    <option value="">Select a date</option>
                    {availableDates.map((d) => (
                        <option key={d.value} value={d.value}>
                            {d.label}
                        </option>
                    ))}
                </select>
                <p className="reserve-table__hint">
                    Reservations can only be made within 5 days
                </p>
            </div>

            <div className="reserve-table__field">
                <label htmlFor="party-size" className="reserve-table__label">
                    Party Size
                </label>
                <select
                    id="party-size"
                    className="reserve-table__select"
                    value={data.partySize}
                    onChange={(e) => onUpdate({ partySize: e.target.value })}
                    aria-required="true"
                >
                    <option value="">Select party size</option>
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n}>
                            {n} {n === 1 ? "Guest" : "Guests"}
                        </option>
                    ))}
                </select>
                <p className="reserve-table__hint">
                    Maximum of 6 people per reservation
                </p>
            </div>

            <div className="reserve-table__field">
                <label htmlFor="occasion" className="reserve-table__label">
                    Occasion
                </label>
                <select
                    id="occasion"
                    className="reserve-table__select"
                    value={data.occasion}
                    onChange={(e) => onUpdate({ occasion: e.target.value })}
                >
                    <option value="">Select occasion (optional)</option>
                    {OCCASIONS.map((o) => (
                        <option key={o} value={o}>
                            {o}
                        </option>
                    ))}
                </select>
            </div>

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
