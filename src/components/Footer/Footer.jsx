import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner container">
        <div className="footer__column">
          <img
            src="/Logo.svg"
            alt="Little Lemon logo"
            className="footer__logo"
          />
        </div>

        <div className="footer__column">
          <h3 className="footer__heading">Navigation</h3>
          <nav aria-label="Footer navigation">
            <ul className="footer__list">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/menu">Menu</Link>
              </li>
              <li>
                <Link to="/reservations">Reservations</Link>
              </li>
              <li>
                <Link to="/order">Order Online</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="footer__column">
          <h3 className="footer__heading">Contact</h3>
          <address className="footer__address">
            <p>123 Lemon Street</p>
            <p>Chicago, IL 60601</p>
            <p>
              <a href="tel:+13125551234">(312) 555-1234</a>
            </p>
            <p>
              <a href="mailto:info@littlelemon.com">info@littlelemon.com</a>
            </p>
          </address>
        </div>

        <div className="footer__column">
          <h3 className="footer__heading">Connect</h3>
          <nav aria-label="Footer social links">
            <ul className="footer__social">
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="footer__bottom container">
        <p>&copy; 2026 Little Lemon. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
