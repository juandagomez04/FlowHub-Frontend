import './css/Modal.css'

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal-panel">
        <div className="modal-header">
          {title && <h2 className="modal-title">{title}</h2>}
          <button type="button" onClick={onClose} className="modal-close">
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
