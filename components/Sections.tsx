import type { CSSProperties } from 'react';
import { Icon } from './Icons';
import NovaChat from './NovaChat';

export function Companion() {
  return (
    <section className="theme-violet" id="companion" aria-labelledby="companion-title">
      <div className="container two-col">
        <div className="reveal">
          <h2 id="companion-title">
            Not Just an AI That Answers. <span className="accent">A Companion That Guides.</span>
          </h2>
          <p className="lead" style={{ marginTop: 18 }}>
            Students can talk or type. The tutor explains in short, simple language, then asks a question back, so the learner
            decides what to explore next.
          </p>
          <ul className="points">
            <li>
              <span className="mark">
                <Icon name="check" />
              </span>
              <span>
                <b>Voice or text:</b> ask in whichever way feels natural.
              </span>
            </li>
            <li>
              <span className="mark">
                <Icon name="check" />
              </span>
              <span>
                <b>Hints before answers:</b> built to spark curiosity, not replace thinking.
              </span>
            </li>
            <li>
              <span className="mark">
                <Icon name="check" />
              </span>
              <span>
                <b>Ask again:</b> a different explanation or example whenever something is unclear.
              </span>
            </li>
          </ul>
        </div>
        <NovaChat />
      </div>
    </section>
  );
}

const CATEGORIES = [
  { name: 'Engines', color: '#f08c00', models: ['V6 Engine', 'Motorized Pump'] },
  { name: 'Walkers', color: '#4263eb', models: ['Octa-Pod', 'StrandBeest', 'Bi-Ped Walker'] },
  { name: 'Arms', color: '#7c5cfc', models: ['6 DOF Robotic Arm', 'Hand Tracking Robot', 'Car with Arm'] },
  { name: 'Vehicles', color: '#12936a', models: ['Torsion Boat', 'Drone', 'Tower Crane'] },
  { name: 'AI', color: '#e0457b', models: ['Robotic Head', 'Animatronic Eyes', 'Colour Sorting Conveyor', 'AI Desk-Bot'] },
];

export function Hangar() {
  return (
    <section className="theme-cream" id="hangar" aria-labelledby="hangar-title">
      <div className="container">
        <div className="hangar-top reveal">
          <div className="hangar-head">
            <p className="eyebrow">The Robot Hangar</p>
            <h2 id="hangar-title">
              Learn robotics by building it
              <br />
              <span className="accent">
                15 robot models, one
                <br />
                learning platform
              </span>
            </h2>
          </div>
          <div className="hangar-intro">
            <p className="lead">
              <b>B2OF Learning</b> is an interactive robotics-learning platform where students don’t just read about robots.
              They understand, build, program and test them.
            </p>
            <p className="lead">
              The Robot Hangar holds 15 robot models across five categories. Each model follows a guided learning journey, from
              first discovery to hands-on construction and a final assessment.
            </p>
          </div>
        </div>
        <div className="hangar-body">
          <figure className="frame reveal" style={{ margin: 0 }}>
            <div className="frame-bar" aria-hidden="true">
              <i />
              <i />
              <i />
              <span>In the LMS · Robot Hangar</span>
            </div>
            <img
              src="/assets/robot-hangar.webp"
              width={1920}
              height={877}
              loading="lazy"
              alt="The Robot Hangar in the LMS: 15 robot models in category tabs, with the Octa-Pod marked Ready and Nova asking the learner to select a robot"
            />
          </figure>
          <div className="reveal">
            <div className="cats-head">
              <h3>Five categories</h3>
              <span>15 models in the hangar</span>
            </div>
            <ul className="cats" aria-label="Robot models by category">
              {CATEGORIES.map(c => (
                <li key={c.name} className="cat" style={{ '--cat': c.color } as CSSProperties}>
                  <div>
                    <h4>{c.name}</h4>
                    <small>{c.models.length} models</small>
                  </div>
                  <ul>
                    {c.models.map(m => (
                      <li key={m}>{m}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

const FEATURES = [
  {
    title: 'Experience points',
    text: 'XP for steps, challenges, correct answers and finished missions, and 1 XP for every new thing a learner tries. Each reward counts once.',
  },
  {
    title: 'Visual progress',
    text: 'A path through all nine missions in Mission Control; they open in order, and the Showcase is open from the start.',
  },
  { title: 'Levels and badges', text: 'Six levels from Robot Explorer to Master and the Engineer badge from level 2.' },
  { title: 'Positive reinforcement', text: 'Praise for trying and experimenting, and a celebration when a mission is done.' },
];

export function Progress() {
  return (
    <section className="theme-mint" id="progress" aria-labelledby="progress-title">
      <div className="container">
        <div className="section-head reveal">
          <p className="eyebrow" style={{ margin: 0 }}>
            A learning journey that remembers
          </p>
          <h2 id="progress-title">
            Progress That Makes <span className="accent">Learning Visible</span>
          </h2>
          <p className="lead">
            Visual progress and positive reinforcement help learners recognize their effort, track milestones, and stay engaged
            as they move through their learning journey.
          </p>
        </div>
        <div className="progress-grid">
          <ul className="features card reveal">
            {FEATURES.map(f => (
              <li key={f.title}>
                <div className="top">
                  <h4>{f.title}</h4>
                  <span className="status">Verified</span>
                </div>
                <p>{f.text}</p>
              </li>
            ))}
          </ul>
          <figure className="pcard card reveal" style={{ margin: 0 }} aria-labelledby="pcard-title">
            <div className="pcard-head">
              <img src="/assets/octapod.webp" alt="" width={900} height={634} />
              <div>
                <b id="pcard-title">Sample learner</b>
                <span>Octa-Pod journey</span>
              </div>
              <span className="status sample">Sample data</span>
            </div>
            <div>
              <div className="xp-row">
                <span className="label" style={{ margin: 0 }}>
                  Experience points
                </span>
                <b>340 / 2,000 XP</b>
              </div>
              <div className="meter" role="img" aria-label="340 of 2,000 XP">
                <span />
              </div>
              <p>
                Level 2 · <b>Robot Builder</b> · 160 XP to Robot Engineer
              </p>
            </div>
            <div>
              <span className="label">Missions</span>
              <ol className="dots">
                {[1, 2, 3, 4].map(n => (
                  <li key={n} className="done">
                    <Icon name="check" />
                    <span className="sr-only">Mission {n} complete</span>
                  </li>
                ))}
                <li className="now">05</li>
                <li>06</li>
                <li>07</li>
                <li>08</li>
                <li>09</li>
              </ol>
              <p>4 of 9 missions complete · next: Upload Your Model</p>
            </div>
            <div>
              <span className="label">Badges and levels</span>
              <ul className="badges">
                <li className="earned">
                  <Icon name="award" />
                  Octa-Pod Engineer
                </li>
                <li className="earned">
                  <Icon name="check" />
                  Robot Explorer
                </li>
                <li className="earned">
                  <Icon name="check" />
                  Robot Builder
                </li>
                <li>
                  <Icon name="lock" />
                  Robot Engineer
                </li>
              </ul>
            </div>
            <div>
              <span className="label">Recent rewards</span>
              <ul className="rewards">
                <li>
                  <Icon name="sparkles" />
                  <b>+25 XP</b>Mission complete: Build the Robot
                </li>
              </ul>
            </div>
            <figcaption className="pcard-cap">
              Sample data for illustration: the learner, XP total and mission count are made up. The level thresholds, the badge
              and the XP amounts follow the LMS&apos;s real rules.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

const AUDIENCES = [
  {
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
    num: '03',
    who: 'For Educators',
    sub: 'Make Learning Practical',
    icon: 'cap',
    tag: 'Bring STEM concepts to life through guided, project-based learning.',
    items: [
      ['Hands-On STEM Education', 'Use robotics projects to connect science, technology, engineering, and programming.'],
      ['Structured Learning Journeys', 'Guide students through building, testing, experimenting, and completing challenges.'],
      ['Support Different Learning Needs', 'Use AI-guided explanations and learning activities to support students at different levels.'],
      ['Encourage Critical Thinking', 'Help students investigate problems, test solutions, and improve their designs.'],
      ['Track Learning Activities', 'Use available progress information to understand student participation and completed work.'],
      ['Connect Theory with Practice', 'Turn abstract concepts into tangible projects students can demonstrate and explain.'],
    ],
    outcome: 'Educators can create more engaging, practical, and student-centred learning experiences.',
  },
];

export function Benefits() {
  return (
    <section className="theme-blush" id="benefits" aria-labelledby="benefits-title">
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
        <div className="ben-grid">
          {AUDIENCES.map(a => (
            <article key={a.num} className="ben card reveal">
              <div className="ben-head">
                <span className="ben-ic" aria-hidden="true">
                  <Icon name={a.icon} />
                </span>
                <div>
                  <span className="ben-num">{a.num}</span>
                  <h3>{a.who}</h3>
                  <span className="ben-sub">{a.sub}</span>
                </div>
              </div>
              <p className="ben-tag">{a.tag}</p>
              <ul>
                {a.items.map(([title, text]) => (
                  <li key={title}>
                    <span className="mark" aria-hidden="true">
                      <Icon name="check" />
                    </span>
                    <div>
                      <h4>{title}</h4>
                      <p>{text}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="ben-out">
                <b>Outcome:</b> {a.outcome}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

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

export function Compare() {
  return (
    <section className="theme-lavender" id="compare" aria-labelledby="compare-title">
      <div className="container">
        <div className="cmp-top">
          <div className="reveal">
            <h2 id="compare-title">
              How B2OF differs from <span className="accent">traditional LMS platforms</span>
            </h2>
            <p className="lead">
              This compares learning approaches, not specific products. Conventional LMS platforms vary a lot, and many offer
              their own AI tutors, moderation and personalisation. The B2OF column describes only what we could verify in B2OF.
            </p>
          </div>
          <div className="shift card reveal">
            <h3>The shift in learning</h3>
            <div className="shift-cols label" aria-hidden="true">
              <span>From</span>
              <span>To</span>
            </div>
            <ol>
              {SHIFT.map(([from, to]) => (
                <li key={from}>
                  <span className="from">{from}</span>
                  <span className="arrow" aria-hidden="true">
                    <Icon name="arrow-right" />
                  </span>
                  <span className="sr-only">becomes</span>
                  <b className="to">{to}</b>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="cmp-cards">
          {COMPARE.map(c => (
            <article key={c.num} className="cmp card reveal">
              <h3>
                <span aria-hidden="true">{c.num}</span>
                {c.topic}
              </h3>
              <div className="lms">
                <span className="label">Conventional LMS</span>
                <p>{c.lms}</p>
              </div>
              <div className="us">
                <span className="label">B2OF Learning Platform</span>
                <p>{c.us}</p>
                <ul>
                  {c.checks.map(t => (
                    <li key={t}>
                      <span className="mark" role="img" aria-label="Verified">
                        <Icon name="check" />
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Cta() {
  return (
    <section className="theme-cta" id="start" aria-labelledby="final-title">
      <div className="container cta reveal">
        <p className="eyebrow">Start the journey</p>
        <h2 id="final-title">
          Ready to Explore a <span className="accent">New Way to Learn?</span>
        </h2>
        <p className="lead">
          Discover how B2OF Learning brings together robotics, guided learning, and an interactive AI tutor to make learning more
          engaging.
        </p>
        <div className="cta-buttons">
          <a className="btn btn-primary" href="https://newgen-lms.vercel.app/" target="_blank" rel="noopener noreferrer">
            Explore B2OF Learning <Icon name="arrow-up-right" />
            <span className="sr-only">(opens the B2OF Learning LMS in a new tab)</span>
          </a>
        </div>
        <p className="note">Both open the B2OF Learning LMS, which asks learners to sign in or create an account.</p>
      </div>
    </section>
  );
}
