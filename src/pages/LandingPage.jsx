import { Link } from 'react-router-dom'
import './css/LandingPage.css'

export default function LandingPage() {
  return (
    <div className="landing-page">
      <div className="landing-panel">
        <section className="landing-section">
          <div>
            <p className="landing-badge">FlowHub</p>
            <h1 className="landing-title">Conecta tus cuentas, escucha eventos y automatiza tareas.</h1>
          </div>

          <p className="landing-description">
            Accede a FlowHub para crear automatizaciones con conectores como GitHub y Gmail.
          </p>

          <div className="landing-actions">
            <Link to="/login" className="landing-button-primary">Iniciar sesión</Link>
            <Link to="/register" className="landing-button-secondary">Crear cuenta</Link>
          </div>

          <div className="landing-providers">
            <p className="landing-providers-label">Proveedores soportados</p>
            <div className="landing-providers-row">
              <div className="landing-provider-link">
                <span className="landing-provider-icon">
                  <svg viewBox="0 0 24 24" className="landing-provider-icon-svg" fill="currentColor" aria-hidden="true">
                    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.61-3.37-1.34-3.37-1.34-.45-1.17-1.1-1.48-1.1-1.48-.9-.62.07-.61.07-.61 1 .07 1.54 1.03 1.54 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.26-.45-1.28.1-2.66 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85.004 1.71.11 2.51.32 1.9-1.3 2.74-1.02 2.74-1.02.55 1.38.2 2.4.1 2.66.64.7 1.02 1.6 1.02 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85 0 1.33-.01 2.4-.01 2.73 0 .27.18.58.69.48A10.02 10.02 0 0022 12c0-5.52-4.48-10-10-10z" />
                  </svg>
                </span>
                <span>GitHub</span>
              </div>
              <div className="landing-provider-link">
                <span className="landing-provider-icon">
                  <svg viewBox="0 0 24 24" className="landing-provider-icon-svg" fill="currentColor" aria-hidden="true">
                    <path d="M20.95 5.56A2 2 0 0019 5H5a2 2 0 00-1.95 1.56L12 11.07l8.95-5.51zM22 8.24v10.26A2 2 0 0120 20H4a2 2 0 01-2-1.5V8.24l9.32 5.74a1 1 0 001.36 0L22 8.24z" />
                  </svg>
                </span>
                <span>Gmail</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
