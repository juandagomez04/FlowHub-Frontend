import { GitHubIcon, GmailIcon } from './icons/NavIcons'
import './css/ConnectorCard.css'

const PROVIDER_ICONS = { github: GitHubIcon, gmail: GmailIcon }

export default function ConnectorCard({ connector, isConnected, onDisconnect }) {
  const Icon = PROVIDER_ICONS[connector.id]

  const handleConnect = () => {
    if (connector.id === 'gmail') {
      window.location.href = 'http://localhost:3000/api/connectors/gmail/auth'
      return
    }

    if (connector.id === 'github') {
      window.location.href = 'http://localhost:3000/api/connectors/github/auth'
      return
    }

    window.alert('Este proveedor aún no está habilitado en esta parte del proyecto.')
  }

  const handleAction = () => {
    if (isConnected) {
      onDisconnect(connector.id)
      return
    }

    handleConnect()
  }

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
        <button
          type="button"
          className={`connector-card-button${isConnected ? ' connector-card-button--connected' : ''}`}
          onClick={handleAction}
        >
          {isConnected ? 'Desconectar' : 'Conectar'}
        </button>
      </div>
    </article>
  )
}
