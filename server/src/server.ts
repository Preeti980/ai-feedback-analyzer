import dotenv from "dotenv";

dotenv.config();

import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import feedbackRoutes from "./routes/feedback.routes.js";

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/feedback", feedbackRoutes);

app.get("/", (req, res) => {
  res.send("API Running...");
});

console.log("KEY LOADED:", process.env.GROQ_API_KEY);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});