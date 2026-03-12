import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserLayout from "./components/UserLayout";
import AdminLayout from "./components/AdminLayout";

import Dashboard from "./pages/Dashboard";
import Growth from "./pages/Growth";
import Credit from "./pages/Credit";
import SetTarget from "./pages/SetTarget";
import Copilot from "./pages/Copilot";

import AdminDashboard from "./admin/AdminDashboard";
import Users from "./admin/Users";
import Transactions from "./admin/Transactions";
import RiskMonitoring from "./admin/RiskMonitoring";
import Analytics from "./admin/Analytics";
import Alerts from "./admin/Alerts";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* USER PANEL */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="growth" element={<Growth />} />
          <Route path="credit" element={<Credit />} />
          <Route path="copilot" element={<Copilot />} />
          <Route path="set-target" element={<SetTarget />} />
        </Route>

        {/* ADMIN PANEL */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="risk" element={<RiskMonitoring />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="alerts" element={<Alerts />} />
        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;