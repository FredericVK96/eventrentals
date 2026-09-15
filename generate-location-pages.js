const fs = require('fs');

const LOCATIONS = [
  {
    slug: 'springkasteel-huren-gent',
    naam: 'Gent',
    zone: 2,
    metaDesc: 'Springkasteel of feestmateriaal huren in Gent? EventRentals levert en plaatst in heel Gent en alle deelgemeenten. Levering, plaatsing en ophaling inbegrepen.',
    h1: 'Springkasteel huren in <em>Gent</em>',
    badge: 'Levering in heel Gent',
    heroIntro: 'Van Ledeberg tot Wondelgem, van Gentbrugge tot Sint-Amandsberg — EventRentals levert uw springkasteel of feestmateriaal tot bij u thuis. Plaatsing en ophaling altijd inbegrepen.',
    deelgemeenten: ['Gentbrugge','Ledeberg','Sint-Amandsberg','Mariakerke','Wondelgem','Drongen','Zwijnaarde','Oostakker','Desteldonk','Afsnee','Evergem-centrum','Eke'],
    usps: [
      { icon: '🚐', title: 'Levering tot in de Gentse straten', sub: 'Wendbaar bestelwagen — ook in smalle stadsstraten.' },
      { icon: '🕐', title: 'Zelfde dag plaatsing mogelijk', sub: 'Vroeg boeken = vroeg leveren, op uw gewenst tijdstip.' },
      { icon: '✅', title: 'Alles inbegrepen', sub: 'Levering, plaatsing, ophaling en verzekering.' },
    ],
    faq: [
      { q: 'Levert EventRentals in alle Gentse deelgemeenten?', a: 'Ja, wij leveren in het volledige grondgebied van de stad Gent: centrum, Gentbrugge, Ledeberg, Mariakerke, Wondelgem, Sint-Amandsberg, Drongen, Zwijnaarde, Oostakker en alle andere deelgemeenten.' },
      { q: 'Wat kost een springkasteel huren in Gent?', a: 'Een standaard springkasteel kost €95 per dag inclusief BTW. Gebruik de transportcalculator om de exacte leveringskost voor uw adres in Gent te berekenen. Levering, plaatsing en ophaling zijn altijd inbegrepen.' },
      { q: 'Is mijn adres in Gent bereikbaar voor de bestelwagen?', a: 'Wij rijden met een wendbare bestelwagen. Bij smalle straten of appartementen bespreken we vooraf de toegang. Geef bij uw aanvraag eventuele bijzonderheden mee.' },
      { q: 'Kan ik ook een partytent huren voor mijn tuin in Gent?', a: 'Zeker. Onze partytenten (3×6m en 4×8m) worden geleverd en opgezet in Gent. Zorg voor een vlakke ondergrond. De tent wordt bij levering gemonteerd en na afloop opgehaald.' },
      { q: 'Hoe ver op voorhand reserveren voor een feest in Gent?', a: 'Wij raden aan minstens 2 à 3 weken op voorhand te reserveren, zeker in het zomerseizoen. Populaire weekends raken snel volgeboekt.' },
    ],
  },
  {
    slug: 'springkasteel-huren-de-pinte',
    naam: 'De Pinte',
    zone: 1,
    metaDesc: 'Springkasteel huren in De Pinte? EventRentals is gevestigd in De Pinte — kortste levertijd, laagste transportkost. Plaatsing en ophaling altijd inbegrepen.',
    h1: 'Springkasteel huren in <em>De Pinte</em>',
    badge: 'Depot in De Pinte — zone 1',
    heroIntro: 'EventRentals is gevestigd in De Pinte zelf. Dat betekent de kortste levertijd, de laagste transportkost en een vertrouwd lokaal adres voor uw volgend feest.',
    deelgemeenten: ['De Pinte-centrum','Zevergem','Astene','Nazareth','Sint-Martens-Latem','Gavere','Merelbeke'],
    usps: [
      { icon: '📍', title: 'Depot op wandelafstand', sub: 'EventRentals is gevestigd in Begoniapark 14 — u kunt zelf komen bekijken.' },
      { icon: '💶', title: 'Laagste transportkost', sub: 'Zone 1: €15 vaste kost. Gratis bij huurwaarde ≥ €100.' },
      { icon: '⚡', title: 'Snelste levering', sub: 'Op afspraak leveren we dezelfde dag in De Pinte.' },
    ],
    faq: [
      { q: 'Is EventRentals écht gevestigd in De Pinte?', a: 'Ja, ons depot staat in Begoniapark 14, 9810 Nazareth-De Pinte. U kunt het materiaal op afspraak komen bekijken of ophalen.' },
      { q: 'Wat kost een springkasteel huren in De Pinte?', a: 'Een standaard springkasteel kost €95 per dag inclusief BTW. Transportkost voor De Pinte valt in zone 1: €15 vaste kost + €0,55/km. Gratis bij huurwaarde ≥ €100.' },
      { q: 'Kan ik ook zelf ophalen in De Pinte?', a: 'Ja, op afspraak kunt u materiaal ophalen in Begoniapark 14. Bel of mail ons om een tijdstip af te spreken. Voor grote stukken zoals partytenten raden we aan levering te kiezen.' },
      { q: 'Wat is de minimale huurperiode?', a: 'Eén dag (24u) is de minimale huurperiode. Weekendtarieven (vrijdag t.e.m. maandag) zijn ook beschikbaar.' },
      { q: 'Hoe groot moet mijn tuin zijn voor een springkasteel in De Pinte?', a: 'Een standaard springkasteel heeft een plattegrond van ca. 4×4m nodig plus wat extra ruimte rondom voor veiligheid. Grotere modellen vragen meer ruimte — vraag ons advies bij uw aanvraag.' },
    ],
  },
  {
    slug: 'springkasteel-huren-nazareth',
    naam: 'Nazareth',
    zone: 1,
    metaDesc: 'Springkasteel of feestmateriaal huren in Nazareth? EventRentals vertrekt vanuit Nazareth-De Pinte — razendsnel geleverd, eerlijke prijs. Plaatsing altijd inbegrepen.',
    h1: 'Springkasteel huren in <em>Nazareth</em>',
    badge: 'Depot in Nazareth-De Pinte',
    heroIntro: 'Ons depot staat in Nazareth — u bent letterlijk onze buur. Springkastelen, partytenten en feestmateriaal worden snel bij u geleverd en weer opgehaald, zonder zorgen.',
    deelgemeenten: ['Nazareth-centrum','De Pinte','Eke','Zevergem','Gavere','Sint-Martens-Latem','Merelbeke'],
    usps: [
      { icon: '🏠', title: 'Uw lokale verhuurder', sub: 'Depot in Nazareth — geen lange leverritten, geen hoge transportkosten.' },
      { icon: '📦', title: 'Alles uit één hand', sub: 'Springkasteel, partytent, statafels, koelkast — één aanvraag volstaat.' },
      { icon: '🔒', title: 'Veilig en verzekerd materiaal', sub: 'Al ons materiaal is gekeurd en verzekerd voor gebruik.' },
    ],
    faq: [
      { q: 'Waar is EventRentals gevestigd in Nazareth?', a: 'Ons depot staat in Begoniapark 14, 9810 Nazareth-De Pinte. Op afspraak kunt u materiaal komen ophalen of bekijken.' },
      { q: 'Wat kost een springkasteel huren in Nazareth?', a: 'Een standaard springkasteel kost €95/dag. Nazareth valt in zone 1: €15 transportkost + €0,55/km. Bij huurwaarde ≥ €100 is levering gratis.' },
      { q: 'Levert EventRentals ook in de deelgemeenten rond Nazareth?', a: 'Ja, wij leveren in heel Nazareth en omgeving: De Pinte, Eke, Zevergem, Gavere en verder. Gebruik de transportcalculator voor de exacte kost.' },
      { q: 'Kan ik een springkasteel huren voor een kinderfeest in de tuin?', a: 'Absoluut. Ons meest gevraagde product voor kinderfeesten is het standaard springkasteel. Gemiddeld hebben kinderen tussen 3 en 12 jaar er urenlang plezier van.' },
      { q: 'Hoe boek ik een springkasteel in Nazareth?', a: 'Vul het offerteformulier in of bel ons op 0477 39 63 50. Wij bevestigen uw boeking en bespreken het leveringstijdstip.' },
    ],
  },
  {
    slug: 'springkasteel-huren-merelbeke',
    naam: 'Merelbeke',
    zone: 1,
    metaDesc: 'Springkasteel huren in Merelbeke? EventRentals levert snel vanuit De Pinte. Plaatsing, ophaling en verzekering altijd inbegrepen. Eerlijke tarieven.',
    h1: 'Springkasteel huren in <em>Merelbeke</em>',
    badge: 'Levering in Merelbeke — zone 1',
    heroIntro: 'Merelbeke ligt op een steenworp van ons depot. EventRentals levert uw springkasteel of feestmateriaal snel aan huis — wij zorgen voor de opstelling, u voor de gasten.',
    deelgemeenten: ['Merelbeke-centrum','Lemberge','Munte','Bottelare','Gontrode','Gent-centrum','Gentbrugge'],
    usps: [
      { icon: '🚀', title: 'Snelle levering vanuit De Pinte', sub: 'Merelbeke valt in zone 1 — korte rijafstand, lage transportkost.' },
      { icon: '🌳', title: 'Ideaal voor tuinfeesten', sub: 'Merelbeke heeft veel halfopen bebouwing — perfect voor een springkasteel in de tuin.' },
      { icon: '📋', title: 'Volledige service', sub: 'Levering, plaatsing, uitleg en ophaling — wij regelen alles.' },
    ],
    faq: [
      { q: 'Levert EventRentals in alle deelgemeenten van Merelbeke?', a: 'Ja, wij leveren in Merelbeke-centrum, Lemberge, Munte, Bottelare en Gontrode. Gebruik de transportcalculator voor de exacte kost.' },
      { q: 'Wat kost een springkasteel huren in Merelbeke?', a: 'Een standaard springkasteel kost €95/dag. Merelbeke valt in zone 1: €15 vaste transportkost + €0,55/km. Gratis levering bij huurwaarde ≥ €100.' },
      { q: 'Hoe groot moet mijn tuin zijn voor een springkasteel?', a: 'Een standaard springkasteel vraagt ca. 4×4m plus veiligheidsruimte rondom. Bij een kleinere tuin adviseren wij welk model het best past.' },
      { q: 'Kan ik ook een partytent huren in Merelbeke?', a: 'Zeker. Onze partytenten (3×6m en 4×8m) worden geleverd en opgezet. Zorg voor een vlakke ondergrond zonder obstakels.' },
      { q: 'Hoe ver op voorhand moet ik reserveren in Merelbeke?', a: 'Reserveer minstens 2 weken op voorhand, zeker voor zomerweekends. Populaire data raken snel volgeboekt.' },
    ],
  },
  {
    slug: 'springkasteel-huren-sint-martens-latem',
    naam: 'Sint-Martens-Latem',
    zone: 1,
    metaDesc: 'Springkasteel huren in Sint-Martens-Latem of Deurle? EventRentals levert vanuit De Pinte — snel, eerlijk geprijsd, plaatsing inbegrepen.',
    h1: 'Springkasteel huren in <em>Sint&#8209;Martens&#8209;Latem</em>',
    badge: 'Levering in Sint-Martens-Latem',
    heroIntro: 'Sint-Martens-Latem en Deurle liggen vlakbij ons depot. EventRentals levert uw springkasteel of feesttent snel aan huis — perfect voor een tuinfeest langs de Leie.',
    deelgemeenten: ['Sint-Martens-Latem','Deurle','De Pinte','Gavere','Nazareth','Gent-Afsnee','Zwijnaarde'],
    usps: [
      { icon: '🌿', title: 'Leiestreek-specialist', sub: 'Wij leveren regelmatig in de villa-tuinen van Sint-Martens-Latem en Deurle.' },
      { icon: '⏱️', title: 'Op tijd geleverd', sub: 'Afgesproken tijdstip = gegarandeerd tijdstip. Geen vage tijdsvakken.' },
      { icon: '🎪', title: 'Voor elk feest', sub: 'Van kinderverjaardagen tot tuinfeesten voor volwassenen.' },
    ],
    faq: [
      { q: 'Levert EventRentals in zowel Sint-Martens-Latem als Deurle?', a: 'Ja, wij leveren in de volledige gemeente Sint-Martens-Latem, inclusief de deelgemeente Deurle.' },
      { q: 'Wat kost levering in Sint-Martens-Latem?', a: 'Sint-Martens-Latem valt in zone 1: €15 vaste transportkost + €0,55/km. Gratis bij huurwaarde ≥ €100.' },
      { q: 'Welk springkasteel past in een typische Latem-tuin?', a: 'De meeste tuinen in Sint-Martens-Latem zijn ruim genoeg voor ons groot springkasteel of de hindernisbaan. Ons standaard model past in praktisch elke tuin.' },
      { q: 'Kan ik ook meubilair huren voor mijn tuinfeest in Sint-Martens-Latem?', a: 'Ja, naast springkastelen verhuren we ook partytenten, statafels, klapstoel, koelkast en LED-verlichting. Combineer meerdere producten voor een voordeel.' },
      { q: 'Hoe ver op voorhand reserveren in Sint-Martens-Latem?', a: 'Minstens 2 weken voor zomerse weekends. Populaire data in mei-augustus raken snel vol.' },
    ],
  },
  {
    slug: 'springkasteel-huren-gavere',
    naam: 'Gavere',
    zone: 1,
    metaDesc: 'Springkasteel huren in Gavere, Asper of Vurste? EventRentals levert snel vanuit De Pinte. Levering, plaatsing en ophaling altijd inbegrepen.',
    h1: 'Springkasteel huren in <em>Gavere</em>',
    badge: 'Levering in Gavere — zone 1',
    heroIntro: 'Gavere en zijn deelgemeenten liggen vlakbij ons depot. EventRentals levert uw springkasteel of feestmateriaal snel aan huis — wij zorgen voor de opbouw en de afbraak.',
    deelgemeenten: ['Gavere-centrum','Asper','Baaigem','Vurste','Semmerzake','Dikkelvenne','Eke'],
    usps: [
      { icon: '🏡', title: 'Ideaal voor Gavere-tuinen', sub: 'Veel ruime tuinen in Gavere — perfect voor een springkasteel of partytent.' },
      { icon: '🤝', title: 'Persoonlijke service', sub: 'Klein familiebedrijf — u spreekt altijd met dezelfde persoon.' },
      { icon: '💰', title: 'Eerlijke prijzen', sub: 'Geen verborgen kosten. Wat u ziet is wat u betaalt.' },
    ],
    faq: [
      { q: 'Levert EventRentals in alle deelgemeenten van Gavere?', a: 'Ja, wij leveren in Gavere-centrum, Asper, Baaigem, Vurste, Semmerzake en Dikkelvenne.' },
      { q: 'Wat kost een springkasteel huren in Gavere?', a: 'Een standaard springkasteel kost €95/dag. Gavere valt in zone 1: €15 vaste transportkost + €0,55/km. Gratis levering bij huurwaarde ≥ €100.' },
      { q: 'Kan ik een springkasteel huren voor de schoolfeest of buurtfeest in Gavere?', a: 'Zeker. Wij leveren ook voor verenigingen, scholen en buurtfeesten. Neem contact op voor een offerte op maat.' },
      { q: 'Welke modellen springkasteel huren jullie uit?', a: 'Ons assortiment omvat standaard springkasteel, springkasteel met glijbaan, dino-kasteel, prinses-kasteel, hindernisbaan en rodeostier — voor elk feest en elke leeftijd.' },
      { q: 'Hoe snel word ik geleverd in Gavere?', a: 'Bij tijdige reservering leveren wij op uw gewenste tijdstip. Wij bevestigen datum en uur bij boeking.' },
    ],
  },
  {
    slug: 'springkasteel-huren-deinze',
    naam: 'Deinze',
    zone: 2,
    metaDesc: 'Springkasteel huren in Deinze of Zulte? EventRentals levert en plaatst in heel Deinze en omgeving. Eerlijke prijs, snelle levering.',
    h1: 'Springkasteel huren in <em>Deinze</em>',
    badge: 'Levering in Deinze — zone 2',
    heroIntro: 'Feest in Deinze? EventRentals levert springkastelen, partytenten en feestmateriaal tot bij u thuis. Opbouw en afbraak inbegrepen — u hoeft zelf niets te doen.',
    deelgemeenten: ['Deinze-centrum','Zulte','Kruishoutem','Petegem-aan-de-Leie','Astene','Nevele','Aalter'],
    usps: [
      { icon: '🚐', title: 'Levering in groot-Deinze', sub: 'Wij leveren in de fusiegemeente Deinze inclusief Zulte, Petegem en omgeving.' },
      { icon: '🎉', title: 'Groot assortiment', sub: 'Van springkasteel tot partytent — alles voor uw feest uit één hand.' },
      { icon: '📅', title: 'Flexibele boekingsdata', sub: 'Weekdag of weekend, ochtend of namiddag — u kiest het tijdstip.' },
    ],
    faq: [
      { q: 'Levert EventRentals in heel Deinze en deelgemeenten?', a: 'Ja, wij leveren in Deinze-centrum, Zulte, Petegem-aan-de-Leie, Astene en de andere deelgemeenten van groot-Deinze.' },
      { q: 'Wat kost een springkasteel huren in Deinze?', a: 'Een standaard springkasteel kost €95/dag. Deinze valt in zone 2: €25 vaste transportkost + €0,55/km.' },
      { q: 'Hoe lang duurt de levering vanuit De Pinte naar Deinze?', a: 'Wij zijn doorgaans binnen 30 minuten bij u. Wij geven u een nauwkeurig tijdslot bij boeking.' },
      { q: 'Kan ik ook een partytent huren in combinatie met een springkasteel in Deinze?', a: 'Ja, een combi springkasteel + partytent is één van onze populairste boekingen. Bij gecombineerde huur kunt u voordeel genieten — vraag een offerte aan.' },
      { q: 'Hoe ver op voorhand reserveren voor een feest in Deinze?', a: 'Reserveer minstens 2 weken op voorhand. Voor zomerweekends is 3-4 weken aanbevolen.' },
    ],
  },
  {
    slug: 'springkasteel-huren-oudenaarde',
    naam: 'Oudenaarde',
    zone: 2,
    metaDesc: 'Springkasteel huren in Oudenaarde? EventRentals levert en plaatst in Oudenaarde en deelgemeenten. Transparante prijzen, plaatsing inbegrepen.',
    h1: 'Springkasteel huren in <em>Oudenaarde</em>',
    badge: 'Levering in Oudenaarde',
    heroIntro: 'EventRentals levert springkastelen en feestmateriaal in Oudenaarde en de wijde omgeving. Wij zorgen voor opbouw en afbraak — uw feest kan beginnen zodra wij vertrekken.',
    deelgemeenten: ['Oudenaarde-centrum','Ename','Eine','Bevere','Leupegem','Melden','Welden','Heurne','Volkegem'],
    usps: [
      { icon: '🏰', title: 'Levering in de Vlaamse Ardennen', sub: 'Wij leveren in Oudenaarde en alle deelgemeenten, inclusief heuveliger terreinen.' },
      { icon: '🔧', title: 'Professionele opbouw', sub: 'Wij bouwen het materiaal op, controleren alles en leggen het gebruik uit.' },
      { icon: '☎️', title: 'Altijd bereikbaar', sub: 'Vragen voor, tijdens of na uw feest? Bel ons gerust.' },
    ],
    faq: [
      { q: 'Levert EventRentals in de deelgemeenten van Oudenaarde?', a: 'Ja, wij leveren in Oudenaarde-centrum, Ename, Eine, Bevere, Leupegem, Melden, Welden, Heurne en Volkegem.' },
      { q: 'Wat kost een springkasteel huren in Oudenaarde?', a: 'Een standaard springkasteel kost €95/dag. Oudenaarde valt in zone 2: €25 vaste transportkost + €0,55/km.' },
      { q: 'Kan een springkasteel ook op een helling in de Vlaamse Ardennen?', a: 'Een springkasteel heeft een vlakke ondergrond nodig. Op licht hellend terrein is soms een aanpassing mogelijk. Neem vooraf contact op zodat we mee kunnen denken.' },
      { q: 'Hoe ver op voorhand reserveren voor Oudenaarde?', a: 'Wij raden aan minstens 2-3 weken voor te reserveren, zeker voor zomerse weekends.' },
      { q: 'Combineer ik best een springkasteel met een partytent in Oudenaarde?', a: 'Dat doen veel klanten. Een partytent biedt schaduw en bescherming bij slecht weer, terwijl kinderen buiten spelen in het springkasteel.' },
    ],
  },
  {
    slug: 'springkasteel-huren-zulte',
    naam: 'Zulte',
    zone: 1,
    metaDesc: 'Springkasteel huren in Zulte? EventRentals levert snel vanuit De Pinte. Plaatsing en ophaling altijd inbegrepen. Reserveer eenvoudig online.',
    h1: 'Springkasteel huren in <em>Zulte</em>',
    badge: 'Levering in Zulte — zone 1',
    heroIntro: 'Zulte grenst aan onze thuisgemeente — EventRentals levert springkastelen en feestmateriaal aan huis in Zulte en omgeving. Snel geleverd, correct opgebouwd.',
    deelgemeenten: ['Zulte-centrum','Olsene','Machelen','Deinze','Nazareth','Sint-Martens-Latem','Gavere'],
    usps: [
      { icon: '📍', title: 'Vlakbij het depot', sub: 'Zulte grenst aan Nazareth-De Pinte — zone 1 met lage transportkost.' },
      { icon: '🎠', title: 'Alle leeftijden', sub: 'Van peuters (2j+) tot tieners — ons aanbod past bij elk feest.' },
      { icon: '🌦️', title: 'Slecht weer? Geen probleem', sub: 'Combineer met een partytent voor weer- en windbestendig feestplezier.' },
    ],
    faq: [
      { q: 'Levert EventRentals in Zulte en Olsene?', a: 'Ja, wij leveren in Zulte, Olsene, Machelen en de omliggende deelgemeenten.' },
      { q: 'Wat kost een springkasteel huren in Zulte?', a: 'Een standaard springkasteel kost €95/dag. Zulte valt in zone 1: €15 vaste transportkost + €0,55/km. Gratis levering bij huurwaarde ≥ €100.' },
      { q: 'Kan ik dezelfde dag nog een springkasteel huren in Zulte?', a: 'Bij beschikbaarheid is levering dezelfde dag mogelijk. Bel ons op 0477 39 63 50 om beschikbaarheid te checken.' },
      { q: 'Welk springkasteel is populairst in Zulte?', a: 'Het standaard springkasteel en de hindernisbaan zijn het meest geboekt in de regio. Voor meisjesfeestjes is de prinsessenkasteel erg populair.' },
      { q: 'Hoe ver op voorhand reserveren in Zulte?', a: 'Reserveer minstens 1-2 weken op voorhand. Voor drukke weekends in de zomer is 3 weken aanbevolen.' },
    ],
  },
];

function gemeenteList(arr) {
  return arr.map(g => `<div class="deelgemeente-item">${g}</div>`).join('\n        ');
}

function uspList(usps) {
  return usps.map(u => `
        <div class="loc-usp">
          <div class="loc-usp-icon">${u.icon}</div>
          <div>
            <strong>${u.title}</strong>
            <span>${u.sub}</span>
          </div>
        </div>`).join('');
}

function faqItems(faq) {
  return faq.map((item, i) => `
        <div class="faq-item">
          <button class="faq-q" aria-expanded="false" onclick="toggleFaq(this)">
            ${item.q}
            <span class="faq-arrow">▼</span>
          </button>
          <div class="faq-a">${item.a}</div>
        </div>`).join('');
}

function zoneBadge(zone) {
  const colors = { 1: '#3B6D11', 2: '#854F0B', 3: '#993C1D' };
  const bgs    = { 1: '#EAF3DE', 2: '#FAEEDA', 3: '#FAECE7' };
  const labels = { 1: 'Zone 1 · 0–15 km', 2: 'Zone 2 · 15–30 km', 3: 'Zone 3 · 30–50 km' };
  return `<span style="display:inline-block;font-size:11px;font-weight:700;text-transform:uppercase;color:${colors[zone]};background:${bgs[zone]};padding:3px 10px;border-radius:4px;">${labels[zone]}</span>`;
}

function generatePage(loc) {
  const canon = `https://www.eventrentals.be/${loc.slug}.html`;
  return `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/png" href="Eventrentals Logo.png" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="${loc.metaDesc}" />
  <link rel="canonical" href="${canon}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="EventRentals" />
  <meta property="og:title" content="Springkasteel huren in ${loc.naam} | EventRentals" />
  <meta property="og:description" content="${loc.metaDesc}" />
  <meta property="og:url" content="${canon}" />
  <meta property="og:image" content="https://www.eventrentals.be/hero-feest.jpeg" />
  <meta property="og:locale" content="nl_BE" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Springkasteel huren in ${loc.naam} | EventRentals" />
  <meta name="twitter:description" content="${loc.metaDesc}" />
  <meta name="twitter:image" content="https://www.eventrentals.be/hero-feest.jpeg" />
  <meta name="robots" content="index, follow" />
  <script type="application/ld+json">{
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "name": "EventRentals",
        "url": "https://www.eventrentals.be",
        "telephone": "+32477396350",
        "address": { "@type": "PostalAddress", "streetAddress": "Begoniapark 14", "addressLocality": "Nazareth-De Pinte", "postalCode": "9810", "addressCountry": "BE" },
        "areaServed": ${JSON.stringify(loc.deelgemeenten)}
      },
      {
        "@type": "FAQPage",
        "mainEntity": [${loc.faq.map(f => `
          { "@type": "Question", "name": ${JSON.stringify(f.q)}, "acceptedAnswer": { "@type": "Answer", "text": ${JSON.stringify(f.a)} } }`).join(',')}
        ]
      }
    ]
  }<\/script>
  <title>Springkasteel huren in ${loc.naam} | EventRentals</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=Nunito:wght@400;500;600;700&family=Caveat:wght@600&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --accent: #ffffff; --accent-dark: #eeeeee; --accent-light: #e8f5f3;
      --dark: #2B7A6E; --darker: #1E5950; --white: #ffffff;
      --text: #1a1a1a; --text-muted: #6b7280; --border: #e5e7eb;
      --bg: #f4fbfa; --radius: 10px;
      --shadow: 0 2px 12px rgba(0,0,0,0.10); --shadow-hover: 0 6px 24px rgba(0,0,0,0.16);
    }
    html { scroll-behavior: smooth; }
    body { font-family: 'Nunito', sans-serif; color: var(--text); background: var(--bg); line-height: 1.6; }
    h1, h2, h3, h4 { font-family: 'Barlow Condensed', sans-serif; letter-spacing: 0.02em; }

    /* NAV */
    #navbar { z-index: 1000; background: #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
    .nav-inner { max-width: 1200px; margin: 0 auto; padding: 0 24px; display: flex; align-items: center; justify-content: space-between; height: 64px; gap: 16px; }
    .nav-links { display: flex; list-style: none; gap: 4px; }
    .nav-links a { color: var(--darker); text-decoration: none; font-family: 'Nunito', sans-serif; font-weight: 600; font-size: 0.95rem; padding: 8px 14px; border-radius: var(--radius); transition: color 0.2s, background 0.2s; }
    .nav-links a:hover { background: var(--accent-light); }
    .nav-right { display: flex; align-items: center; gap: 12px; }
    .nav-phone { color: var(--dark); font-weight: 700; font-size: 0.95rem; text-decoration: none; white-space: nowrap; }
    .cart-icon-link { position: relative; color: var(--dark); text-decoration: none; display: flex; align-items: center; padding: 4px; }
    .cart-badge { position: absolute; top: -6px; right: -8px; background: var(--dark); color: #fff; font-size: 0.7rem; font-weight: 700; border-radius: 50%; width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; }
    .hamburger { display: none; background: none; border: none; cursor: pointer; padding: 8px; flex-direction: column; gap: 5px; }
    .hamburger span { display: block; width: 24px; height: 2px; background: var(--dark); border-radius: 2px; transition: all 0.3s; }
    .mobile-menu { display: none; background: var(--darker); border-top: 1px solid rgba(255,255,255,0.1); padding: 12px 24px 16px; }
    .mobile-menu.open { display: block; }
    .mobile-menu a { display: block; color: rgba(255,255,255,0.85); text-decoration: none; font-weight: 600; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); }
    @media (max-width: 720px) { .nav-links { display: none; } .nav-right .nav-phone { display: none; } .hamburger { display: flex; } .nav-inner { justify-content: flex-start; } .nav-right { margin-left: auto; } }

    /* HERO */
    #hero { position: relative; overflow: hidden; background: url('hero-feest.jpeg') center center / cover no-repeat; min-height: 540px; display: flex; align-items: center; padding: 80px 24px; }
    #hero::before { content: ''; position: absolute; inset: 0; background: linear-gradient(to right, rgba(20,55,50,0.85) 0%, rgba(20,55,50,0.60) 55%, rgba(20,55,50,0.20) 100%); }
    .hero-inner { position: relative; z-index: 1; max-width: 1200px; margin: 0 auto; width: 100%; }
    .hero-text { max-width: 580px; }
    .hero-badge { display: inline-block; background: rgba(255,255,255,0.15); color: #fff; border: 1px solid rgba(255,255,255,0.35); font-weight: 700; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.1em; padding: 5px 14px; border-radius: 20px; margin-bottom: 20px; }
    #hero h1 { font-size: clamp(2.2rem, 5.5vw, 3.6rem); font-weight: 800; line-height: 1.1; margin-bottom: 18px; color: #fff; }
    #hero h1 em { font-style: normal; color: #fff; }
    #hero p { font-size: 1.05rem; color: rgba(255,255,255,0.88); margin-bottom: 32px; max-width: 500px; }
    .hero-ctas { display: flex; gap: 14px; flex-wrap: wrap; }
    @media (max-width: 640px) { #hero { min-height: 460px; padding: 60px 20px; } #hero::before { background: rgba(20,55,50,0.80); } }

    /* BUTTONS */
    .btn-primary { background: var(--dark); color: #fff; border: none; padding: 14px 30px; font-family: 'Nunito', sans-serif; font-size: 1rem; font-weight: 800; border-radius: var(--radius); cursor: pointer; text-decoration: none; display: inline-block; transition: background 0.2s, transform 0.15s, box-shadow 0.2s; box-shadow: 0 4px 14px rgba(0,0,0,0.25); }
    .btn-primary:hover { background: var(--darker); transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.35); }
    .btn-outline { background: transparent; color: #fff; border: 2px solid rgba(255,255,255,0.7); padding: 13px 30px; font-family: 'Nunito', sans-serif; font-size: 1rem; font-weight: 700; border-radius: var(--radius); cursor: pointer; text-decoration: none; display: inline-block; transition: border-color 0.2s, background 0.2s, transform 0.15s; }
    .btn-outline:hover { border-color: #fff; background: rgba(255,255,255,0.12); transform: translateY(-2px); }

    /* SECTIONS */
    section { padding: 72px 24px; }
    .section-inner { max-width: 1200px; margin: 0 auto; }
    .section-header { text-align: center; margin-bottom: 48px; }
    .section-header h2 { font-size: clamp(1.8rem, 4vw, 2.8rem); font-weight: 800; color: var(--dark); margin-bottom: 10px; }
    .section-header p { color: var(--text-muted); font-size: 1.05rem; max-width: 520px; margin: 0 auto; }
    .section-divider { width: 56px; height: 4px; background: var(--dark); border-radius: 2px; margin: 14px auto 0; }

    /* LOCAL INFO */
    #lokaal { background: var(--white); border-bottom: 1px solid var(--border); }
    .lokaal-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; }
    @media (max-width: 768px) { .lokaal-inner { grid-template-columns: 1fr; gap: 32px; } }
    .lokaal-text h2 { font-size: clamp(1.6rem, 3.5vw, 2.4rem); font-weight: 800; color: var(--dark); margin-bottom: 16px; }
    .lokaal-text p { color: var(--text-muted); font-size: 1rem; margin-bottom: 14px; line-height: 1.7; }
    .lokaal-usps { margin-top: 20px; display: flex; flex-direction: column; gap: 12px; }
    .loc-usp { display: flex; align-items: flex-start; gap: 14px; background: var(--accent-light); border-radius: 8px; padding: 14px 16px; }
    .loc-usp-icon { font-size: 1.3rem; flex-shrink: 0; }
    .loc-usp strong { display: block; font-size: 0.95rem; color: var(--darker); margin-bottom: 2px; }
    .loc-usp span { font-size: 0.85rem; color: var(--text-muted); }
    .gemeente-box { background: var(--bg); border-radius: 12px; padding: 24px; border: 1px solid var(--border); }
    .gemeente-box h3 { font-size: 1.15rem; font-weight: 800; color: var(--dark); margin-bottom: 14px; }
    .deelgemeente-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 16px; }
    .deelgemeente-item { font-size: 0.88rem; color: var(--text-muted); display: flex; align-items: center; gap: 6px; padding: 4px 0; }
    .deelgemeente-item::before { content: '✓'; color: var(--dark); font-weight: 700; font-size: 0.8rem; flex-shrink: 0; }

    /* CAT CARDS */
    #catalogus { background: var(--bg); }
    .cat-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 28px; }
    @media (max-width: 700px) { .cat-grid { grid-template-columns: 1fr; } }
    .cat-card { background: var(--white); border: 2px solid var(--border); border-radius: 16px; overflow: hidden; box-shadow: var(--shadow); transition: box-shadow 0.25s, transform 0.2s, border-color 0.2s; display: flex; flex-direction: column; text-decoration: none; color: inherit; }
    .cat-card:hover { box-shadow: var(--shadow-hover); transform: translateY(-4px); border-color: var(--dark); }
    .cat-card-img { height: 220px; overflow: hidden; }
    .cat-card-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .cat-card-body { padding: 24px; flex: 1; }
    .cat-card-title { font-family: 'Barlow Condensed', sans-serif; font-size: 1.7rem; font-weight: 800; color: var(--dark); margin-bottom: 8px; }
    .cat-card-desc { font-size: 0.95rem; color: var(--text-muted); margin-bottom: 16px; line-height: 1.6; }
    .cat-card-count { font-size: 0.85rem; font-weight: 700; color: var(--accent); background: var(--dark); display: inline-block; padding: 4px 12px; border-radius: 20px; }

    /* FAQ */
    #faq { background: var(--white); border-top: 1px solid var(--border); }
    .faq-wrap { max-width: 760px; margin: 0 auto; }
    .faq-item { border-bottom: 1px solid var(--border); }
    .faq-q { width: 100%; background: none; border: none; padding: 16px 0; text-align: left; font-family: 'Barlow Condensed', sans-serif; font-size: 1.1rem; font-weight: 700; color: var(--text); cursor: pointer; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
    .faq-arrow { flex-shrink: 0; font-size: 0.7rem; color: var(--dark); transition: transform 0.2s; }
    .faq-q[aria-expanded="true"] .faq-arrow { transform: rotate(180deg); }
    .faq-q[aria-expanded="true"] { color: var(--dark); }
    .faq-a { display: none; padding: 0 0 16px; font-size: 0.95rem; color: var(--text-muted); line-height: 1.75; }
    .faq-a.open { display: block; }

    /* BLOG */
    .blog-section { background: #fff; padding: 60px 24px; border-top: 1px solid var(--border); }
    .blog-inner { max-width: 1200px; margin: 0 auto; }
    .blog-header { text-align: center; margin-bottom: 40px; }
    .blog-header h2 { font-family: 'Barlow Condensed', sans-serif; font-size: 2.2rem; font-weight: 800; color: var(--text); margin-bottom: 8px; }
    .blog-header p { color: var(--text-muted); font-size: 1rem; }
    .blog-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
    .blog-card { background: #fff; border: 1px solid var(--border); border-radius: 12px; overflow: hidden; text-decoration: none; color: var(--text); transition: box-shadow 0.2s, transform 0.2s; display: flex; flex-direction: column; }
    .blog-card:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.10); transform: translateY(-2px); }
    .blog-card-img { position: relative; overflow: hidden; aspect-ratio: 16/9; }
    .blog-card-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .blog-card-tag { position: absolute; top: 12px; left: 12px; background: var(--dark); color: #fff; font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; padding: 3px 10px; border-radius: 20px; }
    .blog-card-body { padding: 20px; flex: 1; display: flex; flex-direction: column; gap: 8px; }
    .blog-card-title { font-family: 'Barlow Condensed', sans-serif; font-size: 1.25rem; font-weight: 800; color: var(--text); line-height: 1.2; }
    .blog-card-desc { font-size: 0.9rem; color: var(--text-muted); line-height: 1.5; flex: 1; }
    .blog-card-cta { font-size: 0.85rem; font-weight: 700; color: var(--dark); }
    @media (max-width: 900px) { .blog-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 600px) { .blog-grid { grid-template-columns: 1fr; } }

    /* FOOTER */
    .site-footer { background: var(--darker); color: #9ca3af; padding: 32px 24px 0; margin-top: 32px; font-size: 0.88rem; }
    .site-footer a { color: #c8ccd4; text-decoration: none; transition: color 0.18s; }
    .site-footer a:hover { color: var(--accent); }
    .footer-grid { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1.2fr 1fr 1fr 1fr 1fr; gap: 32px; padding-bottom: 24px; }
    .footer-col-title { font-family: 'Barlow Condensed', sans-serif; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--accent); margin-bottom: 10px; }
    .footer-logo-text { font-family: 'Barlow Condensed', sans-serif; font-size: 1.6rem; font-weight: 800; color: var(--white); margin-bottom: 12px; display: block; }
    .footer-logo-text span { color: var(--accent); }
    .footer-contact-row { display: flex; align-items: center; gap: 7px; margin-bottom: 5px; color: #e5e7eb; }
    .footer-contact-row a { color: #e5e7eb; }
    .footer-links { list-style: none; padding: 0; margin: 0; }
    .footer-links li { margin-bottom: 6px; }
    .footer-links li a { font-size: 0.87rem; }
    .footer-cta-btn { display: inline-block; margin-top: 14px; background: var(--accent); color: var(--dark) !important; padding: 8px 18px; border-radius: 6px; font-weight: 700; font-size: 0.87rem; }
    .footer-bottom { max-width: 1200px; margin: 0 auto; border-top: 1px solid rgba(255,255,255,0.07); padding: 12px 0; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; font-size: 0.78rem; color: #4b5563; }
    .footer-bottom a { color: #4b5563; }
    .footer-bottom-links { display: flex; gap: 16px; flex-wrap: wrap; }
    @media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr 1fr; } }
    @media (max-width: 640px) { .footer-grid { grid-template-columns: 1fr 1fr; gap: 20px; } }
    @media (max-width: 420px) { .footer-grid { grid-template-columns: 1fr; } }

    @keyframes bannerScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  </style>
</head>
<body>

<div id="sticky-header" style="position:sticky;top:0;z-index:1100;">
  <div style="background:var(--dark);color:#fff;padding:9px 0;font-size:0.88rem;font-weight:600;font-family:'Nunito',sans-serif;overflow:hidden;white-space:nowrap;">
    <span style="display:inline-block;animation:bannerScroll 32s linear infinite;">
      Levering &amp; plaatsing altijd inbegrepen &mdash; <a href="#offerte" style="color:#fff;text-decoration:underline;">vraag snel een offerte aan</a>
      &nbsp;&nbsp;&nbsp;&nbsp;&#10022;&nbsp;&nbsp;&nbsp;&nbsp;
      Levering &amp; plaatsing altijd inbegrepen &mdash; <a href="#offerte" style="color:#fff;text-decoration:underline;">vraag snel een offerte aan</a>
      &nbsp;&nbsp;&nbsp;&nbsp;&#10022;&nbsp;&nbsp;&nbsp;&nbsp;
      Levering &amp; plaatsing altijd inbegrepen &mdash; <a href="#offerte" style="color:#fff;text-decoration:underline;">vraag snel een offerte aan</a>
      &nbsp;&nbsp;&nbsp;&nbsp;&#10022;&nbsp;&nbsp;&nbsp;&nbsp;
    </span>
  </div>

  <nav id="navbar">
    <div class="nav-inner">
      <a href="index.html" style="display:flex;align-items:center;"><img src="Eventrentals Logo.png" alt="EventRentals" style="height:44px;"></a>
      <ul class="nav-links">
        <li><a href="index.html">Home</a></li>
        <li><a href="#catalogus">Assortiment</a></li>
        <li><a href="#transport">Transport</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <div class="nav-right">
        <a href="tel:0477396350" class="nav-phone">0477 39 63 50</a>
        <a href="bestelling.html" class="cart-icon-link" id="cartIconLink">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="24" height="24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          <span class="cart-badge" id="cartBadge" style="display:none">0</span>
        </a>
      </div>
      <button class="hamburger" id="hamburgerBtn" aria-label="Menu openen">
        <span></span><span></span><span></span>
      </button>
    </div>
    <div class="mobile-menu" id="mobileMenu">
      <a href="index.html">Home</a>
      <a href="#catalogus">Assortiment</a>
      <a href="#offerte">Offerte aanvragen</a>
      <a href="#transport">Transport</a>
      <a href="#contact">Contact</a>
    </div>
  </nav>
</div>

<!-- HERO -->
<section id="hero">
  <div class="hero-inner">
    <div class="hero-text">
      <span class="hero-badge">${loc.badge}</span>
      <h1>${loc.h1}</h1>
      <p>${loc.heroIntro}</p>
      <div class="hero-ctas">
        <a href="#offerte" class="btn-primary">Offerte aanvragen</a>
        <a href="tel:0477396350" class="btn-outline">Bel 0477 39 63 50</a>
      </div>
    </div>
  </div>
</section>

<!-- LOKALE INFO -->
<section id="lokaal">
  <div class="lokaal-inner">
    <div class="lokaal-text">
      <h2>EventRentals in ${loc.naam}</h2>
      <p>Wij leveren springkastelen, partytenten en feestmateriaal in ${loc.naam} en omgeving. Plaatsing en ophaling zijn altijd inbegrepen — u hoeft zelf niets op te bouwen of af te breken.</p>
      <p>Ons depot staat in Begoniapark 14, Nazareth-De Pinte. ${zoneBadge(loc.zone)}</p>
      <div class="lokaal-usps">${uspList(loc.usps)}</div>
    </div>
    <div class="gemeente-box">
      <h3>Wij leveren in ${loc.naam} en omgeving</h3>
      <div class="deelgemeente-grid">
        ${gemeenteList(loc.deelgemeenten)}
      </div>
      <div style="margin-top:20px;">
        <a href="#offerte" class="btn-primary" style="font-size:0.9rem;padding:11px 24px;">Offerte aanvragen</a>
      </div>
    </div>
  </div>
</section>

<!-- CATALOGUS -->
<section id="catalogus">
  <div class="section-inner">
    <div class="section-header">
      <h2>Ons verhuurassortiment in ${loc.naam}</h2>
      <p>Kies uit springkastelen &amp; speelgelegenheden of tuinfeestmateriaal — voor elk feest iets.</p>
      <div class="section-divider"></div>
    </div>
    <div class="cat-grid">
      <a href="speelgelegenheden.html" class="cat-card">
        <div class="cat-card-img"><img src="Bouncycastke.png" alt="Springkastelen en speelgelegenheden" loading="lazy"></div>
        <div class="cat-card-body">
          <div class="cat-card-title">Speelgelegenheden</div>
          <div class="cat-card-desc">Springkastelen, hindernisbanen, rodeostier, bungee run, botsballen en meer voor onvergetelijk plezier.</div>
          <span class="cat-card-count">9 producten</span>
        </div>
      </a>
      <a href="tuinfeest-materiaal.html" class="cat-card">
        <div class="cat-card-img"><img src="tuinfeest-card.jpeg" alt="Tuinfeest materiaal verhuur" loading="lazy"></div>
        <div class="cat-card-body">
          <div class="cat-card-title">Tuinfeest Materiaal</div>
          <div class="cat-card-desc">Partytenten, stoelen, tafels, terrasverwarmer, koelkast, LED-verlichting en alles voor de perfecte tuinfeest opstelling.</div>
          <span class="cat-card-count">15 producten</span>
        </div>
      </a>
    </div>
  </div>
</section>

<!-- OFFERTE -->
<section id="offerte" style="background:#f4fbfa;padding:48px 24px;border-top:1px solid var(--border);border-bottom:1px solid var(--border);">
  <div style="max-width:700px;margin:0 auto;background:#fff;border:1px solid var(--border);border-radius:16px;padding:40px;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
    <h2 style="font-family:'Barlow Condensed',sans-serif;font-size:2rem;font-weight:800;color:var(--text);margin:0 0 6px;">Offerte aanvragen in ${loc.naam}</h2>
    <p style="color:var(--text-muted);margin:0 0 28px;font-size:0.95rem;">Vul het formulier in — we contacteren je binnen de dag.</p>
    <form id="offerteForm" style="display:flex;flex-direction:column;gap:16px;">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
        <div style="display:flex;flex-direction:column;gap:6px;">
          <label style="font-size:0.85rem;font-weight:600;color:var(--text);">Naam *</label>
          <input type="text" id="of-naam" required placeholder="Jan Janssen" style="padding:11px 14px;border:1px solid var(--border);border-radius:8px;font-size:0.95rem;outline:none;font-family:'Nunito',sans-serif;" />
        </div>
        <div style="display:flex;flex-direction:column;gap:6px;">
          <label style="font-size:0.85rem;font-weight:600;color:var(--text);">Telefoon *</label>
          <input type="tel" id="of-gsm" required placeholder="0477 00 00 00" style="padding:11px 14px;border:1px solid var(--border);border-radius:8px;font-size:0.95rem;outline:none;font-family:'Nunito',sans-serif;" />
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:6px;">
        <label style="font-size:0.85rem;font-weight:600;color:var(--text);">Wat wil je huren?</label>
        <input type="text" id="of-producten" placeholder="bv. springkasteel, partytent, statafels…" style="padding:11px 14px;border:1px solid var(--border);border-radius:8px;font-size:0.95rem;outline:none;font-family:'Nunito',sans-serif;" />
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
        <div style="display:flex;flex-direction:column;gap:6px;">
          <label style="font-size:0.85rem;font-weight:600;color:var(--text);">Datum</label>
          <input type="date" id="of-datum" style="padding:11px 14px;border:1px solid var(--border);border-radius:8px;font-size:0.95rem;outline:none;font-family:'Nunito',sans-serif;" />
        </div>
        <div style="display:flex;flex-direction:column;gap:6px;">
          <label style="font-size:0.85rem;font-weight:600;color:var(--text);">Gemeente</label>
          <input type="text" id="of-gemeente" placeholder="${loc.naam}" style="padding:11px 14px;border:1px solid var(--border);border-radius:8px;font-size:0.95rem;outline:none;font-family:'Nunito',sans-serif;" value="${loc.naam}" />
        </div>
      </div>
      <div id="of-bev" style="display:none;color:#2B7A6E;font-weight:700;text-align:center;padding:12px;">✓ Aanvraag verzonden — we contacteren je binnen de dag!</div>
      <button id="of-btn" type="button" onclick="submitOfferte()" style="background:#2B7A6E;color:#fff;font-family:'Nunito',sans-serif;font-weight:700;font-size:1rem;padding:14px;border:none;border-radius:8px;cursor:pointer;margin-top:4px;">Verstuur aanvraag</button>
    </form>
  </div>
</section>

<!-- TRANSPORT -->
<section id="transport" style="background:var(--bg);padding:60px 20px;">
  <div style="max-width:700px;margin:0 auto;">
    <h2 style="font-size:28px;font-weight:700;color:var(--dark);margin-bottom:8px;">Bereken jouw transportkost</h2>
    <p style="color:#6b7280;margin-bottom:32px;font-size:15px;">Transport vanuit <strong style="color:var(--dark);">Nazareth-De Pinte</strong> naar jouw locatie in ${loc.naam}. Vul je adres in en kies het type rit.</p>
    <div style="background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:28px;box-shadow:0 1px 4px rgba(0,0,0,0.06);margin-bottom:24px;">
      <label style="display:block;font-size:13px;font-weight:600;color:#1a1a1a;margin-bottom:6px;">Jouw adres of gemeente</label>
      <div style="display:flex;gap:10px;margin-bottom:20px;position:relative;">
        <div style="flex:1;position:relative;">
          <input type="text" id="br-adres" placeholder="bv. ${loc.naam} of een straat" style="width:100%;padding:10px 14px;border:1px solid #e5e7eb;border-radius:8px;font-size:15px;color:#1a1a1a;outline:none;box-sizing:border-box;" autocomplete="off" oninput="brAutocomplete(this.value)" onkeydown="brKeyNav(event)" />
          <ul id="br-suggestions" style="display:none;position:absolute;top:100%;left:0;right:0;background:white;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;list-style:none;margin:0;padding:0;z-index:999;box-shadow:0 4px 12px rgba(0,0,0,0.08);max-height:220px;overflow-y:auto;"></ul>
        </div>
        <button id="br-calc-btn" onclick="brBereken()" style="background:#2B7A6E;color:white;border:none;border-radius:8px;padding:10px 22px;font-size:15px;font-weight:600;cursor:pointer;white-space:nowrap;">Bereken</button>
      </div>
      <label style="display:block;font-size:13px;font-weight:600;color:#1a1a1a;margin-bottom:8px;">Type rit</label>
      <div style="display:flex;gap:8px;margin-bottom:8px;flex-wrap:wrap;">
        <button id="br-btn-lever" onclick="brSetRit('levering')" style="flex:1;min-width:110px;padding:9px 12px;font-size:13px;border-radius:8px;border:1px solid #e5e7eb;background:#2B7A6E;color:white;cursor:pointer;font-weight:600;">Levering</button>
        <button id="br-btn-ophal" onclick="brSetRit('ophaling')" style="flex:1;min-width:110px;padding:9px 12px;font-size:13px;border-radius:8px;border:1px solid #e5e7eb;background:white;color:#6b7280;cursor:pointer;">Ophaling</button>
        <button id="br-btn-beide" onclick="brSetRit('beide')" style="flex:1;min-width:110px;padding:9px 12px;font-size:13px;border-radius:8px;border:1px solid #e5e7eb;background:white;color:#6b7280;cursor:pointer;">Levering + ophaling</button>
      </div>
      <div style="font-size:12px;color:#6b7280;margin-bottom:4px;">Levering óf ophaling = 1 rit &nbsp;·&nbsp; Levering + ophaling = 2 ritten.</div>
      <div id="br-error" style="display:none;font-size:13px;color:#dc2626;margin-top:10px;"></div>
      <div id="br-dist" style="display:none;font-size:13px;color:#6b7280;margin-top:6px;"></div>
      <div id="br-result" style="display:none;margin-top:20px;border-top:1px solid #e5e7eb;padding-top:20px;">
        <div id="br-zone-badge" style="display:inline-block;font-size:12px;font-weight:700;text-transform:uppercase;padding:3px 10px;border-radius:4px;margin-bottom:14px;"></div>
        <table style="width:100%;font-size:14px;border-collapse:collapse;">
          <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:8px 0;color:#6b7280;">Vaste transportkost</td><td style="padding:8px 0;text-align:right;font-weight:600;color:#1a1a1a;" id="br-r-transport"></td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;" id="br-r-km-label">Km-heffing</td><td style="padding:8px 0;text-align:right;font-weight:600;color:#1a1a1a;" id="br-r-km"></td></tr>
        </table>
        <div style="display:flex;justify-content:space-between;align-items:baseline;margin-top:14px;padding-top:14px;border-top:2px solid #1a1a1a;">
          <span style="font-size:14px;font-weight:600;color:#6b7280;">Totaal incl. BTW</span>
          <span style="font-size:24px;font-weight:700;color:#2B7A6E;" id="br-r-totaal"></span>
        </div>
        <p style="font-size:12px;color:#9ca3af;margin-top:16px;line-height:1.5;">Gratis levering (zone 1) bij huurwaarde &ge; &euro;100. &nbsp;·&nbsp; Dringende levering = dubbele rit.</p>
      </div>
      <div id="br-buiten" style="display:none;margin-top:20px;border-top:1px solid #e5e7eb;padding-top:20px;">
        <div style="font-size:12px;font-weight:700;text-transform:uppercase;color:#A32D2D;background:#FCEBEB;display:inline-block;padding:3px 10px;border-radius:4px;margin-bottom:12px;">Buiten zone (&gt; 50 km)</div>
        <p style="font-size:14px;color:#6b7280;margin-bottom:14px;">Neem contact op voor een offerte op maat.</p>
        <a href="tel:0477396350" style="display:inline-block;background:#2B7A6E;color:white;border-radius:8px;padding:10px 20px;font-size:14px;font-weight:600;text-decoration:none;">Bel 0477 39 63 50</a>
      </div>
    </div>
    <p style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#9ca3af;margin-bottom:12px;">Tarieven per rit (incl. BTW)</p>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:16px;">
      <div style="background:#fff;border:1px solid #e5e7eb;border-radius:10px;padding:14px 16px;"><div style="font-size:11px;font-weight:700;text-transform:uppercase;color:#3B6D11;background:#EAF3DE;display:inline-block;padding:2px 8px;border-radius:4px;margin-bottom:8px;">Zone 1</div><div style="font-size:12px;color:#6b7280;margin-bottom:6px;">0 – 15 km</div><div style="font-weight:700;color:#1a1a1a;font-size:15px;margin-bottom:2px;">€15 transportkost</div><div style="font-size:12px;color:#6b7280;">+ €0,55/km &nbsp;·&nbsp; gratis v.a. €100</div></div>
      <div style="background:#fff;border:1px solid #e5e7eb;border-radius:10px;padding:14px 16px;"><div style="font-size:11px;font-weight:700;text-transform:uppercase;color:#854F0B;background:#FAEEDA;display:inline-block;padding:2px 8px;border-radius:4px;margin-bottom:8px;">Zone 2</div><div style="font-size:12px;color:#6b7280;margin-bottom:6px;">15 – 30 km</div><div style="font-weight:700;color:#1a1a1a;font-size:15px;margin-bottom:2px;">€25 transportkost</div><div style="font-size:12px;color:#6b7280;">+ €0,55/km incl. BTW</div></div>
      <div style="background:#fff;border:1px solid #e5e7eb;border-radius:10px;padding:14px 16px;"><div style="font-size:11px;font-weight:700;text-transform:uppercase;color:#993C1D;background:#FAECE7;display:inline-block;padding:2px 8px;border-radius:4px;margin-bottom:8px;">Zone 3</div><div style="font-size:12px;color:#6b7280;margin-bottom:6px;">30 – 50 km</div><div style="font-weight:700;color:#1a1a1a;font-size:15px;margin-bottom:2px;">€35 transportkost</div><div style="font-size:12px;color:#6b7280;">+ €0,55/km incl. BTW</div></div>
    </div>
    <p style="font-size:12px;color:#9ca3af;text-align:center;">Alle prijzen incl. BTW &nbsp;·&nbsp; Rit = levering óf ophaling</p>
  </div>
</section>

<!-- FAQ -->
<section id="faq">
  <div class="section-inner">
    <div class="section-header">
      <h2>Veelgestelde vragen &mdash; ${loc.naam}</h2>
      <div class="section-divider"></div>
    </div>
    <div class="faq-wrap">
      ${faqItems(loc.faq)}
    </div>
  </div>
</section>

<!-- BLOG -->
<section class="blog-section" id="blog">
  <div class="blog-inner">
    <div class="blog-header">
      <h2>Tips &amp; inspiratie</h2>
      <p>Alles wat je nodig hebt voor een geslaagd feest in ${loc.naam}.</p>
    </div>
    <div class="blog-grid">
      <a href="/tuinfeest-organiseren-checklist" class="blog-card">
        <div class="blog-card-img"><img src="https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress,format&cs=tinysrgb&w=600&h=340&fit=crop" alt="Tuinfeest organiseren checklist" width="600" height="340" loading="lazy" /><span class="blog-card-tag">Feestplanning</span></div>
        <div class="blog-card-body"><h3 class="blog-card-title">Tuinfeest organiseren checklist: materiaal, aantallen &amp; wanneer boeken</h3><p class="blog-card-desc">Concrete aantallen voor elk aantal gasten — tafels, stoelen, tent en springkasteel.</p><span class="blog-card-cta">Lees de gids &rsaquo;</span></div>
      </a>
      <a href="/springkasteel-huren-prijs" class="blog-card">
        <div class="blog-card-img"><img src="https://images.pexels.com/photos/3662667/pexels-photo-3662667.jpeg?auto=compress,format&cs=tinysrgb&w=600&h=340&fit=crop" alt="Springkasteel huren prijs" width="600" height="340" loading="lazy" /><span class="blog-card-tag">Prijzen &amp; info</span></div>
        <div class="blog-card-body"><h3 class="blog-card-title">Hoeveel kost een springkasteel huren? Eerlijke prijzen uitgelegd</h3><p class="blog-card-desc">Transparante prijzen per type en wat er altijd in zit.</p><span class="blog-card-cta">Lees de gids &rsaquo;</span></div>
      </a>
      <a href="/partytent-huren-welke-maat" class="blog-card">
        <div class="blog-card-img"><img src="https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress,format&cs=tinysrgb&w=600&h=340&fit=crop" alt="Partytent huren welke maat" width="600" height="340" loading="lazy" /><span class="blog-card-tag">Feestmateriaal</span></div>
        <div class="blog-card-body"><h3 class="blog-card-title">Partytent huren: welke maat heb ik nodig?</h3><p class="blog-card-desc">Hoe je de juiste maat kiest voor jouw tuin en aantal gasten.</p><span class="blog-card-cta">Lees de gids &rsaquo;</span></div>
      </a>
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer class="site-footer" id="contact">
  <div class="footer-grid">
    <div class="footer-col">
      <span class="footer-logo-text">Event<span>Rentals</span></span>
      <div class="footer-contact-row"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.09-1.09a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg><a href="tel:0477396350">0477 39 63 50</a></div>
      <div class="footer-contact-row"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg><a href="mailto:info@eventrentals.be">info@eventrentals.be</a></div>
      <p style="margin-top:8px;color:#6b7280;font-size:0.82rem;">Begoniapark 14, 9810 Nazareth-De Pinte &middot; Op afspraak</p>
      <a href="bestelling.html" class="footer-cta-btn">Vraag offerte aan</a>
    </div>
    <div class="footer-col">
      <p class="footer-col-title">Speelgelegenheden</p>
      <ul class="footer-links">
        <li><a href="springkasteel-standaard.html">Standaard Springkasteel</a></li>
        <li><a href="springkasteel-piraat.html">Voetbal Darts</a></li>
        <li><a href="springkasteel-medium-glijbaan.html">Springkasteel met Glijbaan</a></li>
        <li><a href="springkasteel-groot-jungle.html">Dino Springkasteel</a></li>
        <li><a href="hindernisbaan.html">Hindernisbaan</a></li>
        <li><a href="rodeostier.html">Rodeostier</a></li>
        <li><a href="speelgelegenheden.html" style="color:var(--accent);font-weight:700;">→ Volledig aanbod</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <p class="footer-col-title">Tuinfeest Materiaal</p>
      <ul class="footer-links">
        <li><a href="partytent-3x6m.html">Partytent 3×6m</a></li>
        <li><a href="partytent-4x8m.html">Partytent 4×8m</a></li>
        <li><a href="klapstoel-wit.html">Klapstoel Wit</a></li>
        <li><a href="klaptafel-180cm.html">Klaptafel 180cm</a></li>
        <li><a href="led-sfeerverlichting.html">LED Sfeerverlichting</a></li>
        <li><a href="tuinfeest-materiaal.html" style="color:var(--accent);font-weight:700;">→ Volledig aanbod</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <p class="footer-col-title">Locatiepagina's</p>
      <ul class="footer-links">
        <li><a href="springkasteel-huren-gent.html">Gent</a></li>
        <li><a href="springkasteel-huren-de-pinte.html">De Pinte</a></li>
        <li><a href="springkasteel-huren-nazareth.html">Nazareth</a></li>
        <li><a href="springkasteel-huren-merelbeke.html">Merelbeke</a></li>
        <li><a href="springkasteel-huren-sint-martens-latem.html">Sint-Martens-Latem</a></li>
        <li><a href="springkasteel-huren-gavere.html">Gavere</a></li>
        <li><a href="springkasteel-huren-deinze.html">Deinze</a></li>
        <li><a href="springkasteel-huren-oudenaarde.html">Oudenaarde</a></li>
        <li><a href="springkasteel-huren-zulte.html">Zulte</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <p class="footer-col-title">Info</p>
      <ul class="footer-links">
        <li><a href="faq.html">Veelgestelde vragen</a></li>
        <li><a href="verhuurvoorwaarden.html">Verhuurvoorwaarden</a></li>
        <li><a href="over-ons.html">Over ons</a></li>
        <li><a href="verhuurgebied.html">Verhuurgebied</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <span>&copy; 2025 EventRentals &mdash; Begoniapark 14, 9810 Nazareth-De Pinte</span>
    <div class="footer-bottom-links">
      <a href="verhuurvoorwaarden.html">Verhuurvoorwaarden</a>
      <a href="faq.html">FAQ</a>
    </div>
  </div>
</footer>

<script>
/* HAMBURGER */
document.getElementById('hamburgerBtn').addEventListener('click', function() {
  document.getElementById('mobileMenu').classList.toggle('open');
});
document.querySelectorAll('#mobileMenu a').forEach(function(l) {
  l.addEventListener('click', function() { document.getElementById('mobileMenu').classList.remove('open'); });
});

/* CART BADGE */
(function() {
  var cart = JSON.parse(localStorage.getItem('er_cart') || '[]');
  var total = cart.reduce(function(s,i){ return s+(i.qty||0); }, 0);
  var badge = document.getElementById('cartBadge');
  if (badge) { badge.textContent = total; badge.style.display = total > 0 ? 'flex' : 'none'; }
})();

/* FAQ */
function toggleFaq(btn) {
  var a = btn.nextElementSibling;
  var open = a.classList.contains('open');
  document.querySelectorAll('.faq-a.open').forEach(function(el) {
    el.classList.remove('open');
    el.previousElementSibling.setAttribute('aria-expanded','false');
  });
  if (!open) { a.classList.add('open'); btn.setAttribute('aria-expanded','true'); }
}

/* OFFERTE */
function submitOfferte() {
  var naam = document.getElementById('of-naam').value.trim();
  var gsm  = document.getElementById('of-gsm').value.trim();
  if (!naam || !gsm) { alert('Vul naam en telefoon in.'); return; }
  var btn = document.getElementById('of-btn');
  btn.disabled = true; btn.textContent = 'Even geduld…';
  fetch('/api/bestelling', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      voornaam: naam, familienaam: '', gsm: gsm, email: '',
      datumVan: document.getElementById('of-datum').value, datumTot: '',
      straat: '', huisnr: '', postcode: '',
      gemeente: document.getElementById('of-gemeente').value.trim(),
      producten: document.getElementById('of-producten').value.trim(),
      opmerkingen: 'Via locatiepagina ${loc.naam}'
    })
  }).then(function(r){ return r.json(); }).then(function() {
    document.getElementById('of-bev').style.display = 'block';
    btn.style.display = 'none';
  }).catch(function() {
    btn.disabled = false; btn.textContent = 'Verstuur aanvraag';
    alert('Er ging iets mis. Probeer opnieuw.');
  });
}

/* TRANSPORT CALCULATOR */
var brRit = 'levering', brAcIndex = -1, brSuggestions = [], brAutocompleteTimeout = null, brLat = null, brLon = null;
function brSetRit(r) {
  brRit = r;
  ['lever','ophal','beide'].forEach(function(k) {
    var btn = document.getElementById('br-btn-' + k);
    var active = (k==='lever'&&r==='levering')||(k==='ophal'&&r==='ophaling')||(k==='beide'&&r==='beide');
    btn.style.background = active ? '#2B7A6E' : 'white';
    btn.style.color = active ? 'white' : '#6b7280';
  });
}
function brAutocomplete(val) {
  clearTimeout(brAutocompleteTimeout);
  var ul = document.getElementById('br-suggestions');
  if (!val || val.length < 2) { ul.style.display = 'none'; brSuggestions = []; return; }
  brAutocompleteTimeout = setTimeout(function() {
    fetch('/api/geocode?q=' + encodeURIComponent(val + ' België'))
      .then(function(r){ return r.json(); })
      .then(function(data) {
        brSuggestions = data.slice(0,6); ul.innerHTML = '';
        if (!brSuggestions.length) { ul.style.display = 'none'; return; }
        brSuggestions.forEach(function(item, i) {
          var li = document.createElement('li');
          li.style.cssText = 'padding:10px 14px;cursor:pointer;font-size:14px;color:#1a1a1a;border-bottom:1px solid #f3f4f6;';
          li.textContent = item.display_name;
          li.addEventListener('mousedown', function(e){ e.preventDefault(); brSelectSuggestion(i); });
          ul.appendChild(li);
        });
        ul.style.display = 'block'; brAcIndex = -1;
      }).catch(function(){ ul.style.display = 'none'; });
  }, 300);
}
function brSelectSuggestion(i) {
  var item = brSuggestions[i]; if (!item) return;
  document.getElementById('br-adres').value = item.display_name;
  document.getElementById('br-suggestions').style.display = 'none';
  brLat = parseFloat(item.lat); brLon = parseFloat(item.lon);
  brBerekenMetCoords(brLat, brLon);
}
function brKeyNav(e) {
  var ul = document.getElementById('br-suggestions');
  var items = ul.querySelectorAll('li');
  if (!items.length) { if (e.key === 'Enter') brBereken(); return; }
  if (e.key==='ArrowDown') { brAcIndex=Math.min(brAcIndex+1,items.length-1); brHighlight(items); e.preventDefault(); }
  else if (e.key==='ArrowUp') { brAcIndex=Math.max(brAcIndex-1,-1); brHighlight(items); e.preventDefault(); }
  else if (e.key==='Enter') { if(brAcIndex>=0) brSelectSuggestion(brAcIndex); else { ul.style.display='none'; brBereken(); } e.preventDefault(); }
  else if (e.key==='Escape') { ul.style.display='none'; }
}
function brHighlight(items) { items.forEach(function(li,i){ li.style.background = i===brAcIndex ? '#e8f5f3' : ''; }); }
function brBereken() {
  var adres = document.getElementById('br-adres').value.trim();
  var errEl = document.getElementById('br-error'), distEl = document.getElementById('br-dist');
  document.getElementById('br-result').style.display = 'none';
  document.getElementById('br-buiten').style.display = 'none';
  errEl.style.display = 'none'; distEl.style.display = 'none';
  if (!adres) { errEl.textContent = 'Vul een adres in.'; errEl.style.display = 'block'; return; }
  var btn = document.getElementById('br-calc-btn');
  btn.textContent = '...'; btn.disabled = true;
  fetch('/api/geocode?q=' + encodeURIComponent(adres + ' België'))
    .then(function(r){ return r.json(); })
    .then(function(data) {
      btn.textContent = 'Bereken'; btn.disabled = false;
      if (!data||!data.length) { errEl.textContent = 'Adres niet gevonden.'; errEl.style.display = 'block'; return; }
      brBerekenMetCoords(parseFloat(data[0].lat), parseFloat(data[0].lon));
    }).catch(function(){ btn.textContent='Bereken'; btn.disabled=false; errEl.textContent='Fout. Probeer opnieuw.'; errEl.style.display='block'; });
}
function brBerekenMetCoords(lat, lon) {
  var dist = brHaversine(50.9720, 3.6180, lat, lon);
  document.getElementById('br-dist').textContent = 'Afstand: ~' + Math.round(dist) + ' km (hemelsbreed)';
  document.getElementById('br-dist').style.display = 'block';
  var ritMult = brRit==='beide' ? 2 : 1, zone, vaste;
  if (dist<=15) { zone=1; vaste=15; } else if (dist<=30) { zone=2; vaste=25; } else if (dist<=50) { zone=3; vaste=35; }
  else { document.getElementById('br-buiten').style.display='block'; return; }
  var kmKost = Math.round(dist*0.55*100)/100;
  var totaal = (vaste+kmKost)*ritMult;
  var zC={1:'color:#3B6D11;background:#EAF3DE',2:'color:#854F0B;background:#FAEEDA',3:'color:#993C1D;background:#FAECE7'};
  var badge = document.getElementById('br-zone-badge');
  badge.style.cssText = zC[zone]+';font-size:12px;font-weight:700;text-transform:uppercase;padding:3px 10px;border-radius:4px;margin-bottom:14px;display:inline-block;';
  badge.textContent = 'Zone '+zone+' — '+Math.round(dist)+' km';
  document.getElementById('br-r-transport').textContent = '€'+(vaste*ritMult).toFixed(2).replace('.',',');
  document.getElementById('br-r-km-label').textContent = 'Km-heffing ('+Math.round(dist)+' km × €0,55 × '+ritMult+' rit'+(ritMult>1?'ten':'')+')';
  document.getElementById('br-r-km').textContent = '€'+(kmKost*ritMult).toFixed(2).replace('.',',');
  document.getElementById('br-r-totaal').textContent = '€'+totaal.toFixed(2).replace('.',',');
  document.getElementById('br-result').style.display = 'block';
}
function brHaversine(lat1,lon1,lat2,lon2) {
  var R=6371, dLat=(lat2-lat1)*Math.PI/180, dLon=(lon2-lon1)*Math.PI/180;
  var a=Math.sin(dLat/2)*Math.sin(dLat/2)+Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)*Math.sin(dLon/2);
  return R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
}
</script>
</body>
</html>`;
}

let count = 0;
for (const loc of LOCATIONS) {
  const html = generatePage(loc);
  fs.writeFileSync(`${loc.slug}.html`, html, 'utf8');
  console.log(`✓ ${loc.slug}.html`);
  count++;
}
console.log(`\nKlaar: ${count} pagina's aangemaakt`);
