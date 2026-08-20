import './css/Badge.css'

const VARIANT_CLASS = {
  default: 'badge--default',
  success: 'badge--success',
  error: 'badge--error',
  warning: 'badge--warning',
}

export default function Badge({ children, variant = 'default' }) {
  const variantClass = VARIANT_CLASS[variant] || VARIANT_CLASS.default

  return (
    <span className={`badge ${variantClass}`}>
      <span className="badge-dot" aria-hidden="true" />
      {children}
    </span>
  )
}
