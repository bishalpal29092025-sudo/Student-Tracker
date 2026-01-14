const BASE_URL = "https://student-tracker-backend-h2q1.onrender.com/api";


function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

/* AUTH */
export async function loginUser(email, password) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login failed");
  return data;
}

/* STUDENTS */
export async function getStudents() {
  const res = await fetch(`${BASE_URL}/students`, {
    headers: getAuthHeaders(),
  });
  return res.json();
}

/* ATTENDANCE */
export async function getAttendanceReport(studentId) {
  const res = await fetch(
    `${BASE_URL}/attendance/report/${studentId}`,
    { headers: getAuthHeaders() }
  );
  return res.json();
}

export async function getAttendanceHistory(studentId) {
  const res = await fetch(
    `${BASE_URL}/attendance/${studentId}`,
    { headers: getAuthHeaders() }
  );
  return res.json();
}

/* MARKS */
export async function getMarksReport(studentId) {
  const res = await fetch(
    `${BASE_URL}/marks/report/${studentId}`,
    { headers: getAuthHeaders() }
  );
  return res.json();
}

export async function getStudentMarks(studentId) {
  const res = await fetch(
    `${BASE_URL}/marks/${studentId}`,
    { headers: getAuthHeaders() }
  );
  return res.json();
}
