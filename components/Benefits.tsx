'use client';

import { CSSProperties, KeyboardEvent, useRef, useState } from 'react';
import { Icon } from './Icons';

const AUDIENCES = [
  {
    id: 'students',
    num: '01',
    who: 'For Students',
    sub: 'Learn by Building',
    icon: 'user',
    tag: 'Turn curiosity into creativity, confidence, and real-world skills.',
    items: [
      ['Learn by Doing', 'Build, assemble, and experiment with robots instead of only learning from theory.'],
      ['AI-Powered Guidance', 'Get personalised explanations and step-by-step support from an interactive AI tutor.'],
      ['Explore at Your Own Pace', 'Learn through guided activities that adapt to different learning levels.'],
      ['Develop Future-Ready Skills', 'Strengthen problem-solving, logical thinking, creativity, and basic engineering and programming skills.'],
      ['Stay Motivated', 'Earn experience points, track progress, and celebrate learning milestones.'],
      ['Build Confidence', 'Test ideas, learn from mistakes, and turn completed projects into achievements.'],
    ],
    outcome: 'Students become active learners who explore, create, solve problems, and apply what they learn.',
  },
  {
    id: 'parents',
    num: '02',
    who: 'For Parents',
    sub: 'Stay Connected to Learning',
    icon: 'house',
    tag: "Support your child's growth beyond the classroom.",
    items: [
      ['Understand Learning Progress', 'Follow learning activities, milestones, and completed projects.'],
      ['Encourage Independent Learning', 'Give children access to guided activities that help them explore and practise independently.'],
      ['Make Learning Meaningful', 'Encourage practical activities that connect science, technology, and everyday life.'],
      ['Celebrate Every Achievement', 'Recognise progress, effort, creativity, and completed challenges.'],
      ['Support Learning at Home', 'Create opportunities for children to build, experiment, and share what they discover.'],
    ],
    outcome: "Parents can take a more active role in their child's learning journey and encourage curiosity beyond school hours.",
  },
  {
    id: 'educators',
    num: '03',
    who: 'For Educators',
    sub: 'Make Learning Practical',
    icon: 'cap',
    tag: 'Bring STEM concepts to life through guided, project-based learning.',
    items: [
      ['Hands-On STEAM Education', 'Use robotics projects to connect science, technology, engineering, and programming.'],
      ['Structured Learning Journeys', 'Guide students through building, testing, experimenting, and completing challenges.'],
      ['Support Different Learning Needs', 'Use AI-guided explanations and learning activities to support students at different levels.'],
      ['Encourage Critical Thinking', 'Help students investigate problems, test solutions, and improve their designs.'],
      ['Track Learning Activities', 'Use available progress information to understand student participation and completed work.'],
      ['Connect Theory with Practice', 'Turn abstract concepts into tangible projects students can demonstrate and explain.'],
    ],
    outcome: 'Educators can create more engaging, practical, and student-centred learning experiences.',
  },
];

const order = (i: number) => ({ '--i': i }) as CSSProperties;

export default function Benefits() {
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState(0);

  const select = (i: number, focus = false) => {
    const next = (i + AUDIENCES.length) % AUDIENCES.length;
    setActive(next);
    if (focus) tabs.current[next]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const map: Record<string, number> = { ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: AUDIENCES.length - 1 };
    if (e.key in map) {
      e.preventDefault();
      select(map[e.key], true);
    }
  };

  return (
    <section className="theme-brand pv" id="benefits" aria-labelledby="benefits-title">
      <div className="container">
        <div className="section-head reveal">
          <p className="eyebrow" style={{ margin: 0 }}>
            Benefits
          </p>
          <h2 id="benefits-title">
            One Learning Platform. Three Perspectives.
            <br />
            <span className="accent">A Better Way to Learn.</span>
          </h2>
          <p className="lead">
            B2OF Learning connects students, parents, and educators through hands-on robotics, AI-powered tutoring, and guided
            learning experiences that turn curiosity into practical skills.
          </p>
        </div>

        <div className="pv-tabs reveal" role="tablist" aria-label="Choose a perspective" onKeyDown={onKeyDown}>
          {AUDIENCES.map((a, i) => (
            <button
              key={a.id}
              ref={el => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`pv-tab-${a.id}`}
              aria-controls={`pv-panel-${a.id}`}
              aria-selected={i === active}
              tabIndex={i === active ? 0 : -1}
              className="pv-tab"
              onClick={() => select(i)}
            >
              <Icon name={a.icon} />
              <span className="pv-tab-num">{a.num}</span>
              {a.who}
            </button>
          ))}
        </div>

        {/* every panel stays in the page; only the chosen one is shown. Showing a panel replays its entrance (CSS) */}
        <div className="pv-stage reveal">
          {AUDIENCES.map((a, i) => (
            <div
              key={a.id}
              role="tabpanel"
              id={`pv-panel-${a.id}`}
              aria-labelledby={`pv-tab-${a.id}`}
              className="pv-panel"
              hidden={i !== active}
              tabIndex={0}
            >
              <div className="pv-lede">
                <div className="pv-anim" style={order(0)}>
                  <h3>{a.sub}</h3>
                  <p className="pv-tag">{a.tag}</p>
                </div>
                <p className="pv-out pv-anim" style={order(1)}>
                  <b>Outcome:</b> {a.outcome}
                </p>
              </div>
              <ul className="pv-list">
                {a.items.map(([title, text], k) => (
                  <li key={title} className="pv-anim" style={order(k + 2)}>
                    <span className="pv-mark" aria-hidden="true">
                      <Icon name="check" />
                    </span>
                    <div>
                      <h4>{title}</h4>
                      <p>{text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
