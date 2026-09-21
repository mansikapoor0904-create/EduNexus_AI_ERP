// import { NavLink, Link } from "react-router-dom";
// import "./Navbar.css";

// function Navbar() {
//   return (
//     <header className="navbar">
//       <div className="navbar-container">

//         {/* LOGO */}
//         <Link to="/" className="brand">
//           <div className="brand-icon">E</div>

//           <div className="brand-text">
//             <strong>EduNexus</strong>
            
//           </div>
//         </Link>

//         {/* NAVIGATION */}
//         <nav className="nav-links">

//           <NavLink
//             to="/"
//             className={({ isActive }) =>
//               isActive ? "nav-link active" : "nav-link"
//             }
//           >
//             Home
//           </NavLink>

//           <NavLink
//             to="/features"
//             className={({ isActive }) =>
//               isActive ? "nav-link active" : "nav-link"
//             }
//           >
//             Features
//           </NavLink>

//           <NavLink
//             to="/about"
//             className={({ isActive }) =>
//               isActive ? "nav-link active" : "nav-link"
//             }
//           >
//             About
//           </NavLink>

//           <NavLink
//             to="/pricing"
//             className={({ isActive }) =>
//               isActive ? "nav-link active" : "nav-link"
//             }
//           >
//             Pricing
//           </NavLink>

//           <NavLink
//             to="/dashboard"
//             className={({ isActive }) =>
//               isActive ? "nav-link active" : "nav-link"
//             }
//           >
//             Dashboard
//           </NavLink>

//         </nav>

//         {/* ACTIONS */}
//         <div className="navbar-actions">

//           <Link to="/login" className="login-link">
//             Login
//           </Link>

//           <Link to="/get-started" className="get-started-btn">
//           Get Started
//           <span>→</span>
//           </Link>

//         </div>

//       </div>
//     </header>
//   );
// }

// export default Navbar;

import { NavLink, Link } from "react-router-dom";
import { UserRound, ArrowRight } from "lucide-react";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* =========================
            LOGO / BRAND
        ========================= */}

        <Link to="/" className="brand">
          <div className="brand-icon">
            E
          </div>

          <div className="brand-text">
            <strong>EduNexus</strong>
          </div>
        </Link>


        {/* =========================
            NAVIGATION
        ========================= */}

        <nav className="nav-links">

          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            Home
          </NavLink>


          <NavLink
            to="/features"
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            Features
          </NavLink>


          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            About
          </NavLink>


          <NavLink
            to="/pricing"
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            Pricing
          </NavLink>


          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            Dashboard
          </NavLink>

        </nav>


        {/* =========================
            ACTIONS
        ========================= */}

        <div className="navbar-actions">

          {/* HUMAN / LOGIN ICON */}

          <Link
            to="/login"
            className="login-icon"
            title="Login"
            aria-label="Login"
          >
            <UserRound
              size={20}
              strokeWidth={2}
            />
          </Link>


          {/* REQUEST DEMO */}

          <Link
            to="/request-demo"
            className="request-demo-btn"
          >
            <span>Request a Demo</span>

            <ArrowRight
              size={16}
              strokeWidth={2.2}
            />
          </Link>

        </div>

      </div>
    </header>
  );
}

export default Navbar;