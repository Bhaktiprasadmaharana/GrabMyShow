import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import movieRoutes from "./routes/movie.routes.js";

import showRoutes from "./routes/show.routes.js";
import theatreRoutes from "./routes/theatre.routes.js";


const app = express();

app.use(cors());

// Parse JSON for API requests
app.use(express.json());

// Routes
app.use("/api/movies", movieRoutes);
app.use("/api/shows", showRoutes);
app.use("/api/theatres", theatreRoutes);
app.use("/api/users", userRoutes);

connectDB();

app.get("/", (req, res) => {
    res.send("GrabMyShow Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});