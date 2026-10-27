'use client';

import { useEffect } from 'react';

// children that cascade in after their `.reveal` parent (keep in sync with globals.css)
const STAGGER =
  '.section-head > *, .points li, .cats > li, .rail-stop, .cta > *';

/** Fades each `.reveal` element in once, the first time it scrolls into view. */
export default function RevealObserver() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal');
    els.forEach(el =>
      el.querySelectorAll<HTMLElement>(STAGGER).forEach((child, i) => child.style.setProperty('--i', String(Math.min(i, 12)))),
    );
    if (!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('in'));
      return;
    }
    const rv = new IntersectionObserver(
      entries => {
        // elements that enter together (a row of cards) follow one another
        let n = 0;
        entries.forEach(e => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).style.setProperty('--d', String(n++));
            e.target.classList.add('in');
            rv.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );
    els.forEach(el => rv.observe(el));
    return () => rv.disconnect();
  }, []);

  return null;
}
