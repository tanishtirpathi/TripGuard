import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./News.css";

const News = () => {
  const [news, setNews] = useState([]);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Check cache first
    const cachedNews = localStorage.getItem("newsData");
    if (cachedNews) {
      setNews(JSON.parse(cachedNews));
      setLoading(false);
    }

    const fetchNews = async (lat, lon) => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://safion-app.onrender.com/api/news?lat=${lat}&lon=${lon}`
        );
        if (!res.ok) throw new Error("Failed to fetch news");

        const data = await res.json();
        setCity(data.data.city);
        setNews(data.data.news);
        localStorage.setItem("newsData", JSON.stringify(data.data.news));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchNews(pos.coords.latitude, pos.coords.longitude),
        () => {
          setError("❌ Location access denied.");
          setLoading(false);
        }
      );
    } else {
      setError("❌ Geolocation not supported.");
      setLoading(false);
    }
  }, []);

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">SafetyApp</h2>
        <ul className="menu">
            <li onClick={() => navigate("/dashboard")}>{("dashboard")}</li>
            <li onClick={() => navigate("/report")}>{("Report Incident")}</li>
            <li className="active" onClick={() => navigate("/news")}>{("Live News")}</li>
            <li onClick={() => navigate("/full-map")}>{("Map")}</li>
            <li onClick={() => navigate("/sos")}>{("Emergency Contacts")}</li>
            <li onClick={() => navigate("/chatbot")}>{("AI Assistant")}</li>
            <li onClick={() => navigate("/instructions")}>{("Instructions")}</li>
            <li onClick={() => navigate("/settings")}>{("Settings")}</li>
            <li onClick={() => navigate("/logout")}>{("Logout")}</li>
          </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <h2>News - {city}</h2>

        {/* Loading state */}
        {loading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Fetching latest news...</p>
          </div>
        )}

        {/* Error state */}
        {error && <p className="error">{error}</p>}

        {/* News list */}
        {!loading && !error && (
          <div className="news-list">
            {news.length === 0 && <p>No news found.</p>}
            {news.map((n, i) => (
              <div key={i} className="news-card">
                <img
                  src={n.image_url || "/placeholder.png"}
                  alt={n.title}
                  className="news-image"
                />
                <div className="news-content">
                  <h3>{n.title}</h3>
                  <p>
                    {n.description
                      ? n.description.split(" ").slice(0, 30).join(" ") + "..."
                      : "No description available."}
                  </p>
                  <Link to={`/news/${i}`}>Read more →</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default News;
