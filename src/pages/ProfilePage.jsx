import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuthStore } from '../store/authStore'
import { useThemeStore } from '../store/themeStore'
import { changePassword } from '../api/auth.api'
import ConnectorList from '../components/ConnectorList'
import Button from '../components/Button'
import Input from '../components/Input'
import Spinner from '../components/Spinner'
import { AlertIcon } from '../components/icons/AuthIcons'
import { SunIcon, MoonIcon } from '../components/icons/NavIcons'
import './css/ProfilePage.css'

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Ingresá tu contraseña actual.'),
    newPassword: z.string().min(6, 'La nueva contraseña debe tener al menos 6 caracteres.'),
    confirmPassword: z.string().min(1, 'Confirmá la nueva contraseña.'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Las contraseñas no coinciden.',
    path: ['confirmPassword'],
  })

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user)
  const theme = useThemeStore((state) => state.theme)
  const toggleTheme = useThemeStore((state) => state.toggleTheme)
  const [successMessage, setSuccessMessage] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
  })

  const onSubmit = async ({ currentPassword, newPassword }) => {
    setSuccessMessage('')
    try {
      await changePassword({ currentPassword, newPassword })
      setSuccessMessage('Contraseña actualizada correctamente.')
      reset()
    } catch (error) {
      const message = error?.response?.data?.message || 'No pudimos actualizar tu contraseña. Intentá nuevamente.'
      setError('root', { message })
    }
  }

  return (
    <div className="profile-page">
      <section className="profile-card">
        <h2 className="profile-card-title">Tu cuenta</h2>
        <p className="profile-card-subtitle">
          {user?.name ? `${user.name} · ` : ''}
          {user?.email}
        </p>
      </section>

      <section className="profile-card">
        <h2 className="profile-card-title">Cambiar contraseña</h2>
        <form className="profile-password-form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Input
            label="Contraseña actual"
            type="password"
            autoComplete="current-password"
            error={errors.currentPassword?.message}
            disabled={isSubmitting}
            {...register('currentPassword')}
          />
          <Input
            label="Nueva contraseña"
            type="password"
            autoComplete="new-password"
            error={errors.newPassword?.message}
            disabled={isSubmitting}
            {...register('newPassword')}
          />
          <Input
            label="Confirmar nueva contraseña"
            type="password"
            autoComplete="new-password"
            error={errors.confirmPassword?.message}
            disabled={isSubmitting}
            {...register('confirmPassword')}
          />

          {errors.root && (
            <p className="auth-alert" role="alert">
              <AlertIcon />
              <span>{errors.root.message}</span>
            </p>
          )}

          {successMessage && <p className="profile-success">{successMessage}</p>}

          <Button type="submit" disabled={isSubmitting} className="profile-password-submit">
            {isSubmitting ? (
              <span className="auth-button-loading">
                <Spinner size="sm" tone="onPrimary" />
                Guardando…
              </span>
            ) : (
              'Guardar contraseña'
            )}
          </Button>
        </form>
      </section>

      <section className="profile-card">
        <h2 className="profile-card-title">Conexiones</h2>
        <p className="profile-card-subtitle">Apps conectadas a tu cuenta de FlowHub.</p>
        <ConnectorList />
      </section>

      <section className="profile-card">
        <h2 className="profile-card-title">Apariencia</h2>
        <div className="profile-theme-toggle">
          <div>
            <p className="profile-theme-label">Modo oscuro</p>
            <p className="profile-theme-desc">Cambiá el tema de toda la aplicación.</p>
          </div>
          <button
            type="button"
            className={`profile-theme-switch${theme === 'dark' ? ' is-on' : ''}`}
            role="switch"
            aria-checked={theme === 'dark'}
            aria-label="Alternar modo oscuro"
            onClick={toggleTheme}
          >
            <span className="profile-theme-switch-icon profile-theme-switch-icon--sun">
              <SunIcon width={13} height={13} />
            </span>
            <span className="profile-theme-switch-icon profile-theme-switch-icon--moon">
              <MoonIcon width={13} height={13} />
            </span>
            <span className="profile-theme-switch-thumb" />
          </button>
        </div>
      </section>
    </div>
  )
}
