import { GitHubIcon, GmailIcon } from './icons/NavIcons'
import { useAuthStore } from '../store/authStore'
import axiosClient from '../api/axiosClient'
import './css/ConnectorCard.css'

const PROVIDER_ICONS = { github: GitHubIcon, gmail: GmailIcon }

export default function ConnectorCard({ connector, isConnected, onDisconnect }) {
  const Icon = PROVIDER_ICONS[connector.id]

  const handleConnect = async () => {
    if (!useAuthStore.getState().token) {
      window.alert('Iniciá sesión antes de conectar una app.')
      return
    }

    if (connector.id !== 'gmail' && connector.id !== 'github') {
      window.alert('Este proveedor aún no está habilitado en esta parte del proyecto.')
      return
    }

    try {
      const response = await axiosClient.get(`/connectors/${connector.id}/auth`)
      window.location.href = response.data.authorizationUrl
    } catch (error) {
      window.alert(error.response?.data?.message || 'No fue posible iniciar la conexión.')
    }
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
      <div className="connector-card-top">
        <span className={`connector-card-icon connector-card-icon--${connector.id}`}>
          <Icon />
        </span>

        <div className="connector-card-body">
          <h3 className="connector-card-name">{connector.name}</h3>
          <p className="connector-card-desc">{connector.description}</p>
        </div>
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
