import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../pages/Layout/MainLayout";
import Home from "../pages/Home/Home";
import MovieDetails from "../pages/MovieDetails/MovieDetails";
import Booking from "../pages/Booking/Booking";
import SeatSelection from "../pages/SeatSelection/SeatSelection";
import Movies from "../pages/Movies/Movies";
import NotFound from "../pages/NotFound/NotFound";
import Payment from "../pages/Payment/Payment";
import BookingSuccess from "../pages/BookingSuccess/BookingSuccess";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/book/:id" element={<Booking />} />
          <Route path="/seat-selection/:id" element={<SeatSelection />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/booking-success" element={<BookingSuccess />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;