export const sampleConnectors = [
  { id: 'github', name: 'GitHub', description: 'Repositorios, issues y pull requests', status: 'connected' },
  { id: 'gmail', name: 'Gmail', description: 'Correo entrante y etiquetas', status: 'connected' },
]

export const sampleAutomations = [
  {
    id: 'auto-1',
    name: 'Aviso de pull request nuevo',
    trigger: { provider: 'github', label: 'Nuevo pull request abierto' },
    action: { provider: 'gmail', label: 'Enviar notificación por correo' },
    status: 'active',
    runsThisWeek: 12,
    lastRunLabel: 'Hace 12 minutos',
  },
  {
    id: 'auto-2',
    name: 'Issue automático desde correo',
    trigger: { provider: 'gmail', label: 'Nuevo correo con adjunto' },
    action: { provider: 'github', label: 'Crear issue en el repositorio' },
    status: 'active',
    runsThisWeek: 7,
    lastRunLabel: 'Hace 2 horas',
  },
  {
    id: 'auto-3',
    name: 'Resumen semanal de issues cerrados',
    trigger: { provider: 'github', label: 'Issue cerrado' },
    action: { provider: 'gmail', label: 'Enviar resumen semanal' },
    status: 'paused',
    runsThisWeek: 0,
    lastRunLabel: 'Hace 5 días',
  },
  {
    id: 'auto-4',
    name: 'Comentario desde correo importante',
    trigger: { provider: 'gmail', label: 'Correo marcado como importante' },
    action: { provider: 'github', label: 'Comentar en el issue vinculado' },
    status: 'active',
    runsThisWeek: 3,
    lastRunLabel: 'Hace 1 día',
  },
]

export const weeklyActivity = [
  { label: 'Lun', runs: 4 },
  { label: 'Mar', runs: 7 },
  { label: 'Mié', runs: 5 },
  { label: 'Jue', runs: 9 },
  { label: 'Vie', runs: 6 },
  { label: 'Sáb', runs: 2 },
  { label: 'Dom', runs: 8 },
]

export const dashboardSummary = {
  totalRunsThisWeek: weeklyActivity.reduce((sum, day) => sum + day.runs, 0),
  activeAutomations: sampleAutomations.filter((a) => a.status === 'active').length,
  connectedApps: sampleConnectors.length,
}
