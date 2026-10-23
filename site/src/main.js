import { Flip } from 'gsap/Flip';
import {
  $,
  $$,
  animateCta,
  animateFooter,
  arrivedWithWipe,
  finePointer,
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
import { caseUrl, categoriesOf, projects } from './projects.js';

gsap.registerPlugin(Flip);

/* ---------- Content ---------- */

function renderProjects() {
  const lang = getLang();
  const label = (tag) => tagLabels[lang][tag] || tag;
  $('[data-grid]').innerHTML =
    projects
      .map((p, i) => {
        const cats = categoriesOf(p);
        return `<a class="tile${i < 2 ? ' tile--feature' : ''}" href="${caseUrl(p)}" data-cats="${cats.join(' ')}" data-cursor="${t('view')}">
          <span class="tile__img">
            <img src="/img/portfolio/${p.img}" alt="${p.name}" loading="lazy" width="600" height="600" />
            <span class="tile__tags">${p.tags.map((tag) => `<span>${label(tag)}</span>`).join('')}</span>
          </span>
          <span class="tile__name">${p.name}<small>${cats.map((c) => t('cat')[c]).join(' · ')}</small></span>
        </a>`;
      })
      .join('') +
    `<a class="tile tile--cta" href="#kontakt" data-cats="all" data-cursor-hide>
      <span class="tile__img"><span class="tile__cta">${t('ctaTile')}<b>↗</b></span></span>
    </a>`;
}

const { lenis, scrollToTarget } = initSite();
renderProjects();

// Highlight the nav item for the section in view
$$('.header__nav a').forEach((link) => {
  const section = $(new URL(link.href).hash);
  if (!section) return;
  ScrollTrigger.create({
    trigger: section,
    start: 'top 50%',
    end: 'bottom 50%',
    refreshPriority: -1, // measure after the pinned sections below add their spacing
    onToggle: (self) => link.classList.toggle('is-active', self.isActive),
  });
});

/* ---------- Project filter ---------- */

$$('.chip').forEach((chip) =>
  chip.addEventListener('click', () => {
    $$('.chip').forEach((c) => c.classList.toggle('is-active', c === chip));
    const f = chip.dataset.filter;
    const tiles = $$('.tile');
    const state = Flip.getState(tiles);
    tiles.forEach((tile) => (tile.hidden = f !== 'all' && tile.dataset.cats !== 'all' && !tile.dataset.cats.split(' ').includes(f)));
    Flip.from(state, {
      duration: reduced ? 0 : 0.7,
      ease: 'power3.inOut',
      absolute: true,
      scale: true,
      onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.6 }),
      onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.9, duration: 0.4 }),
      onComplete: () => ScrollTrigger.refresh(),
    });
  }),
);

/* ---------- Contact form (no backend yet: hands off to the mail app) ---------- */

$('.form').addEventListener('submit', (e) => {
  e.preventDefault();
  const form = e.currentTarget;
  const data = new FormData(form);
  const note = $('.form__note');
  let ok = true;
  ['name', 'email', 'message'].forEach((name) => {
    const input = form.elements[name];
    const valid = input.value.trim() && (name !== 'email' || input.checkValidity());
    input.closest('.field').classList.toggle('is-invalid', !valid);
    if (!valid) ok = false;
  });
  if (!ok) {
    note.textContent = t('formError');
    return;
  }
  const topics = data.getAll('topic').join(', ');
  const body = [
    `${data.get('name')} <${data.get('email')}>`,
    data.get('company') ? `Kompanija: ${data.get('company')}` : '',
    topics ? `Tema: ${topics}` : '',
    '',
    data.get('message'),
  ]
    .filter((line, i) => line || i === 3)
    .join('\n');
  note.textContent = t('formOk');
  location.href = `mailto:info@distinct.co.me?subject=${encodeURIComponent('Upit sa sajta — ' + data.get('name'))}&body=${encodeURIComponent(body)}`;
});

/* ---------- Animations ---------- */

function intro() {
  const tl = gsap.timeline();
  const title = SplitText.create('.hero__title', { type: 'lines', mask: 'lines', linesClass: 'hero-line' });
  tl.from(title.lines, { yPercent: 110, duration: 1.2, stagger: 0.09, ease: 'expo.out' })
    .from('.hero__orb', { scale: 0, duration: 1.6, ease: 'expo.out' }, 0)
    .from('.hero__dot', { scale: 0, duration: 0.8, ease: 'back.out(3)' }, 0.6)
    .from('.hero__eyebrow, .hero__lead, .hero__actions > *, .hero__scroll', { y: 24, opacity: 0, duration: 1, stagger: 0.07, ease: 'expo.out' }, 0.3)
    .from('.header', { yPercent: -100, duration: 1, ease: 'expo.out', clearProps: 'transform' }, 0.2);
  return tl;
}

function loader() {
  const el = $('.loader');
  const letters = $$('.loader .letter');
  const dot = $('.loader .accent');
  const count = $('.loader__count span');
  const counter = { v: 0 };
  return gsap
    .timeline()
    .from(letters, { y: 44, duration: 0.9, stagger: 0.05, ease: 'expo.out' })
    .from(dot, { y: -70, opacity: 0, duration: 0.9, ease: 'bounce.out' }, 0.45)
    .to(counter, { v: 100, duration: 1.4, ease: 'power2.inOut', onUpdate: () => (count.textContent = Math.round(counter.v)) }, 0)
    .to(el, { clipPath: 'inset(0 0 100% 0)', duration: 1, ease: 'expo.inOut' }, '+=0.15')
    .add(() => {
      el.remove();
      document.body.classList.remove('is-loading');
      lenis?.start();
    })
    .add(intro(), '-=0.55');
}

function scrollAnimations() {
  // Hero orb drifts with scroll and pointer
  gsap.to('.hero__orb', {
    yPercent: 30,
    scale: 0.7,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  });
  if (finePointer) {
    const ox = gsap.quickTo('.hero__orb', 'x', { duration: 1.6, ease: 'power3' });
    const oy = gsap.quickTo('.hero__orb', 'y', { duration: 1.6, ease: 'power3' });
    $('.hero').addEventListener('pointermove', (e) => {
      ox((e.clientX / innerWidth - 0.5) * 60);
      oy((e.clientY / innerHeight - 0.5) * 60);
    });
  }

  // Showreel grows to full width as it scrolls in
  gsap.fromTo(
    '.reel__frame',
    { scale: 0.72, borderRadius: 48 },
    {
      scale: 1,
      borderRadius: 24,
      ease: 'none',
      scrollTrigger: { trigger: '.reel', start: 'top bottom', end: 'center 55%', scrub: true },
    },
  );

  // Client marquee: endless, speeds up and reverses with scroll velocity
  const track = $('.marquee__track');
  track.innerHTML += track.innerHTML;
  $$('img', track).forEach((img, i) => i >= track.children.length / 2 && img.setAttribute('aria-hidden', 'true'));
  const marquee = gsap.to(track, { xPercent: -50, duration: 38, ease: 'none', repeat: -1 });
  ScrollTrigger.create({
    onUpdate: (self) => {
      const boost = Math.min(Math.abs(self.getVelocity()) / 300, 4);
      gsap.to(marquee, { timeScale: self.direction * (1 + boost), duration: 0.3, overwrite: true });
      gsap.to(marquee, { timeScale: self.direction, duration: 1.2, delay: 0.3 });
    },
  });

  // Statement reads itself as you scroll
  scrubWords($('.statement__text'));

  // Counters
  $$('[data-count]').forEach((el) => {
    const n = { v: 0 };
    gsap.to(n, {
      v: +el.dataset.count,
      duration: 1.8,
      ease: 'power3.out',
      onUpdate: () => (el.textContent = Math.round(n.v)),
      scrollTrigger: { trigger: el, start: 'top 88%' },
    });
  });

  revealHeadings();

  // Approach title (not split, it's pinned)
  gsap.from('.approach .h2', { y: 40, opacity: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: '.approach', start: 'top 70%' } });

  const mm = gsap.matchMedia();

  mm.add('(min-width: 901px)', () => {
    // Service cards stack: earlier cards shrink back as the next one slides over
    const cards = $$('.card');
    cards.forEach((card, i) => {
      const next = cards[i + 1];
      if (!next) return;
      // explicit start value: tweening from the computed `filter: none` starts at brightness(0)
      gsap.fromTo(
        card,
        { scale: 1, filter: 'brightness(1)' },
        {
          scale: 0.92 - (cards.length - i - 2) * 0.02,
          filter: 'brightness(0.9)',
          ease: 'none',
          scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 20%', scrub: true },
        },
      );
    });

    // Approach: pinned horizontal journey along the line
    const steps = $('.steps');
    const distance = () => steps.scrollWidth - innerWidth + parseFloat(getComputedStyle($('.approach__track')).paddingLeft) * 2;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.approach__pin',
        start: 'top top',
        end: () => `+=${distance() + innerHeight * 0.5}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });
    tl.to(steps, { x: () => -distance(), ease: 'none' }, 0)
      .to('.approach__fill', { scaleX: 1, ease: 'none' }, 0)
      .to('.approach__runner', { left: '100%', ease: 'none' }, 0);
    $$('.step').forEach((step) =>
      gsap.from(step, {
        opacity: 0.25,
        ease: 'none',
        scrollTrigger: {
          trigger: step,
          containerAnimation: tl,
          start: 'left 85%',
          end: 'left 45%',
          scrub: true,
        },
      }),
    );
  });

  mm.add('(max-width: 900px)', () => {
    $$('.step').forEach((step) =>
      gsap.from(step, { y: 40, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: step, start: 'top 88%' } }),
    );
  });

  // Service card content
  $$('.card').forEach((card) => {
    gsap.from($$('.card__title, .card__tagline, .card__text, .card__list li', card), {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.05,
      ease: 'expo.out',
      scrollTrigger: { trigger: card, start: 'top 70%' },
    });
  });

  // Lists and tiles appear in batches
  ScrollTrigger.batch('.ind, .tile, .partner, .contact__list li, .stat', {
    start: 'top 92%',
    once: true,
    onEnter: (els) => gsap.from(els, { y: 50, opacity: 0, duration: 1, stagger: 0.08, ease: 'expo.out', clearProps: 'transform,opacity' }),
  });

  animateCta();
  animateFooter();
}

/* ---------- Boot ---------- */

// The intro plays from the top; links like /#projekti jump straight to their section
history.scrollRestoration = 'manual';
scrollTo(0, 0);
const hashTarget = location.hash.length > 1 ? $(location.hash) : null;

let firstVisit = false;
try {
  firstVisit = !arrivedWithWipe && !hashTarget && !sessionStorage.getItem('distinct-intro');
  sessionStorage.setItem('distinct-intro', '1');
} catch {}

if (reduced) {
  document.documentElement.classList.add('reduced');
  $('.loader').remove();
  wipeIn();
  hashTarget?.scrollIntoView();
} else {
  if (firstVisit) {
    document.body.classList.add('is-loading');
    lenis.stop();
  } else $('.loader').remove();

  document.fonts.ready.then(() => {
    scrollAnimations();
    if (firstVisit) loader();
    else {
      if (hashTarget) {
        ScrollTrigger.refresh();
        scrollToTarget(hashTarget, true);
      }
      intro();
      wipeIn();
    }
    addEventListener('load', () => ScrollTrigger.refresh());
  });
}
