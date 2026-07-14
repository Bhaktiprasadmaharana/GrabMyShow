import express from "express";

import {
    nowPlayingMovies,
    popularMovies,
    upcomingMovies,
    topRatedMovies,
    movieDetails,
    movieGenres,
    indianMovies,
} from "../controllers/movie.controller.js";

const router = express.Router();

router.get("/now-playing", nowPlayingMovies);
router.get("/popular", popularMovies);
router.get("/upcoming", upcomingMovies);
router.get("/top-rated", topRatedMovies);
router.get("/genres", movieGenres);
router.get("/indian", indianMovies);
router.get("/:id", movieDetails);

export default router;