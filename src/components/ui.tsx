import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { BOOK_PAGES, GROUPS, SECTIONS } from '../data/sections';
import { partNumber, partsOf, sectionStats } from '../lib/stats';
import type { Answers, Group } from '../types';

const VARIANTS = {
  primary: 'bg-accent text-accent-ink',
  homework: 'bg-hw text-hw-ink',
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

/** "CLASSWORK" / "HOMEWORK" yorlig'i — har ekranda o'quvchi qaysi qismda ekanini bilsin */
export function GroupBadge({ group, text }: { group: Group; text?: string }) {
  const look = group === 'home' ? 'bg-hw-soft text-hw' : 'bg-accent-soft text-accent';
  return (
    <span
      className={`inline-flex flex-none items-center rounded-full px-2.5 py-0.5 text-[12px] font-bold tracking-[0.08em] whitespace-nowrap uppercase ${look}`}
    >
      {text ?? GROUPS[group].label}
    </span>
  );
}

/** Kitob chizig'i: betlar kitobning old yoki orqa qismida ekanini ko'rsatadi */
export function BookStrip({ group }: { group: Group }) {
  const { marks, pages } = GROUPS[group];
  const color = group === 'home' ? 'bg-hw' : 'bg-accent';
  return (
    <div className="my-3">
      <div className="relative h-3.5 overflow-hidden rounded-[4px] border border-line bg-paper" role="img" aria-label={`Book: ${pages}`}>
        {marks.map(([from, to]) => (
          <span
            key={from}
            className={`absolute inset-y-0 ${color}`}
            style={{ left: `${(from / BOOK_PAGES) * 100}%`, width: `max(6px, ${((to - from + 1) / BOOK_PAGES) * 100}%)` }}
          />
        ))}
      </div>
      <div className="mt-1 flex justify-between text-xs text-muted" aria-hidden="true">
        <span>front of the book</span>
        <span>back of the book</span>
      </div>
    </div>
  );
}

/** Bo'lim ekranlari tepasidagi qator: [HOMEWORK] Part 2 of 7 ............ 3 / 10 */
export function PartHeader({ s, right }: { s: number; right: ReactNode }) {
  const { n, of } = partNumber(s);
  const sec = SECTIONS[s];
  return (
    <div className="flex items-center justify-between gap-3 text-sm font-bold text-muted tabular-nums">
      <span className="flex items-center gap-2">
        <GroupBadge group={sec.group} />
        Part {n} of {of}
      </span>
      <span>{right}</span>
    </div>
  );
}

/** "Student's Book · page 106 · back of the book" */
export function BookLine({ s }: { s: number }) {
  const sec = SECTIONS[s];
  return (
    <p className="m-0 mb-3 text-sm text-muted">
      Student's Book · {sec.pages} · {GROUPS[sec.group].where.toLowerCase()}
    </p>
  );
}

/** Katta ball: "8 / 10" */
export const Score = ({ got, total }: { got: number; total: number }) => (
  <div className="mt-2.5 mb-1 font-display text-7xl leading-none font-extrabold tabular-nums">
    {got}
    <span className="text-[34px] text-muted"> / {total}</span>
  </div>
);

/** Guruhdagi bo'limlar ro'yxati — bosh sahifada ham, natijalarda ham */
export function PartList({
  group,
  answers,
  onPick,
  numbersOnly,
}: {
  group: Group;
  answers: Answers;
  onPick: (s: number) => void;
  numbersOnly?: boolean;
}) {
  return (
    <ul className="m-0 mt-4 flex list-none flex-col gap-2 p-0">
      {partsOf(group).map((s, k) => {
        const sec = SECTIONS[s];
        const st = sectionStats(sec, answers);
        const right =
          sec.kind === 'writing'
            ? st.full
              ? 'done'
              : 'writing'
            : st.done
              ? `${st.got} / ${st.total}`
              : numbersOnly
                ? 'not started'
                : `${st.total} q.`;
        return (
          <li key={sec.id}>
            <button
              type="button"
              onClick={() => onPick(s)}
              className="flex min-h-[58px] w-full items-center gap-3 rounded-2xl border-[1.5px] border-line bg-card px-3.5 py-2.5 text-left text-ink"
            >
              <span
                className={`grid size-8 flex-none place-items-center rounded-full text-[15px] font-bold ${
                  st.full ? 'bg-ok-soft text-ok' : group === 'home' ? 'bg-hw-soft text-hw' : 'bg-accent-soft text-accent'
                }`}
              >
                {st.full && !numbersOnly ? '✓' : k + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-bold">{sec.title}</span>
                <span className="block text-sm text-muted">{sec.pages}</span>
              </span>
              <span className={`flex-none text-[15px] tabular-nums ${st.full ? 'font-bold text-ok' : 'text-muted'}`}>{right}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
