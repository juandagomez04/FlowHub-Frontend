import { Outlet } from 'react-router-dom'
import '../pages/css/AuthPage.css'

export default function AuthLayout() {
  return (
    <div className="auth-layout">
      <div className="auth-card">
        <h1 className="auth-title">FlowHub</h1>
        <Outlet />
      </div>
    </div>
  )
}
