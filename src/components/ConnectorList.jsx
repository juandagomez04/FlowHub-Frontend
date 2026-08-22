import { useEffect, useState } from 'react'
import ConnectorCard from './ConnectorCard'
import { getConnections, disconnectConnector } from '../api/connectors.api'
import './css/ConnectorList.css'

const CONNECTOR_CATALOG = [
  { id: 'github', name: 'GitHub', description: 'Repositorios, issues y pull requests' },
  { id: 'gmail', name: 'Gmail', description: 'Correo entrante y etiquetas' },
]

export default function ConnectorList() {
  return (
    <div className="connector-list">
      <ConnectorCards />
    </div>
  )
}

function ConnectorCards() {
  const [connectedProviders, setConnectedProviders] = useState([])
  const [loading, setLoading] = useState(true)

  const loadConnections = async () => {
    try {
      const connections = await getConnections()
      setConnectedProviders(connections.map((connection) => connection.provider))
    } catch {
      setConnectedProviders([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const oauthError = params.get('oauth_error')

    if (oauthError) {
      window.alert(oauthError)
    }

    if (params.has('connected') || params.has('oauth_error') || params.has('email') || params.has('login')) {
      window.history.replaceState({}, document.title, window.location.pathname)
    }

    loadConnections()
  }, [])

  const handleDisconnect = async (providerId) => {
    try {
      await disconnectConnector(providerId)
      setConnectedProviders((providers) => providers.filter((provider) => provider !== providerId))
    } catch {
      window.alert('No pudimos desconectar esa app. Intentá de nuevo.')
    }
  }

  if (loading) {
    return null
  }

  return CONNECTOR_CATALOG.map((connector) => (
    <ConnectorCard
      key={connector.id}
      connector={connector}
      isConnected={connectedProviders.includes(connector.id)}
      onDisconnect={handleDisconnect}
    />
  ))
}
