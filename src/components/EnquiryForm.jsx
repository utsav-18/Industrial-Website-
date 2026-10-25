import { useState } from 'react'
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'
import { submitEnquiry } from '../services/googleSheets'

const initial = { firmName: '', name: '', email: '', phone: '', city: '', requirements: '' }

function validate(values) {
  const errors = {}
  if (!values.firmName.trim()) errors.firmName = 'Firm name is required.'
  if (!values.name.trim()) errors.name = 'Name is required.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Enter a valid email address.'
  if (!/^[6-9]\d{9}$/.test(values.phone)) errors.phone = 'Enter a valid 10-digit Indian mobile number.'
  if (!values.city.trim()) errors.city = 'City is required.'
  if (!values.requirements.trim()) errors.requirements = 'Please tell us about your requirement.'
  return errors
}

export default function EnquiryForm({ productName = '', onSuccess }) {
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  function update(event) {
    const { name, value } = event.target
    const nextValue = name === 'phone' ? value.replace(/\D/g, '').slice(0, 10) : value
    setValues((current) => ({ ...current, [name]: nextValue }))
    if (errors[name]) setErrors((current) => ({ ...current, [name]: '' }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (loading) return
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return
    setLoading(true)
    setStatus(null)
    try {
      await submitEnquiry({ ...values, productName })
      setStatus({ type: 'success', message: 'Thank you. Your enquiry has been received.' })
      setValues(initial)
      onSuccess?.()
    } catch (error) {
      setStatus({ type: 'error', message: error.message })
    } finally {
      setLoading(false)
    }
  }

  const fields = [
    ['firmName', 'Firm Name', 'Your company name.'],
    ['name', 'Name', 'Your full name.'],
    ['email', 'Email', 'your@email.com'],
    ['phone', 'Phone Number', '10-digit mobile number'],
    ['city', 'City', 'Your city'],
  ]
  return (
    <form className="enquiry-form" onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        {fields.map(([name, label, placeholder]) => (
          <label key={name} className="field">
            <span>{label} <i>*</i></span>
            <input
              name={name}
              value={values[name]}
              onChange={update}
              placeholder={placeholder}
              aria-invalid={Boolean(errors[name])}
              aria-describedby={errors[name] ? `${name}-error` : undefined}
              type={name === 'email' ? 'email' : name === 'phone' ? 'tel' : 'text'}
              inputMode={name === 'phone' ? 'numeric' : undefined}
              maxLength={name === 'phone' ? 10 : undefined}
              minLength={name === 'phone' ? 10 : undefined}
              autoComplete={name === 'phone' ? 'tel' : undefined}
            />
            {errors[name] && <small id={`${name}-error`} className="field-error">{errors[name]}</small>}
          </label>
        ))}
        <label className="field field-wide">
          <span>Requirements <i>*</i></span>
          <textarea name="requirements" value={values.requirements} onChange={update} placeholder="Tell us your requirement in brief." rows="4" aria-invalid={Boolean(errors.requirements)} />
          {errors.requirements && <small className="field-error">{errors.requirements}</small>}
        </label>
      </div>
      <div className="form-footer">
        {status && <p className={status.type === 'success' ? 'form-status success' : 'form-status error'}>{status.type === 'success' && <CheckCircle2 size={16} />}{status.message}</p>}
        <button className="button button-primary" disabled={loading} type="submit">{loading ? <><Loader2 className="spin" size={17} /> Sending...</> : <>Get Quote <ArrowRight size={16} /></>}</button>
      </div>
    </form>
  )
}
