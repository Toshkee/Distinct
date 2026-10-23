import { defineConfig } from 'vite';
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { projects } from './src/projects.js';

const root = import.meta.dirname;
const CASE_ROUTE = /^\/projekti\/([a-z0-9-]+)\/?$/;
// Absolute URL for link previews (WhatsApp, LinkedIn, Facebook need it). Override with SITE_URL when the domain changes.
const SITE_URL = (process.env.SITE_URL || 'https://distinct-inky.vercel.app').replace(/\/$/, '');

// `<!-- @include header.html -->` → contents of partials/header.html
const includes = {
  name: 'distinct-includes',
  transformIndexHtml: {
    order: 'pre',
    handler: (html) =>
      html
        .replace(/<!--\s*@include\s+(\S+)\s*-->/g, (_, file) => readFileSync(resolve(root, 'partials', file), 'utf8'))
        .replaceAll('%SITE_URL%', SITE_URL),
  },
};

// Case studies live at /projekti/<slug>/. One template (case.html) serves them in dev,
// and the build writes a real HTML file per project with its own title and description.
const caseStudies = {
  name: 'distinct-case-studies',
  configureServer(server) {
    server.middlewares.use((req, _res, next) => {
      const path = req.url.split('?')[0];
      if (CASE_ROUTE.test(path)) req.url = '/case.html';
      next();
    });
  },
  closeBundle() {
    const outDir = resolve(root, 'dist');
    let template;
    try {
      template = readFileSync(resolve(outDir, 'case.html'), 'utf8');
    } catch {
      return; // not a client build
    }
    for (const p of projects) {
      const html = template
        .replace(/<title>.*?<\/title>/, `<title>${p.name} — Distinct</title>`)
        .replace(/(<meta\s+name="description"\s+content=")[^"]*/, `$1${p.intro.me}`)
        .replace(/(<meta\s+property="og:title"\s+content=")[^"]*/, `$1${p.name} — Distinct`)
        .replace(/(<meta\s+property="og:description"\s+content=")[^"]*/, `$1${p.intro.me}`)
        .replace('</head>', `<meta property="og:url" content="${SITE_URL}/projekti/${p.slug}/" />\n</head>`);
      mkdirSync(resolve(outDir, 'projekti', p.slug), { recursive: true });
      writeFileSync(resolve(outDir, 'projekti', p.slug, 'index.html'), html);
    }
  },
};

export default defineConfig({
  plugins: [includes, caseStudies],
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        case: resolve(root, 'case.html'),
      },
    },
  },
});
