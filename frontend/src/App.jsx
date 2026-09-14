import { useState } from "react";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("Home");

  const openPage = (page) => {
    setActivePage(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="app">

      {/* ================= NAVBAR ================= */}

      <header className="navbar">

        <button
          className="logo-section"
          onClick={() => openPage("Home")}
        >
          <div className="logo-mark">
            🎓
          </div>

          <div className="logo-text">
            <h2>EduNexus AI</h2>
            <p>Learn • Grow • Build Your Future</p>
          </div>
        </button>

        <nav className="nav-menu">

          <button
            className={activePage === "Home" ? "nav-link active" : "nav-link"}
            onClick={() => openPage("Home")}
          >
            Home
          </button>

          <button
            className={activePage === "Features" ? "nav-link active" : "nav-link"}
            onClick={() => openPage("Features")}
          >
            Features
          </button>

          <button
            className={activePage === "Students" ? "nav-link active" : "nav-link"}
            onClick={() => openPage("Students")}
          >
            For Students
          </button>

          <button
            className={activePage === "Colleges" ? "nav-link active" : "nav-link"}
            onClick={() => openPage("Colleges")}
          >
            For Colleges
          </button>

          <button
            className={activePage === "Pricing" ? "nav-link active" : "nav-link"}
            onClick={() => openPage("Pricing")}
          >
            Pricing
          </button>

          <button
            className={activePage === "About" ? "nav-link active" : "nav-link"}
            onClick={() => openPage("About")}
          >
            About
          </button>

        </nav>

        <div className="nav-actions">

          <button
            className="login-button"
            onClick={() => openPage("Login")}
          >
            Login
          </button>

          <button
            className="primary-button"
            onClick={() => openPage("GetStarted")}
          >
            Get Started
          </button>

        </div>

      </header>


      {/* ================= PAGES ================= */}

      {activePage === "Home" && (
        <HomePage openPage={openPage} />
      )}

      {activePage === "Features" && (
        <FeaturesPage openPage={openPage} />
      )}

      {activePage === "Students" && (
        <StudentsPage openPage={openPage} />
      )}

      {activePage === "Colleges" && (
        <CollegesPage openPage={openPage} />
      )}

      {activePage === "Pricing" && (
        <PricingPage openPage={openPage} />
      )}

      {activePage === "About" && (
        <AboutPage openPage={openPage} />
      )}

      {activePage === "Login" && (
        <LoginPage openPage={openPage} />
      )}

      {activePage === "GetStarted" && (
        <GetStartedPage openPage={openPage} />
      )}


      {/* ================= FOOTER ================= */}

      <footer className="footer">

        <div>
          <h3>🎓 EduNexus AI</h3>
          <p>
            Learn • Grow • Build Your Future
          </p>
        </div>

        <div className="footer-links">

          <button onClick={() => openPage("Home")}>
            Home
          </button>

          <button onClick={() => openPage("Features")}>
            Features
          </button>

          <button onClick={() => openPage("Students")}>
            Students
          </button>

          <button onClick={() => openPage("Colleges")}>
            Colleges
          </button>

          <button onClick={() => openPage("About")}>
            About
          </button>

        </div>

        <p>
          © 2026 EduNexus AI. All rights reserved.
        </p>

      </footer>

    </div>
  );
}


/* =====================================================
   HOME PAGE
===================================================== */

function HomePage({ openPage }) {

  return (
    <main>

      {/* ================= HERO ================= */}

      <section className="hero">

        <div className="hero-content">

          <div className="hero-badge">
            ✨ AI-Powered College ERP + Student Career Intelligence Platform
          </div>

          <h1>
            Your College Life,
            <br />
            <span>Smarter with AI</span>
          </h1>

          <p className="hero-description">
            EduNexus AI brings together academic management,
            student & faculty operations, learning, and career growth —
            all in one powerful platform.
            <br />
            Powered by AI, designed for your success.
          </p>

          <div className="hero-actions">

            <button
              className="hero-primary"
              onClick={() => openPage("GetStarted")}
            >
              Get Started Free
              <span>→</span>
            </button>

            <button
              className="hero-secondary"
              onClick={() => openPage("Features")}
            >
              <span>▶</span>
              Watch Demo
            </button>

          </div>

          <div className="trust-row">

            <span>
              ✓ Secure & Scalable
            </span>

            <span>
              ✓ Role-Based Access
            </span>

            <span>
              ✓ Modern & Easy to Use
            </span>

          </div>

        </div>


        {/* ================= DASHBOARD PREVIEW ================= */}

        <DashboardPreview />

      </section>


      {/* ================= MANAGEMENT ================= */}

      <section className="management-section">

        <div className="section-heading">

          <h2>
            Complete College Management
          </h2>

          <p>
            From administration to academics, everything you need
            to manage your college efficiently.
          </p>

        </div>

        <div className="management-grid">

          <FeatureCard
            icon="👥"
            title="Student & Faculty Management"
            text="Maintain profiles, departments, roles and more."
          />

          <FeatureCard
            icon="📖"
            title="Academic Management"
            text="Courses, syllabus, notes, assignments, classes & timetable."
          />

          <FeatureCard
            icon="📅"
            title="Attendance & Leave"
            text="QR-based attendance, leave requests & approvals."
          />

          <FeatureCard
            icon="📢"
            title="Notices, Events & Meetings"
            text="Targeted notices, event calendar and online meetings."
          />

          <FeatureCard
            icon="📝"
            title="Examinations & Assessment"
            text="Question bank, auto grading, results and assessments."
          />

          <FeatureCard
            icon="💳"
            title="Fees & Payments"
            text="Secure online payments, receipts and fee tracking."
          />

        </div>

      </section>


      {/* ================= AI CAREER ================= */}

      <section className="career-section">

        <div className="career-introduction">

          <span className="career-badge">
            AI & Career Intelligence
          </span>

          <h2>
            Build Skills.
            <br />
            Get Hired.
          </h2>

          <p>
            Get AI-powered insights, optimize your resume,
            practice quizzes, prepare for interviews and
            find the right job — all in one place.
          </p>

          <button
            className="career-button"
            onClick={() => openPage("Features")}
          >
            Explore Career Tools
            <span>→</span>
          </button>

        </div>


        <CareerCard
          icon="📈"
          title="AI Performance Engine"
          text="Track progress, find weak topics and get personalized recommendations."
        />

        <CareerCard
          icon="📄"
          title="Resume & ATS Optimization"
          text="Create ATS-friendly resumes and match with job descriptions."
        />

        <CareerCard
          icon="💼"
          title="Job Matching"
          text="Discover relevant jobs from trusted sources and apply easily."
        />

        <CareerCard
          icon="🎯"
          title="Assessments & Interview Prep"
          text="Practice quizzes, mock interviews and build your confidence."
        />

      </section>

    </main>
  );
}


/* =====================================================
   DASHBOARD PREVIEW
===================================================== */

function DashboardPreview() {

  return (
    <div className="dashboard-wrapper">

      <div className="dashboard-window">

        {/* SIDEBAR */}

        <aside className="dashboard-sidebar">

          <div className="dashboard-brand">
            🎓 EduNexus AI
          </div>

          <div className="sidebar-item active">
            🏠 Dashboard
          </div>

          <div className="sidebar-item">
            📚 Academics
          </div>

          <div className="sidebar-item">
            ✓ Attendance
          </div>

          <div className="sidebar-item">
            📝 Examinations
          </div>

          <div className="sidebar-item">
            💰 Fees
          </div>

          <div className="sidebar-item">
            📢 Notices & Events
          </div>

          <div className="sidebar-item">
            🤖 AI Assistant
          </div>

          <div className="sidebar-item">
            💼 Career & Jobs
          </div>

          <div className="sidebar-item">
            ⚙ Settings
          </div>

        </aside>


        {/* MAIN DASHBOARD */}

        <div className="dashboard-main">

          <div className="dashboard-header">

            <div>
              <h3>
                Good Morning, Students 👋
              </h3>

              <p>
                Keep learning, keep growing!
              </p>
            </div>

            <div className="dashboard-search">
              🔍 Search anything...
            </div>

          </div>


          <div className="dashboard-stats">

            <StatCard
              icon="🟢"
              title="Attendance"
              value="92%"
            />

            <StatCard
              icon="🟣"
              title="Upcoming Exams"
              value="3"
            />

            <StatCard
              icon="🟠"
              title="Pending Fees"
              value="₹12,500"
            />

            <StatCard
              icon="🔵"
              title="Job Matches"
              value="5"
            />

          </div>


          {/* AI CARD */}

          <div className="ai-dashboard-card">

            <div>

              <h2>
                Your AI Career Assistant
              </h2>

              <p>
                Get personalized insights, resume tips,
                job matches and interview preparation —
                all in one place.
              </p>

              <button>
                Chat with AI →
              </button>

            </div>

            <div className="robot">
              🤖
            </div>

          </div>


          <h3 className="quick-heading">
            Quick Actions
          </h3>

          <div className="quick-actions">

            <QuickAction
              icon="📊"
              text="View Attendance"
            />

            <QuickAction
              icon="📚"
              text="Access Notes"
            />

            <QuickAction
              icon="📝"
              text="Take Quiz"
            />

            <QuickAction
              icon="🛡️"
              text="Apply for Leave"
            />

          </div>

        </div>

      </div>

    </div>
  );
}


/* =====================================================
   COMPONENTS
===================================================== */

function StatCard({ icon, title, value }) {

  return (
    <div className="stat-card">

      <span className="stat-icon">
        {icon}
      </span>

      <p>{title}</p>

      <strong>{value}</strong>

    </div>
  );
}


function QuickAction({ icon, text }) {

  return (
    <div className="quick-action">

      <span>
        {icon}
      </span>

      <p>
        {text}
      </p>

    </div>
  );
}


function FeatureCard({ icon, title, text }) {

  return (
    <div className="feature-card">

      <div className="feature-icon">
        {icon}
      </div>

      <h3>
        {title}
      </h3>

      <p>
        {text}
      </p>

    </div>
  );
}


function CareerCard({ icon, title, text }) {

  return (
    <div className="career-card">

      <div className="career-icon">
        {icon}
      </div>

      <h3>
        {title}
      </h3>

      <p>
        {text}
      </p>

    </div>
  );
}


/* =====================================================
   OTHER PAGES
===================================================== */

function PageLayout({ title, subtitle, children }) {

  return (
    <main className="inner-page">

      <section className="page-hero">

        <span className="hero-badge">
          EduNexus AI
        </span>

        <h1>{title}</h1>

        <p>
          {subtitle}
        </p>

      </section>

      <section className="page-content">
        {children}
      </section>

    </main>
  );
}


function FeaturesPage({ openPage }) {

  return (
    <PageLayout
      title="Powerful Features"
      subtitle="Everything you need for smarter college management and career growth."
    >

      <div className="large-feature-grid">

        <FeatureCard
          icon="👥"
          title="Student Management"
          text="Manage student profiles, departments and academic information."
        />

        <FeatureCard
          icon="👨‍🏫"
          title="Faculty Management"
          text="Manage faculty profiles, departments and responsibilities."
        />

        <FeatureCard
          icon="📚"
          title="Academic Management"
          text="Manage courses, syllabus, assignments, notes and timetables."
        />

        <FeatureCard
          icon="📊"
          title="Attendance Management"
          text="Track attendance and manage attendance records efficiently."
        />

        <FeatureCard
          icon="📝"
          title="Examinations"
          text="Create assessments, question banks, results and grading workflows."
        />

        <FeatureCard
          icon="💳"
          title="Fees & Payments"
          text="Track fees, payments, receipts and pending balances."
        />

        <FeatureCard
          icon="🤖"
          title="AI Assistant"
          text="Provide intelligent academic and career assistance."
        />

        <FeatureCard
          icon="📄"
          title="Resume & ATS"
          text="Optimize resumes and improve compatibility with job descriptions."
        />

        <FeatureCard
          icon="💼"
          title="Job Matching"
          text="Help students discover relevant career opportunities."
        />

      </div>

      <button
        className="page-primary-button"
        onClick={() => openPage("GetStarted")}
      >
        Get Started →
      </button>

    </PageLayout>
  );
}


function StudentsPage({ openPage }) {

  return (
    <PageLayout
      title="For Students"
      subtitle="Everything students need to learn, grow and prepare for their careers."
    >

      <div className="large-feature-grid">

        <FeatureCard
          icon="📚"
          title="Academic Dashboard"
          text="View courses, assignments, notes, timetable and progress."
        />

        <FeatureCard
          icon="📊"
          title="Attendance"
          text="Monitor attendance and stay updated with academic participation."
        />

        <FeatureCard
          icon="📝"
          title="Exams & Results"
          text="View upcoming examinations, assessments and results."
        />

        <FeatureCard
          icon="💰"
          title="Fee Management"
          text="Check pending fees, payment history and receipts."
        />

        <FeatureCard
          icon="🤖"
          title="AI Career Assistant"
          text="Get personalized guidance for your career journey."
        />

        <FeatureCard
          icon="📄"
          title="Resume Builder"
          text="Build and optimize your professional resume."
        />

        <FeatureCard
          icon="💼"
          title="Job Opportunities"
          text="Find relevant jobs based on your skills and profile."
        />

        <FeatureCard
          icon="🎤"
          title="Interview Preparation"
          text="Practice interviews and improve your confidence."
        />

      </div>

      <button
        className="page-primary-button"
        onClick={() => openPage("GetStarted")}
      >
        Start Your Journey →
      </button>

    </PageLayout>
  );
}


function CollegesPage({ openPage }) {

  return (
    <PageLayout
      title="For Colleges"
      subtitle="A unified platform for administration, academics, faculty and student success."
    >

      <div className="large-feature-grid">

        <FeatureCard
          icon="🏫"
          title="College Administration"
          text="Manage students, faculty, departments and institutional operations."
        />

        <FeatureCard
          icon="📚"
          title="Academic Operations"
          text="Manage courses, classes, syllabus and academic schedules."
        />

        <FeatureCard
          icon="👨‍🏫"
          title="Faculty Management"
          text="Organize faculty profiles and academic responsibilities."
        />

        <FeatureCard
          icon="📊"
          title="Attendance"
          text="Track attendance records and manage leave workflows."
        />

        <FeatureCard
          icon="📝"
          title="Examinations"
          text="Manage examinations, assessments and results."
        />

        <FeatureCard
          icon="💰"
          title="Fees"
          text="Track payments, receipts and fee collection."
        />

      </div>

      <button
        className="page-primary-button"
        onClick={() => openPage("GetStarted")}
      >
        Get Started →
      </button>

    </PageLayout>
  );
}


function PricingPage() {

  return (
    <PageLayout
      title="Simple & Transparent Pricing"
      subtitle="Choose the plan that fits your institution and student community."
    >

      <div className="pricing-grid">

        <div className="pricing-card">

          <h2>Starter</h2>

          <div className="price">
            Free
          </div>

          <p>
            Perfect for exploring EduNexus AI.
          </p>

          <ul>
            <li>✓ Basic student management</li>
            <li>✓ Academic dashboard</li>
            <li>✓ Attendance</li>
            <li>✓ Basic AI tools</li>
          </ul>

          <button className="page-primary-button">
            Get Started
          </button>

        </div>


        <div className="pricing-card popular">

          <span className="popular-badge">
            MOST POPULAR
          </span>

          <h2>Professional</h2>

          <div className="price">
            ₹999
            <small>/month</small>
          </div>

          <p>
            For growing colleges and institutions.
          </p>

          <ul>
            <li>✓ Complete ERP</li>
            <li>✓ AI Assistant</li>
            <li>✓ Career Intelligence</li>
            <li>✓ Advanced Analytics</li>
          </ul>

          <button className="page-primary-button">
            Choose Professional
          </button>

        </div>


        <div className="pricing-card">

          <h2>Enterprise</h2>

          <div className="price">
            Custom
          </div>

          <p>
            Designed for large institutions.
          </p>

          <ul>
            <li>✓ Unlimited users</li>
            <li>✓ Custom integrations</li>
            <li>✓ Advanced security</li>
            <li>✓ Dedicated support</li>
          </ul>

          <button className="page-primary-button">
            Contact Us
          </button>

        </div>

      </div>

    </PageLayout>
  );
}


function AboutPage() {

  return (
    <PageLayout
      title="About EduNexus AI"
      subtitle="Technology designed to simplify education and empower student success."
    >

      <div className="about-card">

        <h2>
          One Platform. One Connected Campus.
        </h2>

        <p>
          EduNexus AI is designed to bring academic management,
          administration, student services and career intelligence
          together in one modern platform.
        </p>

        <p>
          Our goal is simple: reduce administrative complexity,
          improve student experiences and use artificial intelligence
          to help students prepare for the future.
        </p>

      </div>

    </PageLayout>
  );
}


function LoginPage({ openPage }) {

  return (
    <main className="auth-page">

      <div className="auth-card">

        <div className="auth-logo">
          🎓
        </div>

        <h1>
          Welcome Back
        </h1>

        <p>
          Login to your EduNexus AI account
        </p>

        <form>

          <label>
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your email"
          />

          <label>
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
          />

          <button
            type="submit"
            className="page-primary-button full"
          >
            Login
          </button>

        </form>

        <button
          className="back-button"
          onClick={() => openPage("Home")}
        >
          ← Back to Home
        </button>

      </div>

    </main>
  );
}


function GetStartedPage({ openPage }) {

  return (
    <main className="auth-page">

      <div className="get-started-card">

        <div className="auth-logo">
          🚀
        </div>

        <h1>
          Start Your EduNexus Journey
        </h1>

        <p>
          Choose how you want to use EduNexus AI.
        </p>

        <div className="role-grid">

          <button
            onClick={() => openPage("Login")}
          >
            <span>🎓</span>
            <strong>Student</strong>
            <small>
              Learn, track progress and build your career.
            </small>
          </button>

          <button
            onClick={() => openPage("Login")}
          >
            <span>👨‍🏫</span>
            <strong>Faculty</strong>
            <small>
              Manage classes, students and academics.
            </small>
          </button>

          <button
            onClick={() => openPage("Login")}
          >
            <span>🏢</span>
            <strong>College</strong>
            <small>
              Manage your complete institution.
            </small>
          </button>

        </div>

        <button
          className="back-button"
          onClick={() => openPage("Home")}
        >
          ← Back to Home
        </button>

      </div>

    </main>
  );
}

export default App;