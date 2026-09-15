import { Link } from "react-router-dom";
import "./FeaturesPage.css";

const features = [
  {
    number: "01",
    title: "Academic Management",
    description:
      "Manage courses, subjects, syllabus, schedules, notes and academic workflows from one place.",
    items: [
      "Courses & Subjects",
      "Syllabus Management",
      "Notes & Learning",
      "Academic Calendar",
    ],
  },
  {
    number: "02",
    title: "Student & Faculty Operations",
    description:
      "Simplify attendance, leave, notices, examinations, results and day-to-day college operations.",
    items: [
      "Attendance",
      "Leave Management",
      "Examinations",
      "Results & Reports",
    ],
  },
  {
    number: "03",
    title: "AI Career Intelligence",
    description:
      "Connect academic performance, skills, projects and career goals to create a complete Student 360° profile.",
    items: [
      "AI Performance Insights",
      "Resume Builder",
      "ATS Analysis",
      "Job Matching",
    ],
    featured: true,
  },
  {
    number: "04",
    title: "Finance & Administration",
    description:
      "Manage fees, payments, receipts, notices and administrative workflows efficiently.",
    items: [
      "Fee Management",
      "Payments",
      "Receipts",
      "Administrative Reports",
    ],
  },
  {
    number: "05",
    title: "AI Assistant",
    description:
      "Provide students and staff with intelligent assistance for learning, academic and career activities.",
    items: [
      "AI Q&A",
      "Question Generation",
      "Personalized Guidance",
      "Learning Assistance",
    ],
  },
  {
    number: "06",
    title: "Assessment & Interview AI",
    description:
      "Prepare students for jobs through assessments, technical questions and AI-powered interview practice.",
    items: [
      "Skill Assessments",
      "MCQ Tests",
      "Technical Questions",
      "AI Interview",
    ],
  },
];

function FeaturesPage() {
  return (
    <main className="features-page">

      <section className="features-header">

        <span>EDUNEXUS PLATFORM</span>

        <h1>
          Powerful tools.
          <br />
          One intelligent ecosystem.
        </h1>

        <p>
          EduNexus combines college ERP functionality
          with AI-powered academic and career intelligence.
        </p>

      </section>

      <section className="features-grid">

        {features.map((feature) => (
          <article
            key={feature.number}
            className={
              feature.featured
                ? "feature-card featured"
                : "feature-card"
            }
          >

            <div className="feature-number">
              {feature.number}
            </div>

            <h2>{feature.title}</h2>

            <p>{feature.description}</p>

            <ul>
              {feature.items.map((item) => (
                <li key={item}>
                  <span>✓</span>
                  {item}
                </li>
              ))}
            </ul>

            {feature.featured && (
              <div className="featured-label">
                CORE DIFFERENTIATOR
              </div>
            )}

          </article>
        ))}

      </section>

      <section className="features-cta">

        <div>
          <span>READY TO EXPERIENCE IT?</span>

          <h2>
            Move from disconnected
            systems to one platform.
          </h2>
        </div>

        <Link to="/dashboard">
          View Dashboard →
        </Link>

      </section>

    </main>
  );
}

export default FeaturesPage;