import { BenefitTabs, DaySteps, FivePs, MikoDemo } from '@/components/fourp/Interactive';

const APP_URL = 'https://4p-familyweb.vercel.app/';
const A = '/assets/4pfamily';

const ICON = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

const POINTS = [
  {
    title: 'Talk or type',
    text: "Voice mode for children who'd rather talk, Chat mode for typing. Miko speaks her lines in both.",
    icon: (
      <>
        <path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3Z" />
        <path d="M19 11a7 7 0 0 1-14 0M12 18v3" />
      </>
    ),
  },
  {
    title: 'Doubts come first',
    text: 'Before answering, children can ask what a word means or ask for an example. Miko explains in simple words and never gives the answer away.',
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.5V14M12 17.5h.01" />
      </>
    ),
  },
  {
    title: 'One follow-up that listens',
    text: 'Once an answer is saved, Miko asks one more question about something your child said, so the talk keeps going.',
    icon: (
      <>
        <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" />
        <path d="M8.5 11h7M8.5 14h4" />
      </>
    ),
  },
  {
    title: 'Safe words, every time',
    text: "If a child says something worrying, Miko doesn't improvise. She gently points them to a trusted grown-up.",
    icon: (
      <>
        <path d="M12 3 4 6v6c0 4.5 3.4 8.4 8 9 4.6-.6 8-4.5 8-9V6l-8-3Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  },
];

const FEATURES = [
  ['Memories', 'Every saved conversation with its follow-up, newest first. Favourite the ones you love and look back any time.'],
  ['Discover', 'Opens after the first saved conversation. Topics are described in words, never scored, and no child is ever compared with another.'],
  ['Weekly challenge', 'One family activity a week, like Family Olympics or the Blackout Challenge, with steps and tips. Activity photos are cleaned of location data and only you can see them.'],
  ['Journal', "Your child's evening journal, saved for you to read. Anything that might need a grown-up's attention is marked."],
  ['Explore deeper', 'Deeper questions on a topic your child keeps returning to (200 in all), unlocked after 20 saved conversations.'],
  ['More than one child', 'Each child has their own nickname, age band, questions, memories and Discover.'],
];

const COMPARE = [
  ['Where questions come from', 'Generated on the fly, or an endless feed of content.', 'A written library of 100 daily questions. The AI never writes the daily question.'],
  ['Time on screen', 'Designed to keep children playing and scrolling.', 'One question a day, about five to ten minutes, then talk and do together.'],
  ['What the AI does', 'Open-ended chat about anything.', 'Helps with one question: explains it, encourages, asks one follow-up. It never diagnoses, labels, compares or ranks a child.'],
  ["Your child's data", 'Profiles with birthdays, schools or locations.', 'A nickname and an age band. No birthday, school, address or location.'],
  ['Hard moments', 'Moderation varies from app to app.', 'Worrying words get a fixed line pointing to a trusted grown-up, never an improvised AI reply, and the parent sees it marked.'],
  ['Social pressure', 'Feeds, likes, streak counts and leaderboards.', 'No feeds, public profiles or leaderboards.'],
];

export default function FourPFamily() {
  return (
    <>
      <header className="top">
        <div className="wrap">
          <a className="brand" href="#top" aria-label="4P Family, back to the top">
            <img src="/assets/b2of-logo.png" alt="" width={282} height={260} />
            <span>Family</span>
          </a>
          <nav className="nav" aria-label="Sections">
            <a href="#miko">Miko</a>
            <a href="#ps">The five Ps</a>
            <a href="#day">A day</a>
            <a href="#discover">Discover</a>
            <a href="#benefits">Benefits</a>
            <a href="#why">Why 4P</a>
          </nav>
          <a className="btn primary" href={APP_URL} target="_blank" rel="noopener">
            Open 4P Family
          </a>
        </div>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="wrap">
            <div className="copy">
              <span className="eyebrow">One question a day</span>
              <h1 id="hero-title">
                Ask one question. <em>Discover your child.</em>
              </h1>
              <p className="lede">
                4P Family is a free, private app for families with children aged 3 to 18. Every day it brings one good question to
                talk about together, and quietly notices what your child keeps coming back to. The question is a doorway, not a
                test.
              </p>
              <div className="ctas">
                <a className="btn primary" href={APP_URL} target="_blank" rel="noopener">
                  Start today&apos;s question
                </a>
                <a className="btn ghost" href="#day">
                  See a day with 4P
                </a>
              </div>
              <div className="facts" aria-label="The library at a glance">
                <div><b>100</b><span>daily questions</span></div>
                <div><b>5</b><span>Ps to explore</span></div>
                <div><b>3 to 18</b><span>years, in five age bands</span></div>
                <div><b>5 to 10</b><span>minutes a question</span></div>
              </div>
            </div>
            <div className="stage">
              <div className="home-card" aria-label="Sample of Home">
                <div className="chip-row">
                  <span className="pchip">
                    <i>
                      <img src={`${A}/p-problem-solving.webp`} alt="" />
                    </i>
                    Problem-Solving · 6 min
                  </span>
                  <span className="tag">Sample</span>
                </div>
                <div className="bubble">
                  <span className="who">Miko</span>If you had cardboard, tape and string, what would you make that our house needs?
                </div>
                <div className="bubble child">
                  <span className="who">Maya, 7</span>A shoe rack for the hallway, so nobody trips over shoes!
                </div>
                <div className="bubble follow">
                  <span className="who">Miko&apos;s follow-up</span>A shoe rack! Where in the house would you put it?
                </div>
                <div className="choices" aria-hidden="true">
                  <span>Tap to talk</span>
                  <span>Or type</span>
                </div>
              </div>
              <img className="kitty" src={`${A}/miko-wave.webp`} alt="Miko, the 4P Family cat, waving" />
            </div>
          </div>
        </section>

        <section className="section miko" id="miko" aria-labelledby="miko-title">
          <div className="wrap">
            <div className="head">
              <span className="eyebrow">Meet Miko</span>
              <h2 id="miko-title">Not a quiz master. A curious friend.</h2>
              <p className="lede">
                Miko is the cat who asks the question on Home. She reads it out loud, checks whether anything is confusing, listens
                to the answer and asks one follow-up about what your child actually said. She praises what children try, and never
                grades them.
              </p>
              <div className="points">
                {POINTS.map(p => (
                  <div key={p.title} className="point">
                    <span className="dot">
                      <svg viewBox="0 0 24 24" aria-hidden="true" {...ICON}>
                        {p.icon}
                      </svg>
                    </span>
                    <div>
                      <b>{p.title}</b>
                      <p>{p.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <MikoDemo />
          </div>
        </section>

        <section className="section ps" id="ps" aria-labelledby="ps-title">
          <div className="wrap">
            <div className="head">
              <span className="eyebrow">The question library</span>
              <h2 id="ps-title">Five Ps. One hundred questions.</h2>
              <p className="lede">
                Every daily question is written by people, never generated by AI, and belongs to one of five Ps. Each age band has
                its own twenty, so a four-year-old and a sixteen-year-old each get questions that fit them. Pick an age to see a
                real question from each P.
              </p>
            </div>
            <FivePs />
            <div className="library" aria-label="Also in the library">
              <div><b>200</b><span>&ldquo;Explore deeper&rdquo; questions on a topic</span></div>
              <div><b>9</b><span>weekly family challenges</span></div>
              <div><b>20</b><span>topics Discover can notice</span></div>
              <div><b>Tips</b><span>for grown-ups with every question</span></div>
            </div>
          </div>
        </section>

        <section className="section day" id="day" aria-labelledby="day-title">
          <div className="wrap">
            <div className="head">
              <span className="eyebrow">A day with 4P Family</span>
              <h2 id="day-title">From hello to a saved memory</h2>
              <p className="lede">
                This is the order things happen in the app, from the evening journal to the conversation you get to keep.
              </p>
            </div>
            <DaySteps />
          </div>
        </section>

        <section className="section disc" id="discover" aria-labelledby="disc-title" style={{ background: 'var(--surface)' }}>
          <div className="wrap">
            <div className="head">
              <span className="eyebrow">What you&apos;ll discover</span>
              <h2 id="disc-title">Notice what your child keeps coming back to</h2>
              <p className="lede">
                As conversations add up, 4P Family notices the topics that come up again and again, like building, kindness or
                space, and shows them to you in plain words. There are no scores, percentages or rankings: just what&apos;s showing
                up, and something to try together.
              </p>
              <div className="discover-card" aria-label="Sample of Discover">
                <div className="chip-row">
                  <h3>Things Maya keeps coming back to</h3>
                  <span className="tag">Sample</span>
                </div>
                <div className="area">
                  <span className="ico" style={{ background: 'var(--p-solve)' }}>B</span>
                  <div>
                    <b>Building &amp; making</b>
                    <small>Came up in her cardboard and shoe-rack answers</small>
                  </div>
                  <span className="level often">Showing up often</span>
                </div>
                <div className="area">
                  <span className="ico" style={{ background: 'var(--p-care)' }}>K</span>
                  <div>
                    <b>Kindness &amp; friendship</b>
                    <small>Came up when she talked about helping a friend</small>
                  </div>
                  <span className="level appear">Starting to appear</span>
                </div>
                <div className="try">
                  <small>Something worth exploring</small>
                  <b>Cardboard Invention Lab</b>
                  <span className="note">One of the nine weekly family challenges, with steps, materials and tips.</span>
                </div>
                <p className="note">
                  Sample for illustration: the child and her answers are made up. The labels and the challenge are the app&apos;s
                  own.
                </p>
              </div>
            </div>
            <div className="features">
              {FEATURES.map(([title, text]) => (
                <div key={title} className="feature">
                  <span className="tag real">In the app</span>
                  <b>{title}</b>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section ben" id="benefits" aria-labelledby="ben-title" style={{ background: 'var(--bg)' }}>
          <div className="wrap">
            <div className="head">
              <span className="eyebrow">Benefits</span>
              <h2 id="ben-title">One question. Three kinds of good.</h2>
              <p className="lede">
                4P Family is built for the whole family: the child who answers, the parent who listens, and the time you spend
                together afterwards.
              </p>
            </div>
            <BenefitTabs />
          </div>
        </section>

        <section className="section why" id="why" aria-labelledby="why-title" style={{ background: 'var(--surface)' }}>
          <div className="wrap">
            <div className="head">
              <span className="eyebrow">Why 4P Family</span>
              <h2 id="why-title">How 4P differs from typical kids&apos; apps</h2>
              <p className="lede">A different idea of what a family app is for.</p>
            </div>
            <div className="shift" aria-label="The shift">
              <div><s>Scrolling</s><b>Talking</b></div>
              <div><s>Testing</s><b>Wondering</b></div>
              <div><s>Labelling</s><b>Noticing</b></div>
              <div><s>Screen time</s><b>Family time</b></div>
            </div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th scope="col">Area</th>
                    <th scope="col">Typical kids&apos; apps</th>
                    <th scope="col" className="us">4P Family</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE.map(([area, typical, us]) => (
                    <tr key={area}>
                      <td>{area}</td>
                      <td>{typical}</td>
                      <td className="us">{us}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="caveat">
              This compares approaches, not specific products: many children&apos;s apps differ a great deal. The 4P Family column
              describes only what the app actually does today.
            </p>
          </div>
        </section>

        <section className="section start" aria-labelledby="start-title">
          <div className="wrap">
            <img src={`${A}/miko-wave.webp`} alt="" />
            <span className="eyebrow">Start tonight</span>
            <h2 id="start-title">Today&apos;s question is waiting</h2>
            <p className="lede">
              Free and private, for families with children aged 3 to 18. Add your child, and Miko will ask the first question.
            </p>
            <a className="btn primary" href={APP_URL} target="_blank" rel="noopener">
              Open 4P Family
            </a>
            <span className="note">Opens the 4P Family app in a new tab.</span>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <span className="mono">
            <img src={`${A}/b2of-mark.webp`} alt="" />
          </span>
          <span>4P Family, from B2OF · Bridges to Our Future</span>
          <span className="right">One question a day. The question is a doorway, not a test.</span>
        </div>
      </footer>
    </>
  );
}
