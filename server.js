require('dotenv').config();
const path      = require('path');
const express   = require('express');
const cors      = require('cors');
const rateLimit = require('express-rate-limit');
const MAIL_FROM_NAME  = 'EventRentals';
const MAIL_FROM_EMAIL = 'info@eventrentals.be';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Globale limiet: max 30 requests per 5 minuten per IP
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Te veel aanvragen. Wacht even en probeer opnieuw.' },
});
app.use('/api/', limiter);

// Strenge limiet voor bestellingen: max 3 per uur per IP
const bestellingLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'U heeft al meerdere bestellingen geplaatst. Wacht een uur of neem telefonisch contact op.' },
  skipSuccessfulRequests: false,
});

/* ── GOOGLE AUTH via WebCrypto (bypasses OpenSSL 3.x issue) */
async function getGoogleAccessToken() {
  let clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  let privateKey  = process.env.GOOGLE_PRIVATE_KEY || '';

  // Fallback: load from service-account.json for local development
  if (!clientEmail || !privateKey) {
    const fs = require('fs');
    const sa = JSON.parse(fs.readFileSync(path.join(__dirname, 'service-account.json'), 'utf8'));
    clientEmail = sa.client_email;
    privateKey  = sa.private_key;
  }
  // Normalize escaped newlines from Vercel env vars
  privateKey = privateKey.replace(/\\r\\n/g, '\n').replace(/\\n/g, '\n').replace(/\r\n/g, '\n');

  // Strip PEM headers and decode base64 to get raw DER bytes
  const pemBody = privateKey
    .replace(/-----BEGIN PRIVATE KEY-----/g, '')
    .replace(/-----END PRIVATE KEY-----/g, '')
    .replace(/\s+/g, '');
  const keyData = Buffer.from(pemBody, 'base64');

  // Import key using WebCrypto (no OpenSSL legacy path)
  const cryptoKey = await globalThis.crypto.subtle.importKey(
    'pkcs8',
    keyData,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const now = Math.floor(Date.now() / 1000);
  const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
  const claim  = Buffer.from(JSON.stringify({
    iss:   clientEmail,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    aud:   'https://oauth2.googleapis.com/token',
    exp:   now + 3600,
    iat:   now,
  })).toString('base64url');

  const toSign  = `${header}.${claim}`;
  const sigBuf  = await globalThis.crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    cryptoKey,
    Buffer.from(toSign)
  );
  const jwt = `${toSign}.${Buffer.from(sigBuf).toString('base64url')}`;

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion:  jwt,
    }),
  });
  const tokenData = await tokenRes.json();
  if (!tokenData.access_token) throw new Error('Token error: ' + JSON.stringify(tokenData));
  return tokenData.access_token;
}

/* ── GOOGLE SHEETS ──────────────────────────────────────── */
async function appendToSheet(row, tab = 'Bestellingen', startRow = 1) {
  const token = await getGoogleAccessToken();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const range = encodeURIComponent(`'${tab}'!A${startRow}`);
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ values: [row] }),
    }
  );
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Sheets API error ${res.status}: ${err}`);
  }
}

/* ── GEOCODE PROXY (Nominatim) ───────────────────────────── */
const geocodeLimiter = rateLimit({ windowMs: 60 * 1000, max: 30, standardHeaders: true, legacyHeaders: false });

app.get('/api/geocode', geocodeLimiter, async (req, res) => {
  const q = (req.query.q || '').trim();
  if (!q || q.length < 2) return res.json([]);
  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=6&countrycodes=be&addressdetails=0&accept-language=nl`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'EventRentals/1.0 (info@eventrentals.be)',
        'Accept-Language': 'nl',
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.json([]);
  }
});

/* ── BESTELLING ENDPOINT ────────────────────────────────── */
app.post('/api/bestelling', bestellingLimiter, async (req, res) => {
  console.log('[bestelling]', new Date().toISOString(), req.body?.voornaam, req.body?.familienaam, req.body?.email);
  const {
    voornaam, familienaam, datumVan, datumTot, gsm, email,
    straat, huisnr, postcode, gemeente,
    producten, opmerkingen
  } = req.body;

  const timestamp = new Date().toISOString();

  const rij = [
    timestamp,                     // A
    voornaam    || '',             // B
    familienaam || '',             // C
    datumVan    || '',             // D
    datumTot    || '',             // E
    straat      || '',             // F
    huisnr      || '',             // G
    postcode    || '',             // H
    gemeente    || '',             // I
    gsm         || '',             // J
    email       || '',             // K
    opmerkingen || '',             // L
    Array.isArray(producten) ? producten.join(', ') : (producten || ''), // M
  ];

  const klantNaam = voornaam || 'Klant';

  // Productenlijst opbouwen voor e-mail
  let productenHtml = '';
  if (Array.isArray(producten) && producten.length > 0) {
    productenHtml = '<ul style="font-family:sans-serif;font-size:14px;margin:0;padding-left:20px;">' +
      producten.map(p => `<li>${p}</li>`).join('') +
      '</ul>';
  } else if (typeof producten === 'string' && producten.trim()) {
    productenHtml = `<p style="font-family:sans-serif;font-size:14px;">${producten}</p>`;
  }

  // ── SHEETS + EMAIL: allebei awaiten voor respons (Vercel stopt anders de functie) ──
  const [sheetsResult, mailResult] = await Promise.allSettled([
    // Google Sheets
    appendToSheet(rij, 'Bestellingen eventrentals', 1)
      .then(() => console.log('[bestelling] Sheets OK'))
      .catch(err => { console.error('Sheets bestelling fout:', err.message); throw err; }),

    // Bevestigingsmail
    email && email.includes('@')
      ? fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: { 'api-key': process.env.BREVO_API_KEY, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sender: { name: MAIL_FROM_NAME, email: MAIL_FROM_EMAIL },
            to: [{ email }],
            subject: 'Bevestiging jouw aanvraag — EventRentals',
            htmlContent: `
<div style="font-family:sans-serif;font-size:14px;color:#1a1a1a;max-width:600px;margin:0 auto;line-height:1.6;">

  <div style="background:#5B2D8E;padding:24px 28px;border-radius:8px 8px 0 0;">
    <span style="font-family:sans-serif;font-size:1.6rem;font-weight:800;color:#ffffff;">Happy<span style="color:#FFD600;">Bounce</span></span>
  </div>

  <div style="padding:28px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;">
    <p>Beste ${klantNaam},</p>

    <p>Hartelijk bedankt voor jouw aanvraag bij EventRentals!<br>
    Wij verwerken jouw aanvraag zo snel mogelijk en nemen contact met je op ter bevestiging.</p>

    <p><strong>Jouw aanvraag:</strong></p>

    <table style="font-size:14px;border-collapse:collapse;margin-bottom:16px;width:100%;">
      <tr><td style="padding:4px 16px 4px 0;color:#6b7280;white-space:nowrap;">Voornaam:</td><td>${voornaam || '—'}</td></tr>
      <tr><td style="padding:4px 16px 4px 0;color:#6b7280;">Familienaam:</td><td>${familienaam || '—'}</td></tr>
      <tr><td style="padding:4px 16px 4px 0;color:#6b7280;">Startdatum verhuur:</td><td>${datumVan || '—'}</td></tr>
      <tr><td style="padding:4px 16px 4px 0;color:#6b7280;">Einddatum verhuur:</td><td>${datumTot || '—'}</td></tr>
      <tr><td style="padding:4px 16px 4px 0;color:#6b7280;">Gsm Nr.:</td><td>${gsm || '—'}</td></tr>
      <tr><td style="padding:4px 16px 4px 0;color:#6b7280;">E-mail:</td><td>${email || '—'}</td></tr>
      <tr><td style="padding:4px 16px 4px 0;color:#6b7280;">Adres:</td><td>${[straat, huisnr, postcode, gemeente].filter(Boolean).join(', ') || '—'}</td></tr>
    </table>

    <p><strong>Gewenste producten:</strong></p>
    ${productenHtml || '<p style="color:#6b7280;">Geen producten opgegeven.</p>'}

    ${opmerkingen ? `<p><strong>Opmerkingen:</strong><br>${opmerkingen}</p>` : ''}

    <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;">

    <p>Vragen of aanpassingen?<br>
    Neem contact op via <a href="tel:0477396350" style="color:#5B2D8E;">0477 39 63 50</a> of <a href="mailto:info@eventrentals.be" style="color:#5B2D8E;">info@eventrentals.be</a>.</p>

    <p>Met vriendelijke groeten,<br><strong>Het EventRentals team</strong><br>
    <span style="color:#6b7280;font-size:13px;">Begoniapark 14, 9810 Nazareth-De Pinte</span></p>
  </div>

</div>
          `,
          }),
        }).then(r => r.json()).then(d => { if (d.messageId) console.log('[bestelling] Mail OK →', email); else throw new Error(JSON.stringify(d)); })
          .catch(err => { console.error('Klant mail fout:', err.message); throw err; })
      : Promise.resolve(),
  ]);

  res.json({
    ok: true,
    _debug: {
      sheets: sheetsResult.status === 'fulfilled' ? 'ok' : sheetsResult.reason?.message,
      mail:   mailResult.status   === 'fulfilled' ? 'ok' : mailResult.reason?.message,
    }
  });
});

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`EventRentals server draait op http://localhost:${PORT}`);
  });
}
