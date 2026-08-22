import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createAutomation, getAutomation, updateAutomation } from '../api/automations.api'
import ServicePicker from '../components/ServicePicker'
import ScheduleFrequencyField from '../components/ScheduleFrequencyField'
import AutomationActionFields from '../components/AutomationActionFields'
import { SCHEDULE_PRESETS, buildScheduleConfiguration, parseScheduleConfiguration } from '../utils/automationSchedule'
import { DEFAULT_EMAIL_SUBJECT, DEFAULT_EMAIL_BODY, buildActionPayload, parseActionIntoForm } from '../utils/automationAction'
import './css/AutomationBuilderPage.css'

const initialSchedule = { unit: 'minutes', value: 1 }

const initialForm = {
  name: '',
  description: '',
  isActive: false,
  triggerType: 'schedule',
  scheduleUnit: initialSchedule.unit,
  scheduleValue: initialSchedule.value,
  webhookSecret: '',
  service: 'gmail',
  actionType: 'send_email',
  emailTo: '',
  emailSubject: DEFAULT_EMAIL_SUBJECT,
  emailBody: DEFAULT_EMAIL_BODY,
  githubOwner: '',
  githubRepo: '',
  issueTitle: '',
  issueBody: '',
  issueNumber: '',
  issueComment: '',
}

export default function AutomationBuilderPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [isLoading, setIsLoading] = useState(Boolean(id))
  const [error, setError] = useState('')

  const webhookUrl = id
    ? `${(import.meta.env.VITE_API_URL || 'http://localhost:3000/api').replace(/\/$/, '')}/triggers/webhook/${id}`
    : ''

  useEffect(() => {
    if (!id) return

    getAutomation(id)
      .then((automation) => {
        const schedule = parseScheduleConfiguration(automation.trigger?.configuration)
        const actionFields = parseActionIntoForm(automation.actions?.[0])
        const triggerType = automation.trigger?.type === 'webhook' ? 'webhook' : 'schedule'

        setForm({
          ...initialForm,
          name: automation.name,
          description: automation.description || '',
          isActive: automation.isActive,
          triggerType,
          scheduleUnit: schedule.unit,
          scheduleValue: schedule.value,
          webhookSecret: automation.trigger?.configuration?.secret || '',
          ...actionFields,
        })
      })
      .catch((requestError) => setError(requestError.response?.data?.message || 'No fue posible cargar la automatización.'))
      .finally(() => setIsLoading(false))
  }, [id])

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setForm((previous) => ({ ...previous, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleFieldChange = (name, value) => {
    setForm((previous) => ({ ...previous, [name]: value }))
  }

  const handleServiceSelect = (service) => {
    setForm((previous) => ({
      ...previous,
      service,
      actionType: service === 'gmail' ? 'send_email' : (previous.actionType === 'send_email' ? 'create_issue' : previous.actionType),
    }))
  }

  const handleSchedulePresetSelect = (presetKey) => {
    const preset = SCHEDULE_PRESETS.find((item) => item.key === presetKey)
    if (!preset) return

    setForm((previous) => ({ ...previous, scheduleUnit: preset.unit, scheduleValue: preset.value }))
  }

  const handleScheduleFieldChange = (field, value) => {
    setForm((previous) => ({
      ...previous,
      scheduleUnit: field === 'unit' ? value : previous.scheduleUnit,
      scheduleValue: field === 'value' ? value : previous.scheduleValue,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    try {
      const trigger =
        form.triggerType === 'webhook'
          ? {
              type: 'webhook',
              provider: 'flowhub',
              configuration: {
                ...(form.webhookSecret.trim() ? { secret: form.webhookSecret.trim() } : {}),
              },
            }
          : {
              type: 'schedule',
              provider: form.service,
              configuration: buildScheduleConfiguration(form.scheduleUnit, form.scheduleValue),
            }

      const payload = {
        name: form.name,
        description: form.description,
        isActive: form.isActive,
        trigger,
        conditions: [],
        actions: [{ ...buildActionPayload(form), position: 0 }],
      }

      if (id) {
        await updateAutomation(id, payload)
      } else {
        await createAutomation(payload)
      }

      navigate('/automations')
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'No fue posible guardar la automatización.')
    }
  }

  if (isLoading) return <p className="automation-builder-loading">Cargando automatización...</p>

  return (
    <section className="automation-builder-page">
      <form onSubmit={handleSubmit} className="automation-builder-form">
        <header className="automation-builder-header">
          <h1>{id ? 'Editar automatización' : 'Nueva automatización'}</h1>
          <p>Elegí el servicio, la frecuencia y completá los datos de la acción.</p>
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

          <label className="automation-builder-field">
            <span>Tipo de trigger</span>
            <select
              name="triggerType"
              value={form.triggerType}
              onChange={handleChange}
              className="ui-input"
            >
              <option value="schedule">Schedule (tiempo)</option>
              <option value="webhook">Webhook (evento)</option>
            </select>
          </label>

          {form.triggerType === 'schedule' ? (
            <>
              <p className="automation-builder-hint">Ejecuta la automatización por frecuencia de tiempo.</p>
              <ScheduleFrequencyField
                unit={form.scheduleUnit}
                value={form.scheduleValue}
                onFieldChange={handleScheduleFieldChange}
                onPresetSelect={handleSchedulePresetSelect}
              />
            </>
          ) : (
            <div className="automation-builder-webhook-box">
              <p className="automation-builder-hint">Ejecuta esta automatización cuando reciba un POST.</p>

              <label className="automation-builder-field">
                <span>Secret (opcional)</span>
                <input
                  name="webhookSecret"
                  value={form.webhookSecret}
                  onChange={handleChange}
                  className="ui-input"
                  placeholder="ej: mi-clave-webhook"
                />
              </label>

              {id ? (
                <>
                  <p className="automation-builder-webhook-label">URL del webhook</p>
                  <code className="automation-builder-webhook-url">{webhookUrl}</code>
                  <p className="automation-builder-webhook-note">
                    Enviá POST con JSON. Si definiste secret, mandalo en header x-flowhub-secret.
                  </p>
                </>
              ) : (
                <p className="automation-builder-webhook-note">
                  Guardá primero la automatización para generar la URL final del webhook.
                </p>
              )}
            </div>
          )}
        </section>

        <section className="automation-builder-card">
          <h2>Servicio de acción</h2>
          <p className="automation-builder-hint">Elegí qué conector va a ejecutar las acciones.</p>

          <ServicePicker service={form.service} onSelect={handleServiceSelect} />
        </section>

        <section className="automation-builder-card">
          <h2>Acción</h2>
          <AutomationActionFields form={form} onFieldChange={handleFieldChange} />
        </section>

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
