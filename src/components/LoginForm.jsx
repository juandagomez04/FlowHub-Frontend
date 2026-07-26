import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import Button from './Button'

export default function LoginForm() {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)

  const handleDevPreview = () => {
    login({ name: 'Usuario de prueba' }, 'dev-token')
    navigate('/dashboard')
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-gray-500">Formulario de login en construcción</p>

      <div className="pt-4 border-t border-gray-700">
        <p className="text-xs text-gray-500 mb-2">Acceso temporal para previsualizar el front (quitar antes de implementar auth real):</p>
        <Button variant="secondary" className="w-full" onClick={handleDevPreview}>
          Ver Dashboard sin iniciar sesión
        </Button>
      </div>
    </div>
  )
}
