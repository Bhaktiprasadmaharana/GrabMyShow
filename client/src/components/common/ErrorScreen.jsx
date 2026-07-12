

function ErrorScreen({
  message = "Something went wrong.",
  onRetry,
}) {
  return (
    <div className="error-screen">
      <div className="error-content">
        <div className="error-icon">🎬</div>

        <h2>Oops!</h2>

        <p>{message}</p>

        {onRetry && (
          <button className="retry-btn" onClick={onRetry}>
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}

export default ErrorScreen;