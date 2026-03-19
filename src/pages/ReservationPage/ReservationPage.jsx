import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReserveTable from "../../components/Reservation/ReserveTable";
import GuestDetails from "../../components/Reservation/GuestDetails";
import Confirmation from "../../components/Reservation/Confirmation";
import "./ReservationPage.css";

const todayStr = new Date().toISOString().split("T")[0];

function to12Hour(time24) {
  const [h, m] = time24.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;
  return `${hour12}:${m.toString().padStart(2, "0")} ${period}`;
}

function getAvailableTimes(dateStr) {
  try {
    // eslint-disable-next-line no-undef
    return fetchAPI(new Date(dateStr + "T00:00:00")).map(to12Hour);
  } catch {
    return [];
  }
}

function ReservationPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [reservationData, setReservationData] = useState({
    date: todayStr,
    partySize: "",
    occasion: "",
    time: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialInstructions: "",
  });

  const availableTimes = getAvailableTimes(reservationData.date);

  const stepTitles = {
    1: "Reserve a table",
    2: "Guest Details",
    3: "Confirmation",
  };

  const handleNext = () => {
    if (currentStep === 2) {
      try {
        // eslint-disable-next-line no-undef
        submitAPI(reservationData);
      } catch {
        // submitAPI not available
      }
    }
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const handleBack = () => {
    if (currentStep === 1) {
      navigate("/");
    } else {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleUpdateData = (updates) => {
    if ("date" in updates) {
      updates.time = "";
    }
    setReservationData((prev) => ({ ...prev, ...updates }));
  };

  return (
    <div className="reservation-page">
      {currentStep < 3 && (
        <div className="reservation-page__header">
          <div className="reservation-page__header-inner container">
            <button
              className="reservation-page__back"
              onClick={handleBack}
              aria-label="Go back"
            >
              ←
            </button>
            <h1 className="reservation-page__title">
              {stepTitles[currentStep]}
            </h1>
          </div>
          {currentStep === 1 && (
            <p className="reservation-page__subtitle container">
              Find your perfect spot.
            </p>
          )}
        </div>
      )}

      {currentStep === 1 && (
        <ReserveTable
          data={reservationData}
          availableTimes={availableTimes}
          onUpdate={handleUpdateData}
          onNext={handleNext}
        />
      )}
      {currentStep === 2 && (
        <GuestDetails
          data={reservationData}
          onUpdate={handleUpdateData}
          onNext={handleNext}
          onEdit={() => setCurrentStep(1)}
        />
      )}
      {currentStep === 3 && (
        <Confirmation
          data={reservationData}
          onBrowseMenu={() => navigate("/menu")}
          onContinue={() => navigate("/")}
        />
      )}
    </div>
  );
}

export default ReservationPage;
