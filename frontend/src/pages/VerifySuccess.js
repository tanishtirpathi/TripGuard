// src/pages/VerifySuccess.js
import React from "react";
import { Link } from "react-router-dom";

export default function VerifySuccess() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Email Verified ✅</h1>
      <p>Your email has been verified successfully.</p>
      <Link to="/login">Go to Login</Link>
    </div>
  );
}
