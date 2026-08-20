import { forwardRef, useId } from 'react'
import './css/Input.css'

const Input = forwardRef(function Input(
  { label, error, endAdornment, className = '', id, ...props },
  ref,
) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const errorId = error ? `${inputId}-error` : undefined

  return (
    <div className={`input-control auth-input ${error ? 'auth-input--error' : ''} ${className}`}>
      {label && (
        <label htmlFor={inputId} className="ui-label input-label">
          {label}
        </label>
      )}
      <div className="auth-input-field-wrap">
        <input
          id={inputId}
          ref={ref}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={errorId}
          className={`ui-input input-field ${endAdornment ? 'auth-input-field--with-adornment' : ''}`}
          {...props}
        />
        {endAdornment && <div className="auth-input-adornment">{endAdornment}</div>}
      </div>
      {error && (
        <span id={errorId} className="auth-field-error" role="alert">
          {error}
        </span>
      )}
    </div>
  )
})

export default Input
