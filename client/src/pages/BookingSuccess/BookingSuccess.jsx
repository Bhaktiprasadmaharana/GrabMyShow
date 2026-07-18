import { useLocation } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import "./BookingSuccess.css";
import { jsPDF } from "jspdf";
import { useRef } from "react";
import html2canvas from "html2canvas";

const BookingSuccess = () => {
  const { state } = useLocation();
  const ticketRef = useRef(null);

  const {
    bookingId,
    paymentId,
    movie,
    poster,
    theatre,
    date,
    time,
    language,
    format,
    selectedSeats = [],
    totalPrice,
  } = state || {};

  const qrData = JSON.stringify({
    bookingId,
    paymentId,
    movie,
    theatre,
    date,
    time,
    seats: selectedSeats,
    totalPrice,
  });

  const downloadTicket = async () => {
    if (!ticketRef.current) return;

    const canvas = await html2canvas(ticketRef.current, {
      scale: 3,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
      windowWidth: ticketRef.current.scrollWidth,
      windowHeight: ticketRef.current.scrollHeight,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: canvas.width > canvas.height ? "landscape" : "portrait",
      unit: "px",
      format: [canvas.width, canvas.height],
      compress: true,
    });

    pdf.addImage(
      imgData,
      "PNG",
      0,
      0,
      canvas.width,
      canvas.height,
      undefined,
      "FAST"
    );
    pdf.save(`GrabMyShow-${bookingId}.pdf`);
  };

  return (
    <div className="success-page">
      <div className="success-card">
        <h1>🎟 Your Ticket</h1>
        <p>Booking Confirmed • Enjoy your movie!</p>

        <div className="ticket-details" ref={ticketRef}>
          <div className="ticket-header">
            <div className="ticket-movie-info">
              <div className="ticket-movie-poster">
                <img
                  src={poster || "https://placehold.co/300x450?text=No+Poster"}
                  alt={movie}
                />
              </div>

              <div className="ticket-movie-content">
                <h2>{movie}</h2>
                <div className="ticket-movie-tags">
                  <span>{language}</span>
                  <span>{format}</span>
                </div>
                <p>📅 {date}</p>
                <p>🕒 {time}</p>
                <p>📍 {theatre}</p>
              </div>
            </div>
          </div>

          
          <p>
            <strong>Seat</strong>
            <span className="seat-chip">{selectedSeats.join(", ")}</span>
          </p>
          <p><strong>Total</strong><span>₹{totalPrice}</span></p>

          <div className="ticket-divider"></div>

          <div className="screen-section">
            <small>1 Ticket</small>
            <h3>SCREEN 1</h3>
          </div>

          <div className="qr-section">
            <QRCodeCanvas value={qrData} size={200} />
          </div>

          <p><strong>Booking ID</strong><span>{bookingId}</span></p>
          <p><strong>Payment ID</strong><span>{paymentId}</span></p>
        </div>

        <div className="ticket-actions">
          <button
            className="download-btn"
            onClick={downloadTicket}
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;