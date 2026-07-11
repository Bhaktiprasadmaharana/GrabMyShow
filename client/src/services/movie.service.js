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
