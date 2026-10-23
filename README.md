# Distinct — redizajn sajta (lokalni prototip)

## Struktura
- `site/` — sajt (Vite + GSAP + Lenis), ME/EN
- `video/` — Remotion projekat za showreel i loop animacije usluga

## Pokretanje sajta
```bash
cd site && npm install && npm run dev
```
Otvara se na http://127.0.0.1:5291

Produkcijski build: `npm run build` → `site/dist/`

## Video (Remotion)
```bash
cd video && npm install
npx remotion studio src/index.ts --port=3917   # pregled i izmjene
./render.sh                                    # renderuje sve u site/public/video
```
Kompozicije: `Showreel` (20 s, 1920×1080), `FinanceLoop`, `MarketingLoop`, `ConsultingLoop` (6 s, 800×800, bešavni loop).

## Prije objave
- Provjeriti brojke u sekciji „O nama“ (20+, 15, 3, 1) i tekstove.
- Forma trenutno otvara email program (mailto). Za pravo slanje treba backend (npr. Formspree, Resend ili Netlify Forms).
- Dodati prave fotografije tima i projekata, studije slučaja i preporuke klijenata.
