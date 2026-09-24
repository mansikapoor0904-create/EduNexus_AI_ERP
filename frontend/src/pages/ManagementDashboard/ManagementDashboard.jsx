import { useState, useEffect } from "react";
import {
  GraduationCap,
  UserRoundCheck,
  BookOpen,
  CalendarCheck,
  FileText,
  Upload,
  UserPlus,
  BarChart3,
  Settings,
  Bell,
  Search,
  LogOut,
  ChevronRight,
  TrendingUp,
  Award,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Database,
  ArrowUpRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../../services/authService";
import "./ManagementDashboard.css";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function ManagementDashboard() {
  const navigate = useNavigate();

  // ─── State ───────────────────────────────────────────
  const [stats, setStats]                     = useState(null);
  const [previewStudents, setPreviewStudents] = useState([]);
  const [previewFaculty, setPreviewFaculty]   = useState([]);
  const [isFirstTime, setIsFirstTime]         = useState(false);
  const [activeNav, setActiveNav]             = useState("overview");
  const [notification, setNotification]       = useState(3);
  const [loadingStats, setLoadingStats]       = useState(true);

  // ─── Load dashboard stats from DB ────────────────────
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = getAccessToken();
        if (!token) {
          setIsFirstTime(true);
          return;
        }

        const res = await fetch(`${API_BASE_URL}/management/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
          credentials: "include",
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to load stats");
        }

        setStats(data.data);
        setIsFirstTime(
          data.data.totalStudents === 0 && data.data.totalFaculty === 0
        );
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setIsFirstTime(true);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStats();
  }, []);

  // ─── Load preview records (first few students + faculty) ─
  useEffect(() => {
    const fetchPreview = async () => {
      try {
        const token = getAccessToken();
        if (!token) return;

        const headers = { Authorization: `Bearer ${token}` };

        const [sRes, fRes] = await Promise.all([
          fetch(`${API_BASE_URL}/management/students`, {
            headers,
            credentials: "include",
          }),
          fetch(`${API_BASE_URL}/management/faculty`, {
            headers,
            credentials: "include",
          }),
        ]);

        if (sRes.ok) {
          const sData = await sRes.json();
          setPreviewStudents((sData.students || []).slice(0, 4));
        }

        if (fRes.ok) {
          const fData = await fRes.json();
          setPreviewFaculty((fData.faculty || []).slice(0, 2));
        }
      } catch (err) {
        console.error("Dashboard preview fetch error:", err);
      }
    };

    fetchPreview();
  }, []);

  // ─── Derived stats (from backend) ─────────────────────
  const totalStudents  = stats?.totalStudents  ?? 0;
  const totalFaculty   = stats?.totalFaculty   ?? 0;
  const activeStudents = stats?.activeStudents ?? 0;
  const activeFaculty  = stats?.activeFaculty  ?? 0;
  const hasData        = totalStudents > 0 || totalFaculty > 0;

  // Department breakdown comes from the API
  const departmentBreakdown = stats?.departmentBreakdown ?? [];
  const departments  = departmentBreakdown.map((d) => d.department);
  const deptCounts   = departmentBreakdown.map((d) => d.count);
  const maxDeptCount = Math.max(...deptCounts, 1);

  // Monthly enrollment chart — placeholder until we add it to the API
  const monthLabels   = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const monthlyCounts = Array(12).fill(0);
  const maxMonthly    = 1;

  // Attendance module not built yet — real value comes later
  const attArr        = [];
  const avgAttendance = "—";

  // ─── Nav handlers ─────────────────────────────────────
  const handleLogout     = () => navigate("/login");
  const handleImportData = () => navigate("/management/import");
  const handleStudents   = () => navigate("/management/students");
  const handleFaculty    = () => navigate("/management/faculty");
  const handleSettings   = () => navigate("/management/settings");

  // ─── Sidebar nav items ────────────────────────────────
  const navItems = [
    { id: "overview",    label: "Overview",   icon: BarChart3,      handler: null },
    { id: "students",    label: "Students",   icon: GraduationCap,  handler: handleStudents },
    { id: "faculty",     label: "Faculty",    icon: UserRoundCheck, handler: handleFaculty },
    { id: "academics",   label: "Academics",  icon: BookOpen,       handler: null },
    { id: "attendance",  label: "Attendance", icon: CalendarCheck,  handler: null },
    { id: "reports",     label: "Reports",    icon: FileText,       handler: null },
    { id: "settings",    label: "Settings",   icon: Settings,       handler: handleSettings },
  ];

  // ─── Quick actions ────────────────────────────────────
  const quickActions = [
    {
      id: 1, label: "Add Student",
      desc: "Create and manage student records",
      icon: UserPlus, handler: handleStudents, color: "blue",
    },
    {
      id: 2, label: "Add Faculty",
      desc: "Create and manage faculty records",
      icon: UserRoundCheck, handler: handleFaculty, color: "green",
    },
    {
      id: 3, label: "Import Data",
      desc: "Import students or faculty using CSV/XLSX",
      icon: Upload, handler: handleImportData, color: "purple",
    },
    {
      id: 4, label: "Generate Report",
      desc: "Create institutional reports",
      icon: FileText, handler: () => {}, color: "orange",
    },
  ];

  // ─── Recent activity from data ────────────────────────
  const recentActivities = [
    {
      id: 1,
      title: hasData ? `${totalStudents} student records loaded` : "No student records yet",
      desc:  hasData ? "Loaded from database" : "Import a CSV to get started",
      icon:  GraduationCap,
      time:  "Today",
      status: hasData ? "success" : "warn",
    },
    {
      id: 2,
      title: hasData ? `${totalFaculty} faculty records loaded` : "No faculty records yet",
      desc:  hasData ? "Loaded from database" : "Import a CSV to get started",
      icon:  UserRoundCheck,
      time:  "Today",
      status: hasData ? "success" : "warn",
    },
    {
      id: 3,
      title: "Data import available",
      desc: "You can import student and faculty records via CSV/XLSX.",
      icon: Upload,
      time: "Recent",
      status: "info",
    },
  ];

  // ═══════════════════════════════════════════════════════
  //  RENDER
  // ═══════════════════════════════════════════════════════
  return (
    <div className="md-root">

      {/* ── SIDEBAR ──────────────────────────────────── */}
      <aside className="md-sidebar">

        {/* Brand */}
        <div className="md-brand">
          <div className="md-brand-logo">E</div>
          <div className="md-brand-text">
            <strong>EduNexus</strong>
            <span>AI ERP</span>
          </div>
        </div>

        {/* Section label */}
        <p className="md-nav-label">MANAGEMENT</p>

        {/* Nav */}
        <nav className="md-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`md-nav-btn ${activeNav === item.id ? "active" : ""}`}
                onClick={() => {
                  setActiveNav(item.id);
                  if (item.handler) item.handler();
                }}
                type="button"
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Import CTA for first-time users */}
        {isFirstTime && (
          <div className="md-import-cta">
            <Database size={22} className="md-import-cta-icon" />
            <p className="md-import-cta-title">No data yet</p>
            <p className="md-import-cta-sub">
              Upload your first CSV to populate the dashboard.
            </p>
            <button
              className="md-import-cta-btn"
              onClick={handleImportData}
              type="button"
            >
              <Upload size={15} />
              Import CSV / XLSX
            </button>
          </div>
        )}

        {/* Logout */}
        <div className="md-sidebar-bottom">
          <button
            className="md-nav-btn md-logout"
            onClick={handleLogout}
            type="button"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>

      </aside>

      {/* ── MAIN ─────────────────────────────────────── */}
      <main className="md-main">

        {/* Header */}
        <header className="md-header">
          <div>
            <p className="md-eyebrow">MANAGEMENT PORTAL</p>
            <h1 className="md-heading">Management Dashboard</h1>
            <p className="md-sub">
              Monitor and manage your institution from one central workspace.
            </p>
          </div>

          <div className="md-header-right">
            <button className="md-icon-btn" type="button" title="Search">
              <Search size={18} />
            </button>

            <button className="md-icon-btn md-notif-btn" type="button" title="Notifications">
              <Bell size={18} />
              {notification > 0 && (
                <span className="md-badge">{notification}</span>
              )}
            </button>

            <div className="md-profile">
              <div className="md-avatar">M</div>
              <div>
                <strong>Management</strong>
                <span>Administrator</span>
              </div>
            </div>
          </div>
        </header>

        {/* ── FIRST-TIME BANNER ─────────────────────── */}
        {isFirstTime && (
          <section className="md-first-banner">
            <div className="md-first-banner-left">
              <Upload size={32} className="md-first-banner-icon" />
              <div>
                <h2>Welcome! Let's import your data.</h2>
                <p>
                  Upload a CSV or XLSX file with student and faculty records to
                  populate the dashboard with real data.
                </p>
              </div>
            </div>
            <button
              className="md-first-banner-btn"
              onClick={handleImportData}
              type="button"
            >
              Import CSV / XLSX
              <ArrowUpRight size={16} />
            </button>
          </section>
        )}

        {/* ── STATS GRID ────────────────────────────── */}
        <section className="md-section">
          <h2 className="md-section-title">Dashboard Overview</h2>

          <div className="md-stats-grid">

            {/* Students */}
            <div className="md-stat-card md-stat-blue">
              <div className="md-stat-top">
                <div className="md-stat-icon">
                  <GraduationCap size={20} />
                </div>
                <span className="md-stat-trend">
                  {hasData ? `${totalStudents} records` : "No data"}
                </span>
              </div>
              <span className="md-stat-label">TOTAL STUDENTS</span>
              <strong className="md-stat-value">
                {loadingStats ? "…" : totalStudents.toLocaleString()}
              </strong>
              <p className="md-stat-foot">
                {hasData ? `${activeStudents} active` : "Import a CSV to see data"}
              </p>
            </div>

            {/* Faculty */}
            <div className="md-stat-card md-stat-green">
              <div className="md-stat-top">
                <div className="md-stat-icon">
                  <UserRoundCheck size={20} />
                </div>
                <span className="md-stat-trend">
                  {hasData ? `${totalFaculty} records` : "No data"}
                </span>
              </div>
              <span className="md-stat-label">TOTAL FACULTY</span>
              <strong className="md-stat-value">
                {loadingStats ? "…" : totalFaculty.toLocaleString()}
              </strong>
              <p className="md-stat-foot">
                {hasData ? `${activeFaculty} active` : "Import a CSV to see data"}
              </p>
            </div>

            {/* Attendance */}
            <div className="md-stat-card md-stat-purple">
              <div className="md-stat-top">
                <div className="md-stat-icon">
                  <CalendarCheck size={20} />
                </div>
                <span className="md-stat-trend">
                  {attArr.length ? `${attArr.length} records` : "No data"}
                </span>
              </div>
              <span className="md-stat-label">AVG ATTENDANCE</span>
              <strong className="md-stat-value">
                {attArr.length ? `${avgAttendance}%` : "—"}
              </strong>
              <p className="md-stat-foot">
                Attendance module coming soon
              </p>
            </div>

            {/* Departments */}
            <div className="md-stat-card md-stat-orange">
              <div className="md-stat-top">
                <div className="md-stat-icon">
                  <BookOpen size={20} />
                </div>
                <span className="md-stat-trend">
                  {departments.length ? `${departments.length} depts` : "No data"}
                </span>
              </div>
              <span className="md-stat-label">DEPARTMENTS</span>
              <strong className="md-stat-value">
                {loadingStats ? "…" : (departments.length || 0)}
              </strong>
              <p className="md-stat-foot">
                {departments.length ? "Across all students" : "Include department column in CSV"}
              </p>
            </div>

          </div>
        </section>

        {/* ── CHARTS ────────────────────────────────── */}
        {hasData && (
          <section className="md-section md-charts-row">

            {/* Monthly Student Enrollment */}
            <div className="md-chart-card">
              <div className="md-chart-header">
                <div>
                  <h3>Student Enrollment</h3>
                  <p>Monthly distribution from imported data</p>
                </div>
              </div>

              <div className="md-bar-chart">
                <div className="md-y-axis">
                  {[100, 75, 50, 25, 0].map((v) => (
                    <span key={v}>{Math.round((v / 100) * maxMonthly)}</span>
                  ))}
                </div>

                <div className="md-chart-area">
                  <div className="md-chart-grid" />
                  <div className="md-bars">
                    {monthLabels.map((label, idx) => {
                      const pct = maxMonthly
                        ? (monthlyCounts[idx] / maxMonthly) * 100
                        : 0;
                      return (
                        <div key={label} className="md-bar-col">
                          <div
                            className="md-bar"
                            style={{ height: `${pct || 2}%` }}
                            title={`${label}: ${monthlyCounts[idx]} students`}
                          />
                          <small>{label.slice(0, 1)}</small>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Department Breakdown */}
            <div className="md-chart-card">
              <div className="md-chart-header">
                <div>
                  <h3>Department Breakdown</h3>
                  <p>Students per department</p>
                </div>
              </div>

              {departments.length > 0 ? (
                <div className="md-dept-list">
                  {departments.slice(0, 7).map((dept, idx) => {
                    const pct = totalStudents
                      ? ((deptCounts[idx] / totalStudents) * 100).toFixed(1)
                      : "0.0";
                    return (
                      <div key={dept} className="md-dept-row">
                        <span className="md-dept-name">{dept}</span>
                        <div className="md-dept-bar-wrap">
                          <div
                            className="md-dept-bar"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="md-dept-count">
                          {deptCounts[idx]} ({pct}%)
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="md-empty">
                  No department column found in CSV.
                </p>
              )}
            </div>

          </section>
        )}

        {/* ── QUICK ACTIONS ─────────────────────────── */}
        <section className="md-section">
          <div className="md-section-header">
            <div>
              <h2 className="md-section-title" style={{ marginBottom: 4 }}>
                Quick Actions
              </h2>
              <p className="md-section-sub">Frequently used management tools</p>
            </div>
          </div>

          <div className="md-actions-grid">
            {quickActions.map((a) => {
              const Icon = a.icon;
              return (
                <button
                  key={a.id}
                  className={`md-action-card md-action-${a.color}`}
                  type="button"
                  onClick={a.handler}
                >
                  <div className={`md-action-icon md-action-icon-${a.color}`}>
                    <Icon size={22} />
                  </div>
                  <div className="md-action-text">
                    <h3>{a.label}</h3>
                    <p>{a.desc}</p>
                  </div>
                  <ChevronRight size={18} className="md-action-arrow" />
                </button>
              );
            })}
          </div>
        </section>

        {/* ── ACTIVITY + DATA PREVIEW ───────────────── */}
        <section className="md-section md-bottom-row">

          {/* Recent Activity */}
          <div className="md-card">
            <div className="md-card-header">
              <div>
                <h3>Recent Activity</h3>
                <p>Latest updates from your institution</p>
              </div>
              <button className="md-view-all" type="button">View All</button>
            </div>

            <div className="md-activity-list">
              {recentActivities.map((act) => {
                const Icon = act.icon;
                return (
                  <div key={act.id} className={`md-activity-item md-act-${act.status}`}>
                    <div className={`md-act-icon md-act-${act.status}`}>
                      <Icon size={16} />
                    </div>
                    <div className="md-act-content">
                      <strong>{act.title}</strong>
                      <span>{act.desc}</span>
                    </div>
                    <time>{act.time}</time>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Data Preview */}
          <div className="md-card">
            <div className="md-card-header">
              <div>
                <h3>Data Preview</h3>
                <p>Recently imported records</p>
              </div>
              {hasData && (
                <button
                  className="md-view-all"
                  type="button"
                  onClick={handleStudents}
                >
                  Manage
                </button>
              )}
            </div>

            {hasData ? (
              <div className="md-preview-list">
                {previewStudents.map((s, i) => (
                  <div key={i} className="md-preview-row">
                    <div className="md-preview-avatar">
                      {String(s.name || s.student_id || "S").charAt(0).toUpperCase()}
                    </div>
                    <div className="md-preview-info">
                      <strong>{s.name || `Student ${i + 1}`}</strong>
                      <span>
                        {s.department || "—"} · {s.student_id || "—"}
                      </span>
                    </div>
                    <span className="md-preview-tag">Student</span>
                  </div>
                ))}

                {previewFaculty.map((f, i) => (
                  <div key={`f-${i}`} className="md-preview-row">
                    <div className="md-preview-avatar md-avatar-green">
                      {String(f.name || f.employee_id || "F").charAt(0).toUpperCase()}
                    </div>
                    <div className="md-preview-info">
                      <strong>{f.name || `Faculty ${i + 1}`}</strong>
                      <span>
                        {f.department || "—"} · {f.employee_id || "—"}
                      </span>
                    </div>
                    <span className="md-preview-tag md-tag-green">Faculty</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="md-empty-state">
                <Database size={36} />
                <p>No records imported yet.</p>
                <button
                  className="md-empty-btn"
                  onClick={handleImportData}
                  type="button"
                >
                  <Upload size={15} /> Import Now
                </button>
              </div>
            )}
          </div>

        </section>

      </main>
    </div>
  );
}

export default ManagementDashboard;