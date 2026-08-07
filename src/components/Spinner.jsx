export default function Spinner({ size = 'md', tone = 'default', className = '' }) {
  const sizes = {
    sm: 'h-4 w-4 border-2',
    md: 'h-6 w-6 border-2',
  }

  const tones = {
    default: 'border-gray-700 border-t-sky-500',
    onPrimary: 'border-white/30 border-t-white',
  }

  return (
    <div
      className={`animate-spin rounded-full ${sizes[size]} ${tones[tone]} ${className}`}
      aria-hidden="true"
    />
  )
}
