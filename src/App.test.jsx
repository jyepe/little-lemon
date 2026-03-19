import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import ReservationPage from "./pages/ReservationPage/ReservationPage";
import { Routes, Route } from "react-router-dom";

function renderApp(initialRoute = "/") {
    return render(
        <MemoryRouter initialEntries={[initialRoute]}>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route
                        path="/reservations"
                        element={<ReservationPage />}
                    />
                </Routes>
            </main>
            <Footer />
        </MemoryRouter>
    );
}

describe("App Routing", () => {
    it("renders Header on all pages", () => {
        renderApp();
        expect(
            screen.getByRole("navigation", { name: "Main navigation" })
        ).toBeInTheDocument();
    });

    it("renders Footer on all pages", () => {
        renderApp();
        expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    });

    it("renders HomePage at '/' route", () => {
        renderApp("/");
        expect(
            screen.getByRole("heading", { level: 1, name: "Little Lemon" })
        ).toBeInTheDocument();
    });

    it("renders ReservationPage at '/reservations' route", () => {
        renderApp("/reservations");
        expect(
            screen.getByRole("heading", {
                level: 1,
                name: "Reserve a table",
            })
        ).toBeInTheDocument();
    });

    it("renders Header and Footer on the reservations page", () => {
        renderApp("/reservations");
        expect(
            screen.getByRole("navigation", { name: "Main navigation" })
        ).toBeInTheDocument();
        expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    });
});
