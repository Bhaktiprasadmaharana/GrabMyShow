import axios from "axios";

const movieApi = axios.create({
    baseURL: "http://localhost:8000/api/movies",
});

export const getNowPlayingMovies = async () => {
    const { data } = await movieApi.get("/now-playing");
    return data.movies;
};

export const getPopularMovies = async () => {
    const { data } = await movieApi.get("/popular");
    return data.movies;
};

export const getUpcomingMovies = async () => {
    const { data } = await movieApi.get("/upcoming");
    return data.movies;
};

export const getIndianMovies = async () => {
    const { data } = await movieApi.get("/indian");
    return data.movies;
};

export const getTopRatedMovies = async () => {
    const { data } = await movieApi.get("/top-rated");
    return data.movies;
};

export const getMovieDetails = async (id) => {
    const { data } = await movieApi.get(`/${id}`);
    return data.movie;
};