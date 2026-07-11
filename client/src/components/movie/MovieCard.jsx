import "../../styles/MovieCard.css";

function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <img
        src={movie.poster}
        alt={movie.title}
        className="movie-card-image"
      />
      <div className="movie-card-content">
        <p className="movie-rating">
          ⭐ {movie.rating}
        </p>
        <h3>{movie.title}</h3>
        <p>{movie.genre}</p>
        <button>Book Now</button>
      </div>
    </div>
  );
}
export default MovieCard;