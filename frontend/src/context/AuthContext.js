import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔁 Runs ONCE when app loads / refreshes
  const checkAuth = async () => {
    try {
      const res = await api.get("/api/auth/dashboard", {
        withCredentials: true,
      });

      setUser(res.data.user || null);
      console.log(user)
    } catch (err) {
      // 401 is NORMAL when not logged in
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // 🚪 Logout
const logout = async () => {
  try {
    // Call your backend logout endpoint
    await api.get("/api/auth/logout", { withCredentials: true });

    // Clear all cookies
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    // Clear localStorage
    localStorage.clear();

    // Clear sessionStorage
    sessionStorage.clear();

    // Clear React state
    setUser(null);
  } catch (err) {
    console.warn("Logout failed:", err.message);
  }
};


  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,      // 🔥 IMPORTANT: used after Google login
        logout,
        loading,
        checkAuth,    // 🔥 OPTIONAL but powerful (manual recheck)
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
