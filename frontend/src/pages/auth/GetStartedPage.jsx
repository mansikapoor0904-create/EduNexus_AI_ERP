

// import { useNavigate } from "react-router-dom";
// import {
//   GraduationCap,
//   Users,
//   Building2,
//   ArrowRight,
//   ShieldCheck,
// } from "lucide-react";

// import "./GetStartedPage.css";

// function CreateAccountPage() {
//   const navigate = useNavigate();

//   return (
//     <main className="create-account-page">

//       {/* =========================================
//           BACKGROUND
//       ========================================== */}
//       <div className="create-account-background">
//         <div className="create-grid"></div>

//         <div className="create-orb create-orb-one"></div>

//         <div className="create-orb create-orb-two"></div>
//       </div>


//       {/* =========================================
//           HEADER
//       ========================================== */}
//       <header className="create-account-header">

//         <button
//           type="button"
//           className="create-brand"
//           onClick={() => navigate("/")}
//         >
//           <div className="create-brand-logo">
//             E
//           </div>

//           <div className="create-brand-text">
//             <strong>EduNexus</strong>
//             <span>AI ERP</span>
//           </div>
//         </button>

//       </header>


//       {/* =========================================
//           MAIN CONTENT
//       ========================================== */}
//       <section className="create-account-container">

//         {/* =========================================
//             HEADING
//         ========================================== */}
//         <div className="create-account-heading">

//           <span className="create-eyebrow">
//             EDUNEXUS AI ERP
//           </span>

//           <h1>
//             Create your
//             <span> EduNexus account.</span>
//           </h1>

//           <p>
//             Choose your role to continue with the
//             appropriate account setup process.
//           </p>

//         </div>


//         {/* =========================================
//             ROLE CARDS
//         ========================================== */}
//         <div className="account-role-grid">


//           {/* =======================================
//               STUDENT
//           ======================================== */}
//           <button
//             type="button"
//             className="account-role-card"
//             onClick={() => navigate("/signup/student")}
//           >

//             <div className="account-role-icon student-role-icon">
//               <GraduationCap size={22} />
//             </div>

//             <div className="account-role-content">

//               <span className="role-label">
//                 FOR STUDENTS
//               </span>

//               <h2>
//                 Student Account
//               </h2>

//               <p>
//                 Create your student profile and access
//                 academics, attendance, assignments,
//                 fees and career services.
//               </p>

//             </div>

//             <div className="role-card-footer">

//               <span>
//                 Create student account
//               </span>

//               <ArrowRight size={17} />

//             </div>

//           </button>


//           {/* =======================================
//               FACULTY
//           ======================================== */}
//           <button
//             type="button"
//             className="account-role-card"
//             onClick={() => navigate("/faculty-invitation")}
//           >

//             <div className="account-role-icon faculty-role-icon">
//               <Users size={22} />
//             </div>

//             <div className="account-role-content">

//               <span className="role-label">
//                 FOR FACULTY
//               </span>

//               <h2>
//                 Faculty Account
//               </h2>

//               <p>
//                 Activate your faculty account using
//                 an invitation issued by your institution
//                 administrator.
//               </p>

//             </div>

//             <div className="role-card-footer restricted-footer">

//               <span>
//                 Invitation required
//               </span>

//               <ShieldCheck size={16} />

//             </div>

//           </button>


//           {/* =======================================
//               MANAGEMENT
//           ======================================== */}
//           <button
//             type="button"
//             className="account-role-card"
//             onClick={() => navigate("/management-access")}
//           >

//             <div className="account-role-icon management-role-icon">
//               <Building2 size={22} />
//             </div>

//             <div className="account-role-content">

//               <span className="role-label">
//                 FOR MANAGEMENT
//               </span>

//               <h2>
//                 Management Account
//               </h2>

//               <p>
//                 Register your institution and request
//                 authorized management access to the
//                 EduNexus platform.
//               </p>

//             </div>

//             <div className="role-card-footer restricted-footer">

//               <span>
//                 Institutional verification required
//               </span>

//               <ShieldCheck size={16} />

//             </div>

//           </button>

//         </div>


//         {/* =========================================
//             LOGIN
//         ========================================== */}
//         <div className="already-account">

//           <span>
//             Already have an account?
//           </span>

//           <button
//             type="button"
//             onClick={() => navigate("/login")}
//           >
//             Login

//             <ArrowRight size={15} />
//           </button>

//         </div>


//         {/* =========================================
//             SECURITY MESSAGE
//         ========================================== */}
//         <div className="account-security">

//           <ShieldCheck size={16} />

//           <span>
//             Your account and institutional data are
//             protected with role-based access controls.
//           </span>

//         </div>

//       </section>

//     </main>
//   );
// }

// export default CreateAccountPage;

import React from "react";
import { useNavigate } from "react-router-dom";
import "./GetStartedPage.css";

const GetStartedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="get-started-page">
      <div className="get-started-container">

        <div className="get-started-header">
          <span>EDUNEXUS AI ERP</span>

          <h1>Get Started with EduNexus</h1>

          <p>
            Choose how you want to access or explore EduNexus.
          </p>
        </div>

        <div className="get-started-grid">

          {/* STUDENT */}
          <div className="start-card">
            <div className="card-icon">🎓</div>

            <h2>Student</h2>

            <p>
              Create your student account and access your academic
              workspace.
            </p>

            <button
              onClick={() => navigate("/signup/student")}
              className="primary-btn"
            >
              Create Student Account
            </button>
          </div>


          {/* MANAGEMENT */}
          <div className="start-card">
            <div className="card-icon">🏛️</div>

            <h2>Institution / Management</h2>

            <p>
              Manage your institution, students, faculty and academic
              data.
            </p>

            <button
              onClick={() =>
                navigate("/login?role=management")
              }
              className="primary-btn"
            >
              Management Sign In
            </button>

            <button
              onClick={() =>
                navigate("/management-access")
              }
              className="secondary-btn"
            >
              Request Institutional Access
            </button>
          </div>


          {/* DEMO */}
          <div className="start-card">
            <div className="card-icon">🚀</div>

            <h2>Request a Demo</h2>

            <p>
              See how EduNexus can help your institution manage
              education digitally.
            </p>

            <button
              onClick={() => navigate("/request-demo")}
              className="primary-btn"
            >
              Request Demo
            </button>
          </div>

        </div>


        <div className="already-account">
          <p>Already have an account?</p>

          <button
            onClick={() => navigate("/login")}
            className="login-link-btn"
          >
            Sign In
          </button>
        </div>

      </div>
    </div>
  );
};

export default GetStartedPage;