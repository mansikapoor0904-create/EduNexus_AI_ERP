import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-brand">
          <div className="footer-logo">E</div>

          <div>
            <h3>EduNexus AI</h3>
            <p>
              AI-powered academic and career intelligence
              for modern colleges.
            </p>
          </div>
        </div>

        <div className="footer-column">
          <h4>Platform</h4>

          <Link to="/">Home</Link>
          <Link to="/features">Features</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/pricing">Pricing</Link>
        </div>

        <div className="footer-column">
          <h4>Company</h4>

          <Link to="/about">About</Link>
          <Link to="/login">Login</Link>
          <Link to="/login">Get Started</Link>
        </div>

        <div className="footer-column">
          <h4>For Colleges</h4>

          <span>Academic Management</span>
          <span>Student Management</span>
          <span>Faculty Management</span>
          <span>Career Intelligence</span>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © 2026 EduNexus AI. All rights reserved.
        </p>

        <p>
          AI-powered College ERP
        </p>
      </div>

    </footer>
  );
}

export default Footer;