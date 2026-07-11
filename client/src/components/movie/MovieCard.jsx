import "../../styles/MovieCard.css";
import { TMDB_IMAGE_URL } from "../../constants/api";

function MovieCard({ movie, genres = [] }) {
  const movieGenres = (movie.genre_ids || [])
    .map((id) => genres?.find((genre) => genre.id === id)?.name)
    .filter(Boolean)
    .join(" • ");
  return (
    <div className="movie-card">
      <img
        src={`${TMDB_IMAGE_URL}${movie.poster_path}`}
        alt={movie.title}
        className="movie-card-image"
      />
      <div className="movie-card-content">
        <p className="movie-rating">
          ⭐ {movie.vote_average.toFixed(1)}
        </p>
        <h3>{movie.title}</h3>
        <p className="movie-genre">
          {movieGenres}
        </p>
        <button className="book-btn">
          Book Now
        </button>
      </div>
    </div>
  );
}
export default MovieCard;