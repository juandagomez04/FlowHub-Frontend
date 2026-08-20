import './css/Button.css'

export default function Button({ children, type = 'button', variant = 'primary', className = '', ...props }) {
  const variants = {
    primary: 'ui-button-primary',
    secondary: 'ui-button-secondary',
    danger: 'ui-button-danger',
  }

  return (
    <button
      type={type}
      className={`ui-button ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
