import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import "./Login.css";
import GoogleLoginButton from "../components/GoogleLoginButton";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/api/auth/login", form, {
        withCredentials: true,
      });

      if (res.status === 200 && res.data?.user) {
        // ✅ Cookies are automatically stored; just update context
        setUser(res.data.user);
        navigate("/dashboard");
      } else {
        alert(res.data?.message || "Login failed");
      }
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || "Login failed";
      if (msg.toLowerCase().includes("verify")) {
        alert("Please verify your email first.");
      } else {
        alert(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      {/* Left Side (Form) */}
      <div className="login-left">
        <div className="login-box">
          <h1 className="welcome-title">
            Hello, <br />
            Welcome Back
          </h1>
          <p className="welcome-subtitle">
            Hey, welcome back to your special place
          </p>

          <form onSubmit={handleSubmit}>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <div className="login-options">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <span className="forgot-link">Forgot Password?</span>
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Loading..." : "Login"}
            </button>
          </form>
          <GoogleLoginButton />
          <p className="signup-text">
            Don’t have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>

      {/* Right Side (Illustration) */}
      <div className="login-right">
        <img
          src="https://i.pinimg.com/736x/7f/1c/2d/7f1c2d7014ec2f2d4c27591b57472aff.jpg"
          alt="login illustration"
        />
      </div>
    </div>
  );
};

export default Login;
