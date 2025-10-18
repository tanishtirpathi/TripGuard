import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import "./ReportIncident.css";
import { useTranslation } from "react-i18next";  // ✅ Translation

const ReportIncident = () => {
  const { t } = useTranslation(); // ✅ Hook
  const [form, setForm] = useState({
    title: "",
    type: "theft",
    description: "",
    lat: "",
    lng: "",
    dateTime: "",
    evidence: null,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/incidents", {
        title: form.title,
        type: form.type,
        description: form.description,
        dateTime: form.dateTime,
        location: {
          lat: parseFloat(form.lat),
          lng: parseFloat(form.lng),
        },
      });

      alert(t("Incident reported successfully"));
      navigate("/dashboard");
    } catch (err) {
      const msg =
        err?.response?.data?.message || err.message || t("Failed to report");
      alert(msg);
    }
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">{t("SafetyApp")}</h2>
        <ul className="menu">
            <li onClick={() => navigate("/dashboard")}>{t("dashboard")}</li>
            <li className="active" onClick={() => navigate("/report")}>{t("Report Incident")}</li>
            <li onClick={() => navigate("/news")}>{t("Live News")}</li>
            <li onClick={() => navigate("/full-map")}>{t("Map")}</li>
            <li onClick={() => navigate("/sos")}>{t("Emergency Contacts")}</li>
            <li onClick={() => navigate("/chatbot")}>{t("AI Assistant")}</li>
            <li onClick={() => navigate("/instructions")}>{t("Instructions")}</li>
            <li onClick={() => navigate("/settings")}>{t("Settings")}</li>
            <li onClick={() => navigate("/logout")}>{t("Logout")}</li>
          </ul>
      </aside>

      {/* Main Content */}
      <div className="admin-content">
        <h2 className="report-title">{t("Report Incident")}</h2>
        <form className="report-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>{t("Title")}</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder={t("Concise incident title")}
              className="form-input"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group half">
              <label>{t("Location (Latitude)")}</label>
              <input
                name="lat"
                value={form.lat}
                onChange={handleChange}
                placeholder={t("e.g. 28.7041")}
                className="form-input"
                required
              />
            </div>
            <div className="form-group half">
              <label>{t("Location (Longitude)")}</label>
              <input
                name="lng"
                value={form.lng}
                onChange={handleChange}
                placeholder={t("e.g. 77.1025")}
                className="form-input"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group half">
              <label>{t("Category")}</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="form-input"
                required
              >
                <option value="theft">{t("Theft")}</option>
                <option value="harassment">{t("Harassment")}</option>
                <option value="accident">{t("Accident")}</option>
                <option value="fire">{t("Fire")}</option>
                <option value="flood">{t("Flood")}</option>
              </select>
            </div>
            <div className="form-group half">
              <label>{t("Date & Time")}</label>
              <input
                type="datetime-local"
                name="dateTime"
                value={form.dateTime}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>{t("Description")}</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={5}
              className="form-input"
              placeholder={t("Provide details about the incident")}
            />
          </div>

          <div className="form-group">
            <label>{t("Evidence (Image/Video)")}</label>
            <input
              type="file"
              name="evidence"
              accept="image/*,video/*"
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              {t("Submit Report")}
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate("/dashboard")}
            >
              {t("Cancel")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportIncident;
