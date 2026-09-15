// Injecteert de GA4 gtag-snippet in alle HTML-pagina's (zelfde patroon als BouwRent).
// Gebruik: node inject-gtag.js G-XXXXXXXXXX
const fs = require('fs');
const path = require('path');

const MEASUREMENT_ID = process.argv[2];
if (!MEASUREMENT_ID || !/^G-[A-Z0-9]{6,}$/.test(MEASUREMENT_ID)) {
  console.error('Gebruik: node inject-gtag.js G-XXXXXXXXXX');
  process.exit(1);
}

const SNIPPET = `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${MEASUREMENT_ID}');
</script>
`;

const dir = __dirname;
let done = 0, skipped = 0;
for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith('.html')) continue;
  if (f.startsWith('google')) { skipped++; continue; } // Search Console verificatiebestand
  const p = path.join(dir, f);
  let html = fs.readFileSync(p, 'utf8');
  if (html.includes('googletagmanager.com/gtag')) { skipped++; continue; }
  const headMatch = html.match(/<head[^>]*>/i);
  if (!headMatch) { console.warn(`GEEN <head>: ${f}`); skipped++; continue; }
  html = html.replace(headMatch[0], headMatch[0] + '\n' + SNIPPET);
  fs.writeFileSync(p, html, 'utf8');
  done++;
  console.log(`OK  ${f}`);
}
console.log(`\nKlaar: ${done} pagina's voorzien van ${MEASUREMENT_ID}, ${skipped} overgeslagen.`);
