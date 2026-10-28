'use client';

import { CSSProperties, useEffect, useRef, useState } from 'react';
import { Icon } from './Icons';

// each group takes one palette colour for its icon tile, highlight and loading line
const TONES = { tutor: 'violet', build: 'green', learn: 'primary', progress: 'warm' } as const;

type Group = keyof typeof TONES;

const FEATURES: { group: Group; icon: string; title: string; text: string }[] = [
  { group: 'tutor', icon: 'mic', title: 'Ask Your Tutor Anytime', text: 'Get step-by-step guidance whenever you need help.' },
  {
    group: 'tutor',
    icon: 'badge-check',
    title: 'AI-Powered Robot Evaluation',
    text: 'Upload robot photos and challenge videos to receive AI-powered analysis and feedback.',
  },
  { group: 'build', icon: 'flask', title: 'Hands-On Experiments', text: 'Learn by building, testing, and experimenting with robots.' },
  { group: 'progress', icon: 'trophy', title: 'Earn XP, Levels & Medals', text: 'Stay motivated with rewards and achievements as you learn each day.' },
  {
    group: 'learn',
    icon: 'telescope',
    title: 'Interactive Real-World Examples',
    text: 'Explore concepts through practical examples you can see and try.',
  },
  { group: 'learn', icon: 'play', title: 'Learn at Your Own Pace', text: 'Pause, resume, rewind, or move forward through scenes anytime.' },
  {
    group: 'tutor',
    icon: 'sparkles',
    title: 'Personalized AI Tutor',
    text: 'Get responses tailored to your learning progress, past interactions, and learning needs.',
  },
  { group: 'build', icon: 'bot', title: 'Visual Robot Programming', text: 'Create simple programs and see your robot respond in real time.' },
  {
    group: 'build',
    icon: 'code',
    title: 'Convert Instructions into Arduino Code',
    text: 'Turn your robot instructions into Arduino code for real-world projects.',
  },
  {
    group: 'progress',
    icon: 'award',
    title: 'Track Your Learning Progress',
    text: 'Follow your growth with a profile that reflects your progress and achievements.',
  },
  {
    group: 'progress',
    icon: 'send',
    title: 'Share Your Achievements',
    text: 'Celebrate your milestones by sharing your accomplishments on social media.',
  },
];

const num = (i: number) => String(i + 1).padStart(2, '0');
const tone = (g: Group) => {
  const t = TONES[g];
  return { '--ft': `var(--t-${t})`, '--ft-ink': `var(--t-${t}-ink)`, '--ft-soft': `var(--t-${t}-soft)` } as CSSProperties;
};

export default function Features() {
  const board = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  // the points light up one by one until the visitor picks one; only while on screen and not hovered
  const [auto, setAuto] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = board.current;
    if (!el || !('IntersectionObserver' in window)) return;
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) setAuto(true);
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const playing = auto && onScreen && !hovered;

  const select = (i: number) => {
    setAuto(false);
    setActive(i);
  };

  return (
    <section className="ft" id="features" aria-labelledby="features-title">
      <div className="container">
        <div className="section-head reveal">
          <p className="eyebrow" style={{ margin: 0 }}>
            Features
          </p>
          <h2 id="features-title">
            Everything You Need to <span className="accent">Learn, Build and Grow</span>
          </h2>
          <p className="lead">
            Eleven features inside B2OF Learning, from an AI tutor you can ask anytime to robots you program and achievements you
            can share.
          </p>
        </div>

        {/* state goes in a data attribute: className must stay static, RevealObserver adds `in` to it */}
        <div
          className="ft-board reveal"
          data-playing={playing}
          ref={board}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* one list, laid out down the left column (1 to 6) and then the right (7 to 11), so rows line up across both */}
          <ol className="ft-list">
            {FEATURES.map((x, i) => (
              <li key={x.title}>
                <button type="button" className="ft-point" aria-pressed={i === active} style={tone(x.group)} onClick={() => select(i)}>
                  <span className="ft-point-icon" aria-hidden="true">
                    <Icon name={x.icon} />
                  </span>
                  <span className="ft-point-copy">
                    <span className="ft-point-title">{x.title}</span>
                    <span className="ft-point-text">{x.text}</span>
                  </span>
                  <span className="ft-point-num" aria-hidden="true">
                    {num(i)}
                  </span>
                  {/* fills while this point is lit; when full, the next point lights up */}
                  {auto && i === active && (
                    <span className="ft-bar" aria-hidden="true">
                      <i onAnimationEnd={() => setActive(a => (a + 1) % FEATURES.length)} />
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
