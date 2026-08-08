import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { register as registerUser } from '../api/auth.api'
import Button from './Button'
import Input from './Input'
import Spinner from './Spinner'
import { EyeIcon, EyeOffIcon, AlertIcon } from './icons/AuthIcons'

const registerSchema = z
  .object({
    name: z.string().min(2, 'Ingresá tu nombre completo.'),
    email: z.string().min(1, 'Ingresá tu correo electrónico.').email('Ingresá un correo electrónico válido.'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres.'),
    confirmPassword: z.string().min(1, 'Confirmá tu contraseña.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden.',
    path: ['confirmPassword'],
  })

export default function RegisterForm() {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  })

  const onSubmit = async ({ name, email, password }) => {
    try {
      const response = await registerUser({ name, email, password })
      login(response.user, 'demo-token')
      navigate('/dashboard')
    } catch (error) {
      const message = error?.response?.data?.message || 'No pudimos crear tu cuenta. Intentá nuevamente.'
      setError('root', { message })
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="auth-heading">
        <h2 className="auth-page-title">Crear cuenta</h2>
        <p className="auth-page-subtitle">Completá tus datos para empezar a usar FlowHub.</p>
      </div>

      <Input
        label="Nombre completo"
        type="text"
        autoComplete="name"
        placeholder="Tu nombre"
        error={errors.name?.message}
        disabled={isSubmitting}
        required
        {...register('name')}
      />
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
        autoComplete="new-password"
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
      <Input
        label="Confirmar contraseña"
        type={showConfirmPassword ? 'text' : 'password'}
        autoComplete="new-password"
        placeholder="********"
        error={errors.confirmPassword?.message}
        disabled={isSubmitting}
        required
        endAdornment={
          <button
            type="button"
            className="auth-input-toggle"
            onClick={() => setShowConfirmPassword((value) => !value)}
            aria-label={showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            aria-pressed={showConfirmPassword}
          >
            {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        }
        {...register('confirmPassword')}
      />

      {errors.root && (
        <p className="auth-alert" role="alert">
          <AlertIcon />
          <span>{errors.root.message}</span>
        </p>
      )}

      <Button type="submit" className="auth-button-primary w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <span className="auth-button-loading">
            <Spinner size="sm" tone="onPrimary" />
            Creando cuenta…
          </span>
        ) : (
          'Crear cuenta'
        )}
      </Button>

      <p className="auth-switch">
        ¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link>
      </p>
    </form>
  )
}
