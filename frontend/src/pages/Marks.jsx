import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import StudentSelector from "../components/StudentSelector";
import {
  getStudents,
  getStudentMarks,
  getMarksReport,
} from "../services/api";

export default function Marks() {
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [marks, setMarks] = useState([]);
  const [report, setReport] = useState(null);

  useEffect(() => {
    async function loadStudents() {
      const data = await getStudents();
      setStudents(data);
      if (data.length > 0) setSelectedStudentId(data[0]._id);
    }
    loadStudents();
  }, []);

  useEffect(() => {
    async function loadMarks() {
      if (!selectedStudentId) return;
      setMarks(await getStudentMarks(selectedStudentId));
      setReport(await getMarksReport(selectedStudentId));
    }
    loadMarks();
  }, [selectedStudentId]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">
          Marks & Grades
        </h1>

        <StudentSelector
          students={students}
          selectedStudentId={selectedStudentId}
          onChange={setSelectedStudentId}
        />

        {report && (
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <Stat title="Subjects" value={report.totalSubjects} />
            <Stat title="Average" value={report.average} />
            <Stat title="Grade" value={report.grade} />
          </div>
        )}

        <div className="bg-white rounded shadow p-6 mt-6">
          <table className="w-full">
            <thead>
              <tr className="border-b text-gray-500">
                <th className="text-left">Subject</th>
                <th>Marks</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {marks.map((m) => (
                <tr key={m._id} className="border-b">
                  <td className="py-3">{m.subject}</td>
                  <td>{m.marks}</td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        m.marks >= 40
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {m.marks >= 40 ? "Pass" : "Fail"}
                    </span>
                  </td>
                </tr>
              ))}
              {marks.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-gray-400 py-4">
                    No marks available
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

function Stat({ title, value }) {
  return (
    <div className="bg-white rounded shadow p-6">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-3xl font-bold">{value}</h2>
    </div>
  );
}
