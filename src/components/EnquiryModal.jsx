import { useEffect } from 'react'
import { X } from 'lucide-react'
import EnquiryForm from './EnquiryForm'

export default function EnquiryModal({ product, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const escape = (event) => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', escape)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', escape) }
  }, [onClose])
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <button className="modal-close" onClick={onClose} aria-label="Close enquiry form"><X /></button>
      <p className="eyebrow">Start a conversation</p><h2 id="modal-title">Enquire About {product?.name || 'Hari Engineering'}</h2>
      <p className="modal-intro">Share a few details and our team will get back to you with a considered response.</p>
      <EnquiryForm productName={product?.name || ''} onSuccess={() => {}} />
    </div>
  </div>
}
