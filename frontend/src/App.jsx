// import { NavLink, Routes, Route, Navigate } from "react-router-dom";

// import Navbar from "./components/common/Navbar";
// import Footer from "./components/common/Footer";

// import LandingPage from "./pages/home/LandingPage";
// import FeaturesPage from "./pages/features/FeaturesPage";
// import DashboardPage from "./pages/dashboard/DashboardPage";
// import CreateAccountPage from "./pages/auth/GetStartedPage";
// import RequestDemoPage from "./pages/demo/requestdemo";
// import LoginPage from "./pages/auth/LoginPage";

// import "./App.css";


// function AboutPage() {
//   return (
//     <main className="simple-page">
//       <span>ABOUT EDUNEXUS</span>

//       <h1>
//         An intelligent operating system
//         for modern colleges.
//       </h1>

//       <p>
//         EduNexus AI ERP connects academic,
//         administrative and career workflows
//         into one unified education platform.
//       </p>
//     </main>
//   );
// }


// function PricingPage() {
//   return (
//     <main className="simple-page">
//       <span>EDUNEXUS PRICING</span>

//       <h1>
//         Simple and flexible plans.
//       </h1>

//       <p>
//         Flexible plans designed for students,
//         institutions and educational organizations.
//       </p>
//     </main>
//   );
// }


// function Navbar() {
//   return (
//     <nav className="navbar">

//       {/* BRAND */}
//       <NavLink
//         to="/"
//         className="brand"
//       >
//         <div className="brand-logo">
//           E
//         </div>

//         <div className="brand-text">
//           <strong>EduNexus</strong>
//           <span>AI ERP</span>
//         </div>
//       </NavLink>


//       {/* NAVIGATION */}
//       <div className="nav-links">

//         <NavLink
//           to="/"
//           end
//           className={({ isActive }) =>
//             isActive
//               ? "nav-link active"
//               : "nav-link"
//           }
//         >
//           Home
//         </NavLink>


//         <NavLink
//           to="/features"
//           className={({ isActive }) =>
//             isActive
//               ? "nav-link active"
//               : "nav-link"
//           }
//         >
//           Features
//         </NavLink>


//         <NavLink
//           to="/about"
//           className={({ isActive }) =>
//             isActive
//               ? "nav-link active"
//               : "nav-link"
//           }
//         >
//           About
//         </NavLink>


//         <NavLink
//           to="/pricing"
//           className={({ isActive }) =>
//             isActive
//               ? "nav-link active"
//               : "nav-link"
//           }
//         >
//           Pricing
//         </NavLink>


//         <NavLink
//           to="/dashboard"
//           className={({ isActive }) =>
//             isActive
//               ? "nav-link active"
//               : "nav-link"
//           }
//         >
//           Dashboard
//         </NavLink>


//         <NavLink
//           to="/login"
//           className={({ isActive }) =>
//             isActive
//               ? "nav-link active"
//               : "nav-link"
//           }
//         >
//           Login
//         </NavLink>

//       </div>


//       {/* GET STARTED */}
//       <NavLink
//         to="/login"
//         className="get-started-btn"
//       >
//         Get Started →
//       </NavLink>

//     </nav>
//   );
// }


// function Footer() {
//   return (
//     <footer className="footer">

//       <div className="footer-brand">

//         <div className="brand-logo">
//           E
//         </div>

//         <div>
//           <strong>EduNexus AI</strong>

//           <p>
//             Intelligent ERP for modern education.
//           </p>
//         </div>

//       </div>


//       <div className="footer-links">

//         <NavLink to="/">
//           Home
//         </NavLink>

//         <NavLink to="/features">
//           Features
//         </NavLink>

//         <NavLink to="/dashboard">
//           Dashboard
//         </NavLink>

//         <NavLink to="/login">
//           Login
//         </NavLink>

//       </div>


//       <div className="footer-bottom">
//         © 2026 EduNexus AI ERP. All rights reserved.
//       </div>

//     </footer>
//   );
// }


// function App() {
//   return (
//     <div className="app">

//       <Navbar />

//       <Routes>

//         {/* HOME */}
//         <Route
//           path="/"
//           element={<LandingPage />}
//         />


//         {/* FEATURES */}
//         <Route
//           path="/features"
//           element={<FeaturesPage />}
//         />


//         {/* DASHBOARD */}
//         <Route
//           path="/dashboard"
//           element={<DashboardPage />}
//         />


//         {/* LOGIN */}
//         <Route
//           path="/login"
//           element={<LoginPage />}
//         />


//         <Route
//           path="/get-started"
//           element={<CreateAccountPage />}
//         />

//         <Route 
//           path="/request-demo" 
//           element={<RequestDemoPage />} 
//         />


//         {/* ABOUT */}
//         <Route
//           path="/about"
//           element={<AboutPage />}
//         />


//         {/* PRICING */}
//         <Route
//           path="/pricing"
//           element={<PricingPage />}
//         />


//         {/* UNKNOWN URL → HOME */}
//         <Route
//           path="*"
//           element={<Navigate to="/" replace />}
//         />

//       </Routes>


//       <Footer />

//     </div>
//   );
// }


// export default App; 

import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

import LandingPage from "./pages/home/LandingPage";
import FeaturesPage from "./pages/features/FeaturesPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import CreateAccountPage from "./pages/auth/GetStartedPage";
import RequestDemoPage from "./pages/demo/requestdemo";
import LoginPage from "./pages/auth/LoginPage";

import "./App.css";


function AboutPage() {
  return (
    <main className="simple-page">
      <span>ABOUT EDUNEXUS</span>
      <h1>An intelligent operating system for modern colleges.</h1>
      <p>EduNexus AI ERP connects academic, administrative and career workflows into one unified education platform.</p>
    </main>
  );
}


function PricingPage() {
  return (
    <main className="simple-page">
      <span>EDUNEXUS PRICING</span>
      <h1>Simple and flexible plans.</h1>
      <p>Flexible plans designed for students, institutions and educational organizations.</p>
    </main>
  );
}


function App() {
  return (
    <div className="app">
      <Navbar />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/get-started" element={<CreateAccountPage />} />
        <Route path="/request-demo" element={<RequestDemoPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;