// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Check if user is logged in using cookies
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/api/auth/dashboard", { withCredentials: true });
        if (res.data?.user) {
          setUser(res.data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.warn("Auth check failed:", err.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  // ✅ Logout function
  const logout = async () => {
    try {
      await api.get("/api/auth/logout", { withCredentials: true });
    } catch (err) {
      console.warn("Logout request failed:", err.message);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
