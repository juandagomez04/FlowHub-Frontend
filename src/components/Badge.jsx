export default function Badge({ children, variant = 'default' }) {
  const variants = {
    default: 'bg-gray-700 text-gray-200',
    success: 'bg-green-900 text-green-300',
    error: 'bg-red-900 text-red-300',
    warning: 'bg-yellow-900 text-yellow-300',
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  )
}
