import express from "express";
import Marks from "../models/Marks.js";
import { protect, teacherOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @route   POST /api/marks
 * @desc    Add marks (Teacher only)
 */
router.post("/", protect, teacherOnly, async (req, res) => {
  try {
    const { studentId, subject, marks } = req.body;

    const result = await Marks.create({
      studentId,
      subject,
      marks,
    });

    res.status(201).json(result);
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Marks already added for this subject" });
    }
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   GET /api/marks/:studentId
 * @desc    Get all marks of a student
 */
router.get("/:studentId", protect, async (req, res) => {
  const marks = await Marks.find({ studentId: req.params.studentId });
  res.json(marks);
});

/**
 * @route   GET /api/marks/report/:studentId
 * @desc    Get performance summary
 */
router.get("/report/:studentId", protect, async (req, res) => {
  const records = await Marks.find({ studentId: req.params.studentId });

  const totalSubjects = records.length;
  const totalMarks = records.reduce((sum, r) => sum + r.marks, 0);
  const average =
    totalSubjects === 0 ? 0 : (totalMarks / totalSubjects).toFixed(2);

  let grade = "F";
  if (average >= 90) grade = "A+";
  else if (average >= 80) grade = "A";
  else if (average >= 70) grade = "B";
  else if (average >= 60) grade = "C";

  res.json({
    totalSubjects,
    totalMarks,
    average,
    grade,
  });
});

export default router;
