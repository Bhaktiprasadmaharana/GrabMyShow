import "./SeatCountModal.css";

const SeatCountModal = ({
  open,
  seatCount,
  setSeatCount,
  onContinue,
  onClose,
}) => {
  if (!open) return null;

  return (
    <div className="seat-modal-overlay">
      <div className="seat-modal">
        <h2>Select Number of Seats</h2>

        <div className="seat-number-list">
          {[...Array(10)].map((_, i) => (
            <button
              key={i}
              className={seatCount === i + 1 ? "active" : ""}
              onClick={() => setSeatCount(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <div className="seat-pricing">
          <div>
            <h4>VIP</h4>
            <p>₹750</p>
          </div>

          <div>
            <h4>Prime</h4>
            <p>₹430</p>
          </div>

          <div>
            <h4>Classic</h4>
            <p>₹250</p>
          </div>
        </div>

        <div className="seat-buttons">
          <button
            className="cancel-btn"
            onClick={onClose}
            type="button"
          >
            <span className="btn-label">Cancel</span>
          </button>

          <button
            className="continue-btn"
            onClick={onContinue}
            type="button"
          >
            <span>Continue</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeatCountModal;