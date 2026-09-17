import { useState } from "react";
import {
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import { loginUser } from "../../services/authService";

import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();

  // ================================
  // LOGIN STATE
  // ================================

  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  // ================================
  // LOGIN
  // ================================

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!email.trim()) {
      alert("Please enter your email or Institute ID.");
      return;
    }

    if (!password.trim()) {
      alert("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      const response = await loginUser({
        email: email.trim(),
        password,
        role,
        rememberMe,
      });

      if (!response?.success) {
        throw new Error(
          response?.message || "Login failed."
        );
      }

      const user = response.user;

      if (!user) {
        throw new Error(
          "Login succeeded, but user information was not returned."
        );
      }

      // =====================================
      // ROLE-BASED REDIRECTION
      // =====================================

      if (user.role === "student") {
        navigate("/student/dashboard", {
          replace: true,
        });

        return;
      }

      if (user.role === "faculty") {
        navigate("/faculty/dashboard", {
          replace: true,
        });

        return;
      }

      if (
        user.role === "manager" ||
        user.role === "admin"
      ) {
        navigate("/management/dashboard", {
          replace: true,
        });

        return;
      }

      throw new Error("Invalid account role.");
    } catch (error) {
      console.error("Login error:", error);

      alert(
        error?.response?.data?.message ||
        error?.message ||
        "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ================================
  // UI
  // ================================

  return (
    <main className="login-page">

      {/* =========================================
          BACKGROUND
      ========================================= */}

      <div className="login-background">
        <div className="background-grid"></div>

        <div className="background-orb orb-one"></div>
        <div className="background-orb orb-two"></div>
        <div className="background-orb orb-three"></div>
      </div>

      {/* =========================================
          BRAND
      ========================================= */}

      <div className="login-brand">

        <Link
          to="/"
          className="login-brand-link"
        >

          <div className="login-brand-logo">
            E
          </div>

          <div className="login-brand-name">
            <strong>EduNexus</strong>
            <span>AI ERP</span>
          </div>

        </Link>

      </div>

      {/* =========================================
          LOGIN CONTENT
      ========================================= */}

      <section className="login-container">

        {/* =====================================
            LEFT SIDE
        ===================================== */}

        <div className="login-showcase">

          <div className="showcase-badge">
            <ShieldCheck size={16} />

            <span>
              Secure Education Platform
            </span>
          </div>

          <h1>
            One intelligent
            <br />
            platform for
            <br />
            <span>modern education.</span>
          </h1>

          <p>
            EduNexus brings students, faculty and
            management together through one secure
            academic and administrative workspace.
          </p>

          {/* =====================================
              ERP VISUAL
          ===================================== */}

          <div className="erp-visual">

            <div className="visual-glow"></div>

            {/* MAIN CARD */}

            <div className="visual-card main-card">

              <div className="visual-card-header">

                <div>

                  <span className="visual-label">
                    OVERVIEW
                  </span>

                  <strong>
                    Academic Performance
                  </strong>

                </div>

                <div className="visual-status">

                  <span></span>

                  Live

                </div>

              </div>

              {/* STATS */}

              <div className="visual-stat-row">

                <div className="visual-stat">

                  <span>
                    Attendance
                  </span>

                  <strong>
                    92.4%
                  </strong>

                </div>

                <div className="visual-stat">

                  <span>
                    Performance
                  </span>

                  <strong>
                    87.8%
                  </strong>

                </div>

              </div>

              {/* CHART */}

              <div className="visual-chart">

                <div className="chart-line line-one"></div>

                <div className="chart-line line-two"></div>

                <div className="chart-line line-three"></div>

                <div className="chart-bars">

                  <span style={{ height: "38%" }}></span>

                  <span style={{ height: "55%" }}></span>

                  <span style={{ height: "46%" }}></span>

                  <span style={{ height: "70%" }}></span>

                  <span style={{ height: "61%" }}></span>

                  <span style={{ height: "84%" }}></span>

                  <span style={{ height: "76%" }}></span>

                </div>

              </div>

            </div>

            {/* FLOATING CARD 1 */}

            <div className="visual-card floating-card card-one">

              <div className="mini-icon">
                ✓
              </div>

              <div>

                <span>
                  Attendance
                </span>

                <strong>
                  92.4%
                </strong>

              </div>

            </div>

            {/* FLOATING CARD 2 */}

            <div className="visual-card floating-card card-two">

              <div className="mini-avatar">
                AI
              </div>

              <div>

                <span>
                  AI Insights
                </span>

                <strong>
                  12 new
                </strong>

              </div>

            </div>

          </div>

        </div>

        {/* =====================================
            RIGHT SIDE — LOGIN CARD
        ===================================== */}

        <div className="login-card">

          {/* HEADER */}

          <div className="login-card-header">

            <div className="mobile-brand-logo">
              E
            </div>

            <span className="login-eyebrow">
              EDUNEXUS AI ERP
            </span>

            <h2>
              Welcome back
            </h2>

            <p>
              Sign in to continue to your workspace.
            </p>

          </div>

          {/* =====================================
              ROLE SELECTION
          ===================================== */}

          <div className="role-section">

            <label className="field-label">
              I am signing in as
            </label>

            <div className="role-options">

              {/* STUDENT */}

              <button
                type="button"
                className={`role-option ${
                  role === "student"
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setRole("student")
                }
              >

                <span className="role-icon student-icon">
                  S
                </span>

                <span className="role-content">

                  <strong>
                    Student
                  </strong>

                  <small>
                    Academic workspace
                  </small>

                </span>

                <span className="role-radio">
                  <span></span>
                </span>

              </button>

              {/* FACULTY */}

              <button
                type="button"
                className={`role-option ${
                  role === "faculty"
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setRole("faculty")
                }
              >

                <span className="role-icon faculty-icon">
                  F
                </span>

                <span className="role-content">

                  <strong>
                    Faculty
                  </strong>

                  <small>
                    Teaching workspace
                  </small>

                </span>

                <span className="role-radio">
                  <span></span>
                </span>

              </button>

              {/* MANAGEMENT */}

              <button
                type="button"
                className={`role-option ${
                  role === "management"
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setRole("management")
                }
              >

                <span className="role-icon management-icon">
                  M
                </span>

                <span className="role-content">

                  <strong>
                    Management
                  </strong>

                  <small>
                    Administration workspace
                  </small>

                </span>

                <span className="role-radio">
                  <span></span>
                </span>

              </button>

            </div>

          </div>

          {/* =====================================
              LOGIN FORM
          ===================================== */}

          <form
            className="login-form"
            onSubmit={handleLogin}
          >

            {/* EMAIL / INSTITUTE ID */}

            <div className="form-group">

              <label htmlFor="email">
                Email or Institute ID
              </label>

              <input
                id="email"
                type="text"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder={
                  role === "student"
                    ? "Enter your email or enrollment ID"
                    : role === "faculty"
                    ? "Enter your email or employee ID"
                    : "Enter your institution email"
                }
                autoComplete="username"
                disabled={loading}
              />

            </div>

            {/* PASSWORD */}

            <div className="form-group">

              <div className="password-label-row">

                <label htmlFor="password">
                  Password
                </label>

                <Link to="/forgot-password">
                  Forgot password?
                </Link>

              </div>

              <div className="password-wrapper">

                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  disabled={loading}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(
                      (previous) => !previous
                    )
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  disabled={loading}
                >

                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}

                </button>

              </div>

            </div>

            {/* =====================================
                REMEMBER ME
            ===================================== */}

            <div className="login-options">

              <label className="remember-me">

                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) =>
                    setRememberMe(
                      event.target.checked
                    )
                  }
                  disabled={loading}
                />

                <span className="custom-checkbox"></span>

                <span>
                  Remember me
                </span>

              </label>

            </div>

            {/* =====================================
                LOGIN BUTTON
            ===================================== */}

            <button
              type="submit"
              className="login-submit"
              disabled={
                loading ||
                !email.trim() ||
                !password.trim()
              }
            >

              {loading ? (
                <>
                  <span className="button-spinner"></span>

                  Signing in...
                </>
              ) : (
                <>
                  Login

                  <ArrowRight size={18} />
                </>
              )}

            </button>

          </form>

          {/* =====================================
              ACCOUNT FOOTER
          ===================================== */}

          <div className="account-footer">

            {role === "student" && (
              <p>

                New student?

                <Link to="/signup/student">
                  Create an account
                </Link>

              </p>
            )}

            {role === "faculty" && (
              <p>

                Faculty accounts are created by

                <span className="account-info">
                  management
                </span>

              </p>
            )}

            {role === "management" && (
              <p>

                Management access is provisioned by

                <span className="account-info">
                  system administrators
                </span>

              </p>
            )}

          </div>

          {/* =====================================
              SECURITY FOOTER
          ===================================== */}

          <div className="security-note">

            <ShieldCheck size={15} />

            <span>
              Your account is protected by secure
              authentication.
            </span>

          </div>

        </div>

      </section>

      {/* =========================================
          BOTTOM
      ========================================= */}

      <div className="login-bottom">

        <span>
          © 2026 EduNexus AI ERP
        </span>

        <span className="bottom-separator">
          •
        </span>

        <span>
          Intelligent Education Infrastructure
        </span>

      </div>

    </main>
  );
}

export default LoginPage;