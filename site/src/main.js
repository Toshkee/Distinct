import '@fontsource-variable/geist';
import '@fontsource/instrument-serif/latin-400-italic.css';
import '@fontsource/instrument-serif/latin-ext-400-italic.css';
import './style.css';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { Flip } from 'gsap/Flip';
import Lenis from 'lenis';

import logoPaths from './logo-paths.json';
import { applyLanguage, getLang, t, tagLabels } from './i18n.js';
import { projects, categoriesOf } from './projects.js';

gsap.registerPlugin(ScrollTrigger, SplitText, Flip);

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

/* ---------- Content ---------- */

let logoId = 0;
function buildLogo(el) {
  const id = `logo-clip-${logoId++}`;
  const letters = logoPaths
    .filter((p) => !p.accent)
    .map((p) => `<path class="letter" fill-rule="evenodd" d="${p.d}"/>`)
    .join('');
  const dot = logoPaths.find((p) => p.accent);
  el.innerHTML = `<svg class="logo-svg" viewBox="859 48.906 201.44 41.094" role="img" aria-label="Distinct">
    <defs><clipPath id="${id}"><rect x="859" y="48.906" width="201.44" height="41.094"/></clipPath></defs>
    <g clip-path="url(#${id})">${letters}</g>
    <path class="accent" d="${dot.d}"/></svg>`;
}

function renderProjects() {
  const lang = getLang();
  const label = (tag) => tagLabels[lang][tag] || tag;
  const catName = { me: { finance: 'Finansije', marketing: 'Marketing', consulting: 'Konsalting' }, en: { finance: 'Finance', marketing: 'Marketing', consulting: 'Consulting' } }[lang];
  $('[data-grid]').innerHTML = projects
    .map((p, i) => {
      const cats = categoriesOf(p);
      return `<article class="tile${i < 2 ? ' tile--feature' : ''}" data-cats="${cats.join(' ')}" data-cursor="${t('view')}">
        <div class="tile__img">
          <img src="/img/portfolio/${p.img}" alt="${p.name}" loading="lazy" width="600" height="600" />
          <div class="tile__tags">${p.tags.map((tag) => `<span>${label(tag)}</span>`).join('')}</div>
        </div>
        <h3 class="tile__name">${p.name}<small>${cats.map((c) => catName[c]).join(' · ')}</small></h3>
      </article>`;
    })
    .join('') +
    `<a class="tile tile--cta" href="#kontakt" data-cats="all" data-cursor-hide>
      <span class="tile__img"><span class="tile__cta">${lang === 'en' ? 'Your brand<br><em>next?</em>' : 'Vaš brend<br><em>sljedeći?</em>'}<b>↗</b></span></span>
    </a>`;
}

applyLanguage();
$$('[data-logo]').forEach(buildLogo);
renderProjects();

/* ---------- Smooth scroll ---------- */

let lenis = null;
if (!reduced) {
  lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

const headerOffset = () => -($('.header').offsetHeight - 1);
function scrollToTarget(target) {
  if (lenis) lenis.scrollTo(target, { offset: headerOffset(), duration: 1.4 });
  else target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
}

$$('a[href^="#"]').forEach((a) =>
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    const target = id === '#top' ? document.body : $(id);
    if (!target) return;
    e.preventDefault();
    closeMenu();
    scrollToTarget(target);
  }),
);

/* ---------- Header & menu ---------- */

const header = $('.header');
let lastY = 0;
const onScroll = (y) => {
  header.classList.toggle('is-scrolled', y > 40);
  const goingDown = y > lastY && y > 400;
  if (!document.body.classList.contains('menu-open')) header.classList.toggle('is-hidden', goingDown);
  lastY = y;
};
if (lenis) lenis.on('scroll', ({ scroll }) => onScroll(scroll));
else addEventListener('scroll', () => onScroll(scrollY), { passive: true });

const burger = $('.burger');
function closeMenu() {
  document.body.classList.remove('menu-open');
  burger.setAttribute('aria-expanded', 'false');
  $('.menu').setAttribute('aria-hidden', 'true');
  lenis?.start();
}
burger.addEventListener('click', () => {
  const open = !document.body.classList.contains('menu-open');
  if (!open) return closeMenu();
  document.body.classList.add('menu-open');
  burger.setAttribute('aria-expanded', 'true');
  $('.menu').setAttribute('aria-hidden', 'false');
  header.classList.remove('is-hidden');
  lenis?.stop();
});

// Highlight the nav item for the section in view
$$('.header__nav a').forEach((link) => {
  const section = $(link.getAttribute('href'));
  if (!section) return;
  ScrollTrigger.create({
    trigger: section,
    start: 'top 50%',
    end: 'bottom 50%',
    refreshPriority: -1, // measure after the pinned sections below add their spacing
    onToggle: (self) => link.classList.toggle('is-active', self.isActive),
  });
});

/* ---------- Videos: play only while visible ---------- */

const videoObserver = new IntersectionObserver(
  (entries) =>
    entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) {
        if (target.preload === 'none') target.preload = 'auto';
        target.play().catch(() => {});
      } else target.pause();
    }),
  { rootMargin: '120px 0px' },
);
if (!reduced) $$('video').forEach((v) => videoObserver.observe(v));

/* ---------- Cursor ---------- */

if (finePointer && !reduced) {
  const cursor = $('.cursor');
  const label = $('.cursor__label');
  const xTo = gsap.quickTo(cursor, 'x', { duration: 0.45, ease: 'power3' });
  const yTo = gsap.quickTo(cursor, 'y', { duration: 0.45, ease: 'power3' });
  addEventListener('pointermove', (e) => {
    cursor.classList.add('is-visible');
    xTo(e.clientX);
    yTo(e.clientY);
  });
  document.addEventListener('pointerleave', () => cursor.classList.remove('is-visible'));
  document.addEventListener('pointerover', (e) => {
    const withLabel = e.target.closest('[data-cursor]');
    cursor.classList.toggle('is-label', !!withLabel);
    if (withLabel) label.textContent = withLabel.dataset.cursor;
    cursor.classList.toggle('is-hidden', !!e.target.closest('[data-cursor-hide]'));
  });

  // Magnetic buttons
  $$('[data-magnetic]').forEach((el) => {
    const strength = el.classList.contains('cta__btn') ? 0.35 : 0.2;
    const mx = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    const my = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      mx((e.clientX - r.left - r.width / 2) * strength);
      my((e.clientY - r.top - r.height / 2) * strength);
    });
    el.addEventListener('pointerleave', () => {
      mx(0);
      my(0);
    });
  });
}

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
  let direction = 1;
  ScrollTrigger.create({
    onUpdate: (self) => {
      direction = self.direction;
      const boost = Math.min(Math.abs(self.getVelocity()) / 300, 4);
      gsap.to(marquee, { timeScale: direction * (1 + boost), duration: 0.3, overwrite: true });
      gsap.to(marquee, { timeScale: direction, duration: 1.2, delay: 0.3 });
    },
  });

  // Statement reads itself as you scroll
  const statement = SplitText.create('.statement__text', { type: 'words', wordsClass: 'word' });
  gsap.fromTo(
    statement.words,
    { opacity: 0.14 },
    {
      opacity: 1,
      stagger: 0.1,
      ease: 'none',
      scrollTrigger: { trigger: '.statement__text', start: 'top 82%', end: 'bottom 45%', scrub: true },
    },
  );

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

  // Headline line reveals
  $$('.split, .eyebrow:not(.hero__eyebrow)').forEach((el) => {
    if (el.classList.contains('eyebrow')) {
      gsap.from(el, { y: 16, opacity: 0, duration: 0.9, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 90%' } });
      return;
    }
    SplitText.create(el, {
      type: 'lines',
      mask: 'lines',
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.lines, {
          yPercent: 110,
          duration: 1.1,
          stagger: 0.08,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        }),
    });
  });

  // Approach title (not split, it's pinned)
  gsap.from('.approach .h2', { y: 40, opacity: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: '.approach', start: 'top 70%' } });

  const mm = gsap.matchMedia();

  mm.add('(min-width: 901px)', () => {
    // Service cards stack: earlier cards shrink back as the next one slides over
    const cards = $$('.card');
    cards.forEach((card, i) => {
      const next = cards[i + 1];
      if (!next) return;
      gsap.to(card, {
        scale: 0.92 - (cards.length - i - 2) * 0.02,
        filter: 'brightness(0.9)',
        ease: 'none',
        scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 20%', scrub: true },
      });
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

  // Big CTA button pops in
  gsap.from('.cta__btn', { scale: 0, rotate: -40, duration: 1.2, ease: 'back.out(1.6)', scrollTrigger: { trigger: '.cta', start: 'top 60%' } });

  // Footer wordmark rises letter by letter
  gsap.from('.footer__mark .letter', {
    y: 44,
    duration: 1.2,
    stagger: 0.06,
    ease: 'expo.out',
    scrollTrigger: { trigger: '.footer__mark', start: 'top 95%' },
  });
  gsap.from('.footer__mark .accent', {
    y: -80,
    opacity: 0,
    duration: 1.2,
    delay: 0.5,
    ease: 'bounce.out',
    scrollTrigger: { trigger: '.footer__mark', start: 'top 95%' },
  });
}

if (reduced) {
  document.documentElement.classList.add('reduced');
  $('.loader').remove();
} else {
  // The intro always plays from the top
  history.scrollRestoration = 'manual';
  scrollTo(0, 0);
  document.body.classList.add('is-loading');
  lenis.stop();
  document.fonts.ready.then(() => {
    scrollAnimations();
    loader();
    addEventListener('load', () => ScrollTrigger.refresh());
  });
}
