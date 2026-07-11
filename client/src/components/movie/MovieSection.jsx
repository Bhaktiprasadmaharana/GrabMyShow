import "../../styles/MovieSection.css";
import MovieCard from "./MovieCard";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function MovieSection({ title, movies = [], genres = [] }) {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({
      left: -800,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({
      left: 800,
      behavior: "smooth",
    });
  };

  return (
    <section className="movie-section">
      <div className="section-header">
        <h2>{title}</h2>
        <button className="view-all-btn">View All →</button>
      </div>

      <div className="movie-slider-wrapper">
        <button className="slider-btn left" onClick={scrollLeft}>
          <FaChevronLeft />
        </button>

        <div className="movie-grid" ref={sliderRef}>
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              genres={genres}
            />
          ))}
        </div>

        <button className="slider-btn right" onClick={scrollRight}>
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
}

export default MovieSection;