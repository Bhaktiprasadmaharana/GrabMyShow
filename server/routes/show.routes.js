import express from "express";
import {
  getShowsByMovie,
  syncNowPlayingShows,
} from "../controllers/show.controller.js";

const router = express.Router();

// Sync TMDB now playing movies into shows
router.post("/sync-now-playing", syncNowPlayingShows);

// Get all active shows for a movie (TMDB movie ID)
router.get("/:movieId", getShowsByMovie);

export default router;
