// Portfolio from distinct.co.me/en/portfolio, with case-study copy.
// Case texts are drafts written from the services delivered — verify them with
// the client before launch. Add measurable outcomes to `metrics`, e.g.
//   metrics: [{ value: '+38%', label: { me: 'direktnih rezervacija', en: 'direct bookings' } }]
// When `metrics` is empty the result section lists what was delivered instead.

export const industries = {
  hospitality: { me: 'Hoteli i turizam', en: 'Hospitality & tourism' },
  retail: { me: 'Retail i lifestyle', en: 'Retail & lifestyle' },
  interiors: { me: 'Enterijer i dizajn', en: 'Interiors & design' },
  professional: { me: 'Profesionalne usluge', en: 'Professional services' },
  health: { me: 'Zdravstvo', en: 'Healthcare' },
  yachting: { me: 'Nautika', en: 'Yachting' },
  tech: { me: 'Tehnologija', en: 'Technology' },
  newbiz: { me: 'Novi biznisi', en: 'New businesses' },
  creative: { me: 'Kreativna industrija', en: 'Creative industry' },
  business: { me: 'Biznis', en: 'Business' },
};

const MNE = { me: 'Crna Gora', en: 'Montenegro' };

export const projects = [
  {
    slug: 'one-and-only',
    name: 'One&Only Portonovi',
    img: 'one-and-only.png',
    industry: 'hospitality',
    location: { me: 'Portonovi, Crna Gora', en: 'Portonovi, Montenegro' },
    tags: ['Graphic Design'],
    intro: { me: 'Grafički dizajn za jedan od najluksuznijih resorta na Jadranu.', en: 'Graphic design for one of the most luxurious resorts on the Adriatic.' },
    problem: {
      me: 'Globalni luksuzni brend ima stroge vizuelne standarde, a lokalnim aktivnostima resorta trebali su materijali koji ih poštuju do detalja — brzo i bez kompromisa u kvalitetu.',
      en: "A global luxury brand comes with strict visual standards, and the resort's local activities needed materials that respect them down to the detail — fast, and without compromising on quality.",
    },
    solution: {
      me: 'Dizajnirali smo grafičke materijale u okviru brend smjernica One&Only, prilagođene lokalnoj publici i događajima u Portonoviju.',
      en: 'We designed graphic materials within the One&Only brand guidelines, adapted to the local audience and events in Portonovi.',
    },
    result: {
      me: 'Komunikacija resorta u Crnoj Gori zadržala je dosljedan, prepoznatljiv luksuzni izraz globalnog brenda.',
      en: "The resort's communication in Montenegro kept the consistent, recognisable luxury voice of the global brand.",
    },
    metrics: [],
  },
  {
    slug: 'jumeirah',
    name: 'Jumeirah Marsa Al Arab',
    img: 'jumeirah.jpg',
    industry: 'hospitality',
    location: { me: 'Dubai, UAE', en: 'Dubai, UAE' },
    tags: ['Graphic Design'],
    intro: { me: 'Grafički dizajn za ikonu luksuznog ugostiteljstva u Dubaiju.', en: 'Graphic design for an icon of luxury hospitality in Dubai.' },
    problem: {
      me: 'Za resort u Dubaiju trebali su grafički materijali na nivou jednog od najprestižnijih hotelskih brendova na svijetu.',
      en: "A resort in Dubai needed graphic materials worthy of one of the world's most prestigious hotel brands.",
    },
    solution: {
      me: 'Radili smo na daljinu, unutar Jumeirah brend sistema, sa jasnim procesom revizija i rokova.',
      en: 'We worked remotely within the Jumeirah brand system, with a clear review and delivery process.',
    },
    result: {
      me: 'Materijali isporučeni na nivou međunarodnog luksuznog brenda — iz Podgorice.',
      en: 'Materials delivered to the standard of an international luxury brand — from Podgorica.',
    },
    metrics: [],
  },
  {
    slug: 'habitat-montenegro',
    name: 'Habitat Montenegro',
    img: 'habitat-montenegro.png',
    industry: 'retail',
    location: MNE,
    tags: ['Digital Transformation', 'Organisational Design', 'Operations Consulting', 'Accounting'],
    intro: { me: 'Organizacija, procesi i finansije za brend koji raste.', en: 'Organisation, processes and finance for a growing brand.' },
    problem: {
      me: 'Kako je poslovanje raslo, ručni procesi i nejasne uloge u timu počeli su da usporavaju svakodnevni rad i otežavaju pregled brojki.',
      en: 'As the business grew, manual processes and unclear roles began to slow down daily work and blur the view of the numbers.',
    },
    solution: {
      me: 'Redizajnirali smo organizacionu strukturu, uveli digitalne alate za ključne procese i preuzeli računovodstvo uz redovno izvještavanje.',
      en: 'We redesigned the organisational structure, introduced digital tools for key processes and took over accounting with regular reporting.',
    },
    result: {
      me: 'Jasne odgovornosti, brži procesi i finansijska slika koja je uvijek ažurna.',
      en: 'Clear responsibilities, faster processes and a financial picture that is always up to date.',
    },
    metrics: [],
  },
  {
    slug: 'oblun',
    name: 'Oblun Eco Resort',
    img: 'oblun.png',
    industry: 'hospitality',
    location: MNE,
    tags: ['Branding', 'Digital Marketing', 'Photography', 'Accounting'],
    intro: { me: 'Brend, marketing i finansije za eko resort.', en: 'Brand, marketing and finance for an eco resort.' },
    problem: {
      me: 'Eko resort trebalo je pozicionirati na tržištu i do gostiju doći kroz digitalne kanale — uz uredne finansije od prvog dana.',
      en: 'The eco resort had to be positioned in the market and reach guests through digital channels — with tidy finances from day one.',
    },
    solution: {
      me: 'Kreirali smo brend identitet, fotografisali prostor, vodili digitalni marketing i preuzeli računovodstvo.',
      en: 'We created the brand identity, photographed the property, ran digital marketing and took over accounting.',
    },
    result: {
      me: 'Jedan partner za sve — brend, sadržaj i brojke koji govore istim jezikom.',
      en: 'One partner for everything — brand, content and numbers that speak the same language.',
    },
    metrics: [],
  },
  {
    slug: 'doding',
    name: 'Doding',
    img: 'doding.png',
    industry: 'interiors',
    location: MNE,
    tags: ['Digital Transformation', 'Operations Consulting', 'Digital Marketing', 'Photography'],
    intro: { me: 'Digitalna transformacija i marketing za studio enterijera.', en: 'Digital transformation and marketing for an interiors studio.' },
    problem: {
      me: 'Kvalitetni projekti enterijera nisu bili dovoljno vidljivi online, a interni procesi oslanjali su se na ručni rad.',
      en: "High-quality interior projects weren't visible enough online, and internal processes relied on manual work.",
    },
    solution: {
      me: 'Digitalizovali smo ključne operativne procese, fotografisali realizovane projekte i postavili digitalni marketing.',
      en: 'We digitised key operational processes, photographed completed projects and set up digital marketing.',
    },
    result: {
      me: 'Efikasniji tim i portfolio koji prodaje — i online i uživo.',
      en: 'A more efficient team and a portfolio that sells — online and in person.',
    },
    metrics: [],
  },
  {
    slug: 'habitat-flowers',
    name: 'Habitat Flowers & Gifts',
    img: 'habitat-flowers.png',
    industry: 'retail',
    location: MNE,
    tags: ['Branding', 'Marketing Plan and Strategy', 'Digital Marketing', 'Photography'],
    intro: { me: 'Brend i marketing za cvjećaru i poklon butik.', en: 'Brand and marketing for a flower and gift boutique.' },
    problem: {
      me: 'Cvjećari je trebao identitet koji se izdvaja i plan kako da dođe do kupaca na konkurentnom tržištu.',
      en: 'The flower shop needed an identity that stands out and a plan to reach customers in a competitive market.',
    },
    solution: {
      me: 'Dizajnirali smo brend, napravili marketing plan, fotografisali proizvode i vodili digitalni marketing.',
      en: 'We designed the brand, built a marketing plan, photographed the products and ran digital marketing.',
    },
    result: {
      me: 'Prepoznatljiv brend sa jasnim tonom i sadržajem koji kupci dijele.',
      en: 'A recognisable brand with a clear voice and content customers share.',
    },
    metrics: [],
  },
  {
    slug: 'forza-porto',
    name: 'Forza Porto',
    img: 'forza-porto.png',
    industry: 'hospitality',
    location: MNE,
    tags: ['Digital Marketing', 'Photography', 'Graphic Design'],
    intro: { me: 'Digitalni marketing, fotografija i dizajn za ugostiteljski brend.', en: 'Digital marketing, photography and design for a hospitality brand.' },
    problem: {
      me: 'Brendu je trebalo više vidljivosti i vizuelni sadržaj koji prenosi atmosferu prostora.',
      en: 'The brand needed more visibility and visual content that conveys the atmosphere of the place.',
    },
    solution: {
      me: 'Snimili smo fotografije, dizajnirali materijale i vodili digitalne kampanje.',
      en: 'We shot photography, designed materials and ran digital campaigns.',
    },
    result: {
      me: 'Dosljedna vizuelna komunikacija na svim kanalima.',
      en: 'Consistent visual communication across every channel.',
    },
    metrics: [],
  },
  {
    slug: 'sofa-bed',
    name: 'Sofa Bed',
    img: 'sofa-bed.png',
    industry: 'retail',
    location: MNE,
    tags: ['Digital Transformation', 'Organisational Design', 'Branding', 'Accounting'],
    intro: { me: 'Od organizacije do brenda za prodavnicu namještaja i dekora.', en: 'From organisation to brand for a homeware store.' },
    problem: {
      me: 'Prodavnica je imala dobar asortiman, ali joj je trebao jači brend, organizovaniji tim i digitalni procesi koji prate rast.',
      en: 'The store had a great range but needed a stronger brand, a more organised team and digital processes that keep up with growth.',
    },
    solution: {
      me: 'Postavili smo organizacionu strukturu, uveli digitalne alate, osvježili brend i preuzeli računovodstvo.',
      en: 'We set up the organisational structure, introduced digital tools, refreshed the brand and took over accounting.',
    },
    result: {
      me: 'Brend i poslovanje spremni za sljedeću fazu rasta.',
      en: 'A brand and an operation ready for the next stage of growth.',
    },
    metrics: [],
  },
  {
    slug: 'forza-hotels',
    name: 'Forza Hotels',
    img: 'forza-hotels.jpg',
    industry: 'hospitality',
    location: MNE,
    tags: ['Digital Marketing', 'Photography'],
    intro: { me: 'Digitalni marketing i fotografija za hotelsku grupu.', en: 'Digital marketing and photography for a hotel group.' },
    problem: {
      me: 'Hotelskoj grupi trebao je jedinstven vizuelni jezik i digitalno prisustvo za više objekata.',
      en: 'A hotel group needed a unified visual language and digital presence across several properties.',
    },
    solution: {
      me: 'Fotografisali smo objekte i postavili digitalni marketing sa zajedničkim standardom za sve hotele.',
      en: 'We photographed the properties and set up digital marketing with a shared standard for every hotel.',
    },
    result: {
      me: 'Prepoznatljiv izraz grupe, uz prostor da svaki hotel pokaže svoj karakter.',
      en: 'A recognisable group identity that still lets each hotel show its own character.',
    },
    metrics: [],
  },
  {
    slug: 'asys',
    name: 'ASYS',
    img: 'asys.png',
    industry: 'yachting',
    location: MNE,
    tags: ['Visual Identity', 'Website'],
    intro: { me: 'Vizuelni identitet i web sajt za Adriatic Superyacht Services.', en: 'Visual identity and website for Adriatic Superyacht Services.' },
    problem: {
      me: 'Klijenti iz svijeta superjahti očekuju premium nivo od prvog kontakta — a brend to još nije prenosio.',
      en: "Superyacht clients expect a premium experience from first contact — and the brand didn't convey that yet.",
    },
    solution: {
      me: 'Dizajnirali smo identitet inspirisan jedrom i morem i web sajt koji jasno predstavlja usluge na Jadranu.',
      en: 'We designed an identity inspired by sail and sea, and a website that clearly presents their Adriatic services.',
    },
    result: {
      me: 'Brend koji stoji rame uz rame sa međunarodnom konkurencijom.',
      en: 'A brand that stands shoulder to shoulder with international competitors.',
    },
    metrics: [],
  },
  {
    slug: 'authentic-luxury',
    name: 'Authentic Luxury',
    img: 'authentic-luxury.jpg',
    industry: 'retail',
    tags: ['Visual Identity'],
    intro: { me: 'Vizuelni identitet za luksuzni brend.', en: 'Visual identity for a luxury brand.' },
    problem: {
      me: 'Brendu je trebao identitet koji djeluje elegantno, sigurno i bezvremeno.',
      en: 'The brand needed an identity that feels elegant, confident and timeless.',
    },
    solution: {
      me: 'Kreirali smo znak i vizuelni sistem u zlatnim i toplim tonovima, sa jasnim pravilima primjene.',
      en: 'We created a mark and visual system in gold and warm tones, with clear usage rules.',
    },
    result: {
      me: 'Identitet koji komunicira vrijednost prije prve riječi.',
      en: 'An identity that communicates value before a single word is said.',
    },
    metrics: [],
  },
  {
    slug: 'icentar',
    name: 'iCentar',
    img: 'icentar.png',
    industry: 'tech',
    location: MNE,
    tags: ['Event Management'],
    intro: { me: 'Organizacija događaja za Apple Premium Reseller.', en: 'Event management for an Apple Premium Reseller.' },
    problem: {
      me: 'Događaji za kupce i partnere trebali su da prate standard Apple iskustva.',
      en: 'Events for customers and partners had to match the standard of the Apple experience.',
    },
    solution: {
      me: 'Planirali smo i vodili događaje — od koncepta i komunikacije do realizacije na dan.',
      en: 'We planned and ran events — from concept and communication to on-the-day delivery.',
    },
    result: {
      me: 'Događaji koji jačaju odnos sa kupcima i brendom.',
      en: 'Events that strengthen the relationship with customers and the brand.',
    },
    metrics: [],
  },
  {
    slug: 'pamico',
    name: 'Pamico',
    img: 'pamico.jpg',
    industry: 'newbiz',
    location: MNE,
    tags: ['Company Registration', 'Accounting', 'Operations Consulting', 'Visual Identity'],
    intro: { me: 'Od registracije firme do identiteta za optiku.', en: 'From company registration to identity for an optician.' },
    problem: {
      me: 'Osnivačima je trebao partner koji vodi kroz registraciju, postavlja poslovanje i daje brendu lice — sve odjednom.',
      en: 'The founders needed a partner to guide them through registration, set up operations and give the brand a face — all at once.',
    },
    solution: {
      me: 'Registrovali smo firmu, postavili računovodstvo i operativne procese i dizajnirali vizuelni identitet.',
      en: 'We registered the company, set up accounting and operations, and designed the visual identity.',
    },
    result: {
      me: 'Biznis spreman za rad od prvog dana, sa jednim partnerom za sve.',
      en: 'A business ready to operate from day one, with a single partner for everything.',
    },
    metrics: [],
  },
  {
    slug: 'one-design',
    name: 'One Design',
    img: 'one-design.png',
    industry: 'interiors',
    location: MNE,
    tags: ['Accounting', 'Operations Consulting', 'Photography'],
    intro: { me: 'Računovodstvo, operativa i fotografija za dizajn studio.', en: 'Accounting, operations and photography for a design studio.' },
    problem: {
      me: 'Kreativni tim želio je više vremena za dizajn, a manje za administraciju i papirologiju.',
      en: 'A creative team wanted more time for design and less for admin and paperwork.',
    },
    solution: {
      me: 'Preuzeli smo računovodstvo, uredili operativne procese i fotografisali realizovane projekte.',
      en: 'We took over accounting, streamlined operations and photographed completed projects.',
    },
    result: {
      me: 'Studio fokusiran na ono što najbolje radi.',
      en: 'A studio focused on what it does best.',
    },
    metrics: [],
  },
  {
    slug: 'bond-up',
    name: 'Bond Up Shanghai',
    img: 'bond-up.png',
    industry: 'business',
    location: { me: 'Šangaj, Kina', en: 'Shanghai, China' },
    tags: ['Visual Identity'],
    intro: { me: 'Vizuelni identitet za kompaniju iz Šangaja.', en: 'Visual identity for a company from Shanghai.' },
    problem: {
      me: 'Brendu je trebao identitet razumljiv i na istočnom i na zapadnom tržištu.',
      en: 'The brand needed an identity that reads well in both Eastern and Western markets.',
    },
    solution: {
      me: 'Dizajnirali smo dinamičan znak i vizuelni sistem jednostavan za primjenu na svim kanalima.',
      en: "We designed a dynamic mark and a visual system that's easy to apply across all channels.",
    },
    result: {
      me: 'Identitet koji putuje preko granica.',
      en: 'An identity that travels across borders.',
    },
    metrics: [],
  },
  {
    slug: 'cosmonauts',
    name: 'Cosmonauts',
    img: 'cosmonauts.png',
    industry: 'creative',
    tags: ['Visual Identity'],
    intro: { me: 'Vizuelni identitet za kreativni tim.', en: 'Visual identity for a creative team.' },
    problem: {
      me: 'Timu je trebao znak koji prenosi energiju, kretanje i zajedništvo.',
      en: 'The team needed a mark that conveys energy, movement and togetherness.',
    },
    solution: {
      me: 'Kreirali smo znak od tačaka koje se okupljaju u slovo C, sa sistemom koji radi u svim veličinama.',
      en: 'We created a mark of dots gathering into the letter C, with a system that works at every size.',
    },
    result: {
      me: 'Upečatljiv identitet koji se lako pamti.',
      en: "A striking identity that's easy to remember.",
    },
    metrics: [],
  },
  {
    slug: 'jobzilla',
    name: 'Jobzilla',
    img: 'jobzilla.png',
    industry: 'tech',
    location: MNE,
    tags: ['Social Media Strategy'],
    intro: { me: 'Strategija društvenih mreža za portal za zapošljavanje.', en: 'Social media strategy for a job portal.' },
    problem: {
      me: 'Portal je trebao da dopre i do kandidata i do poslodavaca — dvije publike sa različitim potrebama.',
      en: 'The portal had to reach both candidates and employers — two audiences with different needs.',
    },
    solution: {
      me: 'Postavili smo strategiju društvenih mreža sa jasnim stubovima sadržaja za obje publike.',
      en: 'We built a social media strategy with clear content pillars for both audiences.',
    },
    result: {
      me: 'Fokusirana komunikacija koja gradi zajednicu.',
      en: 'Focused communication that builds a community.',
    },
    metrics: [],
  },
  {
    slug: 'phci',
    name: 'PHCI Doktorica Mica',
    img: 'phci.png',
    industry: 'health',
    location: MNE,
    tags: ['Financial Modeling', 'Operations Consulting', 'Accounting'],
    intro: { me: 'Finansijski model i operativa za privatnu zdravstvenu ustanovu.', en: 'Financial model and operations for a private healthcare practice.' },
    problem: {
      me: 'Privatnoj praksi trebala je jasna slika troškova i prihoda kako bi sigurno planirala rast.',
      en: 'The private practice needed a clear view of costs and revenue to plan growth with confidence.',
    },
    solution: {
      me: 'Izradili smo finansijski model, uredili operativne procese i preuzeli računovodstvo.',
      en: 'We built a financial model, organised operations and took over accounting.',
    },
    result: {
      me: 'Odluke zasnovane na brojkama, a ne na procjeni.',
      en: 'Decisions based on numbers, not guesswork.',
    },
    metrics: [],
  },
  {
    slug: 'aal-ana',
    name: 'AAL Ana Đukanović',
    img: 'aal-ana.png',
    industry: 'professional',
    location: MNE,
    tags: ['Business Analysis', 'Accounting', 'Tax Advisory'],
    intro: { me: 'Analiza, računovodstvo i poresko savjetovanje za advokatsku kancelariju.', en: 'Analysis, accounting and tax advice for a law office.' },
    problem: {
      me: 'Advokatska kancelarija željela je uredne finansije i sigurnost u poreskim pitanjima, kako bi se fokusirala na klijente.',
      en: 'The law office wanted tidy finances and certainty on tax matters, so it could focus on its clients.',
    },
    solution: {
      me: 'Analizirali smo poslovanje, preuzeli računovodstvo i savjetovali o poreskim obavezama i optimizaciji u skladu sa propisima.',
      en: 'We analysed the business, took over accounting and advised on tax obligations and compliant optimisation.',
    },
    result: {
      me: 'Manje administracije, više vremena za klijente.',
      en: 'Less admin, more time for clients.',
    },
    metrics: [],
  },
  {
    slug: 'aal-mitar',
    name: 'AAL Mitar Šušić',
    img: 'aal-mitar.png',
    industry: 'professional',
    location: MNE,
    tags: ['Visual Identity'],
    intro: { me: 'Vizuelni identitet za advokatsku kancelariju.', en: 'Visual identity for a law office.' },
    problem: {
      me: 'Advokatskoj kancelariji trebao je identitet koji djeluje savremeno, a uliva povjerenje.',
      en: 'The law office needed an identity that feels contemporary while inspiring trust.',
    },
    solution: {
      me: 'Dizajnirali smo monogram i vizuelni sistem u tamnoplavoj i zlatnoj — za dokumente, potpise i digitalne kanale.',
      en: 'We designed a monogram and visual system in navy and gold — for documents, signatures and digital channels.',
    },
    result: {
      me: 'Ozbiljan, prepoznatljiv identitet za profesionalnu praksu.',
      en: 'A serious, recognisable identity for a professional practice.',
    },
    metrics: [],
  },
  {
    slug: 'mirvel',
    name: 'Mirvel Company',
    img: 'mirvel.jpg',
    industry: 'business',
    location: MNE,
    tags: ['Accounting', 'Operations Consulting'],
    intro: { me: 'Računovodstvo i operativni konsalting.', en: 'Accounting and operations consulting.' },
    problem: {
      me: 'Kompaniji je trebao pouzdan partner za računovodstvo i bolji pregled nad svakodnevnim operacijama.',
      en: 'The company needed a reliable accounting partner and a better grip on day-to-day operations.',
    },
    solution: {
      me: 'Preuzeli smo računovodstvo i uredili ključne operativne procese.',
      en: 'We took over accounting and streamlined key operational processes.',
    },
    result: {
      me: 'Stabilna osnova za mirno poslovanje i rast.',
      en: 'A stable foundation for calm operations and growth.',
    },
    metrics: [],
  },
];

export const CATEGORY = {
  finance: ['Accounting', 'Tax Advisory', 'Financial Modeling', 'Company Registration'],
  marketing: ['Graphic Design', 'Digital Marketing', 'Photography', 'Branding', 'Marketing Plan and Strategy', 'Visual Identity', 'Website', 'Event Management', 'Social Media Strategy'],
  consulting: ['Digital Transformation', 'Organisational Design', 'Operations Consulting', 'Business Analysis'],
};

export const categoriesOf = (p) => Object.keys(CATEGORY).filter((c) => p.tags.some((t) => CATEGORY[c].includes(t)));

export const categoryOfTag = (tag) => Object.keys(CATEGORY).find((c) => CATEGORY[c].includes(tag));

export const caseUrl = (p) => `/projekti/${p.slug}/`;
