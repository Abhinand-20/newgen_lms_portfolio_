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
              <span className="accent">80 robot models</span>, one
              <br />
              learning platform
            </h2>
          </div>
          <div className="hangar-intro">
            <p className="lead">
              <b>B2OF Learning</b> is an interactive robotics-learning platform where students don’t just read about robots.
              They understand, build, program and test them.
            </p>
            <p className="lead">
              The Robot Hangar holds 80 robot models across five categories. Each model follows a guided learning journey, from
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
              <span>80 models in the hangar</span>
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
      </div>
    </section>
  );
}
