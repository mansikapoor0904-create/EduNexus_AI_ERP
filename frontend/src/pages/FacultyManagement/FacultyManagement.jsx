import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  Filter,
  Eye,
  Edit,
  X,
  UserRound,
  Mail,
  Phone,
  Building2,
  BriefcaseBusiness,
  CalendarDays,
  Upload,
} from "lucide-react";

import { getAccessToken } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

import "./FacultyManagement.css";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/* =========================================================
   STAT ICONS
========================================================= */

const StatIcons = {
  Users: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),

  CheckCircle: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),

  XCircle: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  ),

  Clock: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),

  Building: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M16 18h.01" />
      <path d="M8 14h.01" />
      <path d="M8 18h.01" />
      <path d="M8 10h.01" />
    </svg>
  ),
};

/* =========================================================
   COMPONENT
========================================================= */

const FacultyManagement = () => {
  const navigate = useNavigate();

  /* =======================================================
     AUTH
  ======================================================= */

  const {
    loading: authLoading,
    isAuthenticated,
  } = useAuth();

  /* =======================================================
     FACULTY STATE
  ======================================================= */

  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =======================================================
     FILTERS
  ======================================================= */

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("all");
  const [status, setStatus] = useState("all");

  /* =======================================================
     VIEW PROFILE
  ======================================================= */

  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);

  /* =======================================================
     EDIT FACULTY
  ======================================================= */

  const [editingFaculty, setEditingFaculty] = useState(null);
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState("");
  const [editSuccess, setEditSuccess] = useState("");

  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    employee_id: "",
    department: "",
    designation: "",
    phone: "",
    date_of_birth: "",
  });

  /* =======================================================
     STATUS CONFIRMATION
  ======================================================= */

  const [confirmFaculty, setConfirmFaculty] = useState(null);
  const [statusLoading, setStatusLoading] = useState(false);
  const [statusError, setStatusError] = useState("");

  /* =======================================================
     FETCH FACULTY
  ======================================================= */

 const fetchFaculty = async () => {
  try {
    setLoading(true);
    setError("");

    const response = await fetch("http://localhost:5000/api/faculty");

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Unable to fetch faculty.");
    }

    const facultyList = Array.isArray(data)
      ? data
      : data.faculty || data.data || [];

    setFaculty(facultyList);

  } catch (error) {
    console.error("Faculty Error:", error);
    setError(error.message);
    setFaculty([]);
  } finally {
    setLoading(false);
  }
};
  /* =======================================================
     FETCH ONLY AFTER AUTH IS READY
  ======================================================= */

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      fetchFaculty();
    }

    if (!authLoading && !isAuthenticated) {
      setLoading(false);
      setError("Please log in to access faculty management.");
    }
  }, [authLoading, isAuthenticated]);

  /* =======================================================
     DEPARTMENTS
  ======================================================= */

  const departments = useMemo(() => {
    return [
      ...new Set(
        faculty
          .map((item) => item.department)
          .filter(Boolean)
      ),
    ].sort();
  }, [faculty]);

  /* =======================================================
     FILTERED FACULTY
  ======================================================= */

  const filteredFaculty = useMemo(() => {
    const query = search.trim().toLowerCase();

    return faculty.filter((item) => {
      const matchesSearch =
        !query ||
        String(item.name || "")
          .toLowerCase()
          .includes(query) ||
        String(item.email || "")
          .toLowerCase()
          .includes(query) ||
        String(item.employee_id || "")
          .toLowerCase()
          .includes(query);

      const matchesDepartment =
        department === "all" ||
        item.department === department;

      const matchesStatus =
        status === "all" ||
        item.status === status;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesStatus
      );
    });
  }, [
    faculty,
    search,
    department,
    status,
  ]);

  /* =======================================================
     STATISTICS
  ======================================================= */

  const totalFaculty = faculty.length;

  const activeFaculty = faculty.filter(
    (item) => item.status === "active"
  ).length;

  const inactiveFaculty = faculty.filter(
    (item) => item.status === "inactive"
  ).length;

  const pendingFaculty = faculty.filter(
    (item) => item.status === "pending"
  ).length;

  /* =======================================================
     FILTER RESET
  ======================================================= */

  const hasActiveFilters =
    search !== "" ||
    department !== "all" ||
    status !== "all";

  const resetFilters = () => {
    setSearch("");
    setDepartment("all");
    setStatus("all");
  };

  /* =======================================================
     VIEW FACULTY PROFILE
  ======================================================= */

  const handleViewFaculty = async (facultyMember) => {
    try {
      setProfileLoading(true);
      setError("");

      const token = getAccessToken();

      if (!token) {
        throw new Error(
          "Your session has expired. Please log in again."
        );
      }

      // Show basic faculty information immediately
      setSelectedFaculty(facultyMember);

      const response = await fetch(
        `${API_BASE_URL}/management/faculty/${facultyMember.id}`,
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
            "Unable to fetch faculty profile."
        );
      }

      if (data.faculty) {
        setSelectedFaculty(data.faculty);
      }
    } catch (err) {
      console.error(
        "Fetch faculty profile error:",
        err
      );

      setError(
        err.message ||
          "Unable to load faculty profile."
      );
    } finally {
      setProfileLoading(false);
    }
  };

  /* =======================================================
     CLOSE PROFILE
  ======================================================= */

  const closeProfile = () => {
    setSelectedFaculty(null);
    setProfileLoading(false);
  };

  /* =======================================================
     OPEN EDIT FORM
  ======================================================= */

  const handleEditFaculty = (item) => {
    setSelectedFaculty(null);

    setEditError("");
    setEditSuccess("");

    setEditingFaculty(item);

    setEditForm({
      name: item.name || "",
      email: item.email || "",
      employee_id: item.employee_id || "",
      department: item.department || "",
      designation: item.designation || "",
      phone: item.phone || "",
      date_of_birth: item.date_of_birth
        ? String(item.date_of_birth).slice(0, 10)
        : "",
    });
  };

  /* =======================================================
     EDIT FORM CHANGE
  ======================================================= */

  const handleEditChange = (event) => {
    const { name, value } = event.target;

    setEditForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /* =======================================================
     SAVE FACULTY
  ======================================================= */

  const handleSaveFaculty = async (event) => {
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

      if (!editForm.name.trim()) {
        throw new Error("Faculty name is required.");
      }

      if (!editForm.email.trim()) {
        throw new Error("Faculty email is required.");
      }

      if (!editForm.employee_id.trim()) {
        throw new Error("Employee ID is required.");
      }

      const response = await fetch(
        `${API_BASE_URL}/management/faculty/${editingFaculty.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify({
            name: editForm.name.trim(),
            email: editForm.email.trim().toLowerCase(),
            employee_id: editForm.employee_id.trim(),
            department:
              editForm.department.trim() || null,
            designation:
              editForm.designation.trim() || null,
            phone:
              editForm.phone.trim() || null,
            date_of_birth:
              editForm.date_of_birth || null,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to update faculty."
        );
      }

      if (data.faculty) {
        setFaculty((previous) =>
          previous.map((item) =>
            item.id === data.faculty.id
              ? {
                  ...item,
                  ...data.faculty,
                }
              : item
          )
        );
      } else {
        await fetchFaculty();
      }

      setEditSuccess(
        "Faculty record updated successfully."
      );

      setTimeout(() => {
        setEditingFaculty(null);
        setEditSuccess("");
      }, 1000);
    } catch (err) {
      console.error(
        "Update faculty error:",
        err
      );

      setEditError(
        err.message || "Unable to update faculty."
      );
    } finally {
      setEditLoading(false);
    }
  };

  /* =======================================================
     CLOSE EDIT
  ======================================================= */

  const closeEditForm = () => {
    if (editLoading) return;

    setEditingFaculty(null);
    setEditError("");
    setEditSuccess("");
  };

  /* =======================================================
     OPEN STATUS CONFIRMATION
  ======================================================= */

  const handleOpenConfirm = (item, action) => {
    setStatusError("");

    setConfirmFaculty({
      faculty: item,
      action,
    });

    setSelectedFaculty(null);
  };

  /* =======================================================
     CLOSE STATUS CONFIRMATION
  ======================================================= */

  const handleCloseConfirm = () => {
    if (statusLoading) return;

    setConfirmFaculty(null);
    setStatusError("");
  };

  /* =======================================================
     CHANGE STATUS
  ======================================================= */

  const handleConfirmStatusChange = async () => {
    if (!confirmFaculty) return;

    const {
      faculty: item,
      action,
    } = confirmFaculty;

    const newStatus =
      action === "deactivate"
        ? "inactive"
        : "active";

    try {
      setStatusLoading(true);
      setStatusError("");

      const token = getAccessToken();

      if (!token) {
        throw new Error(
          "Your session has expired. Please log in again."
        );
      }

      const response = await fetch(
        `${API_BASE_URL}/management/faculty/${item.id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to update faculty status."
        );
      }

      setFaculty((previous) =>
        previous.map((facultyItem) =>
          facultyItem.id === item.id
            ? {
                ...facultyItem,
                status: newStatus,
              }
            : facultyItem
        )
      );

      setConfirmFaculty(null);
    } catch (err) {
      console.error(
        "Faculty status error:",
        err
      );

      setStatusError(
        err.message ||
          "Unable to update faculty status."
      );
    } finally {
      setStatusLoading(false);
    }
  };

  /* =======================================================
     STATUS CLASS
  ======================================================= */

  const getStatusClass = (value) => {
    switch (String(value || "").toLowerCase()) {
      case "active":
        return "status-active";

      case "pending":
        return "status-pending";

      case "suspended":
        return "status-suspended";

      case "inactive":
        return "status-inactive";

      default:
        return "status-inactive";
    }
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="faculty-page">

      {/* ===================================================
          HEADER
      =================================================== */}

      <div className="faculty-header">

        <div>

          <nav className="breadcrumb-nav">
            <span
              className="breadcrumb-link"
              onClick={() =>
                navigate("/management/dashboard")
              }
            >
              <ArrowLeft
                size={14}
                style={{ marginRight: "4px" }}
              />

              Back to Dashboard
            </span>
          </nav>

          <div className="page-title-group">

            <h1>
              Faculty Directory & Management
            </h1>

            <div className="title-meta">

              <span className="meta-badge">
                <span className="meta-dot active" />
                {activeFaculty} Active Staff
              </span>

              <span className="meta-badge">
                <span className="meta-dot pending" />
                {pendingFaculty} Pending Review
              </span>

              <span className="meta-divider">
                |
              </span>

              <span className="meta-text">
                {totalFaculty} Total Faculty
              </span>

            </div>

          </div>

          <p className="page-description">
            Centralized repository for academic staff
            records, departmental assignments, credential
            management, and employment lifecycle
            administration.
          </p>

        </div>

        <button
          className="import-button"
          onClick={() =>
            navigate(
              "/management/import?type=faculty"
            )
          }
        >
          <Upload size={18} />
          Import Faculty
        </button>

      </div>

      {/* ===================================================
          STATISTICS
      =================================================== */}

      <div className="faculty-stats">

        <div className="stat-card-enhanced">
          <div className="stat-icon-wrapper">
            <StatIcons.Users />
          </div>

          <div className="stat-content">
            <span className="stat-label">
              Total Faculty
            </span>

            <strong>
              {totalFaculty}
            </strong>

            <span className="stat-sublabel">
              Academic Staff
            </span>
          </div>
        </div>

        <div className="stat-card-enhanced">
          <div className="stat-icon-wrapper">
            <StatIcons.CheckCircle />
          </div>

          <div className="stat-content">
            <span className="stat-label">
              Active
            </span>

            <strong className="text-green">
              {activeFaculty}
            </strong>

            <span className="stat-sublabel">
              Currently employed
            </span>
          </div>
        </div>

        <div className="stat-card-enhanced">
          <div className="stat-icon-wrapper">
            <StatIcons.XCircle />
          </div>

          <div className="stat-content">
            <span className="stat-label">
              Inactive
            </span>

            <strong className="text-red">
              {inactiveFaculty}
            </strong>

            <span className="stat-sublabel">
              Deactivated
            </span>
          </div>
        </div>

        <div className="stat-card-enhanced">
          <div className="stat-icon-wrapper">
            <StatIcons.Clock />
          </div>

          <div className="stat-content">
            <span className="stat-label">
              Pending
            </span>

            <strong className="text-amber">
              {pendingFaculty}
            </strong>

            <span className="stat-sublabel">
              Awaiting approval
            </span>
          </div>
        </div>

        <div className="stat-card-enhanced">
          <div className="stat-icon-wrapper">
            <StatIcons.Building />
          </div>

          <div className="stat-content">
            <span className="stat-label">
              Departments
            </span>

            <strong className="text-purple">
              {departments.length}
            </strong>

            <span className="stat-sublabel">
              Active units
            </span>
          </div>
        </div>

      </div>

      {/* ===================================================
          ERROR
      =================================================== */}

      {error && (
        <div className="faculty-alert error">
          <span style={{ fontSize: "16px" }}>
            ⚠
          </span>

          {error}
        </div>
      )}

      {/* ===================================================
          FILTER TOOLBAR
      =================================================== */}

      <div className="faculty-toolbar">

        <div className="search-box">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search by name, email or employee ID..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

          {search && (
            <button
              className="clear-search-btn"
              onClick={() => setSearch("")}
              type="button"
            >
              ×
            </button>
          )}

        </div>

        <div className="filter-box">

          <Filter size={17} />

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
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}

          </select>

        </div>

        <div className="filter-box">

          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value)
            }
          >
            <option value="all">
              All Statuses
            </option>

            <option value="active">
              Active
            </option>

            <option value="pending">
              Pending Approval
            </option>

            <option value="inactive">
              Inactive
            </option>

            <option value="suspended">
              Suspended
            </option>
          </select>

        </div>

        {hasActiveFilters && (
          <button
            className="btn-reset-filters"
            onClick={resetFilters}
            type="button"
          >
            Reset Filters
          </button>
        )}

      </div>

      {/* ===================================================
          FACULTY TABLE
      =================================================== */}

      <div className="faculty-table-card">

        <div className="table-heading">

          <div>

            <h2>
              Faculty Records
            </h2>

            <p>
              Showing{" "}
              <strong>
                {filteredFaculty.length}
              </strong>{" "}
              of{" "}
              <strong>
                {faculty.length}
              </strong>{" "}
              faculty members

              {hasActiveFilters &&
                " • Filters applied"}
            </p>

          </div>

        </div>

        {loading ? (

          <div className="faculty-empty">

            <UserRound size={40} />

            <h3>
              Loading directory...
            </h3>

          </div>

        ) : filteredFaculty.length === 0 ? (

          <div className="faculty-empty">

            <UserRound size={48} />

            <h3>
              No Faculty Found
            </h3>

            <p>
              Try adjusting your search criteria
              or reset filters.
            </p>

          </div>

        ) : (

          <div className="table-wrapper">

            <table>

              <thead>

                <tr>
                  <th>Faculty Member</th>
                  <th>Employee ID</th>
                  <th>Department</th>
                  <th>Designation</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>

              </thead>

              <tbody>

                {filteredFaculty.map((item) => {

                  const isActive =
                    item.status === "active";

                  const isInactive =
                    item.status === "inactive";

                  const isPending =
                    item.status === "pending";

                  const isSuspended =
                    item.status === "suspended";

                  return (

                    <tr
                      key={item.id}
                      className={
                        isInactive
                          ? "row-inactive"
                          : ""
                      }
                    >

                      {/* FACULTY */}

                      <td>

                        <div className="faculty-name">

                          <div
                            className={`faculty-avatar ${
                              isInactive
                                ? "avatar-inactive"
                                : ""
                            }`}
                          >
                            {String(
                              item.name || "F"
                            )
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div>

                            <strong>
                              {item.name ||
                                "Unnamed Faculty"}
                            </strong>

                            <span>
                              {item.email ||
                                "No email"}
                            </span>

                          </div>

                        </div>

                      </td>

                      {/* EMPLOYEE ID */}

                      <td>
                        <span className="id-cell">
                          {item.employee_id ||
                            "—"}
                        </span>
                      </td>

                      {/* DEPARTMENT */}

                      <td>

                        {item.department ? (

                          <span className="table-value">
                            {item.department}
                          </span>

                        ) : (

                          <span className="empty-cell">
                            Unassigned
                          </span>

                        )}

                      </td>

                      {/* DESIGNATION */}

                      <td>

                        {item.designation ? (

                          <span className="table-value">
                            {item.designation}
                          </span>

                        ) : (

                          <span className="empty-cell">
                            Not Specified
                          </span>

                        )}

                      </td>

                      {/* STATUS */}

                      <td>

                        <span
                          className={`status-badge ${getStatusClass(
                            item.status
                          )}`}
                        >
                          {item.status ||
                            "pending"}
                        </span>

                      </td>

                      {/* ACTIONS */}

                      <td>

                        <div className="action-buttons">

                          {/* VIEW */}

                          <button
                            className="icon-button view"
                            title={`View ${
                              item.name ||
                              "faculty"
                            }`}
                            onClick={() =>
                              handleViewFaculty(
                                item
                              )
                            }
                            type="button"
                          >
                            <Eye size={17} />
                          </button>

                          {/* EDIT */}

                          <button
                            className="icon-button edit"
                            title={`Edit ${
                              item.name ||
                              "faculty"
                            }`}
                            onClick={() =>
                              handleEditFaculty(
                                item
                              )
                            }
                            type="button"
                          >
                            <Edit size={17} />
                          </button>

                          {/* ACTIVE */}

                          {isActive && (
                            <button
                              className="deactivate-btn"
                              onClick={() =>
                                handleOpenConfirm(
                                  item,
                                  "deactivate"
                                )
                              }
                              type="button"
                            >
                              Deactivate
                            </button>
                          )}

                          {/* INACTIVE */}

                          {isInactive && (
                            <button
                              className="activate-btn"
                              onClick={() =>
                                handleOpenConfirm(
                                  item,
                                  "activate"
                                )
                              }
                              type="button"
                            >
                              Activate
                            </button>
                          )}

                          {/* PENDING */}

                          {isPending && (
                            <button
                              className="activate-btn"
                              onClick={() =>
                                handleOpenConfirm(
                                  item,
                                  "activate"
                                )
                              }
                              type="button"
                            >
                              Approve
                            </button>
                          )}

                          {/* SUSPENDED */}

                          {isSuspended && (
                            <button
                              className="activate-btn"
                              onClick={() =>
                                handleOpenConfirm(
                                  item,
                                  "activate"
                                )
                              }
                              type="button"
                            >
                              Reactivate
                            </button>
                          )}

                        </div>

                      </td>

                    </tr>

                  );
                })}

              </tbody>

            </table>

          </div>

        )}

      </div>

      {/* ===================================================
          PROFILE MODAL
      =================================================== */}

      {selectedFaculty && (

        <div
          className="modal-overlay"
          onClick={closeProfile}
        >

          <div
            className="faculty-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="modal-header">

              <div>

                <h2>
                  Faculty Profile
                </h2>

                <p>
                  Complete employee information
                </p>

              </div>

              <button
                className="modal-close"
                onClick={closeProfile}
                type="button"
              >
                <X size={20} />
              </button>

            </div>

            {profileLoading ? (

              <div className="modal-loading">
                Retrieving profile...
              </div>

            ) : (

              <>

                <div className="profile-top">

                  <div className="large-avatar">
                    {String(
                      selectedFaculty.name ||
                        "F"
                    )
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <div>

                    <h3>
                      {selectedFaculty.name ||
                        "Faculty Member"}
                    </h3>

                    <p>
                      {selectedFaculty.designation ||
                        "Faculty Member"}
                    </p>

                    <span
                      className={`status-badge ${getStatusClass(
                        selectedFaculty.status
                      )}`}
                    >
                      {selectedFaculty.status ||
                        "pending"}
                    </span>

                  </div>

                </div>

                <div className="profile-grid">

                  <div className="profile-item">

                    <Mail size={18} />

                    <div>

                      <span>
                        Email Address
                      </span>

                      <strong>
                        {selectedFaculty.email ||
                          "—"}
                      </strong>

                    </div>

                  </div>

                  <div className="profile-item">

                    <BriefcaseBusiness
                      size={18}
                    />

                    <div>

                      <span>
                        Employee ID
                      </span>

                      <strong
                        style={{
                          fontFamily:
                            "var(--font-mono)",
                        }}
                      >
                        {selectedFaculty.employee_id ||
                          "—"}
                      </strong>

                    </div>

                  </div>

                  <div className="profile-item">

                    <Building2 size={18} />

                    <div>

                      <span>
                        Department
                      </span>

                      <strong>
                        {selectedFaculty.department ||
                          "Unassigned"}
                      </strong>

                    </div>

                  </div>

                  <div className="profile-item">

                    <BriefcaseBusiness
                      size={18}
                    />

                    <div>

                      <span>
                        Designation
                      </span>

                      <strong>
                        {selectedFaculty.designation ||
                          "Not specified"}
                      </strong>

                    </div>

                  </div>

                  <div className="profile-item">

                    <Phone size={18} />

                    <div>

                      <span>
                        Contact Phone
                      </span>

                      <strong>
                        {selectedFaculty.phone ||
                          "—"}
                      </strong>

                    </div>

                  </div>

                  <div className="profile-item">

                    <CalendarDays size={18} />

                    <div>

                      <span>
                        Date of Birth
                      </span>

                      <strong>
                        {selectedFaculty.date_of_birth
                          ? String(
                              selectedFaculty.date_of_birth
                            ).slice(0, 10)
                          : "—"}
                      </strong>

                    </div>

                  </div>

                </div>

                <div className="modal-footer">

                  <button
                    className="secondary-button"
                    onClick={closeProfile}
                    type="button"
                  >
                    Close
                  </button>

                  <button
                    className="primary-button"
                    onClick={() =>
                      handleEditFaculty(
                        selectedFaculty
                      )
                    }
                    type="button"
                  >
                    <Edit size={17} />
                    Edit Record
                  </button>

                  {selectedFaculty.status ===
                  "active" ? (

                    <button
                      className="deactivate-btn"
                      onClick={() =>
                        handleOpenConfirm(
                          selectedFaculty,
                          "deactivate"
                        )
                      }
                      type="button"
                    >
                      Deactivate
                    </button>

                  ) : (

                    <button
                      className="activate-btn"
                      onClick={() =>
                        handleOpenConfirm(
                          selectedFaculty,
                          "activate"
                        )
                      }
                      type="button"
                    >
                      Activate
                    </button>

                  )}

                </div>

              </>

            )}

          </div>

        </div>

      )}

      {/* ===================================================
          EDIT MODAL
      =================================================== */}

      {editingFaculty && (

        <div className="modal-overlay">

          <div className="faculty-modal edit-modal">

            <div className="modal-header">

              <div>

                <h2>
                  Edit Faculty Record
                </h2>

                <p>
                  Update employee information below
                </p>

              </div>

              <button
                className="modal-close"
                onClick={closeEditForm}
                disabled={editLoading}
                type="button"
              >
                <X size={20} />
              </button>

            </div>

            {editError && (
              <div className="faculty-alert error">
                <span>⚠</span>
                {editError}
              </div>
            )}

            <form onSubmit={handleSaveFaculty}>

              <div className="form-grid">

                <div className="form-group">

                  <label>
                    Full Legal Name *
                  </label>

                  <input
                    name="name"
                    value={editForm.name}
                    onChange={handleEditChange}
                    required
                  />

                </div>

                <div className="form-group">

                  <label>
                    Institutional Email *
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleEditChange}
                    required
                  />

                </div>

                <div className="form-group">

                  <label>
                    Employee ID *
                  </label>

                  <input
                    name="employee_id"
                    value={editForm.employee_id}
                    onChange={handleEditChange}
                    required
                  />

                </div>

                <div className="form-group">

                  <label>
                    Department
                  </label>

                  <input
                    name="department"
                    value={editForm.department}
                    onChange={handleEditChange}
                    placeholder="e.g., Computer Science"
                  />

                </div>

                <div className="form-group">

                  <label>
                    Designation
                  </label>

                  <input
                    name="designation"
                    value={editForm.designation}
                    onChange={handleEditChange}
                    placeholder="e.g., Associate Professor"
                  />

                </div>

                <div className="form-group">

                  <label>
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={editForm.phone}
                    onChange={handleEditChange}
                    placeholder="+91 98765 43210"
                  />

                </div>

                <div className="form-group">

                  <label>
                    Date of Birth
                  </label>

                  <input
                    type="date"
                    name="date_of_birth"
                    value={editForm.date_of_birth}
                    onChange={handleEditChange}
                  />

                </div>

              </div>

              <div className="modal-footer">

                <button
                  type="button"
                  className="secondary-button"
                  onClick={closeEditForm}
                  disabled={editLoading}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-button"
                  disabled={editLoading}
                >

                  {editLoading ? (
                    <>
                      <span className="loading-spinner-small" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      {/* ===================================================
          CONFIRM STATUS MODAL
      =================================================== */}

      {confirmFaculty && (

        <div
          className="modal-overlay"
          onClick={handleCloseConfirm}
        >

          <div
            className="faculty-modal confirm-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="confirm-modal-body">

              <div
                className={`confirm-icon-wrap ${
                  confirmFaculty.action ===
                  "deactivate"
                    ? "warn"
                    : "success"
                }`}
              >
                {confirmFaculty.action ===
                "deactivate"
                  ? "⚠"
                  : "✓"}
              </div>

              <h2 className="confirm-title">

                {confirmFaculty.action ===
                "deactivate"
                  ? "Deactivate Account?"
                  : "Activate Account?"}

              </h2>

              <p className="confirm-desc">

                {confirmFaculty.action ===
                "deactivate" ? (

                  <>
                    You are about to{" "}
                    <strong>
                      deactivate
                    </strong>{" "}
                    the account for{" "}
                    <strong>
                      {confirmFaculty.faculty.name}
                    </strong>
                    .
                    <br />
                    <br />
                    Their access will be revoked
                    and the status will be set to{" "}
                    <strong>
                      Inactive
                    </strong>
                    .
                    <br />
                    All historical data will be
                    preserved.
                  </>

                ) : (

                  <>
                    You are about to{" "}
                    <strong>
                      activate
                    </strong>{" "}
                    the account for{" "}
                    <strong>
                      {confirmFaculty.faculty.name}
                    </strong>
                    .
                    <br />
                    <br />
                    Their status will be set back
                    to{" "}
                    <strong>
                      Active
                    </strong>
                    .
                  </>

                )}

              </p>

              <div className="confirm-info-row">

                <div className="confirm-avatar-sm">

                  {String(
                    confirmFaculty.faculty.name ||
                      "F"
                  )
                    .charAt(0)
                    .toUpperCase()}

                </div>

                <div>

                  <strong>
                    {confirmFaculty.faculty.name}
                  </strong>

                  <span>

                    {confirmFaculty.faculty
                      .employee_id ||
                      "No ID"}

                    {confirmFaculty.faculty
                      .department &&
                      ` · ${confirmFaculty.faculty.department}`}

                  </span>

                </div>

              </div>

              {statusError && (
                <div className="faculty-alert error">
                  {statusError}
                </div>
              )}

              <div className="confirm-actions">

                <button
                  className="secondary-button"
                  onClick={handleCloseConfirm}
                  disabled={statusLoading}
                  type="button"
                >
                  Cancel
                </button>

                <button
                  className={
                    confirmFaculty.action ===
                    "deactivate"
                      ? "deactivate-btn"
                      : "activate-btn"
                  }
                  onClick={
                    handleConfirmStatusChange
                  }
                  disabled={statusLoading}
                  type="button"
                >

                  {statusLoading
                    ? "Processing..."
                    : confirmFaculty.action ===
                      "deactivate"
                    ? "Yes, Deactivate"
                    : "Yes, Activate"}

                </button>

              </div>

            </div>

          </div>

        </div>

      )}

      {/* ===================================================
          SUCCESS TOAST
      =================================================== */}

      {editSuccess && (
        <div className="faculty-toast success">
          ✓ {editSuccess}
        </div>
      )}

      {/* ===================================================
          LOADING SPINNER
      =================================================== */}

      <style>
        {`
          .loading-spinner-small {
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 2px solid rgba(255,255,255,0.3);
            border-top-color: white;
            border-radius: 50%;
            animation: faculty-spin 0.6s linear infinite;
            margin-right: 7px;
            vertical-align: middle;
          }

          @keyframes faculty-spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>

    </div>
  );
};

export default FacultyManagement;