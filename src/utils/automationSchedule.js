export const SCHEDULE_PRESETS = [
  { key: '10s', label: '10 seg', unit: 'seconds', value: 10 },
  { key: '30s', label: '30 seg', unit: 'seconds', value: 30 },
  { key: '1m', label: '1 min', unit: 'minutes', value: 1 },
  { key: '5m', label: '5 min', unit: 'minutes', value: 5 },
  { key: '15m', label: '15 min', unit: 'minutes', value: 15 },
  { key: '1h', label: '1 hora', unit: 'hours', value: 1 },
  { key: '6h', label: '6 horas', unit: 'hours', value: 6 },
  { key: '24h', label: '1 día', unit: 'hours', value: 24 },
]

export const SCHEDULE_UNIT_LABELS = { seconds: 'Segundos', minutes: 'Minutos', hours: 'Horas' }
export const SCHEDULE_UNIT_MIN = { seconds: 5, minutes: 1, hours: 1 }

export function buildScheduleConfiguration(unit, value) {
  const minValue = SCHEDULE_UNIT_MIN[unit] || 1
  const safeValue = Math.max(minValue, Number(value) || minValue)
  return { unit, value: safeValue }
}

export function parseScheduleConfiguration(configuration) {
  if (configuration && configuration.unit && SCHEDULE_UNIT_LABELS[configuration.unit] && configuration.value) {
    return { unit: configuration.unit, value: Number(configuration.value) }
  }
  return { unit: 'minutes', value: 1 }
}
