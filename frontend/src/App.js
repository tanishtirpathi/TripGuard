// src/App.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar";
import Login from "./pages/Login";
import Logout from "./pages/logout"
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ReportIncident from "./pages/ReportIncident";
import SOS from "./pages/SOS";
import AdminPanel from "./pages/AdminPanel";
import FullMap from "./pages/FullMap"; // <- import the new full map page
import ProtectedRoute from "./components/ProtectedRoute";
import Settings from "./pages/Settings";   // ✅ added
import News from "./pages/News";
import Instructions from "./pages/instructions";
import Chatbot from "./pages/chatbot";  // ✅ yaha sahi import
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/signup" element={<Signup />} />
        

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/logout"
          element={
            <ProtectedRoute>
              <Logout />
            </ProtectedRoute>
          }
        />
         <Route
          path="/news"
          element={
            <ProtectedRoute>
              <News />
            </ProtectedRoute>
          }
        />

        <Route
          path="/report"
          element={
            <ProtectedRoute>
              <ReportIncident />
            </ProtectedRoute>
          }
        /> 
        <Route
          path="/instructions"
          element={
            <ProtectedRoute>
              <Instructions />
            </ProtectedRoute>
          }
        /> 
        <Route 
          path="/chatbot" 
          element={
            <ProtectedRoute>
              <Chatbot />
            </ProtectedRoute>
          } 
        />

        <Route
          path="/sos"
          element={
            <ProtectedRoute>
              <SOS />
            </ProtectedRoute>
          }
        />

         {/* ✅ Settings Route */}
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />

        {/* New Full Map Route */}
        <Route
          path="/full-map"
          element={
            <ProtectedRoute>
              <FullMap />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
