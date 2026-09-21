

// import { Link } from "react-router-dom";
// import { useEffect, useRef, useState } from "react";
// import "./LandingPage.css";


// function LandingPage() {
//   const stageRef = useRef(null);
//   const shineRef = useRef(null);
//   const [tilt, setTilt] = useState({ x: 0, y: 0 });
//   const [hover, setHover] = useState(false);
//   const raf = useRef(null);

//   const [counts, setCounts] = useState({ s: 0, a: 0, c: 0 });

//   useEffect(() => {
//     const target = { s: 2479, a: 91, c: 86 };
//     let i = 0;
//     const steps = 52;
//     const t = setInterval(() => {
//       i++;
//       const e = 1 - Math.pow(1 - i / steps, 3);
//       setCounts({
//         s: Math.round(target.s * e),
//         a: Math.round(target.a * e),
//         c: Math.round(target.c * e),
//       });
//       if (i >= steps) clearInterval(t);
//     }, 28);
//     return () => clearInterval(t);
//   }, []);

//   const onMove = (e) => {
//     const el = stageRef.current;
//     if (!el) return;
//     const r = el.getBoundingClientRect();
//     const px = (e.clientX - r.left) / r.width;
//     const py = (e.clientY - r.top) / r.height;
//     const x = (py - 0.5) * -14;
//     const y = (px - 0.5) * 18;

//     if (raf.current) cancelAnimationFrame(raf.current);
//     raf.current = requestAnimationFrame(() => {
//       setTilt({ x, y });
//       if (shineRef.current) {
//         shineRef.current.style.background = `
//           radial-gradient(
//             420px circle at ${px * 100}% ${py * 100}%,
//             rgba(255,255,255,.38),
//             transparent 55%
//           )
//         `;
//       }
//     });
//   };

//   const onLeave = () => {
//     setHover(false);
//     setTilt({ x: 0, y: 0 });
//     if (shineRef.current) shineRef.current.style.background = "transparent";
//   };

//   return (
//     <main className="lp">
//       <section className="hero">
//         <div className="hero-grid-bg" />
//         <div className="hero-sun" />

//         <div className="hero-wrap">
//           {/* LEFT */}
//           <div className="copy">
//             <div className="badge">
//               <span className="live" />
//               AI-POWERED COLLEGE ERP
//             </div>

//             <h1>
//               One Intelligent
//               <br />
//               <span>Platform</span>
//               <br />
//               for the Entire
//               <br />
//               College.
//             </h1>

//             <p className="lede">
//               Unify academic management, student operations, faculty
//               workflows, administration and AI-driven career intelligence
//               into one enterprise-grade institutional platform.
//             </p>

//             <div className="service-row">
//               {[
//                 { ico: cap, label: "Academics" },
//                 { ico: user, label: "Students" },
//                 { ico: users, label: "Faculty" },
//                 { ico: cal, label: "Administration" },
//                 { ico: chip, label: "AI Career" },
//               ].map((s) => (
//                 <div key={s.label} className="service">
//                   <span className="service-ico" dangerouslySetInnerHTML={{ __html: s.ico }} />
//                   <small>{s.label}</small>
//                 </div>
//               ))}
//             </div>

//             <div className="actions">
//               <Link to="./request-demo " className="btn-primary">
//                 Request a Demo
//                 <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
//                   stroke="currentColor" strokeWidth="2.4">
//                   <path d="M5 12h14M12 5l7 7-7 7" />
//                 </svg>
//               </Link>
//               <Link to="/features" className="btn-ghost">Explore Features</Link>
//             </div>

//             <div className="mini-stats">
//               <b>{counts.s.toLocaleString()}</b><em>Students</em>
//               <i />
//               <b>{counts.a}%</b><em>Attendance</em>
//               <i />
//               <b>{counts.c}</b><em>Courses</em>
//             </div>
//           </div>

//           {/* RIGHT — 3D IMAGE */}
//           <div
//             className="stage"
//             ref={stageRef}
//             onMouseMove={onMove}
//             onMouseEnter={() => setHover(true)}
//             onMouseLeave={onLeave}
//           >
//             <div className="stage-glow" />
//             <div className="stage-ring" />

//             <div
//               className="scene-3d"
//               style={{
//                 transform: `
//                   perspective(1400px)
//                   rotateX(${tilt.x}deg)
//                   rotateY(${tilt.y}deg)
//                   scale(${hover ? 1.035 : 1})
//                 `,
//               }}
//             >
//               <div className="scene-shadow" />

//               <div className="scene-frame">
//                 <img
//                   src="images-Photoroom.png"
//                   alt="College ERP platform — academics, students, faculty, management and AI insights"
//                   className="scene-img"
//                   draggable="false"
//                 />
//                 <div className="scene-shine" ref={shineRef} />
//                 <div className="scene-edge" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="trust">
//         <p>BUILT FOR MODERN EDUCATIONAL INSTITUTIONS</p>
//         <div>
//           {["ACADEMICS", "STUDENT LIFE", "FACULTY", "ADMINISTRATION", "CAREER AI"].map((x) => (
//             <span key={x}><i />{x}</span>
//           ))}
//         </div>
//       </section>

//       <section className="value">
//         <div className="value-head">
//           <span>WHY CHOOSE US</span>
//           <h2>
//             Everything your institution needs.
//             <br /> Connected intelligently.
//           </h2>
//           <p>
//             Replace fragmented systems with a unified college operating
//             platform engineered for students, faculty and administrators.
//           </p>
//         </div>

//         <div className="value-grid">
//           <article className="vcard">
//             <em>01</em>
//             <h3>Unified ERP</h3>
//             <p>
//               Manage students, academics, attendance, examinations,
//               fees and administration from one centralized platform.
//             </p>
//           </article>

//           <article className="vcard">
//             <em>02</em>
//             <h3>AI Intelligence</h3>
//             <p>
//               Transform academic and career data into insights,
//               recommendations and proactive actions for every stakeholder.
//             </p>
//             <Link to="/features">Explore AI Features →</Link>
//           </article>

//           {/* 3rd card — featured */}
//           <article className="vcard vcard-hot">
//             <div className="vglow" />
//             <em>03</em>
//             <h3>Student 360°</h3>
//             <p>
//               Connect performance, skills, projects, portfolios,
//               assessments and career goals in one intelligence profile.
//             </p>
//             <Link to="/features">Explore Student Profile →</Link>
//           </article>
//         </div>
//       </section>

//       <section className="cta">
//         <div>
//           <span>READY TO TRANSFORM YOUR CAMPUS?</span>
//           <h2>Build a smarter institution with AI.</h2>
//           <p>Bring academic, administrative and career workflows together.</p>
//         </div>
//         <Link to="/login" className="btn-primary">Start Your Journey →</Link>
//       </section>
//     </main>
//   );
// }

// const cap = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M3 9.5 12 5l9 4.5-9 4.5L3 9.5Z"/><path d="M7 12v4.5c0 .8 2.2 2.5 5 2.5s5-1.7 5-2.5V12"/><path d="M21 10v6"/></svg>`;
// const user = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="8" r="3.2"/><path d="M5.5 19c1.2-3.2 3.5-4.8 6.5-4.8S16.8 15.8 18.5 19"/></svg>`;
// const users = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="9" cy="8" r="2.6"/><circle cx="16" cy="9" r="2.2"/><path d="M4 18.5c.9-2.6 2.6-4 5-4s4.1 1.4 5 4"/><path d="M13.5 18.5c.5-1.8 1.7-3 3.4-3 1.6 0 2.8 1 3.4 3"/></svg>`;
// const cal = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="4" y="6" width="16" height="14" rx="2"/><path d="M4 10h16M8 4v4M16 4v4"/></svg>`;
// const chip = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="7" y="7" width="10" height="10" rx="2"/><path d="M9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4"/></svg>`;

// export default LandingPage;



import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "./LandingPage.css";

function LandingPage() {
  const sceneRef = useRef(null);

  const [mouse, setMouse] = useState({
    x: 0,
    y: 0,
  });

  const [counts, setCounts] = useState({
    students: 0,
    attendance: 0,
    modules: 0,
  });

  /* ================================
     COUNTER ANIMATION
  ================================= */

  useEffect(() => {
    const target = {
      students: 2479,
      attendance: 91,
      modules: 10,
    };

    let current = 0;

    const interval = setInterval(() => {
      current += 1;

      const progress = Math.min(current / 50, 1);

      setCounts({
        students: Math.floor(target.students * progress),
        attendance: Math.floor(target.attendance * progress),
        modules: Math.floor(target.modules * progress),
      });

      if (progress >= 1) {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  /* ================================
     3D MOUSE MOVEMENT
  ================================= */

  const handleMouseMove = (e) => {
    const scene = sceneRef.current;

    if (!scene) return;

    const rect = scene.getBoundingClientRect();

    const x =
      ((e.clientX - rect.left) / rect.width - 0.5) * 2;

    const y =
      ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    setMouse({
      x,
      y,
    });
  };

  const resetMouse = () => {
    setMouse({
      x: 0,
      y: 0,
    });
  };

  return (
    <main className="landing-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="landing-hero">

        <div className="hero-background-grid" />
        <div className="hero-light hero-light-one" />
        <div className="hero-light hero-light-two" />

        <div className="hero-container">

          {/* ================= LEFT CONTENT ================= */}

          <div className="hero-content">

            <div className="hero-badge">
              <span className="badge-dot" />
              AI-POWERED COLLEGE ERP
            </div>

            <h1>
              One Intelligent
              <br />

              <span>Platform</span>

              <br />

              for the Entire
              <br />

              College.
            </h1>

            <h2>
              From Student Admission
              <br />
              to Alumni Success
            </h2>

            <p>
              Manage your entire educational institution
              from one intelligent platform. Students,
              faculty, academics, attendance, fees,
              hostel and more.
            </p>


            {/* ================= BUTTONS ================= */}

            <div className="hero-actions">

              <Link
                to="/request-demo"
                className="hero-button hero-button-primary"
              >
                Request a Demo

                <span>↗</span>
              </Link>

              <Link
                to="/features"
                className="hero-button hero-button-secondary"
              >
                Explore Features

                <span>↗</span>
              </Link>

            </div>


            {/* ================= STATS ================= */}

            <div className="hero-stats">

              <div>
                <strong>
                  {counts.students.toLocaleString()}+
                </strong>

                <span>Students</span>
              </div>

              <div className="stat-divider" />

              <div>
                <strong>
                  {counts.attendance}%
                </strong>

                <span>Attendance</span>
              </div>

              <div className="stat-divider" />

              <div>
                <strong>
                  {counts.modules}+
                </strong>

                <span>ERP Modules</span>
              </div>

            </div>

          </div>


          {/* =================================================
              3D SCENE
          ================================================= */}

          <div
            className="erp-scene"
            ref={sceneRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={resetMouse}
          >

            <div className="scene-glow" />

            <div
              className="scene-world"
              style={{
                transform: `
                  perspective(1400px)
                  rotateX(${mouse.y * -4}deg)
                  rotateY(${mouse.x * 6}deg)
                `,
              }}
            >

              {/* FLOOR */}

              <div className="scene-floor" />


              {/* CENTER ORB */}

              <div className="erp-orb">

                <div className="orb-inner">

                  <small>EDU</small>

                  <strong>
                    NEXUS
                  </strong>

                  <span>
                    AI ERP
                  </span>

                </div>

              </div>


              {/* ================= CARD 1 ================= */}

              <div className="floating-card card-one">

                <span className="card-number">
                  01
                </span>

                <div className="card-icon">
                  🎓
                </div>

                <h3>
                  Student
                  <br />
                  Management
                </h3>

                <div className="card-line" />

                <small>
                  EDUNEXUS ERP
                </small>

              </div>


              {/* ================= CARD 2 ================= */}

              <div className="floating-card card-two">

                <span className="card-number">
                  02
                </span>

                <div className="card-icon">
                  👨‍🏫
                </div>

                <h3>
                  Faculty
                  <br />
                  Management
                </h3>

                <div className="card-line" />

                <small>
                  EDUNEXUS ERP
                </small>

              </div>


              {/* ================= CARD 3 ================= */}

              <div className="floating-card card-three">

                <span className="card-number">
                  03
                </span>

                <div className="card-icon">
                  📅
                </div>

                <h3>
                  Attendance
                </h3>

                <div className="card-line" />

                <small>
                  EDUNEXUS ERP
                </small>

              </div>


              {/* ================= CARD 4 ================= */}

              <div className="floating-card card-four">

                <span className="card-number">
                  04
                </span>

                <div className="card-icon">
                  📚
                </div>

                <h3>
                  Academics
                </h3>

                <div className="card-line" />

                <small>
                  EDUNEXUS ERP
                </small>

              </div>


              {/* ================= CARD 5 ================= */}

              <div className="floating-card card-five">

                <span className="card-number">
                  05
                </span>

                <div className="card-icon">
                  💳
                </div>

                <h3>
                  Fees
                  <br />
                  Management
                </h3>

                <div className="card-line" />

                <small>
                  EDUNEXUS ERP
                </small>

              </div>





              {/* ================= CARD 8 ================= */}

              <div className="floating-card card-six">

                <span className="card-number">
                  06
                </span>

                <div className="card-icon">
                  🤖
                </div>

                <h3>
                  AI Career
                </h3>

                <div className="card-line" />

                <small>
                  EDUNEXUS ERP
                </small>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          MODULE SECTION
      ===================================================== */}

      <section className="modules-section">

        <div className="section-heading">

          <span>
            ONE CONNECTED CAMPUS
          </span>

          <h2>
            Everything your college needs,
            <br />

            <strong>
              in one intelligent system.
            </strong>
          </h2>

          <p>
            Replace disconnected systems with one
            centralized educational operating platform.
          </p>

        </div>


        <div className="module-grid">

          <div className="module-box">
            <span>01</span>
            <h3>Academics</h3>
            <p>
              Courses, examinations and academic
              performance.
            </p>
          </div>

          <div className="module-box">
            <span>02</span>
            <h3>Students</h3>
            <p>
              Complete student lifecycle management.
            </p>
          </div>

          <div className="module-box">
            <span>03</span>
            <h3>Faculty</h3>
            <p>
              Faculty profiles and institutional workflows.
            </p>
          </div>

          <div className="module-box">
            <span>04</span>
            <h3>Attendance</h3>
            <p>
              Smart attendance and academic tracking.
            </p>
          </div>

          <div className="module-box">
            <span>05</span>
            <h3>Fees</h3>
            <p>
              Payments, dues and financial records.
            </p>
          </div>

          <div className="module-box">
            <span>06</span>
            <h3>Hostel</h3>
            <p>
              Rooms, allocations and hostel operations.
            </p>
          </div>

        </div>

      </section>


      {/* =====================================================
          VALUE SECTION
      ===================================================== */}

      <section className="value-section">

        <div className="value-heading">

          <span>
            WHY EDUNEXUS
          </span>

          <h2>
            One platform.
            <br />

            <strong>
              Complete campus intelligence.
            </strong>
          </h2>

        </div>


        <div className="value-grid">

          <article className="value-card">

            <span>01</span>

            <div className="value-icon">
              ◉
            </div>

            <h3>
              Unified ERP
            </h3>

            <p>
              Manage students, academics, attendance,
              examinations, fees and administration
              from one centralized platform.
            </p>

          </article>


          <article className="value-card value-card-featured">

            <span>02</span>

            <div className="value-icon">
              ✦
            </div>

            <h3>
              AI Intelligence
            </h3>

            <p>
              Transform institutional data into insights,
              recommendations and intelligent actions.
            </p>

            <Link to="/features">
              Explore AI Features →
            </Link>

          </article>


          <article className="value-card">

            <span>03</span>

            <div className="value-icon">
              ◎
            </div>

            <h3>
              Student 360°
            </h3>

            <p>
              Connect academic performance, skills,
              projects and career goals.
            </p>

            <Link to="/features">
              Explore Student Profile →
            </Link>

          </article>

        </div>

      </section>


      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="final-cta">

        <div className="cta-glow" />

        <div className="cta-content">

          <span>
            READY TO TRANSFORM YOUR CAMPUS?
          </span>

          <h2>
            Build a smarter institution
            <br />

            with <strong>EduNexus AI.</strong>
          </h2>

          <p>
            Bring academic, administrative,
            student and career workflows together.
          </p>

          <div className="cta-buttons">

            <Link
              to="/request-demo"
              className="cta-primary"
            >
              Request a Demo →
            </Link>

            <Link
              to="/features"
              className="cta-secondary"
            >
              Explore Features
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}

export default LandingPage;