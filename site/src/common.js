import '@fontsource-variable/geist';
import '@fontsource/instrument-serif/latin-400-italic.css';
import '@fontsource/instrument-serif/latin-ext-400-italic.css';
import './style.css';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

import logoPaths from './logo-paths.json';
import { applyLanguage } from './i18n.js';

gsap.registerPlugin(ScrollTrigger, SplitText);

export { gsap, ScrollTrigger, SplitText };
export const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
export const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
export const $ = (s, root = document) => root.querySelector(s);
export const $$ = (s, root = document) => [...root.querySelectorAll(s)];

const WIPE_KEY = 'distinct-wipe';

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

/* ---------- Page transitions ---------- */

export const arrivedWithWipe = document.documentElement.classList.contains('is-wiping');

function wipeTo(href) {
  try {
    sessionStorage.setItem(WIPE_KEY, '1');
  } catch {}
  if (reduced) return (location.href = href);
  gsap.fromTo(
    '.page-wipe',
    { clipPath: 'inset(100% 0 0 0)' },
    { clipPath: 'inset(0% 0 0 0)', duration: 0.7, ease: 'expo.inOut', onComplete: () => (location.href = href) },
  );
}

/** Lifts the cover left by the previous page. Resolves when the page is visible. */
export function wipeIn() {
  try {
    sessionStorage.removeItem(WIPE_KEY);
  } catch {}
  if (!arrivedWithWipe) return Promise.resolve();
  return new Promise((done) => {
    gsap.fromTo(
      '.page-wipe',
      { clipPath: 'inset(0% 0 0% 0)' },
      {
        clipPath: 'inset(0% 0 100% 0)',
        duration: reduced ? 0 : 0.9,
        ease: 'expo.inOut',
        delay: reduced ? 0 : 0.1,
        onStart: () => document.documentElement.classList.remove('is-wiping'),
        onComplete: done,
      },
    );
  });
}

// Coming back through the browser history restores the covered page from cache
addEventListener('pageshow', (e) => {
  if (!e.persisted) return;
  document.documentElement.classList.remove('is-wiping');
  gsap.set('.page-wipe', { clipPath: 'inset(100% 0 0 0)' });
});

/* ---------- Shared site chrome ---------- */

export function initSite() {
  applyLanguage();
  $$('[data-logo]').forEach(buildLogo);

  let lenis = null;
  if (!reduced) {
    lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  const header = $('.header');
  const headerOffset = () => -(header.offsetHeight - 1);
  const scrollToTarget = (target, immediate = false) => {
    if (lenis) {
      if (immediate) lenis.resize(); // page height may have grown since Lenis last measured it
      lenis.scrollTo(target, { offset: target === document.body ? 0 : headerOffset(), duration: 1.4, immediate, force: immediate });
    }
    else target.scrollIntoView({ behavior: reduced || immediate ? 'auto' : 'smooth' });
  };

  // Header hides on the way down, comes back on the way up
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
  const closeMenu = () => {
    document.body.classList.remove('menu-open');
    burger.setAttribute('aria-expanded', 'false');
    $('.menu').setAttribute('aria-hidden', 'true');
    lenis?.start();
  };
  burger.addEventListener('click', () => {
    if (document.body.classList.contains('menu-open')) return closeMenu();
    document.body.classList.add('menu-open');
    burger.setAttribute('aria-expanded', 'true');
    $('.menu').setAttribute('aria-hidden', 'false');
    header.classList.remove('is-hidden');
    lenis?.stop();
  });

  // Same-page links scroll smoothly; links to other pages get the wipe transition
  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest('a[href]');
    if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin) return;
    e.preventDefault();
    closeMenu();
    if (url.pathname === location.pathname) {
      const target = !url.hash || url.hash === '#top' ? document.body : $(url.hash);
      if (target) scrollToTarget(target);
    } else wipeTo(url.href);
  });

  // Videos play only while visible
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

  if (finePointer && !reduced) initCursor();

  return { lenis, scrollToTarget };
}

function initCursor() {
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

/* ---------- Shared animations ---------- */

/** Masked line reveals for `.split` headings and fade-ups for eyebrows. */
export function revealHeadings(exclude = '.hero__eyebrow, .case-hero__eyebrow') {
  $$('.eyebrow').forEach((el) => {
    if (el.matches(exclude)) return;
    gsap.from(el, { y: 16, opacity: 0, duration: 0.9, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 90%' } });
  });
  $$('.split').forEach((el) =>
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
    }),
  );
}

/** Words fade from faint to solid as the element scrolls through the viewport. */
export function scrubWords(el, { start = 'top 82%', end = 'bottom 45%' } = {}) {
  const split = SplitText.create(el, { type: 'words', wordsClass: 'word' });
  gsap.fromTo(
    split.words,
    { opacity: 0.14 },
    { opacity: 1, stagger: 0.1, ease: 'none', scrollTrigger: { trigger: el, start, end, scrub: true } },
  );
}

export function animateCta() {
  if (!$('.cta__btn')) return;
  gsap.from('.cta__btn', { scale: 0, rotate: -40, duration: 1.2, ease: 'back.out(1.6)', scrollTrigger: { trigger: '.cta', start: 'top 60%' } });
}

export function animateFooter() {
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
