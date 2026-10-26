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
| `app/page.tsx` | The page: sections in order |
| `app/layout.tsx` | `<head>`: title, description, Google Fonts |
| `app/globals.css` | All styles |
| `components/Hero.tsx` | Banner: Nova (Hi, following eyes, blink) and the demo conversation |
| `components/NovaChat.tsx` | The scripted Nova chat demo (Talk / Tap) |
| `components/Journey.tsx` | The six-step learning journey |
| `components/Sections.tsx` | AI tutor, Robot Hangar, Progress, Benefits, Comparison, closing call to action |
| `components/Nav.tsx` | Top menu, mobile menu, current-section highlight |
| `components/Icons.tsx` | Icon sprite and `<Icon name="…" />` |
| `components/RevealObserver.tsx` | Fades sections in as they scroll into view |
| `public/assets/` | Screenshots, Nova and Octa-Pod images |
