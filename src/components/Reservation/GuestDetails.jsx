import "./GuestDetails.css";
import FormField from "./FormField";

function GuestDetails({ data, onUpdate, onNext, onEdit }) {
  const formattedDate = data.date
    ? new Date(data.date + "T00:00:00").toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
    : "";

  const isFormValid =
    data.firstName && data.lastName && data.email && data.phone;

  const isPhoneValid = /^\d{10}$/.test(data.phone);
  const showPhoneError = data.phone && !isPhoneValid;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid && isPhoneValid) {
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
            Party of {data.partySize}{" "}
            {data.partySize === "1" ? "Guest" : "Guests"}
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
        <FormField
          id="firstName"
          label="First Name *"
          value={data.firstName}
          onChange={(e) => onUpdate({ firstName: e.target.value })}
          required
          autoComplete="given-name"
        />

        <FormField
          id="lastName"
          label="Last Name *"
          value={data.lastName}
          onChange={(e) => onUpdate({ lastName: e.target.value })}
          required
          autoComplete="family-name"
        />

        <FormField
          id="email"
          label="Email Address *"
          type="email"
          value={data.email}
          onChange={(e) => onUpdate({ email: e.target.value })}
          required
          autoComplete="email"
        />

        <FormField
          id="phone"
          label="Phone Number *"
          type="tel"
          value={data.phone}
          onChange={(e) => onUpdate({ phone: e.target.value })}
          required
          autoComplete="tel"
          error={showPhoneError ? "Please enter a valid 10-digit phone number" : undefined}
        />

        <FormField
          id="special"
          label="Special Instructions (Optional)"
          type="textarea"
          rows="4"
          value={data.specialInstructions}
          onChange={(e) => onUpdate({ specialInstructions: e.target.value })}
          placeholder="Any dietary restrictions, special requests, etc."
        />

        <button
          type="submit"
          className="guest-details__submit"
          disabled={!isFormValid || !isPhoneValid}
          aria-label="Confirm your reservation"
        >
          Confirm Reservation
        </button>
      </form>
    </div>
  );
}

export default GuestDetails;
