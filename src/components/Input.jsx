export default function Input({ label, error, className = '', ...props }) {
  return (
    <div className={`flex flex-col gap-1 auth-input ${className}`}>
      {label && <label className="text-sm font-medium text-slate-700">{label}</label>}
      <input
        className="px-3 py-2 bg-white border border-slate-300 text-slate-900 placeholder-slate-400 rounded-md text-sm focus:outline-none"
        {...props}
      />
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  )
}
