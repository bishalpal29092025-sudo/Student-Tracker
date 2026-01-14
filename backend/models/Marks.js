import mongoose from "mongoose";

const marksSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    marks: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
  },
  { timestamps: true }
);

// Prevent duplicate subject marks for a student
marksSchema.index({ studentId: 1, subject: 1 }, { unique: true });

export default mongoose.model("Marks", marksSchema);
