import { GitHubIcon, GmailIcon } from './icons/NavIcons'
import './css/ConnectorCard.css'

const PROVIDER_ICONS = { github: GitHubIcon, gmail: GmailIcon }

export default function ConnectorCard({ connector }) {
  const Icon = PROVIDER_ICONS[connector.id]

  return (
    <article className="connector-card">
      <span className={`connector-card-icon connector-card-icon--${connector.id}`}>
        <Icon />
      </span>

      <div className="connector-card-body">
        <h3 className="connector-card-name">{connector.name}</h3>
        <p className="connector-card-desc">{connector.description}</p>
      </div>

      <div className="connector-card-action">
        <button type="button" className="connector-card-button">
          Conectar
        </button>
      </div>
    </article>
  )
}
