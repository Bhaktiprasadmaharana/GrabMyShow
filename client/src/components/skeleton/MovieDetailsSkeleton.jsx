import "../../styles/Skeleton.css";

function MovieDetailsSkeleton() {
  return (
    <div className="movie-details-skeleton">
      <div className="movie-details-hero-skeleton">
        <div className="movie-poster-skeleton skeleton"></div>

        <div className="movie-info-skeleton">
          <div className="skeleton skeleton-title"></div>

          <div className="skeleton skeleton-meta"></div>

          <div className="skeleton skeleton-genres"></div>

          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text short"></div>

          <div className="skeleton-buttons">
            <div className="skeleton skeleton-button"></div>
            <div className="skeleton skeleton-button"></div>
          </div>
        </div>
      </div>

      <div className="cast-skeleton">
        <div className="skeleton skeleton-heading"></div>

        <div className="cast-skeleton-row">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="cast-card-skeleton">
              <div className="skeleton cast-image"></div>
              <div className="skeleton cast-name"></div>
              <div className="skeleton cast-role"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="similar-skeleton">
        <div className="skeleton skeleton-heading"></div>

        <div className="cast-skeleton-row">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="movie-card-skeleton">
              <div className="skeleton movie-image"></div>
              <div className="skeleton movie-title"></div>
              <div className="skeleton movie-genre"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieDetailsSkeleton;