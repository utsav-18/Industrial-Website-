import { useEffect } from 'react'
import { X } from 'lucide-react'

export default function CertificateModal({ onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const escape = (event) => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', escape)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', escape) }
  }, [onClose])
  return <div className="modal-backdrop certificate-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
    <div className="certificate-modal" role="dialog" aria-modal="true" aria-label="Hari Engineering certificate">
      <button className="modal-close" onClick={onClose} aria-label="Close certificate"><X /></button>
      <img src="/images/Certificate.png" alt="Hari Engineering certificate" />
    </div>
  </div>
}
