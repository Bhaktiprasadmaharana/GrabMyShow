function HeroSkeleton() {
    return (
        <section className="hero hero-skeleton">
            <div className="hero-overlay">
                <div className="hero-content">
                    <div className="skeleton skeleton-rating"></div>

                    <div className="skeleton skeleton-hero-title"></div>

                    <div className="skeleton skeleton-genres"></div>

                    <div className="skeleton skeleton-description"></div>

                    <div className="skeleton skeleton-description short"></div>

                    <div className="hero-buttons">
                        <div className="skeleton skeleton-button"></div>

                        <div className="skeleton skeleton-button"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroSkeleton;