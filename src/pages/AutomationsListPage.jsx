import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import AutomationCard from '../components/AutomationCard'
import { PlusIcon, SearchIcon } from '../components/icons/NavIcons'
import { sampleAutomations as initialAutomations } from '../data/sampleData'
import './css/AutomationsListPage.css'

const FILTERS = [
  { id: 'all', label: 'Todas' },
  { id: 'active', label: 'Activas' },
  { id: 'paused', label: 'Pausadas' },
]

export default function AutomationsListPage() {
  const [automations, setAutomations] = useState(initialAutomations)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')

  const filterListRef = useRef(null)
  const [filterIndicator, setFilterIndicator] = useState(null)

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
      const matchesFilter = filter === 'all' || automation.status === filter
      const matchesQuery = automation.name.toLowerCase().includes(normalizedQuery)
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

      {filtered.length > 0 ? (
        <div className="automations-grid">
          {filtered.map((automation, index) => (
            <AutomationCard
              key={automation.id}
              automation={automation}
              onToggle={() => handleToggle(automation.id)}
              style={{ animationDelay: `${index * 40}ms` }}
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
