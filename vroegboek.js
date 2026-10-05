// ── VROEGBOEKKORTING 2027 ──
// "Heel weekend voor de prijs van 1 dag" bij boeking vóór EINDE, voor een feest in PERIODE.
// Na EINDE verdwijnen balk, badges en prijsblokken vanzelf; de bestelpagina rekent dan ook
// geen korting meer. Alle actie-instellingen staan hieronder in VB_CONFIG.
(function () {
  var VB_CONFIG = {
    einde: new Date('2026-10-31T23:59:59+01:00'),   // laatste boekmoment
    periodeVan: '2027-03-01',                       // startdatum feest (voorjaar 2027)
    periodeTot: '2027-06-30',
    maxDagen: 3,                                    // huurperiode volgens bestelformulier (vr → ma = 3)
    producten: /^(Partytent|Stretchtent|Rodeostier)/i,
    paginas: /(partytent|stretchtent|rodeostier)\.html$/i,
  };

  function actief() { return new Date() <= VB_CONFIG.einde; }
  function dagenTeGaan() { return Math.max(0, Math.ceil((VB_CONFIG.einde - new Date()) / 86400000)); }
  function geldtVoor(naam) { return VB_CONFIG.producten.test(naam || ''); }
  function inPeriode(datum) { return !!datum && datum >= VB_CONFIG.periodeVan && datum <= VB_CONFIG.periodeTot; }
  function euro(n) { return '€' + (Math.round(n * 100) / 100).toFixed(2).replace('.', ',').replace(',00', ''); }

  // Gebruikt door bestelling.html om de korting in de prijsindicatie te verrekenen.
  window.VB = {
    actief: actief, geldtVoor: geldtVoor, inPeriode: inPeriode, config: VB_CONFIG,
    toepasbaar: function (naam, startdatum, dagen) {
      return actief() && geldtVoor(naam) && inPeriode(startdatum) && dagen >= 2 && dagen <= VB_CONFIG.maxDagen;
    },
  };
  if (!actief()) return;

  var css = [
    '.vb-bar{background:#1E5950;color:#fff;font-family:Nunito,sans-serif;font-size:.9rem;padding:9px 44px 9px 16px;text-align:center;position:relative;line-height:1.4}',
    '.vb-bar strong{color:#FFD43B}',
    '.vb-bar a{color:#fff;font-weight:700;text-decoration:underline;margin-left:6px;white-space:nowrap}',
    '.vb-bar .vb-left{display:inline-block;background:#FF7A00;color:#fff;font-weight:800;font-size:.75rem;padding:2px 8px;border-radius:999px;margin-left:8px;white-space:nowrap}',
    '.vb-bar-x{position:absolute;right:10px;top:50%;transform:translateY(-50%);background:none;border:0;color:#fff;font-size:1.3rem;cursor:pointer;opacity:.7;line-height:1}',
    '.vb-img-wrap{position:relative;display:block}',
    '.vb-badge{position:absolute;top:12px;left:12px;z-index:2;background:#FF7A00;color:#fff;font-family:Nunito,sans-serif;font-weight:800;font-size:.72rem;letter-spacing:.04em;text-transform:uppercase;padding:6px 10px;border-radius:6px;box-shadow:0 2px 8px rgba(0,0,0,.18);line-height:1.2;pointer-events:none}',
    '.vb-badge small{display:block;font-weight:700;font-size:.62rem;opacity:.95;text-transform:none;letter-spacing:0}',
    '.vb-badge.vb-big{font-size:.95rem;padding:9px 14px;top:16px;left:16px}',
    '.vb-badge.vb-big small{font-size:.75rem}',
    '.vb-price{margin-top:16px;padding:14px 16px;border-radius:8px;background:#FFF4E6;border:1.5px solid #FFC078}',
    '.vb-price-tag{display:inline-block;background:#FF7A00;color:#fff;font-weight:800;font-size:.68rem;letter-spacing:.08em;padding:3px 8px;border-radius:4px;margin-bottom:8px}',
    '.vb-price-row{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap}',
    '.vb-price-lbl{font-weight:700;color:#1a1a1a;font-size:.95rem}',
    '.vb-price-old{color:#6b7280;text-decoration:line-through;font-family:"Barlow Condensed",sans-serif;font-size:1.25rem;font-weight:600}',
    '.vb-price-new{color:#D9480F;font-family:"Barlow Condensed",sans-serif;font-size:1.9rem;font-weight:800;line-height:1}',
    '.vb-price-save{display:inline-block;margin-top:6px;background:#D9480F;color:#fff;font-weight:800;font-size:.78rem;padding:3px 8px;border-radius:4px}',
    '.vb-price-note{margin-top:8px;font-size:.8rem;color:#495057;line-height:1.45}',
  ].join('\n');
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  function balk() {
    try { if (sessionStorage.getItem('vbBarDicht') === '1') return; } catch (e) {}
    var d = dagenTeGaan();
    var bar = document.createElement('div');
    bar.className = 'vb-bar';
    bar.innerHTML = '<strong>Vroegboekkorting 2027:</strong> heel weekend huren voor de prijs van 1 dag · tenten &amp; rodeostier' +
      '<span class="vb-left">' + (d <= 1 ? 'Laatste dag!' : 'Nog ' + d + ' dagen') + '</span>' +
      '<a href="tenten-huren.html">Bekijk de actie →</a>' +
      '<button class="vb-bar-x" aria-label="Sluiten">×</button>';
    bar.querySelector('.vb-bar-x').onclick = function () {
      bar.remove(); try { sessionStorage.setItem('vbBarDicht', '1'); } catch (e) {}
    };
    document.body.insertBefore(bar, document.body.firstChild);
  }

  function badge(groot) {
    var b = document.createElement('span');
    b.className = 'vb-badge' + (groot ? ' vb-big' : '');
    b.innerHTML = 'Weekend = prijs van 1 dag<small>Vroegboekkorting t.e.m. 31/10</small>';
    return b;
  }

  // Badge op elke afbeelding die naar een actieproduct linkt (overzichten, aanbevelingen).
  function kaartBadges() {
    document.querySelectorAll('a[href]').forEach(function (a) {
      if (!VB_CONFIG.paginas.test(a.getAttribute('href').split('#')[0])) return;
      var img = a.querySelector('img');
      if (!img || a.querySelector('.vb-badge')) return;
      a.classList.add('vb-img-wrap');
      a.appendChild(badge(false));
    });
  }

  function leesPrijs(sel) {
    var el = document.querySelector(sel);
    return el ? parseFloat(el.textContent.replace(/[^0-9,.]/g, '').replace(',', '.')) : NaN;
  }

  // Productpagina: grote badge op de foto + prijsblok met doorstreepte weekendprijs.
  function productPagina() {
    var titel = document.querySelector('.product-info h1');
    var box = document.querySelector('.product-price-box');
    if (!titel || !box || !geldtVoor(titel.textContent.trim())) return;

    var visual = document.querySelector('.product-visual');
    if (visual && !visual.querySelector('.vb-badge')) {
      visual.style.position = 'relative';
      visual.appendChild(badge(true));
    }

    var blok = document.createElement('div');
    blok.className = 'vb-price';
    box.appendChild(blok);

    function update() {
      var dag1 = leesPrijs('.price-main'), extra = leesPrijs('.price-secondary');
      if (isNaN(dag1) || isNaN(extra)) { blok.hidden = true; return; }
      blok.hidden = false;
      blok.innerHTML =
        '<div class="vb-price-tag">VROEGBOEKKORTING 2027</div>' +
        '<div class="vb-price-row"><span class="vb-price-lbl">Heel weekend</span>' +
        '<span class="vb-price-old">' + euro(dag1 + extra) + '</span>' +
        '<span class="vb-price-new">' + euro(dag1) + '</span></div>' +
        '<span class="vb-price-save">Je bespaart ' + euro(extra) + '</span>' +
        '<div class="vb-price-note">Boek vóór 31 oktober voor een feest in voorjaar 2027 (maart t.e.m. juni). ' +
        'Huur tot ' + VB_CONFIG.maxDagen + ' dagen (bv. vrijdag → maandag) en betaal enkel de 1e dag. Opbouw en afbraak inbegrepen.</div>';
    }
    update();
    // Partytent/stretchtent wisselen de prijs bij een andere maat — volg die mee.
    var main = document.querySelector('.price-main');
    if (main) new MutationObserver(update).observe(main, { childList: true, characterData: true, subtree: true });
  }

  function start() { balk(); kaartBadges(); productPagina(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
