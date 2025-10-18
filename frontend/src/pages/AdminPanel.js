import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminPanel.css";
import { useAuth } from "../context/AuthContext";
const AdminPanel = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const reports = [
    {
      id: "RPT-1024",
      title: "Suspicious Activity near North Gate",
      date: "9/1/2025",
      status: "Resolved",
    },
    {
      id: "RPT-1023",
      title: "Unauthorized Access Attempt",
      date: "8/28/2025",
      status: "In Review",
    },
    {
      id: "RPT-1022",
      title: "Emergency Drill Feedback",
      date: "8/18/2025",
      status: "Open",
    },
    {
      id: "RPT-1021",
      title: "Lost ID Card",
      date: "8/10/2025",
      status: "Resolved",
    },
    {
      id: "RPT-1020",
      title: "Fire Alarm Malfunction",
      date: "8/3/2025",
      status: "In Review",
    },
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">SafetyApp</h2>
        <ul className="menu">
          <li className="active">Dashboard</li>
          <li onClick={() => navigate("/report")}>Report Incident</li>
          <li>Live News</li>
          <li>Safe Routes</li>
          <li onClick={() => navigate("/sos")}>Emergency Contacts</li>
          <li onClick={() => navigate("/settings")}>Settings</li>{" "}
          {/* ✅ Updated */}
          <li onClick={() => navigate("/login")}>Logout</li>
        </ul>
      </aside>
      {/* Main Content */}
      <div className="admin-content">
        {/* Profile Header */}
        <div className="admin-header">
          <div className="profile-card">
            <img
              src="https://media.licdn.com/dms/image/v2/D4E03AQFLncf9MjIMcg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1723647237095?e=1760572800&v=beta&t=e_f0m5uL9aZn9Vo6Fh3HPm-Ds50PAO14GdvEBi3RV_A"
              alt="profile"
              className="profile-img"
            />
            <div className="profile-info">
              <h2>{user.name}</h2>
              <span className="role">Admin</span>
              <p>{user.email}</p>
              <p>+91 ***********</p>
            </div>
            <div className="profile-actions">
              <button className="edit-btn">Edit Profile</button>
              <button className="security-btn">Security Check</button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs">
          <button className="tab active">My Reports</button>
          <button className="tab">Security Settings</button>
          <button className="tab">Activity Logs</button>
        </div>

        {/* Reports List */}
        <div className="reports-list">
          {reports.map((report) => (
            <div key={report.id} className="report-card">
              <div className="report-info">
                <h4>{report.title}</h4>
                <span className="report-id">{report.id}</span> •{" "}
                <span className="report-date">{report.date}</span>
              </div>
              <div
                className={`status ${report.status
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                {report.status}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="quick-stats">
          <h3>Quick Stats</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <p>Reports Submitted</p>
              <h2>128</h2>
              <span className="positive">+4 this week</span>
            </div>
            <div className="stat-card">
              <p>Alerts Resolved</p>
              <h2>86</h2>
              <span className="positive">+2 today</span>
            </div>
            <div className="stat-card">
              <p>Communities Joined</p>
              <h2>5</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
