import { Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import AuthLayout from './components/AuthLayout'
import ProtectedRoute from './components/ProtectedRoute'

import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import LandingPage from './pages/LandingPage'
import DashboardPage from './pages/DashboardPage'
import AutomationsListPage from './pages/AutomationsListPage'
import AutomationBuilderPage from './pages/AutomationBuilderPage'
import ConnectorsPage from './pages/ConnectorsPage'
import ExecutionHistoryPage from './pages/ExecutionHistoryPage'
import ProfilePage from './pages/ProfilePage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/automations" element={<AutomationsListPage />} />
          <Route path="/automations/new" element={<AutomationBuilderPage />} />
          <Route path="/automations/:id" element={<AutomationBuilderPage />} />
          <Route path="/connectors" element={<ConnectorsPage />} />
          <Route path="/history" element={<ExecutionHistoryPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
