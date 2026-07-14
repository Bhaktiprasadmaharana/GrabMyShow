import Show from "../models/Show.js";
import Theatre from "../models/Theatre.js";
import { getNowPlayingFromTMDB } from "../services/tmdb.service.js";

export const getShowsByMovie = async (req, res) => {
  try {
    const movieId = Number(req.params.movieId);
    if (Number.isNaN(movieId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid movie ID",
      });
    }

    const shows = await Show.find({
      movieId,
      isActive: true,
    }).populate("theatre");

    res.status(200).json({
      success: true,
      shows,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch shows",
    });
  }
};

export const syncNowPlayingShows = async (req, res) => {
  try {
    const movies = await getNowPlayingFromTMDB();
    const theatres = await Theatre.find();

    if (!theatres.length) {
      return res.status(400).json({
        success: false,
        message: "No theatres found. Seed theatres first.",
      });
    }

    let created = 0;

    for (const movie of movies) {
      const exists = await Show.exists({ movieId: movie.id });
      if (exists) continue;

      const defaultTimes = ["10:00 AM", "2:00 PM", "6:00 PM"];

      const docs = theatres.flatMap((theatre) =>
        defaultTimes.map((time) => ({
          movieId: movie.id,
          theatre: theatre._id,
          screen: 1,
          showDate: new Date(),
          showTime: time,
          ticketPrice: 220,
          isActive: true,
        }))
      );

      await Show.insertMany(docs);
      created += docs.length;
    }

    res.status(200).json({
      success: true,
      message: "Now Playing shows synced successfully.",
      created,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to sync now playing shows.",
    });
  }
};