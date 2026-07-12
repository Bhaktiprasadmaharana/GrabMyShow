function EmptyState({
  icon = "🎬",
  title = "Nothing Here",
  message = "There's nothing to display right now.",
}) {
  return (
    <div className="empty-state">
      <div className="empty-icon">{icon}</div>

      <h2>{title}</h2>

      <p>{message}</p>
    </div>
  );
}

export default EmptyState;