import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Toaster } from 'sonner';
import { Layout } from './Layout';
import { LandingPage } from './pages/User/LandingPage';
import { LoginPage } from './pages/User/LoginPage';
import { RegisterPage } from './pages/User/RegisterPage';
import { DriverRegisterPage } from './pages/Captain/DriverRegisterPage';
import { DashboardPage } from './pages/User/DashboardPage';
import { AvailableCabsPage } from './pages/User/AvailableCabsPage';
import { RideTrackingPage } from './pages/User/RideTrackingPage';
import { HistoryPage } from './pages/User/HistoryPage';
import { PaymentPage } from './pages/User/PaymentPage';

export default function App() {
  return (
    <AppProvider>
      <Toaster position="top-center" richColors closeButton />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="driver-register" element={<DriverRegisterPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="cabs" element={<AvailableCabsPage />} />
            <Route path="ride-tracking" element={<RideTrackingPage />} />
            <Route path="history" element={<HistoryPage />} />
            <Route path="payment" element={<PaymentPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
