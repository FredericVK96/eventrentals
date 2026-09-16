const fs = require('fs');
const path = require('path');

const PRODUCT_FILES = [
  'partytent.html', 'stretchtent.html', 'kadertent.html', 'rodeostier.html', 'klaptafel-180cm.html',
  'barkruk.html', 'biertafelset.html', 'botsballen.html', 'buitenstoel.html', 'bungee-run.html',
  'hindernisbaan.html', 'houten-tentvloer.html', 'klapstoel-wit.html',
  'koelkast.html', 'led-sfeerverlichting.html', 'muziekbox.html', 'percolator.html',
  'picknicktafel.html', 'reuzespelen.html', 'springkasteel-groot-jungle.html',
  'springkasteel-medium-glijbaan.html', 'springkasteel-piraat.html', 'springkasteel-princess.html',
  'springkasteel-standaard.html', 'statafel.html', 'statafelhoes.html', 'tapinstallatie.html',
  'terrasverwarmer.html',
];

const results = [];
for (const file of PRODUCT_FILES) {
  const p = path.join(__dirname, file);
  if (!fs.existsSync(p)) { console.warn('MIST:', file); continue; }
  const html = fs.readFileSync(p, 'utf8');
  const m = html.match(/\{"@type":"Product","name":"([^"]+)","description":"([^"]+)","image":"([^"]+)"[^}]*"url":"([^"]+)"/);
  if (!m) { console.warn('GEEN Product JSON-LD gevonden:', file); continue; }
  const [, name, description, image, url] = m;
  results.push({ file, name, description, image, url });
  console.log('OK', file, '->', name);
}

fs.writeFileSync(path.join(__dirname, 'products-raw.json'), JSON.stringify(results, null, 2));
console.log(`\n${results.length}/${PRODUCT_FILES.length} producten geextraheerd.`);
