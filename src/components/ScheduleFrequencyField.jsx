import { SCHEDULE_PRESETS, SCHEDULE_UNIT_LABELS, SCHEDULE_UNIT_MIN } from '../utils/automationSchedule'

export default function ScheduleFrequencyField({ unit, value, onFieldChange, onPresetSelect }) {
  return (
    <div className="automation-builder-field schedule-frequency">
      <span>Frecuencia</span>

      <div className="schedule-value-row">
        <span className="schedule-value-row-label">Cada</span>
        <input
          type="number"
          min={SCHEDULE_UNIT_MIN[unit]}
          value={value}
          onChange={(event) => onFieldChange('value', event.target.value)}
          className="ui-input schedule-value-input"
        />
        <select
          value={unit}
          onChange={(event) => onFieldChange('unit', event.target.value)}
          className="ui-input schedule-unit-select"
        >
          {Object.entries(SCHEDULE_UNIT_LABELS).map(([unitKey, label]) => (
            <option key={unitKey} value={unitKey}>{label}</option>
          ))}
        </select>
      </div>

      <div className="schedule-quick-picks">
        {SCHEDULE_PRESETS.map((preset) => {
          const isActive = unit === preset.unit && Number(value) === preset.value
          return (
            <button
              type="button"
              key={preset.key}
              className={`schedule-pill${isActive ? ' is-active' : ''}`}
              onClick={() => onPresetSelect(preset.key)}
            >
              {preset.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
