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

        <div
          className="logo-section"
          onClick={() => openPage("Home")}
        >
          <div className="logo-icon">🎓</div>

          <div>
            <h2>EduNexus AI</h2>
            <p>Learn • Grow • Build Your Future</p>
          </div>
        </div>

        <nav>

          <button
            className={activePage === "Home" ? "nav-link active" : "nav-link"}
            onClick={() => openPage("Home")}
          >
            Home
          </button>

          <button
            className={
              activePage === "Features"
                ? "nav-link active"
                : "nav-link"
            }
            onClick={() => openPage("Features")}
          >
            Features
          </button>

          <button
            className={
              activePage === "For Students"
                ? "nav-link active"
                : "nav-link"
            }
            onClick={() => openPage("For Students")}
          >
            For Students
          </button>

          <button
            className={
              activePage === "For Colleges"
                ? "nav-link active"
                : "nav-link"
            }
            onClick={() => openPage("For Colleges")}
          >
            For Colleges
          </button>

          <button
            className={
              activePage === "Pricing"
                ? "nav-link active"
                : "nav-link"
            }
            onClick={() => openPage("Pricing")}
          >
            Pricing
          </button>

          <button
            className={
              activePage === "About"
                ? "nav-link active"
                : "nav-link"
            }
            onClick={() => openPage("About")}
          >
            About
          </button>

        </nav>

        <div className="nav-buttons">

          <button
            className="login-btn"
            onClick={() => openPage("Login")}
          >
            Login
          </button>

          <button
            className="primary-btn"
            onClick={() => openPage("Role selection")}
          >
            Get Started
          </button>

        </div>

      </header>


      {/* ================= PAGE CONTENT ================= */}

      {activePage === "Home" && (
        <HomePage openPage={openPage} />
      )}

      {activePage === "Features" && (
        <FeaturesPage openPage={openPage} />
      )}

      {activePage === "For Students" && (
        <StudentsPage openPage={openPage} />
      )}

      {activePage === "For Colleges" && (
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

      {activePage === "Get Started" && (
        <GetStartedPage openPage={openPage} />
      )}

      {activePage === "RoleSelection" && (
  <section className="role-selection-page">
    <div className="role-selection-container">

      <h1>Select Your Role</h1>

      <p>
        Choose your role to continue to the appropriate login page.
      </p>

      <div className="role-cards">

        <div className="role-card">
          <div className="role-icon">🎓</div>

          <h2>Student</h2>

          <p>
            Access courses, attendance, assignments,
            results and learning resources.
          </p>

          <button
            className="primary-btn"
            onClick={() => openPage("StudentLogin")}
          >
            Student Login
          </button>
        </div>


        <div className="role-card">
          <div className="role-icon">👨‍🏫</div>

          <h2>Faculty</h2>

          <p>
            Manage classes, attendance, assignments,
            students and academic activities.
          </p>

          <button
            className="primary-btn"
            onClick={() => openPage("FacultyLogin")}
          >
            Faculty Login
          </button>
        </div>


        <div className="role-card">
          <div className="role-icon">👨‍💼</div>

          <h2>Manager</h2>

          <p>
            Manage faculty, students, reports,
            departments and ERP operations.
          </p>

          <button
            className="primary-btn"
            onClick={() => openPage("ManagerLogin")}
          >
            Manager Login
          </button>
        </div>

      </div>

      <button
        className="secondary-btn"
        onClick={() => openPage("Home")}
      >
        ← Back to Home
      </button>

    </div>
  </section>
)}

{activePage === "StudentLogin" && (
  <section className="login-page">

    <div className="login-container">

      <div className="login-icon">
        🎓
      </div>

      <h1>Student Login</h1>

      <p>Login to your EduNexus student account</p>

      <form>

        <label>Student ID / Email</label>

        <input
          type="text"
          placeholder="Enter Student ID or Email"
        />

        <label>Password</label>

        <input
          type="password"
          placeholder="Enter your password"
        />

        <div className="login-options">

          <label>
            <input type="checkbox" />
            Remember me
          </label>

          <button type="button" className="forgot-btn">
            Forgot Password?
          </button>

        </div>

        <button
          type="submit"
          className="primary-btn login-btn"
        >
          Login
        </button>

      </form>

      <button
        className="back-link"
        onClick={() => openPage("RoleSelection")}
      >
        ← Back to Role Selection
      </button>

    </div>

  </section>
)}

{activePage === "FacultyLogin" && (
  <section className="login-page">

    <div className="login-container">

      <div className="login-icon">
        👨‍🏫
      </div>

      <h1>Faculty Login</h1>

      <p>Login to your EduNexus faculty account</p>

      <form>

        <label>Faculty ID / Email</label>

        <input
          type="text"
          placeholder="Enter Faculty ID or Email"
        />

        <label>Password</label>

        <input
          type="password"
          placeholder="Enter your password"
        />

        <div className="login-options">

          <label>
            <input type="checkbox" />
            Remember me
          </label>

          <button type="button" className="forgot-btn">
            Forgot Password?
          </button>

        </div>

        <button
          type="submit"
          className="primary-btn login-btn"
        >
          Login
        </button>

      </form>

      <button
        className="back-link"
        onClick={() => openPage("RoleSelection")}
      >
        ← Back to Role Selection
      </button>

    </div>

  </section>
)}

{activePage === "ManagerLogin" && (
  <section className="login-page">

    <div className="login-container">

      <div className="login-icon">
        👨‍💼
      </div>

      <h1>Manager Login</h1>

      <p>Login to your EduNexus manager account</p>

      <form>

        <label>Manager ID / Email</label>

        <input
          type="text"
          placeholder="Enter Manager ID or Email"
        />

        <label>Password</label>

        <input
          type="password"
          placeholder="Enter your password"
        />

        <div className="login-options">

          <label>
            <input type="checkbox" />
            Remember me
          </label>

          <button type="button" className="forgot-btn">
            Forgot Password?
          </button>

        </div>

        <button
          type="submit"
          className="primary-btn login-btn"
        >
          Login
        </button>

      </form>

      <button
        className="back-link"
        onClick={() => openPage("RoleSelection")}
      >
        ← Back to Role Selection
      </button>

    </div>

  </section>
)} 


      {/* ================= FOOTER ================= */}

      <footer className="footer">

        <div>
          <strong>🎓 EduNexus AI</strong>
          <p>Learn • Grow • Build Your Future</p>
        </div>

        <div className="footer-links">

          <button onClick={() => openPage("Home")}>
            Home
          </button>

          <button onClick={() => openPage("Features")}>
            Features
          </button>

          <button onClick={() => openPage("For Students")}>
            Students
          </button>

          <button onClick={() => openPage("For Colleges")}>
            Colleges
          </button>

          <button onClick={() => openPage("About")}>
            About
          </button>

        </div>

        <p>© 2026 EduNexus AI. All rights reserved.</p>

      </footer>

    </div>
  );
}


/* =====================================================
   HOME PAGE
===================================================== */

function HomePage({ openPage }) {
  return (
    <>

      {/* HERO */}

      <section className="hero">

        <div className="hero-content">

          <div className="badge">
            ✨ AI-Powered College ERP + Student Career Intelligence Platform
          </div>

          <h1>
            Your College Life,
            <br />
            <span>Smarter with AI</span>
          </h1>

          <p className="hero-text">
            EduNexus AI brings together academic management,
            student & faculty operations, learning, and career
            growth — all in one powerful platform.
            <br />
            Powered by AI, designed for your success.
          </p>

          <div className="hero-buttons">

            <button
              className="primary-btn large"
              onClick={() => openPage("RoleSelection")}
            >
              Get Started Free →
            </button>

            <button
              className="demo-btn"
              onClick={() => openPage("Features")}
            >
              ▶ Explore Features
            </button>

          </div>

          <div className="trust-items">

            <span>✓ Secure & Scalable</span>

            <span>✓ Role-Based Access</span>

            <span>✓ Modern & Easy to Use</span>

          </div>

        </div>


        {/* DASHBOARD PREVIEW */}

        <div className="dashboard-preview">

          <div className="dashboard-sidebar">

            <h3>🎓 EduNexus AI</h3>

            <div className="side-active">
              ⌂ Dashboard
            </div>

            <div>▣ Academics</div>
            <div>◉ Attendance</div>
            <div>▤ Examinations</div>
            <div>₹ Fees</div>
            <div>📢 Notices & Events</div>
            <div>✦ AI Assistant</div>
            <div>💼 Career & Jobs</div>
            <div>⚙ Settings</div>

          </div>


          <div className="dashboard-main">

            <div className="dashboard-top">

              <div>
                <h3>Good Morning, Student 👋</h3>
                <p>Keep learning, keep growing!</p>
              </div>

              <div className="search-box">
                🔍 Search anything...
              </div>

            </div>


            <div className="stats">

              <div className="stat-card">
                <span>🟢</span>
                <p>Attendance</p>
                <h2>92%</h2>
              </div>

              <div className="stat-card">
                <span>🟣</span>
                <p>Upcoming Exams</p>
                <h2>3</h2>
              </div>

              <div className="stat-card">
                <span>🟠</span>
                <p>Pending Fees</p>
                <h2>₹12,500</h2>
              </div>

              <div className="stat-card">
                <span>🔵</span>
                <p>Job Matches</p>
                <h2>5</h2>
              </div>

            </div>


            <div className="ai-card">

              <div>

                <h2>
                  Your AI Career Assistant
                </h2>

                <p>
                  Get personalized insights, resume tips,
                  job matches and interview preparation —
                  all in one place.
                </p>

                <button
                  onClick={() => openPage("Features")}
                >
                  Explore AI Tools →
                </button>

              </div>

              <div className="robot">
                🤖
              </div>

            </div>


            <h3 className="quick-title">
              Quick Actions
            </h3>

            <div className="quick-actions">

              <div>
                📊
                <p>View Attendance</p>
              </div>

              <div>
                📚
                <p>Access Notes</p>
              </div>

              <div>
                📝
                <p>Take Quiz</p>
              </div>

              <div>
                🛡️
                <p>Apply for Leave</p>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* MANAGEMENT */}

      <section className="management">

        <h2>
          Complete College Management
        </h2>

        <p>
          From administration to academics, everything you
          need to manage your college efficiently.
        </p>


        <div className="management-grid">

          <Feature
            icon="👥"
            title="Student & Faculty Management"
            text="Maintain profiles, departments, roles and more."
          />

          <Feature
            icon="📖"
            title="Academic Management"
            text="Courses, syllabus, notes, assignments, classes and timetable."
          />

          <Feature
            icon="📅"
            title="Attendance & Leave"
            text="QR-based attendance, leave requests and approvals."
          />

          <Feature
            icon="📢"
            title="Notices & Events"
            text="Targeted notices, events calendar and meetings."
          />

          <Feature
            icon="📄"
            title="Examinations"
            text="Question bank, auto grading, results and assessments."
          />

          <Feature
            icon="💳"
            title="Fees & Payments"
            text="Secure payments, receipts and fee tracking."
          />

        </div>

      </section>


      {/* CAREER */}

      <section className="career">

        <div className="career-intro">

          <div className="career-badge">
            AI & Career Intelligence
          </div>

          <h2>
            Build Skills. Get Hired.
          </h2>

          <p>
            Get AI-powered insights, optimize your resume,
            practice quizzes, prepare for interviews and
            find the right job.
          </p>

          <button
            className="career-button"
            onClick={() => openPage("Features")}
          >
            Explore Career Tools →
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
          text="Discover relevant jobs and apply easily."
        />

        <CareerCard
          icon="👥"
          title="Interview Preparation"
          text="Practice quizzes, mock interviews and build confidence."
        />

      </section>

    </>
  );
}


/* =====================================================
   FEATURES PAGE
===================================================== */

function FeaturesPage({ openPage }) {
  return (
    <PageContainer
      title="Powerful Features"
      subtitle="Everything you need for smarter college management and career growth."
    >

      <div className="page-grid">

        <Feature
          icon="👥"
          title="Student Management"
          text="Manage student profiles, departments, courses and academic information."
        />

        <Feature
          icon="👨‍🏫"
          title="Faculty Management"
          text="Manage faculty profiles, roles, departments and responsibilities."
        />

        <Feature
          icon="📚"
          title="Academic Management"
          text="Manage courses, syllabus, assignments, notes, classes and timetables."
        />

        <Feature
          icon="📊"
          title="Attendance Management"
          text="Track attendance and manage attendance records efficiently."
        />

        <Feature
          icon="📝"
          title="Examinations"
          text="Create assessments, question banks, results and grading workflows."
        />

        <Feature
          icon="💳"
          title="Fees & Payments"
          text="Track fees, payments, receipts and pending balances."
        />

        <Feature
          icon="🤖"
          title="AI Assistant"
          text="Provide intelligent academic and career assistance to students."
        />

        <Feature
          icon="📄"
          title="Resume & ATS"
          text="Optimize resumes and improve compatibility with job descriptions."
        />

        <Feature
          icon="💼"
          title="Job Matching"
          text="Help students discover relevant career opportunities."
        />

        <Feature
          icon="🎯"
          title="Interview Preparation"
          text="Practice interviews, quizzes and career preparation."
        />

      </div>

      <div className="center-button">

        <button
          className="primary-btn large"
          onClick={() => openPage("Get Started")}
        >
          Get Started →
        </button>

      </div>

    </PageContainer>
  );
}


/* =====================================================
   STUDENTS PAGE
===================================================== */

function StudentsPage({ openPage }) {
  return (
    <PageContainer
      title="For Students"
      subtitle="Everything students need to learn, grow and prepare for their careers."
    >

      <div className="student-highlight">

        <h2>
          Your Complete Student Companion
        </h2>

        <p>
          Manage your academics, attendance, exams, career
          preparation and job opportunities from one place.
        </p>

      </div>


      <div className="page-grid">

        <Feature
          icon="📚"
          title="Academic Dashboard"
          text="View courses, assignments, notes, timetable and academic progress."
        />

        <Feature
          icon="📊"
          title="Attendance"
          text="Monitor attendance and stay updated with your academic participation."
        />

        <Feature
          icon="📝"
          title="Exams & Results"
          text="View upcoming examinations, assessments and results."
        />

        <Feature
          icon="💰"
          title="Fee Management"
          text="Check pending fees, payment history and receipts."
        />

        <Feature
          icon="🤖"
          title="AI Career Assistant"
          text="Get personalized guidance for your career journey."
        />

        <Feature
          icon="📄"
          title="Resume Builder"
          text="Build and optimize your professional resume."
        />

        <Feature
          icon="💼"
          title="Job Opportunities"
          text="Find relevant jobs based on your skills and profile."
        />

        <Feature
          icon="🎤"
          title="Interview Preparation"
          text="Practice interviews and improve your confidence."
        />

      </div>


      <div className="center-button">

        <button
          className="primary-btn large"
          onClick={() => openPage("Get Started")}
        >
          Start Your Journey →
        </button>

      </div>

    </PageContainer>
  );
}


/* =====================================================
   COLLEGES PAGE
===================================================== */

function CollegesPage({ openPage }) {
  return (
    <PageContainer
      title="For Colleges"
      subtitle="A unified platform for administration, academics, faculty and student success."
    >

      <div className="page-grid">

        <Feature
          icon="🏫"
          title="College Administration"
          text="Manage students, faculty, departments and institutional operations."
        />

        <Feature
          icon="📚"
          title="Academic Operations"
          text="Manage courses, classes, syllabus and academic schedules."
        />

        <Feature
          icon="👨‍🏫"
          title="Faculty Management"
          text="Organize faculty profiles, responsibilities and academic activities."
        />

        <Feature
          icon="📊"
          title="Attendance"
          text="Track attendance records and manage leave workflows."
        />

        <Feature
          icon="📝"
          title="Examinations"
          text="Manage question banks, assessments, grading and results."
        />

        <Feature
          icon="💳"
          title="Finance"
          text="Manage student fees, payments, receipts and financial tracking."
        />

        <Feature
          icon="📢"
          title="Notices & Events"
          text="Share notices, events and important college announcements."
        />

        <Feature
          icon="📈"
          title="Analytics"
          text="Get insights into student performance and institutional activities."
        />

      </div>


      <div className="center-button">

        <button
          className="primary-btn large"
          onClick={() => openPage("Get Started")}
        >
          Get Started →
        </button>

      </div>

    </PageContainer>
  );
}


/* =====================================================
   PRICING PAGE
===================================================== */

function PricingPage({ openPage }) {
  return (
    <PageContainer
      title="Simple & Flexible Pricing"
      subtitle="Choose a plan that fits your needs."
    >

      <div className="pricing-grid">

        <PricingCard
          title="Free"
          price="₹0"
          description="For students getting started"
          features={[
            "Basic student dashboard",
            "Academic tracking",
            "Attendance tracking",
            "Basic career tools"
          ]}
          button="Start Free"
          openPage={openPage}
        />

        <PricingCard
          title="Student Pro"
          price="₹199"
          description="For students who want more"
          features={[
            "AI career assistant",
            "Resume optimization",
            "Job matching",
            "Interview preparation",
            "Advanced analytics"
          ]}
          button="Choose Pro"
          openPage={openPage}
          featured
        />

        <PricingCard
          title="College"
          price="Custom"
          description="For educational institutions"
          features={[
            "Student management",
            "Faculty management",
            "Academic management",
            "Attendance",
            "Examinations",
            "Fees & payments"
          ]}
          button="Contact Us"
          openPage={openPage}
        />

      </div>

    </PageContainer>
  );
}


/* =====================================================
   ABOUT PAGE
===================================================== */

function AboutPage({ openPage }) {
  return (
    <PageContainer
      title="About EduNexus AI"
      subtitle="Empowering students and colleges through intelligent technology."
    >

      <div className="about-content">

        <h2>
          One Platform. Smarter Education.
        </h2>

        <p>
          EduNexus AI is designed to bring academic management,
          student services, faculty operations and career intelligence
          together in one modern platform.
        </p>

        <p>
          The platform aims to make college life easier for students
          while helping institutions manage their academic and
          administrative activities efficiently.
        </p>


        <div className="about-grid">

          <div>
            <h3>🎓 For Students</h3>
            <p>
              Learn, track progress, prepare for careers and discover
              opportunities.
            </p>
          </div>

          <div>
            <h3>🏫 For Colleges</h3>
            <p>
              Manage academic and administrative operations from one
              centralized system.
            </p>
          </div>

          <div>
            <h3>🤖 Powered by AI</h3>
            <p>
              Provide intelligent insights and personalized career
              assistance.
            </p>
          </div>

        </div>


        <div className="center-button">

          <button
            className="primary-btn large"
            onClick={() => openPage("Get Started")}
          >
            Get Started →
          </button>

        </div>

      </div>

    </PageContainer>
  );
}


/* =====================================================
   LOGIN PAGE
===================================================== */
function LoginPage({ openPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));

        setMessage("Login successful!");

        setTimeout(() => {
          openPage("Dashboard");
        }, 500);
      } else {
        setMessage(data.message || "Invalid email or password");
      }
    } catch (error) {
      console.error(error);

      setMessage(
        "Unable to connect to the backend. Make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer
      title="Welcome Back"
      subtitle="Login to your EduNexus AI account."
    >
      <div className="auth-box">
        <h2>Login</h2>

        <label>Email Address</label>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="button"
          className="primary-btn auth-button"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {message && (
          <p className="auth-message">
            {message}
          </p>
        )}

        <p className="auth-text">
          Don't have an account?
        </p>

        <button
          className="text-button"
          onClick={() => openPage("Get Started")}
        >
          Create an account
        </button>
      </div>
    </PageContainer>
  );
}

/* =====================================================
   GET STARTED PAGE
===================================================== */

function GetStartedPage({ openPage }) {
  return (
    <PageContainer
      title="Get Started with EduNexus AI"
      subtitle="Create your account and begin your smarter college journey."
    >

      <div className="auth-box">

        <h2>Create Account</h2>

        <label>Full Name</label>

        <input
          type="text"
          placeholder="Enter your full name"
        />

        <label>Email Address</label>

        <input
          type="email"
          placeholder="Enter your email"
        />

        <label>Password</label>

        <input
          type="password"
          placeholder="Create a password"
        />

        <label>Role</label>

        <select>

          <option>Student</option>
          <option>Faculty</option>
          <option>Admin</option>

        </select>

        <button
          className="primary-btn auth-button"
        >
          Create Account
        </button>

        <p className="auth-text">
          Already have an account?
        </p>

        <button
          className="text-button"
          onClick={() => openPage("Login")}
        >
          Login here
        </button>

      </div>

    </PageContainer>
  );
}


/* =====================================================
   REUSABLE COMPONENTS
===================================================== */

function PageContainer({ title, subtitle, children }) {
  return (
    <main className="inner-page">

      <div className="page-header">

        <div className="badge">
          EduNexus AI
        </div>

        <h1>{title}</h1>

        <p>{subtitle}</p>

      </div>

      {children}

    </main>
  );
}


function Feature({ icon, title, text }) {
  return (
    <div className="feature">

      <div className="feature-icon">
        {icon}
      </div>

      <h3>{title}</h3>

      <p>{text}</p>

    </div>
  );
}


function CareerCard({ icon, title, text }) {
  return (
    <div className="career-card">

      <div className="career-icon">
        {icon}
      </div>

      <h3>{title}</h3>

      <p>{text}</p>

    </div>
  );
}


function PricingCard({
  title,
  price,
  description,
  features,
  button,
  openPage,
  featured
}) {
  return (
    <div
      className={
        featured
          ? "pricing-card featured"
          : "pricing-card"
      }
    >

      {featured && (
        <div className="popular">
          MOST POPULAR
        </div>
      )}

      <h2>{title}</h2>

      <div className="price">
        {price}
        {price !== "Custom" && (
          <span>/month</span>
        )}
      </div>

      <p>{description}</p>

      <ul>

        {features.map((feature, index) => (
          <li key={index}>
            ✓ {feature}
          </li>
        ))}

      </ul>

      <button
        className="primary-btn pricing-button"
        onClick={() => openPage("Get Started")}
      >
        {button}
      </button>

    </div>
  );
}


export default App;
