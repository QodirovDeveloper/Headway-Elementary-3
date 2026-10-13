import { useEffect, useState } from 'react';
import { SECTIONS, TOTAL } from '../data/sections';
import { totalStats } from '../lib/stats';
import type { Answers } from '../types';
import { BigButton, Eyebrow, PartList } from './ui';

type Props = {
  answers: Answers;
  onStart: () => void;
  onPick: (s: number) => void;
  onErase: () => void;
};

export function Home({ answers, onStart, onPick, onErase }: Props) {
  const { done } = totalStats(answers);
  const startLabel = done === 0 ? 'Start the test' : done < TOTAL ? 'Continue' : 'See my results';

  return (
    <>
      <Eyebrow>Headway Elementary · Unit 3</Eyebrow>
      <h1 className="mt-1.5 mb-3 font-display text-[clamp(34px,10vw,48px)] leading-[1.02] font-extrabold text-balance">
        Work hard, <mark className="marker">play hard!</mark>
      </h1>
      <p className="mb-5 text-muted">
        {SECTIONS.length} parts, {TOTAL} questions. Tap an answer to check it. Your first answer counts.
      </p>
      <BigButton onClick={onStart}>{startLabel}</BigButton>
      <PartList answers={answers} onPick={onPick} />
      {done > 0 && <EraseButton onErase={onErase} />}
    </>
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
      className={`min-h-11 bg-transparent py-3.5 text-[15px] underline ${armed ? 'font-bold text-bad' : 'text-muted'}`}
    >
      {armed ? 'Tap again to delete all answers' : 'Start again from zero'}
    </button>
  );
}
