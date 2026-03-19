import { Link } from "react-router-dom";
import "./NotFoundPage.css";

function NotFoundPage() {
    return (
        <section className="not-found" aria-label="Page not found">
            <div className="not-found__inner container">
                <h1 className="not-found__code">404</h1>
                <h2 className="not-found__title">Page Not Found</h2>
                <p className="not-found__text">
                    Sorry, the page you are looking for doesn&apos;t exist or
                    has been moved.
                </p>
                <Link
                    to="/"
                    className="not-found__cta"
                    aria-label="Return to homepage"
                >
                    Back to Home
                </Link>
            </div>
        </section>
    );
}

export default NotFoundPage;
