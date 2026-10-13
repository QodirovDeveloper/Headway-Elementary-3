import { useEffect, useState } from 'react';
import { GROUPS } from '../data/sections';
import { continueView, groupStats } from '../lib/stats';
import type { Answers, Group } from '../types';
import { BigButton, BookStrip, Eyebrow, GroupBadge, PartList } from './ui';

type Props = {
  answers: Answers;
  onStart: (group: Group) => void;
  onPick: (s: number) => void;
  onErase: () => void;
};

export function Home({ answers, onStart, onPick, onErase }: Props) {
  const anything = Object.keys(answers).length > 0;
  return (
    <>
      <Eyebrow>Headway Elementary · Unit 3</Eyebrow>
      <h1 className="mt-1.5 mb-3 font-display text-[clamp(34px,10vw,48px)] leading-[1.02] font-extrabold text-balance">
        Work hard, <mark className="marker">play hard!</mark>
      </h1>
      <p className="mb-5 text-muted">
        Unit 3 has two parts. <b className="text-ink">Classwork</b> is from the front of your book.{' '}
        <b className="text-ink">Homework</b> is from the back of your book.
      </p>

      <div className="flex flex-col gap-5">
        <GroupCard group="class" answers={answers} onStart={onStart} onPick={onPick} />
        <GroupCard group="home" answers={answers} onStart={onStart} onPick={onPick} />
      </div>

      {anything && <EraseButton onErase={onErase} />}
    </>
  );
}

function GroupCard({ group, answers, onStart, onPick }: { group: Group } & Omit<Props, 'onErase'>) {
  const g = GROUPS[group];
  const st = groupStats(answers, group);
  const next = continueView(answers, group);
  const word = g.label.toLowerCase();
  const label = next.name === 'results' ? `See ${word} results` : st.done === 0 && next.name !== 'writing' ? `Start ${word}` : `Continue ${word}`;
  const home = group === 'home';

  return (
    <section
      id={home ? 'homework' : 'classwork'}
      className={`scroll-mt-20 rounded-3xl border-2 bg-card px-4 py-4 ${home ? 'border-hw' : 'border-line'}`}
      aria-label={g.label}
    >
      <div className="flex items-baseline justify-between gap-3">
        <h2 className={`m-0 font-display text-[30px] leading-tight font-extrabold ${home ? 'text-hw' : 'text-accent'}`}>{g.label}</h2>
        <GroupBadge group={group} text={g.where} />
      </div>
      <p className="mt-1 mb-0 font-bold">{g.pages}</p>
      <BookStrip group={group} />
      <p className="m-0 mb-3 text-base text-muted">
        {g.note} {st.done > 0 && <b className="text-ink tabular-nums">Score: {st.got} / {st.total}.</b>}
      </p>
      <BigButton variant={home ? 'homework' : 'primary'} onClick={() => onStart(group)}>
        {label}
      </BigButton>
      <PartList group={group} answers={answers} onPick={onPick} />
    </section>
  );
}

/** Hamma javoblarni o'chirish — ikki marta bosish kerak, tasodifan o'chib ketmasin */
function EraseButton({ onErase }: { onErase: () => void }) {
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (!armed) return;
    const t = setTimeout(() => setArmed(false), 3500);
    return () => clearTimeout(t);
  }, [armed]);

  return (
    <button
      type="button"
      onClick={() => (armed ? onErase() : setArmed(true))}
      className={`mt-2 min-h-11 bg-transparent py-3.5 text-[15px] underline ${armed ? 'font-bold text-bad' : 'text-muted'}`}
    >
      {armed ? 'Tap again to delete all answers' : 'Start again from zero'}
    </button>
  );
}
