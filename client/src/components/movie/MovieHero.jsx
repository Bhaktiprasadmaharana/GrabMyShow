import "../../styles/MovieHero.css";
import banner from "../../assets/images/avatar-banner.jpg";
import poster from "../../assets/images/avatar-poster.jpg";
function MovieHero() {
    return (
        <section
            className="movie-hero"
            style={{
                backgroundImage: `url(${banner})`,
            }}
        >
            <div className="hero-overlay">
                <div className="hero-content">
                    <div className="hero-left">
                        <span className="rating">
                            ⭐ IMDb 9.2
                        </span>
                        <h1>Avatar: Fire and Ash</h1>
                        <p className="genres">
                            Adventure • Fantasy • Action
                        </p>
                        <p className="description">
                            The next chapter begins.
                            Experience Pandora like never before.
                        </p>
                        <div className="hero-buttons">
                            <button>Book Now</button>
                            <button>Watch Trailer</button>
                        </div>
                    </div>
                    <div className="hero-right">
                        <img src={poster} alt="Avatar Poster" className="movie-poster" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default MovieHero;