import React from "react";
import {
  LayoutDashboard,
  CalendarCheck,
  BookOpen,
  FileText,
  CreditCard,
  Bell,
  Search,
  User,
  LogOut,
  Clock,
  CheckCircle2,
  Video,
  FileSpreadsheet,
  Award,
  ChevronRight,
} from "lucide-react";
import "./StudentDashboard.css";

const StudentDashboard = () => {
  // 1. Get the logged-in user from localStorage (saved during Login)
  // This pulls the exact name from your database (e.g., "Rahul Sharma")
  const user = JSON.parse(
    localStorage.getItem("user") || '{"name": "Student", "role": "student"}'
  );

  // 2. Helper function to generate initials (e.g., "Rahul Sharma" -> "RS")
  const getInitials = (name) => {
    if (!name) return "S";
    const parts = name.trim().split(" ");
    if (parts.length > 1) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Dummy data for the dashboard
  const stats = [
    { title: "Attendance", value: "92%", icon: <CalendarCheck size={20} />, color: "green" },
    { title: "Upcoming Classes", value: "3", icon: <Clock size={20} />, color: "blue" },
    { title: "Pending Assessments", value: "2", icon: <FileText size={20} />, color: "orange" },
    { title: "Notices", value: "5", icon: <Bell size={20} />, color: "purple" },
  ];

  const quickActions = [
    { label: "Mark Attendance", icon: <CheckCircle2 size={24} /> },
    { label: "Join Online Class", icon: <Video size={24} /> },
    { label: "View Syllabus", icon: <FileSpreadsheet size={24} /> },
    { label: "Pay Fees", icon: <CreditCard size={24} /> },
    { label: "Take Quiz", icon: <Award size={24} /> },
    { label: "Build Resume", icon: <User size={24} /> },
  ];

  const schedule = [
    { time: "09:00 AM - 10:00 AM", subject: "Data Structures", room: "Room 204", status: "Ongoing" },
    { time: "11:00 AM - 12:00 PM", subject: "Web Development", room: "Room 305", status: "Upcoming" },
    { time: "01:00 PM - 02:00 PM", subject: "Database Management", room: "Room 102", status: "Upcoming" },
  ];

  const notices = [
    { title: "Mid Semester Examination Schedule", date: "15 May 2025", type: "exam" },
    { title: "College will remain closed on 15 May 2025", date: "14 May 2025", type: "holiday" },
    { title: "Workshop on AI & Machine Learning", date: "13 May 2025", type: "event" },
  ];

  return (
    <div className="student-dashboard">
      {/* SIDEBAR */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand">
          <div className="brand-logo">E</div>
          <span>EduNexus</span>
        </div>
        <nav className="sidebar-nav">
          <a href="#" className="nav-item active"><LayoutDashboard size={20} /> Dashboard</a>
          <a href="#" className="nav-item"><CalendarCheck size={20} /> Attendance</a>
          <a href="#" className="nav-item"><BookOpen size={20} /> Academics</a>
          <a href="#" className="nav-item"><FileText size={20} /> Exams</a>
          <a href="#" className="nav-item"><CreditCard size={20} /> Fees</a>
          <a href="#" className="nav-item"><Bell size={20} /> Notices</a>
        </nav>
        <div className="sidebar-footer">
          <a href="#" className="nav-item"><LogOut size={20} /> Logout</a>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="dashboard-main">
        {/* TOP HEADER */}
        <header className="dashboard-header">
          <div className="search-bar">
            <Search size={18} />
            <input type="text" placeholder="Search anything..." />
          </div>
          <div className="header-actions">
            <button className="icon-btn"><Bell size={20} /></button>
            
            {/* DYNAMIC USER PROFILE - NO IMAGE, JUST INITIALS */}
            <div className="user-profile">
              <div className="profile-avatar-initials">
                {getInitials(user?.name)}
              </div>
              <div>
                <strong>{user?.name || "Student Name"}</strong>
                <span>{user?.role || "Student"}</span>
              </div>
            </div>
          </div>
        </header>

        {/* DASHBOARD CONTENT */}
        <div className="dashboard-content">
          <div className="welcome-banner">
            <h1>Good Morning, {user?.name?.split(" ")[0] || "Student"}! 👋</h1>
            <p>Learn Today, Build Tomorrow.</p>
          </div>

          {/* STATS GRID */}
          <div className="stats-grid">
            {stats.map((stat, idx) => (
              <div className="stat-card" key={idx}>
                <div className={`stat-icon ${stat.color}`}>{stat.icon}</div>
                <div>
                  <h3>{stat.value}</h3>
                  <p>{stat.title}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="dashboard-grid">
            {/* LEFT COLUMN: SCHEDULE & QUICK ACTIONS */}
            <div className="left-column">
              <div className="section-card">
                <div className="section-header">
                  <h2>Today's Schedule</h2>
                  <a href="#">View All</a>
                </div>
                <div className="schedule-list">
                  {schedule.map((item, idx) => (
                    <div className="schedule-item" key={idx}>
                      <div className="schedule-time">{item.time}</div>
                      <div className="schedule-details">
                        <strong>{item.subject}</strong>
                        <span>{item.room}</span>
                      </div>
                      <div className={`schedule-status ${item.status.toLowerCase()}`}>
                        {item.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="section-card">
                <div className="section-header">
                  <h2>Quick Actions</h2>
                </div>
                <div className="quick-actions-grid">
                  {quickActions.map((action, idx) => (
                    <button className="action-btn" key={idx}>
                      {action.icon}
                      <span>{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: NOTICES & EVENTS */}
            <div className="right-column">
              <div className="section-card">
                <div className="section-header">
                  <h2>Notices & Events</h2>
                  <a href="#">View All</a>
                </div>
                <div className="notices-list">
                  {notices.map((notice, idx) => (
                    <div className="notice-item" key={idx}>
                      <div className="notice-icon"><Bell size={16} /></div>
                      <div className="notice-content">
                        <strong>{notice.title}</strong>
                        <span>{notice.date}</span>
                      </div>
                      <ChevronRight size={16} className="chevron" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;