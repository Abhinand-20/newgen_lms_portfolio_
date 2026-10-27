'use client';

import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { Icon } from './Icons';

type Step = {
  id: string;
  verb: string;
  icon: string;
  text: string;
  tutor?: string;
  where: string;
  shot: string;
  alt: string;
};

const STEPS: Step[] = [
  {
    id: 'discover',
    verb: 'Discover',
    icon: 'telescope',
    text: 'The tutor introduces the Robot and narrates its story, setting the scene for the learner’s discovery journey.',
    tutor: 'Tells the story out loud and introduces each part of the robot.',
    where: 'Model Introduction · Mission 01 Meet the Robot',
    shot: 'model-intro.webp',
    alt: 'Model Introduction in the LMS: the tutor on Mars beside a wheeled rover that is stuck',
  },
  {
    id: 'explore',
    verb: 'Explore',
    icon: 'flask',
    text: 'One page per concept: a short conversation, a hands-on experiment, a real-world example and a quick question.',
    tutor: 'Sets up each experiment and waits while the learner tries it.',
    where: 'Mission 02 Discover the Science · Mission 03 Master the Principles',
    shot: 'science-friction.webp',
    alt: 'Discover the Science in the LMS: an experiment where the Octa-Pod walks on ice or rough ground',
  },
  {
    id: 'build',
    verb: 'Build',
    icon: 'wrench',
    text: 'Twelve guided assembly steps, four photos for an inspection, six coding challenges in a small robot language, then a simulator and an Arduino sketch for the real kit.',
    tutor: 'Reads each step aloud and asks if anything is unclear when a step is finished.',
    where: 'Mission 04 Build the Robot · Mission 05 Upload Your Model',
    shot: 'build-step.webp',
    alt: 'Build the Robot step 4 in the LMS with the assembly clip and the build guide',
  },
  {
    id: 'program',
    verb: 'Program',
    icon: 'code',
    text: 'Programming challenges in a simple robot language.',
    where: 'Mission 06 Program It',
    shot: 'program-it.webp',
    alt: 'Program It in the LMS: the Octa-Pod, its controller and the programming workstation',
  },
  {
    id: 'test',
    verb: 'Test',
    icon: 'play',
    text: 'Run the program in the simulator, set the wiring for an motor shield, download an Arduino sketch and test safely.',
    where: 'Mission 07 Test the Robot',
    shot: 'test-the-robot.webp',
    alt: 'Test the Robot in the LMS: the virtual workshop beside the HW-130 motor shield',
  },
  {
    id: 'showcase',
    verb: 'Showcase',
    icon: 'trophy',
    text: 'The learner films the robot running a course with five checkpoints: start, move, turn, react and finish.',
    tutor: 'Plays a demonstration of the final course and explains what the robot must do.',
    where: 'Mission 09 Showcase Your Robot',
    shot: 'showcase-course.webp',
    alt: 'Showcase Your Robot in the LMS: the course map with five checkpoints',
  },
];

export default function Journey() {
  const [current, setCurrent] = useState(0);
  const [seen, setSeen] = useState<Set<number>>(() => new Set([0]));
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const textRef = useRef<HTMLDivElement>(null);
  const shotRef = useRef<HTMLElement>(null);
  const firstRender = useRef(true);
  const focusNext = useRef(false);

  const showStep = (i: number, focus = false) => {
    const next = (i + STEPS.length) % STEPS.length;
    focusNext.current = focus;
    setCurrent(next);
    setSeen(s => new Set(s).add(next));
  };

  // fade the text and screenshot in on every step change (not on first load)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    [textRef.current, shotRef.current].forEach(el => {
      if (!el) return;
      el.classList.remove('fade-swap');
      void el.offsetWidth;
      el.classList.add('fade-swap');
    });
    if (focusNext.current) tabs.current[current]?.focus();
  }, [current]);

  const onKeyDown = (e: KeyboardEvent) => {
    const map: Record<string, number> = { ArrowRight: current + 1, ArrowLeft: current - 1, Home: 0, End: STEPS.length - 1 };
    if (e.key in map) {
      e.preventDefault();
      showStep(map[e.key], true);
    }
  };

  const s = STEPS[current];

  return (
    <section className="theme-sky" id="journey" aria-labelledby="journey-title">
      <div className="container">
        <div className="section-head reveal">
          <p className="eyebrow" style={{ margin: 0 }}>
            The B2OF Learning learning journey
          </p>
          <h2 id="journey-title">
            From Curiosity <span className="accent">to Creation</span>
          </h2>
          <p className="lead">
            B2OF Learning introduces learners to robotics through a guided journey that connects scientific understanding with
            the process of building and exploring a robot.
          </p>
        </div>
        <div className="rail reveal" role="tablist" aria-label="Learning journey" id="rail" onKeyDown={onKeyDown}>
          {STEPS.map((step, k) => (
            <button
              key={step.id}
              ref={el => {
                tabs.current[k] = el;
              }}
              type="button"
              className={`rail-stop${seen.has(k) && k !== current ? ' seen' : ''}`}
              role="tab"
              id={`tab-${step.id}`}
              aria-controls="stage-panel"
              aria-selected={k === current}
              tabIndex={k === current ? 0 : -1}
              onClick={() => showStep(k)}
            >
              <span className="rail-node" aria-hidden="true">
                <Icon name={step.icon} />
              </span>
              <span>{step.verb}</span>
            </button>
          ))}
        </div>
        <div className="stage-panel" role="tabpanel" id="stage-panel" aria-labelledby={`tab-${s.id}`}>
          <div id="step-text" ref={textRef}>
            <p className="label" id="step-count" style={{ color: 'var(--accent-ink)' }}>
              Step {current + 1} of {STEPS.length}
            </p>
            <h3 id="step-title">{s.verb}</h3>
            <p className="lead" id="step-body">
              {s.text}
            </p>
            <p className="tutor-note" hidden={!s.tutor}>
              <img src="/assets/nova-wave.webp" alt="" />
              <span>
                <b>The tutor at this step</b>
                <span id="step-tutor">{s.tutor || ''}</span>
              </span>
            </p>
            <div className="where-row">
              <span className="where">
                <Icon name="map-pin" />
                <span id="step-where">{s.where}</span>
              </span>
              <span className="status">
                <Icon name="badge-check" style={{ width: 13, height: 13 }} />
                Verified
              </span>
            </div>
            <div className="step-nav">
              <button type="button" className="icon-btn" id="step-prev" aria-label="Previous step" onClick={() => showStep(current - 1)}>
                <Icon name="chevron-left" />
              </button>
              <button type="button" className="icon-btn" id="step-next" aria-label="Next step" onClick={() => showStep(current + 1)}>
                <Icon name="chevron-right" />
              </button>
            </div>
          </div>
          <figure className="frame" style={{ margin: 0 }} id="step-shot" ref={shotRef}>
            <div className="frame-bar" aria-hidden="true">
              <i />
              <i />
              <i />
              <span id="step-shot-label">In the LMS · {s.where.split(' · ')[0]}</span>
            </div>
            <img id="step-img" src={`/assets/${s.shot}`} alt={s.alt} width={1280} height={800} />
          </figure>
        </div>
      </div>
    </section>
  );
}
