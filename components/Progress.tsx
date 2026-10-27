'use client';

import { CSSProperties, useEffect, useRef, useState } from 'react';
import { Icon } from './Icons';

const FEATURES = [
  {
    icon: 'sparkles',
    title: 'Experience points',
    text: 'XP for steps, challenges, correct answers and finished missions, and 1 XP for every new thing a learner tries. Each reward counts once.',
  },
  {
    icon: 'map-pin',
    title: 'Visual progress',
    text: 'A path through all nine missions in Mission Control; they open in order, and the Showcase is open from the start.',
  },
  { icon: 'award', title: 'Levels and badges', text: 'Six levels from Robot Explorer to Master and the Engineer badge from level 2.' },
  { icon: 'trophy', title: 'Positive reinforcement', text: 'Praise for trying and experimenting, and a celebration when a mission is done.' },
];

const BADGES = [
  { name: 'Octa-Pod Engineer', icon: 'award', earned: true },
  { name: 'Robot Explorer', icon: 'check', earned: true },
  { name: 'Robot Builder', icon: 'check', earned: true },
  { name: 'Robot Engineer', icon: 'lock', earned: false },
];

const XP = 340;
const XP_MAX = 2000;
const MISSIONS = 9;
const DONE = 4;

// XP gauge: a ring drawn with stroke-dasharray, filled to XP / XP_MAX
const R = 84;
const C = 2 * Math.PI * R;
const FILL = C * (1 - XP / XP_MAX);

/** Counts up to `to` once `el` scrolls into view; shows the final number straight away with reduced motion. */
function useCountUp(ref: React.RefObject<HTMLElement | null>, to: number) {
  const [value, setValue] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    // same trigger as RevealObserver, so the count starts as the dashboard fades in
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now() + 300;
        const tick = (now: number) => {
          const t = Math.min(1, Math.max(0, (now - start) / 1800));
          setValue(Math.round(to * (1 - Math.pow(1 - t, 4))));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [ref, to]);

  return value;
}

export default function Progress() {
  const board = useRef<HTMLElement>(null);
  const xp = useCountUp(board, XP);

  return (
    <section className="theme-brand mc" id="progress" aria-labelledby="progress-title">
      <div className="container">
        <div className="section-head reveal">
          <p className="eyebrow" style={{ margin: 0 }}>
            A learning journey that remembers
          </p>
          <h2 id="progress-title">
            Progress That Makes <span className="accent">Learning Visible</span>
          </h2>
          <p className="lead">
            Visual progress and positive reinforcement help learners recognize their effort, track milestones, and stay engaged as
            they move through their learning journey.
          </p>
        </div>

        <figure
          className="mc-board reveal"
          ref={board}
          aria-labelledby="mc-learner-title"
          style={{ '--mc-c': C, '--mc-fill': FILL } as CSSProperties}
        >
          <div className="mc-tile mc-learner">
            <div className="mc-learner-head">
              <img src="/assets/octapod.webp" alt="" width={900} height={634} />
              <div>
                <b id="mc-learner-title">Sample learner</b>
                <span>Octa-Pod journey</span>
              </div>
              <span className="status sample">Sample data</span>
            </div>

            <div className="mc-gauge" role="img" aria-label="340 of 2,000 XP">
              <svg viewBox="0 0 200 200" aria-hidden="true">
                <defs>
                  <linearGradient id="mc-grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#3fa8f4" />
                    <stop offset="1" stopColor="#39b44a" />
                  </linearGradient>
                </defs>
                <circle className="mc-gauge-track" cx="100" cy="100" r={R} />
                <circle className="mc-gauge-fill" cx="100" cy="100" r={R} strokeDasharray={C} strokeDashoffset={FILL} stroke="url(#mc-grad)" />
              </svg>
              <div className="mc-gauge-text" aria-hidden="true">
                <span className="label">Experience points</span>
                <b className="mc-xp-num">{xp}</b>
                <span>/ 2,000 XP</span>
              </div>
            </div>

            <p className="mc-level">
              Level 2 · <b>Robot Builder</b> · 160 XP to Robot Engineer
            </p>
          </div>

          <div className="mc-tile mc-missions">
            <div className="mc-tile-top">
              <span className="label">Missions</span>
              <span className="mc-count" aria-hidden="true">
                <b>{DONE}</b> / {MISSIONS}
              </span>
            </div>
            <div className="mc-track">
              <span className="mc-track-line" aria-hidden="true">
                <span className="mc-track-fill" style={{ width: `${(DONE / (MISSIONS - 1)) * 100}%` }} />
              </span>
              <ol className="mc-nodes">
                {Array.from({ length: MISSIONS }, (_, k) => {
                  const n = k + 1;
                  const order = { '--i': k } as CSSProperties;
                  if (n <= DONE)
                    return (
                      <li key={n} className="mc-node is-done" style={order}>
                        <Icon name="check" />
                        <span className="sr-only">Mission {n} complete</span>
                      </li>
                    );
                  return (
                    <li key={n} className={`mc-node${n === DONE + 1 ? ' is-now' : ''}`} style={order}>
                      {String(n).padStart(2, '0')}
                    </li>
                  );
                })}
              </ol>
            </div>
            <p className="mc-note">4 of 9 missions complete · next: Upload Your Model</p>
          </div>

          <div className="mc-tile mc-badges">
            <span className="label">Badges and levels</span>
            <ul>
              {BADGES.map((b, i) => (
                <li key={b.name} className={`mc-badge${b.earned ? ' is-earned' : ''}`} style={{ '--i': i } as CSSProperties}>
                  <span className="mc-medal" aria-hidden="true">
                    <Icon name={b.icon} />
                  </span>
                  {b.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="mc-tile mc-reward">
            <span className="label">Recent rewards</span>
            <p>
              <span className="mc-reward-xp">
                <Icon name="sparkles" />
                <b>+25 XP</b>
              </span>
              Mission complete: Build the Robot
            </p>
          </div>

          <figcaption className="mc-cap">
            Sample data for illustration: the learner, XP total and mission count are made up. The level thresholds, the badge and
            the XP amounts follow the LMS&apos;s real rules.
          </figcaption>
        </figure>

        <ul className="mc-features">
          {FEATURES.map(f => (
            <li key={f.title} className="reveal">
              <div className="mc-f-top">
                <span className="mc-f-ic" aria-hidden="true">
                  <Icon name={f.icon} />
                </span>
                <h3>{f.title}</h3>
              </div>
              <p>{f.text}</p>
              <span className="status">
                <Icon name="badge-check" />
                Verified
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
