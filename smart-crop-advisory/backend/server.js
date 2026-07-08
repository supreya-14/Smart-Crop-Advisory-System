// This is the main entry point of our backend application.
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

// Import all route files
const authRoutes = require("./routes/authRoutes");
const farmRoutes = require("./routes/farmRoutes");
const cropRoutes = require("./routes/cropRoutes");
const advisoryRoutes = require("./routes/advisoryRoutes");
const chatRoutes = require("./routes/chatRoutes");

// Connect to MongoDB
connectDB();

const app = express();

// ----- Middleware -----
// Allow requests from our frontend (CORS)
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Allow the server to understand JSON request bodies
app.use(express.json());

// ----- Simple health check route -----
app.get("/", (req, res) => {
  res.json({ message: "Smart Crop Advisory API is running" });
});

// ----- API Routes -----
app.use("/api/auth", authRoutes);
app.use("/api/farms", farmRoutes);
app.use("/api/crops", cropRoutes);
app.use("/api/advisory", advisoryRoutes);
app.use("/api/chat", chatRoutes);

// ----- Error Handling (must be placed AFTER all routes) -----
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
