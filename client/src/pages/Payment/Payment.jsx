
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Payment.css";

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    movie,
    theatre,
    date,
    time,
    language,
    format,
    selectedSeats = [],
    totalPrice = 0,
  } = state || {};

  const handlePayment = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const bookingId = `GMS${Date.now()}`;

      navigate("/booking-success", {
        state: {
          ...state,
          bookingId,
          paymentId: `PAY${Date.now()}`,
        },
      });
    }, 2000);
  };

  return (
    <div className="payment-page">
      <div className="payment-container">
        <h1>Payment</h1>

        <div className="payment-card">
          <h2>Booking Summary</h2>

          <div className="payment-row"><span>Movie</span><span>{movie}</span></div>
          <div className="payment-row"><span>Theatre</span><span>{theatre}</span></div>
          <div className="payment-row"><span>Date</span><span>{date}</span></div>
          <div className="payment-row"><span>Time</span><span>{time}</span></div>
          <div className="payment-row"><span>Language</span><span>{language}</span></div>
          <div className="payment-row"><span>Format</span><span>{format}</span></div>
          <div className="payment-row"><span>Seats</span><span>{selectedSeats.join(", ") || "None"}</span></div>
          <div className="payment-row total"><span>Total</span><span>₹{totalPrice}</span></div>
        </div>

        <div className="payment-card">
          <h2>Choose Payment Method</h2>

          <label><input type="radio" name="payment" defaultChecked /> UPI</label>
          <label><input type="radio" name="payment" /> Credit / Debit Card</label>
          <label><input type="radio" name="payment" /> Net Banking</label>
          <label><input type="radio" name="payment" /> Wallet</label>

          <button
            className="pay-btn"
            onClick={handlePayment}
            disabled={isProcessing}
          >
            {isProcessing
              ? "Processing Payment..."
              : `Proceed to Pay ₹${totalPrice}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;