import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import UserLayout from "./components/UserLayout";
import AdminLayout from "./components/AdminLayout";

import Dashboard from "./pages/Dashboard";
import Growth from "./pages/Growth";
import Credit from "./pages/Credit";
import SetTarget from "./pages/SetTarget";
import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminDashboard from "./admin/AdminDashboard";
import Users from "./admin/Users";
import Transactions from "./admin/Transactions";
import RiskMonitoring from "./admin/RiskMonitoring";
import Analytics from "./admin/Analytics";
import Alerts from "./admin/Alerts";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check session data
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const admin = localStorage.getItem("isAdmin") === "true";
    setIsAuthenticated(loggedIn);
    setIsAdmin(admin);
    setLoading(false);
  }, []);

  if (loading) {
    return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#020617', color: '#38bdf8' }}>Loading ArthaVerse...</div>;
  }

  return (
    <BrowserRouter>

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/login" element={isAuthenticated ? (isAdmin ? <Navigate to="/admin" /> : <Navigate to="/dashboard" />) : <Login />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />} />

        {/* USER PANEL */}

        <Route element={isAuthenticated ? <UserLayout /> : <Navigate to="/login" />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/growth" element={<Growth />} />
          <Route path="/credit" element={<Credit />} />
          <Route path="/set-target" element={<SetTarget />} />
        </Route>

        {/* ADMIN PANEL */}

        <Route path="/admin" element={isAdmin ? <AdminLayout /> : <Navigate to="/login" />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="risk" element={<RiskMonitoring />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="alerts" element={<Alerts />} />
        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;