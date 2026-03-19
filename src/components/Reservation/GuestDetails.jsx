import "./GuestDetails.css";

function GuestDetails({ data, onUpdate, onNext, onEdit }) {
    const formattedDate = data.date
        ? new Date(data.date + "T00:00:00").toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
          })
        : "";

    const isFormValid = data.firstName && data.lastName && data.email && data.phone;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid) {
            onNext();
        }
    };

    return (
        <div className="guest-details container">
            <div className="guest-details__summary">
                <div className="guest-details__summary-info">
                    <p className="guest-details__summary-date">
                        {formattedDate} • {data.time}
                    </p>
                    <p className="guest-details__summary-party">
                        Party of {data.partySize} {data.partySize === "1" ? "Guest" : "Guests"}
                        {data.occasion ? ` · ${data.occasion}` : ""}
                    </p>
                </div>
                <button
                    className="guest-details__edit"
                    onClick={onEdit}
                    aria-label="Edit reservation details"
                >
                    Edit
                </button>
            </div>

            <form
                className="guest-details__form"
                onSubmit={handleSubmit}
                aria-label="Guest details form"
            >
                <div className="guest-details__field">
                    <label htmlFor="firstName">First Name *</label>
                    <input
                        id="firstName"
                        type="text"
                        value={data.firstName}
                        onChange={(e) => onUpdate({ firstName: e.target.value })}
                        required
                        aria-required="true"
                        autoComplete="given-name"
                    />
                </div>

                <div className="guest-details__field">
                    <label htmlFor="lastName">Last Name *</label>
                    <input
                        id="lastName"
                        type="text"
                        value={data.lastName}
                        onChange={(e) => onUpdate({ lastName: e.target.value })}
                        required
                        aria-required="true"
                        autoComplete="family-name"
                    />
                </div>

                <div className="guest-details__field">
                    <label htmlFor="email">Email Address *</label>
                    <input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => onUpdate({ email: e.target.value })}
                        required
                        aria-required="true"
                        autoComplete="email"
                    />
                </div>

                <div className="guest-details__field">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                        id="phone"
                        type="tel"
                        value={data.phone}
                        onChange={(e) => onUpdate({ phone: e.target.value })}
                        required
                        aria-required="true"
                        autoComplete="tel"
                    />
                </div>

                <div className="guest-details__field">
                    <label htmlFor="special">Special Instructions (Optional)</label>
                    <textarea
                        id="special"
                        rows="4"
                        value={data.specialInstructions}
                        onChange={(e) =>
                            onUpdate({ specialInstructions: e.target.value })
                        }
                        placeholder="Any dietary restrictions, special requests, etc."
                    />
                </div>

                <button
                    type="submit"
                    className="guest-details__submit"
                    disabled={!isFormValid}
                    aria-label="Confirm your reservation"
                >
                    Confirm Reservation
                </button>
            </form>
        </div>
    );
}

export default GuestDetails;
