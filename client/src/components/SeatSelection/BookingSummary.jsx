import "./BookingSummary.css";
import { useNavigate } from "react-router-dom";

const BookingSummary = ({
  movie,
  poster,
  theatre,
  date,
  time,
  language,
  format,
  selectedSeats = [],
  totalPrice = 0,
  onContinue,
}) => {
  const navigate = useNavigate();
  return (
    <div className="booking-summary">
      <h2 className="summary-title">Booking Summary</h2>

      <div className="summary-section">
        <div className="summary-row">
          <span>Movie</span>
          <strong>{movie}</strong>
        </div>

        <div className="summary-row">
          <span>Theatre</span>
          <strong>{theatre}</strong>
        </div>

        <div className="summary-row">
          <span>Date</span>
          <strong>{date}</strong>
        </div>

        <div className="summary-row">
          <span>Time</span>
          <strong>{time}</strong>
        </div>

        <div className="summary-row">
          <span>Language</span>
          <strong>{language}</strong>
        </div>

        <div className="summary-row">
          <span>Format</span>
          <strong>{format}</strong>
        </div>
      </div>

      <hr />

      <div className="summary-section">
        <div className="summary-row">
          <span>Seats</span>
          <strong>
            {selectedSeats.length
              ? selectedSeats.join(", ")
              : "None Selected"}
          </strong>
        </div>

        <div className="summary-row">
          <span>Tickets</span>
          <strong>{selectedSeats.length}</strong>
        </div>

        <div className="summary-row total">
          <span>Total</span>
          <strong>₹{totalPrice}</strong>
        </div>
      </div>

      <button
        className="continue-btn"
        disabled={!selectedSeats.length}
        onClick={() =>
          navigate("/payment", {
            state: {
              movie,
              poster,
              theatre,
              date,
              time,
              language,
              format,
              selectedSeats,
              totalPrice,
            },
          })
        }
      >
        Continue
      </button>
    </div>
  );
};

export default BookingSummary;