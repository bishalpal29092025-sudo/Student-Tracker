export default function StudentSelector({ students, selectedStudentId, onChange }) {
    return (
      <div className="bg-white p-4 rounded shadow mb-6">
        <label className="block mb-2 text-sm text-gray-600">
          Select Student
        </label>
        <select
          value={selectedStudentId}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border p-2 rounded"
        >
          {students.map((s) => (
            <option key={s._id} value={s._id}>
              {s.userId.name} ({s.rollNo})
            </option>
          ))}
        </select>
      </div>
    );
  }
  