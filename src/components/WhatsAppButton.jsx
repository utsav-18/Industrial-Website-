import { company } from '../config'

const message = 'Hello Hari Engineering, I would like to enquire about your hydraulic products and services.'

export default function WhatsAppButton() {
  const href = `https://wa.me/${company.whatsappNumber}?text=${encodeURIComponent(message)}`
  return <a className="whatsapp-button" href={href} target="_blank" rel="noreferrer" aria-label="Chat with us on WhatsApp">
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M16 3.2A12.8 12.8 0 0 0 5 22.5L3.3 28.7l6.4-1.7A12.8 12.8 0 1 0 16 3.2Z" fill="none" stroke="currentColor" strokeWidth="2.2" />
      <path d="M11.2 9.7c.3-.3.7-.4 1-.2l1.6 2.5c.2.3.2.7 0 1l-.7.8c.7 1.4 1.7 2.4 3.1 3.1l.8-.7c.3-.2.7-.2 1 0l2.5 1.6c.3.2.4.7.2 1-.5 1-1.4 1.6-2.5 1.5-4.8-.4-8.8-4.4-9.2-9.2-.1-1.1.5-2 1.5-2.5Z" fill="currentColor" />
    </svg>
  </a>
}
