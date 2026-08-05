import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import Button from './Button'
import Input from './Input'

export default function LoginForm() {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!email || !password) {
      setError('Por favor completa email y contraseña.')
      return
    }

    login({ name: email.split('@')[0], email }, 'demo-token')
    navigate('/dashboard')
  }

  const handleDevPreview = () => {
    login({ name: 'Usuario de prueba' }, 'dev-token')
    navigate('/dashboard')
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2 className="auth-page-title">Iniciar sesión</h2>
      <Input
        label="Correo electrónico"
        type="email"
        placeholder="tucorreo@ejemplo.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <Input
        label="Contraseña"
        type="password"
        placeholder="********"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      {error && <p className="auth-error">{error}</p>}

      <Button type="submit" className="auth-button-primary">
        Iniciar sesión
      </Button>

      <div className="auth-divider">
        <p className="auth-note">Acceso temporal para previsualizar el front.</p>
        <Button variant="secondary" className="auth-button-secondary w-full mt-3" onClick={handleDevPreview}>
          Ver Dashboard sin iniciar sesión
        </Button>
      </div>
    </form>
  )
}
