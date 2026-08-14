import Badge from './Badge'
import AutomationFlow from './AutomationFlow'
import { Link } from 'react-router-dom'
import './css/AutomationCard.css'

export default function AutomationCard({ automation, onToggle, style }) {
  const isActive = automation.status === 'active'

  return (
    <article className="automation-card" style={style}>
      <div className="automation-card-main">
        <div className="automation-card-heading">
          <h3 className="automation-card-name">{automation.name}</h3>
          <Badge variant={isActive ? 'success' : 'default'}>{isActive ? 'Activa' : 'Pausada'}</Badge>
        </div>

        <AutomationFlow trigger={automation.trigger} action={automation.action} />

        <p className="automation-card-runs">{automation.runsThisWeek} ejecuciones esta semana</p>
      </div>

      <div className="automation-card-side">
        <Link
          to={`/automations/${automation.id}`}
          className="automation-edit"
          aria-label={`Editar ${automation.name}`}
        >
          Editar
        </Link>
        <button
          type="button"
          className={`automation-toggle${isActive ? ' is-on' : ''}`}
          role="switch"
          aria-checked={isActive}
          aria-label={`${isActive ? 'Pausar' : 'Activar'} ${automation.name}`}
          onClick={onToggle}
        >
          <span className="automation-toggle-track">
            <span className="automation-toggle-thumb" />
          </span>
        </button>
        <span className="automation-card-last">{automation.lastRunLabel}</span>
      </div>
    </article>
  )
}
