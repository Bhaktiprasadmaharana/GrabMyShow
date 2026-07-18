import React from "react";
import Seat from "./Seat";
import "./SeatGrid.css";

const SeatGrid = ({
  layout,
  selectedSeats,
  setSelectedSeats,
  maxSeats,
}) => {
  if (!layout || !layout.sections?.length) {
    return (
      <div style={{ textAlign: "center", color: "white", padding: "60px" }}>
        <h2>Seat layout not available</h2>
      </div>
    );
  }

  const bookedSeats = [
    "P3", "P9",
    "N5", "N12",
    "M2", "M10",
    "L8",
    "K6",
    "J4", "J11",
    "H7",
    "G3",
    "F10",
    "E8",
    "D5",
    "C11",
    "B2",
    "A9",
  ];

  const handleSeatClick = (seatId) => {
    if (bookedSeats.includes(seatId)) {
      return;
    }
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatId));
      return;
    }

    if (selectedSeats.length >= maxSeats) {
      alert(`You can only select ${maxSeats} seat(s).`);
      return;
    }

    setSelectedSeats([...selectedSeats, seatId]);
  };

  return (
    <div className="seat-grid">
      {layout.sections.map((section) => (
        <div key={section.name} className="seat-section">
          <div className="section-divider">
            <span></span>
            <h3 className="section-title">₹{section.price} {section.name.toUpperCase()}</h3>
            <span></span>
          </div>

          {section.rows.map((rowData) => {
            const leftCount = Math.ceil(rowData.seats / 2);
            const rightCount = rowData.seats - leftCount;

            const leftSeats = Array.from({ length: leftCount }, (_, index) => index + 1);
            const rightSeats = Array.from({ length: rightCount }, (_, index) => leftCount + index + 1);

            return (
              <div key={rowData.row} className="seat-row">
                <div className="row-name">{rowData.row}</div>

                <div className="seat-block left-block">
                  {leftSeats.map((seat) => (
                    <Seat
                      key={`L-${seat}`}
                      seatNumber={String(seat).padStart(2, "0")}
                      isSelected={selectedSeats.includes(`${rowData.row}${seat}`)}
                      isBooked={bookedSeats.includes(`${rowData.row}${seat}`)}
                      onClick={() => handleSeatClick(`${rowData.row}${seat}`)}
                    />
                  ))}
                </div>

                <div className="center-aisle"></div>

                <div className="seat-block right-block">
                  {rightSeats.map((seat) => (
                    <Seat
                      key={`R-${seat}`}
                      seatNumber={String(seat).padStart(2, "0")}
                      isSelected={selectedSeats.includes(`${rowData.row}${seat}`)}
                      isBooked={bookedSeats.includes(`${rowData.row}${seat}`)}
                      onClick={() => handleSeatClick(`${rowData.row}${seat}`)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default SeatGrid;