import "../../styles/TrailerModal.css";

function TrailerModal({ videos = [], isOpen, onClose }) {
  if (!isOpen) return null;

  const trailer =
    videos.find(
      (video) =>
        video.site === "YouTube" &&
        video.official &&
        video.type === "Trailer"
    ) ||
    videos.find(
      (video) =>
        video.site === "YouTube" &&
        video.type === "Trailer"
    ) ||
    videos.find(
      (video) =>
        video.site === "YouTube" &&
        video.type === "Teaser"
    ) ||
    videos.find(
      (video) =>
        video.site === "YouTube" &&
        video.type === "Featurette"
    ) ||
    videos.find(
      (video) =>
        video.site === "YouTube" &&
        video.type === "Clip"
    ) ||
    videos.find((video) => video.site === "YouTube");

  return (
    <div className="trailer-modal" onClick={onClose}>
      <div
        className="trailer-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="close-btn"
          onClick={onClose}
        >
          ✕
        </button>

        {trailer ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${trailer.key}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
            title={trailer.name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            loading="lazy"
            allowFullScreen
          />
        ) : (
          <h2>No trailer available.</h2>
        )}
      </div>
    </div>
  );
}

export default TrailerModal;