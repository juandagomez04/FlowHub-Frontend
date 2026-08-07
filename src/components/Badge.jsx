const VARIANTS = {
  default: { background: 'rgba(76, 105, 130, 0.1)', color: '#3d5b72' },
  success: { background: 'rgba(27, 122, 69, 0.1)', color: '#1b7a45' },
  error: { background: 'rgba(208, 68, 69, 0.1)', color: '#b3282a' },
  warning: { background: 'rgba(146, 96, 10, 0.12)', color: '#92600a' },
}

export default function Badge({ children, variant = 'default' }) {
  const { background, color } = VARIANTS[variant]

  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
      style={{ background, color }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} aria-hidden="true" />
      {children}
    </span>
  )
}
