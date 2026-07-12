

function MovieCardSkeleton() {
    return (
        <div className="movie-card skeleton-card">
            <div className="skeleton skeleton-poster"></div>

            <div className="movie-info">
                <div className="skeleton skeleton-rating"></div>
                <div className="skeleton skeleton-title"></div>
                <div className="skeleton skeleton-text"></div>
                <div className="skeleton skeleton-button"></div>
            </div>
        </div>
    );
}

export default MovieCardSkeleton;