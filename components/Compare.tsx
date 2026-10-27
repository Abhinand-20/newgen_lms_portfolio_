'use client';

import { CSSProperties, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { Icon } from './Icons';

const SHIFT = [
  ['Passive content consumption', 'Active exploration'],
  ['Memorising information', 'Understanding mechanisms'],
  ['Reading instructions', 'Guided practical activities'],
  ['Completing lessons', 'Solving problems with what you learned'],
];

const COMPARE = [
  {
    num: '01',
    topic: 'Questions',
    lms: 'May rely on course materials or instructor support.',
    us: 'AI-assisted questions and answers, where available.',
    checks: ['Ask by voice (Talk mode) or typing (Tap mode)', 'Replies take into account the current screen and mission'],
  },
  {
    num: '02',
    topic: 'Explanations',
    lms: 'Usually provided through prepared learning content.',
    us: "Pre-voiced lesson explanations, plus AI-generated answers to learners' own questions, where supported.",
    checks: ["If an answer wasn't clear, the tutor explains it another way with a new example", 'Real-world examples and videos for each concept'],
  },
  {
    num: '03',
    topic: 'Learning interaction',
    lms: 'Depends on available course features.',
    us: 'Conversational and hands-on.',
    checks: [
      'Predict, run an experiment, then see the principle',
      'Photo inspection of the built robot; simulator before real hardware',
      "Spoken or typed answers in the learner's own words",
    ],
  },
  {
    num: '04',
    topic: 'Child-safety approach',
    lms: 'Depends on platform-specific safeguards.',
    us: "B2OF's verified controls:",
    checks: [
      'Sign-in required for every learning route we tested',
      'Tutor told never to give test answers; tone adapts to frustration',
      'Typing available instead of the microphone; spoken answers can be checked before sending',
    ],
  },
];

const order = (i: number) => ({ '--i': i }) as CSSProperties;

export default function Compare() {
  const explorer = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState(0);
  // the topics advance on their own until the visitor picks one; only while on screen and not hovered
  const [auto, setAuto] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = explorer.current;
    if (!el || !('IntersectionObserver' in window)) return;
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) setAuto(true);
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const playing = auto && onScreen && !hovered;

  const select = (i: number, focus = false) => {
    const next = (i + COMPARE.length) % COMPARE.length;
    setAuto(false);
    setActive(next);
    if (focus) tabs.current[next]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const map: Record<string, number> = {
      ArrowDown: active + 1,
      ArrowRight: active + 1,
      ArrowUp: active - 1,
      ArrowLeft: active - 1,
      Home: 0,
      End: COMPARE.length - 1,
    };
    if (e.key in map) {
      e.preventDefault();
      select(map[e.key], true);
    }
  };

  return (
    <section className="theme-brand vs" id="compare" aria-labelledby="compare-title">
      <div className="container">
        <div className="section-head reveal">
          <h2 id="compare-title">
            How B2OF differs from <span className="accent">traditional LMS platforms</span>
          </h2>
          <p className="lead">
            This compares learning approaches, not specific products. Conventional LMS platforms vary a lot, and many offer their
            own AI tutors, moderation and personalisation. The B2OF column describes only what we could verify in B2OF.
          </p>
        </div>

        {/* the shift: each old habit is struck through and turns into the new one, one after another */}
        <div className="vs-shift reveal">
          <h3>The shift in learning</h3>
          <ol>
            {SHIFT.map(([from, to], i) => (
              <li key={from} className="vs-tile" style={order(i)}>
                <span className="vs-tile-num" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="vs-from">
                  <span className="label">From</span>
                  <span className="vs-from-text">{from}</span>
                </span>
                <span className="vs-turn" aria-hidden="true">
                  <Icon name="arrow-down" />
                </span>
                <span className="sr-only">becomes</span>
                <span className="vs-to">
                  <span className="label">To</span>
                  <b>{to}</b>
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* state goes in a data attribute: className must stay static, RevealObserver adds `in` to it */}
        <div
          className="vs-explorer reveal"
          data-playing={playing}
          ref={explorer}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="vs-topics" role="tablist" aria-orientation="vertical" aria-label="Compare by topic" onKeyDown={onKeyDown}>
            {COMPARE.map((c, i) => (
              <button
                key={c.num}
                ref={el => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`vs-tab-${c.num}`}
                aria-controls={`vs-panel-${c.num}`}
                aria-selected={i === active}
                tabIndex={i === active ? 0 : -1}
                className="vs-topic"
                onClick={() => select(i)}
              >
                <span className="vs-topic-num" aria-hidden="true">
                  {c.num}
                </span>
                <span className="vs-topic-name">{c.topic}</span>
                <Icon name="chevron-right" />
                {/* fills while this topic is on show; when full, the next topic comes up */}
                {auto && i === active && (
                  <span className="vs-bar" aria-hidden="true">
                    <i onAnimationEnd={() => setActive(a => (a + 1) % COMPARE.length)} />
                  </span>
                )}
              </button>
            ))}
          </div>

          {COMPARE.map((c, i) => (
            <div
              key={c.num}
              role="tabpanel"
              id={`vs-panel-${c.num}`}
              aria-labelledby={`vs-tab-${c.num}`}
              className="vs-panel"
              hidden={i !== active}
              tabIndex={0}
            >
              <div className="vs-side vs-lms vs-anim" style={order(0)}>
                <span className="label">Conventional LMS</span>
                <p>{c.lms}</p>
              </div>
              <span className="vs-badge" aria-hidden="true">
                vs
              </span>
              <div className="vs-side vs-us vs-anim" style={order(1)}>
                <span className="label">B2OF Learning Platform</span>
                <p>{c.us}</p>
                <ul>
                  {c.checks.map((t, k) => (
                    <li key={t} className="vs-anim" style={order(k + 2)}>
                      <span className="vs-mark" role="img" aria-label="Verified">
                        <Icon name="check" />
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
