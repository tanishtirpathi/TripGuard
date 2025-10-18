// src/components/Navbar.js
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logout from "../pages/logout"
import { useTranslation } from "react-i18next";
import "./navbar.css";

const languages = [
  { code: "en", label: "English" },
  { code: "hi", label: "Hindi" },
  { code: "pa", label: "Punjabi" },
  { code: "fe", label: "French" },
  { code: "ch", label: "Chinese" },
  { code: "ar", label: "Arabic" },
  { code: "sp", label: "Spanish" },

 
  // add more languages if needed
];

const Navbar = () => {
  const { user } = useAuth();
    const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef();

  const handleLogout = () => {
    Logout();
    navigate("/login");
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLangOpen(false);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">
        ✨ TripGuard
        </Link>
      </div>

      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        {user ? (
          <>
            <Link to="/dashboard">{t("dashboard")}</Link>
            <Link to="/report">{t("report")}</Link>
            <Link to="/sos">{t("sos")}</Link>
            <Link to="/admin">{t("admin")}</Link>

            {/* ✅ Custom Scrollable Language Selector */}
            <div className="lang-dropdown" ref={langRef}>
              <button
                className="dropdown-btn"
                onClick={() => setLangOpen(!langOpen)}
              >
                {languages.find((l) => l.code === i18n.language)?.label || "Language"}
              </button>
              {langOpen && (
                <ul className="dropdown-list">
                  {languages.map((lang) => (
                    <li key={lang.code} onClick={() => changeLanguage(lang.code)}>
                      {lang.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        ) : (
          <>
            <Link to="/login">{t("login")}</Link>
            <Link to="/signup" className="signup-btn">
              {t("signup")}
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
