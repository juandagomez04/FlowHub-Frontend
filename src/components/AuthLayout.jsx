import { Link, Outlet, useLocation } from 'react-router-dom'
import '../pages/css/AuthPage.css'
import { BrandMarkIcon } from './icons/NavIcons'

const PANEL_CONTENT = {
  login: {
    headline: 'Bienvenido de nuevo',
    subhead: 'Iniciá sesión para seguir gestionando tus conectores y automatizaciones.',
  },
  register: {
    headline: 'Conectá. Automatizá. Ahorrá tiempo.',
    subhead: 'Creá tu cuenta para empezar a construir automatizaciones con tus apps favoritas.',
  },
}

export default function AuthLayout() {
  const { pathname } = useLocation()
  const isRegister = pathname.startsWith('/register')
  const content = isRegister ? PANEL_CONTENT.register : PANEL_CONTENT.login

  return (
    <div className={`auth-shell ${isRegister ? 'auth-shell--mirrored' : ''}`}>
      <aside className="auth-panel">
        <div className="auth-panel-graphic">{isRegister ? <NetworkGraphic /> : <FlowGraphic />}</div>

        <div className="auth-panel-top">
          <Link to="/" className="auth-brand">
            <span className="auth-brand-mark">
              <BrandMarkIcon />
            </span>
            FlowHub
          </Link>
          <Link to="/" className="auth-panel-back">
            <BackIcon />
            Volver al inicio
          </Link>
        </div>

        <div className="auth-panel-bottom">
          <h1>{content.headline}</h1>
          <p>{content.subhead}</p>
        </div>
      </aside>

      <main className="auth-form-panel">
        <div className="auth-form-panel-inner">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  )
}

function FlowGraphic() {
  return (
    <svg viewBox="0 0 480 800" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden="true">
      <path
        d="M40 680 C 120 620, 100 520, 190 470 C 280 420, 260 320, 360 260 C 410 230, 420 160, 400 90"
        stroke="rgba(122,182,235,0.18)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        className="auth-flow-line"
        d="M40 680 C 120 620, 100 520, 190 470 C 280 420, 260 320, 360 260 C 410 230, 420 160, 400 90"
        stroke="rgba(122,182,235,0.4)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="1 11"
      />
      <circle cx="40" cy="680" r="7" fill="#7ab6eb" fillOpacity="0.9" />
      <circle className="auth-flow-node--pulse" cx="190" cy="470" r="6" fill="#4f94d1" />
      <rect x="352" y="252" width="16" height="16" rx="4" transform="rotate(45 360 260)" fill="#4f94d1" />
      <circle cx="400" cy="90" r="7" fill="#7ab6eb" fillOpacity="0.9" />
      <circle cx="80" cy="120" r="2.5" fill="rgba(255,255,255,0.25)" />
      <circle cx="330" cy="620" r="2.5" fill="rgba(255,255,255,0.2)" />
      <circle cx="440" cy="480" r="2" fill="rgba(255,255,255,0.2)" />
      <circle cx="120" cy="330" r="2" fill="rgba(255,255,255,0.18)" />
    </svg>
  )
}

function NetworkGraphic() {
  return (
    <svg viewBox="0 0 480 800" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden="true">
      <line className="auth-flow-line" x1="240" y1="400" x2="110" y2="260" stroke="rgba(122,182,235,0.4)" strokeWidth="1.25" strokeDasharray="1 9" />
      <line x1="240" y1="400" x2="370" y2="230" stroke="rgba(122,182,235,0.3)" strokeWidth="1.25" />
      <line x1="240" y1="400" x2="90" y2="520" stroke="rgba(122,182,235,0.3)" strokeWidth="1.25" />
      <line className="auth-flow-line" x1="240" y1="400" x2="380" y2="560" stroke="rgba(122,182,235,0.4)" strokeWidth="1.25" strokeDasharray="1 9" />
      <line x1="240" y1="400" x2="240" y2="620" stroke="rgba(122,182,235,0.3)" strokeWidth="1.25" />
      <line x1="240" y1="400" x2="240" y2="160" stroke="rgba(122,182,235,0.3)" strokeWidth="1.25" />
      <circle className="auth-flow-node--pulse" cx="240" cy="400" r="8" fill="#4f94d1" />
      <circle cx="110" cy="260" r="5" fill="#7ab6eb" fillOpacity="0.85" />
      <circle cx="370" cy="230" r="4" fill="#7ab6eb" fillOpacity="0.7" />
      <circle cx="90" cy="520" r="4" fill="#7ab6eb" fillOpacity="0.7" />
      <circle cx="380" cy="560" r="5" fill="#7ab6eb" fillOpacity="0.85" />
      <circle cx="240" cy="620" r="4" fill="#7ab6eb" fillOpacity="0.7" />
      <circle cx="240" cy="160" r="5" fill="#7ab6eb" fillOpacity="0.85" />
      <circle cx="60" cy="120" r="2" fill="rgba(255,255,255,0.2)" />
      <circle cx="420" cy="700" r="2" fill="rgba(255,255,255,0.2)" />
    </svg>
  )
}
