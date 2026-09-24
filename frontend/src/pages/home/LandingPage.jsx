


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
              ENTERPRISE RESOURCE PLANNING
            </div>

            <h1>
              One Intelligent
              

              <span>Platform</span>

              <br />

              for the Entire
              

              College.
            </h1>

            <h2>
              From Student Admission
             
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

                  <h6>EDU</h6>

                  <strong>
                    NEXUS
                  </strong>

                 

                </div>

              </div>


              {/* ================= CARD 1 ================= */}

              <div className="floating-card card-one">

                

                <div className="card-icon">
                  🎓
                </div>

                <h3>
                  Student Management
                </h3>

                <div className="card-line" />

                

              </div>


              {/* ================= CARD 2 ================= */}

              <div className="floating-card card-two">

                

                <div className="card-icon">
                  👨‍🏫
                </div>

                <h3>
                  Faculty
                  <br />
                  Management
                </h3>

                <div className="card-line" />

               

              </div>


              {/* ================= CARD 3 ================= */}

              <div className="floating-card card-three">

                

                <div className="card-icon">
                  📅
                </div>

                <h3>
                  Attendance
                </h3>

                <div className="card-line" />

                
              </div>


              {/* ================= CARD 4 ================= */}

              <div className="floating-card card-four">

                

                <div className="card-icon">
                  📚
                </div>

                <h3>
                  Academics
                </h3>

                <div className="card-line" />

              
              </div>


              {/* ================= CARD 5 ================= */}

              <div className="floating-card card-five">

               

                <div className="card-icon">
                  💳
                </div>

                <h3>
                  Fees
                  <br />
                  Management
                </h3>

                <div className="card-line" />

                

              </div>





              {/* ================= CARD 8 ================= */}

              <div className="floating-card card-six">

              

                <div className="card-icon">
                  🤖
                </div>

                <h3>
                  AI Career
                </h3>
                

                <div className="card-line" />

               

              </div>

            </div>

          </div>

        </div>

      </section>


      

    </main>
  );
}

export default LandingPage;