import { Link } from 'react-router-dom'
import Badge from '../components/Badge'
import ActivityChart from '../components/ActivityChart'
import AutomationFlow from '../components/AutomationFlow'
import { ArrowRightIcon, PlusIcon } from '../components/icons/NavIcons'
import { dashboardSummary, sampleAutomations, sampleConnectors, weeklyActivity } from '../data/sampleData'
import './css/DashboardPage.css'

export default function DashboardPage() {
  const recentAutomations = sampleAutomations.slice(0, 4)

  return (
    <div className="dash">
      <section className="dash-top-row">
        <div className="dash-activity-card">
          <div className="dash-activity-header">
            <div>
              <p className="dash-section-label">Actividad de automatizaciones</p>
              <p className="dash-activity-value">
                {dashboardSummary.totalRunsThisWeek}
                <span> ejecuciones esta semana</span>
              </p>
            </div>
            <p className="dash-activity-sub">
              {dashboardSummary.activeAutomations} de {sampleAutomations.length} automatizaciones activas
            </p>
          </div>
          <ActivityChart data={weeklyActivity} />
        </div>

        <div className="dash-connectors">
          <p className="dash-section-label">Tus conectores</p>
          <div className="dash-connectors-grid">
            {sampleConnectors.map((connector) => (
              <div key={connector.id} className="dash-connector-card">
                <span className={`dash-connector-icon dash-connector-icon--${connector.id}`}>
                  {connector.id === 'github' ? <GitHubMark /> : <GmailMark />}
                </span>
                <div className="dash-connector-info">
                  <p className="dash-connector-name">{connector.name}</p>
                  <p className="dash-connector-desc">{connector.description}</p>
                </div>
                <Badge variant="success">Conectado</Badge>
              </div>
            ))}
            <Link to="/connectors" className="dash-connector-card dash-connector-card--add">
              <PlusIcon />
              Conectar otra app
            </Link>
          </div>
        </div>
      </section>

      <section className="dash-bottom-row">
        <div className="dash-panel">
          <div className="dash-panel-header">
            <p className="dash-section-label">Automatizaciones recientes</p>
            <Link to="/automations" className="dash-panel-link">
              Ver todas
              <ArrowRightIcon />
            </Link>
          </div>

          <table className="dash-table">
            <thead>
              <tr>
                <th scope="col">Automatización</th>
                <th scope="col">Flujo</th>
                <th scope="col">Estado</th>
                <th scope="col">Última ejecución</th>
              </tr>
            </thead>
            <tbody>
              {recentAutomations.map((automation) => (
                <tr key={automation.id}>
                  <td className="dash-table-name">{automation.name}</td>
                  <td>
                    <AutomationFlow trigger={automation.trigger} action={automation.action} compact />
                  </td>
                  <td>
                    <Badge variant={automation.status === 'active' ? 'success' : 'default'}>
                      {automation.status === 'active' ? 'Activa' : 'Pausada'}
                    </Badge>
                  </td>
                  <td className="dash-table-muted">{automation.lastRunLabel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="dash-promo">
          <div className="dash-promo-graphic" aria-hidden="true">
            <PromoGraphic />
          </div>
          <p className="dash-promo-title">Sumá una automatización más</p>
          <p className="dash-promo-text">
            Conectá GitHub y Gmail para automatizar tareas repetitivas sin escribir código.
          </p>
          <Link to="/automations/new" className="dash-promo-button">
            <PlusIcon />
            Crear automatización
          </Link>
        </div>
      </section>
    </div>
  )
}

function GitHubMark() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.61-3.37-1.34-3.37-1.34-.45-1.17-1.1-1.48-1.1-1.48-.9-.62.07-.61.07-.61 1 .07 1.54 1.03 1.54 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.26-.45-1.28.1-2.66 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85.004 1.71.11 2.51.32 1.9-1.3 2.74-1.02 2.74-1.02.55 1.38.2 2.4.1 2.66.64.7 1.02 1.6 1.02 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85 0 1.33-.01 2.4-.01 2.73 0 .27.18.58.69.48A10.02 10.02 0 0022 12c0-5.52-4.48-10-10-10z" />
    </svg>
  )
}

function GmailMark() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M20.95 5.56A2 2 0 0019 5H5a2 2 0 00-1.95 1.56L12 11.07l8.95-5.51zM22 8.24v10.26A2 2 0 0120 20H4a2 2 0 01-2-1.5V8.24l9.32 5.74a1 1 0 001.36 0L22 8.24z" />
    </svg>
  )
}

function PromoGraphic() {
  return (
    <svg viewBox="0 0 200 160" fill="none">
      <circle cx="150" cy="30" r="3" fill="rgba(122,182,235,0.5)" />
      <circle cx="170" cy="70" r="2" fill="rgba(122,182,235,0.35)" />
      <line x1="40" y1="120" x2="90" y2="70" stroke="rgba(122,182,235,0.35)" strokeWidth="1.25" />
      <line x1="90" y1="70" x2="150" y2="100" stroke="rgba(122,182,235,0.35)" strokeWidth="1.25" />
      <circle cx="40" cy="120" r="6" fill="rgba(122,182,235,0.5)" />
      <circle cx="90" cy="70" r="6" fill="#4f94d1" />
      <circle cx="150" cy="100" r="6" fill="rgba(122,182,235,0.5)" />
    </svg>
  )
}
