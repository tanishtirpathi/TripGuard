// src/pages/Signup.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import "./Login.css"; // reuse same styles for consistency

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/api/auth/signup", form);

      if (res.status === 200 || res.status === 201) {
        navigate("/dashboard");
      } else {
        alert(res.data?.message || "Signup failed");
      }
    } catch (err) {
      const msg =
        err?.response?.data?.message || err.message || "Signup failed";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      {/* Left Side (Form) */}
      <div className="login-left">
        <div className="login-box">
          <h1 className="welcome-title">Create Account</h1>
          <p className="welcome-subtitle">
            Join us and start your journey securely
          </p>

          <form onSubmit={handleSubmit}>
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />
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
              placeholder="Create a password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "loading....." : "sign up "}
            </button>
          </form>

          <p className="signup-text">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>

      {/* Right Side (Illustration) */}
      <div className="login-right">
        <img
          src="https://i.pinimg.com/736x/7f/1c/2d/7f1c2d7014ec2f2d4c27591b57472aff.jpg"
          alt="signup illustration"
        />
      </div>
    </div>
  );
};

export default Signup;
