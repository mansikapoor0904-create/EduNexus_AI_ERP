import { Link } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import "./LandingPage.css";

const features = [
  {
    number: "01",
    icon: "👨‍🎓",
    title: "Student Management",
    text: "Centralize admissions, profiles, attendance, academic records and student performance.",
  },
  {
    number: "02",
    icon: "📚",
    title: "Academic Operations",
    text: "Manage departments, courses, subjects, semesters, schedules and academic workflows.",
  },
  {
    number: "03",
    icon: "✦",
    title: "AI-Powered Intelligence",
    text: "Turn institutional data into intelligent insights, predictions and better decisions.",
    featured: true,
  },
];

const solutions = [
  "Student Information System",
  "Faculty & Staff Management",
  "Attendance Management",
  "Examination & Results",
  "Fee & Finance Management",
  "Timetable & Scheduling",
  "Library Management",
  "Communication",
  "AI Analytics & Insights",
];

function LandingPage() {
  return (
    <div className="landing-page">
      <Navbar />

      <main>
        <section className="landing-hero">
          <div className="hero-content">
            <span className="hero-label">NEXT-GENERATION EDUCATION ERP</span>

            <h1>
              One intelligent platform
              <span> for smarter education.</span>
            </h1>

            <p>
              EduNexus AI ERP brings students, faculty, administrators and
              institutional operations together in one connected platform.
            </p>

            <div className="hero-actions">
              <Link to="/get-started" className="hero-primary">
                Get Started →
              </Link>

              <Link to="/dashboard" className="hero-secondary">
                Explore Dashboard
              </Link>
            </div>

            <div className="hero-trust">
              <span>✓ Student Management</span>
              <span>✓ AI Analytics</span>
              <span>✓ Secure ERP</span>
            </div>
          </div>

          <div className="hero-dashboard-preview">
            <div className="preview-top">
              <div>
                <small>EDUNEXUS AI ERP</small>
                <strong>Institution Overview</strong>
              </div>

              <span className="preview-dot">●</span>
            </div>

            <div className="preview-number">
              <span>Total Students</span>
              <strong>2,840</strong>
              <small>↑ 8.2% this semester</small>
            </div>

            <div className="preview-bars">
              <span style={{ height: "45%" }} />
              <span style={{ height: "65%" }} />
              <span style={{ height: "55%" }} />
              <span style={{ height: "78%" }} />
              <span style={{ height: "70%" }} />
              <span style={{ height: "90%" }} />
              <span style={{ height: "82%" }} />
            </div>

            <div className="preview-cards">
              <div>
                <small>Attendance</small>
                <strong>91.4%</strong>
              </div>

              <div>
                <small>Performance</small>
                <strong>+18%</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="intro-section">
          <div className="section-tag">WHY EDUNEXUS</div>

          <h2>
            Designed to simplify
            <br />
            <span>complex education operations.</span>
          </h2>

          <p>
            Traditional education management often means disconnected
            systems, spreadsheets and manual processes. EduNexus creates one
            intelligent ecosystem where everything works together.
          </p>
        </section>

        <section className="features-section">
          <div className="section-heading">
            <div>
              <span className="section-tag">CORE CAPABILITIES</span>

              <h2>Powerful tools. One platform.</h2>
            </div>

            <p>
              Everything required to operate a modern school, college or
              university.
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature) => (
              <article
                key={feature.number}
                className={`feature-card ${
                  feature.featured ? "feature-featured" : ""
                }`}
              >
                <div className="feature-number">{feature.number}</div>

                <div className="feature-icon">{feature.icon}</div>

                {feature.featured && (
                  <span className="featured-label">MOST POWERFUL</span>
                )}

                <h3>{feature.title}</h3>

                <p>{feature.text}</p>

                <Link to="/features">Learn more →</Link>
              </article>
            ))}
          </div>
        </section>

        <section className="erp-services">
          <div className="erp-services-content">
            <span className="section-tag">COMPLETE ERP ECOSYSTEM</span>

            <h2>
              Everything your
              <br />
              institution needs.
            </h2>

            <p>
              From admissions to graduation, EduNexus connects every major
              institutional workflow into a single source of truth.
            </p>

            <Link to="/dashboard" className="dark-button">
              Explore ERP Dashboard →
            </Link>
          </div>

          <div className="services-list">
            {solutions.map((solution, index) => (
              <div className="solution-item" key={solution}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{solution}</strong>
                <b>+</b>
              </div>
            ))}
          </div>
        </section>

        <section className="ai-section">
          <div className="ai-content">
            <span className="section-tag">INTELLIGENCE BUILT IN</span>

            <h2>
              Your data can do
              <br />
              <span>more than store information.</span>
            </h2>

            <p>
              EduNexus AI transforms institutional data into actionable
              insights. Identify patterns, understand performance and support
              better administrative decisions.
            </p>

            <div className="ai-points">
              <div>
                <span>✦</span>
                <p>Performance insights</p>
              </div>

              <div>
                <span>✦</span>
                <p>Predictive analytics</p>
              </div>

              <div>
                <span>✦</span>
                <p>Automated reporting</p>
              </div>
            </div>
          </div>

          <div className="ai-card">
            <div className="ai-card-header">
              <span>AI INSIGHT</span>
              <span>● LIVE</span>
            </div>

            <h3>Academic Performance</h3>

            <div className="ai-score">
              <strong>87.6%</strong>
              <span>↑ 12.4%</span>
            </div>

            <div className="ai-progress">
              <span />
            </div>

            <p>
              Overall student performance has improved compared with the
              previous academic period.
            </p>
          </div>
        </section>

        <section className="cta-section">
          <span className="section-tag">START YOUR DIGITAL TRANSFORMATION</span>

          <h2>
            Build a smarter
            <br />
            educational institution.
          </h2>

          <p>
            Bring your institution's people, processes and data together with
            EduNexus AI ERP.
          </p>

          <Link to="/get-started" className="cta-button">
            Get Started with EduNexus →
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default LandingPage;