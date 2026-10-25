export async function submitEnquiry(payload) {
  const endpoint = import.meta.env.VITE_GOOGLE_SCRIPT_URL
  if (!endpoint) {
    throw new Error('The enquiry endpoint is not configured yet.')
  }
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload),
  })
  if (!response.ok) throw new Error('The enquiry could not be sent. Please try again.')
  const result = await response.json()
  if (!result.success) throw new Error(result.message || 'The enquiry could not be sent.')
  return result
}
