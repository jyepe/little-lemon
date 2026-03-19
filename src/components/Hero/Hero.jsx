import { Link } from "react-router-dom";
import "./Hero.css";

function Hero() {
    return (
        <section className="hero" aria-label="Welcome to Little Lemon">
            <div className="hero__inner container">
                <div className="hero__content">
                    <h1 className="hero__title">Little Lemon</h1>
                    <h2 className="hero__subtitle">Chicago</h2>
                    <p className="hero__description">
                        We are a family owned Mediterranean restaurant, focused
                        on traditional recipes served with a modern twist.
                    </p>
                    <Link
                        to="/reservations"
                        className="hero__cta"
                        aria-label="Reserve a table at Little Lemon"
                    >
                        Reserve a Table
                    </Link>
                </div>
                <div className="hero__image-wrapper">
                    <img
                        src="/Mario and Adrian b.jpg"
                        alt="Mario and Adrian preparing Mediterranean dishes"
                        className="hero__image"
                    />
                </div>
            </div>
        </section>
    );
}

export default Hero;
