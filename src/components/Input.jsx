import { forwardRef, useId } from 'react'

const Input = forwardRef(function Input(
  { label, error, endAdornment, className = '', id, ...props },
  ref,
) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const errorId = error ? `${inputId}-error` : undefined

  return (
    <div className={`flex flex-col gap-2 auth-input ${error ? 'auth-input--error' : ''} ${className}`}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <div className="auth-input-field-wrap">
        <input
          id={inputId}
          ref={ref}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={errorId}
          className={`px-3 py-2 bg-white border rounded-md text-sm text-slate-900 placeholder-slate-400 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed ${endAdornment ? 'auth-input-field--with-adornment' : ''}`}
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
