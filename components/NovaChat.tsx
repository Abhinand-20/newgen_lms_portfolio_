'use client';

import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Icon } from './Icons';

const GREET = "Hi, I'm Nova! Ask me anything about your robot. You can tap a question below, type, or use the microphone.";
const FIRST_Q = 'Why does my robot move slowly?';
const REPLIES: Record<string, string> = {
  start:
    "Let's investigate! The robot's speed can depend on its motor power, gear arrangement, weight, and friction. Which part would you like to explore first?",
  power:
    'More power means the motor turns faster, so the legs step faster. In Program It you set it yourself, for example set_speed(60). Too fast can overshoot the target, so engineers tune it.',
  gears:
    'Gears trade speed for force. When a small gear turns a big one, the big gear turns slower but pushes harder. That pushing power is called torque.',
  weight:
    'A heavier robot needs more force to get moving, so the same motor speeds it up more slowly. Where you place the battery also changes the balance.',
  friction:
    "Friction is the grip between the legs and the ground. On ice the legs slip, on a rough track they grip. Without enough grip, the motor's push is wasted.",
  done: "Great! Let's keep building. You can ask me again any time.",
  unknown: 'In this demonstration I only know a few answers about robot speed. In the LMS, your question goes to the real AI tutor.',
};
const MORE = 'Any more questions? Ask me again, or tap No questions.';
const TOPICS: [string, string][] = [
  ['power', 'Motor power'],
  ['gears', 'Gears'],
  ['weight', 'Weight'],
  ['friction', 'Friction'],
];
const TOPIC_Q: Record<string, string> = {
  power: 'What does motor power change?',
  gears: 'How do gears change the speed?',
  weight: 'Does weight slow my robot down?',
  friction: 'What does friction do?',
};
const VOICE_QS = [FIRST_Q, 'How do gears change the speed?', 'What does friction do?', 'Does weight slow my robot down?'];
const LISTEN_MS = 1800;

const topicOf = (text: string) => {
  const t = text.toLowerCase();
  if (/^\s*(no|nope|no questions?|that'?s all|nothing)\b/.test(t)) return 'done';
  if (/friction|slip|grip|ice|rough|surface/.test(t)) return 'friction';
  if (/gear|torque/.test(t)) return 'gears';
  if (/heavy|weight|battery|mass|load/.test(t)) return 'weight';
  if (/power|motor|speed up|faster|set_speed/.test(t)) return 'power';
  if (/slow|speed|fast/.test(t)) return 'start';
  return 'unknown';
};

/** shown: -1 before typing starts, then the number of characters typed so far */
type Msg = { id: number; who: 'student' | 'tutor'; text: string; shown: number };

export default function NovaChat() {
  const [msgs, setMsgs] = useState<Msg[]>([{ id: 0, who: 'tutor', text: GREET, shown: GREET.length }]);
  const [busy, setBusyState] = useState(false);
  const [listening, setListeningState] = useState(false);
  const [chipMode, setChipMode] = useState<'first' | 'topics'>('first');
  const [mode, setMode] = useState<'talk' | 'tap'>('tap');
  const [input, setInput] = useState('');

  // refs mirror state so timers always see the latest values
  const busyRef = useRef(false);
  const listeningRef = useRef(false);
  const nextId = useRef(1);
  const voiceIdx = useRef(0);
  const timers = useRef<number[]>([]);
  const reduce = useRef(false);
  const logRef = useRef<HTMLDivElement>(null);

  const setBusy = (v: boolean) => {
    busyRef.current = v;
    setBusyState(v);
  };
  const setListening = (v: boolean) => {
    listeningRef.current = v;
    setListeningState(v);
  };
  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, reduce.current ? 0 : ms));
  };

  useEffect(() => {
    reduce.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t = timers.current;
    return () => t.forEach(id => window.clearTimeout(id));
  }, []);

  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [msgs]);

  const tutorSay = useCallback((text: string, done?: () => void) => {
    const id = nextId.current++;
    if (reduce.current) {
      setMsgs(m => [...m, { id, who: 'tutor', text, shown: text.length }]);
      done?.();
      return;
    }
    setMsgs(m => [...m, { id, who: 'tutor', text, shown: -1 }]);
    setBusy(true);
    let n = 0;
    const step = () => {
      n = Math.min(text.length, n + 3);
      setMsgs(m => m.map(x => (x.id === id ? { ...x, shown: n } : x)));
      if (n < text.length) timers.current.push(window.setTimeout(step, 24));
      else {
        setBusy(false);
        done?.();
      }
    };
    timers.current.push(window.setTimeout(step, 380));
  }, []);

  const ask = (text: string, topic: string) => {
    if (busyRef.current || listeningRef.current) return;
    setMsgs(m => [...m, { id: nextId.current++, who: 'student', text, shown: text.length }]);
    setBusy(true);
    later(() => {
      setBusy(false);
      tutorSay(REPLIES[topic], () => {
        if (topic === 'done') {
          setChipMode('first');
          return;
        }
        setChipMode('topics');
        if (topic !== 'unknown') later(() => tutorSay(MORE), 500);
      });
    }, 450);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || busyRef.current || listeningRef.current) return;
    setInput('');
    ask(text, topicOf(text));
  };

  const onMic = () => {
    if (listeningRef.current || busyRef.current) return;
    setListening(true);
    later(
      () => {
        setListening(false);
        const q = VOICE_QS[voiceIdx.current++ % VOICE_QS.length];
        ask(q, topicOf(q));
      },
      reduce.current ? 300 : LISTEN_MS,
    );
  };

  const locked = busy || listening;

  return (
    <div className="chat reveal" role="region" aria-label="Tutor demonstration with scripted replies">
      <div className="chat-head">
        <span className="chat-avatar">
          <img src="/assets/nova-wave.webp" alt="" />
        </span>
        <div>
          <b>Nova</b>
          <span>
            AI tutor · <span id="chat-state">{listening ? 'listening…' : busy ? 'answering…' : 'ready'}</span>
          </span>
        </div>
        <span className="status">Demonstration</span>
      </div>
      <div className="chat-log" id="chat-log" aria-live="polite" aria-relevant="additions" ref={logRef}>
        {msgs.map(m =>
          m.who === 'student' ? (
            <p key={m.id} className="bubble bubble-student">
              {m.text}
            </p>
          ) : (
            <div key={m.id} className="bubble bubble-tutor">
              <span className="who">
                <i />
                Nova
              </span>
              <span aria-hidden="true">
                {m.text.slice(0, Math.max(0, m.shown))}
                {m.shown >= 0 && m.shown < m.text.length && <span className="caret" />}
              </span>
              <span className="sr-only">{m.text}</span>
            </div>
          ),
        )}
      </div>
      <div className="chat-chips" id="chat-chips" role="group" aria-label="Suggested questions">
        {chipMode === 'first' ? (
          <button type="button" className="chip " disabled={locked} onClick={() => ask(FIRST_Q, 'start')}>
            {FIRST_Q}
          </button>
        ) : (
          <>
            {TOPICS.map(([topic, label]) => (
              <button key={topic} type="button" className="chip " disabled={locked} onClick={() => ask(TOPIC_Q[topic] || label, topic)}>
                {label}
              </button>
            ))}
            <button type="button" className="chip no" disabled={locked} onClick={() => ask('No questions.', 'done')}>
              No questions
            </button>
          </>
        )}
      </div>
      <div className="chat-modes">
        <div className="mode-switch" role="group" aria-label="How to ask">
          <button type="button" data-mode="talk" aria-pressed={mode === 'talk'} onClick={() => setMode('talk')}>
            <Icon name="mic" />
            Talk
          </button>
          <button type="button" data-mode="tap" aria-pressed={mode === 'tap'} onClick={() => setMode('tap')}>
            <Icon name="hand" />
            Tap
          </button>
        </div>
        <span className="label" id="chat-tag">
          {mode === 'talk' ? 'Voice only, like Talk mode' : 'Typing only, like Tap mode'}
        </span>
      </div>
      <form className="chat-bar" id="chat-form" hidden={mode !== 'tap'} onSubmit={onSubmit}>
        <label htmlFor="chat-input" className="sr-only">
          Your question for Nova
        </label>
        <input
          id="chat-input"
          placeholder="Type your question…"
          autoComplete="off"
          maxLength={160}
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button type="submit" className="round-btn" id="chat-send" aria-label="Send" disabled={!input.trim() || locked}>
          <Icon name="send" />
        </button>
      </form>
      <div className="chat-bar" id="chat-talk" hidden={mode !== 'talk'}>
        <span className="hint" id="chat-hint" aria-live="polite">
          {listening ? (
            <>
              Listening…{' '}
              <span className="wave" style={{ color: '#e11d48' }}>
                <i />
                <i />
                <i />
                <i />
                <i />
              </span>
            </>
          ) : (
            'Tap the microphone and ask Nova'
          )}
        </span>
        <button
          type="button"
          className={`round-btn${listening ? ' on' : ''}`}
          id="chat-mic"
          aria-label={listening ? 'Listening' : 'Ask by voice (simulated)'}
          aria-pressed={listening}
          disabled={busy}
          onClick={onMic}
        >
          <Icon name="mic" />
        </button>
      </div>
    </div>
  );
}
