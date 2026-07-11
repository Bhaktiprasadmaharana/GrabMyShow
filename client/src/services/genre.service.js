import axios from "axios";
import { TMDB_API_KEY, TMDB_BASE_URL } from "../constants/api";

export async function getMovieGenres() {
  const response = await axios.get(
    `${TMDB_BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}`
  );

  return response.data.genres;
}