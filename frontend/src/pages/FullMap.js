import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const FullMap = () => {
  const mapRef = useRef(null);
  const navigate = useNavigate();
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("full-map").setView([20.5937, 78.9629], 5);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(mapRef.current);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (pos) => {
            const { latitude, longitude } = pos.coords;

            // ✅ User marker
            const userMarker = L.marker([latitude, longitude]).addTo(mapRef.current);
            userMarker.bindPopup("📍 You are here").openPopup();
            mapRef.current.setView([latitude, longitude], 13);

            try {
              // ✅ Fetch weather
              const weatherRes = await fetch(
                `https://api.weatherapi.com/v1/current.json?key=00bf073c6ee54b3786f81127250807&q=${latitude},${longitude}`
              );
              const weatherData = await weatherRes.json();
              setWeather(weatherData);

              // ✅ 1. Fetch nearby incidents count (for zone)
              const zoneRes = await fetch(
                `https://safion-app.onrender.com/api/incidents/nearby?lat=${latitude}&lng=${longitude}`
              );
              const zoneData = await zoneRes.json();
              const count = zoneData.count || 0;

              // ✅ Zone color logic
              let color = "green";
              if (count > 5) color = "red";
              else if (count > 0) color = "orange";

              // ✅ Draw circle zone
              L.circle([latitude, longitude], {
                radius: 10000, // 10 km
                color,
                fillColor: color,
                fillOpacity: 0.4,
              })
                .addTo(mapRef.current)
                .bindPopup(
                  `Zone Status: <b style="color:${color}">${color.toUpperCase()}</b><br/>Incidents nearby: ${count}`
                );

              // ✅ 2. Fetch all incidents (for markers)
              const allRes = await fetch("https://safion-app.onrender.com/api/incidents", {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`, // auth header
                },
              });
              const incidents = await allRes.json();

              incidents.forEach((inc) => {
                if (inc.location?.lat && inc.location?.lng) {
                  const marker = L.marker([inc.location.lat, inc.location.lng]).addTo(mapRef.current);
                  marker.bindPopup(
                    `<b>${inc.type}</b><br/>${inc.description || "No description"}<br/><i>Status: ${inc.status}</i>`
                  );
                }
              });
            } catch (err) {
              console.error("Map data fetch error:", err);
            }
          },
          (err) => {
            console.error("Geolocation error:", err);
          }
        );
      }
    }
  }, []);

  return (
    <div style={{ position: "relative" }}>
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          zIndex: 1000,
          padding: "10px 15px",
          borderRadius: "6px",
          border: "none",
          background: "#0043ce",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        ← Back
      </button>

      {/* ✅ Weather Widget */}
      {weather && (
        <div
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            zIndex: 1000,
            background: "#fff",
            padding: "12px 16px",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
            minWidth: "160px",
            textAlign: "center",
          }}
        >
          <h4 style={{ margin: "0 0 6px", fontWeight: "bold" }}>🌦 Weather</h4>
          <p style={{ margin: "2px 0" }}>{weather.location.name}</p>
          <p style={{ margin: "2px 0" }}>
            {weather.current.temp_c}°C – {weather.current.condition.text}
          </p>
          <img src={weather.current.condition.icon} alt="weather" />
        </div>
      )}

      {/* Map Container */}
      <div id="full-map" style={{ height: "100vh", width: "100%" }}></div>
    </div>
  );
};

export default FullMap;
