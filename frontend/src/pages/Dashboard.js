import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import MapComponent from "../components/MapComponent";
import "./dashboard.css";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";   // ✅ Translation import

const Dashboard = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useTranslation();  

  // Fetch incidents from backend
  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const res = await api.get("/api/incidents");
        setIncidents(res.data || []);
      } catch (err) {
        console.error("Error fetching incidents:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchIncidents();
  }, []);

  return (
    <div>
      <div className="dashboard-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <h2 className="logo">{t("SafetyApp")}</h2>
          <ul className="menu">
            <li className="active">{t("dashboard")}</li>
            <li onClick={() => navigate("/report")}>{t("Report Incident")}</li>
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
        <main className="main-content">
          {/* Topbar */}
          <header className="topbar">
            <span className="app-title">
              {t("Hey")}, {user?.name ?? t("Guest")}
            </span>
            <div className="dashboard-search">
              <input
                type="text"
                placeholder={t("Search incidents, alerts, or safe routes...")}
                className="search-input"
              />
              <button className="search-btn">{t("Search")}</button>
            </div>

            <div className="profile">
              <span className="bell">🔔</span>
              <img
                src="https://media.licdn.com/dms/image/v2/D4E03AQFLncf9MjIMcg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1723647237095?e=1760572800&v=beta&t=e_f0m5uL9aZn9Vo6Fh3HPm-Ds50PAO14GdvEBi3RV_A"
                alt="profile"
                className="profile-pic"
              />
            </div>
          </header>

          {/* Hero Section */}
          <section className="hero">
            <div className="hero-text">
              <h1>{t("Stay Safe, Stay Connected")}</h1>
              <p>
                {t(
                  "From real-time safety alerts to easy incident reporting and a supportive community network, Our platform ensures that you are never alone — your digital safety companion, ready to protect you wherever you are."
                )}
              </p>
              <div className="hero-buttons">
                <button
                  className="btn-primary"
                  onClick={() => navigate("/report")}
                >
                  {t("Get Started")}
                </button>
                <button className="btn-secondary">{t("Learn More")}</button>
              </div>
            </div>
            <div className="hero-image">
              <img src="1.png" alt="safety" />
            </div>
          </section>

          {/* Tools Section */}
          <section className="tools">
            <h2 className="tools-title">{t("Powerful Safety Tools")}</h2>
            <p className="tools-subtitle">
              {t("Everything you need for peace of mind")}
            </p>

            <div className="tool-grid">
              <div className="tool-card">
                <div className="tool-icon">📌</div>
                <h3>{t("Report Incident")}</h3>
                <p>{t("Submit detailed reports with media and location.")}</p>
              </div>

              <div className="tool-card">
                <div className="tool-icon">🔔</div>
                <h3>{t("Live Safety Alerts")}</h3>
                <p>{t("Receive real-time notifications and updates.")}</p>
              </div>

              <div className="tool-card">
                <div className="tool-icon">📞</div>
                <h3>{t("Emergency Contacts")}</h3>
                <p>{t("Quick-dial trusted contacts and local services.")}</p>
              </div>

              <div className="tool-card">
                <div className="tool-icon">🛣️</div>
                <h3>{t("Safe Routes")}</h3>
                <p>{t("Explore recommended routes based on current data.")}</p>
              </div>
            </div>
          </section>

          {/* Map Section */}
          <section className="map-section">
            <h2>{t("Interactive Map Preview")}</h2>
            <p>{t("See safety insights around you")}</p>
            <div className="map-box">
              {loading ? (
                <div>{t("Loading map...")}</div>
              ) : (
                <MapComponent
                  incidents={incidents}
                  center={[20.5937, 78.9629]}
                  zoom={5}
                />
              )}
              <button
                onClick={() => navigate("/full-map")}
                style={{ marginTop: "10px" }}
              >
                {t("Open Full Map")}
              </button>
            </div>
          </section>

          {/* Nearby Alerts Section */}
          <section className="alerts-section">
            <div className="alerts-header">
              <h2>{t("Nearby Alerts")}</h2>
              <p>{t("Stay updated with real-time incident reports")}</p>
            </div>
            <div className="alerts-list">
              {loading && <div className="loading">{t("Loading alerts...")}</div>}
              {!loading && incidents.length === 0 && (
                <div className="no-alerts">{t("No incidents reported yet")}</div>
              )}
              {!loading &&
                incidents.slice(0, 3).map((inc) => (
                  <div
                    key={inc._id}
                    className={`alert-item ${
                      inc.status === "Resolved"
                        ? "green"
                        : inc.type === "Road Closure"
                        ? "red"
                        : "orange"
                    }`}
                  >
                    <div className="alert-info">
                      <div className="alert-type">{t(inc.type)}</div>
                      <div className="alert-status">
                        {t(inc.status || "Pending")}
                      </div>
                    </div>
                    <div className="alert-time">
                      {new Date(inc.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                ))}
            </div>
          </section>

          {/* Community Section */}
          <section className="community-section">
            <div className="trusted">
              <h2>{t("Trusted by the Community")}</h2>
              <p>{t("Growing network of vigilant users")}</p>

              <div className="stats-container">
                <div className="stat-box">
                  <h3>120,482</h3>
                  <span>{t("ACTIVE USERS")}</span>
                </div>
                <div className="stat-box">
                  <h3>58,930</h3>
                  <span>{t("REPORTS SUBMITTED")}</span>
                </div>
                <div className="stat-box">
                  <h3>44,715</h3>
                  <span>{t("ALERTS RESOLVED")}</span>
                </div>
              </div>
            </div>
            <div className="testimonials">
              <h2>{t("What People Say")}</h2>
              <p>{t("Real stories from our users")}</p>
              <div className="testimonial-cards">
                <div className="card">
                  <p>
                    {t(
                      '"The live alerts helped me avoid a dangerous area on my commute. Invaluable!"'
                    )}
                  </p>
                  <h4>
                    Alex Johnson <span>- {t("Commuter")}</span>
                  </h4>
                </div>
                <div className="card">
                  <p>
                    {t(
                      '"Reporting an incident was quick and easy. The community support is amazing."'
                    )}
                  </p>
                  <h4>
                    Priya Patel <span>- {t("Student")}</span>
                  </h4>
                </div>
                <div className="card">
                  <p>
                    {t(
                      '"Safe routes made late-night walks feel much safer. Highly recommend."'
                    )}
                  </p>
                  <h4>
                    Marcus Lee <span>- {t("Resident")}</span>
                  </h4>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <h2>{t("SafeGuard")}</h2>
            <p>
              {t(
                "Your trusted safety companion for alerts, reporting, and secure routes."
              )}
            </p>
          </div>
          <div className="footer-links">
            <h3>{t("Quick Links")}</h3>
            <ul>
              <li>
                <a href="#">{t("Home")}</a>
              </li>
              <li>
                <a href="#">{t("Report Incident")}</a>
              </li>
              <li>
                <a href="#">{t("Safety Alerts")}</a>
              </li>
              <li>
                <a href="#">{t("Contact Us")}</a>
              </li>
            </ul>
          </div>
          <div className="footer-contact">
            <h3>{t("Contact")}</h3>
            <p>Email: support@safeguard.com</p>
            <p>Phone: +91 98765 43210</p>
            <div className="social-icons">
              <a href="#">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 {t("SafeGuard")}. {t("All Rights Reserved.")}</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
