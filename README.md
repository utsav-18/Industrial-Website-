# Hari Engineering website

## Local development

```bash
npm install
npm run dev
```

The supplied product and customer assets are served from [`public/images`](./public/images). Configure a Google Apps Script endpoint in `.env` before testing enquiry submission:

```bash
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/your-deployment-id/exec
```

## Google Sheets setup

1. Create or select the client's Google Sheet.
2. Open **Extensions → Apps Script**, paste [`google-apps-script/Code.gs`](./google-apps-script/Code.gs), and save.
3. Deploy as a web app. Choose an appropriate access setting for the client's workflow.
4. Add the deployed URL to `.env` as `VITE_GOOGLE_SCRIPT_URL`, then restart Vite.
5. Submit a real test enquiry and verify the new row in the sheet.

The frontend intentionally reports an unconfigured endpoint as an error rather than showing a false success. The live Google Sheet endpoint cannot be verified until the client deploys the script.

## Source-data confirmation notes

The brochure-sourced H-frame daylight value (`100–200 mm`) is preserved and should be confirmed before publication. Warranty language for pump/valve repair and refurbishment should likewise be confirmed for each scope.
