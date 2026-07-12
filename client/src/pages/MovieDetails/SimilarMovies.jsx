import "./SimilarMovies.css";
import MovieCard from "../../components/movie/MovieCard";

function SimilarMovies({ 
    movies = [],
    genres = [],
}) 
{
  if (!movies.length) return null;

  return (
    <section className="similar-movies-section">
      <h2>You May Also Like</h2>

      <div className="similar-movies-grid">
        {movies.slice(0, 8).map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            genres={genres}
          />
        ))}
      </div>
    </section>
  );
}

export default SimilarMovies;