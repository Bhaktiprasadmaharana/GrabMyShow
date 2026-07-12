import { Link, useNavigate } from "react-router-dom";
import {
  FaFilm,
  FaHeart,
  FaSearch,
  FaUser
} from "react-icons/fa";

import { useEffect, useState } from "react";
import { searchMovies } from "../../services/movie.service";

function Navbar() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      try {
        const movies = await searchMovies(query);

const uniqueMovies = [];

const seenTitles = new Set();

movies.forEach((movie) => {
  const title = (movie.title || movie.name || "")
      .trim()
      .toLowerCase();
      if (!seenTitles.has(title)) {
        seenTitles.add(title);
        uniqueMovies.push(movie);
      }
      });
      setResults(uniqueMovies.slice(0, 6));
      } catch (error) {
        console.error("Search failed:", error);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);
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
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies, theatres..."
          />
          {results.length > 0 && (
            <div className="search-results">
              {results.map((movie) => (
                <div
                  key={movie.id}
                  className="search-item"
                  onClick={() => {
                    navigate(`/movie/${movie.id}`);
                    setQuery("");
                    setResults([]);
                  }}
                >
                  <img
                    loading="lazy"
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
                        : "/no-poster.png"
                    }
                    alt={movie.title || movie.name}
                  />

                  <div className="search-info">
                    <h4>{movie.title || movie.name}</h4>
                    <p>
                      {movie.release_date?.split("-")[0] || "Upcoming"} • {movie.vote_count > 0
                        ? `⭐ ${movie.vote_average.toFixed(1)}`
                        : "🎬 Coming Soon"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
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