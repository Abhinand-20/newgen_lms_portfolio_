'use client';

import { useEffect, useState } from 'react';
import { Icon } from './Icons';

const LINKS = [
  { id: 'features', label: 'Features' },
  { id: 'hangar', label: 'Robots' },
  { id: 'journey', label: 'Journey' },
  { id: 'progress', label: 'Progress' },
  { id: 'benefits', label: 'Benefits' },
  { id: 'compare', label: 'Why B2OF' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // highlight the link of the section in the middle of the screen
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const sections = LINKS.map(l => document.getElementById(l.id)).filter((s): s is HTMLElement => !!s);
    const seen = new Map<string, boolean>();
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => seen.set(e.target.id, e.isIntersecting));
        const cur = sections.find(s => seen.get(s.id));
        setCurrent(cur ? cur.id : null);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach(s => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <header className="nav">
      <nav className="container nav-in" aria-label="Main">
        <a className="brand" href="#top" aria-label="B2OF Learning, back to the top">
          <img className="brand-mark" src="/assets/b2of-wordmark.png" alt="" width={736} height={217} />
          <span className="brand-word">LEARNING</span>
        </a>
        <button
          className="nav-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="nav-links"
          aria-label={open ? 'Close the menu' : 'Open the menu'}
          onClick={() => setOpen(o => !o)}
        >
          <Icon name={open ? 'x' : 'menu'} />
        </button>
        <div className={`nav-links${open ? ' open' : ''}`} id="nav-links">
          {LINKS.map(l => (
            <a
              key={l.id}
              href={`#${l.id}`}
              aria-current={current === l.id ? 'true' : 'false'}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </div>
        <a className="btn btn-primary nav-cta" href="https://newgen-lms.vercel.app/" target="_blank" rel="noopener noreferrer">
          Visit the LMS <Icon name="arrow-up-right" />
          <span className="sr-only">(opens the B2OF Learning LMS in a new tab)</span>
        </a>
      </nav>
    </header>
  );
}
