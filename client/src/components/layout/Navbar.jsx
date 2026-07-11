import { Link } from "react-router-dom";
import {
  FaFilm,
  FaHeart,
  FaSearch,
  FaUser
} from "react-icons/fa";

function Navbar() {
  return (
  <header className="navbar">
    <div className="navbar-container">
      <nav className="navbar-top">
        {/* Logo */}
        <div className="logo">
          <Link to="/">
            <FaFilm />
            <span className="logo-white">Grab</span>
            <span className="logo-red">MyShow</span>
          </Link>
        </div>
        {/* Search */}
        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Search movies, theatres..."
          />
        </div>
        {/* Right Side */}
        <div className="navbar-actions">
          <Link to="/wishlist">
            <FaHeart />
          </Link>
          <Link to="/login" className="login-btn">
            <FaUser />
            Login
          </Link>
        </div>
      </nav>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/theatres">Theatres</Link>
        <Link to="/upcoming">Upcoming</Link>
        <Link to="/wishlist">Wishlist</Link>
      </div>
    </div>
  </header>
);
}

export default Navbar;