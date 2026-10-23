import {
  $,
  $$,
  animateCta,
  animateFooter,
  arrivedWithWipe,
  gsap,
  initSite,
  reduced,
  revealHeadings,
  scrubWords,
  ScrollTrigger,
  SplitText,
  wipeIn,
} from './common.js';
import { getLang, t, tagLabels } from './i18n.js';
import { caseUrl, categoryOfTag, industries, projects } from './projects.js';

const slug = location.pathname.match(/\/projekti\/([a-z0-9-]+)/)?.[1];
const index = projects.findIndex((p) => p.slug === slug);
if (index === -1) location.replace('/#projekti');

const project = projects[index];
const next = projects[(index + 1) % projects.length];
const lang = getLang();
const tag = (name) => tagLabels[lang][name] || name;

/* ---------- Content ---------- */

function fill(key, value, html = false) {
  $$(`[data-case="${key}"]`).forEach((el) => (html ? (el.innerHTML = value) : (el.textContent = value)));
}

function render() {
  const industry = industries[project.industry][lang];
  document.title = `${project.name} — Distinct`;
  $('meta[name="description"]').content = project.intro[lang];

  fill('name', project.name);
  fill('industry', industry);
  fill('intro', project.intro[lang]);
  fill('services', project.tags.map(tag).join(', '));
  fill('problem', project.problem[lang]);
  fill('solution', project.solution[lang]);
  fill('result', project.result[lang]);
  if (project.location) fill('location', project.location[lang]);
  else $('[data-case-optional="location"]').remove();

  fill('chips', project.tags.map((name) => `<li>${tag(name)}</li>`).join(''), true);

  // Measurable outcomes when we have them, otherwise the concrete deliverables
  const results = project.metrics.length
    ? `<div class="metrics">${project.metrics
        .map((m) => `<div class="metric"><strong>${m.value}</strong><span>${m.label[lang]}</span></div>`)
        .join('')}</div>`
    : `<p class="results__title">${t('delivered')}</p>
       <ol class="delivered">${project.tags
         .map((name, i) => {
           const cat = categoryOfTag(name);
           return `<li class="delivered__item delivered__item--${cat}">
             <span class="delivered__num">${String(i + 1).padStart(2, '0')}</span>
             <span class="delivered__name">${tag(name)}</span>
             <span class="delivered__cat">${t('cat')[cat]}</span>
           </li>`;
         })
         .join('')}</ol>`;
  fill('results', results, true);

  const img = $('[data-case="img"]');
  img.src = `/img/portfolio/${project.img}`;
  img.alt = project.name;
  img.addEventListener('load', () => tintCover(img), { once: true });

  const nextLink = $('[data-case="next"]');
  nextLink.href = caseUrl(next);
  fill('next-name', next.name);
  $('[data-case="next-img"]').src = `/img/portfolio/${next.img}`;
}

// The portfolio images are logos on a solid brand colour, so the cover frame
// takes that colour and the logo floats on a full-width panel.
function tintCover(img) {
  try {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 1;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 2, 2, 1, 1, 0, 0, 1, 1);
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
    const frame = $('.case-cover__frame');
    frame.style.background = `rgb(${r} ${g} ${b})`;
    // light logo backgrounds get a hairline so the panel doesn't dissolve into the page
    if ((r * 299 + g * 587 + b * 114) / 1000 > 225) frame.classList.add('is-light');
  } catch {}
}

/* ---------- Animations ---------- */

function intro() {
  const title = SplitText.create('.case-hero__title', { type: 'lines,chars', mask: 'lines' });
  return gsap
    .timeline()
    .from(title.chars, { yPercent: 110, duration: 1.1, stagger: 0.018, ease: 'expo.out' })
    .from('.case-back, .case-hero__eyebrow', { y: 20, opacity: 0, duration: 0.9, stagger: 0.06, ease: 'expo.out' }, 0)
    .from('.case-hero__intro', { y: 24, opacity: 0, duration: 1, ease: 'expo.out' }, 0.25)
    .from('.case-meta > div', { y: 24, opacity: 0, duration: 1, stagger: 0.06, ease: 'expo.out' }, 0.35)
    .from('.case-cover__frame', { clipPath: 'inset(100% 0 0 0 round 28px)', duration: 1.4, ease: 'expo.inOut' }, 0.2)
    .from('.case-cover__img', { scale: 1.3, duration: 1.8, ease: 'expo.out' }, 0.5)
    .from('.header', { yPercent: -100, duration: 1, ease: 'expo.out', clearProps: 'transform' }, 0.1);
}

function scrollAnimations() {
  // Cover logo settles as the panel scrolls past
  gsap.to('.case-cover__img', {
    yPercent: 12,
    scale: 0.9,
    ease: 'none',
    scrollTrigger: { trigger: '.case-cover', start: 'top top+=80', end: 'bottom top', scrub: true },
  });

  // Each chapter reads itself as you scroll
  $$('.chapter__text').forEach((el) => scrubWords(el, { start: 'top 85%', end: 'bottom 55%' }));
  $$('.chapter__label').forEach((el) =>
    gsap.from(el, { y: 20, opacity: 0, duration: 0.9, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 88%' } }),
  );

  // Story rail: fill follows the reading position, the current chapter lights up
  gsap.fromTo(
    '.story__fill',
    { scaleY: 0 },
    { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.story__chapters', start: 'top 60%', end: 'bottom 60%', scrub: true } },
  );
  $$('.chapter').forEach((chapter) => {
    const item = $(`.story__nav [data-step="${chapter.id}"]`);
    ScrollTrigger.create({
      trigger: chapter,
      start: 'top 60%',
      end: 'bottom 60%',
      onToggle: (self) => item.classList.toggle('is-active', self.isActive),
    });
  });

  ScrollTrigger.batch('.chapter__chips li, .delivered__item, .metric', {
    start: 'top 92%',
    once: true,
    onEnter: (els) => gsap.from(els, { y: 30, opacity: 0, duration: 0.9, stagger: 0.06, ease: 'expo.out', clearProps: 'transform,opacity' }),
  });

  // Next project: the name slides up from a mask
  gsap.from('.case-next__name', {
    yPercent: 100,
    opacity: 0,
    duration: 1.2,
    ease: 'expo.out',
    scrollTrigger: { trigger: '.case-next', start: 'top 80%' },
  });

  revealHeadings();
  animateCta();
  animateFooter();
}

/* ---------- Boot ---------- */

if (project) {
  render();
  initSite();

  history.scrollRestoration = 'manual';
  scrollTo(0, 0);

  if (reduced) {
    document.documentElement.classList.add('reduced');
    wipeIn();
  } else {
    document.fonts.ready.then(() => {
      scrollAnimations();
      const tl = intro().pause();
      // start the intro while the cover is still lifting off
      wipeIn();
      gsap.delayedCall(arrivedWithWipe ? 0.45 : 0, () => tl.play());
      addEventListener('load', () => ScrollTrigger.refresh());
    });
  }
}
