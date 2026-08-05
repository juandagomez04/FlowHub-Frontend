export default function Button({ children, type = 'button', variant = 'primary', className = '', ...props }) {
  const variants = {
    primary: 'bg-sky-600 text-white hover:bg-sky-700',
    secondary: 'bg-transparent border border-slate-300 text-slate-900 hover:bg-slate-100',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  }

  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
