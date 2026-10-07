// ── VROEGBOEKACTIE 2027 ──
// "1 dag huren = heel weekend genieten": wie vóór EINDE boekt voor een feest in PERIODE,
// betaalt enkel de 1e verhuurdag en gebruikt het materiaal het hele weekend.
// Alles wat aanpasbaar is (deadline, teksten, producten, prijzen) staat in VB_CONFIG.
// - index.html: <section id="promos"> (banner + productkaarten) wordt hieruit opgebouwd.
// - bestelling.html: rekent via window.VB de korting in de prijsindicatie.
// Na EINDE toont de banner "Deze actie is afgelopen" en rekent de bestelpagina niets meer af.
(function () {
  var VB_CONFIG = {
    // Tijden in Belgische tijd (31/10 valt na de overgang naar wintertijd → +01:00).
    einde: new Date('2026-10-31T23:59:59+01:00'),   // laatste boekmoment
    periodeVan: '2027-03-01',                       // startdatum feest (voorjaar 2027)
    periodeTot: '2027-06-30',
    maxDagen: 3,                                    // weekendhuur volgens bestelformulier (vr → ma = 3)
    producten: /^(Partytent|Stretchtent|Rodeostier)/i,
    bannerFoto: 'vroegboek-hero.webp',

    tekst: {
      label: 'Vroegboekactie 2027',
      titel: '1 dag huren = heel weekend genieten',
      intro: 'Boek vóór 31 oktober 2026 en profiteer van onze vroegboekkorting voor uw feest in het voorjaar van 2027.',
      geldig: 'Vroegboekkorting',
      geldigUitleg: 'geldig t/m 31 oktober 2026',
      cta: 'Bekijk de actie',
      kaartenTitel: 'Populair voor een weekendfeest',
      badge: 'Vroegboek 2027',
      afgelopen: 'Deze actie is afgelopen',
      afgelopenUitleg: 'Bedankt voor de vele vroegboekingen. Bekijk hieronder ons aanbod aan de gewone tarieven.',
    },

    // prijs = dagprijs (1e dag), extraDag = gewone prijs per extra dag (50%), zoals op de productpagina.
    // Gewone weekendprijs (2 dagen) = prijs + extraDag → wordt doorstreept; actieprijs = prijs.
    kaarten: [
      { naam: 'Stretchtent', prijs: 195, extraDag: 95, vanaf: true, link: 'stretchtent.html', img: 'Stretchtent.jfif', alt: 'Stretchtent met gespannen doek over aluminium palen' },
      { naam: 'Partytent', prijs: 50, extraDag: 25, vanaf: true, link: 'partytent.html', img: 'Canopytent.png', alt: 'Witte partytent' },
      { naam: 'Rodeostier', prijs: 395, extraDag: 197.5, link: 'rodeostier.html', img: 'Rodeostier.png', alt: 'Opblaasbare rodeostier' },
    ],
  };

  var UUR = 3600000, DAG = 24 * UUR;

  function resterend() { return VB_CONFIG.einde - new Date(); }
  function actief() { return resterend() > 0; }
  function geldtVoor(naam) { return VB_CONFIG.producten.test(naam || ''); }
  function inPeriode(datum) { return !!datum && datum >= VB_CONFIG.periodeVan && datum <= VB_CONFIG.periodeTot; }

  // Gebruikt door bestelling.html om de korting in de prijsindicatie te verrekenen.
  window.VB = {
    actief: actief, geldtVoor: geldtVoor, inPeriode: inPeriode, config: VB_CONFIG,
    toepasbaar: function (naam, startdatum, dagen) {
      return actief() && geldtVoor(naam) && inPeriode(startdatum) && dagen >= 2 && dagen <= VB_CONFIG.maxDagen;
    },
  };

  var css = [
    '.vb{--vb-red:#C62828;--vb-red-d:#A51F1F;--vb-ink:#1a1a1a;--vb-serif:"Source Serif 4",Georgia,"Times New Roman",serif;background:#F8F6F2;padding:0 0 44px}',
    '.vb *{box-sizing:border-box}',
    '.vb .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}',
    '.vb-wrap{max-width:1248px;margin:0 auto;padding:0 24px}',
    // Banner: donkere linkerzijde met tekst, foto rechts die erin overvloeit.
    '.vb-banner{position:relative;overflow:hidden;background:#16201a;min-height:460px;display:flex;align-items:center}',
    '.vb-banner-foto{position:absolute;top:0;right:0;bottom:0;width:64%;background-size:cover;background-position:center}',
    '.vb-banner::before{content:"";position:absolute;inset:0;z-index:1;background:linear-gradient(90deg,#16201a 0%,#16201a 34%,rgba(22,32,26,.82) 44%,rgba(22,32,26,0) 66%)}',
    '.vb-banner-tekst{position:relative;z-index:2;max-width:calc(600px + max(0px, (100vw - 1248px) / 2));padding:48px 48px 48px max(24px, calc((100vw - 1248px) / 2 + 24px));color:#fff}',
    '.vb-label{display:inline-flex;align-items:center;gap:8px;background:var(--vb-red);color:#fff;font-family:"Nunito",sans-serif;font-weight:800;font-size:.82rem;letter-spacing:.06em;text-transform:uppercase;padding:7px 14px;border-radius:999px;margin:0 0 18px}',
    '.vb-label svg{flex-shrink:0}',
    '.vb-title{font-family:var(--vb-serif);font-weight:700;font-size:3.1rem;line-height:1.04;letter-spacing:-.01em;color:#fff;margin:0 0 16px}',
    '.vb-intro{font-family:"Nunito",sans-serif;font-size:1.05rem;line-height:1.55;color:rgba(255,255,255,.88);margin:0 0 22px;max-width:520px}',
    '.vb-feiten{display:flex;align-items:center;gap:22px;margin:0 0 26px;padding:0;list-style:none}',
    '.vb-feit{display:flex;align-items:flex-start;gap:10px;font-family:"Nunito",sans-serif;line-height:1.3}',
    '.vb-feit svg{flex-shrink:0;margin-top:2px}',
    '.vb-feit strong{display:block;font-weight:700;font-size:.98rem;color:#fff}',
    '.vb-feit span{display:block;font-size:.88rem;color:rgba(255,255,255,.75)}',
    '.vb-feit + .vb-feit{border-left:1px solid rgba(255,255,255,.28);padding-left:22px}',
    '.vb-btn{display:inline-flex;align-items:center;gap:10px;min-height:48px;padding:12px 26px;background:var(--vb-red);color:#fff;font-family:"Nunito",sans-serif;font-weight:800;font-size:1rem;text-decoration:none;border-radius:999px;transition:background-color .2s ease}',
    '.vb-btn:hover{background:var(--vb-red-d)}',
    '.vb-btn:focus-visible,.vb-card:focus-visible{outline:3px solid #fff;outline-offset:3px;box-shadow:0 0 0 6px var(--vb-ink)}',
    // Productkaarten: foto vol in beeld, naam + prijs onderaan, rond pijlknopje.
    '.vb-kop{scroll-margin-top:130px;font-family:var(--vb-serif);font-weight:700;font-size:1.75rem;color:var(--vb-ink);margin:36px 0 16px}',
    '.vb-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;list-style:none;margin:0;padding:0}',
    '.vb-card{position:relative;display:block;height:280px;border-radius:14px;overflow:hidden;background:#dfe7e3;text-decoration:none;color:#fff}',
    '.vb-card img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform .4s ease}',
    '.vb-card:hover img{transform:scale(1.03)}',
    '.vb-card::after{content:"";position:absolute;left:0;right:0;bottom:0;height:62%;background:linear-gradient(0deg,rgba(0,0,0,.72) 0%,rgba(0,0,0,.35) 55%,rgba(0,0,0,0) 100%)}',
    '.vb-badge{position:absolute;z-index:2;top:14px;left:14px;background:var(--vb-red);color:#fff;font-family:"Nunito",sans-serif;font-weight:800;font-size:.74rem;letter-spacing:.06em;text-transform:uppercase;padding:5px 12px;border-radius:999px}',
    '.vb-card-info{position:absolute;z-index:2;left:22px;right:80px;bottom:20px}',
    '.vb-name{display:block;font-family:"Nunito",sans-serif;font-weight:800;font-size:1.35rem;line-height:1.2;margin:0 0 2px;color:#fff}',
    '.vb-price{font-family:"Nunito",sans-serif;font-size:.95rem;color:rgba(255,255,255,.9);margin:0}',
    '.vb-price s{color:rgba(255,255,255,.7);margin-right:6px}',
    '.vb-price b{font-weight:800;font-size:1.05rem;color:#fff}',
    '.vb-pijl{position:absolute;z-index:2;right:18px;bottom:18px;width:46px;height:46px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;transition:transform .2s ease}',
    '.vb-card:hover .vb-pijl{transform:translateX(3px)}',
    '@media (max-width:1024px){.vb-banner-tekst{max-width:540px;padding-left:40px}.vb-title{font-size:2.6rem}.vb-banner-foto{width:72%}.vb-banner::before{background:linear-gradient(90deg,#16201a 0%,#16201a 30%,rgba(22,32,26,.85) 48%,rgba(22,32,26,.2) 80%)}}',
    '@media (max-width:860px){.vb-grid{grid-template-columns:repeat(2,1fr)}}',
    // Mobiel: foto bovenaan, tekst eronder op donkere achtergrond.
    '@media (max-width:860px){.vb{padding:0 0 36px}.vb-wrap{padding:0 16px}.vb-banner{display:block;min-height:0}.vb-banner-foto{position:relative;width:100%;height:190px}.vb-banner::before{display:none}.vb-banner-tekst{max-width:none;padding:24px 16px 28px}.vb-title{font-size:2.05rem}.vb-intro{font-size:.98rem}.vb-feiten{flex-direction:column;align-items:flex-start;gap:12px}.vb-feit + .vb-feit{border-left:0;padding-left:0}.vb-btn{display:flex;justify-content:center;width:100%}.vb-kop{font-size:1.45rem;margin-top:28px}.vb-grid{gap:16px}.vb-card{height:240px}}',
    '@media (max-width:860px) and (min-width:601px){.vb-banner-foto{height:260px}.vb-btn{width:auto;display:inline-flex}}',
    '@media (max-width:600px){.vb-grid{grid-template-columns:1fr}}',
    '@media (prefers-reduced-motion:reduce){.vb-card img,.vb-pijl,.vb-btn{transition:none}.vb-card:hover img,.vb-card:hover .vb-pijl{transform:none}}',
  ].join('\n');

  var ICOON_KALENDER = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/></svg>';
  var ICOON_KORTING = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>';
  var ICOON_PIJL = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
  }
  function euro(n) { return '€' + (Math.round(n * 100) / 100).toFixed(2).replace('.', ',').replace(',00', ''); }

  // Echte rekensom op de deadline; geen opgeslagen of verzonnen tellers.
  function countdown() {
    var ms = resterend();
    if (ms <= DAG) return ['Laatste dag', 'boek vandaag nog'];
    if (ms <= 2 * DAG) return ['Nog ' + Math.ceil(ms / UUR) + ' uur', 'om te profiteren'];
    return ['Nog ' + Math.ceil(ms / DAG) + ' dagen', 'om te profiteren'];
  }

  function kaartHtml(k, open) {
    var prijs = open
      ? 'Weekend ' + (k.vanaf ? 'vanaf ' : '') + '<s><span class="sr-only">normaal </span>' + euro(k.prijs + k.extraDag) + '</s>' +
        '<b><span class="sr-only">nu </span>' + euro(k.prijs) + '</b>'
      : (k.vanaf ? 'Vanaf ' : '') + '<b>' + euro(k.prijs) + '</b> / dag';
    return '<li><a class="vb-card" href="' + esc(k.link) + '">' +
      '<img src="' + esc(k.img) + '" alt="' + esc(k.alt) + '" loading="lazy">' +
      (open ? '<span class="vb-badge">' + esc(VB_CONFIG.tekst.badge) + '</span>' : '') +
      '<span class="vb-card-info"><span class="vb-name">' + esc(k.naam) + '</span>' +
        '<span class="vb-price" style="display:block">' + prijs + '</span></span>' +
      '<span class="vb-pijl" style="color:#1a1a1a">' + ICOON_PIJL + '</span>' +
    '</a></li>';
  }

  function render(sec) {
    var t = VB_CONFIG.tekst, open = actief(), c = countdown();
    sec.className = 'vb' + (open ? '' : ' vb-ended');
    sec.setAttribute('aria-labelledby', 'vb-title');
    sec.innerHTML =
      '<div class="vb-banner">' +
        '<div class="vb-banner-foto" style="background-image:url(\'' + esc(VB_CONFIG.bannerFoto) + '\')" role="img" aria-label="Stretchtent met lichtjes en gedekte tafels bij zonsondergang"></div>' +
        '<div class="vb-banner-tekst">' +
          '<p class="vb-label">' + ICOON_KALENDER.replace('22', '16').replace('22', '16') + esc(t.label) + '</p>' +
          '<h2 class="vb-title" id="vb-title">' + esc(open ? t.titel : t.afgelopen) + '</h2>' +
          '<p class="vb-intro">' + esc(open ? t.intro : t.afgelopenUitleg) + '</p>' +
          (open
            ? '<ul class="vb-feiten">' +
                '<li class="vb-feit">' + ICOON_KALENDER + '<div><strong data-vb="dagen">' + esc(c[0]) + '</strong><span data-vb="sub">' + esc(c[1]) + '</span></div></li>' +
                '<li class="vb-feit">' + ICOON_KORTING + '<div><strong>' + esc(t.geldig) + '</strong><span>' + esc(t.geldigUitleg) + '</span></div></li>' +
              '</ul>' +
              '<a class="vb-btn" href="#vb-kaarten">' + esc(t.cta) + ICOON_PIJL + '</a>'
            : '') +
        '</div>' +
      '</div>' +
      '<div class="vb-wrap">' +
        '<h3 class="vb-kop" id="vb-kaarten">' + esc(t.kaartenTitel) + '</h3>' +
        '<ul class="vb-grid">' + VB_CONFIG.kaarten.map(function (k) { return kaartHtml(k, open); }).join('') + '</ul>' +
      '</div>';
  }

  function tik(sec) {
    if (!actief()) { render(sec); return false; }  // deadline net verstreken → afgelopen-weergave
    var c = countdown(), d = sec.querySelector('[data-vb="dagen"]'), s = sec.querySelector('[data-vb="sub"]');
    if (d && d.textContent !== c[0]) { d.textContent = c[0]; s.textContent = c[1]; }
    return true;
  }

  // Productpagina van een actieproduct: prijs extra dag doorstrepen + "Gratis" erbij.
  // De maatkiezer (partytent/stretchtent) vervangt enkel de tekst van .price-secondary,
  // dus de doorstreping blijft staan bij een andere maat.
  function productPagina() {
    var titel = document.querySelector('.product-info h1');
    var extra = document.querySelector('.product-price-box .price-secondary');
    if (!actief() || !titel || !extra || !geldtVoor(titel.textContent.trim())) return;
    var st = document.createElement('style');
    st.textContent = [
      '.vb-extra{display:flex;align-items:baseline;flex-wrap:wrap;gap:2px 10px}',
      '.vb-extra .price-secondary{font-size:1.1rem;color:var(--text-muted,#6b7280);text-decoration:line-through}',
      '.vb-gratis{font-family:"Barlow Condensed",sans-serif;font-size:1.45rem;font-weight:800;line-height:1.1;color:#C62828}',
      '.vb-prijs-note{margin-top:12px;padding-top:10px;border-top:1px solid var(--border,#e5e7eb);font-size:.82rem;line-height:1.45;color:var(--text-muted,#6b7280)}',
      '.vb-prijs-note strong{color:#C62828}',
    ].join('\n');
    document.head.appendChild(st);
    var rij = document.createElement('div');
    rij.className = 'vb-extra';
    extra.parentNode.insertBefore(rij, extra);
    rij.appendChild(extra);
    rij.insertAdjacentHTML('beforeend', '<span class="vb-gratis">Gratis<span class="sr-only" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)"> tijdens de vroegboekactie</span></span>');
    document.querySelector('.product-price-box').insertAdjacentHTML('beforeend',
      '<p class="vb-prijs-note"><strong>' + esc(VB_CONFIG.tekst.label) + ':</strong> boek vóór 31 oktober 2026 voor een weekend in het voorjaar van 2027 (maart t.e.m. juni) en betaal enkel de 1e dag.</p>');
  }

  function start() {
    productPagina();
    var sec = document.getElementById('promos');
    if (!sec) return;
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    render(sec);
    // Ads linken naar index.html#vb-kaarten; dat anker bestaat pas na render(),
    // dus de browser kon er bij het laden nog niet naartoe springen.
    if (location.hash === '#vb-kaarten') {
      var doel = document.getElementById('vb-kaarten');
      if (doel) {
        doel.scrollIntoView();
        // Nog eens na het laden van afbeeldingen/lettertypes, voor het geval de layout verschoof.
        window.addEventListener('load', function () { doel.scrollIntoView(); }, { once: true });
      }
    }
    if (!actief()) return;
    var iv = setInterval(function () { if (!tik(sec)) clearInterval(iv); }, 60000);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
