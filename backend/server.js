import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import marksRoutes from "./routes/marksRoutes.js";



dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: "student-tracker-68dfu6x9c-bishal-pals-projects-45b2d78d.vercel.app",
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/marks", marksRoutes);




// Test route
app.get("/", (req, res) => {
  res.send("Student Tracker API is running 🚀");
});



// Connect DB & Start Server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server Started at http://localhost:${PORT}`);
});