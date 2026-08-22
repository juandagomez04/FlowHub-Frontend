import { useEffect, useMemo, useState } from 'react'
import { getExecutions } from '../api/executions.api'
import { getAutomations } from '../api/automations.api'
import ExecutionLogRow from '../components/ExecutionLogRow'
import './css/ExecutionHistoryPage.css'

export default function ExecutionHistoryPage() {
  const [executions, setExecutions] = useState([])
  const [automations, setAutomations] = useState([])
  const [selectedAutomation, setSelectedAutomation] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadHistory = async ({ automationId = selectedAutomation, status = selectedStatus, silent = false } = {}) => {
    if (!silent) {
      setLoading(true)
    }
    setError('')

    try {
      const [automationList, executionList] = await Promise.all([
        getAutomations(),
        getExecutions({
          automationId: automationId || undefined,
          status: status || undefined,
          limit: 100,
        }),
      ])

      setAutomations(automationList)
      setExecutions(executionList)
    } catch (requestError) {
      setError(requestError?.response?.data?.message || 'No fue posible cargar el historial de ejecuciones.')
    } finally {
      if (!silent) {
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    loadHistory()
  }, [])

  useEffect(() => {
    const intervalId = setInterval(() => {
      loadHistory({ silent: true })
    }, 3000)

    return () => clearInterval(intervalId)
  }, [selectedAutomation, selectedStatus])

  const counters = useMemo(() => {
    const running = executions.filter((execution) => execution.status === 'running').length
    const success = executions.filter((execution) => execution.status === 'success').length
    const failed = executions.filter((execution) => execution.status === 'failed').length

    return { running, success, failed }
  }, [executions])

  const handleAutomationChange = (event) => {
    const value = event.target.value
    setSelectedAutomation(value)
    loadHistory({ automationId: value, status: selectedStatus })
  }

  const handleStatusChange = (event) => {
    const value = event.target.value
    setSelectedStatus(value)
    loadHistory({ automationId: selectedAutomation, status: value })
  }

  return (
    <section className="history-page">
      <header className="history-header">
        <div>
          <h1 className="history-title">Historial de ejecuciones</h1>
          <p className="history-subtitle">Trazabilidad en tiempo real del motor de automatizaciones.</p>
        </div>

        <button
          type="button"
          className="history-refresh"
          onClick={() => loadHistory()}
          disabled={loading}
        >
          {loading ? 'Actualizando...' : 'Actualizar'}
        </button>
      </header>

      <section className="history-filters">
        <label className="history-filter">
          <span>Automatización</span>
          <select value={selectedAutomation} onChange={handleAutomationChange}>
            <option value="">Todas</option>
            {automations.map((automation) => (
              <option key={automation.id} value={automation.id}>{automation.name}</option>
            ))}
          </select>
        </label>

        <label className="history-filter">
          <span>Estado</span>
          <select value={selectedStatus} onChange={handleStatusChange}>
            <option value="">Todos</option>
            <option value="running">Running</option>
            <option value="success">Success</option>
            <option value="failed">Failed</option>
          </select>
        </label>
      </section>

      <section className="history-counters" aria-label="Resumen de ejecuciones">
        <article className="history-counter history-counter--running">
          <strong>{counters.running}</strong>
          <span>Running</span>
        </article>
        <article className="history-counter history-counter--success">
          <strong>{counters.success}</strong>
          <span>Success</span>
        </article>
        <article className="history-counter history-counter--failed">
          <strong>{counters.failed}</strong>
          <span>Failed</span>
        </article>
      </section>

      {loading ? (
        <p className="history-state">Cargando historial...</p>
      ) : error ? (
        <p className="history-state history-state--error">{error}</p>
      ) : executions.length === 0 ? (
        <p className="history-state">Todavía no hay ejecuciones registradas.</p>
      ) : (
        <div className="history-table-wrapper">
          <table className="history-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Automatización</th>
                <th>Estado</th>
                <th>Acciones</th>
                <th>Inicio</th>
                <th>Fin</th>
                <th>Error</th>
              </tr>
            </thead>
            <tbody>
              {executions.map((execution) => (
                <ExecutionLogRow key={execution.id} execution={execution} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
