import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import StudentSelector from "../components/StudentSelector";
import {
  getStudents,
  getAttendanceHistory,
} from "../services/api";

export default function Attendance() {
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function loadStudents() {
      const data = await getStudents();
      setStudents(data);
      if (data.length > 0) setSelectedStudentId(data[0]._id);
    }
    loadStudents();
  }, []);

  useEffect(() => {
    async function loadAttendance() {
      if (!selectedStudentId) return;
      setRecords(await getAttendanceHistory(selectedStudentId));
    }
    loadAttendance();
  }, [selectedStudentId]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">
          Attendance History
        </h1>

        <StudentSelector
          students={students}
          selectedStudentId={selectedStudentId}
          onChange={setSelectedStudentId}
        />

        <div className="bg-white rounded shadow p-6 mt-6">
          <table className="w-full">
            <thead>
              <tr className="border-b text-gray-500">
                <th className="text-left py-2">Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r) => (
                <tr key={r._id} className="border-b">
                  <td className="py-3">{r.date}</td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        r.status === "present"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
              {records.length === 0 && (
                <tr>
                  <td colSpan="2" className="text-gray-400 py-4">
                    No attendance records
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
