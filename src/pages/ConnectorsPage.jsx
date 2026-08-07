import ConnectorList from '../components/ConnectorList'
import './css/ConnectorsPage.css'

export default function ConnectorsPage() {
  return (
    <div className="connectors-page">
      <p className="connectors-subtitle">
        Conectá tus apps para que FlowHub pueda escuchar eventos y ejecutar acciones automáticamente.
      </p>

      <ConnectorList />

      <p className="connectors-note">Estamos trabajando para sumar más conectores próximamente.</p>
    </div>
  )
}
