// import {
//   Users,
//   GraduationCap,
//   UserRoundCheck,
//   BookOpen,
//   CalendarCheck,
//   FileText,
//   Upload,
//   UserPlus,
//   BarChart3,
//   Settings,
//   Bell,
//   Search,
//   LogOut,
// } from "lucide-react";

// import { useNavigate } from "react-router-dom";

// import "./ManagementDashboard.css";

// function ManagementDashboard() {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     navigate("/login");
//   };

//   return (
//     <main className="management-dashboard">

//       {/* SIDEBAR */}
//       <aside className="management-sidebar">

//         <div className="management-logo">
//           <div className="management-logo-icon">
//             E
//           </div>

//           <div>
//             <strong>EduNexus</strong>
//             <span>AI ERP</span>
//           </div>
//         </div>

//         <div className="management-profile">
//           <div className="profile-avatar">
//             EA
//           </div>

//           <div>
//             <strong>EduNexus Admin</strong>
//             <span>Management</span>
//           </div>
//         </div>

//         <nav className="management-nav">

//           <button className="nav-item active">
//             <BarChart3 size={19} />
//             <span>Overview</span>
//           </button>

//           <button className="nav-item">
//             <Users size={19} />
//             <span>Students</span>
//           </button>

//           <button className="nav-item">
//             <GraduationCap size={19} />
//             <span>Faculty</span>
//           </button>

//           <button className="nav-item">
//             <BookOpen size={19} />
//             <span>Academics</span>
//           </button>

//           <button className="nav-item">
//             <CalendarCheck size={19} />
//             <span>Attendance</span>
//           </button>

//           <button className="nav-item">
//             <FileText size={19} />
//             <span>Reports</span>
//           </button>

//           <button className="nav-item">
//             <Settings size={19} />
//             <span>Settings</span>
//           </button>

//         </nav>

//         <button
//           className="management-logout"
//           onClick={handleLogout}
//         >
//           <LogOut size={18} />
//           <span>Logout</span>
//         </button>

//       </aside>

//       {/* MAIN CONTENT */}
//       <section className="management-main">

//         {/* HEADER */}
//         <header className="management-header">

//           <div>
//             <span className="dashboard-eyebrow">
//               MANAGEMENT WORKSPACE
//             </span>

//             <h1>
//               Good evening, EduNexus Admin
//             </h1>

//             <p>
//               Manage your institution from one
//               intelligent workspace.
//             </p>
//           </div>

//           <div className="header-actions">

//             <button className="header-icon">
//               <Search size={19} />
//             </button>

//             <button className="header-icon notification">
//               <Bell size={19} />
//               <span></span>
//             </button>

//             <div className="header-avatar">
//               EA
//             </div>

//           </div>

//         </header>

//         {/* STAT CARDS */}
//         <section className="stats-grid">

//           <div className="stat-card">

//             <div className="stat-top">
//               <div className="stat-icon students">
//                 <Users size={20} />
//               </div>

//               <span className="stat-growth">
//                 +8.4%
//               </span>
//             </div>

//             <span className="stat-label">
//               Total Students
//             </span>

//             <strong className="stat-value">
//               2,486
//             </strong>

//             <p>
//               Compared with last month
//             </p>

//           </div>

//           <div className="stat-card">

//             <div className="stat-top">
//               <div className="stat-icon faculty">
//                 <GraduationCap size={20} />
//               </div>

//               <span className="stat-growth">
//                 +3.2%
//               </span>
//             </div>

//             <span className="stat-label">
//               Faculty Members
//             </span>

//             <strong className="stat-value">
//               148
//             </strong>

//             <p>
//               Active teaching staff
//             </p>

//           </div>

//           <div className="stat-card">

//             <div className="stat-top">
//               <div className="stat-icon attendance">
//                 <CalendarCheck size={20} />
//               </div>

//               <span className="stat-growth">
//                 +2.1%
//               </span>
//             </div>

//             <span className="stat-label">
//               Average Attendance
//             </span>

//             <strong className="stat-value">
//               91.6%
//             </strong>

//             <p>
//               Across all departments
//             </p>

//           </div>

//           <div className="stat-card">

//             <div className="stat-top">
//               <div className="stat-icon performance">
//                 <BarChart3 size={20} />
//               </div>

//               <span className="stat-growth">
//                 +5.7%
//               </span>
//             </div>

//             <span className="stat-label">
//               Academic Performance
//             </span>

//             <strong className="stat-value">
//               87.4%
//             </strong>

//             <p>
//               Average institutional score
//             </p>

//           </div>

//         </section>

//         {/* QUICK ACTIONS */}
//         <section className="dashboard-section">

//           <div className="section-heading">
//             <div>
//               <span>QUICK ACTIONS</span>
//               <h2>Manage your institution</h2>
//             </div>
//           </div>

//           <div className="quick-actions">

//             <button className="action-card">
//               <div className="action-icon">
//                 <UserPlus size={21} />
//               </div>

//               <div>
//                 <strong>Add Student</strong>
//                 <span>
//                   Create a student account
//                 </span>
//               </div>
//             </button>

//             <button className="action-card">
//               <div className="action-icon">
//                 <GraduationCap size={21} />
//               </div>

//               <div>
//                 <strong>Add Faculty</strong>
//                 <span>
//                   Create a faculty account
//                 </span>
//               </div>
//             </button>

//             <button className="action-card">
//               <div className="action-icon">
//                 <Upload size={21} />
//               </div>

//               <div>
//                 <strong>Import Data</strong>
//                 <span>
//                   Upload CSV or Excel
//                 </span>
//               </div>
//             </button>

//             <button className="action-card">
//               <div className="action-icon">
//                 <FileText size={21} />
//               </div>

//               <div>
//                 <strong>Generate Report</strong>
//                 <span>
//                   Create an institution report
//                 </span>
//               </div>
//             </button>

//           </div>

//         </section>

//         {/* LOWER GRID */}
//         <section className="dashboard-lower">

//           {/* PERFORMANCE */}
//           <div className="dashboard-panel">

//             <div className="panel-header">
//               <div>
//                 <span>ACADEMIC ANALYTICS</span>
//                 <h2>Institution performance</h2>
//               </div>

//               <button>
//                 View report
//               </button>
//             </div>

//             <div className="performance-chart">

//               <div className="chart-y">
//                 <span>100%</span>
//                 <span>75%</span>
//                 <span>50%</span>
//                 <span>25%</span>
//                 <span>0%</span>
//               </div>

//               <div className="chart-area">

//                 <div className="chart-grid-line"></div>
//                 <div className="chart-grid-line"></div>
//                 <div className="chart-grid-line"></div>
//                 <div className="chart-grid-line"></div>

//                 <div className="chart-bars">

//                   <div>
//                     <span style={{ height: "58%" }}></span>
//                     <small>Jan</small>
//                   </div>

//                   <div>
//                     <span style={{ height: "67%" }}></span>
//                     <small>Feb</small>
//                   </div>

//                   <div>
//                     <span style={{ height: "63%" }}></span>
//                     <small>Mar</small>
//                   </div>

//                   <div>
//                     <span style={{ height: "76%" }}></span>
//                     <small>Apr</small>
//                   </div>

//                   <div>
//                     <span style={{ height: "72%" }}></span>
//                     <small>May</small>
//                   </div>

//                   <div>
//                     <span style={{ height: "84%" }}></span>
//                     <small>Jun</small>
//                   </div>

//                 </div>

//               </div>

//             </div>

//           </div>

//           {/* RECENT ACTIVITY */}
//           <div className="dashboard-panel">

//             <div className="panel-header">
//               <div>
//                 <span>RECENT ACTIVITY</span>
//                 <h2>Latest updates</h2>
//               </div>
//             </div>

//             <div className="activity-list">

//               <div className="activity-item">

//                 <div className="activity-icon">
//                   <UserRoundCheck size={17} />
//                 </div>

//                 <div>
//                   <strong>
//                     24 students imported
//                   </strong>

//                   <span>
//                     Student data was uploaded
//                   </span>
//                 </div>

//                 <time>
//                   10m
//                 </time>

//               </div>

//               <div className="activity-item">

//                 <div className="activity-icon">
//                   <GraduationCap size={17} />
//                 </div>

//                 <div>
//                   <strong>
//                     5 faculty accounts added
//                   </strong>

//                   <span>
//                     New faculty members activated
//                   </span>
//                 </div>

//                 <time>
//                   42m
//                 </time>

//               </div>

//               <div className="activity-item">

//                 <div className="activity-icon">
//                   <FileText size={17} />
//                 </div>

//                 <div>
//                   <strong>
//                     Monthly report generated
//                   </strong>

//                   <span>
//                     September performance report
//                   </span>
//                 </div>

//                 <time>
//                   2h
//                 </time>

//               </div>

//             </div>

//           </div>

//         </section>

//       </section>

//     </main>
//   );
// }

// export default ManagementDashboard;

import {
  Users,
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
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import "./ManagementDashboard.css";

function ManagementDashboard() {
  const navigate = useNavigate();

  // -----------------------------
  // Logout
  // -----------------------------
  const handleLogout = () => {
    navigate("/login");
  };

  // -----------------------------
  // Navigation
  // -----------------------------
  const handleImportData = () => {
    navigate("/management/import");
  };

  const handleStudents = () => {
    navigate("/management/students");
  };

  const handleFaculty = () => {
    // Faculty page will be added later
    console.log("Faculty page coming soon");
  };

  const handleAcademics = () => {
    console.log("Academics page coming soon");
  };

  const handleAttendance = () => {
    console.log("Attendance page coming soon");
  };

  const handleReports = () => {
    console.log("Reports page coming soon");
  };

  const handleSettings = () => {
    console.log("Settings page coming soon");
  };

  const handleAddStudent = () => {
    navigate("/management/students");
  };

  const handleAddFaculty = () => {
    console.log("Add Faculty page coming soon");
  };

  const handleGenerateReport = () => {
    console.log("Generate Report page coming soon");
  };

  return (
    <main className="management-dashboard">

      {/* =========================================
          SIDEBAR
      ========================================= */}
      <aside className="management-sidebar">

        {/* LOGO */}
        <div className="management-logo">

          <div className="management-logo-icon">
            E
          </div>

          <div>
            <strong>EduNexus</strong>
            <span>AI ERP</span>
          </div>

        </div>

        {/* PROFILE */}
        <div className="management-profile">

          <div className="profile-avatar">
            EA
          </div>

          <div>
            <strong>EduNexus Admin</strong>
            <span>Management</span>
          </div>

        </div>

        {/* NAVIGATION */}
        <nav className="management-nav">

          {/* Overview */}
          <button
            className="nav-item active"
            type="button"
          >
            <BarChart3 size={19} />
            <span>Overview</span>
          </button>

          {/* Students */}
          <button
            className="nav-item"
            type="button"
            onClick={handleStudents}
          >
            <Users size={19} />
            <span>Students</span>
          </button>

          {/* Faculty */}
          <button
            className="nav-item"
            type="button"
            onClick={handleFaculty}
          >
            <GraduationCap size={19} />
            <span>Faculty</span>
          </button>

          {/* Academics */}
          <button
            className="nav-item"
            type="button"
            onClick={handleAcademics}
          >
            <BookOpen size={19} />
            <span>Academics</span>
          </button>

          {/* Attendance */}
          <button
            className="nav-item"
            type="button"
            onClick={handleAttendance}
          >
            <CalendarCheck size={19} />
            <span>Attendance</span>
          </button>

          {/* Reports */}
          <button
            className="nav-item"
            type="button"
            onClick={handleReports}
          >
            <FileText size={19} />
            <span>Reports</span>
          </button>

          {/* Settings */}
          <button
            className="nav-item"
            type="button"
            onClick={handleSettings}
          >
            <Settings size={19} />
            <span>Settings</span>
          </button>

        </nav>

        {/* LOGOUT */}
        <button
          className="management-logout"
          type="button"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>

      </aside>

      {/* =========================================
          MAIN CONTENT
      ========================================= */}
      <section className="management-main">

        {/* =========================================
            HEADER
        ========================================= */}
        <header className="management-header">

          <div>

            <span className="dashboard-eyebrow">
              MANAGEMENT WORKSPACE
            </span>

            <h1>
              Good evening, EduNexus Admin
            </h1>

            <p>
              Manage your institution from one
              intelligent workspace.
            </p>

          </div>

          <div className="header-actions">

            {/* Search */}
            <button
              className="header-icon"
              type="button"
              aria-label="Search"
            >
              <Search size={19} />
            </button>

            {/* Notifications */}
            <button
              className="header-icon notification"
              type="button"
              aria-label="Notifications"
            >
              <Bell size={19} />
              <span></span>
            </button>

            {/* Profile */}
            <div className="header-avatar">
              EA
            </div>

          </div>

        </header>

        {/* =========================================
            STAT CARDS
        ========================================= */}
        <section className="stats-grid">

          {/* STUDENTS */}
          <div className="stat-card">

            <div className="stat-top">

              <div className="stat-icon students">
                <Users size={20} />
              </div>

              <span className="stat-growth">
                +8.4%
              </span>

            </div>

            <span className="stat-label">
              Total Students
            </span>

            <strong className="stat-value">
              2,486
            </strong>

            <p>
              Compared with last month
            </p>

          </div>

          {/* FACULTY */}
          <div className="stat-card">

            <div className="stat-top">

              <div className="stat-icon faculty">
                <GraduationCap size={20} />
              </div>

              <span className="stat-growth">
                +3.2%
              </span>

            </div>

            <span className="stat-label">
              Faculty Members
            </span>

            <strong className="stat-value">
              148
            </strong>

            <p>
              Active teaching staff
            </p>

          </div>

          {/* ATTENDANCE */}
          <div className="stat-card">

            <div className="stat-top">

              <div className="stat-icon attendance">
                <CalendarCheck size={20} />
              </div>

              <span className="stat-growth">
                +2.1%
              </span>

            </div>

            <span className="stat-label">
              Average Attendance
            </span>

            <strong className="stat-value">
              91.6%
            </strong>

            <p>
              Across all departments
            </p>

          </div>

          {/* PERFORMANCE */}
          <div className="stat-card">

            <div className="stat-top">

              <div className="stat-icon performance">
                <BarChart3 size={20} />
              </div>

              <span className="stat-growth">
                +5.7%
              </span>

            </div>

            <span className="stat-label">
              Academic Performance
            </span>

            <strong className="stat-value">
              87.4%
            </strong>

            <p>
              Average institutional score
            </p>

          </div>

        </section>

        {/* =========================================
            QUICK ACTIONS
        ========================================= */}
        <section className="dashboard-section">

          <div className="section-heading">

            <div>

              <span>
                QUICK ACTIONS
              </span>

              <h2>
                Manage your institution
              </h2>

            </div>

          </div>

          <div className="quick-actions">

            {/* ADD STUDENT */}
            <button
              className="action-card"
              type="button"
              onClick={handleAddStudent}
            >

              <div className="action-icon">
                <UserPlus size={21} />
              </div>

              <div>

                <strong>
                  Add Student
                </strong>

                <span>
                  Create a student account
                </span>

              </div>

            </button>

            {/* ADD FACULTY */}
            <button
              className="action-card"
              type="button"
              onClick={handleAddFaculty}
            >

              <div className="action-icon">
                <GraduationCap size={21} />
              </div>

              <div>

                <strong>
                  Add Faculty
                </strong>

                <span>
                  Create a faculty account
                </span>

              </div>

            </button>

            {/* IMPORT DATA */}
            <button
              className="action-card"
              type="button"
              onClick={handleImportData}
            >

              <div className="action-icon">
                <Upload size={21} />
              </div>

              <div>

                <strong>
                  Import Data
                </strong>

                <span>
                  Upload CSV or Excel
                </span>

              </div>

            </button>

            {/* GENERATE REPORT */}
            <button
              className="action-card"
              type="button"
              onClick={handleGenerateReport}
            >

              <div className="action-icon">
                <FileText size={21} />
              </div>

              <div>

                <strong>
                  Generate Report
                </strong>

                <span>
                  Create an institution report
                </span>

              </div>

            </button>

          </div>

        </section>

        {/* =========================================
            LOWER GRID
        ========================================= */}
        <section className="dashboard-lower">

          {/* =========================================
              PERFORMANCE
          ========================================= */}
          <div className="dashboard-panel">

            <div className="panel-header">

              <div>

                <span>
                  ACADEMIC ANALYTICS
                </span>

                <h2>
                  Institution performance
                </h2>

              </div>

              <button type="button">
                View report
              </button>

            </div>

            <div className="performance-chart">

              {/* Y AXIS */}
              <div className="chart-y">

                <span>100%</span>
                <span>75%</span>
                <span>50%</span>
                <span>25%</span>
                <span>0%</span>

              </div>

              {/* CHART */}
              <div className="chart-area">

                <div className="chart-grid-line"></div>
                <div className="chart-grid-line"></div>
                <div className="chart-grid-line"></div>
                <div className="chart-grid-line"></div>

                <div className="chart-bars">

                  <div>
                    <span
                      style={{
                        height: "58%",
                      }}
                    ></span>

                    <small>
                      Jan
                    </small>
                  </div>

                  <div>
                    <span
                      style={{
                        height: "67%",
                      }}
                    ></span>

                    <small>
                      Feb
                    </small>
                  </div>

                  <div>
                    <span
                      style={{
                        height: "63%",
                      }}
                    ></span>

                    <small>
                      Mar
                    </small>
                  </div>

                  <div>
                    <span
                      style={{
                        height: "76%",
                      }}
                    ></span>

                    <small>
                      Apr
                    </small>
                  </div>

                  <div>
                    <span
                      style={{
                        height: "72%",
                      }}
                    ></span>

                    <small>
                      May
                    </small>
                  </div>

                  <div>
                    <span
                      style={{
                        height: "84%",
                      }}
                    ></span>

                    <small>
                      Jun
                    </small>
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* =========================================
              RECENT ACTIVITY
          ========================================= */}
          <div className="dashboard-panel">

            <div className="panel-header">

              <div>

                <span>
                  RECENT ACTIVITY
                </span>

                <h2>
                  Latest updates
                </h2>

              </div>

            </div>

            <div className="activity-list">

              {/* ACTIVITY 1 */}
              <div className="activity-item">

                <div className="activity-icon">
                  <UserRoundCheck size={17} />
                </div>

                <div>

                  <strong>
                    24 students imported
                  </strong>

                  <span>
                    Student data was uploaded
                  </span>

                </div>

                <time>
                  10m
                </time>

              </div>

              {/* ACTIVITY 2 */}
              <div className="activity-item">

                <div className="activity-icon">
                  <GraduationCap size={17} />
                </div>

                <div>

                  <strong>
                    5 faculty accounts added
                  </strong>

                  <span>
                    New faculty members activated
                  </span>

                </div>

                <time>
                  42m
                </time>

              </div>

              {/* ACTIVITY 3 */}
              <div className="activity-item">

                <div className="activity-icon">
                  <FileText size={17} />
                </div>

                <div>

                  <strong>
                    Monthly report generated
                  </strong>

                  <span>
                    September performance report
                  </span>

                </div>

                <time>
                  2h
                </time>

              </div>

            </div>

          </div>

        </section>

      </section>

    </main>
  );
}

export default ManagementDashboard;