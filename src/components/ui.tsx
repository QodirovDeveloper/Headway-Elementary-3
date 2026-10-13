import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { SECTIONS } from '../data/sections';
import { sectionStats } from '../lib/stats';
import type { Answers } from '../types';

const VARIANTS = {
  primary: 'bg-accent text-accent-ink',
  ghost: 'border-2 border-accent bg-transparent text-accent',
  ok: 'bg-ok text-card',
  bad: 'bg-bad text-card',
};

/** Katta, butun eni bo'ylab tugma — barmoq bilan bosishga qulay */
export function BigButton({
  variant = 'primary',
  className = '',
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: keyof typeof VARIANTS }) {
  return (
    <button
      type="button"
      className={`block min-h-14 w-full rounded-2xl px-4 py-3 text-[19px] font-bold ${VARIANTS[variant]} ${className}`}
      {...rest}
    />
  );
}

export const Eyebrow = ({ children }: { children: ReactNode }) => (
  <div className="text-[13px] font-bold tracking-[0.08em] text-muted uppercase">{children}</div>
);

/** Katta ball: "8 / 10" */
export const Score = ({ got, total }: { got: number; total: number }) => (
  <div className="mt-2.5 mb-1 font-display text-7xl leading-none font-extrabold tabular-nums">
    {got}
    <span className="text-[34px] text-muted"> / {total}</span>
  </div>
);

/** Bo'limlar ro'yxati — bosh sahifada ham, natijalarda ham */
export function PartList({ answers, onPick, numbersOnly }: { answers: Answers; onPick: (s: number) => void; numbersOnly?: boolean }) {
  return (
    <ul className="mt-6 flex flex-col gap-2">
      {SECTIONS.map((sec, s) => {
        const st = sectionStats(sec, answers);
        return (
          <li key={sec.id}>
            <button
              type="button"
              onClick={() => onPick(s)}
              className="flex min-h-[58px] w-full items-center gap-3 rounded-2xl border-[1.5px] border-line bg-card px-3.5 py-2.5 text-left text-ink"
            >
              <span
                className={`grid size-8 flex-none place-items-center rounded-full text-[15px] font-bold ${
                  st.full ? 'bg-ok-soft text-ok' : 'bg-accent-soft text-accent'
                }`}
              >
                {st.full && !numbersOnly ? '✓' : s + 1}
              </span>
              <span className="min-w-0 flex-1 font-bold">{sec.title}</span>
              <span className={`flex-none text-[15px] tabular-nums ${st.full ? 'font-bold text-ok' : 'text-muted'}`}>
                {st.done ? `${st.got} / ${st.total}` : numbersOnly ? 'not started' : `${st.total} q.`}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
