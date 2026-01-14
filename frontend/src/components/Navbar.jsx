import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const active = (path) =>
    location.pathname === path
      ? "text-indigo-600 font-semibold"
      : "text-gray-600 hover:text-indigo-600";

  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between">
      <div className="flex gap-6 items-center">
        <h1
          onClick={() => navigate("/dashboard")}
          className="text-xl font-bold text-indigo-600 cursor-pointer"
        >
          Student Tracker
        </h1>

        <button onClick={() => navigate("/dashboard")} className={active("/dashboard")}>
          Dashboard
        </button>
        <button onClick={() => navigate("/attendance")} className={active("/attendance")}>
          Attendance
        </button>
        <button onClick={() => navigate("/marks")} className={active("/marks")}>
          Marks
        </button>
      </div>

      <div className="flex gap-4 items-center">
        <span className="text-sm text-gray-500">
          {user?.name} ({user?.role})
        </span>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
