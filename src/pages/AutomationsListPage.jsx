import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import AutomationCard from '../components/AutomationCard'
import { PlusIcon, SearchIcon } from '../components/icons/NavIcons'
import { deleteAutomation, getAutomations, toggleAutomation } from '../api/automations.api'
import './css/AutomationsListPage.css'

const FILTERS = [
  { id: 'all', label: 'Todas' },
  { id: 'active', label: 'Activas' },
  { id: 'paused', label: 'Pausadas' },
]

export default function AutomationsListPage() {
  const [automations, setAutomations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')

  const filterListRef = useRef(null)
  const [filterIndicator, setFilterIndicator] = useState(null)

  useEffect(() => {
    getAutomations()
      .then(setAutomations)
      .catch((requestError) => setError(requestError.response?.data?.message || 'No fue posible cargar las automatizaciones.'))
      .finally(() => setIsLoading(false))
  }, [])

  useLayoutEffect(() => {
    const activeButton = filterListRef.current?.querySelector('.automations-filter.is-active')
    if (activeButton) {
      setFilterIndicator({
        '--f-left': `${activeButton.offsetLeft}px`,
        '--f-width': `${activeButton.offsetWidth}px`,
      })
    }
  }, [filter])

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return automations.filter((automation) => {
      const matchesFilter =
        filter === 'all' ||
        (filter === 'active' && automation.isActive) ||
        (filter === 'paused' && !automation.isActive)
      const matchesQuery = automation.name?.toLowerCase().includes(normalizedQuery)
      return matchesFilter && matchesQuery
    })
  }, [automations, query, filter])

  const handleToggle = (id) => {
    setAutomations((previous) =>
      previous.map((automation) =>
        automation.id === id
          ? { ...automation, status: automation.status === 'active' ? 'paused' : 'active' }
          : automation,
      ),
    )
  }

  return (
    <div className="automations-page">
      <div className="automations-toolbar">
        <label className="automations-search">
          <SearchIcon />
          <input
            type="search"
            placeholder="Buscar automatización..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Buscar automatización"
          />
        </label>

        <div className="automations-filters" ref={filterListRef} role="tablist" aria-label="Filtrar por estado">
          {filterIndicator && <span className="automations-filter-indicator" style={filterIndicator} aria-hidden="true" />}
          {FILTERS.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={filter === item.id}
              className={`automations-filter${filter === item.id ? ' is-active' : ''}`}
              onClick={() => setFilter(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <Link to="/automations/new" className="automations-cta">
          <PlusIcon />
          Nueva automatización
        </Link>
      </div>

      {isLoading ? (
        <div className="automations-empty">Cargando automatizaciones...</div>
      ) : error ? (
        <div className="automations-empty">{error}</div>
      ) : filtered.length > 0 ? (
        <div className="automations-grid">
          {filtered.map((automation, index) => (
            <AutomationCard
              key={automation.id}
              automation={{
                ...automation,
                status: automation.isActive ? 'active' : 'paused',
                trigger: {
                  provider: automation.trigger?.provider || 'flowhub',
                  label: automation.trigger?.type || 'Sin trigger',
                },
                action: {
                  provider: automation.actions?.[0]?.provider || 'flowhub',
                  label: automation.actions?.[0]?.type || 'Sin acción',
                },
                runsThisWeek: 0,
                lastRunLabel: automation.updatedAt ? new Date(automation.updatedAt).toLocaleDateString() : 'Sin ejecuciones',
              }}
              onToggle={async () => {
                const updated = await toggleAutomation(automation.id)
                setAutomations((previous) => previous.map((item) => (item.id === updated.id ? updated : item)))
              }}
              onDelete={async () => {
                if (!window.confirm(`¿Eliminar "${automation.name}"?`)) return
                await deleteAutomation(automation.id)
                setAutomations((previous) => previous.filter((item) => item.id !== automation.id))
              }}
            />
          ))}
        </div>
      ) : (
        <div className="automations-empty">
          <p className="automations-empty-title">No encontramos automatizaciones</p>
          <p className="automations-empty-text">Probá con otra búsqueda o cambiá el filtro de estado.</p>
        </div>
      )}
    </div>
  )
}
