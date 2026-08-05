import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import Button from './Button'
import Input from './Input'

export default function RegisterForm() {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!name || !email || !password || !confirmPassword) {
      setError('Todos los campos son obligatorios.')
      return
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.')
      return
    }

    login({ name, email }, 'demo-token')
    navigate('/dashboard')
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2 className="auth-page-title">Crear cuenta</h2>
      <Input
        label="Nombre completo"
        type="text"
        placeholder="Tu nombre"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
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
      <Input
        label="Confirmar contraseña"
        type="password"
        placeholder="********"
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
      />

      {error && <p className="auth-error">{error}</p>}

      <Button type="submit" className="auth-button-primary">
        Crear cuenta
      </Button>
    </form>
  )
}
