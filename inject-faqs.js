const fs = require('fs');
const path = require('path');

const DIR = __dirname;

const FAQ_CSS = `
    .product-faq-section { background: #fff; padding: 48px 24px 56px; border-top: 1px solid var(--border); }
    .product-faq-section .product-inner { max-width: 1100px; margin: 0 auto; }
    .faq-heading { font-size: clamp(1.4rem, 3vw, 1.9rem); font-weight: 800; color: var(--dark); margin-bottom: 28px; font-family: 'Barlow Condensed', sans-serif; }
    .faq-list { max-width: 720px; }
    .faq-item { border-bottom: 1px solid var(--border); padding: 18px 0; }
    .faq-item:last-child { border-bottom: none; }
    .faq-item h3 { font-size: 1rem; font-weight: 700; color: var(--text); margin-bottom: 8px; font-family: 'Nunito', sans-serif; letter-spacing: 0; }
    .faq-item p { color: var(--text-muted); font-size: 0.95rem; line-height: 1.65; margin: 0; }`;

const FAQS = {
  'springkasteel-standaard': [
    { q: 'Hoeveel vrije ruimte heb ik nodig?', a: 'Het kasteel zelf is 3,2 × 2,5 m, maar reken minimaal 4 × 4 m vrije ruimte: er moet ruimte zijn voor de blower aan de zijkant en een veiligheidsmarge rondom. Hoogte: minimum 3 m vrij (let op bij pergola\'s of laaghangende takken).' },
    { q: 'Welk stopcontact heb ik nodig?', a: 'Een gewoon huishoudelijk stopcontact van 220V / 16A volstaat. Een verlengsnoer van max. 25 m mag, maar gebruik nooit een rolhaspel — die kunnen oververhitten.' },
    { q: 'Kan een springkasteel op tegels staan?', a: 'Ja, maar op harde ondergrond gebruiken wij zandbalken in plaats van grondpennen voor de verankering. Vermeld dit bij uw boeking zodat wij het juiste materiaal meenemen.' },
    { q: 'Wat is inbegrepen in de prijs?', a: 'Levering, opbouw, elektrische blower, verankeringsmateriaal en ophaling na afloop. U hoeft zelf niets te voorzien of te sjouwen.' },
    { q: 'Wat als het regent op de dag van mijn feest?', a: 'Bij lichte regen kan een springkasteel gewoon gebruikt worden — het materiaal is waterafstotend. Bij onweer of harde wind moet het springkasteel omwille van veiligheid worden afgezet.' },
    { q: 'Mogen volwassenen ook springen?', a: 'Het kasteel is ontworpen voor kinderen van 2 tot 12 jaar (max. 200 kg totaal, max. 6 kinderen tegelijk). Volwassenen worden afgeraden — het materiaal en de afmetingen zijn hier niet op berekend.' },
  ],
  'springkasteel-medium-glijbaan': [
    { q: 'Hoeveel ruimte heb ik nodig voor dit kasteel?', a: 'Reken minimaal 5 × 4,5 m vrije ruimte: de glijbaan steekt uit aan de voorzijde en heeft extra aanloopruimte nodig. Hoogte: minimum 3 m vrij.' },
    { q: 'Welk stopcontact heb ik nodig?', a: 'Een standaard 220V / 16A stopcontact volstaat. Verlengsnoer tot 25 m is ok, geen rolhaspel gebruiken.' },
    { q: 'Is de glijbaan veilig voor jonge kinderen?', a: 'De glijbaan heeft een zachte landing en weerbestendige bekleding. Aanbevolen leeftijd is 3–12 jaar. Zorg altijd voor toezicht bij kinderen onder 6 jaar aan de glijbaan.' },
    { q: 'Wat is inbegrepen in de prijs?', a: 'Levering, opbouw, elektrische blower, verankeringsmateriaal en ophaling. U hoeft niets zelf te voorzien.' },
    { q: 'Hoeveel kinderen mogen tegelijk springen?', a: 'Maximum 8 kinderen tegelijk, maximaal gewicht 200 kg totaal.' },
  ],
  'springkasteel-groot-jungle': [
    { q: 'Hoeveel ruimte heb ik nodig?', a: 'Reken minimaal 5 × 4 m vrije ruimte, hoogte minimum 3,5 m. Dit is ons grootste springkasteel — controleer uw toegangsweg voor levering (breedte bestelwagen ± 2 m).' },
    { q: 'Welk stopcontact heb ik nodig?', a: 'Een standaard 220V / 16A stopcontact volstaat. Verlengsnoer tot 25 m is toegestaan, geen rolhaspel.' },
    { q: 'Voor welke leeftijd is dit kasteel geschikt?', a: 'Aanbevolen leeftijd 3–14 jaar. Maximum 10 kinderen tegelijk, maximaal gewicht 250 kg.' },
    { q: 'Wat is inbegrepen in de prijs?', a: 'Levering, opbouw, elektrische blower, verankeringsmateriaal en ophaling. Alles inbegrepen.' },
    { q: 'Kan het kasteel op tegels staan?', a: 'Ja, op harde ondergrond gebruiken wij zandbalken in plaats van grondpennen. Vermeld dit bij uw boeking.' },
  ],
  'springkasteel-princess': [
    { q: 'Hoeveel ruimte heb ik nodig?', a: 'Reken minimaal 5 × 4 m vrije ruimte, hoogte minimum 3,5 m. Controleer uw toegangsweg — de bestelwagen is ca. 2 m breed.' },
    { q: 'Voor welke leeftijd is dit kasteel geschikt?', a: 'Aanbevolen leeftijd 3–14 jaar. Maximum 10 kinderen tegelijk, maximaal gewicht 250 kg.' },
    { q: 'Welk stopcontact heb ik nodig?', a: 'Een standaard 220V / 16A stopcontact volstaat. Verlengsnoer tot 25 m is ok, geen rolhaspel.' },
    { q: 'Wat is inbegrepen in de prijs?', a: 'Levering, opbouw, elektrische blower, verankeringsmateriaal en ophaling. Alles inbegrepen.' },
    { q: 'Kan het kasteel op tegels staan?', a: 'Ja, op harde ondergrond gebruiken wij zandbalken. Vermeld dit bij uw boeking zodat wij het juiste materiaal meenemen.' },
  ],
  'springkasteel-piraat': [
    { q: 'Voor welke leeftijd is dit kasteel geschikt?', a: 'Aanbevolen leeftijd 5–14 jaar. Maximum 8 kinderen tegelijk, maximaal gewicht 200 kg.' },
    { q: 'Hoeveel ruimte heb ik nodig?', a: 'Reken minimaal 5 × 4 m vrije ruimte, hoogte minimum 3 m vrij.' },
    { q: 'Welk stopcontact heb ik nodig?', a: 'Een standaard 220V / 16A stopcontact volstaat. Verlengsnoer tot 25 m is ok, geen rolhaspel.' },
    { q: 'Wat is inbegrepen in de prijs?', a: 'Levering, opbouw, elektrische blower, verankeringsmateriaal en ophaling. Alles inbegrepen.' },
    { q: 'Kan het kasteel op tegels staan?', a: 'Ja, op harde ondergrond gebruiken wij zandbalken. Vermeld dit bij uw boeking.' },
  ],
  'hindernisbaan': [
    { q: 'Hoeveel ruimte heb ik nodig voor de hindernisbaan?', a: 'De baan is 14 m lang — reken minimaal 16 × 5 m vrije ruimte inclusief in- en uitloopzone. Hoogte minimum 4 m vrij.' },
    { q: 'Hoeveel kinderen kunnen tegelijk spelen?', a: 'Twee kinderen tegelijk op de baan. Bij een groep verloopt alles als een estafette — ideaal voor schoolfeesten en buurtactiviteiten.' },
    { q: 'Welk stopcontact heb ik nodig?', a: 'Een standaard 220V / 16A stopcontact volstaat. Verlengsnoer tot 25 m is ok.' },
    { q: 'Wat is de leeftijdsgrens?', a: '6 tot 14 jaar. Maximaal 120 kg per persoon.' },
    { q: 'Wat is inbegrepen in de prijs?', a: 'Levering, opbouw, elektrische blower, verankeringsmateriaal en ophaling. Alles inbegrepen.' },
  ],
  'rodeostier': [
    { q: 'Is een rodeostier gevaarlijk?', a: 'De rodeostier staat op een grote veiligheidsmat (8 × 8 m) die de val opvangt. De beweging kan wel krachtig zijn — zorg altijd voor toezicht en laat niemand met letsel aan nek of rug meerijden.' },
    { q: 'Voor wie is de rodeostier geschikt?', a: 'Vanaf 6 jaar, maximaal gewicht 120 kg. Volwassenen zijn ook welkom — de rodeostier is een garantie voor hilariteit op elk feest.' },
    { q: 'Hoeveel stroom heeft het toestel nodig?', a: 'De rodeostier heeft 2 × 1.100W nodig — twee aparte 220V / 16A stopcontacten. Vermeld bij boeking of u die beschikbaar heeft.' },
    { q: 'Hoe groot moet de ruimte zijn?', a: 'Minimaal 9 × 9 m vrije ruimte inclusief veiligheidsmat. Hoogte minimum 2,5 m vrij.' },
    { q: 'Wat is inbegrepen in de prijs?', a: 'Levering, opbouw, veiligheidsmat, bediening (wij leveren instructie) en ophaling. Alles inbegrepen.' },
  ],
  'bungee-run': [
    { q: 'Hoe werkt een bungee run?', a: 'Twee deelnemers rennen tegelijk elk in hun eigen baan, verbonden aan een bungeekoord dat hen terugtrekt. Wie het verst geraakt vóór het koord terugtrekt, wint. Garantie voor veel hilariteit.' },
    { q: 'Voor wie is de bungee run geschikt?', a: 'Vanaf 6 jaar, maximaal 100 kg per persoon. Zowel kinderen als volwassenen genieten ervan.' },
    { q: 'Hoeveel ruimte heb ik nodig?', a: 'De baan is 10 m lang — reken minimaal 12 × 5 m vrije ruimte. Hoogte minimum 3,5 m vrij.' },
    { q: 'Welk stopcontact heb ik nodig?', a: 'Eén standaard 220V / 16A stopcontact volstaat.' },
    { q: 'Wat is inbegrepen in de prijs?', a: 'Levering, opbouw, elektrische blower, verankeringsmateriaal en ophaling. Alles inbegrepen.' },
  ],
  'botsballen': [
    { q: 'Wat zijn botsballen precies?', a: 'Botsballen zijn grote opblaasbare ballen (zorbballen) die je aantrekt. Twee spelers botsen met hun ballen tegen elkaar in een opblaasbare arena. Veilig en enorm amusant voor kinderen en volwassenen.' },
    { q: 'Zijn de suits inbegrepen?', a: 'Ja, de botsballen zelf zijn inbegrepen in de huurprijs. U hoeft niets extra te voorzien.' },
    { q: 'Voor wie is dit geschikt?', a: 'Vanaf 8 jaar, maximaal 120 kg per persoon. Maximum 2 personen tegelijk in de arena.' },
    { q: 'Hoeveel ruimte heb ik nodig?', a: 'De opblaasbare arena is 5 × 5 m — reken minimaal 6 × 6 m vrije ruimte. Hoogte minimum 2,5 m vrij.' },
    { q: 'Welk stopcontact heb ik nodig?', a: 'Eén standaard 220V / 16A stopcontact volstaat.' },
  ],
  'reuzespelen': [
    { q: 'Welke spelen zitten in het pakket?', a: 'Het pakket bevat 5 reuzespelen zoals reuze jenga, vier op een rij, ringwerpen en andere klassieke tuin- en gezelschapsspelen in grootformaat.' },
    { q: 'Is er stroom nodig?', a: 'Nee, de reuzespelen hebben geen stroom nodig. Ideaal op plaatsen zonder stopcontact.' },
    { q: 'Hoeveel ruimte heb ik nodig?', a: 'Reken ca. 3 × 3 m per spel. Voor het volledige pakket is een oppervlakte van ca. 30–50 m² aangeraden zodat iedereen comfortabel kan spelen.' },
    { q: 'Voor welke leeftijd zijn de spelen geschikt?', a: 'Vanaf 5 jaar. De meeste spelen zijn ook leuk voor volwassenen — ideaal voor feesten met een gemengd publiek.' },
    { q: 'Wat is inbegrepen in de prijs?', a: 'Levering en ophaling van het volledige pakket (5 spelen). Opbouw is eenvoudig en doet u zelf in enkele minuten.' },
  ],
  'partytent-3x6m': [
    { q: 'Hoeveel personen passen onder deze tent?', a: 'Comfortabel 15–18 personen zittend aan tafels, of 25–30 staand. Voor grotere groepen raden wij de partytent 4 × 8 m aan.' },
    { q: 'Is de tent waterdicht?', a: 'Ja, het dak is van polyester 300D waterproof. Bij zijdelingse regen bieden de meegeleverde zijwanden extra bescherming.' },
    { q: 'Hoeveel zijwanden zijn inbegrepen?', a: 'Drie zijwanden zijn inbegrepen — één zijde blijft open als ingang. Heeft u vier zijwanden nodig? Vermeld dit bij uw boeking.' },
    { q: 'Kan de tent op een terras of tegels staan?', a: 'Ja, op harde ondergrond gebruiken wij gewichten in plaats van grondpennen voor de verankering. Vermeld dit bij uw boeking.' },
    { q: 'Hoe lang duurt de opbouw?', a: 'Ca. 30–45 minuten met twee personen. Wij bouwen op en af — u hoeft niets te doen.' },
  ],
  'partytent-4x8m': [
    { q: 'Hoeveel personen passen onder deze tent?', a: 'Comfortabel 30–40 personen zittend aan tafels, of 50–60 staand. Ideaal voor communiefeesten, grote tuinfeesten en bedrijfsevents.' },
    { q: 'Is de tent waterdicht?', a: 'Ja, dak en zijwanden zijn van polyester 300D waterproof. Inclusief grondzeil.' },
    { q: 'Zijn alle vier de zijwanden inbegrepen?', a: 'Ja, vier zijwanden zijn inbegrepen — de tent is volledig te sluiten. Ideaal bij wisselvallig weer.' },
    { q: 'Kan ik een terrasverwarmer gebruiken in de tent?', a: 'Ja, maar nooit met volledig gesloten zijwanden. Laat altijd minstens één zijwand open voor voldoende ventilatie bij gasapparatuur.' },
    { q: 'Kan de tent op een terras of tegels staan?', a: 'Ja, op harde ondergrond gebruiken wij gewichten in plaats van grondpennen. Vermeld dit bij uw boeking.' },
  ],
  'easy-up-vouwtent': [
    { q: 'Wat is het verschil met een partytent?', a: 'De easy-up is lichter (12 kg), sneller op te zetten (5–10 min door 1 persoon) en vraagt minder ruimte. Nadeel: geen zijwanden en minder windstabiel dan een partytent. Ideaal voor marktkraampjes, kleine terrassen of als extra schaduwplek.' },
    { q: 'Zijn er zijwanden inbegrepen?', a: 'Nee, de easy-up heeft geen zijwanden. Bij regen of wind raden wij een partytent aan.' },
    { q: 'Hoe windbestendig is de tent?', a: 'Matig windbestendig. Veranker altijd met de bijgeleverde pennen. Niet geschikt bij windkracht 4 of meer.' },
    { q: 'Is de tent waterdicht?', a: 'Het dak is van polyester 190T en is waterafstotend, maar niet 100% waterproof zoals de partytenten. Bij hevige regen kan er doorsijpeling zijn.' },
    { q: 'Is de hoogte verstelbaar?', a: 'Ja, de hoogte is verstelbaar van 2,0 tot 3,0 m.' },
  ],
  'houten-tentvloer': [
    { q: 'Hoeveel platen heb ik nodig voor mijn tent?', a: 'Elke plaat dekt 2 m² (1 × 2 m). Bereken uw tentoppervlak en deel door 2: een tent van 3 × 6 m = 18 m² = 9 platen. Een tent van 4 × 8 m = 32 m² = 16 platen.' },
    { q: 'Is de vloer geschikt op gras of zachte ondergrond?', a: 'Ja, dat is precies waarvoor de tentvloer dient. Op gras of oneven ondergrond zorgt de houten plankenvloer voor een stabiele, droge en gelijkmatige vloer.' },
    { q: 'Hoe zwaar zijn de platen?', a: 'Elke plaat (1 × 2 m, 18 mm dik vurenhout) weegt ca. 10–12 kg. Twee personen kunnen ze makkelijk leggen.' },
    { q: 'Is de vloer glad?', a: 'Nee, behandeld vurenhout heeft voldoende grip voor normale schoenen. Niet geschikt als dansvloer met gladde zolen.' },
    { q: 'Wat is de maximale belasting?', a: '400 kg per m² — ruim voldoende voor alle feestactiviteiten.' },
  ],
  'klapstoel-wit': [
    { q: 'Wat is het maximale gewicht per stoel?', a: '110 kg. Geschikt voor volwassenen van elk formaat.' },
    { q: 'Zijn de stoelen stapelbaar?', a: 'Ja, tot 10 stoelen per stapel. Wij leveren ze gestapeld — u kunt ze rechtstreeks neerzetten.' },
    { q: 'Worden de stoelen schoon geleverd?', a: 'Ja, alle stoelen worden gereinigd voor elke levering.' },
    { q: 'Zijn de stoelen geschikt voor buiten?', a: 'Ja, het materiaal (polypropyleen / staal) is geschikt voor binnen en buiten.' },
  ],
  'klaptafel-180cm': [
    { q: 'Hoeveel personen passen aan één tafel?', a: 'Comfortabel 6 personen (3 per zijde). Bij langere rijen aaneengesloten tafels rekent u 1 m per 2 personen.' },
    { q: 'Zijn de poten verstelbaar?', a: 'Nee, de hoogte is vast op 74 cm — standaard eethoogte, past bij alle klapstoel-types.' },
    { q: 'Wat is de maximale belasting?', a: '150 kg verdeeld over het tafelblad. Geschikt voor buffetten, dranken en feestgerechten.' },
    { q: 'Hoe zwaar is een tafel?', a: 'Ongeveer 11 kg. Eén persoon kan ze makkelijk dragen en opzetten.' },
    { q: 'Is de tafel inklapbaar?', a: 'Ja, de poten klappen in voor compact transport en opslag.' },
  ],
  'barkruk': [
    { q: 'Bij welke tafel past deze barkruk?', a: 'De barkruk heeft een zithoogte van 73 cm en past perfect bij onze statafels (hoogte 90–115 cm verstelbaar). Ook geschikt bij hoge bartafels of keukenbars.' },
    { q: 'Wat is het maximale gewicht?', a: '120 kg per kruk.' },
    { q: 'Is de kruk geschikt voor buiten?', a: 'Ja, het materiaal is geschikt voor binnen en buiten gebruik.' },
  ],
  'biertafelset': [
    { q: 'Hoeveel personen passen aan één biertafelset?', a: 'Comfortabel 6 personen: 3 per bank van 220 cm. U kunt er ook 8 kwijt als u wat dichter zit.' },
    { q: 'Is de set geschikt voor buiten?', a: 'Ja, het stalen frame en de houten planken zijn behandeld voor buitengebruik.' },
    { q: 'Wat is de maximale belasting per bank?', a: '180 kg per bank — stevig genoeg voor elke volwassene.' },
    { q: 'Worden tafel en banken samen geleverd?', a: 'Ja, de set bestaat altijd uit 1 tafel + 2 banken.' },
  ],
  'statafel': [
    { q: 'Hoe hoog is een statafel?', a: 'De hoogte is verstelbaar van 90 tot 115 cm — afstellen op uw gewenste standhoogte.' },
    { q: 'Hoeveel personen staan comfortabel rond een statafel?', a: '3 à 4 personen. Wilt u meer staplaatsen? Huur dan meerdere statafels.' },
    { q: 'Wat is de maximale belasting?', a: '50 kg op het tafelblad (diameter 60 cm). Niet overbelasten met zware stapels borden.' },
    { q: 'Past een statafelhoes op deze tafel?', a: 'Ja, onze statafelshoezen (wit stretch polyester) zijn specifiek voor 60 cm diameter — te huren voor €2,50 per stuk.' },
  ],
  'statafelhoes': [
    { q: 'Welke statafel past in deze hoes?', a: 'De hoes past op statafels met een diameter van 60 cm — de maat van onze verhuurstatafels.' },
    { q: 'Hoe ziet de hoes eruit?', a: 'Wit, bodenlang stretch polyester. Geeft elke statafel een strakke, verzorgde uitstraling.' },
    { q: 'Wordt de hoes gewassen geleverd?', a: 'Ja, alle hoezen worden gereinigd voor elke levering.' },
    { q: 'Kan ik de hoes zelf wassen?', a: 'Ja, de hoes is machinewasbaar op 30°C.' },
  ],
  'buitenstoel': [
    { q: 'Wat is het maximale gewicht per stoel?', a: '120 kg per stoel.' },
    { q: 'Zijn de stoelen stapelbaar?', a: 'Ja, de stoelen zijn stapelbaar voor compact transport en opslag.' },
    { q: 'Zijn de stoelen geschikt voor buiten?', a: 'Ja, de stoelen zijn specifiek ontworpen voor buitengebruik en bestand tegen normaal buitenweer.' },
    { q: 'Worden de stoelen schoon geleverd?', a: 'Ja, alle stoelen worden gereinigd voor elke levering.' },
  ],
  'picknicktafel': [
    { q: 'Hoeveel personen passen aan de picknicktafel?', a: 'Comfortabel 4 personen (2 per bank van 150 cm). Bij kinderen kunnen er 6 aan.' },
    { q: 'Is de tafel weerbestendig?', a: 'Ja, geïmpregneerd grenenhout is weerbestendig en geschikt voor permanent buitengebruik.' },
    { q: 'Is de tafel opvouwbaar?', a: 'Nee, de klassieke picknicktafel is één geheel. Hij wordt als één stuk geleverd.' },
    { q: 'Wat is de maximale belasting?', a: '120 kg per bankzijde — ruim voldoende voor normale feestomstandigheden.' },
  ],
  'terrasverwarmer': [
    { q: 'Is de gasfles inbegrepen?', a: 'De gasfles is optioneel bij te bestellen voor €35 (10 L / ± 5 kg propaan of butaan). Bij gemiddeld gebruik is dit goed voor een volledige avond (6 à 8 uur). Voor een feest dat de hele dag duurt raden wij 2 flessen aan.' },
    { q: 'Hoe groot is het verwarmingsbereik?', a: 'De verwarmer heeft een capaciteit van 13 kW en verwarmt effectief tot ca. 3 m rondom het toestel. Voor grotere ruimtes of meer gasten raden wij meerdere verwarmers aan.' },
    { q: 'Mag de verwarmer onder een partytent staan?', a: 'Alleen bij voldoende ventilatie. Nooit met volledig gesloten zijwanden — laat altijd minstens één zijwand open bij gebruik van gasapparatuur.' },
    { q: 'Is het toestel veilig bij kinderen?', a: 'De verwarmer heeft een kantelbeveiliging. De bovenste ring wordt echter zeer warm — houd kinderen op minimum 1 m afstand en laat de verwarmer nooit onbeheerd aan.' },
    { q: 'Hoeveel verwarmers heb ik nodig?', a: 'Als vuistregel: 1 verwarmer per 10–15 gasten bij buitenavonden in voor- of najaar.' },
  ],
  'led-sfeerverlichting': [
    { q: 'Hoe hang ik de verlichting op?', a: 'Ophangclips zijn inbegrepen. De slinger is geschikt voor partytenten, pergola\'s, hagen of gevels. Het snoer is 10 m lang met 20 bollampen.' },
    { q: 'Is de verlichting geschikt voor buiten?', a: 'Ja, de verlichting heeft IP44 certificering (spatwaterdicht) en is veilig voor buitengebruik.' },
    { q: 'Kan ik meerdere strengen koppelen?', a: 'Ja, meerdere strengen zijn koppelbaar op één stopcontact, zolang u het totaalvermogen van het circuit niet overschrijdt (10 W per streng).' },
    { q: 'Welk stopcontact heb ik nodig?', a: 'Een standaard 220V stopcontact. De verlichting verbruikt slechts 10 W — verwaarloosbaar.' },
  ],
  'muziekbox': [
    { q: 'Hoe luid is de muziekbox?', a: '60 W vermogen. Voldoende voor een tuin of tent met tot ca. 60–80 personen bij normaal feestvolume.' },
    { q: 'Hoe lang gaat de accu mee?', a: '12 uur bij gemiddeld volume. Voldoende voor een volledige feestdag zonder stopcontact.' },
    { q: 'Hoe verbind ik mijn telefoon?', a: 'Via Bluetooth 5.0 (bereik ca. 10–15 m) of via de meegeleverde AUX-kabel.' },
    { q: 'Is de speaker waterbestendig?', a: 'Ja, IPX5 — beschermd tegen spatwater en lichte regen. Niet onderdompelen.' },
  ],
  'koelkast': [
    { q: 'Hoeveel past er in de koelkast?', a: '150 liter inhoud — dat is ca. 150–200 blikjes of 10–15 flessen wijn.' },
    { q: 'Hoe snel is de koelkast op temperatuur?', a: 'Reken 2–3 uur om op te koelen. Zet de koelkast op tijd aan en vul hem bij voorkeur met al gekoelde dranken voor het beste resultaat.' },
    { q: 'Welk stopcontact heb ik nodig?', a: 'Een standaard 220V stopcontact. De koelkast verbruikt 100 W.' },
    { q: 'Mag de koelkast buiten staan?', a: 'Nee, de koelkast is voor gebruik binnenshuis of onder een overdekte ruimte (tent). Direct zonlicht en regen zijn niet toegestaan.' },
  ],
  'tapinstallatie': [
    { q: 'Is een CO₂-fles inbegrepen?', a: 'Ja, een CO₂-fles is inbegrepen in de huurprijs.' },
    { q: 'Welk fust past in de installatie?', a: 'De installatie is geschikt voor standaard Belgische fusten van 20 L of 50 L. Het bier zelf is niet inbegrepen — dat regelt u zelf bij uw brouwerij of drankenhandel.' },
    { q: 'Hoe lang van tevoren moet ik de installatie aanzetten?', a: 'Zet de installatie 2–3 uur voor het feest aan zodat het bier goed op temperatuur komt (3–5°C). Zo tapt u van bij het begin een perfect pint.' },
    { q: 'Welk stopcontact heb ik nodig?', a: 'Een standaard 220V / 50Hz stopcontact voor de koelunit.' },
    { q: 'Wat is inbegrepen?', a: 'Taptoren, bierkoel, slangen en CO₂-fles. Alles kant-en-klaar geleverd en geïnstalleerd.' },
  ],
  'percolator': [
    { q: 'Hoeveel kopjes koffie maakt de percolator?', a: '60 tot 80 kopjes per vulling (8 liter). Ideaal voor groepen van 50 tot 100 personen.' },
    { q: 'Hoe lang duurt het zetten?', a: 'Ca. 45–60 minuten voor een volle kan. Zet de percolator tijdig aan zodat de koffie klaar is bij aankomst van uw gasten.' },
    { q: 'Is koffie inbegrepen?', a: 'Nee, koffie (gemalen of in filters) is niet inbegrepen. Een maatsteveltje en koffiefilter zijn wel inbegrepen.' },
    { q: 'Houdt de percolator de koffie warm?', a: 'Ja, de ingebouwde warmhouderfunctie houdt de koffie op temperatuur na het zetten.' },
    { q: 'Welk stopcontact heb ik nodig?', a: 'Een standaard 220V stopcontact. Vermogen is 1.200 W.' },
  ],
};

function buildFaqHtml(items) {
  const listItems = items.map(({ q, a }) => `      <div class="faq-item">
        <h3>${q}</h3>
        <p>${a}</p>
      </div>`).join('\n');
  return `\n<section class="product-faq-section">
  <div class="product-inner">
    <h2 class="faq-heading">Veelgestelde vragen</h2>
    <div class="faq-list">
${listItems}
    </div>
  </div>
</section>\n`;
}

function buildFaqSchema(items) {
  return {
    '@type': 'FAQPage',
    'mainEntity': items.map(({ q, a }) => ({
      '@type': 'Question',
      'name': q,
      'acceptedAnswer': { '@type': 'Answer', 'text': a.replace(/<[^>]+>/g, '') }
    }))
  };
}

let updated = 0;
let skipped = 0;

for (const [slug, faqItems] of Object.entries(FAQS)) {
  const filePath = path.join(DIR, `${slug}.html`);
  if (!fs.existsSync(filePath)) {
    console.log(`⚠ Niet gevonden: ${slug}.html`);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Skip als FAQ al aanwezig
  if (content.includes('product-faq-section')) {
    console.log(`→ Al aanwezig: ${slug}.html`);
    skipped++;
    continue;
  }

  // 1. Voeg CSS toe vóór </style>
  content = content.replace('</style>', FAQ_CSS + '\n  </style>');

  // 2. Voeg FAQ HTML in vóór de modal-overlay (of vóór footer als geen modal)
  const faqHtml = buildFaqHtml(faqItems);
  if (content.includes('<div class="modal-overlay"')) {
    content = content.replace('<div class="modal-overlay"', faqHtml + '<div class="modal-overlay"');
  } else {
    content = content.replace('<footer class="site-footer"', faqHtml + '<footer class="site-footer"');
  }

  // 3. Voeg FAQPage toe aan JSON-LD @graph
  const faqSchema = buildFaqSchema(faqItems);
  content = content.replace(
    /(\{"@context":"https:\/\/schema\.org","@graph":\[)([\s\S]*?)(\]\})/,
    (match, open, inner, close) => {
      const cleaned = inner.trimEnd().replace(/,?\s*$/, '');
      return `${open}${cleaned},\n    ${JSON.stringify(faqSchema)}${close}`;
    }
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✓ ${slug}.html`);
  updated++;
}

console.log(`\nKlaar. ${updated} bijgewerkt, ${skipped} overgeslagen.`);
