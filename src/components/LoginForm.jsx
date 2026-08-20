import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { login as loginRequest } from '../api/auth.api'
import Button from './Button'
import Input from './Input'
import Spinner from './Spinner'
import { EyeIcon, EyeOffIcon, AlertIcon } from './icons/AuthIcons'

const loginSchema = z.object({
  email: z.string().min(1, 'Ingresá tu correo electrónico.').email('Ingresá un correo electrónico válido.'),
  password: z.string().min(1, 'Ingresá tu contraseña.'),
})

export default function LoginForm() {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = async ({ email, password }) => {
    try {
      const response = await loginRequest({ email, password })
      login(response.user, response.token)
      navigate('/dashboard')
    } catch (error) {
      const message = error?.response?.data?.message || 'No pudimos iniciar sesión. Intentá nuevamente.'
      setError('root', { message })
    }
  }

  const handleDevPreview = () => {
    login({ name: 'Usuario de prueba' }, 'dev-token')
    navigate('/dashboard')
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="auth-heading">
        <h2 className="auth-page-title">Iniciar sesión</h2>
        <p className="auth-page-subtitle">Ingresá tus credenciales para acceder a tu cuenta.</p>
      </div>

      <Input
        label="Correo electrónico"
        type="email"
        autoComplete="email"
        placeholder="tucorreo@ejemplo.com"
        error={errors.email?.message}
        disabled={isSubmitting}
        required
        {...register('email')}
      />
      <Input
        label="Contraseña"
        type={showPassword ? 'text' : 'password'}
        autoComplete="current-password"
        placeholder="********"
        error={errors.password?.message}
        disabled={isSubmitting}
        required
        endAdornment={
          <button
            type="button"
            className="auth-input-toggle"
            onClick={() => setShowPassword((value) => !value)}
            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            aria-pressed={showPassword}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        }
        {...register('password')}
      />

      {errors.root && (
        <p className="auth-alert" role="alert">
          <AlertIcon />
          <span>{errors.root.message}</span>
        </p>
      )}

      <Button type="submit" className="auth-button-primary auth-button-block" disabled={isSubmitting}>
        {isSubmitting ? (
          <span className="auth-button-loading">
            <Spinner size="sm" tone="onPrimary" />
            Iniciando sesión…
          </span>
        ) : (
          'Iniciar sesión'
        )}
      </Button>

      <p className="auth-switch">
        ¿No tenés cuenta? <Link to="/register">Creá una</Link>
      </p>

      <div className="auth-divider">
        <p className="auth-note">Acceso temporal para previsualizar el front, sin pasar por el login.</p>
        <Button
          variant="secondary"
          className="auth-button-secondary auth-button-block auth-button-spaced"
          onClick={handleDevPreview}
          disabled={isSubmitting}
        >
          Ver Dashboard sin iniciar sesión
        </Button>
      </div>
    </form>
  )
}
