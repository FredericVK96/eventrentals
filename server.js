require('dotenv').config();
const path      = require('path');
const express   = require('express');
const cors      = require('cors');
const rateLimit = require('express-rate-limit');
const MAIL_FROM_NAME  = 'EventRentals';
const MAIL_FROM_EMAIL = 'info@eventrentals.be';

const app = express();

app.set('trust proxy', 1);
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

// Gedeeltelijke bestelformulier-data: max 60 veld-updates per uur per IP
// (kan tot ~11x per formulierpoging vuren, dus ruim boven één normale sessie)
const gedeeltelijkLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Te veel aanvragen.' },
});

/* ── GOOGLE AUTH via Node crypto ────────────────────────── */
async function getGoogleAccessToken() {
  let clientEmail  = process.env.GOOGLE_CLIENT_EMAIL;
  let privateKeyId = process.env.GOOGLE_PRIVATE_KEY_ID || '';
  let privateKey   = '';

  if (process.env.GOOGLE_PRIVATE_KEY_B64) {
    // Base64-encoded key — no newline issues
    privateKey = Buffer.from(process.env.GOOGLE_PRIVATE_KEY_B64, 'base64').toString('utf8');
  } else if (process.env.GOOGLE_PRIVATE_KEY) {
    privateKey = process.env.GOOGLE_PRIVATE_KEY.replace(/\\r\\n/g, '\n').replace(/\\n/g, '\n').replace(/\r\n/g, '\n');
  } else {
    // Fallback: local development
    const fs = require('fs');
    const sa = JSON.parse(fs.readFileSync(path.join(__dirname, 'service-account.json'), 'utf8'));
    clientEmail  = sa.client_email;
    privateKey   = sa.private_key;
    privateKeyId = sa.private_key_id;
  }

  const now = Math.floor(Date.now() / 1000);
  const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT', kid: privateKeyId })).toString('base64url');
  const claim  = Buffer.from(JSON.stringify({
    iss:   clientEmail,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    aud:   'https://oauth2.googleapis.com/token',
    exp:   now + 3600,
    iat:   now,
  })).toString('base64url');

  const toSign = `${header}.${claim}`;
  const nodeCrypto = require('crypto');
  const signature = nodeCrypto.createSign('RSA-SHA256').update(toSign).sign(privateKey, 'base64url');
  const jwt = `${toSign}.${signature}`;

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
  let data = {};
  try { data = await res.json(); } catch (e) { /* ignore parse errors */ }
  // Extract row number from updatedRange e.g. "'Afgehaakte bestellingen'!A5:J5"
  const updatedRange = (data?.updates?.updatedRange) || '';
  const match = updatedRange.match(/[^!]+!A(\d+)/);
  return match ? parseInt(match[1], 10) : null;
}

async function updateSheetRow(rowIndex, row, tab = 'Bestellingen', lastCol = 'J') {
  const token = await getGoogleAccessToken();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const range = encodeURIComponent(`'${tab}'!A${rowIndex}`) + `:${lastCol}${rowIndex}`;
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?valueInputOption=USER_ENTERED`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ values: [row] }),
    }
  );
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Sheets update error ${res.status}: ${err}`);
  }
}

/* ── SITEMAP + ROBOTS ───────────────────────────────────── */
app.get('/sitemap.xml', (req, res) => {
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.sendFile(path.join(__dirname, 'sitemap.xml'));
});

app.get('/robots.txt', (req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.send('User-agent: *\nAllow: /\nSitemap: https://www.eventrentals.be/sitemap.xml\n');
});

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
  try {
  console.log('[bestelling]', new Date().toISOString(), req.body?.voornaam, req.body?.familienaam, req.body?.email);
  const {
    voornaam, familienaam, datumVan, datumTot, gsm, email,
    straat, huisnr, postcode, gemeente,
    producten, opmerkingen, prijsindicatie
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
    prijsindicatie ? (prijsindicatie.regels || []).join(' | ') : '',     // N
    prijsindicatie ? prijsindicatie.subtotaal || '' : '',                // O
    prijsindicatie ? prijsindicatie.transportOmschrijving || '' : '',    // P
    prijsindicatie ? prijsindicatie.totaal || '' : '',                   // Q
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

  // Prijsindicatie-tabel opbouwen voor e-mail (indien meegestuurd vanuit bestelling.html)
  let prijsindicatieHtml = '';
  if (prijsindicatie && typeof prijsindicatie.totaal === 'number') {
    const fmt = (n) => '€' + n.toFixed(2).replace('.', ',');
    const regelsHtml = (prijsindicatie.regels || [])
      .map(r => `<tr><td colspan="2" style="padding:3px 0;color:#1a1a1a;">${r}</td></tr>`).join('');
    prijsindicatieHtml = `
    <p><strong>Prijsindicatie:</strong></p>
    <table style="font-size:14px;border-collapse:collapse;margin-bottom:6px;width:100%;">
      ${regelsHtml}
      <tr><td style="padding:6px 0 3px;color:#6b7280;">Transport:</td><td style="padding:6px 0 3px;text-align:right;">${prijsindicatie.transportOmschrijving || '—'}</td></tr>
      <tr><td style="padding:6px 0;border-top:1px solid #e5e7eb;font-weight:700;">Geschat totaal:</td><td style="padding:6px 0;border-top:1px solid #e5e7eb;font-weight:700;text-align:right;">${fmt(prijsindicatie.totaal)}</td></tr>
    </table>
    <p style="font-size:12px;color:#6b7280;margin-top:0;">Richtprijs excl. eventuele waarborg. We bevestigen het exacte bedrag bij het afhandelen van uw aanvraag.</p>
    `;
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

  <div style="background:#2B7A6E;padding:24px 28px;border-radius:8px 8px 0 0;">
    <span style="font-family:sans-serif;font-size:1.6rem;font-weight:800;color:#ffffff;">Event<span style="color:#ffffff;">Rentals</span></span>
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

    ${prijsindicatieHtml}

    ${opmerkingen ? `<p><strong>Opmerkingen:</strong><br>${opmerkingen}</p>` : ''}

    <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;">

    <p>Vragen of aanpassingen?<br>
    Neem contact op via <a href="tel:0477396350" style="color:#2B7A6E;">0477 39 63 50</a> of <a href="mailto:info@eventrentals.be" style="color:#2B7A6E;">info@eventrentals.be</a>.</p>

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
  } catch (err) {
    console.error('[bestelling] onverwachte fout:', err.message, err.stack);
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Slaat het bestelformulier op zoals het er op elk moment bijstaat (na elk
// ingevuld veld), zodat afgehaakte bestellingen (iemand vult in maar verstuurt
// nooit) toch herkenbaar zijn — zelfde upsert-patroon als /api/bestelling hierboven.
app.post('/api/bestelling-gedeeltelijk', gedeeltelijkLimiter, async (req, res) => {
  try {
    const {
      rowIndex, stap, voornaam, familienaam, gsm, email,
      datumVan, datumTot, straat, huisnr, postcode, gemeente,
      opmerkingen, producten, ga4ClientId, ga4SessionId
    } = req.body;
    const timestamp = new Date().toISOString();
    const productenTekst = Array.isArray(producten) ? producten.join(', ') : (producten || '');
    // Zelfde kolomlayout als BouwRent's 'Afgehaakte bestellingen'-tabblad (gedeeld
    // tabblad) — begindatum/einddatum/bezorgGemeente/bezorgStraat/levering zijn
    // BouwRent's kolomnamen, hier ingevuld met EventRentals' equivalenten.
    // 'levering' (afhalen/bezorgen) bestaat niet bij EventRentals, dus leeg.
    // huisnr/postcode zijn EventRentals-specifiek en staan als extra kolommen
    // P/Q achteraan, zodat BouwRent's bestaande kolommen ongemoeid blijven.
    const sheetRow = [
      timestamp,                     // A
      voornaam    || '',             // B
      familienaam || '',             // C
      gsm         || '',             // D
      email       || '',             // E
      datumVan    || '',             // F (begindatum)
      datumTot    || '',             // G (einddatum)
      '',                            // H (levering — n.v.t. bij EventRentals)
      gemeente    || '',             // I (bezorgGemeente)
      straat      || '',             // J (bezorgStraat)
      opmerkingen || '',             // K
      productenTekst,                // L
      'Gedeeltelijk (stap ' + (stap || '?') + ')', // M
      // Apostrof-prefix dwingt Sheets (valueInputOption=USER_ENTERED) om deze lange numerieke
      // ID's als platte tekst op te slaan i.p.v. ze als getal te herinterpreteren.
      ga4ClientId ? `'${ga4ClientId}` : '', ga4SessionId ? `'${ga4SessionId}` : '', // N–O
      huisnr      || '',             // P (EventRentals-specifiek)
      postcode    || '',             // Q (EventRentals-specifiek)
    ];

    if (rowIndex) {
      await updateSheetRow(rowIndex, sheetRow, 'Afgehaakte bestellingen', 'Q')
        .catch(err => console.error('[bestelling-gedeeltelijk] update fout:', err.message));
      res.json({ ok: true, rowIndex });
    } else {
      const newRowIndex = await appendToSheet(sheetRow, 'Afgehaakte bestellingen')
        .catch(err => { console.error('[bestelling-gedeeltelijk] append fout:', err.message); return null; });
      res.json({ ok: true, rowIndex: newRowIndex });
    }
  } catch (e) {
    console.error('[bestelling-gedeeltelijk] fout:', e.message);
    res.json({ ok: false });
  }
});

module.exports = app;

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`EventRentals server draait op http://localhost:${PORT}`);
  });
}
