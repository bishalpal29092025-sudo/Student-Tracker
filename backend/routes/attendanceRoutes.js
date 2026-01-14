import express from "express";
import Attendance from "../models/Attendance.js";
import { protect, teacherOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @route   POST /api/attendance
 * @desc    Mark attendance (Teacher only)
 */
router.post("/", protect, teacherOnly, async (req, res) => {
  try {
    const { studentId, date, status } = req.body;

    const attendance = await Attendance.create({
      studentId,
      date,
      status,
    });

    res.status(201).json(attendance);
  } catch (error) {
    // Duplicate attendance for same day
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Attendance already marked for this date" });
    }

    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   GET /api/attendance/:studentId
 * @desc    Get attendance of a student
 */
router.get("/:studentId", protect, async (req, res) => {
  const attendance = await Attendance.find({
    studentId: req.params.studentId,
  }).sort({ date: -1 });

  res.json(attendance);
});

/**
 * @route   GET /api/attendance/report/:studentId
 * @desc    Get attendance summary for a student
 */
router.get("/report/:studentId", protect, async (req, res) => {
  try {
    const { studentId } = req.params;

    const totalClasses = await Attendance.countDocuments({ studentId });
    const presentCount = await Attendance.countDocuments({
      studentId,
      status: "present",
    });

    const absentCount = totalClasses - presentCount;
    const attendancePercentage =
      totalClasses === 0 ? 0 : ((presentCount / totalClasses) * 100).toFixed(2);

    res.json({
      totalClasses,
      presentCount,
      absentCount,
      attendancePercentage,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   GET /api/attendance/monthly/:studentId/:month
 * @desc    Get monthly attendance report
 */
router.get("/monthly/:studentId/:month", protect, async (req, res) => {
  try {
    const { studentId, month } = req.params;
    // month format: YYYY-MM
    const records = await Attendance.find({
      studentId,
      date: { $regex: `^${month}` },
    });

    const total = records.length;
    const present = records.filter((r) => r.status === "present").length;

    res.json({
      month,
      totalClasses: total,
      presentCount: present,
      absentCount: total - present,
      percentage: total === 0 ? 0 : ((present / total) * 100).toFixed(2),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
