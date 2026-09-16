import { useState } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

import "./ManagementAccessRequestPage.css";

function ManagementAccessRequestPage() {
  const [formData, setFormData] = useState({
    institutionName: "",
    institutionType: "",
    institutionEmail: "",
    website: "",
    phone: "",
    institutionCode: "",
    address: "",
    city: "",
    state: "",
    country: "India",

    adminName: "",
    designation: "",
    adminEmail: "",
    adminPhone: "",
    adminId: "",

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
      Backend will later:
      1. Validate institution information
      2. Validate official email
      3. Check institution code
      4. Create an access request
      5. Require administrator/super-admin approval
    */

    setTimeout(() => {
      setLoading(false);

      setMessage(
        "Your management access request has been submitted for verification."
      );
    }, 1000);
  };

  return (
    <main className="management-request-page">

      <div className="management-request-card">

        <div className="management-header">

          <span className="management-eyebrow">
            EDUNEXUS AI ERP
          </span>

          <h1>
            Institution Management Access
          </h1>

          <p>
            Register your institution and request authorized
            management access to EduNexus.
          </p>

        </div>

        <form
          className="management-form"
          onSubmit={handleSubmit}
        >

          <div className="form-section">

            <div className="section-heading">
              <h2>Institution Information</h2>

              <p>
                Tell us about the institution you represent.
              </p>
            </div>

            <div className="form-grid">

              <div className="form-group full-width">
                <label>
                  Institution Name
                </label>

                <input
                  name="institutionName"
                  value={formData.institutionName}
                  onChange={handleChange}
                  placeholder="Enter institution name"
                  required
                />
              </div>

              <div className="form-group">

                <label>
                  Institution Type
                </label>

                <select
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
                </select>

              </div>

              <div className="form-group">

                <label>
                  Institution Code
                </label>

                <input
                  name="institutionCode"
                  value={formData.institutionCode}
                  onChange={handleChange}
                  placeholder="Institution code"
                  required
                />

              </div>

              <div className="form-group">

                <label>
                  Official Email
                </label>

                <input
                  type="email"
                  name="institutionEmail"
                  value={formData.institutionEmail}
                  onChange={handleChange}
                  placeholder="admin@institution.edu"
                  required
                />

              </div>

              <div className="form-group">

                <label>
                  Institution Phone
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                  required
                />

              </div>

              <div className="form-group full-width">

                <label>
                  Website
                </label>

                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://www.example.edu"
                />

              </div>

              <div className="form-group full-width">

                <label>
                  Address
                </label>

                <input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Institution address"
                  required
                />

              </div>

              <div className="form-group">

                <label>
                  City
                </label>

                <input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  required
                />

              </div>

              <div className="form-group">

                <label>
                  State
                </label>

                <input
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State"
                  required
                />

              </div>

              <div className="form-group">

                <label>
                  Country
                </label>

                <input
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

          </div>

          <div className="form-section">

            <div className="section-heading">

              <h2>Administrator Information</h2>

              <p>
                Details of the person requesting institutional access.
              </p>

            </div>

            <div className="form-grid">

              <div className="form-group">

                <label>
                  Full Name
                </label>

                <input
                  name="adminName"
                  value={formData.adminName}
                  onChange={handleChange}
                  placeholder="Administrator name"
                  required
                />

              </div>

              <div className="form-group">

                <label>
                  Designation
                </label>

                <input
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  placeholder="e.g. Principal / Director"
                  required
                />

              </div>

              <div className="form-group">

                <label>
                  Official Email
                </label>

                <input
                  type="email"
                  name="adminEmail"
                  value={formData.adminEmail}
                  onChange={handleChange}
                  placeholder="administrator@institution.edu"
                  required
                />

              </div>

              <div className="form-group">

                <label>
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="adminPhone"
                  value={formData.adminPhone}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                  required
                />

              </div>

              <div className="form-group full-width">

                <label>
                  Employee / Administrator ID
                </label>

                <input
                  name="adminId"
                  value={formData.adminId}
                  onChange={handleChange}
                  placeholder="Enter official ID"
                  required
                />

              </div>

            </div>

          </div>

          <div className="form-section">

            <div className="section-heading">

              <h2>Secure Access</h2>

              <p>
                Create credentials for the initial management account.
              </p>

            </div>

            <div className="form-grid">

              <div className="form-group">

                <label>
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create password"
                  minLength={8}
                  required
                />

              </div>

              <div className="form-group">

                <label>
                  Confirm Password
                </label>

                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  minLength={8}
                  required
                />

              </div>

            </div>

          </div>

          {message && (
            <div className="management-message">
              {message}
            </div>
          )}

          <button
            type="submit"
            className="management-submit"
            disabled={loading}
          >
            {loading ? (
              "Submitting Request..."
            ) : (
              <>
                Request Management Access
                <ArrowRight size={18} />
              </>
            )}
          </button>

        </form>

        <div className="management-security">

          <ShieldCheck size={17} />

          <span>
            Management access requires institutional verification
            and authorization.
          </span>

        </div>

        <div className="management-footer">

          <span>
            Already have management access?
          </span>

          <Link to="/login?role=management">
            Login
          </Link>

        </div>

      </div>

    </main>
  );
}

export default ManagementAccessRequestPage;