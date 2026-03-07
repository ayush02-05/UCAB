import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "../app/Layout";
import { LandingPage } from "../app/pages/User/LandingPage";
import { LoginPage } from "../app/pages/User/LoginPage";
import { RegisterPage } from "../app/pages/User/RegisterPage";
import { DriverRegisterPage } from "../app/pages/Captain/DriverRegisterPage";
import { DashboardPage } from "../app/pages/User/DashboardPage";
import { AvailableCabsPage } from "../app/pages/User/AvailableCabsPage";
import { RideTrackingPage } from "../app/pages/User/RideTrackingPage";
import { HistoryPage } from "../app/pages/User/HistoryPage";
import { PaymentPage } from "../app/pages/User/PaymentPage";
import { DriverLogin } from "../app/pages/Captain/DriverLogin";
import DriverDashboard from "../app/pages/Captain/DriverDashboard";
import UserProtectedRoute from "./ProtectedRoutes/UserProtectedRoute";
import CaptainProtectedRoute from "./ProtectedRoutes/CaptainProtectedRoute";

function MainRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          {/* Users */}
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route
            path="dashboard"
            element={
              <UserProtectedRoute>
                <DashboardPage />
              </UserProtectedRoute>
            }
          />
          <Route path="cabs" element={<AvailableCabsPage />} />
          <Route path="ride-tracking" element={<RideTrackingPage />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="payment" element={<PaymentPage />} />
          {/* Drivers */}
          <Route path="captain-login" element={<DriverLogin />} />
          <Route path="captain-register" element={<DriverRegisterPage />} />
          <Route
            path="captain-dashboard"
            element={
              <CaptainProtectedRoute>
                <DriverDashboard />
              </CaptainProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default MainRoutes;
