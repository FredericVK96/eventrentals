const fs = require('fs');

const LOCATIONS = [
  {
    slug: 'feestmateriaal-huren-gent',
    naam: 'Gent',
    zone: 2,
    distKm: 16,
    h1: 'Feestmateriaal huren in <em>Gent</em>',
    badge: '',
    heroPar: 'Feestmateriaal huren in Gent? EventRentals ondersteunt jaarlijks tal van evenementen in en rond de stad. Van studentenactiviteiten en bedrijfsevenementen tot tuinfeesten en recepties: wij leveren het nodige materiaal snel en professioneel op locatie.',
    heroLocations: 'Wij leveren in Gentbrugge, Ledeberg, Sint-Amandsberg, Mariakerke, Wondelgem, Drongen en alle andere Gentse deelgemeenten',
    metaDesc: 'Feestmateriaal huren in Gent? EventRentals levert springkastelen, partytenten en tuinfeestmateriaal in heel Gent. Levering, plaatsing en ophaling altijd inbegrepen.',
    areaServed: ['Gent','Gentbrugge','Ledeberg','Sint-Amandsberg','Mariakerke','Wondelgem','Drongen','Zwijnaarde'],
    zoneIntro: 'Gent valt doorgaans in <strong>zone 2</strong> (15–30 km). Deelgemeenten zoals Zwijnaarde en Gentbrugge kunnen zone 1 zijn — gebruik de calculator voor uw exact adres.',
    faq10Naam: 'tuinfeest in Gent',
    faqTips: [
      'Reserveer vroeg &mdash; zomerweekends in Gent raken snel volgeboekt, zeker voor grote springkastelen en partytenten.',
      'Kies een partytent als buffer: Gent heeft grilliger zomerweer dan de kust. Een tent beschermt gasten én materiaal.',
      'Check uw toegangsweg vooraf &mdash; smalle Gentse straten vragen soms een kortere aanrijdroute met ons bestelvoertuig.',
      'Combineer een springkasteel met statafels: kinderen springen, volwassenen netwerken &mdash; iedereen is tevreden.',
      'Laat kinderen 45 min. na het eten wachten voor ze in het springkasteel gaan &mdash; standard veiligheidsregel.',
      'Gebruik LED-sfeerverlichting als uw feest doorloopt na zonsondergang — in de Gentse zomer valt het pas laat donker.',
      'Vraag buurttoestemming voor een springkasteel op de oprit of voetpad &mdash; in Gent-centrum kan dit gevoelig liggen.',
      'Plan de opbouwtijd in uw schema: wij hebben gemiddeld 20–40 min. nodig afhankelijk van het materiaal.',
      'Huur een koelkast mee voor dranken &mdash; zeker bij temperaturen boven 25°C een aanrader op een Gents zomerfeest.',
      'Boek levering + ophaling tegelijk voor de beste prijs: één bevestiging, alles geregeld.',
    ],
    faqGehuurde: [
      '<strong>Standaard springkasteel</strong> — de klassieker, geschikt voor 3 tot 12 jaar.',
      '<strong>Hindernisbaan</strong> — populair op schoolfeesten en buurtfeesten in Gent.',
      '<strong>Partytent 4×8m</strong> — ideaal voor grotere tuinen in de Gentse rand.',
      '<strong>Rodeostier</strong> — onmisbaar op studenten- en buurtfeesten.',
      '<strong>Springkasteel met glijbaan</strong> — geeft extra speelplezier in de langere zomeravonden.',
      '<strong>Klaptafels 180cm</strong> — standaard op elk Gents tuinfeest.',
      '<strong>Klapstoel wit</strong> — comfortabel en makkelijk te stapelen.',
      '<strong>LED sfeerverlichting</strong> — voor feestjes die doorlopen na zonsondergang.',
      '<strong>Dino springkasteel</strong> — themafeestjes voor peuters en kleuters.',
      '<strong>Bungee run</strong> — voor de oudere jeugd en volwassenen die durven.',
    ],
    faq: [
      { q: 'Leveren jullie feestmateriaal in Gent?', a: 'Ja, EventRentals levert springkastelen, partytenten, tafels en stoelen in heel Gent — van Gentbrugge en Ledeberg tot Wondelgem, Drongen en Zwijnaarde. Wij leveren op uw gewenste datum en tijdstip.' },
      { q: 'Wat kost levering van feestmateriaal in Gent?', a: 'Gent valt doorgaans in zone 2: €25 vaste transportkost + €0,55/km per rit. Gratis levering bij huurwaarde ≥ €100. Deelgemeenten zoals Zwijnaarde of Gentbrugge kunnen in zone 1 vallen (€15 + €0,55/km). Gebruik de calculator boven voor uw exacte adres.' },
      { q: 'Hoe snel kunnen jullie feestmateriaal leveren in Gent?', a: 'Bij tijdige boeking leveren wij op uw gewenste datum. Voor spoedboeking in Gent belt u best op 0477 39 63 50 — wij kijken samen naar de mogelijkheden.' },
      { q: 'Leveren jullie ook in alle deelgemeenten van Gent?', a: 'Ja, wij leveren in alle Gentse deelgemeenten: Gentbrugge, Ledeberg, Sint-Amandsberg, Mariakerke, Wondelgem, Drongen, Zwijnaarde, Afsnee, Sint-Denijs-Westrem en meer.' },
      { q: 'Kunnen jullie leveren in het centrum van Gent?', a: 'Ja, ook in het Gentse stadscentrum leveren wij. Vermeldt u bij uw boeking of er smalle straten, parkeerverboden of andere toegangsbeperkingen zijn — dan plannen wij de route op voorhand.' },
      { q: 'Welke evenementen zijn populair in Gent?', a: 'Gent is een stad van communiefeesten, studentenfeesten, buurtfeesten en bedrijfsevenementen. Tuinfeesten in de Gentse rand en grotere tenten op schoolpleinen of parken zijn erg populair in de zomermaanden.' },
      { q: 'Welk feestmateriaal wordt het vaakst gehuurd in Gent?', a: 'Springkastelen zijn de bestseller voor kinderfeesten in Gentse tuinen. Partytenten 4×8m zijn standaard op communiefeesten. Statafels en klapstoel-sets worden veel gevraagd bij bedrijfs- en buurtactiviteiten.' },
      { q: 'Leveren jullie voor evenementen op scholen of in parken in Gent?', a: 'Ja, wij leveren op schoolpleinen, in parken en op privéterreinen in heel Gent. Vermeld de locatie bij uw aanvraag zodat wij de toegankelijkheid en eventuele vergunningsvereisten kunnen bespreken.' },
    ],
  },
  {
    slug: 'feestmateriaal-huren-de-pinte',
    naam: 'De Pinte',
    zone: 1,
    distKm: 1,
    h1: 'Feestmateriaal huren in <em>De Pinte</em>',
    badge: '',
    heroPar: 'Op zoek naar feestmateriaal in De Pinte? EventRentals levert alles wat je nodig hebt om van jouw feest een succes te maken. Van stijlvolle tafels en comfortabele stoelen tot partytenten en ander evenementmateriaal: wij zorgen voor een snelle levering en een zorgeloze service.',
    heroLocations: 'Ons depot staat in Begoniapark 14, De Pinte — materiaal ook beschikbaar voor zelf ophalen op afspraak',
    metaDesc: 'Feestmateriaal huren in De Pinte? EventRentals is gevestigd in De Pinte — laagste transportkost, snelste levering. Springkastelen, partytenten en meer.',
    areaServed: ['De Pinte','Nazareth','Zevergem','Sint-Martens-Latem','Gavere'],
    zoneIntro: 'De Pinte is onze thuisgemeente &mdash; u valt altijd in <strong>zone 1</strong> (0–15 km). Gratis levering bij huurwaarde ≥ €100.',
    faq10Naam: 'tuinfeest in De Pinte',
    faqTips: [
      'Ons depot staat in Begoniapark 14 — u kunt materiaal op afspraak komen ophalen en besparen op transportkost.',
      'De Pinte heeft ruime villatuinen: combineer gerust een springkasteel én een partytent op hetzelfde feest.',
      'Reserveer minstens 2 weken op voorhand — zomerweekends zijn snel volgeboekt ondanks onze lokale ligging.',
      'Kies voor levering + ophaling: u hoeft zelf niets te sjouwen, wij bouwen op en breken af.',
      'Gebruik LED-sfeerverlichting als uw feest na zonsondergang doorgaat — sfeervolle aanvulling in elke tuin.',
      'Combineer een rodeostier met een springkasteel voor een mix van jong en oud plezier.',
      'Een hindernisbaan is perfect voor schoolfeesten en buurtactiviteiten in De Pinte en omgeving.',
      'Zorg voor een vlakke, droge ondergrond voor het springkasteel — op een gazon is dit bijna altijd het geval in De Pinte.',
      'Huur een terrasverwarmer mee voor avondfeesten in voor- en najaar &mdash; Oost-Vlaamse avonden kunnen fris zijn.',
      'Vraag een offerte aan voor combinaties &mdash; meerdere producten tegelijk huren is voordeliger.',
    ],
    faqGehuurde: [
      '<strong>Standaard springkasteel</strong> — de meest geboekte uit ons depot in De Pinte.',
      '<strong>Partytent 3×6m</strong> — populairste maat voor gemiddelde Pintse tuin.',
      '<strong>Partytent 4×8m</strong> — voor grotere families en buurtfeesten.',
      '<strong>Rodeostier</strong> — altijd goed voor een lach op elk feest.',
      '<strong>Hindernisbaan</strong> — ideaal voor groepen kinderen van 5 tot 14 jaar.',
      '<strong>Springkasteel met glijbaan</strong> — extra populair in de zomermaanden.',
      '<strong>Klaptafels + klapstoel wit</strong> — complete tafelset voor tuinrecepties.',
      '<strong>LED sfeerverlichting</strong> — voor feesten na zonsondergang.',
      '<strong>Koelkast</strong> — handig bij grote feesten om dranken fris te houden.',
      '<strong>Bungee run</strong> — voor de sportieve gasten en tieners.',
    ],
    faq: [
      { q: 'Leveren jullie feestmateriaal in De Pinte?', a: 'Ja, EventRentals levert springkastelen, partytenten en evenementmateriaal in De Pinte en omliggende gemeenten zoals Nazareth, Sint-Martens-Latem en Gavere.' },
      { q: 'Wat kost levering van feestmateriaal in De Pinte?', a: 'De Pinte valt in zone 1: €15 vaste transportkost + €0,55/km per rit. Gratis levering bij huurwaarde ≥ €100. Gebruik de calculator voor uw exacte adres.' },
      { q: 'Hoe snel kunnen jullie feestmateriaal leveren in De Pinte?', a: 'Zeer snel — wij zijn een lokale verhuurder en kunnen bij beschikbaarheid ook dezelfde dag leveren. Bel 0477 39 63 50 voor spoedbestellingen.' },
      { q: 'Kan ik feestmateriaal zelf ophalen in De Pinte?', a: 'Ja, op afspraak kunt u materiaal ophalen in Begoniapark 14, De Pinte. Bel ons op 0477 39 63 50 om een tijdstip af te spreken. Voor grote stukken zoals partytenten raden wij levering aan.' },
      { q: 'Leveren jullie ook in Zevergem en omliggende gemeenten vanuit De Pinte?', a: 'Ja, wij leveren vanuit De Pinte ook in Nazareth, Gavere, Sint-Martens-Latem, Zevergem en andere omliggende gemeenten — allemaal in zone 1.' },
      { q: 'Welk feestmateriaal wordt het vaakst gehuurd in De Pinte?', a: 'Springkastelen zijn de absolute bestseller, gevolgd door partytenten 3×6m en 4×8m voor communiefeesten en familiefeesten. Statafels en klapstoel-sets zijn populair bij recepties.' },
      { q: 'Leveren jullie voor schoolfeesten en buurtactiviteiten in De Pinte?', a: 'Ja, wij leveren regelmatig voor schoolfeesten, buurtactiviteiten en verenigingsevenementen in De Pinte. Neem contact op voor een aangepaste offerte.' },
      { q: 'Zijn er specifieke aandachtspunten voor feesten in De Pinte?', a: 'De Pinte heeft veel ruime tuinen — ideaal voor een uitgebreide feestopstelling. Controleer wel of uw oprit of tuin bereikbaar is voor ons bestelvoertuig en vermeld dit bij uw aanvraag.' },
    ],
  },
  {
    slug: 'feestmateriaal-huren-nazareth',
    naam: 'Nazareth',
    zone: 1,
    distKm: 2,
    h1: 'Feestmateriaal huren in <em>Nazareth</em>',
    badge: '',
    heroPar: 'Een geslaagd feest begint met het juiste materiaal. In Nazareth helpt EventRentals particulieren, bedrijven en verenigingen met het huren van feestmateriaal voor elke gelegenheid.',
    heroLocations: 'Wij leveren in Nazareth, De Pinte, Eke, Zevergem, Gavere en alle omliggende gemeenten',
    metaDesc: 'Feestmateriaal huren in Nazareth? EventRentals vertrekt vanuit Nazareth-De Pinte — snelste levering, eerlijke prijs. Springkastelen, tenten en tuinfeestmateriaal.',
    areaServed: ['Nazareth','De Pinte','Eke','Zevergem','Gavere'],
    zoneIntro: 'Nazareth ligt pal naast ons depot &mdash; u valt altijd in <strong>zone 1</strong> (0–15 km). Gratis levering bij huurwaarde ≥ €100.',
    faq10Naam: 'tuinfeest in Nazareth',
    faqTips: [
      'Ons depot staat in Begoniapark 14, Nazareth — dichtste verhuurder voor uw feest, laagste transportkost.',
      'Nazareth heeft veel ruime halfopen tuinen — ideaal voor een springkasteel én een partytent naast elkaar.',
      'Plan de levering minstens 1 uur voor aanvang van het feest zodat er voldoende opbouwtijd is.',
      'Combineer een hindernisbaan met een springkasteel voor grotere kindergroepen — meer afwisseling, meer plezier.',
      'Gebruik een partytent als schaduwplek — zelfs op zonnige Oost-Vlaamse zomerdagen is schaduw welkom.',
      'Kies voor gratis levering (zone 1 & 2) door uw bestelling boven €100 uit te bouwen: extra stoel- of tafelverhuur telt mee.',
      'Reserveer op vrijdag voor het weekend: wij leveren op zaterdagochtend en halen op zondagavond op.',
      'Huur een terrasverwarmer voor feesten in het voor- of najaar &mdash; Nazareth-avonden worden snel fris.',
      'Markeer de hoekpunten van het springkasteel voor de opbouw, zodat het op de juiste plek staat in uw tuin.',
      'Laat de kleintjes altijd onder toezicht van een volwassene in het springkasteel &mdash; standaard veiligheidsregel.',
    ],
    faqGehuurde: [
      '<strong>Standaard springkasteel</strong> — de absolute bestseller in Nazareth en omgeving.',
      '<strong>Partytent 3×6m</strong> — past in vrijwel elke tuin in Nazareth.',
      '<strong>Hindernisbaan</strong> — populair bij schooluitstappen en communiefeesten.',
      '<strong>Rodeostier</strong> — onvermijdelijk op elk groter tuinfeest.',
      '<strong>Springkasteel met glijbaan</strong> — extra geliefd bij kinderen van 4 tot 10 jaar.',
      '<strong>Klaptafels + stoelen</strong> — complete opstelling voor familiefeesten.',
      '<strong>Dino springkasteel</strong> — themagericht voor jongere kinderen.',
      '<strong>LED sfeerverlichting</strong> — voor zomerse avondfeesten in de Nazarethse tuinen.',
      '<strong>Koelkast</strong> — handig voor grote groepen en warme zomerdagen.',
      '<strong>Partytent 4×8m</strong> — voor grotere families en buurtfeesten.',
    ],
    faq: [
      { q: 'Leveren jullie feestmateriaal in Nazareth?', a: 'Ja, EventRentals levert springkastelen huren, feesttenten en tafels en stoelen huren in Nazareth, Eke, Zevergem en omliggende gemeenten.' },
      { q: 'Wat kost levering van feestmateriaal in Nazareth?', a: 'Nazareth valt in zone 1: €15 vaste transportkost + €0,55/km per rit. Gratis levering bij huurwaarde ≥ €100. Gebruik de calculator voor uw exacte adres.' },
      { q: 'Hoe snel kunnen jullie feestmateriaal leveren in Nazareth?', a: 'Nazareth ligt vlakbij ons depot — wij zijn er snel. Bij beschikbaarheid is spoedboeking dezelfde dag mogelijk. Bel 0477 39 63 50 voor de actuele planning.' },
      { q: 'Leveren jullie ook in Eke en Zevergem?', a: 'Ja, wij leveren in heel de gemeente Nazareth: Nazareth-centrum, Eke en Zevergem. Alle deelgemeenten vallen in zone 1.' },
      { q: 'Zijn leveringen op zaterdag en zondag mogelijk in Nazareth?', a: 'Zeker, wij leveren zeven dagen op zeven — ook in het weekend. Uw tijdslot wordt bij boeking bevestigd.' },
      { q: 'Welke evenementen zijn populair in Nazareth?', a: 'Communiefeesten in mei en juni zijn de drukste periode in Nazareth en omgeving. Verjaardagsfeesten, buurtfeesten en familiebijeenkomsten zijn het hele jaar door populair.' },
      { q: 'Welk feestmateriaal wordt het vaakst gehuurd in Nazareth?', a: 'Springkastelen zijn de nummer 1 keuze in Nazareth, gevolgd door partytenten voor communiefeesten. Hindernisbanen zijn populair op schooluitstappen en grotere kindergroepen.' },
      { q: 'Zijn er aandachtspunten voor leveringen in Nazareth?', a: 'Sommige wegen in Eke en Zevergem zijn smal. Vermeld bij uw aanvraag eventuele moeilijk bereikbare locaties — dan plannen wij de route op voorhand.' },
    ],
  },
  {
    slug: 'feestmateriaal-huren-merelbeke',
    naam: 'Merelbeke',
    zone: 1,
    distKm: 11,
    h1: 'Feestmateriaal huren in <em>Merelbeke</em>',
    badge: '',
    heroPar: 'Wie een feest organiseert in Merelbeke wil vooral kunnen genieten van het moment. Daarom maakt EventRentals het huren van feestmateriaal eenvoudig en betrouwbaar.',
    heroLocations: 'Wij leveren in Merelbeke, Lemberge, Munte, Bottelare, Gontrode en omgeving',
    metaDesc: 'Feestmateriaal huren in Merelbeke? EventRentals levert snel vanuit De Pinte. Springkastelen, partytenten, tuinfeestmateriaal — plaatsing altijd inbegrepen.',
    areaServed: ['Merelbeke','Lemberge','Munte','Bottelare','Gontrode'],
    zoneIntro: 'Merelbeke valt in <strong>zone 1</strong> (0–15 km van ons depot). Gratis levering bij huurwaarde ≥ €100.',
    faq10Naam: 'tuinfeest in Merelbeke',
    faqTips: [
      'Merelbeke heeft ruime rijwoningen en halfopen bebouwing — perfect voor een springkasteel op het achterterras.',
      'Combineer een partytent met het springkasteel: kinderen springen, ouders zitten droog onder de tent.',
      'Reserveer minstens 2 weken op voorhand voor zomerse weekends in Merelbeke.',
      'Controleer of uw oprit breed genoeg is voor ons bestelvoertuig &mdash; geef eventuele beperkingen op bij uw aanvraag.',
      'Gebruik LED-verlichting voor avondfeesten: Merelbeke heeft rustige straten, ideaal voor een feest na zonsondergang.',
      'Huur klapstoel en tafels mee voor een complete opstelling — geen gedoe met lenen bij buren.',
      'Een rodeostier is populair bij Merelbeke-buurtfeesten: groot plezier voor een gemengd publiek.',
      'Plan uw feest op zaterdag en laat ons vrijdagavond leveren: meer opbouwtijd, meer speeltijd.',
      'Laat kinderen nooit alleen in het springkasteel &mdash; toezicht is verplicht voor veilig gebruik.',
      'Vraag een offerte aan bij combinaties: meerdere producten tegelijk is voordeliger dan apart huren.',
    ],
    faqGehuurde: [
      '<strong>Standaard springkasteel</strong> — meest geboekt in Merelbeke en deelgemeenten.',
      '<strong>Partytent 3×6m</strong> — past in de meeste Merebeekse tuinen.',
      '<strong>Hindernisbaan</strong> — geliefd bij schoolfeesten en communierecepties.',
      '<strong>Klaptafels + klapstoel wit</strong> — onmisbaar voor elke receptie of tuinfeest.',
      '<strong>Rodeostier</strong> — voor de grotere feesten en buurtactiviteiten.',
      '<strong>Springkasteel met glijbaan</strong> — extra geliefd bij kinderen in de zomer.',
      '<strong>LED sfeerverlichting</strong> — voor feesten die doorgaan tot in de avond.',
      '<strong>Partytent 4×8m</strong> — voor grotere feesten met meer dan 30 gasten.',
      '<strong>Dino springkasteel</strong> — themafeestjes voor jonge kinderen.',
      '<strong>Terrasverwarmer</strong> — voor feesten in het voor- en najaar.',
    ],
    faq: [
      { q: 'Leveren jullie feestmateriaal in Merelbeke?', a: 'Ja, EventRentals levert springkastelen, partytenten en evenementmateriaal huren in heel Merelbeke — van het centrum tot Lemberge, Munte, Bottelare en Gontrode.' },
      { q: 'Wat kost levering van feestmateriaal in Merelbeke?', a: 'Merelbeke valt in zone 1: €15 vaste transportkost + €0,55/km per rit. Gratis levering bij huurwaarde ≥ €100. Gebruik de calculator voor uw exacte adres.' },
      { q: 'Hoe snel kunnen jullie feestmateriaal leveren in Merelbeke?', a: 'Merelbeke valt in zone 1, vlakbij ons depot. Wij leveren op uw gewenste datum en tijdstip. Voor dringende bestellingen belt u 0477 39 63 50.' },
      { q: 'Leveren jullie ook in Lemberge, Munte, Bottelare en Gontrode?', a: 'Ja, wij leveren in alle deelgemeenten van Merelbeke: Merelbeke-centrum, Lemberge, Munte, Bottelare en Gontrode — allemaal in zone 1.' },
      { q: 'Kunnen jullie leveren aan de rand van Gent in Merelbeke?', a: 'Ja, Merelbeke grenst aan Gent en wij zijn vertrouwd met deze overgangszone. Uw adres valt in zone 1, wat de transportkost laag houdt.' },
      { q: 'Welke evenementen zijn populair in Merelbeke?', a: 'Merelbeke combineert residentiële tuinen met nabijheid van Gent. Communiefeesten, verjaardagsfeesten en buurtactiviteiten zijn populair. Ook schoolfeesten in de Merelbeke-regio vragen regelmatig materiaal.' },
      { q: 'Welk feestmateriaal wordt het vaakst gehuurd in Merelbeke?', a: 'Springkastelen en hindernisbanen zijn populair voor kinderfeesten. Partytenten 3×6m zijn de standaardkeuze voor tuinrecepties in Merelbeke. Statafels worden vaak bijgeboekt voor communies.' },
      { q: 'Hoe ver op voorhand reserveren voor een feest in Merelbeke?', a: 'Reserveer minstens 2 weken op voorhand. Voor zomerse weekends (mei–augustus) en communieweekends is 3 weken aanbevolen.' },
    ],
  },
  {
    slug: 'feestmateriaal-huren-sint-martens-latem',
    naam: 'Sint-Martens-Latem',
    zone: 1,
    distKm: 7,
    h1: 'Feestmateriaal huren in <em>Sint&#8209;Martens&#8209;Latem</em>',
    badge: '',
    heroPar: 'In Sint-Martens-Latem draait een geslaagd evenement vaak om sfeer, uitstraling en comfort. Daarom biedt EventRentals een ruim assortiment feestmateriaal aan voor zowel particuliere als professionele evenementen.',
    heroLocations: 'Wij leveren in Sint-Martens-Latem, Deurle en alle omliggende gemeenten langs de Leie',
    metaDesc: 'Feestmateriaal huren in Sint-Martens-Latem of Deurle? EventRentals levert snel vanuit De Pinte. Springkastelen, partytenten en meer — plaatsing inbegrepen.',
    areaServed: ['Sint-Martens-Latem','Deurle','De Pinte','Gavere','Nazareth'],
    zoneIntro: 'Sint-Martens-Latem en Deurle vallen in <strong>zone 1</strong> (0–15 km). Gratis levering bij huurwaarde ≥ €100.',
    faq10Naam: 'tuinfeest in Sint-Martens-Latem',
    faqTips: [
      'De ruime tuinen langs de Leie zijn ideaal voor grote partytenten en springkastelen naast elkaar.',
      'Reserveer vroeg: Sint-Martens-Latem is populair voor communiefeesten en verjaardagsrecepties in mei en juni.',
      'Combineer een partytent 4×8m met een springkasteel voor een complete opstelling op grotere percelen.',
      'Gebruik LED-sfeerverlichting langs de Leie voor een magische sfeer op zomeravonden.',
      'Vraag bij uw aanvraag of de toegangsweg via de wegel langs de Leie bereikbaar is voor ons bestelvoertuig.',
      'Een rodeostier is erg populair bij grotere recepties in de Latem-regio — gasten van alle leeftijden doen mee.',
      'Huur een terrasverwarmer mee voor avondfeesten in het voor- of najaar langs de Leie.',
      'Kies klaptafels in combinatie met witte klapstoel voor een stijlvol en praktisch tafeldecor.',
      'Laat kinderen nooit onbeheerd in het springkasteel &mdash; zeker aan de waterrijke Leie is extra toezicht aangeraden.',
      'Boek levering + ophaling samen: één moment plannen, alles geregeld voor uw feest in de Leiestreek.',
    ],
    faqGehuurde: [
      '<strong>Partytent 4×8m</strong> — populairste keuze in de ruime Latem-tuinen.',
      '<strong>Standaard springkasteel</strong> — klassieke keuze voor kinderfeesten langs de Leie.',
      '<strong>Rodeostier</strong> — onvermijdelijk op grotere recepties in Sint-Martens-Latem.',
      '<strong>Klaptafels + klapstoel wit</strong> — stijlvol en praktisch voor Latem-stijl recepties.',
      '<strong>LED sfeerverlichting</strong> — langs de Leie is sfeervolle verlichting een absolute meerwaarde.',
      '<strong>Hindernisbaan</strong> — geliefd bij communiefeesten met gemengde kindergroepen.',
      '<strong>Springkasteel met glijbaan</strong> — extra populair voor jongere kinderen.',
      '<strong>Terrasverwarmer</strong> — voor avondfeesten in het voor- en najaar.',
      '<strong>Partytent 3×6m</strong> — compactere optie voor kleinere tuinen in Deurle.',
      '<strong>Koelkast</strong> — ideaal voor recepties met meerdere uren drank.',
    ],
    faq: [
      { q: 'Leveren jullie feestmateriaal in Sint-Martens-Latem?', a: 'Ja, EventRentals levert springkastelen huren, feesttenten en tafels en stoelen huren in Sint-Martens-Latem en Deurle. Wij leveren op uw gewenste datum langs de Leie en in de ruime villatuinen.' },
      { q: 'Wat kost levering van feestmateriaal in Sint-Martens-Latem?', a: 'Sint-Martens-Latem valt in zone 1: €15 vaste transportkost + €0,55/km per rit. Gratis levering bij huurwaarde ≥ €100. Gebruik de calculator voor uw exacte adres.' },
      { q: 'Hoe snel kunnen jullie feestmateriaal leveren in Sint-Martens-Latem?', a: 'Sint-Martens-Latem valt in zone 1, vlakbij ons depot. Wij leveren op uw gewenste tijdstip. Bel 0477 39 63 50 voor beschikbaarheid.' },
      { q: 'Leveren jullie ook in Deurle?', a: 'Ja, wij leveren in de volledige gemeente Sint-Martens-Latem, inclusief Deurle. Beide deelgemeenten vallen in zone 1.' },
      { q: 'Zijn leveringen mogelijk langs de Leie in Sint-Martens-Latem?', a: 'Ja, wij leveren langs de Leie in Sint-Martens-Latem en Deurle. Vermeld bij uw aanvraag of de toegangsweg via een Leiepad of smalle oprit verloopt — dan plannen wij de route op voorhand.' },
      { q: 'Welke evenementen zijn populair in Sint-Martens-Latem?', a: 'Sint-Martens-Latem staat bekend om zijn culturele erfgoed en de Latemse schildersschool. Recepties, huwelijksfeesten en communiefeesten in de ruime tuinen langs de Leie zijn hier erg populair.' },
      { q: 'Welk feestmateriaal is het meest gevraagd in Sint-Martens-Latem?', a: 'Partytenten 4×8m zijn de populairste keuze voor grote tuinfeesten en huwelijksrecepties in Sint-Martens-Latem. Springkastelen zijn geliefd bij kinderfeesten. Klapstoel- en tafelsets completeren elke receptie.' },
      { q: 'Leveren jullie voor huwelijken en recepties in Sint-Martens-Latem?', a: 'Ja, wij leveren evenementmateriaal voor huwelijken, recepties en jubileumfeesten in Sint-Martens-Latem. Neem contact op voor een aangepaste offerte op maat van uw evenement.' },
    ],
  },
  {
    slug: 'feestmateriaal-huren-gavere',
    naam: 'Gavere',
    zone: 1,
    distKm: 13,
    h1: 'Feestmateriaal huren in <em>Gavere</em>',
    badge: '',
    heroPar: 'Organiseer je een feest of evenement in Gavere? EventRentals helpt je graag met de verhuur van kwalitatief feestmateriaal. Van tafels en stoelen tot tenten en andere praktische benodigdheden: wij leveren alles rechtstreeks op jouw locatie.',
    heroLocations: 'Wij leveren in Gavere, Asper, Baaigem, Vurste, Semmerzake en Dikkelvenne',
    metaDesc: 'Feestmateriaal huren in Gavere? EventRentals levert springkastelen, partytenten en tuinfeestmateriaal in Gavere en deelgemeenten. Snel, eerlijk geprijsd.',
    areaServed: ['Gavere','Asper','Baaigem','Vurste','Semmerzake','Dikkelvenne'],
    zoneIntro: 'Gavere valt in <strong>zone 1</strong> (0–15 km). Gratis levering bij huurwaarde ≥ €100.',
    faq10Naam: 'tuinfeest in Gavere',
    faqTips: [
      'Gavere heeft veel ruime tuinen op het platteland &mdash; ideaal voor een groot springkasteel of hindernisbaan.',
      'Combineer een partytent met het springkasteel: kinderen springen buiten, volwassenen zitten droog.',
      'Reserveer tijdig voor communieweekends in mei &mdash; populaire data in de Gaverse regio raken snel vol.',
      'Huur statafels mee voor een staande receptie — ideaal bij communiefeesten en verjaardagen.',
      'Gebruik LED-sfeerverlichting voor tuinfeesten die doorlopen na zonsondergang &mdash; zeker in de Gavere-polder.',
      'Controleer of uw oprit toegankelijk is voor ons bestelvoertuig &mdash; in Asper en Vurste zijn sommige wegen smal.',
      'Plan de opbouw minstens 1 uur voor de aankomst van uw gasten in.',
      'Een rodeostier of bungee run is perfect voor gemengde feesten met tieners én volwassenen.',
      'Huur een koelkast voor dranken &mdash; zeker bij warme zomerdagen in de open Gavere-streek.',
      'Vraag een combinatieofferte aan: meerdere producten tegelijk huren is altijd voordeliger.',
    ],
    faqGehuurde: [
      '<strong>Standaard springkasteel</strong> — meest geboekte item in de Gavere-regio.',
      '<strong>Partytent 3×6m</strong> — populairste maat voor Gavere-tuinen.',
      '<strong>Hindernisbaan</strong> — geliefd bij schoolfeesten en buurtactiviteiten.',
      '<strong>Klaptafels + klapstoel wit</strong> — standaard op elk feest in Gavere.',
      '<strong>Rodeostier</strong> — voor gemengde feesten met jong en oud.',
      '<strong>Springkasteel met glijbaan</strong> — extra speelplezier voor kinderen.',
      '<strong>LED sfeerverlichting</strong> — voor feesten die doorlopen in de avond.',
      '<strong>Partytent 4×8m</strong> — voor grotere feesten met meer dan 30 gasten.',
      '<strong>Terrasverwarmer</strong> — voor feesten in het voor- of najaar.',
      '<strong>Koelkast</strong> — handig op warme zomerdagen in de open Gavere-polder.',
    ],
    faq: [
      { q: 'Leveren jullie feestmateriaal in Gavere?', a: 'Ja, EventRentals levert springkastelen, feesttenten huren en tafels en stoelen huren in heel Gavere — van het centrum tot Asper, Baaigem, Vurste, Semmerzake en Dikkelvenne.' },
      { q: 'Wat kost levering van feestmateriaal in Gavere?', a: 'Gavere valt in zone 1: €15 vaste transportkost + €0,55/km per rit. Gratis levering bij huurwaarde ≥ €100. Gebruik de calculator voor uw exacte adres.' },
      { q: 'Hoe snel kunnen jullie feestmateriaal leveren in Gavere?', a: 'Gavere valt in zone 1, vlakbij ons depot. Bij tijdige boeking leveren wij op uw gewenste tijdstip. Spoedboeking dezelfde dag is soms mogelijk — bel 0477 39 63 50.' },
      { q: 'Leveren jullie ook in Asper, Baaigem, Vurste en de andere deelgemeenten van Gavere?', a: 'Ja, wij leveren in alle deelgemeenten van Gavere: Gavere-centrum, Asper, Baaigem, Vurste, Semmerzake en Dikkelvenne.' },
      { q: 'Zijn leveringen mogelijk op het platteland rond Gavere?', a: 'Ja, wij leveren op het platteland in de Gavere-regio. Sommige landelijke wegen zijn smal — vermeld dit bij uw aanvraag zodat wij de route op voorhand kunnen plannen.' },
      { q: 'Welke evenementen zijn populair in Gavere?', a: 'Gavere is een landelijke gemeente met veel buurtfeesten, communiefeesten en familiebijeenkomsten. Kermissen en verenigingsevenementen in de deelgemeenten vragen ook regelmatig materiaal.' },
      { q: 'Welk feestmateriaal wordt het vaakst gehuurd in Gavere?', a: 'Springkastelen zijn de bestseller voor communies en verjaardagen. Partytenten zijn populair voor grotere familiefeesten. Statafels en klapstoel-sets zijn standaard op elke receptie in de Gavere-regio.' },
      { q: 'Leveren jullie voor kermissen en buurtfeesten in Gavere?', a: 'Ja, wij leveren voor kermissen, buurtfeesten en verenigingsevenementen in Gavere en deelgemeenten. Neem contact op voor grotere bestellingen en eventuele korting op combinaties.' },
    ],
  },
  {
    slug: 'feestmateriaal-huren-deinze',
    naam: 'Deinze',
    zone: 2,
    distKm: 18,
    h1: 'Feestmateriaal huren in <em>Deinze</em>',
    badge: '',
    heroPar: 'Een evenement organiseren in Deinze vraagt om een goede voorbereiding en het juiste materiaal. EventRentals biedt een uitgebreid assortiment feestmateriaal aan voor zowel kleine als grote evenementen.',
    heroLocations: 'Wij leveren in Deinze, Zulte, Petegem-aan-de-Leie, Astene, Nevele en omgeving',
    metaDesc: 'Feestmateriaal huren in Deinze of Zulte? EventRentals levert springkastelen, partytenten en tuinfeestmateriaal in groot-Deinze. Plaatsing altijd inbegrepen.',
    areaServed: ['Deinze','Zulte','Petegem-aan-de-Leie','Astene','Nevele'],
    zoneIntro: 'Deinze valt in <strong>zone 2</strong> (15–30 km). Gebruik de calculator voor uw exacte adres — Zulte en omgeving kunnen zone 1 zijn.',
    faq10Naam: 'tuinfeest in Deinze',
    faqTips: [
      'Deinze is een fusiegemeente — controleer uw exacte adres in de transportcalculator voor de juiste prijs.',
      'Deelgemeenten zoals Zulte en Petegem liggen dicht bij ons depot en vallen soms in zone 1.',
      'Reserveer vroeg voor communiefeesten in mei en juni &mdash; drukste periode in de Deinze-regio.',
      'Combineer een partytent met het springkasteel voor een complete festivalsfeer in uw tuin.',
      'Gebruik LED-sfeerverlichting langs de Leie voor een sfeervolle avond &mdash; populair in Petegem en Astene.',
      'Een hindernisbaan is populair bij schooluitstappen en buurtfeesten in groot-Deinze.',
      'Huur klapstoel en tafels mee: zo hoeft u niets te lenen bij buren of te huren via een andere partij.',
      'Plan levering op vrijdagavond als uw feest op zaterdag is &mdash; zo is alles klaar zonder tijdsdruk.',
      'Zorg voor een vlakke grasvlakte voor het springkasteel &mdash; niet op een stenen oprit of hellend terras.',
      'Vraag een combinatieofferte: springkasteel + tent + meubilair tegelijk boeken is voordeliger.',
    ],
    faqGehuurde: [
      '<strong>Standaard springkasteel</strong> — de populairste keuze in groot-Deinze.',
      '<strong>Partytent 3×6m</strong> — ideale maat voor gemiddelde Deinze-tuin.',
      '<strong>Hindernisbaan</strong> — geliefd bij schoolactiviteiten in de regio.',
      '<strong>Klaptafels + klapstoel wit</strong> — standaard op elke Deinze-receptie.',
      '<strong>Springkasteel met glijbaan</strong> — extra populair bij kinderen van 4 tot 12 jaar.',
      '<strong>Partytent 4×8m</strong> — voor grotere families en buurtfeesten in Deinze.',
      '<strong>Rodeostier</strong> — voor gemengde feesten met een sportief tintje.',
      '<strong>LED sfeerverlichting</strong> — voor avondfeesten langs de Leie.',
      '<strong>Terrasverwarmer</strong> — voor feesten in het voor- of najaar.',
      '<strong>Koelkast</strong> — handig op warme zomerse tuinfeesten.',
    ],
    faq: [
      { q: 'Leveren jullie feestmateriaal in Deinze?', a: 'Ja, EventRentals levert springkastelen huren, partytenten en evenementmateriaal huren in heel groot-Deinze — van het stadscentrum tot Zulte, Petegem-aan-de-Leie, Astene en Nevele.' },
      { q: 'Wat kost levering van feestmateriaal in Deinze?', a: 'Deinze valt doorgaans in zone 2: €25 vaste transportkost + €0,55/km per rit. Gratis levering bij huurwaarde ≥ €100. Sommige deelgemeenten zoals Zulte kunnen in zone 1 vallen. Gebruik de calculator voor uw exacte adres.' },
      { q: 'Hoe snel kunnen jullie feestmateriaal leveren in Deinze?', a: 'Wij leveren op uw gewenste datum en tijdstip in groot-Deinze. Voor spoedbestellingen belt u 0477 39 63 50 — wij bekijken samen de mogelijkheden.' },
      { q: 'Leveren jullie ook in Zulte, Petegem-aan-de-Leie, Astene en Nevele?', a: 'Ja, wij leveren in alle deelgemeenten van groot-Deinze: Deinze-centrum, Zulte, Petegem-aan-de-Leie, Astene, Nevele en omliggende gehuchten.' },
      { q: 'Kunnen jullie leveren in het centrum van Deinze?', a: 'Ja, ook in het centrum van Deinze leveren wij feestmateriaal. Vermeld bij uw aanvraag eventuele parkeer- of toegangsbeperkingen zodat wij de levering vlot kunnen plannen.' },
      { q: 'Welke evenementen zijn populair in groot-Deinze?', a: 'Deinze is een fusiegemeente met diverse evenementen: communiefeesten, tuinfeesten langs de Leie in Petegem en Astene, bedrijfsevenementen en buurtfeesten in alle deelgemeenten.' },
      { q: 'Welk feestmateriaal wordt het vaakst gehuurd in Deinze?', a: 'Springkastelen en partytenten zijn de meest gevraagde items in groot-Deinze. Tafels en stoelen huren is populair bij communies en huwelijksrecepties. Statafels worden vaak bijgeboekt voor bedrijfsevenementen.' },
      { q: 'Leveren jullie voor evenementen langs de Leie in Deinze?', a: 'Ja, wij leveren voor feesten langs de Leie in Petegem-aan-de-Leie en Astene. Vermeld de locatie bij uw aanvraag — toegang via Leiepaden kan specifieke planning vereisen.' },
    ],
  },
  {
    slug: 'feestmateriaal-huren-oudenaarde',
    naam: 'Oudenaarde',
    zone: 2,
    distKm: 24,
    h1: 'Feestmateriaal huren in <em>Oudenaarde</em>',
    badge: '',
    heroPar: 'Of je nu een intiem familiefeest organiseert of een groter evenement plant, in Oudenaarde kun je rekenen op EventRentals voor kwalitatief feestmateriaal.',
    heroLocations: 'Wij leveren in Oudenaarde, Ename, Eine, Bevere, Leupegem, Melden, Welden en omgeving',
    metaDesc: 'Feestmateriaal huren in Oudenaarde? EventRentals levert springkastelen, partytenten en tuinfeestmateriaal in Oudenaarde en de Vlaamse Ardennen. Plaatsing inbegrepen.',
    areaServed: ['Oudenaarde','Ename','Eine','Bevere','Leupegem','Melden','Welden'],
    zoneIntro: 'Oudenaarde valt in <strong>zone 2</strong> (15–30 km van ons depot). Gebruik de calculator voor uw exacte adres.',
    faq10Naam: 'tuinfeest in Oudenaarde',
    faqTips: [
      'De Vlaamse Ardennen zijn heuvelachtig — check bij uw aanvraag of uw tuin vlak genoeg is voor een springkasteel.',
      'Oudenaarde heeft veel historische panden en grotere percelen: ideaal voor een uitgebreide feestopstelling.',
      'Combineer een partytent met het springkasteel voor een complete festivalsfeer in uw Oudenaardse tuin.',
      'Reserveer vroeg voor de Vlaamse Ardennen Cyclo-weekends — die weekends zijn extra druk in de regio.',
      'Huur een terrasverwarmer mee voor avondfeesten: heuvelachtige gebieden zijn koeler dan de vallei.',
      'Een hindernisbaan is perfect voor grotere kindergroepen bij communiefeesten in Oudenaarde.',
      'Gebruik LED-sfeerverlichting voor tuinfeesten na zonsondergang in de Vlaamse Ardennen &mdash; sfeervolle aanvulling.',
      'Kies klaptafels en witte stoelen voor een stijlvolle receptie bij een communiefeest of huwelijk.',
      'Plan levering op vrijdagavond voor een zaterdag-feest: meer tijd om alles op te bouwen en te testen.',
      'Vraag een combinatieofferte aan — springkasteel, tent en meubilair tegelijk boeken geeft de beste prijs.',
    ],
    faqGehuurde: [
      '<strong>Partytent 4×8m</strong> — meest geboekte item in Oudenaarde voor grotere feesten.',
      '<strong>Standaard springkasteel</strong> — populairste keuze bij communiefeesten en kinderverjaardagen.',
      '<strong>Hindernisbaan</strong> — geliefd bij schoolactiviteiten in de Vlaamse Ardennen.',
      '<strong>Klaptafels + klapstoel wit</strong> — onmisbaar voor elke receptie in de regio.',
      '<strong>Rodeostier</strong> — voor gemengde feesten met jong en oud in Oudenaarde.',
      '<strong>Terrasverwarmer</strong> — noodzakelijk voor avondfeesten in de koelere Ardense heuvels.',
      '<strong>Springkasteel met glijbaan</strong> — extra populair bij jongere kinderen.',
      '<strong>LED sfeerverlichting</strong> — voor sfeervolle avondfeesten in historisch Oudenaarde.',
      '<strong>Partytent 3×6m</strong> — voor kleinere tuinfeesten in de deelgemeenten.',
      '<strong>Koelkast</strong> — voor langdurige recepties met meerdere uren drank.',
    ],
    faq: [
      { q: 'Leveren jullie feestmateriaal in Oudenaarde?', a: 'Ja, EventRentals levert springkastelen, feesttenten huren en evenementmateriaal in heel Oudenaarde — van het historische centrum tot Ename, Eine, Bevere, Leupegem, Melden en Welden.' },
      { q: 'Wat kost levering van feestmateriaal in Oudenaarde?', a: 'Oudenaarde valt in zone 2: €25 vaste transportkost + €0,55/km per rit. Gratis levering bij huurwaarde ≥ €100. Gebruik de calculator voor uw exacte adres in de Vlaamse Ardennen.' },
      { q: 'Hoe snel kunnen jullie feestmateriaal leveren in Oudenaarde?', a: 'Wij leveren op uw gewenste datum in Oudenaarde en de Vlaamse Ardennen. Reserveer bij voorkeur 2–3 weken op voorhand. Bel 0477 39 63 50 voor beschikbaarheid.' },
      { q: 'Leveren jullie ook in Ename, Eine, Bevere en de andere deelgemeenten van Oudenaarde?', a: 'Ja, wij leveren in alle deelgemeenten van Oudenaarde: Ename, Eine, Bevere, Leupegem, Melden, Welden en alle andere gehuchten in de Vlaamse Ardennen.' },
      { q: 'Zijn leveringen mogelijk op heuvelachtig terrein in de Vlaamse Ardennen?', a: 'Wij leveren in het heuvelachtige landschap van de Vlaamse Ardennen. Let op: opblaasmaterialen zoals springkastelen vereisen een vlakke ondergrond. Vermeld het terrein bij uw aanvraag zodat wij mee kunnen denken.' },
      { q: 'Welke evenementen zijn populair in Oudenaarde?', a: 'Oudenaarde is een historische stad met rijke feesttraditie: communiefeesten, huwelijksrecepties, familiefeesten en bedrijfsevenementen. Rond de Ronde van Vlaanderen is de regio extra levendig.' },
      { q: 'Welk feestmateriaal is het meest gevraagd in Oudenaarde?', a: 'Partytenten 4×8m zijn populair voor grote familiefeesten in de Oudenaardse tuinen. Springkastelen zijn geliefd bij communies en verjaardagen. Terrasverwarmer huren is een must voor avondfeesten in de Ardense heuvels.' },
      { q: 'Leveren jullie voor evenementen tijdens de Ronde van Vlaanderen in Oudenaarde?', a: 'Ja, wij leveren ook tijdens de drukke Ronde-van-Vlaanderen-periode. Reserveer wel tijdig — die weekends zijn extra druk in de regio. Contacteer ons voor beschikbaarheid.' },
    ],
  },
  {
    slug: 'feestmateriaal-huren-zulte',
    naam: 'Zulte',
    zone: 1,
    distKm: 8,
    h1: 'Feestmateriaal huren in <em>Zulte</em>',
    badge: '',
    heroPar: 'Voor feestmateriaal huren in Zulte ben je bij EventRentals aan het juiste adres. Of je nu een communiefeest, verjaardag, buurtfeest of bedrijfsevent organiseert, wij beschikken over een ruim aanbod aan verhuurmateriaal voor elke gelegenheid.',
    heroLocations: 'Wij leveren in Zulte, Olsene, Machelen en omliggende gemeenten',
    metaDesc: 'Feestmateriaal huren in Zulte of Olsene? EventRentals levert snel vanuit De Pinte. Springkastelen, partytenten en tuinfeestmateriaal — plaatsing altijd inbegrepen.',
    areaServed: ['Zulte','Olsene','Machelen','Nazareth','Sint-Martens-Latem'],
    zoneIntro: 'Zulte grenst aan ons depot &mdash; u valt in <strong>zone 1</strong> (0–15 km). Gratis levering bij huurwaarde ≥ €100.',
    faq10Naam: 'tuinfeest in Zulte',
    faqTips: [
      'Zulte grenst aan Nazareth-De Pinte: kortste levertijd, laagste transportkost in de regio.',
      'Zulte heeft ruime tuinen in Olsene en Machelen — perfect voor een springkasteel én een partytent.',
      'Reserveer 2 weken op voorhand voor zomerse weekends; communieweekends in mei zijn extra druk.',
      'Combineer een hindernisbaan met een springkasteel voor grotere groepen kinderen.',
      'Gebruik LED-sfeerverlichting voor avondfeesten in de Zulte-polder — sfeervol en praktisch.',
      'Controleer of uw toegangsweg bereikbaar is voor ons bestelvoertuig &mdash; geef dit op bij uw aanvraag.',
      'Huur klaptafels en stoelen mee: zo is uw opstelling compleet zonder extra gedoe.',
      'Een rodeostier is populair op grotere tuinfeesten in Zulte: geliefd bij tieners én volwassenen.',
      'Plan levering op vrijdagavond voor een zaterdag-feest &mdash; meer opbouwtijd, minder stress.',
      'Vraag een combinatieofferte aan voor springkasteel + tent + meubilair: voordeliger dan apart huren.',
    ],
    faqGehuurde: [
      '<strong>Standaard springkasteel</strong> — meest geboekte item in Zulte en Olsene.',
      '<strong>Partytent 3×6m</strong> — populaire keuze voor Zulte-tuinen.',
      '<strong>Hindernisbaan</strong> — geliefd bij schoolfeesten in de regio.',
      '<strong>Klaptafels + klapstoel wit</strong> — standaard op elk feest in Zulte.',
      '<strong>Springkasteel met glijbaan</strong> — extra geliefd bij kinderen in de zomer.',
      '<strong>Rodeostier</strong> — voor gemengde feesten met tieners en volwassenen.',
      '<strong>LED sfeerverlichting</strong> — voor feesten na zonsondergang.',
      '<strong>Partytent 4×8m</strong> — voor grotere familiefeesten in Zulte.',
      '<strong>Terrasverwarmer</strong> — voor feesten in het voor- of najaar.',
      '<strong>Koelkast</strong> — handig op warme zomerdagen in de polder.',
    ],
    faq: [
      { q: 'Leveren jullie feestmateriaal in Zulte?', a: 'Ja, EventRentals levert springkastelen huren, partytenten en tafels en stoelen huren in Zulte, Olsene en Machelen. Wij leveren op uw gewenste datum en tijdstip.' },
      { q: 'Wat kost levering van feestmateriaal in Zulte?', a: 'Zulte valt in zone 1: €15 vaste transportkost + €0,55/km per rit. Gratis levering bij huurwaarde ≥ €100. Gebruik de calculator voor uw exacte adres.' },
      { q: 'Hoe snel kunnen jullie feestmateriaal leveren in Zulte?', a: 'Zulte grenst aan ons depot — wij zijn er snel. Bij beschikbaarheid is spoedboeking dezelfde dag mogelijk. Bel 0477 39 63 50 voor de actuele planning.' },
      { q: 'Leveren jullie ook in Olsene en Machelen?', a: 'Ja, wij leveren in de drie deelgemeenten van Zulte: Zulte-centrum, Olsene en Machelen. Allemaal in zone 1.' },
      { q: 'Zijn leveringen mogelijk op het platteland rond Zulte?', a: 'Ja, wij leveren op het platteland in de Zulte-regio. Vermeld bij uw aanvraag eventuele smalle toegangswegen zodat wij de route op voorhand kunnen plannen.' },
      { q: 'Welke evenementen zijn populair in Zulte?', a: 'Zulte is een landelijke gemeente met veel tuinfeesten, communiefeesten en buurtactiviteiten. Olsene en Machelen kennen een actief verenigingsleven met regelmatige evenementen.' },
      { q: 'Welk feestmateriaal wordt het vaakst gehuurd in Zulte?', a: 'Springkastelen zijn de bestseller voor kinderfeesten in Zulte en Olsene. Partytenten zijn populair voor communies en familiefeesten. Klapstoel- en tafelsets zijn standaard op elke tuinreceptie.' },
      { q: 'Leveren jullie voor buurtfeesten en verenigingsevenementen in Zulte?', a: 'Ja, wij leveren voor buurtfeesten, kermissen en verenigingsevenementen in Zulte, Olsene en Machelen. Contacteer ons voor een offerte op maat.' },
    ],
  },
];

function zoneCard(zone) {
  const data = {
    1: { label:'Zone 1', kleur:'color:#3B6D11;background:#EAF3DE', km:'0–15 km', prijs:'€15', gratis:true },
    2: { label:'Zone 2', kleur:'color:#854F0B;background:#FAEEDA', km:'15–30 km', prijs:'€25', gratis:true },
    3: { label:'Zone 3', kleur:'color:#993C1D;background:#FAECE7', km:'30–50 km', prijs:'€35', gratis:false },
  }[zone];
  return `<div style="background:#fff;border:1px solid #e5e7eb;border-radius:10px;padding:16px 20px;margin-bottom:24px;display:flex;align-items:center;gap:16px;flex-wrap:wrap;">
      <div style="font-size:12px;font-weight:700;text-transform:uppercase;${data.kleur};padding:4px 12px;border-radius:4px;flex-shrink:0;">${data.label} · ${data.km}</div>
      <div style="flex:1;min-width:160px;">
        <div style="font-size:15px;font-weight:700;color:#1a1a1a;">${data.prijs} vaste transportkost + €0,55/km</div>
        ${data.gratis ? `<div style="font-size:12px;color:#2B7A6E;font-weight:600;margin-top:2px;">Gratis bij huurwaarde ≥ €100</div>` : ''}
      </div>
      <div style="font-size:13px;color:#6b7280;">Gebruik de calculator voor uw exacte adres.</div>
    </div>`;
}

function faqSection(loc) {
  return loc.faq.map(item => `
      <div class="faq-item">
        <button class="faq-q" aria-expanded="false" onclick="toggleFaq(this)">
          ${item.q}
          <span class="faq-arrow">▼</span>
        </button>
        <div class="faq-a">${item.a}</div>
      </div>`).join('');
}

function popularSection(loc) {
  const items = loc.faqGehuurde.slice(0, 5).map(item =>
    item.replace(/<[^>]+>/g, '').replace(/\s[—–].*$/, '').trim()
  );
  return `<div style="margin-top:28px;padding:20px 24px;background:#f4fbfa;border-radius:12px;border:1px solid #c5e0db;">
      <div style="font-size:12px;font-weight:700;text-transform:uppercase;color:#2B7A6E;letter-spacing:0.06em;margin-bottom:12px;">Meest gehuurd in ${loc.naam}</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        ${items.map(name => `<span style="background:#fff;border:1px solid #c5e0db;border-radius:20px;padding:6px 14px;font-size:0.875rem;font-weight:600;color:#1E5950;">${name}</span>`).join('')}
      </div>
    </div>`;
}

function transportEstimate(loc) {
  const base = { 1: 15, 2: 25, 3: 35 }[loc.zone];
  const kmCost = Math.round(loc.distKm * 0.55);
  const perRit = base + kmCost;
  const beide = perRit * 2;
  const gratisNote = loc.zone === 1 ? `<div style="font-size:11px;color:#2B7A6E;font-weight:600;margin-top:4px;">Gratis bij huurwaarde ≥ €100</div>` : '';
  return `<div style="background:#f4fbfa;border:1px solid #c5e0db;border-radius:10px;padding:18px 20px;margin-bottom:16px;">
      <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:#2B7A6E;letter-spacing:0.08em;margin-bottom:12px;">Schatting voor ${loc.naam} centrum (~${loc.distKm} km)</div>
      <div style="display:flex;gap:20px;flex-wrap:wrap;align-items:flex-start;">
        <div>
          <div style="font-size:11px;color:#6b7280;margin-bottom:2px;">Levering (1 rit)</div>
          <div style="font-size:22px;font-weight:700;color:#1a1a1a;">~€${perRit}</div>
          ${gratisNote}
        </div>
        <div style="width:1px;background:#e5e7eb;align-self:stretch;flex-shrink:0;"></div>
        <div>
          <div style="font-size:11px;color:#6b7280;margin-bottom:2px;">Levering + ophaling</div>
          <div style="font-size:22px;font-weight:700;color:#1a1a1a;">~€${beide}</div>
        </div>
      </div>
    </div>
    <p style="font-size:12px;color:#9ca3af;text-align:center;margin-bottom:8px;">Exacte prijs via de calculator hierboven &nbsp;·&nbsp; Alle prijzen incl. BTW</p>`;
}

const BG_IMAGES = ['hero-feest.jpeg', 'achtergond1.png', 'Achtergrond2.png'];

function generatePage(loc, idx) {
  const heroBg = BG_IMAGES[idx % BG_IMAGES.length];
  const canon = `https://www.eventrentals.be/${loc.slug}`;
  const title = `Feestmateriaal huren in ${loc.naam} | EventRentals`;

  return `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/png" href="favicon.png?v=6" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="${loc.metaDesc}" />
  <link rel="canonical" href="${canon}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="EventRentals" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${loc.metaDesc}" />
  <meta property="og:url" content="${canon}" />
  <meta property="og:image" content="https://www.eventrentals.be/${heroBg}" />
  <meta property="og:locale" content="nl_BE" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${loc.metaDesc}" />
  <meta name="twitter:image" content="https://www.eventrentals.be/${heroBg}" />
  <meta name="robots" content="index, follow" />
  <script type="application/ld+json">{
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "name": "EventRentals",
        "description": "Verhuur van springkastelen en feestmateriaal in ${loc.naam} en regio",
        "url": "https://www.eventrentals.be",
        "telephone": "+32477396350",
        "address": { "@type": "PostalAddress", "streetAddress": "Begoniapark 14", "addressLocality": "Nazareth-De Pinte", "postalCode": "9810", "addressCountry": "BE" },
        "geo": { "@type": "GeoCoordinates", "latitude": 50.972, "longitude": 3.618 },
        "areaServed": ${JSON.stringify(loc.areaServed)},
        "priceRange": "€€"
      },
      {
        "@type": "FAQPage",
        "mainEntity": ${JSON.stringify(loc.faq.map(f => ({ "@type": "Question", "name": f.q.replace(/<[^>]+>/g,''), "acceptedAnswer": { "@type": "Answer", "text": f.a.replace(/<[^>]+>/g,'') } })))}
      }
    ]
  }<\/script>
  <title>${title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=Nunito:wght@400;500;600;700&family=Caveat:wght@600&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root { --accent:#ffffff; --accent-dark:#eeeeee; --accent-light:#e8f5f3; --dark:#2B7A6E; --darker:#1E5950; --white:#ffffff; --text:#1a1a1a; --text-muted:#6b7280; --border:#e5e7eb; --bg:#f4fbfa; --radius:10px; --shadow:0 2px 12px rgba(0,0,0,0.10); --shadow-hover:0 6px 24px rgba(0,0,0,0.16); }
    html { scroll-behavior: smooth; }
    body { font-family: 'Nunito', sans-serif; color: var(--text); background: var(--bg); line-height: 1.6; }
    h1, h2, h3, h4, .logo { font-family: 'Barlow Condensed', sans-serif; letter-spacing: 0.02em; }
    #navbar { z-index: 1000; background: #ffffff; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
    .nav-inner { max-width: 1200px; margin: 0 auto; padding: 0 24px; display: flex; align-items: center; justify-content: space-between; height: 64px; gap: 16px; }
    .nav-links { display: flex; list-style: none; gap: 4px; }
    .nav-links a { color: var(--darker); text-decoration: none; font-family: 'Nunito', sans-serif; font-weight: 600; font-size: 0.95rem; padding: 8px 14px; border-radius: var(--radius); transition: color 0.2s, background 0.2s; }
    .nav-links a:hover { color: var(--darker); background: var(--accent-light); }
    .nav-right { display: flex; align-items: center; gap: 12px; }
    .nav-phone { color: var(--dark); font-weight: 700; font-size: 0.95rem; text-decoration: none; white-space: nowrap; }
    .cart-icon-link { position: relative; color: var(--dark); text-decoration: none; display: flex; align-items: center; padding: 4px; }
    .cart-badge { position: absolute; top: -6px; right: -8px; background: var(--accent); color: var(--dark); font-size: 0.7rem; font-weight: 700; border-radius: 50%; width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; }
    .hamburger { display: none; background: none; border: none; cursor: pointer; padding: 8px; flex-direction: column; gap: 5px; }
    .hamburger span { display: block; width: 24px; height: 2px; background: var(--dark); border-radius: 2px; transition: all 0.3s; }
    .mobile-menu { display: none; background: var(--darker); border-top: 1px solid rgba(255,255,255,0.1); padding: 12px 24px 16px; }
    .mobile-menu.open { display: block; }
    .mobile-menu a { display: block; color: rgba(255,255,255,0.85); text-decoration: none; font-weight: 600; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); }
    #hero { position: relative; overflow: hidden; background: url('${heroBg}') center center / cover no-repeat; min-height: 560px; display: flex; align-items: center; padding: 80px 24px; }
    #hero::before { content: ''; position: absolute; inset: 0; background: linear-gradient(to right, rgba(20,55,50,0.82) 0%, rgba(20,55,50,0.55) 60%, rgba(20,55,50,0.15) 100%); }
    .hero-inner { position: relative; z-index: 1; max-width: 1200px; margin: 0 auto; width: 100%; }
    .hero-text { max-width: 580px; }
    .hero-badge { display: inline-block; background: rgba(255,255,255,0.15); color: #fff; border: 1px solid rgba(255,255,255,0.35); font-weight: 700; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.1em; padding: 5px 14px; border-radius: 20px; margin-bottom: 20px; }
    #hero h1 { font-size: clamp(2.2rem, 5.5vw, 3.6rem); font-weight: 800; line-height: 1.1; margin-bottom: 18px; color: #fff; }
    #hero h1 em { font-style: normal; color: #ffffff; }
    .hero-locations { font-size: 0.88rem; color: rgba(255,255,255,0.75); margin-bottom: 28px; margin-top: -12px; }
    .hero-locations-link { color: #fff; font-weight: 700; text-decoration: underline; }
    #hero p { font-size: 1.1rem; color: rgba(255,255,255,0.88); margin-bottom: 32px; max-width: 500px; }
    .hero-ctas { display: flex; gap: 14px; flex-wrap: wrap; }
    @media (max-width: 640px) { #hero { min-height: 480px; padding: 64px 20px; } #hero::before { background: rgba(20,55,50,0.75); } }
    .btn-primary { background: var(--dark); color: #fff; border: none; padding: 14px 30px; font-family: 'Nunito', sans-serif; font-size: 1rem; font-weight: 800; border-radius: var(--radius); cursor: pointer; text-decoration: none; display: inline-block; transition: background 0.2s, transform 0.15s, box-shadow 0.2s; box-shadow: 0 4px 14px rgba(0,0,0,0.25); }
    .btn-primary:hover { background: var(--darker); transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.35); }
    .btn-outline { background: transparent; color: #fff; border: 2px solid rgba(255,255,255,0.7); padding: 13px 30px; font-family: 'Nunito', sans-serif; font-size: 1rem; font-weight: 700; border-radius: var(--radius); cursor: pointer; text-decoration: none; display: inline-block; transition: border-color 0.2s, background 0.2s, transform 0.15s; }
    .btn-outline:hover { border-color: #fff; background: rgba(255,255,255,0.12); transform: translateY(-2px); }
    section { padding: 72px 24px; }
    .section-inner { max-width: 1200px; margin: 0 auto; }
    .section-header { text-align: center; margin-bottom: 48px; }
    .section-header h2 { font-size: clamp(1.8rem, 4vw, 2.8rem); font-weight: 800; color: var(--dark); margin-bottom: 10px; }
    .section-header p { color: var(--text-muted); font-size: 1.05rem; max-width: 520px; margin: 0 auto; }
    .section-divider { width: 56px; height: 4px; background: var(--dark); border-radius: 2px; margin: 14px auto 0; }
    #catalogus { background: var(--white); }
    .cat-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 28px; }
    @media (max-width: 700px) { .cat-grid { grid-template-columns: 1fr; } }
    .cat-card { background: var(--white); border: 2px solid var(--border); border-radius: 16px; overflow: hidden; box-shadow: var(--shadow); transition: box-shadow 0.25s, transform 0.2s, border-color 0.2s; display: flex; flex-direction: column; text-decoration: none; color: inherit; }
    .cat-card:hover { box-shadow: var(--shadow-hover); transform: translateY(-4px); border-color: var(--dark); }
    .cat-card-img { height: 220px; background: var(--accent-light); display: flex; align-items: center; justify-content: center; }
    .cat-card-body { padding: 24px; flex: 1; }
    .cat-card-title { font-family: 'Barlow Condensed', sans-serif; font-size: 1.7rem; font-weight: 800; color: var(--dark); margin-bottom: 8px; }
    .cat-card-desc { font-size: 0.95rem; color: var(--text-muted); margin-bottom: 16px; line-height: 1.6; }
    .cat-card-count { font-size: 0.85rem; font-weight: 700; color: #fff; background: var(--dark); display: inline-block; padding: 8px 16px; border-radius: 8px; text-decoration: none; transition: background 0.2s; }
    .cat-card-count:hover { background: var(--darker); }
    /* FAQ */
    #faq { background: var(--white); border-top: 1px solid var(--border); }
    .faq-wrap { max-width: 760px; margin: 0 auto; }
    .faq-item { border-bottom: 1px solid var(--border); }
    .faq-q { width: 100%; background: none; border: none; padding: 16px 0; text-align: left; font-family: 'Barlow Condensed', sans-serif; font-size: 1.1rem; font-weight: 700; color: var(--text); cursor: pointer; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
    .faq-arrow { flex-shrink: 0; font-size: 0.7rem; color: var(--dark); transition: transform 0.2s; }
    .faq-q[aria-expanded="true"] .faq-arrow { transform: rotate(180deg); }
    .faq-q[aria-expanded="true"] { color: var(--dark); }
    .faq-a { display: none; padding: 0 0 16px; font-size: 0.95rem; color: var(--text-muted); line-height: 1.85; }
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
    .blog-card-body { padding: 20px; display: flex; flex-direction: column; flex: 1; gap: 8px; }
    .blog-card-title { font-family: 'Barlow Condensed', sans-serif; font-size: 1.25rem; font-weight: 800; color: var(--text); line-height: 1.2; }
    .blog-card-desc { font-size: 0.9rem; color: var(--text-muted); line-height: 1.5; flex: 1; }
    .blog-card-cta { font-size: 0.85rem; font-weight: 700; color: var(--dark); }
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
    @media (max-width: 720px) { .nav-links { display: none; } .nav-right .nav-phone { display: none; } .hamburger { display: flex; } .nav-inner { justify-content: flex-start; } .nav-right { margin-left: auto; } }
    @media (max-width: 900px) { .blog-grid { grid-template-columns: repeat(2,1fr); } .footer-grid { grid-template-columns: 1fr 1fr 1fr; } }
    @media (max-width: 640px) { .footer-grid { grid-template-columns: 1fr 1fr; gap: 20px; } .footer-bottom { flex-direction: column; align-items: flex-start; } }
    @media (max-width: 600px) { .blog-grid { grid-template-columns: 1fr; } }
    @media (max-width: 420px) { .footer-grid { grid-template-columns: 1fr; } }
    @keyframes bannerScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  </style>
</head>
<body>

<div id="sticky-header" style="position:sticky;top:0;z-index:1100;">
<div style="background:var(--dark,#2B7A6E);color:#fff;padding:9px 0;font-size:0.88rem;font-weight:600;font-family:'Nunito',sans-serif;overflow:hidden;white-space:nowrap;">
  <span style="display:inline-block;animation:bannerScroll 32s linear infinite;">
    Gratis levering vanaf &euro;100 huurwaarde voor zone 1 &amp; 2 &mdash; <a href="#transport" style="color:#fff;text-decoration:underline;">bekijk de transporttarieven</a>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#10022;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    Gratis levering vanaf &euro;100 huurwaarde voor zone 1 &amp; 2 &mdash; <a href="#transport" style="color:#fff;text-decoration:underline;">bekijk de transporttarieven</a>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#10022;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    Gratis levering vanaf &euro;100 huurwaarde voor zone 1 &amp; 2 &mdash; <a href="#transport" style="color:#fff;text-decoration:underline;">bekijk de transporttarieven</a>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#10022;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span>
</div>
<nav id="navbar">
  <div class="nav-inner">
    <a href="index.html" style="display:flex;align-items:center;"><img src="Eventrentals Logo.png" alt="EventRentals" style="height:44px;"></a>
    <ul class="nav-links">
      <li><a href="index.html">Home</a></li>
      <li><a href="#catalogus">Ons verhuurassortiment</a></li>
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
    <button class="hamburger" id="hamburgerBtn" aria-label="Menu openen"><span></span><span></span><span></span></button>
  </div>
  <div class="mobile-menu" id="mobileMenu">
    <a href="index.html">Home</a>
    <a href="#catalogus">Ons verhuurassortiment</a>
    <a href="#transport">Transport</a>
    <a href="#contact">Contact</a>
    <a href="bestelling.html">Bestelling plaatsen</a>
  </div>
</nav>
</div>

<section id="hero">
  <div class="hero-inner">
    <div class="hero-text">
      ${loc.badge ? `<span class="hero-badge">${loc.badge}</span>` : ''}
      <h1>${loc.h1}</h1>
      <p>${loc.heroPar}</p>
      <p class="hero-locations">${loc.heroLocations} &mdash; <a href="#contact" class="hero-locations-link">ontdek meer</a></p>
      <div class="hero-ctas">
        <a href="speelgelegenheden.html" class="btn-primary">Bekijk assortiment</a>
        <a href="#offerte" class="btn-outline">Offerte aanvragen</a>
      </div>
    </div>
  </div>
</section>

<section id="catalogus">
  <div class="section-inner">
    <div class="section-header">
      <h2>Ons verhuurassortiment</h2>
      <p>Kies uit springkastelen &amp; speelgelegenheden of tuinfeestmateriaal &mdash; voor elk feest iets.</p>
      <div class="section-divider"></div>
    </div>
    <div class="cat-grid">
      <div class="cat-card">
        <a href="speelgelegenheden.html"><div class="cat-card-img" style="padding:0;overflow:hidden;"><img src="Bouncycastke.png" alt="Springkastelen en speelgelegenheden" loading="lazy" style="width:100%;height:100%;object-fit:cover;display:block;"></div></a>
        <div class="cat-card-body">
          <div class="cat-card-title">Speelgelegenheden</div>
          <div class="cat-card-desc">Springkastelen, hindernisbanen, rodeostier, bungee run, botsballen en meer voor onvergetelijk plezier.</div>
          <a href="speelgelegenheden.html" class="cat-card-count">Bekijk producten &rsaquo;</a>
        </div>
      </div>
      <div class="cat-card">
        <a href="tuinfeest-materiaal.html"><div class="cat-card-img" style="padding:0;overflow:hidden;"><img src="tuinfeest-card.jpeg" alt="Tuinfeest materiaal verhuur" loading="lazy" style="width:100%;height:100%;object-fit:cover;display:block;"></div></a>
        <div class="cat-card-body">
          <div class="cat-card-title">Tuinfeest Materiaal</div>
          <div class="cat-card-desc">Partytenten, stoelen, tafels, terrasverwarmer, koelkast, LED-verlichting en alles voor de perfecte tuinfeest opstelling.</div>
          <a href="tuinfeest-materiaal.html" class="cat-card-count">Bekijk producten &rsaquo;</a>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="offerte" style="background:#f4fbfa;padding:48px 24px;border-top:1px solid var(--border);border-bottom:1px solid var(--border);">
  <div style="max-width:700px;margin:0 auto;background:#fff;border:1px solid var(--border);border-radius:16px;padding:40px;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
    <h2 style="font-family:'Barlow Condensed',sans-serif;font-size:2rem;font-weight:800;color:var(--text);margin:0 0 6px;">Offerte aanvragen</h2>
    <p style="color:var(--text-muted);margin:0 0 28px;font-size:0.95rem;">Vul het formulier in — we contacteren je binnen de dag.</p>
    <form id="offerteForm" style="display:flex;flex-direction:column;gap:16px;">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
        <div style="display:flex;flex-direction:column;gap:6px;"><label style="font-size:0.85rem;font-weight:600;color:var(--text);">Naam *</label><input type="text" id="of-naam" required placeholder="Jan Janssen" style="padding:11px 14px;border:1px solid var(--border);border-radius:8px;font-size:0.95rem;outline:none;font-family:'Nunito',sans-serif;" /></div>
        <div style="display:flex;flex-direction:column;gap:6px;"><label style="font-size:0.85rem;font-weight:600;color:var(--text);">Telefoon *</label><input type="tel" id="of-gsm" required placeholder="0477 00 00 00" style="padding:11px 14px;border:1px solid var(--border);border-radius:8px;font-size:0.95rem;outline:none;font-family:'Nunito',sans-serif;" /></div>
      </div>
      <div style="display:flex;flex-direction:column;gap:6px;"><label style="font-size:0.85rem;font-weight:600;color:var(--text);">Wat wil je huren?</label><input type="text" id="of-producten" placeholder="bv. springkasteel, partytent, statafels…" style="padding:11px 14px;border:1px solid var(--border);border-radius:8px;font-size:0.95rem;outline:none;font-family:'Nunito',sans-serif;" /></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
        <div style="display:flex;flex-direction:column;gap:6px;"><label style="font-size:0.85rem;font-weight:600;color:var(--text);">Datum</label><input type="date" id="of-datum" style="padding:11px 14px;border:1px solid var(--border);border-radius:8px;font-size:0.95rem;outline:none;font-family:'Nunito',sans-serif;" /></div>
        <div style="display:flex;flex-direction:column;gap:6px;"><label style="font-size:0.85rem;font-weight:600;color:var(--text);">Gemeente</label><input type="text" id="of-gemeente" value="${loc.naam}" style="padding:11px 14px;border:1px solid var(--border);border-radius:8px;font-size:0.95rem;outline:none;font-family:'Nunito',sans-serif;" /></div>
      </div>
      <div id="of-bev" style="display:none;color:#2B7A6E;font-weight:700;text-align:center;padding:12px;">✓ Aanvraag verzonden — we contacteren je binnen de dag!</div>
      <button id="of-btn" type="button" onclick="submitOfferte()" style="background:#2B7A6E;color:#fff;font-family:'Nunito',sans-serif;font-weight:700;font-size:1rem;padding:14px;border:none;border-radius:8px;cursor:pointer;margin-top:4px;">Verstuur aanvraag</button>
    </form>
  </div>
</section>

<section id="transport" style="background:var(--bg);padding:60px 20px;">
  <div style="max-width:700px;margin:0 auto;">
    <h2 style="font-size:28px;font-weight:700;color:var(--dark,#2B7A6E);margin-bottom:8px;">Bereken jouw transportkost</h2>
    <p style="color:#6b7280;margin-bottom:16px;font-size:15px;">Transport vanuit <strong style="color:var(--dark,#2B7A6E);">Nazareth-De Pinte</strong> naar jouw locatie in ${loc.naam}.</p>
    ${zoneCard(loc.zone)}
    <p style="color:#6b7280;margin-bottom:20px;font-size:14px;">${loc.zoneIntro}</p>
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
        <p style="font-size:12px;color:#9ca3af;margin-top:16px;line-height:1.5;">Gratis levering (zone 1) bij huurwaarde &ge; &euro;100. &nbsp;·&nbsp; Dringende levering (zelfde dag of na 17u) = dubbele rit.</p>
      </div>
      <div id="br-buiten" style="display:none;margin-top:20px;border-top:1px solid #e5e7eb;padding-top:20px;">
        <div style="font-size:12px;font-weight:700;text-transform:uppercase;color:#A32D2D;background:#FCEBEB;display:inline-block;padding:3px 10px;border-radius:4px;margin-bottom:12px;">Buiten zone (&gt; 50 km)</div>
        <p style="font-size:14px;color:#6b7280;margin-bottom:14px;">Jouw locatie valt buiten onze standaardzones. Transport is mogelijk in overleg.</p>
        <a href="tel:0477396350" style="display:inline-block;background:#2B7A6E;color:white;border-radius:8px;padding:10px 20px;font-size:14px;font-weight:600;text-decoration:none;">Bel ons: 0477 39 63 50</a>
      </div>
    </div>
    <p style="font-size:12px;color:#9ca3af;text-align:center;">Alle prijzen incl. BTW &nbsp;·&nbsp; Rit = levering óf ophaling</p>
  </div>
</section>

<section id="faq" style="padding:72px 24px;">
  <div class="section-inner">
    <div class="section-header">
      <h2>Veelgestelde vragen &mdash; ${loc.naam}</h2>
      <div class="section-divider"></div>
    </div>
    <div class="faq-wrap">
      ${faqSection(loc)}
    </div>
  </div>
</section>

<section class="blog-section" id="blog">
  <div class="blog-inner">
    <div class="blog-header"><h2>Tips &amp; inspiratie</h2><p>Alles wat je nodig hebt voor een geslaagd feest.</p></div>
    <div class="blog-grid">
      <a href="/tuinfeest-organiseren-checklist" class="blog-card">
        <div class="blog-card-img"><img src="https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress,format&cs=tinysrgb&w=600&h=340&fit=crop" alt="Tuinfeest organiseren checklist" width="600" height="340" loading="lazy" /><span class="blog-card-tag">Feestplanning</span></div>
        <div class="blog-card-body"><h3 class="blog-card-title">Tuinfeest organiseren checklist: materiaal, aantallen &amp; wanneer boeken</h3><p class="blog-card-desc">Hoeveel tafels, welke tent en wanneer reserveer je wat? Concrete aantallen voor elk aantal gasten.</p><span class="blog-card-cta">Lees de gids &rsaquo;</span></div>
      </a>
      <a href="/springkasteel-huren-prijs" class="blog-card">
        <div class="blog-card-img"><img src="https://images.pexels.com/photos/3662667/pexels-photo-3662667.jpeg?auto=compress,format&cs=tinysrgb&w=600&h=340&fit=crop" alt="Springkasteel huren prijs" width="600" height="340" loading="lazy" /><span class="blog-card-tag">Prijzen &amp; info</span></div>
        <div class="blog-card-body"><h3 class="blog-card-title">Hoeveel kost een springkasteel huren? Eerlijke prijzen uitgelegd</h3><p class="blog-card-desc">Transparante prijzen per type, wat zit inbegrepen &amp; waarom een lokale verhuurder goedkoper is.</p><span class="blog-card-cta">Lees de gids &rsaquo;</span></div>
      </a>
      <a href="/partytent-huren-welke-maat" class="blog-card">
        <div class="blog-card-img"><img src="https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress,format&cs=tinysrgb&w=600&h=340&fit=crop" alt="Partytent huren welke maat" width="600" height="340" loading="lazy" /><span class="blog-card-tag">Feestmateriaal</span></div>
        <div class="blog-card-body"><h3 class="blog-card-title">Partytent huren: welke maat heb ik nodig?</h3><p class="blog-card-desc">Waarom mensen altijd te klein kiezen en hoe je de juiste maat kiest voor jouw tuin en aantal gasten.</p><span class="blog-card-cta">Lees de gids &rsaquo;</span></div>
      </a>
    </div>
  </div>
</section>

<footer class="site-footer" id="contact">
  <div class="footer-grid">
    <div class="footer-col">
      <span class="footer-logo-text">Event<span>Rentals</span></span>
      <div class="footer-contact-row"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.09-1.09a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg><a href="tel:0477396350">0477 39 63 50</a></div>
      <div class="footer-contact-row"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg><a href="mailto:info@eventrentals.be">info@eventrentals.be</a></div>
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
        <li><a href="bungee-run.html">Bungee Run</a></li>
        <li><a href="speelgelegenheden.html" style="color:var(--accent,#fff);font-weight:700;">→ Volledig aanbod</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <p class="footer-col-title">Tuinfeest Materiaal</p>
      <ul class="footer-links">
        <li><a href="partytent.html">Partytent</a></li>
        <li><a href="stretchtent.html">Stretchtent</a></li>
        <li><a href="kadertent.html">Aluminium Tent</a></li>
        <li><a href="klapstoel-wit.html">Klapstoel Wit</a></li>
        <li><a href="klaptafel-180cm.html">Klaptafel 180cm</a></li>
        <li><a href="terrasverwarmer.html">Terrasverwarmer</a></li>
        <li><a href="led-sfeerverlichting.html">LED Sfeerverlichting</a></li>
        <li><a href="tuinfeest-materiaal.html" style="color:var(--accent,#fff);font-weight:700;">→ Volledig aanbod</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <p class="footer-col-title">Informatie</p>
      <ul class="footer-links">
        <li><a href="over-ons.html">Over ons</a></li>
        <li><a href="verhuurgebied.html">Verhuurgebied</a></li>
        <li><a href="faq.html">Veelgestelde vragen</a></li>
        <li><a href="verhuurvoorwaarden.html">Verhuurvoorwaarden</a></li>
        <li><a href="feestmateriaal-communiefeest.html">Communiefeest</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <p class="footer-col-title">Leveringsgebied</p>
      <ul class="footer-links">
        <li><a href="feestmateriaal-huren-de-pinte">De Pinte</a></li>
        <li><a href="feestmateriaal-huren-nazareth">Nazareth</a></li>
        <li><a href="feestmateriaal-huren-sint-martens-latem">Sint-Martens-Latem</a></li>
        <li><a href="feestmateriaal-huren-gavere">Gavere</a></li>
        <li><a href="feestmateriaal-huren-zulte">Zulte</a></li>
        <li><a href="feestmateriaal-huren-deinze">Deinze</a></li>
        <li><a href="feestmateriaal-huren-merelbeke">Merelbeke</a></li>
        <li><a href="feestmateriaal-huren-gent">Gent</a></li>
        <li><a href="feestmateriaal-huren-oudenaarde">Oudenaarde</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <span>&copy; 2026 EventRentals &mdash; Alle rechten voorbehouden</span>
    <nav class="footer-bottom-links"><a href="index.html">Home</a><a href="#catalogus">Assortiment</a><a href="bestelling.html">Bestellen</a><a href="#contact">Contact</a></nav>
  </div>
</footer>

<script>
document.getElementById('hamburgerBtn').addEventListener('click', function() { document.getElementById('mobileMenu').classList.toggle('open'); });
document.querySelectorAll('#mobileMenu a').forEach(function(l) { l.addEventListener('click', function() { document.getElementById('mobileMenu').classList.remove('open'); }); });
(function() {
  var cart = JSON.parse(localStorage.getItem('er_cart') || '[]');
  var total = cart.reduce(function(s,i){ return s+(i.qty||0); }, 0);
  var badge = document.getElementById('cartBadge');
  if (badge) { badge.textContent = total; badge.style.display = total > 0 ? 'flex' : 'none'; }
  window.addEventListener('storage', function() {
    var c = JSON.parse(localStorage.getItem('er_cart') || '[]');
    var t = c.reduce(function(s,i){ return s+(i.qty||0); }, 0);
    badge.textContent = t; badge.style.display = t > 0 ? 'flex' : 'none';
  });
})();
function submitOfferte() {
  var naam = document.getElementById('of-naam').value.trim();
  var gsm = document.getElementById('of-gsm').value.trim();
  if (!naam || !gsm) { alert('Vul naam en telefoon in.'); return; }
  var btn = document.getElementById('of-btn');
  btn.disabled = true; btn.textContent = 'Even geduld…';
  fetch('/api/bestelling', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ voornaam:naam, familienaam:'', gsm:gsm, email:'', datumVan:document.getElementById('of-datum').value, datumTot:'', straat:'', huisnr:'', postcode:'', gemeente:document.getElementById('of-gemeente').value.trim(), producten:document.getElementById('of-producten').value.trim(), opmerkingen:'Via locatiepagina ${loc.naam}' }) })
    .then(function(r){ return r.json(); }).then(function() { document.getElementById('of-bev').style.display='block'; btn.style.display='none'; })
    .catch(function() { btn.disabled=false; btn.textContent='Verstuur aanvraag'; alert('Er ging iets mis. Probeer opnieuw.'); });
}
function toggleFaq(btn) {
  var a = btn.nextElementSibling;
  var open = a.classList.contains('open');
  document.querySelectorAll('.faq-a.open').forEach(function(el) { el.classList.remove('open'); el.previousElementSibling.setAttribute('aria-expanded','false'); });
  if (!open) { a.classList.add('open'); btn.setAttribute('aria-expanded','true'); }
}
var brRit='levering', brAcIndex=-1, brSuggestions=[], brAutocompleteTimeout=null, brLat=null, brLon=null;
function brSetRit(r) { brRit=r; ['lever','ophal','beide'].forEach(function(k){ var btn=document.getElementById('br-btn-'+k); var a=(k==='lever'&&r==='levering')||(k==='ophal'&&r==='ophaling')||(k==='beide'&&r==='beide'); btn.style.background=a?'#2B7A6E':'white'; btn.style.color=a?'white':'#6b7280'; }); }
function brAutocomplete(val) { clearTimeout(brAutocompleteTimeout); var ul=document.getElementById('br-suggestions'); if(!val||val.length<2){ul.style.display='none';brSuggestions=[];return;} brAutocompleteTimeout=setTimeout(function(){ fetch('/api/geocode?q='+encodeURIComponent(val+' België')).then(function(r){return r.json();}).then(function(data){ brSuggestions=data.slice(0,6);ul.innerHTML=''; if(!brSuggestions.length){ul.style.display='none';return;} brSuggestions.forEach(function(item,i){ var li=document.createElement('li'); li.style.cssText='padding:10px 14px;cursor:pointer;font-size:14px;color:#1a1a1a;border-bottom:1px solid #f3f4f6;'; li.textContent=item.display_name; li.addEventListener('mousedown',function(e){e.preventDefault();brSelectSuggestion(i);}); ul.appendChild(li); }); ul.style.display='block';brAcIndex=-1; }).catch(function(){ul.style.display='none';}); },300); }
function brSelectSuggestion(i){ var item=brSuggestions[i];if(!item)return; document.getElementById('br-adres').value=item.display_name; document.getElementById('br-suggestions').style.display='none'; brLat=parseFloat(item.lat);brLon=parseFloat(item.lon); brBerekenMetCoords(brLat,brLon); }
function brKeyNav(e){ var ul=document.getElementById('br-suggestions');var items=ul.querySelectorAll('li'); if(!items.length){if(e.key==='Enter')brBereken();return;} if(e.key==='ArrowDown'){brAcIndex=Math.min(brAcIndex+1,items.length-1);brHighlight(items);e.preventDefault();} else if(e.key==='ArrowUp'){brAcIndex=Math.max(brAcIndex-1,-1);brHighlight(items);e.preventDefault();} else if(e.key==='Enter'){if(brAcIndex>=0)brSelectSuggestion(brAcIndex);else{ul.style.display='none';brBereken();}e.preventDefault();} else if(e.key==='Escape'){ul.style.display='none';} }
function brHighlight(items){items.forEach(function(li,i){li.style.background=i===brAcIndex?'#e8f5f3':'';}); }
function brBereken(){ var adres=document.getElementById('br-adres').value.trim(); var errEl=document.getElementById('br-error'),distEl=document.getElementById('br-dist'); document.getElementById('br-result').style.display='none'; document.getElementById('br-buiten').style.display='none'; errEl.style.display='none';distEl.style.display='none'; if(!adres){errEl.textContent='Vul een adres of gemeente in.';errEl.style.display='block';return;} var btn=document.getElementById('br-calc-btn');btn.textContent='...';btn.disabled=true; fetch('/api/geocode?q='+encodeURIComponent(adres+' België')).then(function(r){return r.json();}).then(function(data){ btn.textContent='Bereken';btn.disabled=false; if(!data||!data.length){errEl.textContent='Adres niet gevonden.';errEl.style.display='block';return;} brBerekenMetCoords(parseFloat(data[0].lat),parseFloat(data[0].lon)); }).catch(function(){btn.textContent='Bereken';btn.disabled=false;errEl.textContent='Fout opgetreden.';errEl.style.display='block';}); }
function brBerekenMetCoords(lat,lon){ var dist=brHaversine(50.9720,3.6180,lat,lon); document.getElementById('br-dist').textContent='Afstand: ~'+Math.round(dist)+' km (hemelsbreed)'; document.getElementById('br-dist').style.display='block'; var ritMult=brRit==='beide'?2:1,zone,vaste; if(dist<=15){zone=1;vaste=15;}else if(dist<=30){zone=2;vaste=25;}else if(dist<=50){zone=3;vaste=35;}else{document.getElementById('br-buiten').style.display='block';return;} var kmKost=Math.round(dist*0.55*100)/100; var totaal=(vaste+kmKost)*ritMult; var zC={1:'color:#3B6D11;background:#EAF3DE',2:'color:#854F0B;background:#FAEEDA',3:'color:#993C1D;background:#FAECE7'}; var badge=document.getElementById('br-zone-badge'); badge.style.cssText=zC[zone]+';font-size:12px;font-weight:700;text-transform:uppercase;padding:3px 10px;border-radius:4px;margin-bottom:14px;display:inline-block;'; badge.textContent='Zone '+zone+' — '+Math.round(dist)+' km'; document.getElementById('br-r-transport').textContent='€'+(vaste*ritMult).toFixed(2).replace('.',','); document.getElementById('br-r-km-label').textContent='Km-heffing ('+Math.round(dist)+' km × €0,55 × '+ritMult+' rit'+(ritMult>1?'ten':'')+')'; document.getElementById('br-r-km').textContent='€'+(kmKost*ritMult).toFixed(2).replace('.',','); document.getElementById('br-r-totaal').textContent='€'+totaal.toFixed(2).replace('.',','); document.getElementById('br-result').style.display='block'; }
function brHaversine(lat1,lon1,lat2,lon2){ var R=6371,dLat=(lat2-lat1)*Math.PI/180,dLon=(lon2-lon1)*Math.PI/180; var a=Math.sin(dLat/2)*Math.sin(dLat/2)+Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)*Math.sin(dLon/2); return R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a)); }
</script>
</body>
</html>`;
}

let count = 0;
for (let i = 0; i < LOCATIONS.length; i++) {
  const loc = LOCATIONS[i];
  fs.writeFileSync(`${loc.slug}.html`, generatePage(loc, i), 'utf8');
  console.log(`✓ ${loc.slug}.html`);
  count++;
}
console.log(`\nKlaar: ${count} pagina's aangemaakt`);
