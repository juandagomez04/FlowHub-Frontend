import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-sm bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700">
        <h1 className="text-xl font-semibold text-center mb-6 text-gray-100">FlowHub</h1>
        <Outlet />
      </div>
    </div>
  )
}
