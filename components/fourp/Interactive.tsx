'use client';

import { useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';

const A = '/assets/4pfamily';

// Arrow keys move between tabs, wrapping at either end.
function useTabKeys(count: number, select: (i: number) => void) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const onKeyDown = (i: number) => (e: KeyboardEvent) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const next = (i + (e.key === 'ArrowRight' ? 1 : count - 1)) % count;
    select(next);
    refs.current[next]?.focus();
  };
  return { refs, onKeyDown };
}

/* The five Ps: a real question from each, for the chosen age band. */

type P = 'PROBLEM_SOLVING' | 'PHILOSOPHY' | 'PHILANTHROPY' | 'PHYSICAL' | 'DREAM';

const QUESTIONS: Record<string, Record<P, [string, number]>> = {
  '3-5': {
    PROBLEM_SOLVING: ['If your ball rolled under the couch, how would you get it out?', 5],
    PHILOSOPHY: ['What makes someone a good friend?', 5],
    PHILANTHROPY: ['If a friend dropped all their crayons on the floor, what would you do?', 5],
    PHYSICAL: ['If you could be any animal for a whole day, how would you move and what would you eat?', 5],
    DREAM: ['If you could build a machine that did anything you wanted, what would it do?', 5],
  },
  '6-8': {
    PROBLEM_SOLVING: ['If you had cardboard, tape and string, what would you make that our house needs?', 6],
    PHILOSOPHY: ['Is it ever okay to break a rule? When?', 6],
    PHILANTHROPY: ['If you started a club to help people, what would it do?', 6],
    PHYSICAL: ['Would you rather climb, swim, ride a bike, or dance for a whole afternoon? What would you do?', 6],
    DREAM: ['What would your bedroom look like if it were built 100 years from now?', 6],
  },
  '9-11': {
    PROBLEM_SOLVING: ['If you had to get a message to a friend across town without a phone, how would you do it?', 7],
    PHILOSOPHY: ['What does it mean to be brave?', 7],
    PHILANTHROPY: ['If you ran a stall to raise money for a good cause, what would you sell and who would you help?', 7],
    PHYSICAL: ['If you could cook one meal for everyone using food grown in a garden, what would you make?', 7],
    DREAM: ['Would you rather be able to talk to animals or understand every language people speak? What would you do first?', 7],
  },
  '12-14': {
    PROBLEM_SOLVING: ['If you had to help our home use less energy without spending money, what would you change first?', 8],
    PHILOSOPHY: ['What is something you used to think was true, but now you see differently?', 8],
    PHILANTHROPY: ["Who is someone in our community whose work you'd like to understand better, and what would you ask them?", 8],
    PHYSICAL: ['If you had one whole day outdoors with no plan, where would you go and what would you do?', 8],
    DREAM: ['What do you think everyday life will be like in 2040?', 9],
  },
  '15-18': {
    PROBLEM_SOLVING: ["What's a problem in your community you'd actually want to help fix?", 9],
    PHILOSOPHY: ['What do you think a good life looks like, and has that idea changed for you over time?', 10],
    PHILANTHROPY: ['What would you give up to help someone else have more?', 9],
    PHYSICAL: ['If you took on a big challenge like a long hike, a race or a bike trip, which would you pick and why?', 10],
    DREAM: ['If you could spend a year learning anything, anywhere in the world, what and where would it be?', 10],
  },
};

const BANDS = ['3-5', '6-8', '9-11', '12-14', '15-18'];

const PS: { key: P; name: string; tone: string; icon: string; what: string }[] = [
  { key: 'PROBLEM_SOLVING', name: 'Problem-Solving', tone: 'solve', icon: 'p-problem-solving', what: 'Working things out: fixing, making and finding another way.' },
  { key: 'PHILOSOPHY', name: 'Philosophy', tone: 'think', icon: 'p-philosophy', what: 'Big questions about fairness, friendship, courage and what matters.' },
  { key: 'PHILANTHROPY', name: 'Philanthropy', tone: 'care', icon: 'p-philanthropy', what: 'Kindness in action: noticing other people and helping.' },
  { key: 'PHYSICAL', name: 'Physical', tone: 'move', icon: 'p-physical', what: 'Bodies, movement, food and time outdoors.' },
  { key: 'DREAM', name: 'Dream', tone: 'dream', icon: 'p-dream', what: 'Imagination, inventions and the future.' },
];

export function FivePs() {
  const [band, setBand] = useState('6-8');
  return (
    <>
      <div className="bands" role="group" aria-label="Age band">
        {BANDS.map(b => (
          <button key={b} type="button" aria-pressed={band === b} onClick={() => setBand(b)}>
            Ages {b.replace('-', ' to ')}
          </button>
        ))}
      </div>
      <div className="pgrid" aria-live="polite">
        {PS.map(p => {
          const [prompt, minutes] = QUESTIONS[band][p.key];
          return (
            <article key={p.key} className="pcard" style={{ '--pc': `var(--p-${p.tone})`, '--pbg': `var(--p-${p.tone}-bg)` } as CSSProperties}>
              <span className="ico">
                <img src={`${A}/${p.icon}.webp`} alt="" />
              </span>
              <h3>{p.name}</h3>
              <q>{prompt}</q>
              <span className="mins">About {minutes} minutes</span>
              <p className="what">{p.what}</p>
            </article>
          );
        })}
      </div>
    </>
  );
}

/* Voice or Chat in the Miko demo. */

function Avatar() {
  return (
    <span className="avatar">
      <img src={`${A}/miko-face.webp`} alt="" />
    </span>
  );
}

export function MikoDemo() {
  const [chat, setChat] = useState(false);
  return (
    <div className="demo" aria-label="Demonstration of a talk with Miko">
      <div className="demo-top">
        <Avatar />
        <div>
          <b>Talking with Miko</b>
          <small>Demonstration · sample words</small>
        </div>
        <div className="seg" role="group" aria-label="How the child answers">
          <button type="button" aria-pressed={!chat} onClick={() => setChat(false)}>
            Voice
          </button>
          <button type="button" aria-pressed={chat} onClick={() => setChat(true)}>
            Chat
          </button>
        </div>
      </div>
      <div className="demo-body">
        <div className="line">
          <Avatar />
          <p className="say">Is it ever okay to break a rule? When?</p>
        </div>
        <div className="line">
          <Avatar />
          <p className="say">Before you answer, do you have any doubts about this question?</p>
        </div>
        <div className="line me">
          <p className="say">What does &ldquo;break a rule&rdquo; mean?</p>
        </div>
        <div className="line">
          <Avatar />
          <p className="say">
            It means doing something a rule says not to do, like running in the hallway when the rule is to walk. Any other
            doubts?
          </p>
        </div>
        <div className="line me">
          <p className="say">No, I&apos;m ready to answer!</p>
        </div>
      </div>
      <div className="demo-foot">
        <div hidden={chat} style={{ display: 'grid', gap: 8, justifyItems: 'center' }}>
          <span className="mic" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3Z" />
              <path d="M19 11a7 7 0 0 1-14 0M12 18v3" />
            </svg>
          </span>
          <b className="display" style={{ fontSize: 17 }}>
            Tap to talk
          </b>
          <span className="note">Turned into text for the answer; the recording is never kept.</span>
        </div>
        <div hidden={!chat} style={{ width: '100%', display: 'grid', gap: 8 }}>
          <div className="typebox">
            <span>Type your answer</span>
            <span className="send" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </div>
          <span className="note">No mic in Chat mode. Miko still says her lines out loud.</span>
        </div>
      </div>
    </div>
  );
}

/* A day: the steps, in the app's order. */

const STEPS = [
  {
    when: 'Each evening, 5 PM to noon',
    title: 'Evening journal',
    text: "Three gentle questions about your child's day. The first asks about the day (or, the evening after a journal, picks up from what they said last time); the next ones follow from your child's answers. When it's done, the journal is saved for you to read.",
    miko: "Hi Maya! It's Miko. Let's start with your journal. How did your day go?",
  },
  {
    when: "Before today's question",
    title: 'Yesterday, remembered',
    text: "Miko reminds your child of yesterday's question and their own answer, then lets them choose: keep exploring that topic, or try a new question. Either way the question comes from the library.",
    miko: 'Yesterday, I asked you this question: “What would your bedroom look like if it were built 100 years from now?” You answered: “It would have a slide instead of stairs!” Would you like to keep exploring that, or try a new question?',
  },
  {
    when: 'Once a day',
    title: "Today's question",
    text: "One question from the library, chosen for your child's age band and rotated across the five Ps so every kind of thinking gets a turn. Miko reads it aloud.",
    miko: 'If you had cardboard, tape and string, what would you make that our house needs?',
  },
  {
    when: 'Before answering',
    title: 'Any doubts?',
    text: "Your child can say they have a doubt, ask what a word means, or ask for an example. Miko explains in simple words or gives an example, but never answers it for them. When they say they're ready, it's their turn.",
    miko: 'Before you answer, do you have any doubts about this question?',
  },
  {
    when: 'In their own words',
    title: 'The answer',
    text: 'Your child answers by talking or typing. If they say just a word or two, Miko gently asks for a little more. Nothing is kept unless they choose to save it.',
    miko: 'Would you like to save your answer?',
  },
  {
    when: 'Right after saving',
    title: 'One follow-up',
    text: "Miko asks one follow-up about something your child actually said, they answer it, and the day's question is done, with a cheer and confetti.",
    miko: 'A shoe rack! Where in the house would you put it?',
  },
  {
    when: 'Any time',
    title: 'Memories',
    text: 'The question, the answer and the follow-up are saved together in Memories, where you can favourite them and look back. Over time, Discover starts to show the topics your child keeps returning to.',
    miko: "Day's questions completed! Your answer is saved. Great job, Maya. See you tomorrow!",
  },
];

export function DaySteps() {
  const [step, setStep] = useState(0);
  const { refs, onKeyDown } = useTabKeys(STEPS.length, setStep);
  const s = STEPS[step];
  return (
    <>
      <ol className="steps" role="tablist" aria-label="Steps of a day">
        {STEPS.map((t, i) => (
          <li key={t.title}>
            <button
              ref={el => {
                refs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`st-${i + 1}`}
              aria-controls="sp"
              aria-selected={step === i}
              tabIndex={step === i ? 0 : -1}
              onClick={() => setStep(i)}
              onKeyDown={onKeyDown(i)}
            >
              <span className="n">{i + 1}</span>
              <span className="t">{t.title}</span>
            </button>
          </li>
        ))}
      </ol>
      <div className="panel" id="sp" role="tabpanel" aria-labelledby={`st-${step + 1}`}>
        <div>
          <span className="when">{s.when}</span>
          <h3>{s.title}</h3>
          <p>{s.text}</p>
        </div>
        <div className="miko-says">
          <div className="head-row">
            <Avatar />
            Miko at this step
          </div>
          <p>{s.miko}</p>
        </div>
      </div>
    </>
  );
}

/* Benefits: children, parents, families. */

const BENEFITS = [
  {
    tab: 'For children',
    title: 'A daily moment to be heard',
    lede: 'Children get a question that is about them, asked by a friendly guide who is interested in their answer.',
    outcome: 'children practise putting their ideas into words, and learn that their thinking matters.',
    items: [
      ['No wrong answers', 'Questions invite ideas and stories, never a score.'],
      ['Their way', 'Talk out loud or type, whichever feels easier.'],
      ['Questions welcome', 'Ask what a word means or ask for an example first.'],
      ['Right for their age', 'Twenty questions written for each age band, 3 to 18.'],
      ['Proud moments', "A cheer and confetti when the day's question is done."],
      ['A journal of their own', 'Three gentle questions about their day each evening.'],
    ],
  },
  {
    tab: 'For parents',
    title: 'Know your child a little better each day',
    lede: 'Parents get a good question without planning one, and a quiet record of what their child is curious about.',
    outcome: "parents notice their child's interests early, and have easy ways to talk about them.",
    items: [
      ['A ready question', "Today's question is chosen for your child's age and rotated across the five Ps."],
      ['Tips for grown-ups', 'Each question comes with a short note on how to listen and follow up.'],
      ["See what's emerging", 'Discover shows the topics your child keeps returning to.'],
      ['Look back', 'Memories keeps every saved conversation and its follow-up.'],
      ['Read their journal', 'Evening journals are saved for you, with anything worrying marked.'],
      ['You stay in charge', 'Nothing is kept unless it is saved, and you can delete any memory, child or the whole account.'],
    ],
  },
  {
    tab: 'For families',
    title: 'Something to do together',
    lede: 'The question is a starting point. The best part happens after the screen goes down.',
    outcome: 'a short daily habit that turns into conversations, projects and shared memories.',
    items: [
      ['Weekly challenges', 'Nine family activities, from a Silent Neighborhood Walk to Future Dinner.'],
      ['A few minutes a day', 'One question a day, five to ten minutes, then off to talk and do.'],
      ['Every child counts', 'Brothers and sisters each have their own questions and memories.'],
      ['Private by design', 'Only a nickname and an age band for each child.'],
      ['Free', 'No subscription for families.'],
      ['Works on the phone', 'Made for the phone in your hand, at the kitchen table or at bedtime.'],
    ],
  },
];

export function BenefitTabs() {
  const [active, setActive] = useState(0);
  const { refs, onKeyDown } = useTabKeys(BENEFITS.length, setActive);
  return (
    <>
      <div className="tabs" role="tablist" aria-label="Who it's for">
        {BENEFITS.map((b, i) => (
          <button
            key={b.tab}
            ref={el => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`bt-${i}`}
            aria-controls={`bp-${i}`}
            aria-selected={active === i}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={onKeyDown(i)}
          >
            {b.tab} <span>0{i + 1}</span>
          </button>
        ))}
      </div>
      {BENEFITS.map((b, i) => (
        <div key={b.tab} className="bpanel" role="tabpanel" id={`bp-${i}`} aria-labelledby={`bt-${i}`} hidden={active !== i}>
          <div className="intro">
            <h3>{b.title}</h3>
            <p className="lede">{b.lede}</p>
            <p className="outcome">
              <b>Outcome:</b> {b.outcome}
            </p>
          </div>
          <ul className="blist">
            {b.items.map(([title, text]) => (
              <li key={title}>
                <b>{title}</b>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}
