import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function Verify() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await api.get(`/api/auth/verify/${token}`);
        if (!res) {
          console.log("response problem ");
          alert("resp problem ");
        }
       // setMessage(res.data)
        if (res.data.status) {
          setMessage("Email verified successfully! Redirecting...");
          setTimeout(() => navigate("/verify-success"), 2000);
        }
      } catch (err) {
        console.error(err);
        setMessage(
          err?.response?.data?.message ||
            "Invalid or expired verification link."
        );
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>{message}</h1>
    </div>
  );
}
