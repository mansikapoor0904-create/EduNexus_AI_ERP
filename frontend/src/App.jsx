import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

// Pages
import LandingPage from "./pages/home/LandingPage";
import FeaturesPage from "./pages/features/FeaturesPage";
import DashboardPage from "./pages/dashboard/DashboardPage";

import GetStartedPage from "./pages/auth/GetStartedPage";
import LoginPage from "./pages/auth/LoginPage";
import StudentSignupPage from "./pages/auth/StudentsigninPage.jsx";
import FacultyInvitationPage from "./pages/auth/FacultyInvitationPage";
import ManagementAccessRequestPage from "./pages/auth/ManagementAccessRequestPage";

import RequestDemoPage from "./pages/demo/requestdemo";

import ManagementDashboard from "./pages/ManagementDashboard/ManagementDashboard";
import ManagementImport from "./pages/ManagementImport/ManagementImport";
import StudentsManagement from "./pages/StudentsManagement/StudentsManagement";
import FacultyManagement from "./pages/FacultyManagement/FacultyManagement";


import StudentDashboard from "./pages/StudentDashboard/StudentDashboard";

import "./App.css";


// ---------------------------------------------
// ABOUT PAGE
// ---------------------------------------------

function AboutPage() {
  return (
    <main className="simple-page">
      <span>ABOUT EDUNEXUS</span>
      <h1>An intelligent operating system for modern colleges.</h1>
      <p>
        EduNexus AI ERP connects academic, administrative and career workflows
        into one unified education platform.
      </p>
    </main>
  );
}


// ---------------------------------------------
// PRICING PAGE
// ---------------------------------------------

function PricingPage() {
  return (
    <main className="simple-page">
      <span>EDUNEXUS PRICING</span>
      <h1>Simple and flexible plans.</h1>
      <p>
        Flexible plans designed for students, institutions and educational organizations.
      </p>
    </main>
  );
}


// ---------------------------------------------
// MAIN APP
// ---------------------------------------------

function App() {

  const location = useLocation();

  // Pages where Navbar should NOT appear
  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname.startsWith("/management") ||
    location.pathname.startsWith("/faculty") ||
    location.pathname.startsWith("/student");

  // Pages where Footer should NOT appear
  const hideFooter =
    location.pathname === "/login" ||
    location.pathname.startsWith("/management") ||
    location.pathname.startsWith("/faculty") ||
    location.pathname.startsWith("/student");

  return (
    <div className="app">

      {/* NAVBAR */}
      {!hideNavbar && <Navbar />}

      {/* ROUTES */}
      <Routes>

        {/* -------------------------------- */}
        {/* HOME                             */}
        {/* -------------------------------- */}
        <Route path="/" element={<LandingPage />} />

        {/* -------------------------------- */}
        {/* FEATURES                         */}
        {/* -------------------------------- */}
        <Route path="/features" element={<FeaturesPage />} />

        {/* -------------------------------- */}
        {/* GENERAL DASHBOARD                */}
        {/* -------------------------------- */}
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* -------------------------------- */}
        {/* MANAGEMENT                       */}
        {/* -------------------------------- */}
        <Route path="/management/dashboard" element={<ManagementDashboard />} />
        <Route path="/management/students" element={<StudentsManagement />} />
        <Route path="/management/faculty" element={<FacultyManagement />} />
        <Route path="/management/import" element={<ManagementImport />} />

        {/* 👇 NEW STUDENT DASHBOARD ROUTE ADDED HERE 👇 */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />

        {/* -------------------------------- */}
        {/* LOGIN                            */}
        {/* -------------------------------- */}
        <Route path="/login" element={<LoginPage />} />

        {/* -------------------------------- */}
        {/* GET STARTED                      */}
        {/* -------------------------------- */}
        <Route path="/get-started" element={<GetStartedPage />} />

        {/* -------------------------------- */}
        {/* STUDENT SIGNUP                   */}
        {/* -------------------------------- */}
        <Route path="/signup/student" element={<StudentSignupPage />} />

        {/* -------------------------------- */}
        {/* FACULTY                          */}
        {/* -------------------------------- */}
        <Route path="/faculty-invitation" element={<FacultyInvitationPage />} />

        {/* -------------------------------- */}
        {/* MANAGEMENT ACCESS                */}
        {/* -------------------------------- */}
        <Route path="/management-access" element={<ManagementAccessRequestPage />} />

        {/* -------------------------------- */}
        {/* REQUEST DEMO                     */}
        {/* -------------------------------- */}
        <Route path="/request-demo" element={<RequestDemoPage />} />

        {/* -------------------------------- */}
        {/* ABOUT                            */}
        {/* -------------------------------- */}
        <Route path="/about" element={<AboutPage />} />

        {/* -------------------------------- */}
        {/* PRICING                          */}
        {/* -------------------------------- */}
        <Route path="/pricing" element={<PricingPage />} />

        {/* -------------------------------- */}
        {/* UNKNOWN URL                      */}
        {/* -------------------------------- */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>

      {/* FOOTER */}
      {!hideFooter && <Footer />}

    </div>
  );
}

export default App;