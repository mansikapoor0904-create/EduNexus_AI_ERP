import { useState } from "react";
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
  UserRound,
  MapPin,
  BriefcaseBusiness,
  ShieldCheck,
} from "lucide-react";

import "./RequestDemo.css";

function RequestDemoPage() {
  const navigate = useNavigate();

  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    institutionName: "",
    institutionType: "",
    cityState: "",
    contactPerson: "",
    designation: "",
    email: "",
    phone: "",
    studentCount: "",
    facultyCount: "",
    message: "",
  });

  const [interests, setInterests] = useState({
    studentManagement: false,
    facultyManagement: false,
    attendance: false,
    academics: false,
    reportsAnalytics: false,
    aiFeatures: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleInterestChange = (e) => {
    const { name, checked } = e.target;

    setInterests((previous) => ({
      ...previous,
      [name]: checked,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedInterests = Object.keys(interests).filter(
      (key) => interests[key]
    );

    if (selectedInterests.length === 0) {
      alert(
        "Please select at least one area you would like to explore."
      );
      return;
    }

    console.log("Demo Request:", {
      ...formData,
      interests: selectedInterests,
    });

    setSubmitted(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  /* =========================================================
     COMMON INPUT STYLES
  ========================================================= */

  const inputWrapperStyle = {
    position: "relative",
    width: "100%",
  };

  const iconStyle = {
    position: "absolute",
    left: "15px",
    top: "50%",
    transform: "translateY(-50%)",
    width: "17px",
    height: "17px",
    color: "#8a9890",
    pointerEvents: "none",
    zIndex: 5,
  };

  const inputStyle = {
    width: "100%",
    boxSizing: "border-box",
    paddingLeft: "46px",
  };

  if (submitted) {
    return (
      <main className="request-demo-page">

        <div className="demo-background">
          <div className="demo-grid"></div>

          <div className="demo-orb demo-orb-one"></div>

          <div className="demo-orb demo-orb-two"></div>
        </div>

        <section className="demo-success-section">

          <div className="demo-success-card">

            <div className="success-icon">
              <CheckCircle2 size={42} />
            </div>

            <span className="demo-eyebrow">
              REQUEST RECEIVED
            </span>

            <h1>
              Thank you for contacting EduNexus.
            </h1>

            <p>
              Your demo request has been submitted successfully.
              Our team will review your requirements and contact
              you regarding the demonstration.
            </p>

            <div className="success-details">

              <div>
                <ShieldCheck size={18} />

                <span>
                  Your information has been received securely.
                </span>
              </div>

              <div>
                <CheckCircle2 size={18} />

                <span>
                  Our team will contact you regarding your request.
                </span>
              </div>

            </div>

            <div className="success-actions">

              <button
                type="button"
                className="success-primary-btn"
                onClick={() => navigate("/")}
              >
                Back to Home

                <ArrowRight size={17} />
              </button>

              <button
                type="button"
                className="success-secondary-btn"
                onClick={() => setSubmitted(false)}
              >
                Submit Another Request
              </button>

            </div>

          </div>

        </section>

      </main>
    );
  }

  return (
    <main className="request-demo-page">

      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="demo-background">

        <div className="demo-grid"></div>

        <div className="demo-orb demo-orb-one"></div>

        <div className="demo-orb demo-orb-two"></div>

      </div>


      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="demo-header">

        <button
          type="button"
          className="demo-brand"
          onClick={() => navigate("/")}
        >

          <div className="demo-brand-logo">
            E
          </div>

          <div className="demo-brand-text">

            <strong>
              EduNexus
            </strong>

            <span>
              AI ERP
            </span>

          </div>

        </button>


        <button
          type="button"
          className="demo-back"
          onClick={handleBack}
        >

          <ArrowLeft size={16} />

          Back

        </button>

      </header>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <section className="demo-container">


        {/* ===================================================
            LEFT CONTENT
        =================================================== */}

        <div className="demo-intro">

          <span className="demo-eyebrow">
            EDUNEXUS AI ERP
          </span>


          <h1>
            See how EduNexus can
            <span>
              {" "}transform your institution.
            </span>
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

                <strong>
                  Institutions
                </strong>

                <span>
                  Colleges & universities
                </span>

              </div>

            </div>


            <div className="audience-item">

              <div className="audience-icon">
                <GraduationCap size={19} />
              </div>

              <div>

                <strong>
                  Faculty
                </strong>

                <span>
                  Academic & department teams
                </span>

              </div>

            </div>


            <div className="audience-item">

              <div className="audience-icon">
                <Users size={19} />
              </div>

              <div>

                <strong>
                  Administrators
                </strong>

                <span>
                  Management & authorized teams
                </span>

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


        {/* ===================================================
            FORM CARD
        =================================================== */}

        <div className="demo-form-card">

          <div className="demo-form-header">

            <span>
              REQUEST A DEMO
            </span>

            <h2>
              Tell us about your institution
            </h2>

            <p>
              Fill in your details and our team will
              get in touch with you.
            </p>

          </div>


          <form onSubmit={handleSubmit}>


            {/* =================================================
                INSTITUTION INFORMATION
            ================================================= */}

            <div className="form-section-title">
              Institution Information
            </div>


            {/* INSTITUTION NAME */}

            <div className="form-group">

              <label htmlFor="institutionName">
                Institution / College Name *
              </label>

              <div style={inputWrapperStyle}>

                <Building2
                  size={17}
                  style={iconStyle}
                />

                <input
                  id="institutionName"
                  name="institutionName"
                  type="text"
                  value={formData.institutionName}
                  onChange={handleChange}
                  placeholder="College / University name"
                  required
                  style={inputStyle}
                />

              </div>

            </div>


            {/* TYPE + CITY */}

            <div className="form-row">

              <div className="form-group">

                <label htmlFor="institutionType">
                  Institution Type *
                </label>

                <select
                  id="institutionType"
                  name="institutionType"
                  value={formData.institutionType}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select type
                  </option>

                  <option value="college">
                    College
                  </option>

                  <option value="university">
                    University
                  </option>

                  <option value="school">
                    School
                  </option>

                  <option value="institute">
                    Institute
                  </option>

                  <option value="other">
                    Other
                  </option>

                </select>

              </div>


              <div className="form-group">

                <label htmlFor="cityState">
                  City / State *
                </label>

                <div style={inputWrapperStyle}>

                  <MapPin
                    size={17}
                    style={iconStyle}
                  />

                  <input
                    id="cityState"
                    name="cityState"
                    type="text"
                    value={formData.cityState}
                    onChange={handleChange}
                    placeholder="Delhi, India"
                    required
                    style={inputStyle}
                  />

                </div>

              </div>

            </div>


            {/* =================================================
                CONTACT INFORMATION
            ================================================= */}

            <div className="form-section-title">
              Contact Information
            </div>


            {/* CONTACT PERSON + DESIGNATION */}

            <div className="form-row">

              <div className="form-group">

                <label htmlFor="contactPerson">
                  Contact Person *
                </label>

                <div style={inputWrapperStyle}>

                  <UserRound
                    size={17}
                    style={iconStyle}
                  />

                  <input
                    id="contactPerson"
                    name="contactPerson"
                    type="text"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    placeholder="Full name"
                    required
                    style={inputStyle}
                  />

                </div>

              </div>


              <div className="form-group">

                <label htmlFor="designation">
                  Designation *
                </label>

                <div style={inputWrapperStyle}>

                  <BriefcaseBusiness
                    size={17}
                    style={iconStyle}
                  />

                  <input
                    id="designation"
                    name="designation"
                    type="text"
                    value={formData.designation}
                    onChange={handleChange}
                    placeholder="Principal / Administrator"
                    required
                    style={inputStyle}
                  />

                </div>

              </div>

            </div>


            {/* =================================================
                EMAIL + PHONE
            ================================================= */}

            <div className="form-row">

              <div className="form-group">

                <label htmlFor="email">
                  Official Email *
                </label>

                <div style={inputWrapperStyle}>

                  <Mail
                    size={17}
                    style={iconStyle}
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@institution.edu"
                    required
                    style={inputStyle}
                  />

                </div>

              </div>


              <div className="form-group">

                <label htmlFor="phone">
                  Phone Number *
                </label>

                <div style={inputWrapperStyle}>

                  <Phone
                    size={17}
                    style={iconStyle}
                  />

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    required
                    style={inputStyle}
                  />

                </div>

              </div>

            </div>


            {/* =================================================
                INSTITUTION SIZE
            ================================================= */}

            <div className="form-section-title">
              Institution Size
            </div>


            <div className="form-row">

              <div className="form-group">

                <label htmlFor="studentCount">
                  Student Count *
                </label>

                <div style={inputWrapperStyle}>

                  <Users
                    size={17}
                    style={iconStyle}
                  />

                  <input
                    id="studentCount"
                    name="studentCount"
                    type="number"
                    min="1"
                    value={formData.studentCount}
                    onChange={handleChange}
                    placeholder="e.g. 5000"
                    required
                    style={inputStyle}
                  />

                </div>

              </div>


              <div className="form-group">

                <label htmlFor="facultyCount">
                  Faculty Count *
                </label>

                <div style={inputWrapperStyle}>

                  <GraduationCap
                    size={17}
                    style={iconStyle}
                  />

                  <input
                    id="facultyCount"
                    name="facultyCount"
                    type="number"
                    min="1"
                    value={formData.facultyCount}
                    onChange={handleChange}
                    placeholder="e.g. 250"
                    required
                    style={inputStyle}
                  />

                </div>

              </div>

            </div>


            {/* =================================================
                INTERESTS
            ================================================= */}

            <div className="form-section-title">
              What are you interested in?
            </div>


            <div className="interest-grid">

              <label className="interest-option">

                <input
                  type="checkbox"
                  name="studentManagement"
                  checked={interests.studentManagement}
                  onChange={handleInterestChange}
                />

                <span>
                  Student Management
                </span>

              </label>


              <label className="interest-option">

                <input
                  type="checkbox"
                  name="facultyManagement"
                  checked={interests.facultyManagement}
                  onChange={handleInterestChange}
                />

                <span>
                  Faculty Management
                </span>

              </label>


              <label className="interest-option">

                <input
                  type="checkbox"
                  name="attendance"
                  checked={interests.attendance}
                  onChange={handleInterestChange}
                />

                <span>
                  Attendance
                </span>

              </label>


              <label className="interest-option">

                <input
                  type="checkbox"
                  name="academics"
                  checked={interests.academics}
                  onChange={handleInterestChange}
                />

                <span>
                  Academics
                </span>

              </label>


              <label className="interest-option">

                <input
                  type="checkbox"
                  name="reportsAnalytics"
                  checked={interests.reportsAnalytics}
                  onChange={handleInterestChange}
                />

                <span>
                  Reports & Analytics
                </span>

              </label>


              <label className="interest-option">

                <input
                  type="checkbox"
                  name="aiFeatures"
                  checked={interests.aiFeatures}
                  onChange={handleInterestChange}
                />

                <span>
                  AI Features
                </span>

              </label>

            </div>


            {/* =================================================
                MESSAGE
            ================================================= */}

            <div className="form-group">

              <label htmlFor="message">
                Requirements / Message
              </label>

              <textarea
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us what you would like to explore..."
              />

            </div>


            {/* =================================================
                SUBMIT
            ================================================= */}

            <button
              type="submit"
              className="demo-submit"
            >

              Request a Demo

              <ArrowRight size={18} />

            </button>


            <p className="form-note">

              <ShieldCheck size={13} />

              Your information is secure. We will contact you
              regarding your demo request.

            </p>

          </form>

        </div>

      </section>

    </main>
  );
}

export default RequestDemoPage;