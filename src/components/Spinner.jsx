export default function Spinner({ className = '' }) {
  return (
    <div
      className={`animate-spin rounded-full h-6 w-6 border-2 border-gray-700 border-t-sky-500 ${className}`}
    />
  )
}
