import "../../styles/MovieCard.css";
import { TMDB_IMAGE_URL } from "../../constants/api";
import { useNavigate } from "react-router-dom";


function MovieCard({ movie, genres = [] }) {
  const navigate = useNavigate();
  const movieGenres = (movie.genre_ids || [])
    .map((id) => genres?.find((genre) => genre.id === id)?.name)
    .filter(Boolean)
    .join(" • ");
  return (
    <div 
      className="movie-card"
      onClick={() => navigate(`/movie/${movie.id}`)}  
    >
      <img
      loading="lazy"
      src={
        movie.poster_path
        ? `${TMDB_IMAGE_URL}/w500${movie.poster_path}`
        : "/no-poster.png"
        }
        alt={movie.title || movie.name}
      />
      <div className="movie-card-content">
        <p className="movie-rating">
        {movie.vote_count > 0
          ? `⭐ ${movie.vote_average.toFixed(1)}`
          : "🎬 Coming Soon"}
        </p>
        <h3>{movie.title || movie.name}</h3>
        <p className="movie-genre">
          {movieGenres || "Genre not available"}
        </p>
        <button className="book-btn">
          Book Now
        </button>
      </div>
    </div>
  );
}
export default MovieCard;