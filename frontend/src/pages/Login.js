import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import "./Login.css"; // we'll style here

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/auth/login", form);
      const token = res.data.token;
      if (!token) throw new Error("No token received");
      login(token);
      navigate("/dashboard");
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || "Login failed";
      alert(msg);
    }
  };

  return (
    <div className="login-wrapper">
      {/* Left Side (Form) */}
      <div className="login-left">
        <div className="login-box">
          <h1 className="welcome-title">Hello, <br />Welcome Back</h1>
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

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>

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
