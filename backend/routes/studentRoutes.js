import express from "express";
import Student from "../models/Student.js";
import { protect, teacherOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, teacherOnly, async (req, res) => {
  try {
    const { userId, rollNo, className } = req.body;

    const student = await Student.create({
      userId,
      rollNo,
      className,
    });

    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get("/", protect, teacherOnly, async (req, res) => {
  const students = await Student.find().populate("userId", "name email");
  res.json(students);
});

export default router;