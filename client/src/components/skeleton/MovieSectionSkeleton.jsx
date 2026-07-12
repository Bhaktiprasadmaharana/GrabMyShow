import MovieCardSkeleton from "./MovieCardSkeleton";

function MovieSectionSkeleton() {
    return (
        <section className="movie-section">
            <div className="section-header">
                <div className="skeleton skeleton-title"></div>
                <div className="skeleton skeleton-link"></div>
            </div>

            <div className="movies-grid">
                {Array.from({ length: 8 }).map((_, index) => (
                    <MovieCardSkeleton key={index} />
                ))}
            </div>
        </section>
    );
}

export default MovieSectionSkeleton;