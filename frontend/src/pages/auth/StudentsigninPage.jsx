import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  Users,
  Lock,
  MapPin,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

import "./StudentSignupPage.css";


function StudentSignupPage() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",

    email: "",
    phone: "",
    alternatePhone: "",

    address: "",
    city: "",
    state: "",
    postalCode: "",

    institutionCode: "",
    enrollmentNumber: "",
    program: "",
    department: "",
    admissionYear: "",
    batch: "",
    semester: "",
    section: "",

    guardianName: "",
    guardianRelationship: "",
    guardianPhone: "",
    guardianEmail: "",

    password: "",
    confirmPassword: "",

    termsAccepted: false,
  });

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");


  const handleChange = (event) => {

    const { name, value, type, checked } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));

  };


  const handlePhotoChange = (event) => {

    const file = event.target.files?.[0];

    if (file) {
      setProfilePhoto(file);
    }

  };


  const handleSubmit = async (event) => {

    event.preventDefault();

    setError("");
    setMessage("");


    if (formData.password !== formData.confirmPassword) {

      setError("Passwords do not match.");

      return;
    }


    if (!formData.termsAccepted) {

      setError(
        "Please accept the Terms of Service and Privacy Policy."
      );

      return;
    }


    setLoading(true);


    /*
      Backend registration will be connected here.

      We are intentionally NOT pretending that the account
      has been created until the backend successfully
      validates and stores the data.
    */


    try {

      const submitData = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, value);
      });


      if (profilePhoto) {
        submitData.append("profilePhoto", profilePhoto);
      }


      /*
      Example future API call:

      const response = await fetch(
        "http://localhost:5000/api/auth/student/register",
        {
          method: "POST",
          body: submitData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }
      */


      await new Promise((resolve) =>
        setTimeout(resolve, 800)
      );


      setMessage(
        "Registration form submitted successfully. Backend verification will be connected next."
      );

    } catch (submitError) {

      console.error(submitError);

      setError(
        submitError.message ||
        "Unable to create your student account."
      );

    } finally {

      setLoading(false);

    }

  };


  return (
    <main className="student-signup-page">

      {/* BACKGROUND */}

      <div className="student-signup-background">

        <div className="signup-grid"></div>

        <div className="signup-orb signup-orb-one"></div>

        <div className="signup-orb signup-orb-two"></div>

      </div>


      {/* HEADER */}

      <header className="student-signup-header">

        <Link
          to="/"
          className="student-signup-brand"
        >

          <div className="student-signup-logo">
            E
          </div>

          <div className="student-signup-brand-text">

            <strong>EduNexus</strong>

            <span>AI ERP</span>

          </div>

        </Link>


        <div className="student-signup-login">

          <span>Already have an account?</span>

          <Link to="/login?role=student">
            Sign in
          </Link>

        </div>

      </header>


      {/* MAIN */}

      <section className="student-signup-container">

        {/* PAGE HEADING */}

        <div className="student-signup-heading">

          <span className="signup-eyebrow">
            STUDENT REGISTRATION
          </span>

          <h1>
            Create your student account.
          </h1>

          <p>
            Enter your details to create your EduNexus
            academic workspace.
          </p>

        </div>


        {/* FORM */}

        <form
          className="student-signup-form"
          onSubmit={handleSubmit}
        >


          {/* =====================================
              01 PERSONAL INFORMATION
          ====================================== */}

          <section className="signup-section">

            <div className="section-heading">

              <div className="section-icon">
                <User size={19} />
              </div>

              <div>
                <h2>Personal Information</h2>

                <p>
                  Tell us about yourself.
                </p>
              </div>

            </div>


            <div className="form-grid">

              <div className="form-group">

                <label htmlFor="firstName">
                  First Name <span>*</span>
                </label>

                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="form-group">

                <label htmlFor="lastName">
                  Last Name <span>*</span>
                </label>

                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="form-group">

                <label htmlFor="dateOfBirth">
                  Date of Birth
                </label>

                <input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                />

              </div>


              <div className="form-group">

                <label htmlFor="gender">
                  Gender
                </label>

                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >

                  <option value="">
                    Select gender
                  </option>

                  <option value="male">
                    Male
                  </option>

                  <option value="female">
                    Female
                  </option>

                  <option value="other">
                    Other
                  </option>

                  <option value="prefer_not_to_say">
                    Prefer not to say
                  </option>

                </select>

              </div>


              <div className="form-group full-width">

                <label htmlFor="profilePhoto">
                  Profile Photo
                </label>

                <input
                  id="profilePhoto"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handlePhotoChange}
                />

                <small>
                  JPG, PNG or WebP. Optional.
                </small>

              </div>

            </div>

          </section>


          {/* =====================================
              02 CONTACT INFORMATION
          ====================================== */}

          <section className="signup-section">

            <div className="section-heading">

              <div className="section-icon">
                <Mail size={19} />
              </div>

              <div>

                <h2>Contact Information</h2>

                <p>
                  Your communication details.
                </p>

              </div>

            </div>


            <div className="form-grid">

              <div className="form-group">

                <label htmlFor="email">
                  Email Address <span>*</span>
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="student@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="form-group">

                <label htmlFor="phone">
                  Mobile Number <span>*</span>
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="form-group">

                <label htmlFor="alternatePhone">
                  Alternate Phone
                </label>

                <input
                  id="alternatePhone"
                  name="alternatePhone"
                  type="tel"
                  placeholder="Optional"
                  value={formData.alternatePhone}
                  onChange={handleChange}
                />

              </div>

            </div>

          </section>


          {/* =====================================
              03 ADDRESS
          ====================================== */}

          <section className="signup-section">

            <div className="section-heading">

              <div className="section-icon">
                <MapPin size={19} />
              </div>

              <div>

                <h2>Address</h2>

                <p>
                  Your current residential information.
                </p>

              </div>

            </div>


            <div className="form-grid">

              <div className="form-group full-width">

                <label htmlFor="address">
                  Address
                </label>

                <textarea
                  id="address"
                  name="address"
                  rows="3"
                  placeholder="Enter your address"
                  value={formData.address}
                  onChange={handleChange}
                />

              </div>


              <div className="form-group">

                <label htmlFor="city">
                  City
                </label>

                <input
                  id="city"
                  name="city"
                  type="text"
                  placeholder="Enter city"
                  value={formData.city}
                  onChange={handleChange}
                />

              </div>


              <div className="form-group">

                <label htmlFor="state">
                  State
                </label>

                <input
                  id="state"
                  name="state"
                  type="text"
                  placeholder="Enter state"
                  value={formData.state}
                  onChange={handleChange}
                />

              </div>


              <div className="form-group">

                <label htmlFor="postalCode">
                  Postal Code
                </label>

                <input
                  id="postalCode"
                  name="postalCode"
                  type="text"
                  placeholder="Enter postal code"
                  value={formData.postalCode}
                  onChange={handleChange}
                />

              </div>

            </div>

          </section>


          {/* =====================================
              04 ACADEMIC INFORMATION
          ====================================== */}

          <section className="signup-section">

            <div className="section-heading">

              <div className="section-icon">
                <GraduationCap size={19} />
              </div>

              <div>

                <h2>Academic Information</h2>

                <p>
                  Connect your account with your institution.
                </p>

              </div>

            </div>


            <div className="form-grid">

              <div className="form-group">

                <label htmlFor="institutionCode">
                  Institution Code <span>*</span>
                </label>

                <input
                  id="institutionCode"
                  name="institutionCode"
                  type="text"
                  placeholder="Example: EDU001"
                  value={formData.institutionCode}
                  onChange={handleChange}
                  required
                />

                <small>
                  Provided by your institution.
                </small>

              </div>


              <div className="form-group">

                <label htmlFor="enrollmentNumber">
                  Admission / Enrollment Number
                </label>

                <input
                  id="enrollmentNumber"
                  name="enrollmentNumber"
                  type="text"
                  placeholder="If already provided"
                  value={formData.enrollmentNumber}
                  onChange={handleChange}
                />

              </div>


              <div className="form-group">

                <label htmlFor="program">
                  Program <span>*</span>
                </label>

                <select
                  id="program"
                  name="program"
                  value={formData.program}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select program
                  </option>

                  <option value="bca">
                    BCA
                  </option>

                  <option value="bba">
                    BBA
                  </option>

                  <option value="btech">
                    B.Tech
                  </option>

                  <option value="mca">
                    MCA
                  </option>

                  <option value="mba">
                    MBA
                  </option>

                  <option value="other">
                    Other
                  </option>

                </select>

              </div>


              <div className="form-group">

                <label htmlFor="department">
                  Department <span>*</span>
                </label>

                <input
                  id="department"
                  name="department"
                  type="text"
                  placeholder="Example: Computer Science"
                  value={formData.department}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="form-group">

                <label htmlFor="admissionYear">
                  Admission Year <span>*</span>
                </label>

                <select
                  id="admissionYear"
                  name="admissionYear"
                  value={formData.admissionYear}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select year
                  </option>

                  <option value="2026">
                    2026
                  </option>

                  <option value="2025">
                    2025
                  </option>

                  <option value="2024">
                    2024
                  </option>

                  <option value="2023">
                    2023
                  </option>

                </select>

              </div>


              <div className="form-group">

                <label htmlFor="batch">
                  Batch
                </label>

                <input
                  id="batch"
                  name="batch"
                  type="text"
                  placeholder="Example: 2026-2029"
                  value={formData.batch}
                  onChange={handleChange}
                />

              </div>


              <div className="form-group">

                <label htmlFor="semester">
                  Current Semester
                </label>

                <select
                  id="semester"
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                >

                  <option value="">
                    Select semester
                  </option>

                  <option value="1">Semester 1</option>
                  <option value="2">Semester 2</option>
                  <option value="3">Semester 3</option>
                  <option value="4">Semester 4</option>
                  <option value="5">Semester 5</option>
                  <option value="6">Semester 6</option>
                  <option value="7">Semester 7</option>
                  <option value="8">Semester 8</option>

                </select>

                <small>
                  This may be verified by management.
                </small>

              </div>


              <div className="form-group">

                <label htmlFor="section">
                  Section
                </label>

                <input
                  id="section"
                  name="section"
                  type="text"
                  placeholder="Example: A"
                  value={formData.section}
                  onChange={handleChange}
                />

                <small>
                  Can be assigned by management.
                </small>

              </div>

            </div>

          </section>


          {/* =====================================
              05 GUARDIAN INFORMATION
          ====================================== */}

          <section className="signup-section">

            <div className="section-heading">

              <div className="section-icon">
                <Users size={19} />
              </div>

              <div>

                <h2>Parent / Guardian</h2>

                <p>
                  Emergency and guardian contact information.
                </p>

              </div>

            </div>


            <div className="form-grid">

              <div className="form-group">

                <label htmlFor="guardianName">
                  Guardian Name <span>*</span>
                </label>

                <input
                  id="guardianName"
                  name="guardianName"
                  type="text"
                  placeholder="Full name"
                  value={formData.guardianName}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="form-group">

                <label htmlFor="guardianRelationship">
                  Relationship <span>*</span>
                </label>

                <select
                  id="guardianRelationship"
                  name="guardianRelationship"
                  value={formData.guardianRelationship}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select relationship
                  </option>

                  <option value="father">
                    Father
                  </option>

                  <option value="mother">
                    Mother
                  </option>

                  <option value="guardian">
                    Guardian
                  </option>

                  <option value="other">
                    Other
                  </option>

                </select>

              </div>


              <div className="form-group">

                <label htmlFor="guardianPhone">
                  Guardian Phone <span>*</span>
                </label>

                <input
                  id="guardianPhone"
                  name="guardianPhone"
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  value={formData.guardianPhone}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="form-group">

                <label htmlFor="guardianEmail">
                  Guardian Email
                </label>

                <input
                  id="guardianEmail"
                  name="guardianEmail"
                  type="email"
                  placeholder="Optional"
                  value={formData.guardianEmail}
                  onChange={handleChange}
                />

              </div>

            </div>

          </section>


          {/* =====================================
              06 ACCOUNT SECURITY
          ====================================== */}

          <section className="signup-section">

            <div className="section-heading">

              <div className="section-icon">
                <Lock size={19} />
              </div>

              <div>

                <h2>Account Security</h2>

                <p>
                  Create secure login credentials.
                </p>

              </div>

            </div>


            <div className="form-grid">

              <div className="form-group">

                <label htmlFor="password">
                  Password <span>*</span>
                </label>

                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  minLength={8}
                  required
                />

                <small>
                  Minimum 8 characters.
                </small>

              </div>


              <div className="form-group">

                <label htmlFor="confirmPassword">
                  Confirm Password <span>*</span>
                </label>

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  minLength={8}
                  required
                />

              </div>

            </div>

          </section>


          {/* MESSAGES */}

          {error && (
            <div className="signup-message signup-error">
              {error}
            </div>
          )}


          {message && (
            <div className="signup-message signup-success">
              {message}
            </div>
          )}


          {/* TERMS */}

          <div className="terms-row">

            <label>

              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
              />

              <span>
                I agree to the EduNexus Terms of Service
                and Privacy Policy.
              </span>

            </label>

          </div>


          {/* SUBMIT */}

          <div className="signup-submit-area">

            <div className="signup-security">

              <ShieldCheck size={17} />

              <span>
                Your information is protected by
                role-based access controls.
              </span>

            </div>


            <button
              type="submit"
              className="signup-submit"
              disabled={loading}
            >

              {loading
                ? "Creating account..."
                : "Create Student Account"
              }

              {!loading && (
                <ArrowRight size={18} />
              )}

            </button>

          </div>


          {/* BACK */}

          <button
            type="button"
            className="signup-back"
            onClick={() => navigate("/get-started")}
          >
            ← Back to account selection
          </button>

        </form>

      </section>

    </main>
  );
}


export default StudentSignupPage;