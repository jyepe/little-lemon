import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import ReservationPage from "./pages/ReservationPage/ReservationPage";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/reservations" element={<ReservationPage />} />
                </Routes>
            </main>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
