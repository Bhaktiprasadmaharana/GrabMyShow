import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./Booking.css";
import SeatCountModal from "../../components/booking/SeatCountModal";

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const movie = location.state?.movie;
  const selectedMovieLanguage = location.state?.language;
  const selectedMovieFormat = location.state?.format;
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [showCityModal, setShowCityModal] = useState(true);

  const [showSeatModal, setShowSeatModal] = useState(false);
  const [seatCount, setSeatCount] = useState(1);
  const [selectedShow, setSelectedShow] = useState(null);

  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState("All Languages");
  const [selectedTime, setSelectedTime] = useState("Any Time");

  const languageMap = {
    en: "English",
    hi: "Hindi",
    ta: "Tamil",
    te: "Telugu",
    ml: "Malayalam",
    kn: "Kannada",
    bn: "Bengali",
    mr: "Marathi",
    gu: "Gujarati",
    pa: "Punjabi",
  };

  const displayLanguage =
    selectedMovieLanguage ||
    languageMap[movie?.original_language?.toLowerCase()] ||
    movie?.original_language;

  const bookingDates = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index);

    return {
      day: date
        .toLocaleDateString("en-US", { weekday: "short" })
        .toUpperCase(),
      date: date.getDate(),
      month: date
        .toLocaleDateString("en-US", { month: "short" })
        .toUpperCase(),
    };
  });

  useEffect(() => {
    const fetchCities = async () => {
      const res = await fetch("http://localhost:8000/api/theatres/cities");
      const data = await res.json();
      setCities(data.cities || []);
    };

    fetchCities();

    const fetchShows = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/shows/${id}`);
        const data = await res.json();
        setShows(data.shows || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, [id]);

  const filteredShows = shows.filter((show) => {
    const cityMatch = !selectedCity || show.theatre.city === selectedCity;

    const languageMatch =
      selectedLanguage === "All Languages" ||
      displayLanguage === selectedLanguage;

    const hour = Number(show.showTime.split(":")[0]);

    const timeMatch =
      selectedTime === "Any Time" ||
      (selectedTime === "Morning" && hour < 12) ||
      (selectedTime === "Afternoon" && hour >= 12 && hour < 17) ||
      (selectedTime === "Evening" && hour >= 17);

    return cityMatch && languageMatch && timeMatch;
  });

  const groupedShows = useMemo(() => {
    return filteredShows.reduce((acc, show) => {
      const theatreName = show.theatre.name;
      if (!acc[theatreName]) acc[theatreName] = [];
      acc[theatreName].push(show);
      return acc;
    }, {});
  }, [filteredShows]);

  if (loading) {
    return <div className="booking-page">Loading shows...</div>;
  }

  if (shows.length === 0) {
    return (
      <div className="booking-page">
        <h1>Book Tickets</h1>
        <h2>This movie is not currently showing.</h2>
        <p>No theatres or show timings are available.</p>
      </div>
    );
  }

  return (
    <div className="booking-page">
      <div className="booking-header">
        <div className="booking-title">
          <h1 className="movie-booking-title">
            {movie?.title}
            {displayLanguage ? ` (${displayLanguage})` : ""}
          </h1>

          <div className="movie-header-meta">
            {movie?.vote_average && (
              <span className="meta-pill">⭐ {movie.vote_average.toFixed(1)}</span>
            )}

            {movie?.runtime && (
              <span className="meta-pill">   🕒 {movie.runtime} min </span>
            )}

            {movie?.original_language && (
              <span className="meta-pill">
                {displayLanguage}
              </span>
            )}
            {selectedMovieFormat && (
              <span className="meta-pill">
                {selectedMovieFormat}
              </span>
            )}

            {movie?.genres?.map((genre) => (
              <span key={genre.id} className="meta-pill">
                {genre.name}
              </span>
            ))}
          </div>

          <p className="booking-subtitle">Book your tickets now</p>

          <p>
            {selectedCity
              ? `Showing theatres in ${selectedCity}`
              : "Choose a city to continue"}
          </p>
        </div>

        {!showCityModal && (
          <button
            className="change-city-btn"
            onClick={() => setShowCityModal(true)}
          >
            📍 {selectedCity} ▾
          </button>
        )}
      </div>

      {!showCityModal && (
        <div className="booking-toolbar">
          <div className="date-strip">
            {bookingDates.map((item, index) => (
              <button
                key={`${item.day}-${item.date}`}
                className={`date-card ${selectedDateIndex === index ? "active" : ""}`}
                onClick={() => setSelectedDateIndex(index)}
              >
                <span>{item.day}</span>
                <strong>{item.date}</strong>
                <small>{item.month}</small>
              </button>
            ))}
          </div>

          <div className="toolbar-right">
            <div className="filter-strip">
              <select
                className="filter-chip"
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
              >
                <option>All Languages</option>
                <option>English</option>
                <option>Hindi</option>
              </select>
              <select
                className="filter-chip"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              >
                <option>Any Time</option>
                <option>Morning</option>
                <option>Afternoon</option>
                <option>Evening</option>
              </select>
            </div>

            <div className="availability-legend">
              <span><i className="legend available"></i>Available</span>
              <span><i className="legend filling"></i>Fast Filling</span>
            </div>
          </div>
        </div>
      )}

      {showCityModal && (
        <div className="city-modal-overlay">
          <div className="city-modal">
            <h2>📍 Select Your City</h2>

            <div className="city-list">
              {cities.map((city) => (
                <button
                  key={city}
                  className="city-btn"
                  onClick={() => {
                    setSelectedCity(city);
                    setShowCityModal(false);
                  }}
                >
                  📍 {city}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {!showCityModal &&
        Object.entries(groupedShows).map(([theatre, theatreShows]) => (
          <div className="theatre-card" key={theatre}>
            <div className="theatre-header">
              <div>
                <h3>{theatre}</h3>
                <p className="theatre-location">
                  📍 {theatreShows[0].theatre.city} • {theatreShows[0].theatre.address}
                </p>
                <div className="facility-list">
                  {theatreShows[0].theatre.facilities?.map((facility) => (
                    <span key={facility} className="facility-badge">
                      {facility}
                    </span>
                  ))}
                </div>
              </div>
              <div className="theatre-status">
                <span className="cancel-badge">Cancellation Available</span>
                <button className="fav-btn" type="button">♡</button>
              </div>
            </div>

            <div className="show-times">
              {theatreShows.map((show) => (
                <button
                  key={show._id}
                  className="show-time-btn"
                  onClick={() => {
                    setSelectedShow(show);
                    setShowSeatModal(true);
                  }}
                >
                  <strong>{show.showTime}</strong>
                  <small className="show-status">
                    {Math.random() > 0.65 ? "Fast Filling" : "Available"}
                  </small>
                </button>
              ))}
            </div>
          </div>
        ))}
      {!showCityModal && (
        <div className="booking-footer">
          <h3>Can't find your preferred theatre?</h3>
          <p>
            Try changing your city or check back later for newly added shows.
          </p>

          <button
            className="change-location-footer-btn"
            onClick={() => setShowCityModal(true)}
          >
            Change Location
          </button>
        </div>
      )}
      <SeatCountModal
        open={showSeatModal}
        seatCount={seatCount}
        setSeatCount={setSeatCount}
        onClose={() => setShowSeatModal(false)}
        onContinue={() => {
          setShowSeatModal(false);

          if (!selectedShow) return;

          navigate(`/seat-selection/${selectedShow._id}`, {
            state: {
              movie,
              show: selectedShow,
              theatre: selectedShow.theatre,
              seatCount,
              language: selectedMovieLanguage,
              format: selectedMovieFormat,
              bookingDate: bookingDates[selectedDateIndex],
            },
          });
        }}
      />
    </div>
  );
}

export default Booking;