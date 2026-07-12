import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CastSection from "./CastSection";
import TrailerModal from "../../components/movie/TrailerModal";
import SimilarMovies from "./SimilarMovies";
import MovieDetailsSkeleton from "../../components/skeleton/MovieDetailsSkeleton";

import {
  getMovieCredits,
  getMovieDetails,
  getMovieVideos,
  getSimilarMovies,
} from "../../services/movie.service";

import "./MovieDetails.css";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [videos, setVideos] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    const fetchMovieData = async () => {
      setLoading(true);
      try {
        const [details, credits, movieVideos, similar] = await Promise.all([
          getMovieDetails(id),
          getMovieCredits(id),
          getMovieVideos(id),
          getSimilarMovies(id),
        ]);

        setMovie(details);
        setCast(credits);
        setVideos(movieVideos);
        setSimilarMovies(similar);
      } catch (error) {
        console.error("Failed to load movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id]);

  if (loading) {
    return <MovieDetailsSkeleton />;
  }

  if (!movie) {
    return <h2>Movie not found.</h2>;
  }

  return (
    <div className="movie-details">
      <section
        className="movie-details-hero"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="movie-details-overlay">
          <div className="movie-details-content">
            <div className="movie-poster">
              <img
                loading="lazy"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
            </div>

            <div className="movie-info">
              <h1>{movie.title}</h1>

              <div className="movie-meta">
                <span>⭐ {movie.vote_average?.toFixed(1)}</span>
                <span>📅 {movie.release_date}</span>
                <span>⏱ {movie.runtime} min</span>
              </div>

              <div className="movie-genres">
                {movie.genres?.map((genre) => (
                  <span key={genre.id}>{genre.name}</span>
                ))}
              </div>

              <p className="movie-overview">{movie.overview}</p>

              <div className="movie-actions">
                <button>🎟 Book Tickets</button>
                <button onClick={() => setIsTrailerOpen(true)}>
                    ▶ Watch Trailer
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CastSection cast={cast} />
      <SimilarMovies movies={similarMovies} />
      <TrailerModal
        videos={videos}
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
      />
    </div>
  );
}

export default MovieDetails;