import { Link } from "react-router-dom";
import "./DashboardPage.css";

const services = [
  {
    icon: "🎓",
    title: "Academic Management",
    description:
      "Courses, subjects, syllabus, timetable and academic planning.",
  },
  {
    icon: "👨‍🎓",
    title: "Student Management",
    description:
      "Student profiles, records, academic history and Student 360°.",
  },
  {
    icon: "👨‍🏫",
    title: "Faculty Management",
    description:
      "Faculty profiles, workload, subjects and teaching operations.",
  },
  {
    icon: "✓",
    title: "Attendance",
    description:
      "Track attendance, analyze patterns and identify attendance risks.",
  },
  {
    icon: "📝",
    title: "Examinations",
    description:
      "Manage exams, assessments, marks, results and academic reports.",
  },
  {
    icon: "₹",
    title: "Fees & Payments",
    description:
      "Manage fees, payment records, receipts and financial workflows.",
  },
  {
    icon: "📢",
    title: "Notices & Events",
    description:
      "Publish announcements, events, academic notices and updates.",
  },
  {
    icon: "🤖",
    title: "AI Assistant",
    description:
      "AI-powered assistance for learning, academic and career questions.",
  },
  {
    icon: "📄",
    title: "Resume Builder",
    description:
      "Create professional, ATS-friendly resumes using structured data.",
  },
  {
    icon: "🎯",
    title: "ATS & Career Intelligence",
    description:
      "Analyze resumes, job descriptions, skills and career readiness.",
  },
  {
    icon: "💼",
    title: "Job Intelligence",
    description:
      "Discover jobs, extract requirements and match students with opportunities.",
  },
  {
    icon: "🎤",
    title: "Interview & Assessment AI",
    description:
      "Practice technical assessments and AI-powered interview sessions.",
  },
];

function DashboardPage() {
  return (
    <main className="dashboard-page">

      <section className="dashboard-header">

        <div>
          <span>EDUNEXUS AI ERP</span>

          <h1>
            College Operations,
            <br />
            intelligently connected.
          </h1>

          <p>
            Access academic, administrative and
            career intelligence services from one platform.
          </p>
        </div>

        <div className="dashboard-status">
          <span>●</span>
          Platform Active
        </div>

      </section>


      {/* OVERVIEW */}

      <section className="dashboard-overview">

        <div className="overview-card">
          <span>STUDENTS</span>
          <strong>2,480</strong>
          <small>Active profiles</small>
        </div>

        <div className="overview-card">
          <span>FACULTY</span>
          <strong>148</strong>
          <small>Teaching staff</small>
        </div>

        <div className="overview-card">
          <span>COURSES</span>
          <strong>86</strong>
          <small>Active courses</small>
        </div>

        <div className="overview-card">
          <span>ATTENDANCE</span>
          <strong>91%</strong>
          <small>Average attendance</small>
        </div>

      </section>


      {/* SERVICES */}

      <section className="services-section">

        <div className="services-heading">

          <span>ERP SERVICES</span>

          <h2>
            Everything your institution needs.
          </h2>

          <p>
            These modules form the foundation of the
            EduNexus AI college operating system.
          </p>

        </div>


        <div className="services-grid">

          {services.map((service) => (
            <article
              className="service-card"
              key={service.title}
            >

              <div className="service-icon">
                {service.icon}
              </div>

              <h3>{service.title}</h3>

              <p>{service.description}</p>

              <button>
                Open Module →
              </button>

            </article>
          ))}

        </div>

      </section>


      {/* CAREER CTA */}

      <section className="career-dashboard-card">

        <div>

          <span>AI CAREER INTELLIGENCE</span>

          <h2>
            Turn academic data into career action.
          </h2>

          <p>
            Connect performance, skills, projects,
            resume data, assessments and job requirements
            to build a complete Student 360° profile.
          </p>

        </div>

        <Link to="/features">
          Explore Career AI →
        </Link>

      </section>

    </main>
  );
}

export default DashboardPage;