// Vervangt de oude enkele-rij nav door de BouwRent-stijl zoekbalk-nav
// (utility-bar + search-row + menu-row) op alle pagina's, en voegt de
// gedeelde search-data.js + zoekbalk-JS toe. Idempotent: pagina's die het
// nieuwe search-row-blok al bevatten worden overgeslagen.
const fs = require('fs');
const path = require('path');

const NAV_HTML = fs.readFileSync(path.join(__dirname, 'nav-fragment.txt'), 'utf8');
const NAV_HTML_INDEX = fs.readFileSync(path.join(__dirname, 'nav-fragment-index.txt'), 'utf8');
const NAV_CSS = fs.readFileSync(path.join(__dirname, 'nav-css-fragment.txt'), 'utf8');
const NAV_JS = fs.readFileSync(path.join(__dirname, 'nav-js-fragment.txt'), 'utf8');

// Drie varianten van de oude nav-wrapper zijn in omloop: de meeste pagina's
// hebben een kale sticky-div, index.html + de feestmateriaal-huren-*
// locatiepagina's hebben er een met id="sticky-header", en bestelling.html
// gebruikt een class="sticky-wrap".
const OLD_NAV_RE = /<div(?:\s+id="sticky-header")?\s+style="position:sticky;top:0;z-index:1100;">[\s\S]*?<\/nav>\s*<\/div>|<div class="sticky-wrap">[\s\S]*?<\/nav>\s*<\/div>/;

const dir = __dirname;
let done = 0, skipped = 0, noMatch = 0;

for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith('.html')) continue;
  const p = path.join(dir, f);
  let html = fs.readFileSync(p, 'utf8');

  if (html.includes('class="search-row"')) { console.log('AL GEDAAN, overgeslagen:', f); skipped++; continue; }

  if (!OLD_NAV_RE.test(html)) { console.warn('GEEN oude nav gevonden, overgeslagen:', f); noMatch++; continue; }

  // index.html heeft eigen secties (#catalogus/#transport/#contact) dus
  // gebruikt kale anchors; alle andere pagina's linken terug naar index.html.
  const fragment = f === 'index.html' ? NAV_HTML_INDEX : NAV_HTML;
  html = html.replace(OLD_NAV_RE, fragment);

  const styleClose = html.indexOf('</style>');
  if (styleClose === -1) { console.warn('GEEN </style> gevonden, CSS niet toegevoegd:', f); }
  else { html = html.slice(0, styleClose) + NAV_CSS + html.slice(styleClose); }

  const bodyClose = html.lastIndexOf('</body>');
  const scriptTag = `<script src="search-data.js"></script>\n${NAV_JS}\n`;
  if (bodyClose === -1) { html += scriptTag; }
  else { html = html.slice(0, bodyClose) + scriptTag + html.slice(bodyClose); }

  fs.writeFileSync(p, html, 'utf8');
  console.log('OK', f);
  done++;
}

console.log(`\nKlaar: ${done} pagina's bijgewerkt, ${skipped} al gedaan, ${noMatch} zonder oude nav overgeslagen.`);
