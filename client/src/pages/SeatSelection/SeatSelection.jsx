import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./SeatSelection.css";

import SeatGrid from "../../components/SeatSelection/SeatGrid";
import { theatreLayouts } from "../../data/theatreLayouts";
import Screen from "../../components/SeatSelection/Screen";
import BookingSummary from "../../components/SeatSelection/BookingSummary";

const SeatSelection = () => {
  const { state } = useLocation();

  const movie = state?.movie;
  const theatre = state?.theatre;
  const show = state?.show;
  const bookingDate = state?.bookingDate;
  const language = state?.language;
  const format = state?.format;

  const theatreName = theatre?.name || "PVR Nexus Mall";
  const layout = theatreLayouts[theatreName];
  const maxSeats = state?.seatCount || 1;
  const [selectedSeats, setSelectedSeats] = useState([]);

  return (
    <div className="seat-selection-page">
      <div className="seat-container">

        <div className="booking-progress">
          <span>Movie</span>
          <span>›</span>
          <span>Theatre</span>
          <span>›</span>
          <span className="active-step">Seats</span>
        </div>
        <div className="booking-info">
          <h2 className="theatre-name">{theatreName}</h2>

          <p className="movie-meta">
            {language || ""} • {format || "2D"}
          </p>

          <p className="show-details">
            {bookingDate?.day || ""} {bookingDate?.date || ""} • {show?.showTime || ""}
          </p>
        </div>

        <div className="seat-legend">
          <div className="legend-item">
            <span className="legend-box available"></span>
            <p>Available</p>
          </div>

          <div className="legend-item">
            <span className="legend-box selected"></span>
            <p>Selected</p>
          </div>

          <div className="legend-item">
            <span className="legend-box booked"></span>
            <p>Booked</p>
          </div>
        </div>

        <div className="seat-layout-wrapper">
          <div className="seat-layout">
            <SeatGrid
              layout={layout}
              selectedSeats={selectedSeats}
              setSelectedSeats={setSelectedSeats}
              maxSeats={maxSeats}
            />

            <Screen />
          </div>

          <BookingSummary
            movie={movie?.title}
            poster={movie?.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null}
            theatre={theatreName}
            date={`${bookingDate?.day || ""} ${bookingDate?.date || ""}`}
            time={show?.showTime}
            language={language}
            format={format}
            selectedSeats={selectedSeats}
            totalPrice={selectedSeats.length * 250}
            onContinue={() => console.log("Proceed to payment")}
          />
        </div>

      </div>
    </div>
  );
};

export default SeatSelection;