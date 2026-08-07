import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import './css/AppLayout.css'
import {
  AutomationsIcon,
  BellIcon,
  BrandMarkIcon,
  ChevronDownIcon,
  ConnectorsIcon,
  DashboardIcon,
  HistoryIcon,
  LogoutIcon,
} from './icons/NavIcons'

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: DashboardIcon, end: true },
  { to: '/automations', label: 'Automatizaciones', icon: AutomationsIcon },
  { to: '/connectors', label: 'Conectores', icon: ConnectorsIcon, end: true },
  { to: '/history', label: 'Historial', icon: HistoryIcon, end: true },
]

const PAGE_TITLES = [
  { match: '/dashboard', title: 'Panel de control' },
  { match: '/automations', title: 'Automatizaciones' },
  { match: '/connectors', title: 'Conectores' },
  { match: '/history', title: 'Historial de ejecuciones' },
]

export default function AppLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  const navListRef = useRef(null)
  const actionsRef = useRef(null)
  const [indicatorVars, setIndicatorVars] = useState(null)
  const [notifOpen, setNotifOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  useLayoutEffect(() => {
    function measure() {
      const activeLink = navListRef.current?.querySelector('.app-nav-link.is-active')
      if (!activeLink) return
      setIndicatorVars({
        '--nav-top': `${activeLink.offsetTop}px`,
        '--nav-left': `${activeLink.offsetLeft}px`,
        '--nav-h': `${activeLink.offsetHeight}px`,
        '--nav-w': `${activeLink.offsetWidth}px`,
      })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [location.pathname])

  useEffect(() => {
    if (!notifOpen && !userMenuOpen) return
    function handlePointerDown(event) {
      if (actionsRef.current && !actionsRef.current.contains(event.target)) {
        setNotifOpen(false)
        setUserMenuOpen(false)
      }
    }
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setNotifOpen(false)
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [notifOpen, userMenuOpen])

  const pageTitle = PAGE_TITLES.find((entry) => location.pathname.startsWith(entry.match))?.title ?? 'FlowHub'
  const displayName = user?.name ?? 'Usuario'
  const initial = displayName.charAt(0).toUpperCase()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="app-layout">
      <aside className="app-aside">
        <Link to="/dashboard" className="app-brand" title="FlowHub" aria-label="FlowHub">
          <span className="app-brand-mark">
            <BrandMarkIcon width={18} height={18} />
          </span>
          <span className="app-brand-text">FlowHub</span>
        </Link>

        <nav className="app-nav" ref={navListRef}>
          {indicatorVars && <span className="app-nav-indicator" style={indicatorVars} aria-hidden="true" />}
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => `app-nav-link${isActive ? ' is-active' : ''}`}
              title={label}
              aria-label={label}
            >
              <Icon width={22} height={22} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="app-logout"
          onClick={handleLogout}
          title="Cerrar sesión"
          aria-label="Cerrar sesión"
        >
          <LogoutIcon width={19} height={19} />
          <span>Cerrar sesión</span>
        </button>
      </aside>

      <div className="app-main">
        <header className="app-topbar">
          <h1 className="app-topbar-title">{pageTitle}</h1>

          <div className="app-topbar-actions" ref={actionsRef}>
            <div className="app-notif">
              <button
                type="button"
                className="app-icon-button"
                onClick={() => {
                  setNotifOpen((value) => !value)
                  setUserMenuOpen(false)
                }}
                aria-haspopup="true"
                aria-expanded={notifOpen}
                aria-label="Notificaciones"
              >
                <BellIcon width={20} height={20} />
              </button>
              {notifOpen && (
                <div className="app-notif-panel" role="menu">
                  <p className="app-notif-title">Notificaciones</p>
                  <p className="app-notif-empty">No tenés notificaciones nuevas.</p>
                </div>
              )}
            </div>

            <div className="app-user">
              <button
                type="button"
                className="app-user-trigger"
                onClick={() => {
                  setUserMenuOpen((value) => !value)
                  setNotifOpen(false)
                }}
                aria-haspopup="true"
                aria-expanded={userMenuOpen}
              >
                <span className="app-user-avatar">{initial}</span>
                <span className="app-user-name">{displayName}</span>
                <ChevronDownIcon />
              </button>
              {userMenuOpen && (
                <div className="app-user-menu" role="menu">
                  <button type="button" className="app-user-menu-item" onClick={handleLogout} role="menuitem">
                    <LogoutIcon />
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="app-content" key={location.pathname}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
