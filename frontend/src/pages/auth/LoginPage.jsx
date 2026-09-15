import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {

        localStorage.setItem(
          "user",
          JSON.stringify(data.user || {})
        );

        setMessage("Login successful!");

        setTimeout(() => {
          navigate("/dashboard");
        }, 700);

      } else {

        setMessage(
          data.message || "Invalid email or password."
        );

      }

    } catch (error) {

      console.error(error);

      setMessage(
        "Unable to connect to the EduNexus backend."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <main className="login-page">

      <div className="login-card">

        <div className="login-brand-icon">
          E
        </div>

        <span className="login-label">
          EDUNEXUS AI ERP
        </span>

        <h1>Welcome back.</h1>

        <p className="login-description">
          Sign in to access your EduNexus workspace.
        </p>

        <form onSubmit={handleLogin}>

          <label>Email Address</label>

          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="login-submit"
          >
            {loading
              ? "Signing in..."
              : "Sign In →"}
          </button>

        </form>

        {message && (
          <div className="login-message">
            {message}
          </div>
        )}

        <button
          className="back-home"
          onClick={() => navigate("/")}
        >
          ← Back to Home
        </button>

      </div>

    </main>
  );
}

export default LoginPage;