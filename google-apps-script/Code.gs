const REQUIRED_FIELDS = ['firmName', 'name', 'email', 'phone', 'city', 'requirements'];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const errors = validate(data);
    if (errors.length) return response(false, errors.join(' '));
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    sheet.appendRow([
      new Date(),
      data.firmName.trim(),
      data.name.trim(),
      data.email.trim(),
      data.phone.trim(),
      data.city.trim(),
      data.requirements.trim(),
      String(data.productName || '').trim(),
    ]);
    return response(true, 'Enquiry saved.');
  } catch (error) {
    return response(false, 'Unable to save enquiry.');
  }
}

function validate(data) {
  const missing = REQUIRED_FIELDS.filter((field) => !data[field] || !String(data[field]).trim());
  if (missing.length) return ['Please complete all required fields.'];
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return ['Please provide a valid email.'];
  if (!/^[6-9]\d{9}$/.test(String(data.phone).replace(/[\s-]/g, ''))) return ['Please provide a valid Indian mobile number.'];
  return [];
}

function response(success, message) {
  return ContentService
    .createTextOutput(JSON.stringify({ success: success, message: message }))
    .setMimeType(ContentService.MimeType.JSON);
}
