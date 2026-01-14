import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import StudentsTable from "../components/StudentsTable";
import StudentSelector from "../components/StudentSelector";
import Charts from "../components/Charts";
import {
  getStudents,
  getAttendanceReport,
  getMarksReport,
  getStudentMarks,
} from "../services/api";

export default function Dashboard() {
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [attendance, setAttendance] = useState(null);
  const [marksReport, setMarksReport] = useState(null);
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStudents() {
      const data = await getStudents();
      setStudents(data);
      if (data.length > 0) setSelectedStudentId(data[0]._id);
      setLoading(false);
    }
    loadStudents();
  }, []);

  useEffect(() => {
    async function loadAnalytics() {
      if (!selectedStudentId) return;

      setAttendance(await getAttendanceReport(selectedStudentId));
      setMarksReport(await getMarksReport(selectedStudentId));
      setMarks(await getStudentMarks(selectedStudentId));
    }
    loadAnalytics();
  }, [selectedStudentId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-6">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-bold mb-6"
        >
          Teacher Dashboard
        </motion.h1>

        <StudentSelector
          students={students}
          selectedStudentId={selectedStudentId}
          onChange={setSelectedStudentId}
        />

        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <StatCard title="Total Students" value={students.length} />
          <StatCard
            title="Attendance %"
            value={`${attendance?.attendancePercentage || 0}%`}
          />
          <StatCard
            title="Average Marks"
            value={marksReport?.average || 0}
          />
        </div>

        <Charts attendance={attendance} marks={marks} />

        <StudentsTable students={students} />
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-2xl shadow-lg p-6"
    >
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-3xl font-bold mt-2">{value}</h2>
    </motion.div>
  );
}
