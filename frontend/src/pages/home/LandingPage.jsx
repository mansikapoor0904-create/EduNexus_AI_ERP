import { Link } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  return (
    <main>

      {/* HERO */}

      <section className="hero-section">

        <div className="hero-container">

          <div className="hero-content">

            <div className="hero-badge">
              AI-POWERED COLLEGE ERP
            </div>

            <h1>
              One Intelligent Platform
              <br />
              <span>for the Entire College.</span>
            </h1>

            <p className="hero-description">
              EduNexus AI connects academic management,
              student operations, faculty workflows,
              administration and career intelligence
              in one modern platform.
            </p>

            <div className="hero-actions">

              <Link
                to="/login"
                className="hero-primary-btn"
              >
                Get Started Free →
              </Link>

              <Link
                to="/features"
                className="hero-secondary-btn"
              >
                Explore Features
              </Link>

            </div>

            <div className="hero-trust">

              <span>✓ Role-Based Access</span>
              <span>✓ Secure Architecture</span>
              <span>✓ AI-Powered Insights</span>

            </div>

          </div>

          {/* DASHBOARD PREVIEW */}

          <div className="hero-dashboard">

            <div className="preview-header">
              <div>
                <strong>EduNexus AI</strong>
                <span>College Management System</span>
              </div>

              <div className="preview-status">
                ● System Active
              </div>
            </div>

            <div className="preview-body">

              <aside className="preview-sidebar">

                <div className="preview-sidebar-item active">
                  Dashboard
                </div>

                <div className="preview-sidebar-item">
                  Academics
                </div>

                <div className="preview-sidebar-item">
                  Attendance
                </div>

                <div className="preview-sidebar-item">
                  Examinations
                </div>

                <div className="preview-sidebar-item">
                  Fees
                </div>

                <div className="preview-sidebar-item">
                  Career AI
                </div>

              </aside>

              <div className="preview-main">

                <h3>College Overview</h3>

                <div className="preview-cards">

                  <div>
                    <span>Students</span>
                    <strong>2,480</strong>
                  </div>

                  <div>
                    <span>Attendance</span>
                    <strong>91%</strong>
                  </div>

                  <div>
                    <span>Courses</span>
                    <strong>86</strong>
                  </div>

                </div>

                <div className="preview-chart">
                  <span>Academic Performance</span>

                  <div className="chart-bars">
                    <i style={{ height: "45%" }} />
                    <i style={{ height: "62%" }} />
                    <i style={{ height: "52%" }} />
                    <i style={{ height: "78%" }} />
                    <i style={{ height: "69%" }} />
                    <i style={{ height: "88%" }} />
                    <i style={{ height: "80%" }} />
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* TRUST SECTION */}

      <section className="trust-section">

        <p>
          BUILT FOR MODERN EDUCATIONAL INSTITUTIONS
        </p>

        <div className="trust-grid">

          <span>ACADEMICS</span>
          <span>STUDENT LIFE</span>
          <span>FACULTY</span>
          <span>ADMINISTRATION</span>
          <span>CAREER</span>

        </div>

      </section>


      {/* VALUE SECTION */}

      <section className="value-section">

        <div className="section-heading">

          <span>WHY EDUNEXUS</span>

          <h2>
            Everything your institution needs.
            <br />
            Connected intelligently.
          </h2>

          <p>
            Replace disconnected systems with a unified
            college operating platform designed for
            students, faculty and administrators.
          </p>

        </div>

        <div className="value-grid">

          <article>
            <div className="value-number">01</div>
            <h3>Unified ERP</h3>
            <p>
              Manage students, academics, attendance,
              examinations, fees and administration
              from one platform.
            </p>
          </article>

          <article className="featured-value-card">
            <div className="value-number">02</div>

            <h3>AI Intelligence</h3>

            <p>
              Turn academic and career data into
              meaningful insights, recommendations
              and personalized actions.
            </p>

            <Link to="/features">
              Explore AI Features →
            </Link>
          </article>

          <article>
            <div className="value-number">03</div>

            <h3>Student 360°</h3>

            <p>
              Connect academic performance, skills,
              projects, resumes, assessments and
              career goals.
            </p>
          </article>

        </div>

      </section>


      {/* CTA */}

      <section className="home-cta">

        <div>

          <span>READY TO GET STARTED?</span>

          <h2>
            Build a smarter campus
            with EduNexus AI.
          </h2>

          <p>
            Bring your academic, administrative and
            career workflows together.
          </p>

        </div>

        <Link to="/login">
          Start Your Journey →
        </Link>

      </section>

    </main>
  );
}

export default LandingPage;