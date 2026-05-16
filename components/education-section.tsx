"use client"

import { useState } from "react"
import {
  Building2, CreditCard, Shield, TrendingUp, PiggyBank, AlertTriangle,
  BookOpen, ReceiptText, Landmark, Clock, ChevronRight, ArrowLeft, CheckCircle2, Lightbulb,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Section {
  heading: string
  body: string
  tip?: string
}

interface Article {
  id: string
  category: string
  icon: React.ElementType
  iconColor: string
  title: string
  excerpt: string
  readTime: number
  badge?: string
  intro: string
  sections: Section[]
  keyTakeaways: string[]
}

const articles: Article[] = [
  {
    id: "bank-account",
    category: "Bankovanje",
    icon: Building2,
    iconColor: "bg-primary/10 text-primary",
    title: "Kako da otvoriš bankovni račun u Srbiji",
    excerpt: "Korak po korak vodič: koji dokumenti su potrebni, šta pitati banku i kako izabrati pravu banku.",
    readTime: 6,
    badge: "Početnički",
    intro: "Otvaranje bankovnog računa je prvi korak ka finansijskoj samostalnosti. Ovaj vodič ti objašnjava sve što treba da znaš – od izbora banke do aktivacije mobilnog bankarstva.",
    sections: [
      {
        heading: "Potrebni dokumenti",
        body: "Za otvaranje tekućeg računa u srpskoj banci uglavnom su potrebni: lična karta ili pasoš (original), poreski identifikacioni broj (PIB) ako si zaposlen i u nekim bankama dokaz o adresi (račun za struju, telekomunikacije). Studenti mogu otvoriti studentski račun samo sa indeksom i ličnom kartom.",
        tip: "Mnoge banke sada nude otvaranje računa i online ili putem mobilne aplikacije bez posete ekspozituri.",
      },
      {
        heading: "Kako izabrati pravu banku?",
        body: "Pre nego što odabereš banku, uporedi: mesečne naknade za održavanje računa (0–500 RSD), naknade za podizanje gotovine na bankomatima, dostupnost bankomata u tvom gradu, kvalitet mobilne i internet aplikacije, i da li postoje posebni paketi za mlade (18–27 godina). Različite banke nude različite pakete – najbolji izbor zavisi od tvoje upotrebe (koliko često podimaš gotovinu, da li radiš onlajn kupovine, itd.). Proveri recenzije studenata na društvenim mrežama.",
      },
      {
        heading: "Koraci za otvaranje računa",
        body: "1. Istraži i odaberi banku prema naknadama i uslugama koje su ti bitne.\n2. Poseti ekspozituru sa svim potrebnim dokumentima.\n3. Popuni zahtev i potpiši ugovor – budi pažljiv na sitna slova o naknadama.\n4. Dobij debitnu karticu (obično za 5–10 radnih dana).\n5. Aktiviraj internet i mobilno bankarstvo čim dobiješ pristupne podatke.\n6. Odmah postavi dvofaktorsku autentifikaciju (2FA) za sigurnost.",
        tip: "Pitaj banku da li možeš dobiti karticu odmah na šalteru (instant kartica) – neke banke to nude.",
      },
      {
        heading: "Šta pitati banku pre potpisivanja?",
        body: "Uvek postavljaj konkretna pitanja: Kolika je mesečna naknada za vođenje računa? Da li ima naknada za slanje novca unutar banke? Šta je limit za podizanje gotovine? Postoji li naknada za transakcije van mreže bankomata? Da li postoji studentski/omladinski paket sa povoljnijim uslovima? Ima li cashback ili nagrade programa?",
      },
      {
        heading: "Digitalno bankarstvo i sigurnost",
        body: "Kada aktiviraš mobilno bankarstvo, odmah:\n• Postavi jak PIN i lozinku (ne koristiti datume rođenja)\n• Uključi biometrijsku autentifikaciju (otisak prsta, Face ID)\n• Aktiviraj SMS obaveštenja za sve transakcije\n• Postavi limite trošenja kartice na iznose koje realno trosiš\n• Zapamti broj za blokiranje kartice (uvek ga imaš u telefonu)",
        tip: "Nikad ne koristiti isti PIN za karticu i mobilni telefon.",
      },
      {
        heading: "Vrste računa koje banke nude",
        body: "Tekući račun: za svakodnevne transakcije, plate i plaćanje računa. Štedni račun: za čuvanje novca uz kamatu (1–6%), obično sa ograničenim pristupom. Oročena štednja: veća kamata, novac 'zaključan' na određeno vreme. Račun za mlade: povoljniji uslovi, bez naknade za studente.",
      },
    ],
    keyTakeaways: [
      "Poredi naknade pre nego potpisati ugovor – razlike mogu biti i nekoliko hiljada dinara godišnje",
      "Studentski paketi su obično znatno povoljniji od standardnih",
      "Aktiviraj 2FA i SMS obaveštenja odmah po otvaranju",
      "Pitaj za instant karticu da ne čekaš 10 dana",
      "Čitaj ugovor pažljivo, naročito odeljak o naknadama",
    ],
  },
  {
    id: "credit-vs-debit",
    category: "Kartice",
    icon: CreditCard,
    iconColor: "bg-accent/20 text-accent-foreground",
    title: "Kreditna vs. debitna kartica – koja je bolja?",
    excerpt: "Razlika između kreditnih i debitnih kartica, kada koristiti koju i kako izbeći zamke kreditnih kartica.",
    readTime: 7,
    badge: "Važno",
    intro: "Razumeti razliku između kreditnih i debitnih kartica je jedno od najvažnijih finansijskih znanja. Pogrešan izbor može te koštati desetine hiljada dinara godišnje u kamatama.",
    sections: [
      {
        heading: "Debitna kartica – trosiš sopstveni novac",
        body: "Debitna kartica direktno povlači novac sa tvog tekućeg računa. Ako nema dovoljno pare – transakcija je odbijena. Nema kamate, nema dugova, nema rizika od prezaduženosti. Idealna za svakodnevne kupovine, online plaćanja i podizanje gotovine. U Srbiji, gotovo sve banke nude Visa ili Mastercard debitne kartice. Oba kartična sistema sa debitnim karticama imaju procedure za reklamaciju u slučaju neovlašćene transakcije ili spornih nabavki.",
        tip: "Debitna kartica je uvek sigurniji izbor za početnike koji uče da upravljaju novcem.",
      },
      {
        heading: "Kreditna kartica – posuđuješ novac od banke",
        body: "Kreditnom karticom koristiš novac banke do odobrenog kreditnog limita. Svaki mesec dobijaš izvod sa dugom koji moraš platiti. Ako vratiš CELO iznos do roka (grace period, obično 30–45 dana) – plaćaš 0% kamate. Ako platiš samo minimum ili kasniš – kamata može biti visoka; u praksi godišnje kamatne stope često su u opsegu ~20–36% u zavisnosti od banke i proizvoda, pa proveri T&C banke.",
      },
      {
        heading: "Prednosti kreditnih kartica (ako se koriste pametno)",
        body: "Izgradnja kreditne istorije: plaćanje na vreme gradi tvoj kreditni skor, koji ti treba za hipoteku ili veće zajmove. Zaštita kupovine (chargeback/dispute): ako ne dobiješ kupljenu robu ili te prevari prodavac, moguće je podneti reklamaciju kod izdavaoca kartice i tražiti povraćaj sredstava (primer: Mastercard dispute procedures https://www.mastercard.us/en-us/consumers/how-to-dispute.html). Cashback i nagrade: neke kartice daju 1–3% povrat na određene kategorije (gorivo, supermarketi). Korisnost u hitnim situacijama: privremeno pokriće neočekivanih troškova.",
        tip: "Chargeback ne postoji kod debitnih kartica – ovo je ključna prednost kreditnih kartica za online kupovine.",
      },
      {
        heading: "Zamke kreditnih kartica koje mlade hvataju",
        body: "Minimalna otplata: banke traže samo 3–5% duga mesečno. Ako platiš minimum, dug raste zbog kamate i može trajati godinama. Prekoračenje limita: neke kartice dozvoljavaju trošenje iznad limita uz visoke naknade. Podizanje gotovine: uvek se naplaćuje naknada (2–5%) i odmah teče kamata, bez grace perioda – izbegavaj ovo. Propušteni rok: jedna zaboravljena uplata može pokrenuti kazne i obeležiti tvoju kreditnu istoriju.",
      },
      {
        heading: "Zlatno pravilo kreditnih kartica",
        body: "Nikad ne troši sa kreditne kartice ako nemaš novac na računu da odmah pokriješ taj trošak. Tretaj je kao debitnu – koristi je samo za kupovine koje možeš odmah platiti iz džepa. Postavi automatsko plaćanje celog iznosa na dan dospeća da nikad ne platiš kamatu.",
      },
      {
        heading: "Koji tip kartice da odabereš?",
        body: "Preporučena strategija za mlade: Počni sa debitnom karticom. Nakon što utvrdiš navike trošenja (6+ meseci), razmisli o kreditnoj kartici sa niskim limitom (20.000–30.000 RSD). Koristi je samo za kupovine za koje znaš da možeš platiti odmah. Postavi automatsku otplatu celog iznosa svaki mesec.",
      },
    ],
    keyTakeaways: [
      "Debitna = tvoj novac. Kreditna = pozajmljeni novac uz mogućnost visokih kamata",
      "Kreditna kartica bez kamate je moguća samo ako vratiš ceo iznos do roka",
      "Kamata na kreditnim karticama često iznosi oko 20–36% godišnje (varira po banci i proizvodu)",
      "Chargeback zaštita je ključna prednost kreditnih kartica",
      "Zlatno pravilo: koristi kreditnu samo ako imaš novac za to",
    ],
  },
  {
    id: "emergency-fund",
    category: "Štednja",
    icon: PiggyBank,
    iconColor: "bg-secondary text-secondary-foreground",
    title: "Fond za hitne slučajeve – zašto je ključan",
    excerpt: "Šta je fond za hitne slučajeve, koliko novca treba da imaš i kako da ga izgradiš korak po korak.",
    readTime: 5,
    intro: "Fond za hitne slučajeve je temelj svake zdrave finansijske situacije. Bez njega, svaki neočekivani trošak može da te baci u dug. Sa njim, imaš miran san i finansijsku slobodu.",
    sections: [
      {
        heading: "Šta je fond za hitne slučajeve?",
        body: "To je rezerva novca namenjena isključivo za neočekivane troškove: kvar automobila, medicinska hitna situacija, gubitak posla, hitan popravak stana, ili drugi iznenadni troškovi. Nije za odmor, nije za nova elektronska uređaja, nije za čak ni 'samo ovaj put' kupovine. To je tvoja finansijska sigurnosna mreža.",
        tip: "Drži fond odvojen od tekućeg računa – vizuelna separacija pomaže da ga ne potrosiš.",
      },
      {
        heading: "Koliko novca treba da imaš?",
        body: "Opšte pravilo: 3–6 meseci tvojih OSNOVNIH mesečnih troškova (kirija, hrana, komunalije, transport, zdravlje). Ne ukupnih prihoda, nego samo neophodnih troškova. Ako tvoji mesečni osnovni troškovi iznose 55.000 RSD: Minimalni fond (3 mes.): 165.000 RSD. Preporučeni fond (6 mes.): 330.000 RSD. Freelanceri i nestabilni prihodi: 6–9 meseci troškova.",
      },
      {
        heading: "Gde čuvati fond za hitne slučajeve?",
        body: "Fond mora biti: lako dostupan (likvidnost – možeš podići za 1–2 dana), siguran (ne u akcijama ili kriptovalutama), i odvojen od dnevnog računa. Idealne opcije: Oročena štednja sa 30-dnevnim otkaznim rokom (3–5% kamata), štedni račun u drugoj banci (vizuelno odvojen), ili novčani fondovi niskog rizika.",
        tip: "Ne stavljaj fond za hitne slučajeve u investicije – vrednost može pasti baš kada ti treba.",
      },
      {
        heading: "Kako izgraditi fond korak po korak?",
        body: "Korak 1: Definiši cilj. Izračunaj mesečne osnovne troškove, pomnož sa 3 (minimalni cilj). Korak 2: Otvori odvojen štedni račun samo za fond. Korak 3: Automatizuj prenos. Na dan plate, automatski prebaci iznos u fond (npr. 10% plate). Korak 4: Ubrzaj. Svaki bonus, poklon, ili extra prihod – 50% odmah u fond. Korak 5: Drži! Ne diraj fond osim za prave hitne situacije.",
      },
      {
        heading: "Šta je prava 'hitna situacija'?",
        body: "Jeste hitna situacija: Gubitak posla, medicinski troškovi koji nisu planirani, kvar automobila koji ti treba za posao, hitna popravka grejanja ili vodovoda, smrt u porodici koja zahteva putovanje. NIJE hitna situacija: Rasprodata karta za koncert, popust na laptop koji nisi planirao kupiti, letovanje jer su se drugi dogovorili, nova garderoba 'jer ti treba'.",
      },
      {
        heading: "Šta ako iskoristiš fond?",
        body: "Iskoristi fond bez grižnje savesti – zato postoji! Odmah po stabilizaciji situacije, vrati se na punjenje fonda. Analiza: može li se ova situacija sprečiti ubuduće (osiguranje, redovno servisiranje auta)? Postavi privremeni povećani mesečni doprinos dok ne vratiš fond na puni iznos.",
        tip: "Prazan fond posle korišćenja nije neuspeh – to je uspeh. Fond je uradio posao.",
      },
    ],
    keyTakeaways: [
      "Cilj: 3–6 meseci osnovnih troškova",
      "Drži fond odvojen od tekućeg računa",
      "Automatizuj prenos na dan plate – ne čekaj 'ostatak'",
      "Fond je za prave hitne situacije, ne za prilike i popuste",
      "Posle korišćenja fonda – odmah kreni sa punjanjem",
    ],
  },
  {
    id: "financial-safety",
    category: "Sigurnost",
    icon: Shield,
    iconColor: "bg-primary/10 text-primary",
    title: "Finansijska sigurnost i prevare na internetu",
    excerpt: "Kako prepoznati finansijske prevare, zaštiti bankovne podatke i sigurno kupovati online.",
    readTime: 8,
    badge: "Važno",
    intro: "Finansijske prevare su sve sofisticiranije i sve je teže ih prepoznati. Mladi su posebno meta jer su aktivni online i često manje iskusni. Ovo što čitaš može ti uštedeti sve pare.",
    sections: [
      {
        heading: "Najčešće finansijske prevare u Srbiji",
        body: "Phishing: Lažni emailovi koji izgledaju kao poruke od banke, poreske uprave ili PayPal-a. Traže da klikneš link i uneseš podatke. Vishing: Telefonske prevare gde se neko predstavlja kao bankar, policajac, ili zaposleni u telekomunikacijama i traži tvoje podatke. Smishing: Slični napadi putem SMS poruka. Investicione prevare: 'Garantovani prinos od 50% mesečno' – uvek prevara. Lažne online prodavnice: Uzimaju novac i ne šalju robu ili šalju falsifikate.",
      },
      {
        heading: "Kako prepoznati prevaru – crvene zastavice",
        body: "Hitnost i pritisak: 'Odmah reagujte ili ćete izgubiti novac!' – banke tako ne komuniciraju. Traženje PIN-a ili lozinke: Banka NIKAD ne traži tvoj PIN, lozinku, ili CVV telefonom/emailom. Previše dobro da bude istinito: Garantovani visoki prinosi, nagrade koje nisi osvajao/la, nasledstvo od neznanca. Loša gramatika i pravopis: Profesionalne institucije imaju lektore. Sumnjiv URL: 'raiffeisen-bank-rs.com' umesto 'raiffeisenbank.rs' – uvek proveri.",
        tip: "Ako nisi siguran/na, prekini komunikaciju i sam/a nazovi banku na broj sa poleđine kartice.",
      },
      {
        heading: "Sigurna online kupovina",
        body: "Pre kupovine proveri: Da li URL počinje sa 'https://' (brava ikonica)? Da li je sajt na domaćem ili dobro poznatom domenu? Da li prodavnica ima fizičku adresu i PIB? Da li postoje recenzije na nezavisnim platformama? Preporučene metode plaćanja: kreditna ili debitna kartica (mogućnost reklamacije/dispute) ili platforma poput PayPal (https://www.paypal.com/). Nikada ne plaćaj kriptovalutama ili bankovnim transferom nepoznatim prodavcima.",
      },
      {
        heading: "Praktična zaštita bankovnog računa",
        body: "Svakodnevna zaštita: Uključi SMS ili push obaveštenja za SVE transakcije. Postavi limite trošenja kartice (dnevni i mesečni). Koristi dvofaktorsku autentifikaciju za sve finansijske aplikacije. Redovno menjaj lozinke (svakih 3–6 meseci). Nikada ne koristiti javni WiFi za bankarske usluge – koristi mobilne podatke.",
      },
      {
        heading: "Šta ako primetiš sumnjive aktivnosti?",
        body: "Odmah: Nazovi banku i blokiraj karticu (broj uvek imaš u aplikaciji ili na poleđini kartice). Priavi internet prevarante: Policiji (prijava online ili u stanici), MUP-u RS (cybercrime@mup.gov.rs), i NBS-u (prituzbe@nbs.rs). Sačuvaj sve dokaze: snimke ekrana, emailove, SMS poruke, transkripcije razgovora. Brza reakcija može ti spasiti novac.",
        tip: "Broj za blokiranje kartice snimi u telefonu pod imenom 'Banka hitna'. Potreban ti je bez interneta.",
      },
      {
        heading: "Sigurnost lozinki i digitalnih naloga",
        body: "Koristiti unikalne, jake lozinke za svaki servis (minimalno 12 karaktera, kombinacija slova, brojeva, simbola). Nikada ne koristiti istu lozinku za banku i društvene mreže. Koristi menadžer lozinki (Bitwarden je besplatan i open-source). Periodično proveri da li su tvoji podaci procureli: haveibeenpwned.com. Uključi login obaveštenja za Gmail, Apple ID, i ostale ključne naloge.",
      },
    ],
    keyTakeaways: [
      "Banka nikad ne traži PIN, lozinku, ili CVV telefonom ili emailom",
      "Hitnost i pritisak su uvek crvene zastavice",
      "I kreditne i debitne kartice mogu podneti reklamacije i zahteve za povraćaj sredstava; dostupnost i postupak (chargeback/dispute) zavise od izdavaoca i kartičnog sistema",
      "Nikad ne koristiti javni WiFi za bankarske usluge",
      "Broj za blokiranje kartice uvek u telefonu",
    ],
  },
  {
    id: "investing-basics",
    category: "Investiranje",
    icon: TrendingUp,
    iconColor: "bg-accent/20 text-accent-foreground",
    title: "Uvod u investiranje za mlade u Srbiji",
    excerpt: "Zašto je važno početi rano, koji su opcije dostupne u Srbiji i kako diversifikovati portfolio.",
    readTime: 9,
    intro: "Investiranje nije samo za bogate. Sa 5.000 RSD mesečno, možeš graditi značajno bogatstvo kroz deceniju. Ključ je početi rano i biti dosledan – složena kamata radi umesto tebe.",
    sections: [
      {
        heading: "Zašto investirati umesto samo štedeti?",
        body: "Inflacija u Srbiji je istorijski bila visoka (5–15% godišnje). Ako tvoje pare 'sede' na tekućem računu koji nosi 0–1% kamate, godišnje gubis realnu kupovnu moć. Štedni račun od 4% kamata jedva prati inflaciju. Investiranjem u produktivna sredstva (akcije, obveznice, nekretnine) možeš da nadmašiš inflaciju i gradiš bogatstvo.",
        tip: "Pravilo 72: Podeli 72 sa godišnjom stopom prinosa da dobiješ koliko godina treba da se ulog udvostruči. Na 9% – 8 godina.",
      },
      {
        heading: "Opcije za investiranje u Srbiji",
        body: "Oročena štednja (2–6%): Najsigurnija, osigurana do 50.000 EUR. Nizak prinos, ali bez rizika gubitka. Državne obveznice RS (6–9%): Kupuju se kroz NBS ili banke. Fiksni prinos, relativno siguran. Obveznice u EUR ili USD. Akcije na BVB (Beogradska berza): Korporativne akcije – viši rizik i potencijalni prinos. Likvidnost niža nego na Zapadu. Međunarodni ETF fondovi: Indeksni fondovi koji prate S&P 500, MSCI World. Pristupačni putem Interactive Brokers, Trading 212. Kriptovalute: Visoko špekulativno, bez regulatorne zaštite. Samo za iskusne investitore.",
      },
      {
        heading: "Šta je ETF i zašto ga preporučuju početnicima?",
        body: "ETF (Exchange Traded Fund) je fond koji prati indeks (npr. 500 najvećih kompanija u SAD). Umesto da odabereš jednu akciju (rizično), kupiš mali deo stotina kompanija odjednom – to je diversifikacija. S&P 500 ETF je u proseku donosio 10% godišnje u poslednjih 50 godina. Provizije su minimalne (0.03–0.2% godišnje). Može se kupiti i sa 50 EUR mesečno.",
        tip: "Preporučeni ETF za početnike: Vanguard FTSE All-World (VWRL) ili iShares Core MSCI World (IWDA).",
      },
      {
        heading: "Zlatna pravila investiranja",
        body: "Investiraj samo novac koji ne trebaš u sledećih 5+ godina – tržišta kratkoročno padaju, ali se oporavljaju. Diversifikuj – ne stavljaj sve u jednu kompaniju, sector ili valutu. Investiraj redovno (DCA metoda) – ne čekaj 'pravi trenutak', svaki mesec uplaćuj isti iznos. Ne prodavaj u panici – pad tržišta je prilika za kupovinu, ne razlog za bežanje. Razumej šta kupuješ – ne slepo slušaj savete influensera.",
      },
      {
        heading: "Kako početi: korak po korak",
        body: "1. Izgradi fond za hitne slučajeve (3 meseca troškova) – pre investiranja, obavezno! 2. Otplati dugove sa visokom kamatom (kreditna kartica, potrošački kredit). 3. Otvori brokerski nalog: Interactive Brokers (međunarodne akcije), Trading 212, ili domaći brokeri (Erste, Komercijalna). 4. Počni sa indeksnim ETF-om koji prati globalni tržišni indeks. 5. Postavi automatski mesečni prenos (npr. 5.000 RSD) i ne diraj.",
      },
      {
        heading: "Greške koje mlade investitore koštaju",
        body: "FOMO (Fear Of Missing Out): Kupovina akcija ili kriptovaluta jer su 'svi kupuju' – obično na vrhu tržišta. Paničko prodavanje: Prodaja tokom pada – realizuješ gubitak i promasiš oporavak. Ignorisanje poreza: Prihodi od investicija se oporezuju! Informiši se o poreskim obavezama. Pretjerano trading: Česta kupoprodaja povećava troškove i smanjuje prinos. Nedostatak diversifikacije: Sve u jedan instrument je kockanje, ne investiranje.",
      },
    ],
    keyTakeaways: [
      "Počni rano – svaka godina odlaganja košta hiljade u budućnosti",
      "Fond za hitne slučajeve pre investiranja – bez kompromisa",
      "ETF indeksni fondovi su idealni za početnike",
      "Investiraj redovno bez čekanja 'pravog trenutka' (DCA strategija)",
      "Ne prodavaj u panici – tržišta se uvek oporave na dugi rok",
    ],
  },
  {
    id: "debt-management",
    category: "Dugovi",
    icon: AlertTriangle,
    iconColor: "bg-destructive/10 text-destructive",
    title: "Upravljanje dugovima – kako se osloboditi duga",
    excerpt: "Strategije za otplatu dugova, razlika između 'dobrog' i 'lošeg' duga i kako izbegavati zamke.",
    readTime: 7,
    intro: "Dug nije uvek loša stvar, ali loše upravljanje dugom može uništiti finansijsku budućnost. Nauči razliku između produktivnog i destruktivnog duga, i strategije za brzo oslobađanje.",
    sections: [
      {
        heading: "Da li je sav dug loš?",
        body: "Nije. Postoje 'dobri' i 'loši' dugovi. Dobar dug: Investicija koja povećava tvoju vrednost ili prihode. Studentski kredit koji povećava zaradu, hipotekarni kredit za nekretninu koja se valoruje, kredit za opremu kojom zarađuješ novac. Loš dug: Kredit za potrošna dobra koja gube vrednost. Kredit za letovanje, TV, telefon ili odeću koji vreže manje nego ukupno platiš u kamatama. Najgori dug: Revolving kredit i neplaćeni saldo kreditne kartice.",
      },
      {
        heading: "Metoda snežne lopte (Snowball)",
        body: "Princip: Otplati najpre najmanji dug (po iznosu), bez obzira na kamatnu stopu. Oslobođene rate koristi za sledeći najmani dug, i tako dalje. Primer: Imaš 3 duga od 30.000, 100.000, i 300.000 RSD. Kreni sa onim od 30.000. Prednosti: Brze pobede daju motivaciju i psihološki zamah. Statistički, ova metoda ima veću stopu završetka zbog motivacije.",
        tip: "Psihologija je ključna kod otplate duga. Snowball je efikasnija za ljude koji lako odustaju.",
      },
      {
        heading: "Metoda lavine (Avalanche)",
        body: "Princip: Otplati najpre dug sa NAJVEĆOM kamatnom stopom, bez obzira na iznos. Matematički najisplativije – ukupno platiš manje kamate. Primer: Kreditna kartica (28% kamata) → Potrošački kredit (12%) → Stambeni kredit (4%). Mana: Zahteva strpljenje jer prvi dug može biti veliki i napredak je spor. Koristi ako imaš jak motivacioni sistem i možeš da vidiš dugoročno.",
      },
      {
        heading: "Konsolidacija dugova",
        body: "Ako imaš više dugova sa različitim kamatama, možeš ih objediniti u jedan kredit sa nižom kamatom – to je konsolidacija. Prednosti: Jedna rata, niža kamata, bolji pregled. Upozorenje: Konsolidacija produži rok otplate – ukupno možeš platiti više! Pažljivo poredi ukupne troškove, ne samo mesečnu ratu. U Srbiji, refinansiranje kredita nude sve banke, ali uvek traži detaljnu kalkulaciju.",
      },
      {
        heading: "Znaci da imaš problem sa dugovima",
        body: "Zabrinjavajuće znake: Plaćaš dug jednim kreditom (revolving). Ne možeš mesečno uštedjeti ništa jer sve ide na rate. Preskačeš plaćanje računa ili rata. Svaki mesec zavisno od kreditnog prekoračenja. Ukupne rate iznose više od 40% neto prihoda. Krij dugove od partnera ili porodice. Ako prepoznaješ ove znake, odmah traži besplatno savetovanje.",
        tip: "NBS nudi besplatno finansijsko savetovanje građanima koji imaju probleme sa dugovima.",
      },
      {
        heading: "Kako izbegavati dug u budućnosti?",
        body: "Fundamentalne navike: Troši manje nego što zarađuješ (uvek). Izgradi fond za hitne slučajeve da izbegneš neplanirani dug. Ne kupuj na kredit stvari koje gube vrednost. Pre uzimanja kredita, izračunaj ukupnu cenu (s kamatom), ne samo mesečnu ratu. Postavi pravilo 24 sata: sačekaj dan pre svake kupovine iznad 5.000 RSD.",
      },
    ],
    keyTakeaways: [
      "Dug za investicije = dobar dug. Dug za potrošnju = loš dug",
      "Snowball metoda za motivaciju, Avalanche za matematičku uštedu",
      "Konsolidacija snižava ratu ali može produžiti total",
      "Ako rate premašuju 40% prihoda – hitno tražiti pomoć",
      "Fond za hitne slučajeve sprečava budući nepotrebni dug",
    ],
  },
  {
    id: "tax-basics",
    category: "Porezi",
    icon: ReceiptText,
    iconColor: "bg-secondary text-secondary-foreground",
    title: "Osnove poreza za mlade u Srbiji",
    excerpt: "Šta je porez na dohodak, kako se obračunava i zašto je važno razumeti svoju platnu listu.",
    readTime: 6,
    intro: "Porezi su obaveza, ali i prava. Razumevanje poreskog sistema u Srbiji pomaže ti da znaš koliko stvarno zarađuješ, iskoristiš olakšice na koje imaš pravo, i izbegneš neprijatna iznenađenja.",
    sections: [
      {
        heading: "Kako funkcioniše porez na plate u Srbiji?",
        body: "Zaposleni plaća doprinose: PIO 14%, zdravstveno 5.15%, osiguranje za nezaposlenost 0.75% (ukupno oko 19.9% od bruto). Poslodavac plaća dodatne doprinose (oko 17–18%, zavisi od kategorije). Porez na dohodak: 10% na oporezivi prihod; mesečno neoporezivo oslobođenje se menja — proveri Poresku upravu (https://www.purs.gov.rs/ ili https://www.poreskauprava.gov.rs/) za aktuelne iznose.",
        tip: "Oporezivi prihod = bruto plata − doprinosi − oslobođenje od 34.221 RSD.",
      },
      {
        heading: "Godišnji porez na dohodak",
        body: "Ako tvoji ukupni prihodi u jednoj godini pređu 3x prosečnu godišnju zaradu u Srbiji (oko 2.7 miliona RSD za 2024), plaćaš i godišnji porez na dohodak: 10% na iznos između 3x i 6x prosečne zarade, i 15% na sve iznad 6x prosečne zarade. Poreska prijava za godišnji porez podnosi se do 15. maja za prethodnu godinu, elektronski putem ePorezi portala.",
      },
      {
        heading: "Šta je platna lista i kako je čitati?",
        body: "Svaki zaposleni ima pravo na uvid u platnu listu. Ona prikazuje: bruto platu (šta te košta poslodavca), doprinose na teret zaposlenog (što se odbija od bruto), porez na dohodak, i neto platu (što dobijate na račun). Ukupna cena zaposlenog = bruto + doprinosi na teret poslodavca. Za bruto od 80.000 RSD, poslodavca košta oko 94.000 RSD.",
      },
      {
        heading: "Freelance i rad van klasičnog zaposlenja",
        body: "Ako radiš kao freelenser, imaš opcije: Preduzetnik paušalac: Flat-rate porez, idealan za manje prihode. Lična firma (d.o.o.): Više administracije, ali bolji za veće prihode. Ugovor o delu / autorski ugovor: Moguć, ali sa specifičnim poreskim obavezama. NBS i Poreska uprava sve strože kontrolišu prihode sa stranih platformi (Upwork, Fiverr, YouTube). Prijavi prihode – kazne za neprijavljene prihode su visoke.",
        tip: "Konsultuj poreskog savetnika pre nego se registruješ kao preduzetnik – pravilan izbor može uštedeti hiljade.",
      },
      {
        heading: "Poreske olakšice koje postoje",
        body: "Možeš smanjiti poreznu osnovu uplatama za određene vrste (dobrovoljno penzijsko, životno osiguranje, itd.); postoje gornji limiti koji se menjaju — proveri Poresku upravu za tačne aktuelne iznose i uslove.",
      },
      {
        heading: "Digitalni poreski alati",
        body: "ePorezi (eporezi.purs.gov.rs): Elektronska poreska prijava, uvid u poreski status. Elektronska poreska poštanska: Primaj poreskla rešenja. Fiskalni račun: Od 2022. svi računi imaju QR kod za provjeru. E-faktura sistem za preduzetnike: Obavezno od 2022.",
      },
    ],
    keyTakeaways: [
      "Zaposleni plaća ~20% bruto u doprinose + 10% porez na dohodak",
      "Oslobođenje od 34.221 RSD mesečno smanjuje poresku osnovu",
      "Godišnji porez se plaća ako prihodi prelaze 3x prosečnu zaradu",
      "Freelanceri moraju sami prijaviti prihode – kontrole su sve strože",
      "Dobrovoljno penzijsko i životno osiguranje daju poreske olakšice",
    ],
  },
  {
    id: "banking-system",
    category: "Bankovanje",
    icon: Landmark,
    iconColor: "bg-primary/10 text-primary",
    title: "Kako radi bankarski sistem u Srbiji",
    excerpt: "Razumej kako banke zarađuju novac, šta je NBS i kako ti to utiče na kamate i troškove.",
    readTime: 6,
    intro: "Da bi mudro koristio/la bankarske usluge, važno je razumeti kako bankarski sistem funkcioniše. To ti pomaže da pregovaraš bolje uslove, razumeš promene kamata, i zaštitis se kao klijent.",
    sections: [
      {
        heading: "Kako banke zarađuju?",
        body: "Banke uzimaju depozite (tvoj novac na štednji) i pozajmljuju ga kao kredite uz višu kamatu. Razlika između kamate koju plaćaju štedišama i one koju naplaćuju od dužnika naziva se kamatna marža – primarni prihod banke. Banke zarađuju i na: naknadama za usluge (vođenje računa, transakcije), provizijama od prodaje osiguranja i fondova, i prihodima od investiranja na finansijskim tržištima.",
      },
      {
        heading: "Uloga Narodne banke Srbije (NBS)",
        body: "NBS je centralna banka Srbije. Ona određuje referentnu kamatnu stopu (ključni kamatni instrument), reguliše i nadzire sve banke i finansijske institucije, štiti depozite građana do 50.000 EUR po Fondu osiguranja depozita, kontroliše inflaciju kroz monetarnu politiku, i reguliše devizno tržište i kurs dinara.",
        tip: "Referentna kamatna stopa NBS direktno utiče na kamate štednje i kredita u svim bankama.",
      },
      {
        heading: "Kako kamatne stope utiču na tebe?",
        body: "Kada NBS podiže referentnu stopu: krediti skuplje, štednja donosi više. Kada NBS snižava stopu: krediti jeftiniji, štednja manje isplativa. Mnogi stambeni krediti u Srbiji su vezani za EURIBOR (European Interbank Offered Rate) + fiksna marža banke. Kada EURIBOR raste (kao 2022–2023), rate stambenih kredita automatski rastu. Uvek pitaj bančina: da li je kamatna stopa fiksna ili promenljiva?",
      },
      {
        heading: "Zaštita tvojih depozita",
        body: "Depoziti u bankama u Srbiji obično su osigurani do 50.000 EUR po depozitu po banci putem Agencije za osiguranje depozita (AOD) (https://aod.rs/). Ako banka propadne, osiguranje pokriva depozite do propisanog limita. Ako imaš više od osiguranog iznosa, razmisli o raspoređivanju sredstava u više banaka. Osiguranje ne pokriva investicione fondove i akcije – samo klasične depozite.",
        tip: "Lista osiguranih banaka i detaljne informacije na aod.org.rs.",
      },
      {
        heading: "Bankarstvo u Srbiji – šta je dobro, šta nije",
        body: "Dobro: Osiguranje depozita do 50.000 EUR. NBS regulacija štiti korisnike. Digitalizacija napreduje, većina banaka ima dobre aplikacije. Loše: Naknade su visoke u poređenju sa EU bankama (10–500 RSD po transakciji u nekim bankama). Kamate na štednju su niže nego EU (mada sad rastu). Pristup određenim finansijskim produktima (ETF, derivati) je ograničen.",
      },
      {
        heading: "Bankarska terminologija koju trebaš znati",
        body: "Kamatna stopa: Cena pozajmljivanja novca (%). Anuitet: Jednaka mesečna rata koja pokriva i kamatu i glavnicu. Refinansiranje: Zamena kredita novim sa boljim uslovima. Kreditni skor: Ocena kreditne sposobnosti – bitna za dobijanje kredita. Osigurani depozit: Zaštićen do 50.000 EUR. Lombardni kredit: Kredit uz zalog vrednosnih papira ili zlata. SWIFT/IBAN: Međunarodni bankarski kodovi za transfer novca.",
      },
    ],
    keyTakeaways: [
      "NBS kontroliše monetarnu politiku i štiti korisnike",
      "Depoziti osigurani do 50.000 EUR po banci",
      "Fiksna vs. promenljiva kamatna stopa – uvek pitaj pre potpisivanja",
      "Banke zaradjuju razlikom kamate na kredite i štednju",
      "Promenljiva kamata EURIBOR može povećati tvoju ratu",
    ],
  },
  {
    id: "budgeting-tips",
    category: "Budžet",
    icon: BookOpen,
    iconColor: "bg-accent/20 text-accent-foreground",
    title: "12 saveta za pametno budžetiranje",
    excerpt: "Praktični saveti za praćenje troškova, automatizaciju štednje i eliminisanje finansijskog stresa.",
    readTime: 5,
    badge: "Top lista",
    intro: "Budžetiranje nije lišavanje zadovoljstava – to je planiranje kako da imaš više novca za ono što ti zaista znači. Ovo je 12 saveta koji rade u stvarnom životu srpskih mladih.",
    sections: [
      {
        heading: "1–3. Razumevanje tvojih troškova",
        body: "1. Prati svaki dinar 30 dana: Pre nego što počneš, shvati gde ti novac zaista ide. Koristi aplikaciju (Spendee, Money Manager) ili Excel. Mnogi se iznenade – kafa dva puta dnevno može koštati oko 24.000 RSD godišnje. 2. Kategoriziraj trošak: podeli u 'Potrebe' i 'Želje'. Potrošio si 8.000 RSD na izlaske? To je želja, ne potreba. 3. Nađi 'razbojnike budžeta': pretplate koje retko koristiš, impulzivne kupovine, nepotrebna putovanja taksijem.",
        tip: "Pametni telefon je zapravo dobar alat za praćenje troškova – fotografiši svaki račun.",
      },
      {
        heading: "4–6. Automatizacija je ključ",
        body: "4. Stavi štednju na 'autopilot': Postavi automatski prenos na dan plate – pre nego potrošiš. Što više automatizuješ, manje zavisno od 'da li ću imati volju'. 5. Automatsko plaćanje računa: Izbegni kašnjenje i kazne automatskim plaćanjem fiksnih troškova. 6. Odvojeni računi za kategorije: Tekući za potrebe, kartice za želje, poseban štedni za fond. Mentalna separacija pomaže.",
      },
      {
        heading: "7–9. Psihologija trošenja",
        body: "7. Pravilo 24 sata: Sačekaj dan pre bilo koje kupovine iznad 3.000 RSD. 80% puta, sutradan ne budeš hteo/la to da kupiš. 8. Ukloni sačuvane kartice sa online prodavnica: Ako moraš da uneseš broj kartice ručno, mnoge kupovine ostaješ neobavljene. 9. Pregled pretplata: Svaki kvartal proveri sve mesečne pretplate. Netflix, Spotify, gym, delivery – da li koristiš sve?",
        tip: "Prosečna mlada osoba troši 3.000–8.000 RSD mesečno na pretplate koje slabo koristi.",
      },
      {
        heading: "10–12. Dugoročno razmišljanje",
        body: "10. Konkretni finansijski ciljevi: 'Uštediću 200.000 RSD za godinu dana za akontaciju' je bolje od 'trudiću se da štedim'. Konkretni ciljevi imaju rok i iznos. 11. Mesečni pregled (15 minuta): Na kraju meseca proveri: da li sam ostao/la u budžetu? Šta je iznenada povećalo troškove? Šta mogu promeniti sledeći mesec? 12. Praznici i posebne prilike: Unapred planiraj troškove (Božić, Nova Godina, rodjendani). Odloži mesečno malo u 'fond za praznike' da te ne iznenade.",
      },
    ],
    keyTakeaways: [
      "Prati troškove 30 dana pre nego počneš budžetirati",
      "Automatizuj štednju – čovek sa automatskim prenosom uvek uštedi više",
      "Pravilo 24 sata eliminiše 80% impulzivnih kupovina",
      "Mesečni pregled od 15 minuta može uštedeti hiljade",
      "Konkretni, vremenski ograničeni ciljevi su jedini ciljevi koji funkcionišu",
    ],
  },
  {
    id: "student-finance",
    category: "Studenti",
    icon: BookOpen,
    iconColor: "bg-secondary text-secondary-foreground",
    title: "Finansije za studente – kako preživeti i ne zaduživati se",
    excerpt: "Stipendije, studentski posao, studentski računi i kako upravljati ograničenim budžetom.",
    readTime: 6,
    badge: "Novo",
    intro: "Studentski period je idealan da naučiš finansijsku disciplinu – troškovi su manji, a navike koje izgradiš traju ceo život. Evo konkretnih saveta za srpske studente.",
    sections: [
      {
        heading: "Stipendije i finansijska podrška studentima",
        body: "Republičke i lokalne stipendije dodeljuje Ministarstvo prosvete i lokalne samouprave; iznosi i uslovi variraju — proveri zvanični sajt Ministarstva prosvete (https://www.mpn.gov.rs/) i eUprave (https://euprava.gov.rs/) za aktuelne iznose i rokove prijave.",
        tip: "Mnogi studenti ne znaju da postoje opštinske stipendije. Proveri na sajtu svoje opštine.",
      },
      {
        heading: "Studentski račun i pogodnosti",
        body: "Skoro sve banke imaju studentske pakete: bez mesečnih naknada, besplatna debitna kartica, i popusti. Studentska kartica nije samo za biblioteku – Studentske unije pregovaraju popuste u restoranima, prevoz, kulturnim ustanovama. Iskoristi Interrail ili BusAbout za povoljno putovanje Evropom sa studentskim ID. Studentski dom i menza: Ako ispunjavaš uslove, studentski smeštaj i prehrana su znatno jeftiniji.",
      },
      {
        heading: "Studentski posao i prihodi",
        body: "Studentska zadruga: Legalan način da radiš dok studiješ. Poreske olakšice za studente do 26 godina. Freelance online: programiranje, dizajn, prevod, copywriting – može se raditi uz studije. Plaćena praksa: Mnoge firme plaćaju stažiste 30.000–60.000 RSD mesečno. Podučavanje: privatni časovi su dobro plaćeni i fleksibilni. Preporučeni prihod: Pokušaj pokriti bar 30–50% troškova iz sopstvenih prihoda.",
      },
      {
        heading: "Studentski budžet – gde se troši novac?",
        body: "Tipični troškovi studenta u Srbiji: Kirija (izvan doma): 20.000–40.000 RSD. Hrana (dom/menza vs. restorani): 10.000–20.000 RSD. Prevoz: varira po gradu; proveri cenu studentske mesečne karte u svom gradu. Udžbenici i materijali: 2.000–5.000 RSD. Zabava i izlasci: Ovo je gde 'deca' troše previše. Cilj: Max 15% budžeta.",
        tip: "Studentska mesečna karta u Beogradu ima cenu koja se menja — proveri GSP cenovnik (https://www.gsp.rs/) za tačnu cenu.",
      },
      {
        heading: "Studentski kredit – da ili ne?",
        body: "Studentski kredit: Pro – ulaganje u obrazovanje koje povećava zaradu. Kontra – kredit bez prihoda stvara loše navike i stress. Preporuka: Prvo iscrpi stipendije, studentski posao, i porodičnu podršku. Ako uzmeš kredit, uzmi minimum potrebnog i počni vraćati čim zaposliš. Izbegavaj: Potrošačke kredite za opremanje stana, laptop, telefon ili putovanje. Iznajmi, kupi polovno, ili sačekaj – kredit za tromu robu nije pametno.",
      },
      {
        heading: "Navike koje izgradiš kao student traju ceo život",
        body: "Istraživanja pokazuju da finansijske navike uspostavljene do 25. godine oblikuju ceo finansijki život. Student koji nauči štedeti 10% stipendije (1.200 RSD mesečno) često postane zaposleni koji štedi 10% plate. Počni SADA, čak i sa malim iznosima. 3.000 RSD uštedeno svakog meseca tokom 4 godine studija = 144.000 RSD + kamata – dovoljan fond za hitne slučajeve pri prvom zaposlenju.",
      },
    ],
    keyTakeaways: [
      "Proveri republicke, lokalne i kompanijske stipendije – mnogi ih ne iskoriste",
      "Studentski račun bez naknade je standard – ne plaćaj za njega",
      "Studentska zadruga = legalan posao bez komplikacija",
      "Max 15% budžeta na zabavu i izlaske",
      "Navike koje stekneš kao student pratiće te ceo život",
    ],
  },
]

const categoryFilters = ["Sve", "Bankovanje", "Kartice", "Štednja", "Sigurnost", "Investiranje", "Dugovi", "Porezi", "Budžet", "Studenti"]

export function EducationSection() {
  const [activeCategory, setActiveCategory] = useState("Sve")
  const [openArticleId, setOpenArticleId] = useState<string | null>(null)

  const filtered = activeCategory === "Sve" ? articles : articles.filter((a) => a.category === activeCategory)
  const openArticle = articles.find((a) => a.id === openArticleId) ?? null

  if (openArticle) {
    const totalSections = openArticle.sections.length
    return (
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Back button */}
        <button
          onClick={() => setOpenArticleId(null)}
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors group"
        >
          <ArrowLeft className="size-4 group-hover:-translate-x-0.5 transition-transform" />
          Nazad na sve članke
        </button>

        {/* Hero header with decorative background */}
        <div className="relative mb-10 rounded-3xl overflow-hidden">
          {/* Decorative gradient background */}
          <div className={cn(
            "absolute inset-0 opacity-10",
            openArticle.category === "Sigurnost" || openArticle.category === "Dugovi"
              ? "bg-gradient-to-br from-destructive via-destructive/50 to-transparent"
              : "bg-gradient-to-br from-primary via-primary/50 to-transparent"
          )} />
          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-5">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
              <rect width="100" height="100" fill="url(#grid)"/>
            </svg>
          </div>
          
          <div className="relative p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              {/* Large icon */}
              <div className={cn(
                "size-20 md:size-24 rounded-2xl flex items-center justify-center shrink-0 shadow-lg",
                openArticle.iconColor
              )}>
                <openArticle.icon className="size-10 md:size-12" />
              </div>
              
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wide">
                    {openArticle.category}
                  </span>
                  {openArticle.badge && (
                    <span className="text-xs font-semibold bg-accent text-accent-foreground px-3 py-1 rounded-full">
                      {openArticle.badge}
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
                    <Clock className="size-3" />
                    {openArticle.readTime} min
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
                    <BookOpen className="size-3" />
                    {totalSections} sekcija
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-tight text-balance mb-4">
                  {openArticle.title}
                </h1>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {openArticle.intro}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick stats bar */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="bg-card border border-border rounded-2xl p-4 text-center">
            <div className="text-2xl font-bold text-primary">{totalSections}</div>
            <div className="text-xs text-muted-foreground">Sekcija</div>
          </div>
          <div className="bg-card border border-border rounded-2xl p-4 text-center">
            <div className="text-2xl font-bold text-primary">{openArticle.keyTakeaways.length}</div>
            <div className="text-xs text-muted-foreground">Ključnih poruka</div>
          </div>
          <div className="bg-card border border-border rounded-2xl p-4 text-center">
            <div className="text-2xl font-bold text-primary">{openArticle.readTime}</div>
            <div className="text-xs text-muted-foreground">Minuta čitanja</div>
          </div>
        </div>

        {/* Table of contents */}
        <div className="bg-muted/50 border border-border rounded-2xl p-6 mb-10">
          <h2 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
            <BookOpen className="size-4 text-primary" />
            Sadržaj članka
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {openArticle.sections.map((section, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <span className="size-6 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                  {i + 1}
                </span>
                <span className="truncate">{section.heading}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Article content with numbered sections */}
        <div className="space-y-6">
          {openArticle.sections.map((section, i) => (
            <div key={i} className="bg-card rounded-2xl border border-border overflow-hidden">
              {/* Section header with number */}
              <div className="flex items-center gap-4 p-5 border-b border-border bg-muted/30">
                <div className="size-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shrink-0">
                  {i + 1}
                </div>
                <h2 className="text-lg font-bold text-foreground">{section.heading}</h2>
              </div>
              
              {/* Section body */}
              <div className="p-5">
                <div className="space-y-3">
                  {section.body.split("\n").map((line, j) => {
                    if (!line.trim()) return null
                    // Check if line starts with bullet point marker
                    const isBullet = line.trim().startsWith("•") || line.trim().startsWith("-")
                    const isNumbered = /^\d+\./.test(line.trim())
                    
                    if (isBullet) {
                      return (
                        <div key={j} className="flex items-start gap-3 pl-2">
                          <div className="size-1.5 rounded-full bg-primary mt-2 shrink-0" />
                          <p className="text-muted-foreground leading-relaxed text-sm">
                            {line.trim().replace(/^[•\-]\s*/, "")}
                          </p>
                        </div>
                      )
                    }
                    if (isNumbered) {
                      const num = line.trim().match(/^(\d+)\./)?.[1]
                      const text = line.trim().replace(/^\d+\.\s*/, "")
                      return (
                        <div key={j} className="flex items-start gap-3 pl-2">
                          <span className="size-6 rounded-md bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                            {num}
                          </span>
                          <p className="text-muted-foreground leading-relaxed text-sm">
                            {text}
                          </p>
                        </div>
                      )
                    }
                    return (
                      <p key={j} className="text-muted-foreground leading-relaxed text-sm">
                        {line}
                      </p>
                    )
                  })}
                </div>
                
                {/* Tip box with icon */}
                {section.tip && (
                  <div className="mt-5 flex items-start gap-3 p-4 bg-primary/5 border border-primary/20 rounded-xl">
                    <div className="size-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                      <Lightbulb className="size-4 text-primary" />
                    </div>
                    <div>
                      <span className="text-primary font-bold text-xs block mb-1">PRO SAVET</span>
                      <p className="text-sm text-foreground leading-relaxed">{section.tip}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Key takeaways with visual enhancement */}
        <div className="mt-10 relative overflow-hidden rounded-3xl">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
          
          <div className="relative border-2 border-primary/20 rounded-3xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="size-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
                <CheckCircle2 className="size-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground">Ključne poruke</h2>
                <p className="text-xs text-muted-foreground">Najvažnije iz ovog članka</p>
              </div>
            </div>
            <div className="grid gap-3">
              {openArticle.keyTakeaways.map((point, i) => (
                <div key={i} className="flex items-start gap-3 bg-card/80 backdrop-blur-sm rounded-xl p-4 border border-border">
                  <div className="size-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <span className="text-sm text-foreground leading-relaxed">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer action */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => setOpenArticleId(null)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="size-4" /> Nazad na sve članke
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Enhanced header with stats */}
      <div className="mb-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <BookOpen className="size-5 text-primary" />
              </div>
              <span className="text-xs font-bold text-primary uppercase tracking-wide">Edukacija</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 text-balance">Finansijsko obrazovanje</h2>
            <p className="text-muted-foreground max-w-xl leading-relaxed">
              Detaljni vodiči i članci prilagođeni srpskim mladima od otvaranja računa do investiranja.
            </p>
          </div>
          
          {/* Quick stats */}
          <div className="flex items-center gap-4">
            <div className="text-center px-4 py-2 bg-card border border-border rounded-xl">
              <div className="text-2xl font-bold text-primary">{articles.length}</div>
              <div className="text-xs text-muted-foreground">Članaka</div>
            </div>
            <div className="text-center px-4 py-2 bg-card border border-border rounded-xl">
              <div className="text-2xl font-bold text-primary">{categoryFilters.length - 1}</div>
              <div className="text-xs text-muted-foreground">Kategorija</div>
            </div>
            <div className="text-center px-4 py-2 bg-card border border-border rounded-xl">
              <div className="text-2xl font-bold text-primary">{articles.reduce((acc, a) => acc + a.readTime, 0)}</div>
              <div className="text-xs text-muted-foreground">Min sadržaja</div>
            </div>
          </div>
        </div>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categoryFilters.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium transition-colors",
              activeCategory === cat
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((article) => (
          <button
            key={article.id}
            onClick={() => setOpenArticleId(article.id)}
            className="group text-left bg-card rounded-2xl border border-border hover:border-primary/40 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col relative"
          >
            {/* Decorative gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Top decorative bar */}
            <div className={cn(
              "h-1.5 w-full",
              article.category === "Sigurnost" || article.category === "Dugovi"
                ? "bg-gradient-to-r from-destructive/60 via-destructive/30 to-transparent"
                : "bg-gradient-to-r from-primary/60 via-primary/30 to-transparent"
            )} />
            
            <div className="p-6 flex flex-col flex-1 relative">
              <div className="flex items-start justify-between mb-4">
                <div className={cn(
                  "size-12 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300",
                  article.iconColor
                )}>
                  <article.icon className="size-6" />
                </div>
                <div className="flex flex-col items-end gap-1">
                  {article.badge && (
                    <span className={cn(
                      "text-xs font-semibold px-2.5 py-1 rounded-full",
                      article.badge === "Važno" 
                        ? "bg-destructive/10 text-destructive"
                        : article.badge === "Novo"
                        ? "bg-accent text-accent-foreground"
                        : "bg-primary/10 text-primary"
                    )}>
                      {article.badge}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2 mb-3">
                <span className={cn(
                  "text-xs font-bold px-2 py-0.5 rounded-md uppercase tracking-wide",
                  article.category === "Sigurnost" || article.category === "Dugovi"
                    ? "bg-destructive/10 text-destructive"
                    : "bg-primary/10 text-primary"
                )}>
                  {article.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="size-3" />
                  {article.readTime} min
                </span>
              </div>
              
              <h3 className="font-bold text-foreground text-base leading-snug mb-2 group-hover:text-primary transition-colors text-balance">
                {article.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">{article.excerpt}</p>
              
              {/* Bottom action area */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <BookOpen className="size-3.5" />
                    <span>{articles.find(a => a.id === article.id)?.sections.length || 0} sekcija</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-primary text-xs font-medium group-hover:translate-x-1 transition-transform">
                  Čitaj <ChevronRight className="size-4" />
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}
