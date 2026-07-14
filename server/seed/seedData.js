

import mongoose from "mongoose";
import dotenv from "dotenv";
import Theatre from "../models/Theatre.js";
import Show from "../models/Show.js";

dotenv.config();

const theatres = [
  {
    name: "PVR Nexus Mall",
    city: "Bhubaneswar",
    address: "Nexus Esplanade Mall",
    screens: 5,
    facilities: ["Dolby Atmos", "Parking", "Food Court"],
  },
  {
    name: "INOX Esplanade",
    city: "Bhubaneswar",
    address: "Esplanade One Mall",
    screens: 4,
    facilities: ["Recliner", "Parking"],
  },
  {
    name: "Cinepolis DN Regalia",
    city: "Bhubaneswar",
    address: "DN Regalia Mall",
    screens: 6,
    facilities: ["4K", "Dolby Atmos", "Parking"],
  },
  {
    name: "Miraj Cinemas",
    city: "Cuttack",
    address: "CDA Sector 11",
    screens: 4,
    facilities: ["Parking", "Food Court"],
  },
  {
    name: "Cinepolis CDA",
    city: "Cuttack",
    address: "CDA Square",
    screens: 5,
    facilities: ["Dolby Atmos", "Parking"],
  },
  {
    name: "PVR Mani Square",
    city: "Kolkata",
    address: "Mani Square Mall",
    screens: 6,
    facilities: ["IMAX", "Dolby Atmos", "Parking"],
  },
  {
    name: "INOX South City",
    city: "Kolkata",
    address: "South City Mall",
    screens: 5,
    facilities: ["Recliner", "Parking"],
  },
  {
    name: "PVR Orion",
    city: "Bengaluru",
    address: "Orion Mall",
    screens: 8,
    facilities: ["IMAX", "Dolby Atmos", "Parking"],
  },
  {
    name: "INOX Forum",
    city: "Bengaluru",
    address: "Forum Mall Koramangala",
    screens: 6,
    facilities: ["Recliner", "Parking"],
  },
  {
    name: "Cinepolis Vega City",
    city: "Bengaluru",
    address: "Vega City Mall",
    screens: 5,
    facilities: ["4K", "Parking"],
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    await Theatre.deleteMany();
    await Show.deleteMany();

    const createdTheatres = await Theatre.insertMany(theatres);

    const [pvr, inox, cinepolis] = createdTheatres;

    // Add more movieIds as needed
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const shows = [
      {
        movieId: 1108427,
        theatre: pvr._id,
        screen: 1,
        showDate: today,
        showTime: "10:00 AM",
        ticketPrice: 220,
      },
      {
        movieId: 1108427,
        theatre: pvr._id,
        screen: 2,
        showDate: today,
        showTime: "3:00 PM",
        ticketPrice: 240,
      },
      {
        movieId: 1108427,
        theatre: inox._id,
        screen: 1,
        showDate: today,
        showTime: "1:00 PM",
        ticketPrice: 230,
      },
      {
        movieId: 1108427,
        theatre: cinepolis._id,
        screen: 1,
        showDate: today,
        showTime: "11:30 AM",
        ticketPrice: 200,
      },
      // Enola Holmes 3 (1202033)
      {
        movieId: 1202033,
        theatre: pvr._id,
        screen: 3,
        showDate: today,
        showTime: "12:00 PM",
        ticketPrice: 210,
      },
      {
        movieId: 1202033,
        theatre: inox._id,
        screen: 2,
        showDate: today,
        showTime: "4:00 PM",
        ticketPrice: 250,
      },
      {
        movieId: 1202033,
        theatre: cinepolis._id,
        screen: 2,
        showDate: today,
        showTime: "7:00 PM",
        ticketPrice: 260,
      },
      // Welcome to the Jungle (1169516)
      {
        movieId: 1169516,
        theatre: pvr._id,
        screen: 4,
        showDate: today,
        showTime: "6:00 PM",
        ticketPrice: 215,
      },
      {
        movieId: 1169516,
        theatre: inox._id,
        screen: 3,
        showDate: today,
        showTime: "8:00 PM",
        ticketPrice: 245,
      },
      {
        movieId: 1169516,
        theatre: cinepolis._id,
        screen: 3,
        showDate: today,
        showTime: "5:30 PM",
        ticketPrice: 230,
      },
      // Add a few more showtimes for tomorrow for variety
      {
        movieId: 1108427,
        theatre: pvr._id,
        screen: 1,
        showDate: tomorrow,
        showTime: "10:00 AM",
        ticketPrice: 220,
      },
      {
        movieId: 1202033,
        theatre: inox._id,
        screen: 2,
        showDate: tomorrow,
        showTime: "4:00 PM",
        ticketPrice: 250,
      },
      {
        movieId: 1169516,
        theatre: cinepolis._id,
        screen: 3,
        showDate: tomorrow,
        showTime: "5:30 PM",
        ticketPrice: 230,
      },
    ];

    await Show.insertMany(shows);

    console.log(`✅ ${createdTheatres.length} theatres inserted.`);
    console.log(`✅ ${shows.length} shows inserted.`);

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seed();