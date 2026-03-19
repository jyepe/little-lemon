import { Link, useLocation } from "react-router-dom";
import "./Header.css";

function Header() {
    const location = useLocation();

    const navLinks = [
        { label: "Home", path: "/" },
        { label: "About", path: "/about" },
        { label: "Menu", path: "/menu" },
        { label: "Reservations", path: "/reservations" },
        { label: "Order Online", path: "/order" },
        { label: "Login", path: "/login" },
    ];

    return (
        <header className="header">
            <div className="header__inner container">
                <Link to="/" aria-label="Little Lemon Home">
                    <img
                        src="/Logo.svg"
                        alt="Little Lemon logo"
                        className="header__logo"
                    />
                </Link>
                <nav aria-label="Main navigation">
                    <ul className="header__nav" role="menubar">
                        {navLinks.map((link) => (
                            <li key={link.path} role="none">
                                <Link
                                    to={link.path}
                                    role="menuitem"
                                    className={`header__link${
                                        location.pathname === link.path
                                            ? " header__link--active"
                                            : ""
                                    }`}
                                    aria-current={
                                        location.pathname === link.path
                                            ? "page"
                                            : undefined
                                    }
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
