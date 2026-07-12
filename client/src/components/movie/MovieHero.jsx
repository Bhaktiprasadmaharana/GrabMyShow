import "../../styles/MovieHero.css";
import { TMDB_IMAGE_URL } from "../../constants/api";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Mousewheel } from "swiper/modules";
import { useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function MovieHero({ movies = [], genres = [] }) {
    const navigate = useNavigate();
    if (!movies.length) return null;

    return (
        <div className="hero-wrapper">
            <Swiper
                modules={[Navigation, Pagination, Autoplay, Mousewheel]}
                navigation={{
                    prevEl: ".hero-prev",
                    nextEl: ".hero-next",
                }}
                pagination={{ clickable: true }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                mousewheel={{
                    forceToAxis: true,
                    sensitivity: 1,
                }}
                grabCursor={true}
                simulateTouch={true}
                touchRatio={1}
                loop
                className="hero-swiper"
            >
                {movies.map((movie) => {
                    const movieGenres = (movie.genre_ids || [])
                        .map((id) => genres.find((genre) => genre.id === id)?.name)
                        .filter(Boolean)
                        .join(" • ");

                    return (
                        <SwiperSlide key={movie.id}>
                            <section
                                className="movie-hero"
                                style={{
                                    backgroundImage: `url(${TMDB_IMAGE_URL}/original${movie.backdrop_path})`,
                                }}
                            >
                                <div className="hero-overlay">
                                    <div className="hero-content">
                                        <div className="hero-left">
                                            <span className="rating">⭐ IMDb {movie.vote_average.toFixed(1)}</span>
                                            <h1>{movie.title}</h1>
                                            <p className="genres">{movieGenres}</p>
                                            <p className="description">{movie.overview}</p>
                                            <div className="hero-buttons">
                                                <button onClick={() => navigate(`/movie/${movie.id}`)}>
                                                    Book Now
                                                </button>
                                                <button>Watch Trailer</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
            <div className="hero-prev">
                <ChevronLeft size={28} strokeWidth={2.5} />
            </div>

            <div className="hero-next">
                <ChevronRight size={28} strokeWidth={2.5} />
            </div>
        </div>
    );
}

export default MovieHero;