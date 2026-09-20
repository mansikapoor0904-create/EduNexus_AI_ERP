

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
  BadgeCheck,
  Upload,
} from "lucide-react";

import { getAccessToken } from "../../services/authService";
import "./FacultyManagement.css";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

const FacultyManagement = () => {
  const navigate = useNavigate();

  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("all");
  const [status, setStatus] = useState("all");

  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);

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

  // ==========================================
  // DEACTIVATE / ACTIVATE
  // ==========================================

  const [confirmFaculty, setConfirmFaculty] = useState(null);
  // { faculty, action: "deactivate" | "activate" }
  const [statusLoading, setStatusLoading] = useState(false);
  const [statusError, setStatusError] = useState("");

  // ==========================================
  // FETCH FACULTY
  // ==========================================

  const fetchFaculty = async () => {
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
        `${API_BASE_URL}/management/faculty`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to fetch faculty."
        );
      }

      setFaculty(data.faculty || []);
    } catch (err) {
      console.error("Fetch faculty error:", err);
      setError(
        err.message || "Unable to load faculty records."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  // ==========================================
  // FILTER OPTIONS
  // ==========================================

  const departments = useMemo(() => {
    return [
      ...new Set(
        faculty.map((item) => item.department).filter(Boolean)
      ),
    ].sort();
  }, [faculty]);

  // ==========================================
  // FILTER FACULTY
  // ==========================================

  const filteredFaculty = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return faculty.filter((item) => {
      const matchesSearch =
        !searchValue ||
        item.name?.toLowerCase().includes(searchValue) ||
        item.email?.toLowerCase().includes(searchValue) ||
        item.employee_id?.toLowerCase().includes(searchValue);

      const matchesDepartment =
        department === "all" || item.department === department;

      const matchesStatus =
        status === "all" || item.status === status;

      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [faculty, search, department, status]);

  // ==========================================
  // STATISTICS
  // ==========================================

  const totalFaculty   = faculty.length;
  const activeFaculty  = faculty.filter((i) => i.status === "active").length;
  const inactiveFaculty = faculty.filter((i) => i.status === "inactive").length;
  const pendingFaculty = faculty.filter((i) => i.status === "pending").length;

  // ==========================================
  // VIEW FACULTY
  // ==========================================

  const handleViewFaculty = async (id) => {
    try {
      setProfileLoading(true);
      setError("");

      const token = getAccessToken();

      const response = await fetch(
        `${API_BASE_URL}/management/faculty/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to fetch faculty profile."
        );
      }

      setSelectedFaculty(data.faculty);
    } catch (err) {
      console.error("Faculty profile error:", err);
      setError(err.message || "Unable to load faculty profile.");
    } finally {
      setProfileLoading(false);
    }
  };

  // ==========================================
  // EDIT FACULTY
  // ==========================================

  const handleEditFaculty = (item) => {
    setSelectedFaculty(null);
    setEditError("");
    setEditSuccess("");
    setEditingFaculty(item);

    setEditForm({
      name:          item.name          || "",
      email:         item.email         || "",
      employee_id:   item.employee_id   || "",
      department:    item.department    || "",
      designation:   item.designation   || "",
      phone:         item.phone         || "",
      date_of_birth: item.date_of_birth
        ? item.date_of_birth.slice(0, 10)
        : "",
    });
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  // ==========================================
  // SAVE FACULTY
  // ==========================================

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

      const response = await fetch(
        `${API_BASE_URL}/management/faculty/${editingFaculty.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify(editForm),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to update faculty."
        );
      }

      const updatedFaculty = data.faculty;

      setFaculty((prev) =>
        prev.map((item) =>
          item.id === updatedFaculty.id
            ? { ...item, ...updatedFaculty }
            : item
        )
      );

      setEditSuccess("Faculty updated successfully.");
      setEditingFaculty(null);
    } catch (err) {
      console.error("Update faculty error:", err);
      setEditError(err.message || "Unable to update faculty.");
    } finally {
      setEditLoading(false);
    }
  };

  // ==========================================
  // CLOSE MODALS
  // ==========================================

  const closeProfile = () => setSelectedFaculty(null);

  const closeEditForm = () => {
    if (!editLoading) {
      setEditingFaculty(null);
      setEditError("");
    }
  };

  // ==========================================
  // OPEN CONFIRM DIALOG
  // ==========================================

  const handleOpenConfirm = (item, action) => {
    setStatusError("");
    setConfirmFaculty({ faculty: item, action });
    setSelectedFaculty(null);
  };

  const handleCloseConfirm = () => {
    if (statusLoading) return;
    setConfirmFaculty(null);
    setStatusError("");
  };

  // ==========================================
  // CONFIRM STATUS CHANGE
  // ==========================================

  const handleConfirmStatusChange = async () => {
    if (!confirmFaculty) return;

    const { faculty: item, action } = confirmFaculty;
    const newStatus =
      action === "deactivate" ? "inactive" : "active";

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
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to update faculty status."
        );
      }

      // Update local list immediately
      setFaculty((prev) =>
        prev.map((f) =>
          f.id === item.id ? { ...f, status: newStatus } : f
        )
      );

      setConfirmFaculty(null);
    } catch (err) {
      console.error("Faculty status change error:", err);
      setStatusError(
        err.message || "Unable to update faculty status."
      );
    } finally {
      setStatusLoading(false);
    }
  };

  // ==========================================
  // STATUS CLASS
  // ==========================================

  const getStatusClass = (value) => {
    if (value === "active")   return "status-active";
    if (value === "pending")  return "status-pending";
    if (value === "inactive") return "status-inactive";
    return "status-inactive";
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="faculty-page">

      {/* HEADER */}
      <div className="faculty-header">
        <div>
          <button
            className="back-button"
            onClick={() => navigate("/management/dashboard")}
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </button>

          <h1>Faculty Management</h1>

          <p>
            Manage faculty records, departments and faculty information.
          </p>
        </div>

        <button
          className="import-button"
          onClick={() => navigate("/management/import")}
        >
          <Upload size={18} />
          Import Faculty
        </button>
      </div>

      {/* STATISTICS */}
      <div className="faculty-stats">

        <div className="stat-card">
          <div className="stat-icon">
            <UserRound size={22} />
          </div>
          <div>
            <span>Total Faculty</span>
            <strong>{totalFaculty}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon active">
            <BadgeCheck size={22} />
          </div>
          <div>
            <span>Active</span>
            <strong className="count-active">
              {activeFaculty}
            </strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon inactive">
            <X size={22} />
          </div>
          <div>
            <span>Inactive</span>
            <strong className="count-inactive">
              {inactiveFaculty}
            </strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon pending">
            <CalendarDays size={22} />
          </div>
          <div>
            <span>Pending</span>
            <strong className="count-pending">
              {pendingFaculty}
            </strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon department">
            <Building2 size={22} />
          </div>
          <div>
            <span>Departments</span>
            <strong>{departments.length}</strong>
          </div>
        </div>

      </div>

      {/* ERROR */}
      {error && (
        <div className="faculty-alert error">{error}</div>
      )}

      {/* FILTERS */}
      <div className="faculty-toolbar">

        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search by name, email or employee ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filter-box">
          <Filter size={17} />
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="all">All Departments</option>
            {departments.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>

        <div className="filter-box">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>

      </div>

      {/* TABLE */}
      <div className="faculty-table-card">

        <div className="table-heading">
          <div>
            <h2>Faculty Records</h2>
            <p>
              Showing{" "}
              <strong>{filteredFaculty.length}</strong>{" "}
              of{" "}
              <strong>{faculty.length}</strong>{" "}
              faculty members
            </p>
          </div>
        </div>

        {loading ? (
          <div className="faculty-empty">
            Loading faculty records...
          </div>
        ) : filteredFaculty.length === 0 ? (
          <div className="faculty-empty">
            <UserRound size={40} />
            <h3>No faculty found</h3>
            <p>Try changing your search or filter.</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Faculty</th>
                  <th>Employee ID</th>
                  <th>Department</th>
                  <th>Designation</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredFaculty.map((item) => {
                  const isActive   = item.status === "active";
                  const isInactive = item.status === "inactive";

                  return (
                    <tr
                      key={item.id}
                      className={isInactive ? "row-inactive" : ""}
                    >
                      <td>
                        <div className="faculty-name">
                          <div className={`faculty-avatar ${isInactive ? "avatar-inactive" : ""}`}>
                            {item.name?.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <strong>{item.name}</strong>
                            <span>{item.email}</span>
                          </div>
                        </div>
                      </td>

                      <td>{item.employee_id}</td>
                      <td>{item.department || "—"}</td>
                      <td>{item.designation || "—"}</td>

                      <td>
                        <span className={`status-badge ${getStatusClass(item.status)}`}>
                          {item.status}
                        </span>
                      </td>

                      <td>
                        <div className="action-buttons">

                          {/* VIEW */}
                          <button
                            className="icon-button view"
                            title="View"
                            onClick={() => handleViewFaculty(item.id)}
                          >
                            <Eye size={17} />
                          </button>

                          {/* EDIT */}
                          <button
                            className="icon-button edit"
                            title="Edit"
                            onClick={() => handleEditFaculty(item)}
                          >
                            <Edit size={17} />
                          </button>

                          {/* DEACTIVATE / ACTIVATE */}
                          {isActive ? (
                            <button
                              className="deactivate-btn"
                              onClick={() =>
                                handleOpenConfirm(item, "deactivate")
                              }
                            >
                              Deactivate
                            </button>
                          ) : (
                            <button
                              className="activate-btn"
                              onClick={() =>
                                handleOpenConfirm(item, "activate")
                              }
                            >
                              Activate
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

      {/* PROFILE MODAL */}
      {selectedFaculty && (
        <div className="modal-overlay" onClick={closeProfile}>
          <div
            className="faculty-modal profile-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <h2>Faculty Profile</h2>
                <p>Faculty member details</p>
              </div>
              <button className="modal-close" onClick={closeProfile}>
                <X size={20} />
              </button>
            </div>

            {profileLoading ? (
              <div className="modal-loading">Loading profile...</div>
            ) : (
              <>
                <div className="profile-top">
                  <div className="large-avatar">
                    {selectedFaculty.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3>{selectedFaculty.name}</h3>
                    <p>{selectedFaculty.designation || "Faculty"}</p>
                    <span className={`status-badge ${getStatusClass(selectedFaculty.status)}`}>
                      {selectedFaculty.status}
                    </span>
                  </div>
                </div>

                <div className="profile-grid">
                  <div className="profile-item">
                    <Mail size={18} />
                    <div>
                      <span>Email</span>
                      <strong>{selectedFaculty.email}</strong>
                    </div>
                  </div>

                  <div className="profile-item">
                    <BriefcaseBusiness size={18} />
                    <div>
                      <span>Employee ID</span>
                      <strong>{selectedFaculty.employee_id}</strong>
                    </div>
                  </div>

                  <div className="profile-item">
                    <Building2 size={18} />
                    <div>
                      <span>Department</span>
                      <strong>{selectedFaculty.department || "—"}</strong>
                    </div>
                  </div>

                  <div className="profile-item">
                    <BriefcaseBusiness size={18} />
                    <div>
                      <span>Designation</span>
                      <strong>{selectedFaculty.designation || "—"}</strong>
                    </div>
                  </div>

                  <div className="profile-item">
                    <Phone size={18} />
                    <div>
                      <span>Phone</span>
                      <strong>{selectedFaculty.phone || "—"}</strong>
                    </div>
                  </div>

                  <div className="profile-item">
                    <CalendarDays size={18} />
                    <div>
                      <span>Date of Birth</span>
                      <strong>
                        {selectedFaculty.date_of_birth
                          ? selectedFaculty.date_of_birth.slice(0, 10)
                          : "—"}
                      </strong>
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    className="secondary-button"
                    onClick={closeProfile}
                  >
                    Close
                  </button>

                  <button
                    className="primary-button"
                    onClick={() => handleEditFaculty(selectedFaculty)}
                  >
                    <Edit size={17} />
                    Edit Faculty
                  </button>

                  {/* Deactivate / Activate from profile */}
                  {selectedFaculty.status === "active" ? (
                    <button
                      className="deactivate-btn"
                      onClick={() =>
                        handleOpenConfirm(selectedFaculty, "deactivate")
                      }
                    >
                      Deactivate
                    </button>
                  ) : (
                    <button
                      className="activate-btn"
                      onClick={() =>
                        handleOpenConfirm(selectedFaculty, "activate")
                      }
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

      {/* EDIT MODAL */}
      {editingFaculty && (
        <div className="modal-overlay">
          <div className="faculty-modal edit-modal">
            <div className="modal-header">
              <div>
                <h2>Edit Faculty</h2>
                <p>Update faculty information</p>
              </div>
              <button
                className="modal-close"
                onClick={closeEditForm}
                disabled={editLoading}
              >
                <X size={20} />
              </button>
            </div>

            {editError && (
              <div className="faculty-alert error">{editError}</div>
            )}

            <form onSubmit={handleSaveFaculty}>
              <div className="form-grid">

                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    name="name"
                    value={editForm.name}
                    onChange={handleEditChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleEditChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Employee ID *</label>
                  <input
                    name="employee_id"
                    value={editForm.employee_id}
                    onChange={handleEditChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Department</label>
                  <input
                    name="department"
                    value={editForm.department}
                    onChange={handleEditChange}
                  />
                </div>

                <div className="form-group">
                  <label>Designation</label>
                  <input
                    name="designation"
                    value={editForm.designation}
                    onChange={handleEditChange}
                  />
                </div>

                <div className="form-group">
                  <label>Phone</label>
                  <input
                    name="phone"
                    value={editForm.phone}
                    onChange={handleEditChange}
                  />
                </div>

                <div className="form-group">
                  <label>Date of Birth</label>
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
                  {editLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRM DEACTIVATE / ACTIVATE */}
      {confirmFaculty && (
        <div
          className="modal-overlay"
          onClick={handleCloseConfirm}
        >
          <div
            className="faculty-modal confirm-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`confirm-icon-wrap ${
              confirmFaculty.action === "deactivate"
                ? "warn"
                : "success"
            }`}>
              {confirmFaculty.action === "deactivate" ? "⚠" : "✓"}
            </div>

            <h2 className="confirm-title">
              {confirmFaculty.action === "deactivate"
                ? "Deactivate Faculty?"
                : "Activate Faculty?"}
            </h2>

            <p className="confirm-desc">
              {confirmFaculty.action === "deactivate" ? (
                <>
                  You are about to deactivate{" "}
                  <strong>{confirmFaculty.faculty.name}</strong>.
                  <br />
                  Their account will be set to{" "}
                  <strong>inactive</strong> and preserved.
                </>
              ) : (
                <>
                  You are about to activate{" "}
                  <strong>{confirmFaculty.faculty.name}</strong>.
                  <br />
                  Their account will be set back to{" "}
                  <strong>active</strong>.
                </>
              )}
            </p>

            <div className="confirm-info-row">
              <div className="confirm-avatar-sm">
                {confirmFaculty.faculty.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <strong>{confirmFaculty.faculty.name}</strong>
                <span>
                  {confirmFaculty.faculty.employee_id} ·{" "}
                  {confirmFaculty.faculty.department || "—"}
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
              >
                Cancel
              </button>

              <button
                className={
                  confirmFaculty.action === "deactivate"
                    ? "deactivate-btn"
                    : "activate-btn"
                }
                onClick={handleConfirmStatusChange}
                disabled={statusLoading}
              >
                {statusLoading
                  ? "Updating..."
                  : confirmFaculty.action === "deactivate"
                  ? "Yes, Deactivate"
                  : "Yes, Activate"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS TOAST */}
      {editSuccess && (
        <div className="faculty-toast success">
          {editSuccess}
        </div>
      )}

    </div>
  );
};

export default FacultyManagement;