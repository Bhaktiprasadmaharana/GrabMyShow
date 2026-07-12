import "../../styles/MovieSection.css";
import MovieCard from "./MovieCard";
import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function MovieSection({ title, movies = [], genres = [] }) {
  const sliderRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const updateArrows = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    setShowLeft(slider.scrollLeft > 0);
    setShowRight(
      slider.scrollLeft + slider.clientWidth < slider.scrollWidth - 5
    );
  };

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

  useEffect(() => {
    updateArrows();

    const slider = sliderRef.current;
    if (!slider) return;

    slider.addEventListener("scroll", updateArrows);
    window.addEventListener("resize", updateArrows);

    return () => {
      slider.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [movies]);

  return (
    <section className="movie-section">
      <div className="section-header">
        <h2>{title}</h2>
        <button className="view-all-btn">View All →</button>
      </div>

      <div className="movie-slider-wrapper">
        {showLeft && (
          <button className="slider-btn left" onClick={scrollLeft}>
            <FaChevronLeft />
          </button>
        )}

        <div className="movie-grid" ref={sliderRef}>
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              genres={genres}
            />
          ))}
        </div>

        {showRight && (
          <button className="slider-btn right" onClick={scrollRight}>
            <FaChevronRight />
          </button>
        )}
      </div>
    </section>
  );
}

export default MovieSection;