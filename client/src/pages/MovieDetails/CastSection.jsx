

import "./CastSection.css";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w185";

function CastSection({ cast = [] }) {
  if (!cast.length) return null;

  return (
    <section className="cast-section">
      <h2>Top Cast</h2>

      <div className="cast-container">
        {cast.slice(0, 12).map((actor) => (
          <div className="cast-card" key={actor.cast_id || actor.credit_id}>
            <img
              src={
                actor.profile_path
                  ? `${IMAGE_BASE_URL}${actor.profile_path}`
                  : "https://via.placeholder.com/185x278?text=No+Image"
              }
              alt={actor.name}
              loading="lazy"
            />

            <h3>{actor.name}</h3>
            <p>{actor.character}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CastSection;