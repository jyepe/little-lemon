import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReserveTable from "../../components/Reservation/ReserveTable";
import GuestDetails from "../../components/Reservation/GuestDetails";
import Confirmation from "../../components/Reservation/Confirmation";
import "./ReservationPage.css";

function ReservationPage() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [reservationData, setReservationData] = useState({
        date: "",
        partySize: "",
        occasion: "",
        time: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        specialInstructions: "",
    });

    const stepTitles = {
        1: "Reserve a table",
        2: "Guest Details",
        3: "Confirmation",
    };

    const handleNext = () => {
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
