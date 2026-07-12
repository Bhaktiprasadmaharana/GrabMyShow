import axios from "axios";
import {
    TMDB_API_KEY,
    TMDB_BASE_URL,
} from "../constants/api";

const api = axios.create({
    baseURL: TMDB_BASE_URL,
});

export const getNowPlayingMovies = async (page = 1) => {
    const response = await api.get("/movie/now_playing", {
        params: {
            api_key: TMDB_API_KEY,
            page,
        },
    });

    return response.data.results;
};

export const getTrendingMovies = async (page = 1) => {
    const response = await api.get("/trending/movie/week", {
        params: {
            api_key: TMDB_API_KEY,
            page,
        },
    });

    return response.data.results;
};

export const getUpcomingMovies = async (page = 1) => {
    const response = await api.get("/movie/upcoming", {
        params: {
            api_key: TMDB_API_KEY,
            page,
        },
    });

    return response.data.results;
};
export const getBollywoodMovies = async (page = 1) => {
  const response = await api.get("/discover/movie", {
    params: {
      api_key: TMDB_API_KEY,
      with_original_language: "hi",
      sort_by: "popularity.desc",
      page,
    },
  });

  return response.data.results;
};

export const searchMovies = async (query) => {
  if (!query.trim()) return [];

  const response = await api.get("/search/movie", {
    params: {
      api_key: TMDB_API_KEY,
      query,
      include_adult: false,
      language: "en-US",
    },
  });

  return response.data.results;
};

export const getMovieDetails = async (movieId) => {
  const response = await api.get(`/movie/${movieId}`, {
    params: {
      api_key: TMDB_API_KEY,
      language: "en-US",
    },
  });

  return response.data;
};

export const getMovieCredits = async (movieId) => {
  const response = await api.get(`/movie/${movieId}/credits`, {
    params: {
      api_key: TMDB_API_KEY,
      language: "en-US",
    },
  });

  return response.data.cast;
};

export const getMovieVideos = async (movieId) => {
  const response = await api.get(`/movie/${movieId}/videos`, {
    params: {
      api_key: TMDB_API_KEY,
      language: "en-US",
    },
  });

  return response.data.results;
};

export const getSimilarMovies = async (movieId) => {
  const response = await api.get(`/movie/${movieId}/similar`, {
    params: {
      api_key: TMDB_API_KEY,
      language: "en-US",
    },
  });

  return response.data.results;
};