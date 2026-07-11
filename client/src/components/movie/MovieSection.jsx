import "../../styles/MovieSection.css";
import MovieCard from "./MovieCard";

function MovieSection({ title, movies }) {
  return (
    <section className="movie-section">
      <div className="section-header">
        <h2>{title}</h2>

        <button className="view-all-btn">
          View All →
        </button>
      </div>

      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
          />
        ))}
      </div>
    </section>
  );
}

export default MovieSection;