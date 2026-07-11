import {
  FaFilm,
  FaGithub,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import "../../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <FaFilm />
            <span>
              Grab <strong>MyShow</strong>
            </span>
          </Link>

          <p>
            Discover movies, book tickets, explore theatres,
            and never miss the next blockbuster.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h4>Quick Links</h4>

          <Link to="/">Home</Link>
          <Link to="/movies">Movies</Link>
          <Link to="/theatres">Theatres</Link>
          <Link to="/upcoming">Upcoming</Link>
          <Link to="/wishlist">Wishlist</Link>
        </div>

        {/* Company */}
        <div className="footer-links">
          <h4>Company</h4>

          <a href="#">About Us</a>
          <a href="#">Contact</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>
        </div>

        {/* Social */}
        <div className="footer-social">
          <h4>Connect</h4>

          <div className="social-icons">
            <a
              href="https://github.com/Bhaktiprasadmaharana"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub />
            </a>

            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin />
            </a>

            <a
              href="https://x.com/"
              target="_blank"
              rel="noreferrer"
            >
              <FaXTwitter />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 GrabMyShow. All rights reserved.</p>
        <p>Made with ❤️ by Bhakti Prasad Maharana</p>
      </div>
    </footer>
  );
}

export default Footer;