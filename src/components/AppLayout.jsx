import { Outlet, Link } from 'react-router-dom'

export default function AppLayout() {
  return (
    <div className="min-h-screen flex">
      <aside className="w-56 bg-gray-950 text-white flex flex-col p-4 gap-2 border-r border-gray-800">
        <span className="text-lg font-semibold mb-4">FlowHub</span>
        <Link to="/dashboard" className="text-gray-300 hover:text-indigo-400">Dashboard</Link>
        <Link to="/automations" className="text-gray-300 hover:text-indigo-400">Automatizaciones</Link>
        <Link to="/connectors" className="text-gray-300 hover:text-indigo-400">Conectores</Link>
        <Link to="/history" className="text-gray-300 hover:text-indigo-400">Historial</Link>
      </aside>
      <div className="flex-1 flex flex-col bg-gray-900">
        <nav className="h-14 border-b border-gray-800 flex items-center px-6">
          <span className="text-sm text-gray-400">Navbar</span>
        </nav>
        <main className="flex-1 p-6 text-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
