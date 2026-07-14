function HeroSkeleton() {
    return (
        <section className="hero hero-skeleton">
            <div className="hero-overlay">
                <div className="hero-content">
                    <div className="skeleton skeleton-rating" />

                    <div className="skeleton skeleton-hero-title" />
                    <div className="skeleton skeleton-hero-title short" />

                    <div className="skeleton skeleton-genres" />

                    <div className="skeleton skeleton-description" />
                    <div className="skeleton skeleton-description" />
                    <div className="skeleton skeleton-description short" />

                    <div className="hero-buttons">
                        <div className="skeleton skeleton-button" />
                    </div>
                </div>

                <div className="hero-skeleton-poster">
                    <div className="skeleton skeleton-poster" />
                </div>
            </div>
        </section>
    );
}

export default HeroSkeleton;