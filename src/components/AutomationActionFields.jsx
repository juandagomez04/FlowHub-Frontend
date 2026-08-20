export default function AutomationActionFields({ form, onFieldChange }) {
  return (
    <>
      {form.service === 'github' && (
        <label className="automation-builder-field">
          <span>Tipo de acción</span>
          <select
            value={form.actionType}
            onChange={(event) => onFieldChange('actionType', event.target.value)}
            className="ui-input"
          >
            <option value="create_issue">Crear issue</option>
            <option value="send_message">Comentar en issue o PR</option>
          </select>
        </label>
      )}

      {form.service === 'gmail' && (
        <>
          <label className="automation-builder-field">
            <span>Para</span>
            <input
              type="email"
              required
              value={form.emailTo}
              onChange={(event) => onFieldChange('emailTo', event.target.value)}
              placeholder="destinatario@ejemplo.com"
              className="ui-input"
            />
          </label>
          <label className="automation-builder-field">
            <span>Asunto</span>
            <input
              required
              value={form.emailSubject}
              onChange={(event) => onFieldChange('emailSubject', event.target.value)}
              className="ui-input"
            />
          </label>
          <label className="automation-builder-field">
            <span>Cuerpo</span>
            <textarea
              required
              rows="4"
              value={form.emailBody}
              onChange={(event) => onFieldChange('emailBody', event.target.value)}
              className="ui-input"
            />
          </label>
        </>
      )}

      {form.service === 'github' && (
        <div className="automation-builder-grid-two">
          <label className="automation-builder-field">
            <span>Owner</span>
            <input
              required
              value={form.githubOwner}
              onChange={(event) => onFieldChange('githubOwner', event.target.value)}
              placeholder="juandagomez04"
              className="ui-input"
            />
          </label>
          <label className="automation-builder-field">
            <span>Repositorio</span>
            <input
              required
              value={form.githubRepo}
              onChange={(event) => onFieldChange('githubRepo', event.target.value)}
              placeholder="FlowHub-Backend"
              className="ui-input"
            />
          </label>
        </div>
      )}

      {form.service === 'github' && form.actionType === 'create_issue' && (
        <>
          <label className="automation-builder-field">
            <span>Título del issue</span>
            <input
              required
              value={form.issueTitle}
              onChange={(event) => onFieldChange('issueTitle', event.target.value)}
              className="ui-input"
            />
          </label>
          <label className="automation-builder-field">
            <span>Descripción</span>
            <textarea
              rows="4"
              value={form.issueBody}
              onChange={(event) => onFieldChange('issueBody', event.target.value)}
              className="ui-input"
            />
          </label>
        </>
      )}

      {form.service === 'github' && form.actionType === 'send_message' && (
        <>
          <label className="automation-builder-field">
            <span>Número de issue o PR</span>
            <input
              type="number"
              required
              value={form.issueNumber}
              onChange={(event) => onFieldChange('issueNumber', event.target.value)}
              className="ui-input"
            />
          </label>
          <label className="automation-builder-field">
            <span>Comentario</span>
            <textarea
              required
              rows="4"
              value={form.issueComment}
              onChange={(event) => onFieldChange('issueComment', event.target.value)}
              className="ui-input"
            />
          </label>
        </>
      )}
    </>
  )
}
