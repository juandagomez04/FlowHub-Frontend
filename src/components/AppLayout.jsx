import { Outlet, Link } from 'react-router-dom'
import './css/AppLayout.css'

export default function AppLayout() {
  return (
    <div className="app-layout">
      <aside className="app-aside">
        <span className="app-brand">FlowHub</span>
        <Link to="/dashboard" className="app-nav-link">Dashboard</Link>
        <Link to="/automations" className="app-nav-link">Automatizaciones</Link>
        <Link to="/connectors" className="app-nav-link">Conectores</Link>
        <Link to="/history" className="app-nav-link">Historial</Link>
      </aside>

      <div className="app-main">
        <nav className="app-topbar">
          <span>Panel de control</span>
        </nav>
        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
