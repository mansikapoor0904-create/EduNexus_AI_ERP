import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* LOGO */}
        <Link to="/" className="brand">
          <div className="brand-icon">E</div>

          <div className="brand-text">
            <strong>EduNexus</strong>
            <span>AI ERP</span>
          </div>
        </Link>

        {/* NAVIGATION */}
        <nav className="nav-links">

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/features"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Features
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            About
          </NavLink>

          <NavLink
            to="/pricing"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Pricing
          </NavLink>

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Dashboard
          </NavLink>

        </nav>

        {/* ACTIONS */}
        <div className="navbar-actions">

          <Link to="/login" className="login-link">
            Login
          </Link>

          <Link to="/login" className="get-started-btn">
            Get Started
            <span>→</span>
          </Link>

        </div>

      </div>
    </header>
  );
}

export default Navbar;