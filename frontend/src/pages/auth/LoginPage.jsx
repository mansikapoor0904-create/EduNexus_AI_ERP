import { useState } from "react";

import {
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  Users,
  BrainCircuit,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { loginUser } from "../../services/authService";

import "./LoginPage.css";


function LoginPage() {

  const navigate = useNavigate();

  // ==========================================
  // STATE
  // ==========================================

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [rememberMe, setRememberMe] =
    useState(false);

  const [loading, setLoading] =
    useState(false);


  // ==========================================
  // LOGIN
  // ==========================================

  const handleLogin = async (event) => {

    event.preventDefault();

    if (!email.trim()) {

      alert(
        "Please enter your Email or Institute ID."
      );

      return;
    }

    if (!password.trim()) {

      alert(
        "Please enter your password."
      );

      return;
    }

    try {

      setLoading(true);

      /*
       * Backend identifies the account
       * and returns user.role.
       */

      const response =
        await loginUser({
          email: email.trim(),
          password,
          rememberMe,
        });


      if (!response?.success) {

        throw new Error(
          response?.message ||
          "Login failed."
        );
      }


      const user =
        response.user;


      if (!user) {

        throw new Error(
          "Login succeeded, but user information was not returned."
        );
      }


      // ======================================
      // ROLE BASED REDIRECTION
      // ======================================

      if (
        user.role === "student"
      ) {

        navigate(
          "/student/dashboard",
          {
            replace: true,
          }
        );

        return;
      }


      if (
        user.role === "faculty"
      ) {

        navigate(
          "/faculty/dashboard",
          {
            replace: true,
          }
        );

        return;
      }


      if (
        user.role === "manager" ||
        user.role === "management" ||
        user.role === "admin"
      ) {

        navigate(
          "/management/dashboard",
          {
            replace: true,
          }
        );

        return;
      }


      throw new Error(
        "Invalid account role."
      );


    } catch (error) {

      console.error(
        "Login error:",
        error
      );


      alert(
        error?.response?.data?.message ||
        error?.message ||
        "Unable to login. Please try again."
      );


    } finally {

      setLoading(false);

    }

  };


  // ==========================================
  // UI
  // ==========================================

  return (

    <main className="login-page">


      {/* =====================================
          SOFT BACKGROUND
          Decorative floating cards and
          center 3D orb have been removed.
      ====================================== */}

      <div className="login-background">

        <div className="background-grid" />

        <div className="background-orb orb-one" />

        <div className="background-orb orb-two" />

        <div className="background-orb orb-three" />

      </div>



      {/* =====================================
          BRAND
      ====================================== */}

      <div className="login-brand">

        <Link
          to="/"
          className="login-brand-link"
        >

          <div className="login-brand-logo">
            E
          </div>

          <div className="login-brand-name">

            <strong>
              EduNexus
            </strong>

            <span>
              AI ERP
            </span>

          </div>

        </Link>

      </div>



      {/* =====================================
          MAIN CONTENT
      ====================================== */}

      <section className="login-container">


        {/* ===================================
            LEFT CONTENT
        =================================== */}

        <div className="login-showcase">


          {/* SECURE BADGE */}

          <div className="showcase-badge">

            <ShieldCheck
              size={18}
            />

            <span>
              Secure Education Platform
            </span>

          </div>


          {/* MAIN HEADING */}

          <h1>

            One Intelligent
            <br />

            Platform
            <br />

            <span>
              for Your Institution.
            </span>

          </h1>


          {/* DESCRIPTION */}

          <p>

            Students, faculty and management
            access the same intelligent ERP
            through one secure account.

          </p>


          {/* =================================
              FEATURES
          ================================= */}

          <div className="login-features">


            {/* STUDENTS */}

            <div className="login-feature">

              <div className="feature-icon">

                <GraduationCap
                  size={21}
                />

              </div>

              <div>

                <strong>
                  Students
                </strong>

                <span>
                  Academic & career workspace
                </span>

              </div>

            </div>


            {/* FACULTY */}

            <div className="login-feature">

              <div className="feature-icon">

                <Users
                  size={21}
                />

              </div>

              <div>

                <strong>
                  Faculty
                </strong>

                <span>
                  Teaching & academic workspace
                </span>

              </div>

            </div>


            {/* MANAGEMENT */}

            <div className="login-feature">

              <div className="feature-icon">

                <BrainCircuit
                  size={21}
                />

              </div>

              <div>

                <strong>
                  Management
                </strong>

                <span>
                  Institution administration
                </span>

              </div>

            </div>


          </div>


        </div>



        {/* ===================================
            LOGIN CARD
        =================================== */}

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
              Welcome Back
            </h2>


            <p>
              Sign in to your account
            </p>

          </div>



          {/* =================================
              FORM
          ================================= */}

          <form
            className="login-form"
            onSubmit={handleLogin}
          >


            {/* EMAIL */}

            <div className="form-group">

              <label htmlFor="email">
                Email / Institute ID
              </label>


              <input
                id="email"
                type="text"
                value={email}
                onChange={(event) =>
                  setEmail(
                    event.target.value
                  )
                }
                placeholder="example@college.edu"
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


                <Link
                  to="/forgot-password"
                >
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
                    setPassword(
                      event.target.value
                    )
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
                      (previous) =>
                        !previous
                    )
                  }
                  disabled={loading}
                >

                  {showPassword ? (

                    <EyeOff size={18} />

                  ) : (

                    <Eye size={18} />

                  )}

                </button>

              </div>

            </div>



            {/* REMEMBER ME */}

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

                <span className="custom-checkbox" />

                <span>
                  Remember me
                </span>

              </label>

            </div>



            {/* LOGIN BUTTON */}

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

                  <span className="button-spinner" />

                  Signing in...

                </>

              ) : (

                <>

                  Login

                  <ArrowRight
                    size={18}
                  />

                </>

              )}

            </button>


          </form>



          {/* =================================
              ACCOUNT FOOTER
          ================================= */}

          <div className="account-footer">

            <p>
              Don't have access?
            </p>

            <span>
              Contact your institution
            </span>

          </div>



          {/* =================================
              SECURITY
          ================================= */}

          <div className="security-note">

            <ShieldCheck size={15} />

            <span>
              Your account is protected by
              secure authentication.
            </span>

          </div>


        </div>

      </section>


    </main>

  );

}


export default LoginPage;