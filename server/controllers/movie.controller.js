import {
    getNowPlayingMovies,
    getPopularMovies,
    getUpcomingMovies,
    getTopRatedMovies,
    getMovieDetails,
    getMovieGenres,
    getIndianMovies,
} from "../services/tmdb.service.js";

export const nowPlayingMovies = async (req, res) => {
    try {
        const movies = await getNowPlayingMovies();

        res.status(200).json({
            success: true,
            movies,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch now playing movies",
        });
    }
};

export const popularMovies = async (req, res) => {
    try {
        const movies = await getPopularMovies();

        res.status(200).json({
            success: true,
            movies,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch popular movies",
        });
    }
};

export const upcomingMovies = async (req, res) => {
    try {
        const movies = await getUpcomingMovies();

        res.status(200).json({
            success: true,
            movies,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch upcoming movies",
        });
    }
};

export const topRatedMovies = async (req, res) => {
    try {
        const movies = await getTopRatedMovies();

        res.status(200).json({
            success: true,
            movies,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch top rated movies",
        });
    }
};

export const movieDetails = async (req, res) => {
    try {
        const { id } = req.params;

        const movie = await getMovieDetails(id);

        res.status(200).json({
            success: true,
            movie,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch movie details",
        });
    }
};
export const movieGenres = async (req, res) => {
    try {
        const genres = await getMovieGenres();

        res.status(200).json({
            success: true,
            genres,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch genres",
        });
    }
};

export const indianMovies = async (req, res) => {
    try {
        const movies = await getIndianMovies();

        res.status(200).json({
            success: true,
            movies,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch Indian movies",
        });
    }
};