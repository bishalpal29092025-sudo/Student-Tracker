import {
    PieChart, Pie, Cell,
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
  } from "recharts";
  
  export default function Charts({ attendance, marks }) {
    const pieData = attendance
      ? [
          { name: "Present", value: attendance.presentCount },
          { name: "Absent", value: attendance.absentCount },
        ]
      : [];
  
    return (
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-6 rounded shadow">
          <h3 className="font-semibold mb-4">Attendance</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} dataKey="value" outerRadius={80} label>
                <Cell fill="#4F46E5" />
                <Cell fill="#EF4444" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
  
        <div className="bg-white p-6 rounded shadow">
          <h3 className="font-semibold mb-4">Marks</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={marks}>
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="marks" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
  