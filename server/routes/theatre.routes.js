

import express from "express";
import {
  getAllTheatres,
  getCities,
} from "../controllers/theatre.controller.js";

const router = express.Router();

// Get all available cities
router.get("/cities", getCities);

// Get all theatres
router.get("/", getAllTheatres);

export default router;