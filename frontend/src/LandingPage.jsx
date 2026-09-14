
import { useState } from "react";
import {
  ArrowRight,
  Play,
  Users,
  BookOpen,
  CalendarCheck,
  Megaphone,
  FileText,
  CreditCard,
  BrainCircuit,
  FileCheck,
  BriefcaseBusiness,
  ClipboardCheck,
  Menu,
  X,
  CheckCircle2,
  Sparkles,
  GraduationCap,
  BarChart3,
  Bell,
  Settings,
  Award,
  Search,
} from "lucide-react";

import "./LandingPage.css";

function LandingPage() {
  const [mobileMenu, setMobileMenu] = useState(false);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });

    setMobileMenu(false);
  };

  const managementFeatures = [
    {
      icon: Users,
      title: "Student & Faculty Management",
      description:
        "Manage student profiles, faculty, departments, roles and academic information.",
      color: "blue",
    },
    {
      icon: BookOpen,
      title: "Academic Management",
      description:
        "Courses, syllabus, notes, assignments, classes and timetables in one place.",
      color: "green",
    },
    {
      icon: CalendarCheck,
      title: "Attendance & Leave",
      description:
        "QR-based attendance, leave requests, approvals and attendance tracking.",
      color: "purple",
    },
    {
      icon: Megaphone,
      title: "Notices, Events & Meetings",
      description:
        "Publish targeted notices, manage events and organize online meetings.",
      color: "orange",
    },
    {
      icon: FileText,
      title: "Examinations & Assessment",
      description:
        "Question banks, assessments, results, grading and examination management.",
      color: "pink",
    },
    {
      icon: CreditCard,
      title: "Fees & Payments",
      description:
        "Manage online payments, receipts, fee tracking and payment history.",
      color: "cyan",
    },
  ];

  const careerFeatures = [
    {
      icon: BrainCircuit,
      title: "AI Performance Engine",
      description:
        "Track student progress and identify weak areas with intelligent AI insights.",
    },
    {
      icon: FileCheck,
      title: "Resume & ATS Optimization",
      description:
        "Create ATS-friendly resumes and improve them using AI-powered suggestions.",
    },
    {
      icon: BriefcaseBusiness,
      title: "Job Matching",
      description:
        "Discover relevant career opportunities based on skills and student profiles.",
    },
    {
      icon: ClipboardCheck,
      title: "Assessments & Interview Prep",
      description:
        "Practice quizzes, assessments and interview questions to build confidence.",
    },
  ];

  return (
    <div className="edunexus-page">

      {/* ================= NAVBAR ================= */}

      <header className="navbar">
        <div className="nav-container">

          <div
            className="brand"
            onClick={() => scrollToSection("home")}
          >
            <div className="brand-icon">
              <GraduationCap size={27} />
            </div>

            <div>
              <h2>EduNexus AI</h2>
              <span>Learn • Grow • Build Your Future</span>
            </div>
          </div>

          <nav className={`nav-links ${mobileMenu ? "mobile-open" : ""}`}>

            <button
              className="nav-link active"
              onClick={() => scrollToSection("home")}
            >
              Home
            </button>

            <button
              className="nav-link"
              onClick={() => scrollToSection("features")}
            >
              Features
            </button>

            <button
              className="nav-link"
              onClick={() => scrollToSection("students")}
            >
              For Students
            </button>

            <button
              className="nav-link"
              onClick={() => scrollToSection("colleges")}
            >
              For Colleges
            </button>

            <button
              className="nav-link"
              onClick={() => scrollToSection("pricing")}
            >
              Pricing
            </button>

            <button
              className="nav-link"
              onClick={() => scrollToSection("about")}
            >
              About
            </button>

            <button
              className="mobile-get-started"
              onClick={() => scrollToSection("get-started")}
            >
              Get Started
            </button>

          </nav>

          <div className="nav-actions">

            <button
              className="login-button"
              onClick={() => scrollToSection("login")}
            >
              Login
            </button>

            <button
              className="primary-button small"
              onClick={() => scrollToSection("get-started")}
            >
              Get Started
            </button>

          </div>

          <button
            className="menu-button"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <X /> : <Menu />}
          </button>

        </div>
      </header>


      {/* ================= HERO ================= */}

      <section id="home" className="hero">

        <div className="hero-background-circle circle-one"></div>
        <div className="hero-background-circle circle-two"></div>

        <div className="hero-container">

          <div className="hero-content">

            <div className="hero-badge">
              <Sparkles size={16} />
              AI-Powered College ERP + Student Career Intelligence Platform
            </div>

            <h1>
              Your College Life,
              <span> Smarter with AI</span>
            </h1>

            <p className="hero-description">
              EduNexus AI brings together academic management,
              student and faculty operations, learning and career growth
              into one powerful platform.
            </p>

            <div className="hero-buttons">

              <button
                className="primary-button"
                onClick={() => scrollToSection("get-started")}
              >
                Get Started Free
                <ArrowRight size={19} />
              </button>

              <button
                className="secondary-button"
                onClick={() => scrollToSection("features")}
              >
                <Play size={18} />
                Watch Demo
              </button>

            </div>

            <div className="trust-points">

              <div>
                <CheckCircle2 />
                Secure & Scalable
              </div>

              <div>
                <CheckCircle2 />
                Role-Based Access
              </div>

              <div>
                <CheckCircle2 />
                Modern & Easy to Use
              </div>

            </div>

          </div>


          {/* DASHBOARD PREVIEW */}

          <div className="dashboard-wrapper">

            <div className="dashboard">

              <aside className="dashboard-sidebar">

                <div className="dashboard-brand">
                  <GraduationCap size={20} />
                  EduNexus AI
                </div>

                <div className="sidebar-item active">
                  <BarChart3 size={17} />
                  Dashboard
                </div>

                <div className="sidebar-item">
                  <BookOpen size={17} />
                  Academics
                </div>

                <div className="sidebar-item">
                  <CalendarCheck size={17} />
                  Attendance
                </div>

                <div className="sidebar-item">
                  <FileText size={17} />
                  Examinations
                </div>

                <div className="sidebar-item">
                  <CreditCard size={17} />
                  Fees
                </div>

                <div className="sidebar-item">
                  <Bell size={17} />
                  Notices
                </div>

                <div className="sidebar-item">
                  <BrainCircuit size={17} />
                  AI Assistant
                </div>

                <div className="sidebar-item">
                  <BriefcaseBusiness size={17} />
                  Career & Jobs
                </div>

                <div className="sidebar-item">
                  <Settings size={17} />
                  Settings
                </div>

              </aside>


              <main className="dashboard-main">

                <div className="dashboard-topbar">

                  <div className="dashboard-search">
                    <Search size={15} />
                    Search anything...
                  </div>

                  <div className="profile-circle">
                    S
                  </div>

                </div>

                <div className="dashboard-heading">
                  <h3>Good Morning, Sakshi 👋</h3>
                  <p>Keep learning, keep growing!</p>
                </div>


                <div className="stats-grid">

                  <div className="stat-card">
                    <span>Attendance</span>
                    <strong>92%</strong>
                  </div>

                  <div className="stat-card">
                    <span>Upcoming Exams</span>
                    <strong>3</strong>
                  </div>

                  <div className="stat-card">
                    <span>Pending Fees</span>
                    <strong>₹12,500</strong>
                  </div>

                  <div className="stat-card">
                    <span>Job Matches</span>
                    <strong>5</strong>
                  </div>

                </div>


                <div className="ai-banner">

                  <div>
                    <small>AI CAREER ASSISTANT</small>

                    <h3>
                      Your AI Career Assistant
                    </h3>

                    <p>
                      Personalized insights, resume tips,
                      job matches and interview preparation.
                    </p>

                    <button>
                      Chat with AI <ArrowRight size={15} />
                    </button>
                  </div>

                  <div className="ai-robot">
                    🤖
                  </div>

                </div>


                <div className="quick-actions">

                  <h4>Quick Actions</h4>

                  <div className="quick-grid">

                    <div>
                      <CalendarCheck />
                      View Attendance
                    </div>

                    <div>
                      <BookOpen />
                      Access Notes
                    </div>

                    <div>
                      <ClipboardCheck />
                      Take Quiz
                    </div>

                    <div>
                      <CheckCircle2 />
                      Apply for Leave
                    </div>

                  </div>

                </div>

              </main>

            </div>

          </div>

        </div>
      </section>


      {/* ================= MANAGEMENT ================= */}

      <section
        id="features"
        className="management-section"
      >

        <div className="section-container">

          <div className="section-heading">

            <h2>
              Complete College Management
            </h2>

            <p>
              From administration to academics,
              everything you need to manage your college efficiently.
            </p>

          </div>


          <div className="management-grid">

            {managementFeatures.map((feature, index) => {

              const Icon = feature.icon;

              return (
                <div
                  className="management-card"
                  key={index}
                >

                  <div className={`feature-icon ${feature.color}`}>
                    <Icon size={25} />
                  </div>

                  <h3>
                    {feature.title}
                  </h3>

                  <p>
                    {feature.description}
                  </p>

                </div>
              );
            })}

          </div>

        </div>

      </section>


      {/* ================= AI CAREER ================= */}

      <section
        id="students"
        className="career-section"
      >

        <div className="career-container">

          <div className="career-introduction">

            <span className="career-badge">
              AI & Career Intelligence
            </span>

            <h2>
              Build Skills.
              <br />
              <span>Get Hired.</span>
            </h2>

            <p>
              Get AI-powered insights, optimize your resume,
              practice assessments and discover the right career
              opportunities—all in one place.
            </p>

            <button
              className="career-button"
              onClick={() => scrollToSection("get-started")}
            >
              Explore Career Tools
              <ArrowRight size={18} />
            </button>

          </div>


          <div className="career-grid">

            {careerFeatures.map((feature, index) => {

              const Icon = feature.icon;

              return (
                <div
                  className="career-card"
                  key={index}
                >

                  <div className="career-icon">
                    <Icon size={23} />
                  </div>

                  <h3>
                    {feature.title}
                  </h3>

                  <p>
                    {feature.description}
                  </p>

                </div>

              );

            })}

          </div>

        </div>

      </section>


      {/* ================= COLLEGES ================= */}

      <section
        id="colleges"
        className="college-section"
      >

        <div className="college-container">

          <div>
            <span className="small-label">
              FOR COLLEGES & ADMINISTRATORS
            </span>

            <h2>
              One Platform.
              <br />
              Complete Control.
            </h2>

            <p>
              Manage your institution's students, faculty,
              academics, attendance, examinations, fees and
              communication from a single intelligent platform.
            </p>

            <button
              className="primary-button"
              onClick={() => scrollToSection("get-started")}
            >
              Request College Demo
              <ArrowRight size={18} />
            </button>
          </div>


          <div className="college-stats">

            <div className="college-stat">
              <Users />
              <strong>10K+</strong>
              <span>Students Ready</span>
            </div>

            <div className="college-stat">
              <GraduationCap />
              <strong>500+</strong>
              <span>Faculty Accounts</span>
            </div>

            <div className="college-stat">
              <Award />
              <strong>25+</strong>
              <span>Management Modules</span>
            </div>

            <div className="college-stat">
              <BrainCircuit />
              <strong>AI</strong>
              <span>Powered Intelligence</span>
            </div>

          </div>

        </div>

      </section>


      {/* ================= PRICING ================= */}

      <section
        id="pricing"
        className="pricing-section"
      >

        <div className="section-heading">

          <span className="small-label">
            SIMPLE & TRANSPARENT
          </span>

          <h2>
            Plans That Grow With You
          </h2>

          <p>
            Start free and upgrade whenever your institution needs more.
          </p>

        </div>


        <div className="pricing-grid">

          <div className="pricing-card">

            <h3>Starter</h3>

            <p>For small institutions and student teams.</p>

            <div className="price">
              ₹0
              <span>/month</span>
            </div>

            <button
              className="secondary-button full"
              onClick={() => scrollToSection("get-started")}
            >
              Get Started
            </button>

            <ul>
              <li>✓ Student Management</li>
              <li>✓ Academic Management</li>
              <li>✓ Attendance</li>
              <li>✓ Basic AI Tools</li>
            </ul>

          </div>


          <div className="pricing-card popular">

            <div className="popular-tag">
              MOST POPULAR
            </div>

            <h3>Professional</h3>

            <p>For growing colleges and institutions.</p>

            <div className="price">
              ₹4,999
              <span>/month</span>
            </div>

            <button
              className="primary-button full"
              onClick={() => scrollToSection("get-started")}
            >
              Start Free Trial
            </button>

            <ul>
              <li>✓ Everything in Starter</li>
              <li>✓ AI Career Intelligence</li>
              <li>✓ Examinations</li>
              <li>✓ Fees & Payments</li>
              <li>✓ Advanced Analytics</li>
            </ul>

          </div>


          <div className="pricing-card">

            <h3>Enterprise</h3>

            <p>For universities and large institutions.</p>

            <div className="price">
              Custom
            </div>

            <button
              className="secondary-button full"
              onClick={() => scrollToSection("get-started")}
            >
              Contact Sales
            </button>

            <ul>
              <li>✓ Complete ERP</li>
              <li>✓ Advanced AI</li>
              <li>✓ Custom Integrations</li>
              <li>✓ Dedicated Support</li>
            </ul>

          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}

      <section
        id="get-started"
        className="cta-section"
      >

        <div className="cta-content">

          <Sparkles size={32} />

          <h2>
            Ready to Build a Smarter Campus?
          </h2>

          <p>
            Bring academics, administration and AI-powered
            career intelligence together with EduNexus AI.
          </p>

          <button
            className="cta-button"
            onClick={() => scrollToSection("login")}
          >
            Get Started Free
            <ArrowRight size={19} />
          </button>

        </div>

      </section>


      {/* ================= ABOUT ================= */}

      <section
        id="about"
        className="about-section"
      >

        <div className="about-container">

          <div>
            <span className="small-label">
              ABOUT EDUNEXUS AI
            </span>

            <h2>
              Empowering Students.
              <br />
              Supporting Institutions.
            </h2>
          </div>

          <p>
            EduNexus AI is designed to connect the complete
            college ecosystem—from students and faculty to
            administrators and career opportunities.
            Our goal is to make education management
            intelligent, connected and future-ready.
          </p>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer className="footer">

        <div className="footer-container">

          <div className="footer-brand">

            <div className="brand">

              <div className="brand-icon">
                <GraduationCap size={25} />
              </div>

              <div>
                <h2>EduNexus AI</h2>
                <span>Learn • Grow • Build Your Future</span>
              </div>

            </div>

            <p>
              AI-powered college management and
              student career intelligence platform.
            </p>

          </div>


          <div className="footer-column">

            <h4>Platform</h4>

            <button onClick={() => scrollToSection("features")}>
              Features
            </button>

            <button onClick={() => scrollToSection("students")}>
              For Students
            </button>

            <button onClick={() => scrollToSection("colleges")}>
              For Colleges
            </button>

          </div>


          <div className="footer-column">

            <h4>Company</h4>

            <button onClick={() => scrollToSection("about")}>
              About
            </button>

            <button onClick={() => scrollToSection("pricing")}>
              Pricing
            </button>

            <button>
              Contact
            </button>

          </div>


          <div className="footer-column">

            <h4>Get Started</h4>

            <button onClick={() => scrollToSection("get-started")}>
              Start Free
            </button>

            <button onClick={() => scrollToSection("login")}>
              Login
            </button>

          </div>

        </div>


        <div className="footer-bottom">
          © 2026 EduNexus AI. All rights reserved.
        </div>

      </footer>

    </div>
  );
}

export default LandingPage;