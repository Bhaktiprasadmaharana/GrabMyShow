

import Theatre from "../models/Theatre.js";

export const getAllTheatres = async (req, res) => {
  try {
    const { city } = req.query;

    const filter = {};

    if (city) {
      filter.city = city;
    }

    const theatres = await Theatre.find(filter).sort({ name: 1 });

    res.status(200).json({
      success: true,
      theatres,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch theatres",
    });
  }
};

export const getCities = async (req, res) => {
  try {
    const cities = await Theatre.distinct("city");

    cities.sort();

    res.status(200).json({
      success: true,
      cities,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch cities",
    });
  }
};