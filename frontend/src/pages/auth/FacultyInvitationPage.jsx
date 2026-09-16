import { useState } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

import "./FacultyInvitationPage.css";

function FacultyInvitationPage() {
  const [formData, setFormData] = useState({
    invitationCode: "",
    employeeId: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    /*
      Backend invitation verification will be connected here.

      The backend should verify:
      1. Invitation code
      2. Employee ID
      3. Official faculty email
      4. Invitation expiry
      5. Whether invitation was already used
    */

    setTimeout(() => {
      setLoading(false);
      setMessage(
        "Faculty account setup will be connected to the backend."
      );
    }, 800);
  };

  return (
    <main className="faculty-invitation-page">

      <div className="faculty-card">

        <div className="faculty-header">

          <span className="faculty-eyebrow">
            EDUNEXUS AI ERP
          </span>

          <h1>
            Activate Faculty Account
          </h1>

          <p>
            Use the invitation provided by your institution
            to activate your faculty account.
          </p>

        </div>

        <form
          className="faculty-form"
          onSubmit={handleSubmit}
        >

          <div className="form-group">

            <label htmlFor="invitationCode">
              Invitation Code
            </label>

            <input
              id="invitationCode"
              name="invitationCode"
              type="text"
              value={formData.invitationCode}
              onChange={handleChange}
              placeholder="Enter invitation code"
              required
            />

            <small>
              This code is provided by your institution administrator.
            </small>

          </div>

          <div className="form-group">

            <label htmlFor="employeeId">
              Employee ID
            </label>

            <input
              id="employeeId"
              name="employeeId"
              type="text"
              value={formData.employeeId}
              onChange={handleChange}
              placeholder="e.g. FAC-1024"
              required
            />

          </div>

          <div className="form-group">

            <label htmlFor="email">
              Official Faculty Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="faculty@institution.edu"
              required
            />

          </div>

          <div className="form-group">

            <label htmlFor="password">
              Create Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a secure password"
              required
              minLength={8}
            />

          </div>

          <div className="form-group">

            <label htmlFor="confirmPassword">
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
              minLength={8}
            />

          </div>

          {message && (
            <div className="faculty-message">
              {message}
            </div>
          )}

          <button
            type="submit"
            className="faculty-submit"
            disabled={loading}
          >
            {loading ? (
              "Activating..."
            ) : (
              <>
                Activate Faculty Account
                <ArrowRight size={18} />
              </>
            )}
          </button>

        </form>

        <div className="faculty-security">

          <ShieldCheck size={16} />

          <span>
            Faculty access is controlled by institution-level
            authorization and role-based permissions.
          </span>

        </div>

        <div className="faculty-footer">

          <span>
            Already have an account?
          </span>

          <Link to="/login?role=faculty">
            Login
          </Link>

        </div>

      </div>

    </main>
  );
}

export default FacultyInvitationPage;