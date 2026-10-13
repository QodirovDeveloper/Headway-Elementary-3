import { useState, type ReactNode } from 'react';
import { SECTIONS } from '../data/sections';
import { correctText, isTypedCorrect } from '../lib/check';
import type { Answer, Answers, McItem, Section, TypeItem } from '../types';
import { FeedbackBar } from './FeedbackBar';
import { BigButton } from './ui';

type Props = {
  s: number;
  i: number;
  answers: Answers;
  onAnswer: (a: Answer) => void;
  onNext: () => void;
};

/** Bitta savol ekrani. App uni `key={s-i}` bilan chizadi — har savolda holat yangidan boshlanadi */
export function Question({ s, i, answers, onAnswer, onNext }: Props) {
  const section = SECTIONS[s];
  const sectionAnswers = answers[section.id] ?? {};
  const answer = sectionAnswers[i];
  const correct = correctText(section, i);
  const last = i + 1 === section.items.length;
  const hint = section.kind === 'mc' ? section.items[i].hint : undefined;

  return (
    <>
      <div className="flex justify-between text-sm font-bold text-muted tabular-nums">
        <span>
          Part {s + 1} of {SECTIONS.length}
        </span>
        <span>
          {i + 1} / {section.items.length}
        </span>
      </div>
      <Dots section={section} answers={sectionAnswers} current={i} />

      <h3 className="m-0 font-display text-[22px] font-extrabold">{section.title}</h3>
      <p className="mt-0.5 mb-3 text-base text-muted">{section.task}</p>
      {section.tip && <Tip initialOpen={i === 0 && !answer}>{section.tip}</Tip>}

      <Prompt text={section.items[i].q} filled={answer && { text: correct, ok: answer.ok }} />
      {hint && <p className="-mt-3 mb-5 text-lg text-muted">— {hint}</p>}

      {section.kind === 'mc' ? (
        <Options item={section.items[i]} answer={answer} onAnswer={onAnswer} />
      ) : (
        <TypeIn item={section.items[i]} placeholder={section.placeholder} answer={answer} onAnswer={onAnswer} />
      )}

      {answer && <FeedbackBar ok={answer.ok} correct={correct} label={last ? 'See part score' : 'Continue'} onNext={onNext} />}
    </>
  );
}

/** Bo'lim ichidagi savollar: yashil — to'g'ri, qizil — xato, ko'k — hozirgi */
function Dots({ section, answers, current }: { section: Section; answers: Record<number, Answer>; current: number }) {
  return (
    <div className="mt-2 mb-[18px] flex gap-1" aria-hidden="true">
      {section.items.map((_, k) => {
        const a = answers[k];
        const color = a ? (a.ok ? 'bg-ok' : 'bg-bad') : k === current ? 'bg-accent' : 'bg-line';
        return <i key={k} className={`h-1.5 flex-1 rounded-full ${color}`} />;
      })}
    </div>
  );
}

function Tip({ initialOpen, children }: { initialOpen: boolean; children: ReactNode }) {
  const [open, setOpen] = useState(initialOpen);
  return (
    <details
      open={open}
      onToggle={(e) => setOpen(e.currentTarget.open)}
      className="mb-4 rounded-xl bg-accent-soft px-3.5 text-base"
    >
      <summary className="flex min-h-11 cursor-pointer items-center font-bold text-accent">Grammar rule</summary>
      <div className="pb-3">{children}</div>
    </details>
  );
}

/** Savol matni; "___" o'rniga chiziq, javobdan keyin unga to'g'ri so'z yoziladi */
function Prompt({ text, filled }: { text: string; filled?: { text: string; ok: boolean } | false }) {
  const [before, after] = text.split('___');
  const blankColor = filled ? (filled.ok ? 'border-ok text-ok' : 'border-bad text-bad') : 'border-accent';
  return (
    <div className="mt-1.5 mb-5 font-display text-[clamp(23px,6.4vw,28px)] leading-snug font-bold text-pretty">
      {before}
      {after !== undefined && (
        <>
          <span className={`inline-block min-w-[3.2em] border-b-[3px] text-center leading-tight ${blankColor}`}>
            {filled ? filled.text : ' '}
          </span>
          {after}
        </>
      )}
    </div>
  );
}

function Options({ item, answer, onAnswer }: { item: McItem; answer?: Answer; onAnswer: (a: Answer) => void }) {
  return (
    <div className="flex flex-col gap-2.5">
      {item.options.map((text, k) => {
        const state = !answer ? '' : k === item.answer ? 'ok' : text === answer.given ? 'bad' : 'dim';
        const look = {
          '': 'border-line bg-card text-ink active:scale-[.99]',
          ok: 'border-ok bg-ok-soft text-ok font-bold',
          bad: 'border-bad bg-bad-soft text-bad',
          dim: 'border-line bg-card text-ink opacity-55',
        }[state];
        return (
          <button
            key={k}
            type="button"
            disabled={!!answer}
            onClick={() => onAnswer({ given: text, ok: k === item.answer })}
            className={`flex min-h-14 w-full items-center gap-3 rounded-2xl border-2 px-3.5 py-2.5 text-left text-lg ${look}`}
          >
            <span className="grid size-[30px] flex-none place-items-center rounded-lg border-[1.5px] border-current text-sm font-bold opacity-70">
              {'ABCD'[k]}
            </span>
            <span>{text}</span>
          </button>
        );
      })}
    </div>
  );
}

function TypeIn({
  item,
  placeholder,
  answer,
  onAnswer,
}: {
  item: TypeItem;
  placeholder: string;
  answer?: Answer;
  onAnswer: (a: Answer) => void;
}) {
  const [value, setValue] = useState(answer?.given ?? '');
  const [hint, setHint] = useState('');

  const check = () => {
    const given = value.trim();
    if (!given) return setHint('Write your answer first.');
    (document.activeElement as HTMLElement | null)?.blur(); // telefon klaviaturasi yopilsin
    onAnswer({ given, ok: isTypedCorrect(item, given) });
  };

  const look = !answer ? 'border-line bg-card' : answer.ok ? 'border-ok bg-ok-soft' : 'border-bad bg-bad-soft line-through';

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        check();
      }}
    >
      <input
        type="text"
        value={value}
        disabled={!!answer}
        onChange={(e) => {
          setValue(e.target.value);
          setHint('');
        }}
        placeholder={placeholder}
        aria-label={placeholder}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        enterKeyHint="done"
        className={`mb-2.5 min-h-14 w-full rounded-2xl border-2 px-4 py-3.5 text-[19px] text-ink ${look}`}
      />
      <p className="mb-1.5 min-h-[1.4em] text-[15px] text-bad">{hint}</p>
      {!answer && <BigButton type="submit">Check</BigButton>}
    </form>
  );
}
