import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";  // ✅ Import translation
import "./Settings.css";

const SettingsPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(); // ✅ Translation hook

  return (
    <div className="settings-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">{t("SafeLink")}</h2>
        <ul className="menu">
            <li onClick={() => navigate("/dashboard")}>{t("dashboard")}</li>
            <li onClick={() => navigate("/report")}>{t("Report Incident")}</li>
            <li onClick={() => navigate("/news")}>{t("Live News")}</li>
            <li onClick={() => navigate("/full-map")}>{t("Map")}</li>
            <li onClick={() => navigate("/sos")}>{t("Emergency Contacts")}</li>
            <li onClick={() => navigate("/chatbot")}>{t("AI Assistant")}</li>
            <li onClick={() => navigate("/instructions")}>{t("Instructions")}</li>
            <li className="active" onClick={() => navigate("/settings")}>{t("Settings")}</li>
            <li onClick={() => navigate("/logout")}>{t("Logout")}</li>
          </ul>
      </aside>

      {/* Main Settings Page */}
      <main className="settings-main">
        <div className="settings-topbar">
          <h1>{t("Security Settings")}</h1>
          <p>{t("Manage password, Two-Factor Authentication and trusted devices.")}</p>
        </div>

        {/* Password Section */}
        <section className="settings-card">
          <h2>{t("Password")}</h2>
          <p>{t("Set a strong, unique password.")}</p>
          <button className="btn">{t("Reset Password")}</button>
        </section>

        {/* Two-Factor Authentication */}
        <section className="settings-card">
          <h2>{t("Two-Factor Authentication")}</h2>
          <p>{t("Add an extra layer of security to your account.")}</p>
          <label className="toggle">
            <input type="checkbox" defaultChecked />
            <span className="slider"></span>
          </label>
        </section>

        {/* Recovery Options */}
        <section className="settings-card">
          <h2>{t("Recovery Options")}</h2>
          <div className="recovery-grid">
            <input type="email" placeholder={t("name@domain.com")} />
            <input type="tel" placeholder="+1 555 0100" />
            <button className="btn">{t("Save recovery")}</button>
          </div>
        </section>

        {/* Trusted Devices */}
        <section className="settings-card">
          <h2>{t("Trusted Devices")}</h2>
          <table className="device-table">
            <thead>
              <tr>
                <th>{t("Device")}</th>
                <th>{t("Last Seen")}</th>
                <th>{t("Action")}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Chrome on MacBook Pro</td>
                <td>{t("2 hours ago")}</td>
                <td><button className="btn-remove">{t("Remove")}</button></td>
              </tr>
              <tr>
                <td>iPhone 15 Pro</td>
                <td>{t("Yesterday")}</td>
                <td><button className="btn-remove">{t("Remove")}</button></td>
              </tr>
            </tbody>
          </table>
          <button className="btn">{t("Add device")}</button>
        </section>

        {/* Privacy Controls */}
        <section className="settings-card">
          <h2>{t("Privacy Controls")}</h2>
          <div className="privacy-controls">
            <label>{t("Reports visibility")}</label>
            <select>
              <option>{t("My Team")}</option>
              <option>{t("Everyone")}</option>
              <option>{t("Private")}</option>
            </select>

            <label>{t("Blocked users")}</label>
            <div className="blocked-list">
              <span className="blocked-user">spam_user</span>
            </div>
          </div>
        </section>

        <div className="settings-card">
          <h2>{t("System Settings")}</h2>
          <p className="subtitle">{t("Admin-only controls for roles, backups and versioning.")}</p>

          {/* Manage user roles */}
          <div className="section">
            <h3>{t("Manage user roles")}</h3>
            <div className="role-row">
              <span>Alice</span>
              <select>
                <option>{t("Member")}</option>
                <option>{t("Admin")}</option>
                <option>{t("Viewer")}</option>
              </select>
            </div>
            <div className="role-row">
              <span>Charlie</span>
              <select>
                <option>{t("Member")}</option>
                <option>{t("Admin")}</option>
                <option>{t("Viewer")}</option>
              </select>
            </div>
          </div>

          {/* Backup & restore */}
          <div className="section">
            <h3>{t("Data backup & restore")}</h3>
            <button className="btn primary">{t("Backup now")}</button>
            <button className="btn secondary">{t("Restore")}</button>
          </div>

          {/* App version */}
          <div className="section version">
            <h3>{t("App version")}</h3>
            <p>v1.0.0 • {t("Up to date")}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
