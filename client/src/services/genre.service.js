import axios from "axios";

export async function getMovieGenres() {
  const response = await axios.get(
    "http://localhost:8000/api/movies/genres"
  );

  return response.data.genres;
}