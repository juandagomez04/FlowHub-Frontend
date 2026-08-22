import Badge from './Badge'

function formatDate(value) {
  if (!value) {
    return '-'
  }

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return '-'
  }

  return date.toLocaleString()
}

function statusToVariant(status) {
  if (status === 'success') return 'success'
  if (status === 'failed') return 'error'
  if (status === 'running') return 'warning'
  return 'default'
}

export default function ExecutionLogRow({ execution }) {
  const actions = Array.isArray(execution.actionsExecuted) ? execution.actionsExecuted : []

  return (
    <tr>
      <td>#{execution.id}</td>
      <td>{execution.automationName || `Automatización ${execution.automationId}`}</td>
      <td>
        <Badge variant={statusToVariant(execution.status)}>{execution.status}</Badge>
      </td>
      <td>
        <details className="history-actions-detail">
          <summary>{actions.length}</summary>
          <pre>{JSON.stringify(actions, null, 2)}</pre>
        </details>
      </td>
      <td>{formatDate(execution.startedAt)}</td>
      <td>{formatDate(execution.finishedAt)}</td>
      <td className="history-error-cell">{execution.errorMessage || '-'}</td>
    </tr>
  )
}
