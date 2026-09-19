import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../../services/authService";
import "./StudentsManagement.css";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

const StudentsManagement = () => {
  const navigate = useNavigate();

  // ==========================================
  // STUDENTS
  // ==========================================

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // FILTERS
  // ==========================================

  const [search, setSearch] = useState("");
  const [department, setDepartment] =
    useState("all");
  const [semester, setSemester] =
    useState("all");
  const [status, setStatus] =
    useState("all");

  // ==========================================
  // VIEW PROFILE
  // ==========================================

  const [selectedStudent, setSelectedStudent] =
    useState(null);

  const [profileLoading, setProfileLoading] =
    useState(false);

  // ==========================================
  // EDIT STUDENT
  // ==========================================

  const [editingStudent, setEditingStudent] =
    useState(null);

  const [editLoading, setEditLoading] =
    useState(false);

  const [editError, setEditError] =
    useState("");

  const [editSuccess, setEditSuccess] =
    useState("");

  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    student_id: "",
    phone: "",
    course: "",
    department: "",
    semester: "",
    date_of_birth: "",
  });

  // ==========================================
  // FETCH ALL STUDENTS
  // ==========================================

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError("");

      const token = getAccessToken();

      if (!token) {
        throw new Error(
          "Your session has expired. Please log in again."
        );
      }

      const response = await fetch(
        `${API_BASE_URL}/management/students`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to fetch students."
        );
      }

      setStudents(data.students || []);
    } catch (err) {
      console.error(
        "Fetch students error:",
        err
      );

      setError(
        err.message ||
          "Unable to load students."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // ==========================================
  // FILTER OPTIONS
  // ==========================================

  const departments = useMemo(() => {
    return [
      ...new Set(
        students
          .map(
            (student) => student.department
          )
          .filter(Boolean)
      ),
    ];
  }, [students]);

  const semesters = useMemo(() => {
    return [
      ...new Set(
        students
          .map(
            (student) => student.semester
          )
          .filter(
            (semester) =>
              semester !== null &&
              semester !== undefined &&
              semester !== ""
          )
      ),
    ].sort((a, b) => a - b);
  }, [students]);

  // ==========================================
  // SEARCH + FILTER
  // ==========================================

  const filteredStudents = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    return students.filter((student) => {
      const matchesSearch =
        !query ||
        String(student.name || "")
          .toLowerCase()
          .includes(query) ||
        String(student.email || "")
          .toLowerCase()
          .includes(query) ||
        String(student.student_id || "")
          .toLowerCase()
          .includes(query);

      const matchesDepartment =
        department === "all" ||
        student.department === department;

      const matchesSemester =
        semester === "all" ||
        String(student.semester) ===
          String(semester);

      const matchesStatus =
        status === "all" ||
        student.status === status;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesSemester &&
        matchesStatus
      );
    });
  }, [
    students,
    search,
    department,
    semester,
    status,
  ]);

  // ==========================================
  // STATISTICS
  // ==========================================

  const activeCount = students.filter(
    (student) =>
      student.status === "active"
  ).length;

  const pendingCount = students.filter(
    (student) =>
      student.status === "pending"
  ).length;

  // ==========================================
  // VIEW STUDENT PROFILE
  // ==========================================

  const handleViewStudent = async (
    student
  ) => {
    try {
      setProfileLoading(true);
      setError("");

      const token = getAccessToken();

      if (!token) {
        throw new Error(
          "Your session has expired. Please log in again."
        );
      }

      // Open modal immediately
      setSelectedStudent(student);

      const response = await fetch(
        `${API_BASE_URL}/management/students/${student.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to fetch student profile."
        );
      }

      if (data.student) {
        setSelectedStudent(data.student);
      }
    } catch (err) {
      console.error(
        "Fetch student profile error:",
        err
      );

      setError(
        err.message ||
          "Unable to load student profile."
      );
    } finally {
      setProfileLoading(false);
    }
  };

  // ==========================================
  // CLOSE PROFILE
  // ==========================================

  const closeProfile = () => {
    setSelectedStudent(null);
    setProfileLoading(false);
  };

  // ==========================================
  // OPEN EDIT FORM
  // ==========================================

  const handleEditStudent = (student) => {
    setEditError("");
    setEditSuccess("");

    setEditingStudent(student);

    setEditForm({
      name: student.name || "",
      email: student.email || "",
      student_id:
        student.student_id || "",
      phone: student.phone || "",
      course: student.course || "",
      department:
        student.department || "",
      semester:
        student.semester !== null &&
        student.semester !== undefined
          ? String(student.semester)
          : "",
      date_of_birth:
        student.date_of_birth || "",
    });

    // Close profile modal
    setSelectedStudent(null);
  };

  // ==========================================
  // EDIT FORM CHANGE
  // ==========================================

  const handleEditChange = (event) => {
    const { name, value } = event.target;

    setEditForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ==========================================
  // SAVE EDITED STUDENT
  // ==========================================

  const handleSaveStudent = async (
    event
  ) => {
    event.preventDefault();

    try {
      setEditLoading(true);
      setEditError("");
      setEditSuccess("");

      const token = getAccessToken();

      if (!token) {
        throw new Error(
          "Your session has expired. Please log in again."
        );
      }

      // -----------------------------
      // Frontend validation
      // -----------------------------

      if (!editForm.name.trim()) {
        setEditError(
          "Student name is required."
        );
        return;
      }

      if (!editForm.email.trim()) {
        setEditError(
          "Student email is required."
        );
        return;
      }

      if (!editForm.student_id.trim()) {
        setEditError(
          "Student ID is required."
        );
        return;
      }

      // -----------------------------
      // Send update
      // -----------------------------

      const response = await fetch(
        `${API_BASE_URL}/management/students/${editingStudent.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify({
            name: editForm.name.trim(),
            email:
              editForm.email
                .trim()
                .toLowerCase(),
            student_id:
              editForm.student_id.trim(),
            phone:
              editForm.phone.trim() ||
              null,
            course:
              editForm.course.trim() ||
              null,
            department:
              editForm.department.trim() ||
              null,
            semester:
              editForm.semester === ""
                ? null
                : Number(editForm.semester),
            date_of_birth:
              editForm.date_of_birth ||
              null,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to update student."
        );
      }

      // -----------------------------
      // Update local student list
      // -----------------------------

      if (data.student) {
        setStudents((previous) =>
          previous.map((student) =>
            student.id === data.student.id
              ? data.student
              : student
          )
        );
      } else {
        await fetchStudents();
      }

      setEditSuccess(
        "Student updated successfully."
      );

      // Close after successful save
      setTimeout(() => {
        setEditingStudent(null);
        setEditSuccess("");
      }, 800);
    } catch (err) {
      console.error(
        "Update student error:",
        err
      );

      setEditError(
        err.message ||
          "Unable to update student."
      );
    } finally {
      setEditLoading(false);
    }
  };

  // ==========================================
  // CLOSE EDIT FORM
  // ==========================================

  const closeEditForm = () => {
    if (editLoading) {
      return;
    }

    setEditingStudent(null);
    setEditError("");
    setEditSuccess("");
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="students-page">

      {/* =====================================
          HEADER
      ====================================== */}

      <div className="students-header">

        <div>

          <button
            className="students-back-button"
            onClick={() =>
              navigate(
                "/management/dashboard"
              )
            }
          >
            ← Back to Dashboard
          </button>

          <h1>Students</h1>

          <p>
            Manage student records,
            profiles and account status.
          </p>

        </div>

        <button
          className="add-student-button"
          onClick={() =>
            navigate(
              "/management/import"
            )
          }
        >
          + Add / Import Students
        </button>

      </div>

      {/* =====================================
          STATISTICS
      ====================================== */}

      <div className="student-stats">

        <div className="student-stat-card">
          <span>Total Students</span>

          <strong>
            {students.length}
          </strong>
        </div>

        <div className="student-stat-card">
          <span>Active</span>

          <strong>
            {activeCount}
          </strong>
        </div>

        <div className="student-stat-card">
          <span>Pending</span>

          <strong>
            {pendingCount}
          </strong>
        </div>

        <div className="student-stat-card">
          <span>Showing</span>

          <strong>
            {filteredStudents.length}
          </strong>
        </div>

      </div>

      {/* =====================================
          FILTERS
      ====================================== */}

      <div className="students-filter-card">

        <input
          type="text"
          placeholder="Search name, email or student ID..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          className="student-search"
        />

        <select
          value={department}
          onChange={(event) =>
            setDepartment(event.target.value)
          }
        >
          <option value="all">
            All Departments
          </option>

          {departments.map((item) => (
            <option
              value={item}
              key={item}
            >
              {item}
            </option>
          ))}
        </select>

        <select
          value={semester}
          onChange={(event) =>
            setSemester(event.target.value)
          }
        >
          <option value="all">
            All Semesters
          </option>

          {semesters.map((item) => (
            <option
              value={item}
              key={item}
            >
              Semester {item}
            </option>
          ))}
        </select>

        <select
          value={status}
          onChange={(event) =>
            setStatus(event.target.value)
          }
        >
          <option value="all">
            All Status
          </option>

          <option value="active">
            Active
          </option>

          <option value="pending">
            Pending
          </option>

          <option value="inactive">
            Inactive
          </option>

          <option value="suspended">
            Suspended
          </option>
        </select>

      </div>

      {/* =====================================
          ERROR
      ====================================== */}

      {error && (
        <div className="students-error">
          {error}
        </div>
      )}

      {/* =====================================
          STUDENTS TABLE
      ====================================== */}

      <div className="students-table-card">

        {loading ? (
          <div className="students-loading">
            Loading students...
          </div>
        ) : filteredStudents.length ===
          0 ? (
          <div className="students-empty">

            <h3>
              No students found
            </h3>

            <p>
              Try changing your search or
              filter criteria.
            </p>

          </div>
        ) : (
          <div className="students-table-wrapper">

            <table className="students-table">

              <thead>

                <tr>
                  <th>Student</th>
                  <th>Student ID</th>
                  <th>Course</th>
                  <th>Department</th>
                  <th>Semester</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>

              </thead>

              <tbody>

                {filteredStudents.map(
                  (student) => (
                    <tr key={student.id}>

                      <td>

                        <div className="student-name-cell">

                          <div className="student-avatar">
                            {String(
                              student.name ||
                                "S"
                            )
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div>

                            <strong>
                              {student.name}
                            </strong>

                            <span>
                              {student.email}
                            </span>

                          </div>

                        </div>

                      </td>

                      <td>
                        {student.student_id}
                      </td>

                      <td>
                        {student.course ||
                          "—"}
                      </td>

                      <td>
                        {student.department ||
                          "—"}
                      </td>

                      <td>
                        {student.semester
                          ? `Sem ${student.semester}`
                          : "—"}
                      </td>

                      <td>

                        <span
                          className={`student-status ${String(
                            student.status ||
                              "pending"
                          ).toLowerCase()}`}
                        >
                          {student.status ||
                            "pending"}
                        </span>

                      </td>

                      <td>

                        <button
                          className="view-student-button"
                          onClick={() =>
                            handleViewStudent(
                              student
                            )
                          }
                        >
                          View
                        </button>

                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>
        )}

      </div>

      {/* =====================================
          STUDENT PROFILE MODAL
      ====================================== */}

      {selectedStudent && (
        <div
          className="student-modal-overlay"
          onClick={closeProfile}
        >

          <div
            className="student-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* MODAL HEADER */}

            <div className="student-modal-header">

              <div>

                <h2>
                  {selectedStudent.name}
                </h2>

                <p>
                  Student ID:{" "}
                  {selectedStudent.student_id}
                </p>

              </div>

              <button
                className="close-modal-button"
                onClick={closeProfile}
              >
                ×
              </button>

            </div>

            {/* PROFILE */}

            {profileLoading ? (
              <div className="students-loading">
                Loading student profile...
              </div>
            ) : (
              <>
                <div className="student-profile-grid">

                  <div>
                    <span>Email</span>

                    <strong>
                      {selectedStudent.email ||
                        "—"}
                    </strong>
                  </div>

                  <div>
                    <span>Phone</span>

                    <strong>
                      {selectedStudent.phone ||
                        "—"}
                    </strong>
                  </div>

                  <div>
                    <span>Course</span>

                    <strong>
                      {selectedStudent.course ||
                        "—"}
                    </strong>
                  </div>

                  <div>
                    <span>Department</span>

                    <strong>
                      {selectedStudent.department ||
                        "—"}
                    </strong>
                  </div>

                  <div>
                    <span>Semester</span>

                    <strong>
                      {selectedStudent.semester ||
                        "—"}
                    </strong>
                  </div>

                  <div>
                    <span>Account Status</span>

                    <strong>
                      {selectedStudent.status ||
                        "pending"}
                    </strong>
                  </div>

                  <div>
                    <span>Email Verified</span>

                    <strong>
                      {selectedStudent.email_verified
                        ? "Yes"
                        : "No"}
                    </strong>
                  </div>

                  <div>
                    <span>Date of Birth</span>

                    <strong>
                      {selectedStudent.date_of_birth ||
                        "—"}
                    </strong>
                  </div>

                </div>

                {/* EDIT BUTTON */}

                <div className="student-profile-actions">

                  <button
                    className="edit-student-button"
                    onClick={() =>
                      handleEditStudent(
                        selectedStudent
                      )
                    }
                  >
                    Edit Student
                  </button>

                </div>
              </>
            )}

          </div>

        </div>
      )}

      {/* =====================================
          EDIT STUDENT MODAL
      ====================================== */}

      {editingStudent && (
        <div
          className="student-modal-overlay"
          onClick={closeEditForm}
        >

          <div
            className="student-modal edit-student-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* EDIT HEADER */}

            <div className="student-modal-header">

              <div>

                <h2>
                  Edit Student
                </h2>

                <p>
                  Update student information
                </p>

              </div>

              <button
                className="close-modal-button"
                onClick={closeEditForm}
                disabled={editLoading}
              >
                ×
              </button>

            </div>

            {/* EDIT ERROR */}

            {editError && (
              <div className="students-error">
                {editError}
              </div>
            )}

            {/* EDIT SUCCESS */}

            {editSuccess && (
              <div className="student-success-message">
                {editSuccess}
              </div>
            )}

            {/* EDIT FORM */}

            <form
              className="student-edit-form"
              onSubmit={handleSaveStudent}
            >

              {/* NAME */}

              <div className="student-form-group">

                <label htmlFor="student-name">
                  Full Name
                </label>

                <input
                  id="student-name"
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleEditChange}
                  placeholder="Enter student name"
                  required
                />

              </div>

              {/* EMAIL */}

              <div className="student-form-group">

                <label htmlFor="student-email">
                  Email Address
                </label>

                <input
                  id="student-email"
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleEditChange}
                  placeholder="Enter email address"
                  required
                />

              </div>

              {/* STUDENT ID */}

              <div className="student-form-group">

                <label htmlFor="student-id">
                  Student ID
                </label>

                <input
                  id="student-id"
                  type="text"
                  name="student_id"
                  value={editForm.student_id}
                  onChange={handleEditChange}
                  placeholder="Enter student ID"
                  required
                />

              </div>

              {/* PHONE */}

              <div className="student-form-group">

                <label htmlFor="student-phone">
                  Phone
                </label>

                <input
                  id="student-phone"
                  type="tel"
                  name="phone"
                  value={editForm.phone}
                  onChange={handleEditChange}
                  placeholder="Enter phone number"
                />

              </div>

              {/* COURSE */}

              <div className="student-form-group">

                <label htmlFor="student-course">
                  Course
                </label>

                <input
                  id="student-course"
                  type="text"
                  name="course"
                  value={editForm.course}
                  onChange={handleEditChange}
                  placeholder="e.g. BCA"
                />

              </div>

              {/* DEPARTMENT */}

              <div className="student-form-group">

                <label htmlFor="student-department">
                  Department
                </label>

                <input
                  id="student-department"
                  type="text"
                  name="department"
                  value={editForm.department}
                  onChange={handleEditChange}
                  placeholder="e.g. Computer Science"
                />

              </div>

              {/* SEMESTER */}

              <div className="student-form-group">

                <label htmlFor="student-semester">
                  Semester
                </label>

                <select
                  id="student-semester"
                  name="semester"
                  value={editForm.semester}
                  onChange={handleEditChange}
                >

                  <option value="">
                    Select Semester
                  </option>

                  <option value="1">
                    Semester 1
                  </option>

                  <option value="2">
                    Semester 2
                  </option>

                  <option value="3">
                    Semester 3
                  </option>

                  <option value="4">
                    Semester 4
                  </option>

                  <option value="5">
                    Semester 5
                  </option>

                  <option value="6">
                    Semester 6
                  </option>

                  <option value="7">
                    Semester 7
                  </option>

                  <option value="8">
                    Semester 8
                  </option>

                </select>

              </div>

              {/* DATE OF BIRTH */}

              <div className="student-form-group">

                <label htmlFor="student-dob">
                  Date of Birth
                </label>

                <input
                  id="student-dob"
                  type="date"
                  name="date_of_birth"
                  value={
                    editForm.date_of_birth
                  }
                  onChange={handleEditChange}
                />

              </div>

              {/* ACTIONS */}

              <div className="student-edit-actions">

                <button
                  type="button"
                  className="cancel-edit-button"
                  onClick={closeEditForm}
                  disabled={editLoading}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-student-button"
                  disabled={editLoading}
                >
                  {editLoading
                    ? "Saving..."
                    : "Save Changes"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
};

export default StudentsManagement;