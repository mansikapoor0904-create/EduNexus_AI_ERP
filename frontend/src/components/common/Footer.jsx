import { Link } from "react-router-dom";
import {
  ArrowRight,
  Mail,
} from "lucide-react";

import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      {/* =========================
          MAIN FOOTER
      ========================= */}

      <div className="footer-container">


        {/* =========================
            BRAND
        ========================= */}

        <div className="footer-brand">

          <div className="footer-brand-top">

            <div className="footer-logo">
              E
            </div>

            <div>
              <h3>
                EduNexus AI
              </h3>

              <span className="footer-tagline">
                AI-powered education intelligence
              </span>
            </div>

          </div>


          <p className="footer-description">
            A modern AI-powered ERP platform designed to
            connect academic, administrative and career
            workflows for educational institutions.
          </p>


          <Link
            to="/request-demo"
            className="footer-demo-btn"
          >
            Request a Demo

            <ArrowRight size={15} />

          </Link>

        </div>


        {/* =========================
            PRODUCT
        ========================= */}

        <div className="footer-column">

          <h4>
            Product
          </h4>

          <Link to="/">
            Home
          </Link>

          <Link to="/features">
            Features
          </Link>

          <Link to="/dashboard">
            Dashboard
          </Link>

          <Link to="/pricing">
            Pricing
          </Link>

          <Link to="/request-demo">
            Request a Demo
          </Link>

        </div>


        {/* =========================
            COMPANY
        ========================= */}

        <div className="footer-column">

          <h4>
            Company
          </h4>

          <Link to="/about">
            About EduNexus
          </Link>

          <Link to="/login">
            Login
          </Link>

          <Link to="/get-started">
            Get Started
          </Link>

          <Link to="/request-demo">
            Contact / Demo
          </Link>

        </div>


        {/* =========================
            FOR INSTITUTIONS
        ========================= */}

        <div className="footer-column">

          <h4>
            For Institutions
          </h4>

          <span>
            Student Management
          </span>

          <span>
            Faculty Management
          </span>

          <span>
            Academic Management
          </span>

          <span>
            Career Intelligence
          </span>

          <span>
            AI Analytics
          </span>

        </div>


        {/* =========================
            RESOURCES
        ========================= */}

        <div className="footer-column footer-resources">

          <h4>
            Resources
          </h4>

          <Link to="/request-demo">
            Request a Demo
          </Link>

          <span>
            Documentation
          </span>

          <span>
            Help Center
          </span>

          <span>
            Privacy Policy
          </span>

          <span>
            Terms of Service
          </span>

        </div>

      </div>


      {/* =========================
          FOOTER BOTTOM
      ========================= */}

      <div className="footer-bottom">

        <div className="footer-bottom-left">

          <p>
            © 2026 EduNexus AI. All rights reserved.
          </p>

        </div>


        <div className="footer-bottom-right">

          <span>
            AI-powered College ERP
          </span>

          <span className="footer-divider">
            |
          </span>

          <span className="footer-secure">
            <Mail size={13} />

            Built for modern institutions
          </span>

        </div>

      </div>

    </footer>
  );
}

export default Footer;