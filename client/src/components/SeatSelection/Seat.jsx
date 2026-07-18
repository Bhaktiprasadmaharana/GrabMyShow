import React from "react";
import "./Seat.css";

const Seat = ({
  seatNumber,
  isSelected,
  isBooked,
  onClick,
}) => {
  let className = "seat";

  if (isBooked) className += " booked";
  else if (isSelected) className += " selected";
  else className += " available";

  return (
    <button
      className={className}
      disabled={isBooked}
      onClick={onClick}
    >
      {seatNumber}
    </button>
  );
};

export default Seat;