import { useEffect, useState } from 'react'
import ConnectorCard from './ConnectorCard'
import { sampleConnectors } from '../data/sampleData'
import './css/ConnectorList.css'

export default function ConnectorList() {
  return (
    <div className="connector-list">
      <ConnectorCards />
    </div>
  )
}

const STORAGE_KEY = 'flowhub-connected-providers'

function readConnectedProviders() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

function ConnectorCards() {
  const [connectedProviders, setConnectedProviders] = useState(readConnectedProviders)

  useEffect(() => {
    const connectedProvider = new URLSearchParams(window.location.search).get('connected')

    if (connectedProvider && sampleConnectors.some((connector) => connector.id === connectedProvider)) {
      setConnectedProviders((providers) => {
        const nextProviders = providers.includes(connectedProvider)
          ? providers
          : [...providers, connectedProvider]

        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextProviders))
        return nextProviders
      })

      window.history.replaceState({}, document.title, window.location.pathname)
    }
  }, [])

  const handleDisconnect = (providerId) => {
    setConnectedProviders((providers) => {
      const nextProviders = providers.filter((provider) => provider !== providerId)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextProviders))
      return nextProviders
    })
  }

  return sampleConnectors.map((connector) => (
    <ConnectorCard
      key={connector.id}
      connector={connector}
      isConnected={connectedProviders.includes(connector.id)}
      onDisconnect={handleDisconnect}
    />
  ))
}
