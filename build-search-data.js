const fs = require('fs');
const path = require('path');

const raw = JSON.parse(fs.readFileSync(path.join(__dirname, 'products-raw.json'), 'utf8'));

// Hand-tuned synonyms/keys per file, so the autocomplete finds things by how
// people actually type, not just the exact product name.
const KEYS = {
  'partytent-4x8m.html': ['partytent', 'grote tent', 'pagodetent', 'feesttent', '4x8', 'tent groot', 'tuinfeest tent'],
  'partytent-3x6m.html': ['partytent', 'kleine tent', 'pagodetent', 'feesttent', '3x6', 'tent klein', 'tuinfeest tent'],
  'rodeostier.html': ['rodeo', 'rodeo stier', 'mechanische stier', 'bull ride', 'stier rijden'],
  'klaptafel-180cm.html': ['klaptafel', 'vouwtafel', 'feesttafel', 'tafel huren', 'bankettafel'],
  'barkruk.html': ['barkruk', 'barstoel', 'lounge kruk', 'receptie kruk'],
  'biertafelset.html': ['biertafel', 'biertafelset', 'bierbank', 'tafel en banken'],
  'botsballen.html': ['botsballen', 'sumo suits', 'bumperball', 'bodyzorb', 'zorb bal'],
  'buitenstoel.html': ['buitenstoel', 'terrasstoel', 'tuinstoel'],
  'bungee-run.html': ['bungee run', 'bungeerun', 'trektouw spel', 'touwtrek attractie'],
  'easy-up-vouwtent.html': ['vouwtent', 'easy up', 'easyup', 'partytent klein', 'pop-up tent'],
  'hindernisbaan.html': ['hindernisbaan', 'obstacle course', 'hindernissen', 'opblaasbare hindernisbaan'],
  'houten-tentvloer.html': ['tentvloer', 'vloer', 'houten vloer', 'vloerplaten'],
  'klapstoel-wit.html': ['klapstoel', 'vouwstoel', 'witte stoel', 'feeststoel'],
  'koelkast.html': ['koelkast', 'frigo', 'drankkoeling', 'koeling huren'],
  'led-sfeerverlichting.html': ['sfeerverlichting', 'led verlichting', 'lichtslinger', 'feestverlichting'],
  'muziekbox.html': ['muziekbox', 'speaker', 'luidspreker', 'bluetooth speaker', 'geluidsinstallatie'],
  'percolator.html': ['percolator', 'koffieketel', 'koffiezet', 'koffie voor groep'],
  'picknicktafel.html': ['picknicktafel', 'picknik tafel', 'houten tafel met banken'],
  'reuzespelen.html': ['reuzespelen', 'reuze jenga', 'reuze vier op een rij', 'grote spelen'],
  'springkasteel-groot-jungle.html': ['springkasteel', 'dino springkasteel', 'jungle springkasteel', 'groot springkasteel', 'springkasteel met glijbaan'],
  'springkasteel-medium-glijbaan.html': ['springkasteel', 'springkasteel glijbaan', 'medium springkasteel'],
  'springkasteel-piraat.html': ['voetbal darts', 'darts spel', 'voetbaldarts', 'opblaasbaar dartsspel'],
  'springkasteel-princess.html': ['springkasteel', 'prinsessen springkasteel', 'roze springkasteel', 'meisjes springkasteel'],
  'springkasteel-standaard.html': ['springkasteel', 'standaard springkasteel', 'klassiek springkasteel'],
  'statafel.html': ['statafel', 'cocktailtafel', 'sta tafel', 'receptietafel'],
  'statafelhoes.html': ['statafelhoes', 'tafelhoes', 'statafel doek'],
  'tapinstallatie.html': ['tapinstallatie', 'biertap', 'taptoren', 'bierinstallatie', 'fust tappen'],
  'terrasverwarmer.html': ['terrasverwarmer', 'heater', 'gasverwarmer', 'paddenstoel verwarming'],
};

function decodeImg(url) {
  const filename = url.split('/').pop();
  return decodeURIComponent(filename);
}

function shortDesc(name, description) {
  // Trim the boilerplate "X huren bij EventRentals." lead-in for the compact
  // dropdown line — keep just the descriptive remainder.
  return description.replace(/^.*?huren bij EventRentals\.\s*/i, '').trim();
}

const entries = raw.map((p) => {
  const link = p.file; // relative, matches the rest of the site's internal linking
  const img = decodeImg(p.image);
  const keys = KEYS[p.file] || [p.name.toLowerCase()];
  return { name: p.name, desc: shortDesc(p.name, p.description), link, img, keys };
});

const lines = entries.map((e) => {
  const keysStr = e.keys.map((k) => `'${k.replace(/'/g, "\\'")}'`).join(',');
  return `    { name: '${e.name.replace(/'/g, "\\'")}', desc: '${e.desc.replace(/'/g, "\\'")}', link: '${e.link}', img: '${e.img.replace(/'/g, "\\'")}',\n      keys: [${keysStr}] },`;
});

const output = `// Zoekbalk-autocomplete productdata — gedeeld door alle pagina's.
// Extern zodat Google deze productnamen niet als paginacontent leest op elke
// pagina die de zoekbalk heeft (zelfde reden als BouwRent's search-data.js —
// zie diens SEO-analyse 06/09/2026 over keyword-lek naar locatiepagina's).
var NAV_SEARCH_PRODUCTS = [
${lines.join('\n')}
];
`;

fs.writeFileSync(path.join(__dirname, 'search-data.js'), output, 'utf8');
console.log('search-data.js geschreven met', entries.length, 'producten.');
