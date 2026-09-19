

import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

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
import "./App.css";


function AboutPage() {
  return (
    <main className="simple-page">

      <span>ABOUT EDUNEXUS</span>

      <h1>
        An intelligent operating system
        for modern colleges.
      </h1>

      <p>
        EduNexus AI ERP connects academic,
        administrative and career workflows
        into one unified education platform.
      </p>

    </main>
  );
}


function PricingPage() {
  return (
    <main className="simple-page">

      <span>EDUNEXUS PRICING</span>

      <h1>
        Simple and flexible plans.
      </h1>

      <p>
        Flexible plans designed for students,
        institutions and educational organizations.
      </p>

    </main>
  );
}


function App() {
  return (
    <div className="app">

      <Navbar />

      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={<LandingPage />}
        />

        {/* FEATURES */}
        <Route
          path="/features"
          element={<FeaturesPage />}
        />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={<DashboardPage />}
        />
        {/* MANAGEMENT DASHBOARD */}
        <Route
          path="/management/dashboard"
          element={<ManagementDashboard />}
        />
        <Route
          path="/management/import"
          element={<ManagementImport />}
        />
        <Route
          path="/management/students"
          element={<StudentsManagement />}
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={<LoginPage />}
        />

        {/* GET STARTED */}
        <Route
          path="/get-started"
          element={<GetStartedPage />}
        />

        {/* STUDENT SIGNUP */}
        <Route
          path="/signup/student"
          element={<StudentSignupPage />}
        />

        <Route
          path="/faculty-invitation"
          element={<FacultyInvitationPage />}
        />

        <Route
          path="/management-access"
          element={<ManagementAccessRequestPage />}
        />

        {/* REQUEST DEMO */}
        <Route
          path="/request-demo"
          element={<RequestDemoPage />}
        />

        {/* ABOUT */}
        <Route
          path="/about"
          element={<AboutPage />}
        />

        {/* PRICING */}
        <Route
          path="/pricing"
          element={<PricingPage />}
        />

        {/* UNKNOWN URL */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>

      <Footer />

    </div>
  );
}


export default App;