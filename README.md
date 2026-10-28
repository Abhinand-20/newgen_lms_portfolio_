# B2OF Learning Showcase

The B2OF Learning portfolio page, built with Next.js (App Router).

## Run it

```bash
npm install        # first time only
npm run dev        # http://localhost:3000, reloads as you edit
```

Production build:

```bash
npm run build
npm start
```

## Where things are

| Path | What it holds |
| --- | --- |
| `app/(b2of)/page.tsx` | The main page: sections in order |
| `app/(b2of)/layout.tsx` | `<head>`: title, description, Google Fonts |
| `app/(b2of)/globals.css` | All styles for the main page |
| `app/4pfamily/` | The 4P Family showcase at `/4pfamily`, with its own layout and stylesheet |
| `components/Hero.tsx` | Banner: Nova (Hi, following eyes, blink) and the demo conversation |
| `components/Features.tsx` | The eleven features, lit one by one |
| `components/Sections.tsx` | Robot Hangar and the closing call to action |
| `components/Journey.tsx` | The six-step learning journey |
| `components/Progress.tsx` | Progress: the Mission Control dashboard |
| `components/Benefits.tsx` | Benefits for students, parents and educators |
| `components/Compare.tsx` | How B2OF differs from traditional LMS platforms |
| `components/Nav.tsx` | Top menu, mobile menu, current-section highlight |
| `components/Icons.tsx` | Icon sprite and `<Icon name="…" />` |
| `components/RevealObserver.tsx` | Fades sections in as they scroll into view |
| `components/fourp/` | Interactive parts of the 4P Family page |
| `public/pages/` | Standalone pages served at `/learning-marketing`, `/how-ai-tutor-talk` and `/learning-technologies` (see `next.config.mjs`) |
| `public/assets/` | Screenshots, Nova and Octa-Pod images, and each standalone page's images |
