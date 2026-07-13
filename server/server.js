import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();

app.use(cors());
// Clerk webhook must receive the raw request body
app.use("/api/users", userRoutes);

// Parse JSON for all other routes
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
    res.send("GrabMyShow Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});