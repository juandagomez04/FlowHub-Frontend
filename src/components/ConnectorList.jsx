import ConnectorCard from './ConnectorCard'
import { sampleConnectors } from '../data/sampleData'
import './css/ConnectorList.css'

export default function ConnectorList() {
  return (
    <div className="connector-list">
      {sampleConnectors.map((connector) => (
        <ConnectorCard key={connector.id} connector={connector} />
      ))}
    </div>
  )
}
