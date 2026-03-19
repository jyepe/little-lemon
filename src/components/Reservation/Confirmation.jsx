import "./Confirmation.css";

function Confirmation({ data, onBrowseMenu, onContinue }) {
    const formattedDate = data.date
        ? new Date(data.date + "T00:00:00").toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
          })
        : "";

    return (
        <div className="confirmation">
            <div className="confirmation__hero">
                <img
                    src="/Check.png"
                    alt="Reservation confirmed"
                    className="confirmation__check"
                />
                <h1 className="confirmation__title">Table Reserved!</h1>
                <p className="confirmation__subtitle">
                    We can&apos;t wait to host you.
                </p>
            </div>

            <div className="confirmation__body container">
                <div className="confirmation__card">
                    <h2 className="confirmation__card-heading">
                        Reservation Details
                    </h2>
                    <p className="confirmation__card-date">
                        {formattedDate} • {data.time}
                    </p>
                    <p className="confirmation__card-party">
                        Party of {data.partySize} {data.partySize === "1" ? "Guest" : "Guests"}
                        {data.occasion ? ` · ${data.occasion}` : ""}
                    </p>
                </div>

                <p className="confirmation__notice">
                    Confirmation sent via Email &amp; SMS.
                </p>

                <div className="confirmation__actions">
                    <button
                        className="confirmation__btn confirmation__btn--outline"
                        onClick={onBrowseMenu}
                        aria-label="Browse the menu"
                    >
                        Browse Menu
                    </button>
                    <button
                        className="confirmation__btn confirmation__btn--primary"
                        onClick={onContinue}
                        aria-label="Return to home page"
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Confirmation;
