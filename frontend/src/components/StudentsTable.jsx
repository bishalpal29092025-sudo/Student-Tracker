export default function StudentsTable({ students }) {
    return (
      <div className="bg-white p-6 rounded shadow mt-6">
        <h2 className="text-xl font-semibold mb-4">Students</h2>
        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th>Name</th>
              <th>Email</th>
              <th>Roll</th>
              <th>Class</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s._id} className="border-b">
                <td>{s.userId.name}</td>
                <td>{s.userId.email}</td>
                <td>{s.rollNo}</td>
                <td>{s.className}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  