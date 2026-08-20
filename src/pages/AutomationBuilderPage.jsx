import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createAutomation, getAutomation, updateAutomation } from '../api/automations.api'
import './css/AutomationBuilderPage.css'

const initialForm = {
  name: '',
  description: '',
  isActive: false,
  triggerType: 'schedule',
  triggerProvider: 'gmail',
  triggerConfiguration: '{\n  "cron": "* * * * *"\n}',
  conditionField: '',
  conditionOperator: 'contains',
  conditionValue: '',
  actionType: 'send_email',
  actionProvider: 'gmail',
  actionConfiguration: '{\n  "to": "destinatario@ejemplo.com",\n  "subject": "Prueba de FlowHub",\n  "body": "Este correo fue enviado automáticamente"\n}',
}

export default function AutomationBuilderPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [isLoading, setIsLoading] = useState(Boolean(id))
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) return

    getAutomation(id)
      .then((automation) => {
        const condition = automation.conditions?.[0]
        const action = automation.actions?.[0]
        setForm({
          ...initialForm,
          name: automation.name,
          description: automation.description || '',
          isActive: automation.isActive,
          triggerType: automation.trigger?.type || initialForm.triggerType,
          triggerProvider: automation.trigger?.provider || initialForm.triggerProvider,
          triggerConfiguration: JSON.stringify(automation.trigger?.configuration || {}, null, 2),
          conditionField: condition?.field || '',
          conditionOperator: condition?.operator || initialForm.conditionOperator,
          conditionValue: condition?.value || '',
          actionType: action?.type || initialForm.actionType,
          actionProvider: action?.provider || initialForm.actionProvider,
          actionConfiguration: JSON.stringify(action?.configuration || {}, null, 2),
        })
      })
      .catch((requestError) => setError(requestError.response?.data?.message || 'No fue posible cargar la automatización.'))
      .finally(() => setIsLoading(false))
  }, [id])

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setForm((previous) => ({ ...previous, [name]: type === 'checkbox' ? checked : value }))
  }

  const parseJsonField = (value) => {
    const normalized = typeof value === 'string' ? value.trim() : ''
    if (!normalized) return {}

    try {
      return JSON.parse(normalized)
    } catch {
      throw new SyntaxError('JSON inválido')
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    try {
      const payload = {
        name: form.name,
        description: form.description,
        isActive: form.isActive,
        trigger: {
          type: form.triggerType,
          provider: form.triggerProvider,
          configuration: parseJsonField(form.triggerConfiguration),
        },
        conditions: form.conditionField
          ? [{ field: form.conditionField, operator: form.conditionOperator, value: form.conditionValue }]
          : [],
        actions: [
          {
            type: form.actionType,
            provider: form.actionProvider,
            configuration: parseJsonField(form.actionConfiguration),
          },
        ],
      }

      if (id) {
        await updateAutomation(id, payload)
      } else {
        await createAutomation(payload)
      }

      navigate('/automations')
    } catch (requestError) {
      setError(requestError instanceof SyntaxError ? 'La configuración debe ser un JSON válido.' : requestError.response?.data?.message || 'No fue posible guardar la automatización.')
    }
  }

  if (isLoading) return <p className="automation-builder-loading">Cargando automatización...</p>

  return (
    <section className="automation-builder-page">
      <form onSubmit={handleSubmit} className="automation-builder-form">
        <header className="automation-builder-header">
          <h1>{id ? 'Editar automatización' : 'Nueva automatización'}</h1>
          <p>Configurá trigger, condición y acción en un solo flujo.</p>
        </header>

        <section className="automation-builder-card">
          <h2>Detalles</h2>

          <label className="automation-builder-field">
            <span>Nombre</span>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="ui-input"
            />
          </label>

          <label className="automation-builder-field">
            <span>Descripción</span>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="ui-input"
              rows="3"
            />
          </label>
        </section>

        <section className="automation-builder-card">
          <h2>Trigger</h2>

          <div className="automation-builder-grid-two">
            <label className="automation-builder-field">
              <span>Tipo de trigger</span>
              <select name="triggerType" value={form.triggerType} onChange={handleChange} className="ui-input">
                <option value="webhook_event">Evento por webhook</option>
                <option value="schedule">Programado</option>
              </select>
            </label>

            <label className="automation-builder-field">
              <span>Proveedor del trigger</span>
              <select name="triggerProvider" value={form.triggerProvider} onChange={handleChange} className="ui-input">
                <option value="github">GitHub</option>
                <option value="gmail">Gmail</option>
              </select>
            </label>
          </div>

          <label className="automation-builder-field">
            <span>Configuración del trigger (JSON)</span>
            <textarea
              name="triggerConfiguration"
              value={form.triggerConfiguration}
              onChange={handleChange}
              rows="5"
              className="ui-input automation-builder-json"
            />
          </label>
        </section>

        <div className="automation-builder-split">
          <fieldset className="automation-builder-card automation-builder-fieldset">
            <legend>Condición opcional</legend>
            <input name="conditionField" value={form.conditionField} onChange={handleChange} placeholder="trigger.subject" className="ui-input" />
            <select name="conditionOperator" value={form.conditionOperator} onChange={handleChange} className="ui-input">
              <option value="contains">Contiene</option>
              <option value="equals">Es igual a</option>
              <option value="starts_with">Comienza con</option>
            </select>
            <input name="conditionValue" value={form.conditionValue} onChange={handleChange} placeholder="Valor esperado" className="ui-input" />
          </fieldset>

          <fieldset className="automation-builder-card automation-builder-fieldset">
            <legend>Acción</legend>
            <select name="actionType" value={form.actionType} onChange={handleChange} className="ui-input">
              <option value="send_message">Enviar mensaje</option>
              <option value="create_issue">Crear issue</option>
              <option value="send_email">Enviar correo</option>
            </select>
            <select name="actionProvider" value={form.actionProvider} onChange={handleChange} className="ui-input">
              <option value="github">GitHub</option>
              <option value="gmail">Gmail</option>
            </select>
            <textarea
              name="actionConfiguration"
              value={form.actionConfiguration}
              onChange={handleChange}
              rows="5"
              className="ui-input automation-builder-json"
            />
          </fieldset>
        </div>

        <footer className="automation-builder-footer">
          <label className="automation-builder-toggle">
            <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} />
            <span>Activar automatización</span>
          </label>

          <button type="submit" className="ui-button-primary automation-builder-submit">Guardar automatización</button>
        </footer>

        {error && <p className="automation-builder-error" role="alert">{error}</p>}
      </form>
    </section>
  )
}
