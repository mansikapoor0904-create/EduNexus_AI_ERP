import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  GraduationCap,
  Mail,
  Phone,
  Users,
} from "lucide-react";

import "./RequestDemo.css";

function RequestDemoPage() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Temporary success message
    alert("Demo request submitted successfully!");

    // Later we can connect this to your backend/database
    navigate("/");
  };

  return (
    <main className="request-demo-page">

      {/* BACKGROUND */}
      <div className="demo-background">
        <div className="demo-grid"></div>
        <div className="demo-orb demo-orb-one"></div>
        <div className="demo-orb demo-orb-two"></div>
      </div>

      {/* HEADER */}
      <header className="demo-header">

        <button
          className="demo-brand"
          onClick={() => navigate("/")}
        >
          <div className="demo-brand-logo">
            E
          </div>

          <div className="demo-brand-text">
            <strong>EduNexus</strong>
            <span>AI ERP</span>
          </div>
        </button>

        <button
          className="demo-back"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={16} />
          Back
        </button>

      </header>


      {/* MAIN */}
      <section className="demo-container">

        {/* LEFT CONTENT */}
        <div className="demo-intro">

          <span className="demo-eyebrow">
            EDUNEXUS AI ERP
          </span>

          <h1>
            See how EduNexus can
            <span> transform your institution.</span>
          </h1>

          <p>
            Request a personalized demo and discover how
            EduNexus AI ERP can simplify academic,
            administrative and institutional workflows.
          </p>


          {/* AUDIENCE */}
          <div className="demo-audience">

            <div className="audience-item">
              <div className="audience-icon">
                <Building2 size={19} />
              </div>

              <div>
                <strong>Institutions</strong>
                <span>Colleges & universities</span>
              </div>
            </div>


            <div className="audience-item">
              <div className="audience-icon">
                <GraduationCap size={19} />
              </div>

              <div>
                <strong>Faculty</strong>
                <span>Academic & department teams</span>
              </div>
            </div>


            <div className="audience-item">
              <div className="audience-icon">
                <Users size={19} />
              </div>

              <div>
                <strong>Administrators</strong>
                <span>Management & authorized teams</span>
              </div>
            </div>

          </div>


          {/* TRUST */}
          <div className="demo-trust">

            <CheckCircle2 size={17} />

            <span>
              No commitment required. Our team will contact you
              to schedule a suitable demonstration.
            </span>

          </div>

        </div>


        {/* FORM */}
        <div className="demo-form-card">

          <div className="demo-form-header">
            <span>REQUEST A DEMO</span>

            <h2>
              Tell us about your institution
            </h2>

            <p>
              Fill in your details and our team will
              get in touch with you.
            </p>
          </div>


          <form onSubmit={handleSubmit}>

            {/* NAME */}
            <div className="form-group">

              <label htmlFor="name">
                Full Name
              </label>

              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                required
              />

            </div>


            {/* EMAIL + PHONE */}
            <div className="form-row">

              <div className="form-group">

                <label htmlFor="email">
                  Official Email
                </label>

                <div className="input-with-icon">
                  <Mail size={16} />

                  <input
                    id="email"
                    type="email"
                    placeholder="name@institution.edu"
                    required
                  />
                </div>

              </div>


              <div className="form-group">

                <label htmlFor="phone">
                  Phone Number
                </label>

                <div className="input-with-icon">
                  <Phone size={16} />

                  <input
                    id="phone"
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    required
                  />
                </div>

              </div>

            </div>


            {/* INSTITUTION */}
            <div className="form-group">

              <label htmlFor="institution">
                Institution Name
              </label>

              <div className="input-with-icon">
                <Building2 size={16} />

                <input
                  id="institution"
                  type="text"
                  placeholder="College / University name"
                  required
                />
              </div>

            </div>


            {/* ROLE */}
            <div className="form-row">

              <div className="form-group">

                <label htmlFor="role">
                  Your Role
                </label>

                <select id="role" required>
                  <option value="">
                    Select your role
                  </option>

                  <option value="institution">
                    Institution Representative
                  </option>

                  <option value="faculty">
                    Faculty
                  </option>

                  <option value="principal">
                    Principal / Director
                  </option>

                  <option value="administrator">
                    Administrator
                  </option>

                </select>

              </div>


              <div className="form-group">

                <label htmlFor="students">
                  Student Strength
                </label>

                <select id="students" required>

                  <option value="">
                    Select range
                  </option>

                  <option value="under-500">
                    Under 500
                  </option>

                  <option value="500-1000">
                    500 – 1,000
                  </option>

                  <option value="1000-5000">
                    1,000 – 5,000
                  </option>

                  <option value="5000-10000">
                    5,000 – 10,000
                  </option>

                  <option value="10000+">
                    10,000+
                  </option>

                </select>

              </div>

            </div>


            {/* REQUIREMENTS */}
            <div className="form-group">

              <label htmlFor="message">
                What would you like to explore?
              </label>

              <textarea
                id="message"
                rows="4"
                placeholder="Tell us about your requirements..."
              ></textarea>

            </div>


            {/* SUBMIT */}
            <button
              type="submit"
              className="demo-submit"
            >
              Request Your Demo
              <ArrowRight size={18} />
            </button>


            <p className="form-note">
              By submitting this form, you agree to be contacted
              regarding an EduNexus product demonstration.
            </p>

          </form>

        </div>

      </section>

    </main>
  );
}

export default RequestDemoPage;