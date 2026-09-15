import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  Users,
  Building2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

import "./GetStartedPage.css";

function CreateAccountPage() {
  const navigate = useNavigate();

  return (
    <main className="create-account-page">

      {/* BACKGROUND */}
      <div className="create-account-background">
        <div className="create-grid"></div>
        <div className="create-orb create-orb-one"></div>
        <div className="create-orb create-orb-two"></div>
      </div>


      {/* HEADER */}
      <header className="create-account-header">

        <button
          className="create-brand"
          onClick={() => navigate("/")}
        >
          <div className="create-brand-logo">
            E
          </div>

          <div className="create-brand-text">
            <strong>EduNexus</strong>
            <span>AI ERP</span>
          </div>
        </button>

      </header>


      {/* MAIN */}
      <section className="create-account-container">

        <div className="create-account-heading">

          <span className="create-eyebrow">
            EDUNEXUS AI ERP
          </span>

          <h1>
            Create your
            <span> EduNexus account.</span>
          </h1>

          <p>
            Choose how you will use EduNexus and continue
            with the appropriate account setup.
          </p>

        </div>


        {/* ROLE CARDS */}
        <div className="account-role-grid">


          {/* STUDENT */}
          <button
            className="account-role-card"
            onClick={() => navigate("/signup/student")}
          >

            <div className="account-role-icon student-role-icon">
              <GraduationCap size={22} />
            </div>

            <div className="account-role-content">

              <span className="role-label">
                FOR STUDENTS
              </span>

              <h2>
                Student Account
              </h2>

              <p>
                Create your student profile, manage
                academics, attendance, assignments,
                fees and career activities.
              </p>

            </div>

            <div className="role-card-footer">

              <span>
                Create student account
              </span>

              <ArrowRight size={17} />

            </div>

          </button>


          {/* FACULTY */}
          <div className="account-role-card restricted-card">

            <div className="account-role-icon faculty-role-icon">
              <Users size={22} />
            </div>

            <div className="account-role-content">

              <span className="role-label">
                FOR FACULTY
              </span>

              <h2>
                Faculty Account
              </h2>

              <p>
                Faculty accounts are created through
                an invitation from college management
                or an authorized administrator.
              </p>

            </div>

            <div className="role-card-footer restricted-footer">

              <span>
                Invitation required
              </span>

              <ShieldCheck size={16} />

            </div>

          </div>


          {/* MANAGEMENT */}
          <div className="account-role-card restricted-card">

            <div className="account-role-icon management-role-icon">
              <Building2 size={22} />
            </div>

            <div className="account-role-content">

              <span className="role-label">
                FOR MANAGEMENT
              </span>

              <h2>
                Management Account
              </h2>

              <p>
                Management access is controlled by
                authorized administrators and is not
                available through public registration.
              </p>

            </div>

            <div className="role-card-footer restricted-footer">

              <span>
                Admin authorization required
              </span>

              <ShieldCheck size={16} />

            </div>

          </div>

        </div>


        {/* LOGIN */}
        <div className="already-account">

          <span>
            Already have an account?
          </span>

          <button
            onClick={() => navigate("/login")}
          >
            Sign in
            <ArrowRight size={15} />
          </button>

        </div>


        {/* SECURITY */}
        <div className="account-security">

          <ShieldCheck size={16} />

          <span>
            Your account and institutional data are protected
            with role-based access controls.
          </span>

        </div>

      </section>

    </main>
  );
}

export default CreateAccountPage;