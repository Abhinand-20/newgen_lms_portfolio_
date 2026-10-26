'use client';

import { useEffect, useRef, useState } from 'react';
import { Icon } from './Icons';

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Nova built from layers: says Hi, then stands with eyes that follow the pointer and blink. */
function Nova() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [waving, setWaving] = useState(true);
  const [blink, setBlink] = useState(false);
  const hiTimer = useRef<number | undefined>(undefined);

  const hi = () => {
    setWaving(true);
    window.clearTimeout(hiTimer.current);
    hiTimer.current = window.setTimeout(() => setWaving(false), 2200);
  };

  useEffect(() => {
    hi();
    const svg = svgRef.current!;
    const irises = svg.querySelectorAll('.iris');
    let target: { x: number; y: number } | null = null;
    let gx = 0;
    let gy = 0;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      target = { x: e.clientX, y: e.clientY };
    };
    addEventListener('pointermove', onMove);
    // eye follow: same formula as the app (tutor-character.tsx)
    const look = () => {
      let tx = 0;
      let ty = 0;
      if (target) {
        const r = svg.getBoundingClientRect();
        const ex = r.left + r.width * 0.5;
        const ey = r.top + r.height * 0.19;
        const dx = target.x - ex;
        const dy = target.y - ey;
        const len = Math.hypot(dx, dy) || 1;
        const k = Math.min(1, len / 260);
        tx = (dx / len) * 2.6 * k;
        ty = (dy / len) * 2.3 * k;
      }
      gx += (tx - gx) * 0.18;
      gy += (ty - gy) * 0.18;
      irises.forEach(g => g.setAttribute('transform', `translate(${gx.toFixed(2)} ${gy.toFixed(2)})`));
      frame = requestAnimationFrame(look);
    };
    look();

    let blinkTimer = 0;
    const scheduleBlink = () => {
      blinkTimer = window.setTimeout(() => {
        setBlink(true);
        blinkTimer = window.setTimeout(() => {
          setBlink(false);
          scheduleBlink();
        }, 140);
      }, 2500 + Math.random() * 3000);
    };
    scheduleBlink();

    return () => {
      removeEventListener('pointermove', onMove);
      cancelAnimationFrame(frame);
      window.clearTimeout(blinkTimer);
      window.clearTimeout(hiTimer.current);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className={`stage-nova${waving ? ' waving' : ''}${blink ? ' blink' : ''}`}
      id="hero-nova"
      viewBox="0 0 220 262"
      role="img"
      aria-label="Nova the fox says hi"
      onClick={hi}
    >
      <defs>
        <mask id="novaML" maskUnits="userSpaceOnUse" x="68.306" y="66.916" width="30.884" height="30.884">
          <image href="/assets/nova/eye-mask-left.png" x="68.306" y="66.916" width="30.884" height="30.884" />
        </mask>
        <clipPath id="novaCL">
          <ellipse cx="83.663" cy="82.443" rx="11.787" ry="12.302" />
        </clipPath>
        <mask id="novaMR" maskUnits="userSpaceOnUse" x="104.509" y="66.744" width="30.884" height="30.884">
          <image href="/assets/nova/eye-mask-right.png" x="104.509" y="66.744" width="30.884" height="30.884" />
        </mask>
        <clipPath id="novaCR">
          <ellipse cx="119.952" cy="82.186" rx="11.530" ry="12.388" />
        </clipPath>
        <linearGradient id="novaLid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E2600F" />
          <stop offset=".75" stopColor="rgb(210,69,2)" />
          <stop offset="1" stopColor="#EE7426" />
        </linearGradient>
      </defs>
      <g className="pose idle">
        <image href="/assets/nova/tail-idle.webp" x="24.039" y="0" width="171.921" height="262" />
        <image href="/assets/nova/body-idle.webp" x="24.039" y="0" width="171.921" height="262" />
        <g mask="url(#novaML)">
          <g className="iris">
            <image href="/assets/nova/iris-left.webp" x="78.792" y="77.048" width="16.815" height="16.815" />
          </g>
        </g>
        <g clipPath="url(#novaCL)">
          <rect className="lid" x="71.875" y="70.141" width="23.575" height="24.604" fill="url(#novaLid)" />
        </g>
        <path className="lash" d="M74.469 83.920 Q83.663 90.071 92.857 83.920" fill="none" stroke="#1a1416" strokeWidth="1.3" strokeLinecap="round" />
        <g mask="url(#novaMR)">
          <g className="iris">
            <image href="/assets/nova/iris-right.webp" x="108.220" y="76.887" width="16.815" height="16.815" />
          </g>
        </g>
        <g clipPath="url(#novaCR)">
          <rect className="lid" x="108.422" y="69.798" width="23.060" height="24.776" fill="url(#novaLid)" />
        </g>
        <path className="lash" d="M110.958 83.673 Q119.952 89.866 128.945 83.673" fill="none" stroke="#1a1416" strokeWidth="1.3" strokeLinecap="round" />
      </g>
      <g className="pose wv">
        <image href="/assets/nova/wave-body.webp" x="0.018" y="0" width="195.799" height="262" />
        <g className="hand">
          <image href="/assets/nova/wave-hand.webp" x="0.018" y="0" width="195.799" height="262" />
        </g>
      </g>
    </svg>
  );
}

const CONVO = [
  {
    q: 'How does the Octa-Pod walk without wheels?',
    a: "A motor turns a crank, and the crank moves the legs one after another. That's how it climbs over rocks where wheels get stuck.",
  },
  {
    q: 'What makes it stop before the box?',
    a: 'The distance sensor on its front! Your program checks it, and when something is closer than 20 cm, the robot stops.',
  },
];

/** Demo conversation: types each answer, holds it, then moves to the next pair. */
function DemoConversation() {
  const [{ i, chars }, setPos] = useState({ i: 0, chars: 0 });

  useEffect(() => {
    if (prefersReducedMotion()) {
      setPos({ i: 0, chars: Infinity });
      return;
    }
    let idx = 0;
    let n = 0;
    let hold = 0;
    const t = window.setInterval(() => {
      const len = CONVO[idx].a.length;
      if (n < len) {
        n += 2;
        setPos({ i: idx, chars: n });
      } else if (++hold > 70) {
        hold = 0;
        n = 0;
        idx = (idx + 1) % CONVO.length;
        setPos({ i: idx, chars: 0 });
      }
    }, 45);
    return () => window.clearInterval(t);
  }, []);

  const pair = CONVO[i];
  return (
    <div className="convo" aria-live="off">
      <span className="demo-tag label">
        <span className="wave" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
          <i />
        </span>
        Demo conversation
      </span>
      <p className="bubble bubble-student" id="hero-q">
        {pair.q}
      </p>
      <div className="bubble bubble-tutor">
        <span className="who">
          <i />
          Nova · AI tutor
        </span>
        <span id="hero-a" aria-hidden="true">
          {pair.a.slice(0, chars)}
          {chars < pair.a.length && <span className="caret" />}
        </span>
        <span className="sr-only" id="hero-a-full">
          {pair.a}
        </span>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="hero theme-blue" id="top" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="reveal">
          <p className="eyebrow">Learn by Talking. Discover by Doing.</p>
          <h1 id="hero-title">
            Beyond Learning <span className="accent">Into Creating.</span>
          </h1>
          <p className="lead">
            Meet the AI learning companion that helps young innovators explore science, discover robotics, and turn curiosity
            into real-world creations.
          </p>
        </div>
        <div className="stage reveal" aria-label="Nova, the AI tutor, next to the Octa-Pod robot, answering a learner's question">
          <div className="stage-glow" aria-hidden="true" />
          <div className="stage-ring" aria-hidden="true" />
          <div className="stage-ring r2" aria-hidden="true" />
          <div className="stage-floor" aria-hidden="true" />
          <Nova />
          <img className="stage-bot" src="/assets/octapod.webp" alt="" width={900} height={634} />
          <DemoConversation />
          <div className="float f-mission">
            <span className="ic">
              <Icon name="wrench" />
            </span>
            <span>
              <small>Mission 04</small>Build step 4 of 12
            </span>
          </div>
          <div className="float f-experiment">
            <span className="ic">
              <Icon name="flask" />
            </span>
            <span>
              <small>Experiment</small>Ice or rough ground?
            </span>
          </div>
          <div className="float f-talk">
            <span className="ic">
              <Icon name="mic" />
            </span>
            <span>
              <small>Talk mode</small>I&apos;m listening!
            </span>
            <span className="wave" aria-hidden="true" style={{ color: 'var(--accent)' }}>
              <i />
              <i />
              <i />
              <i />
              <i />
            </span>
          </div>
          <div className="float f-xp">
            <span className="ic">
              <Icon name="sparkles" />
            </span>
            <span>
              <small>+1 XP</small>for trying something new
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
