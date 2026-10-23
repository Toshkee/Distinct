// Montenegrin is the source language and lives in index.html.
// English overrides are applied by key before any animation runs.
const en = {
  'nav.services': 'Services',
  'nav.approach': 'Approach',
  'nav.work': 'Work',
  'nav.about': 'About',
  'nav.contact': 'Contact',
  'nav.cta': 'Book a call',

  'hero.title':
    '<span class="line">We design</span><span class="line">businesses that</span><span class="line"><em>grow</em><i class="hero__dot"></i></span>',
  'hero.lead':
    'Consulting, finance & accounting, branding and marketing — one partner from the first idea to the stable growth of your company.',
  'hero.cta1': 'Book a consultation',
  'hero.cta2': 'See our work',
  'hero.scroll': 'Scroll',

  'clients.title': 'Brands that trust us',

  'about.eyebrow': 'About us',
  'about.text':
    'Distinct is a business design company. We bring consulting, organisational design, finance and branding under one roof — so your strategy, your numbers and your brand finally speak the same language.',
  'stats.clients': 'clients & brands',
  'stats.services': 'services in one place',
  'stats.practices': 'areas of expertise',
  'stats.partner': 'partner for all of it',

  'services.eyebrow': 'What we do',
  'services.title': 'Three practices. <em>One partner.</em>',
  's1.title': 'Finance & Accounting',
  's1.tagline': 'Numbers that tell you where to go next.',
  's1.text':
    'From bookkeeping to financial models — clear reporting, tidy tax matters and support with work and residence permits.',
  's1.list':
    '<li>Financial modeling</li><li>Reporting & analytics</li><li>Bookkeeping</li><li>Tax advisory</li><li>Work & residence permits</li>',
  's2.title': 'Marketing & Branding',
  's2.tagline': 'A brand people remember.',
  's2.text':
    'Visual identity, strategy and digital marketing that turn your story into a recognisable presence in the market.',
  's2.list':
    '<li>Visual identity</li><li>Marketing plan & strategy</li><li>Digital marketing</li><li>Photography</li><li>Graphic design</li>',
  's3.title': 'Business Consulting',
  's3.tagline': 'An organisation that grows without friction.',
  's3.text': 'We analyse, redesign processes and lead digital transformation — so your team works smarter, not harder.',
  's3.list':
    '<li>Business analysis</li><li>Strategic management</li><li>Organisational design</li><li>Operations consulting</li><li>Digital transformation</li>',

  'approach.eyebrow': 'Our approach',
  'approach.title': 'From problem to <em>new value.</em>',
  'a1.title': 'Understand the problem',
  'a1.text': 'We listen, analyse your numbers and processes, and look for the root cause — not the symptom.',
  'a2.title': 'Design a solution',
  'a2.text': 'We craft a tailored plan: structure, financial model, brand or process.',
  'a3.title': 'Put it to work',
  'a3.text': "We don't stop at paper. We implement the solution together with your team.",
  'a4.title': 'Create new value',
  'a4.text': 'We measure results and keep building — for stable, long-term growth.',

  'ind.eyebrow': 'Who we work with',
  'ind.title': 'A partner for companies that <em>want more.</em>',
  'ind1.title': 'Hospitality & tourism',
  'ind1.text': 'From luxury resorts to boutique hotels — brand, marketing and finance that keep pace with the season.',
  'ind2.title': 'Founders & foreign investors',
  'ind2.text': 'Company registration, permits, accounting and tax in Montenegro — all in one place.',
  'ind3.title': 'Retail & lifestyle',
  'ind3.text': 'Brands customers recognise — from identity to digital sales.',
  'ind4.title': 'Professional services',
  'ind4.text': 'Law firms, clinics and agencies — tidy finances, clear processes and an identity that builds trust.',

  'work.eyebrow': 'Work',
  'work.title': 'Selected <em>work.</em>',
  'filter.all': 'All',
  'filter.finance': 'Finance',
  'filter.marketing': 'Marketing',
  'filter.consulting': 'Consulting',

  'partners.eyebrow': 'Partners',
  'partners.tiramisu': 'An ERP system that connects every part of your business into a single source of truth.',
  'partners.gf': 'Web development and digital solutions that clearly carry the essence of your brand.',

  'cta.title': "Let's design your <em>future.</em>",
  'cta.btn': 'Get in touch',

  'contact.eyebrow': 'Contact',
  'contact.title': 'Tell us where you <em>want to go.</em>',
  'contact.address': 'Address',
  'contact.phone': 'Phone',
  'form.topic': 'What do you need?',
  'form.company': 'Company registration',
  'form.name': 'Full name',
  'form.org': 'Company (optional)',
  'form.msg': 'A few words about your project',
  'form.send': 'Send message',

  'footer.tag': 'Business design consulting — Podgorica, Montenegro.',
  'footer.up': 'Back to top ↑',

  'case.back': 'All work',
  'case.client': 'Client',
  'case.industry': 'Industry',
  'case.location': 'Location',
  'case.services': 'Services',
  'case.problem': 'Problem',
  'case.solution': 'Solution',
  'case.result': 'Result',
  'case.next': 'Next project',
  'case.cta': 'The next story could be <em>yours.</em>',
};

const ui = {
  me: {
    view: 'Pogledaj',
    formError: 'Popunite ime, ispravan email i poruku.',
    formOk: 'Hvala! Otvaramo vaš email program sa pripremljenom porukom.',
    delivered: 'Šta smo isporučili',
    cat: { finance: 'Finansije', marketing: 'Marketing', consulting: 'Konsalting' },
    ctaTile: 'Vaš brend<br><em>sljedeći?</em>',
  },
  en: {
    view: 'View',
    formError: 'Please fill in your name, a valid email and a message.',
    formOk: 'Thank you! Opening your email app with the message ready to send.',
    delivered: 'What we delivered',
    cat: { finance: 'Finance', marketing: 'Marketing', consulting: 'Consulting' },
    ctaTile: 'Your brand<br><em>next?</em>',
  },
};

// Tag labels for the project grid
export const tagLabels = {
  me: {
    'Digital Transformation': 'Digitalna transformacija',
    'Organisational Design': 'Organizacioni dizajn',
    'Operations Consulting': 'Operativni konsalting',
    Accounting: 'Računovodstvo',
    'Graphic Design': 'Grafički dizajn',
    'Digital Marketing': 'Digitalni marketing',
    Photography: 'Fotografija',
    Branding: 'Brending',
    'Marketing Plan and Strategy': 'Marketing strategija',
    'Visual Identity': 'Vizuelni identitet',
    Website: 'Web sajt',
    'Event Management': 'Organizacija događaja',
    'Social Media Strategy': 'Strategija društvenih mreža',
    'Business Analysis': 'Biznis analiza',
    'Tax Advisory': 'Poresko savjetovanje',
    'Company Registration': 'Registracija firme',
    'Financial Modeling': 'Finansijsko modeliranje',
  },
  en: {},
};

export const getLang = () => {
  try {
    return localStorage.getItem('distinct-lang') === 'en' ? 'en' : 'me';
  } catch {
    return 'me';
  }
};

export const t = (key) => ui[getLang()][key];

export function applyLanguage() {
  const lang = getLang();
  document.documentElement.lang = lang === 'en' ? 'en' : 'sr-ME';
  document.querySelectorAll('[data-lang]').forEach((b) => b.classList.toggle('is-active', b.dataset.lang === lang));
  if (lang === 'en') {
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const value = en[el.dataset.i18n];
      if (value !== undefined) el.innerHTML = value;
    });
  }
  document.querySelectorAll('[data-lang]').forEach((b) =>
    b.addEventListener('click', () => {
      if (b.dataset.lang === lang) return;
      try {
        localStorage.setItem('distinct-lang', b.dataset.lang);
      } catch {}
      location.reload();
    }),
  );
}
