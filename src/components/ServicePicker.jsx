export default function ServicePicker({ service, onSelect }) {
  return (
    <div className="service-picker">
      <button
        type="button"
        className={`service-option${service === 'gmail' ? ' is-active' : ''}`}
        onClick={() => onSelect('gmail')}
      >
        Gmail
      </button>
      <button
        type="button"
        className={`service-option${service === 'github' ? ' is-active' : ''}`}
        onClick={() => onSelect('github')}
      >
        GitHub
      </button>
    </div>
  )
}
