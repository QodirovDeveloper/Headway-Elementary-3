import { GROUPS, SECTIONS } from '../data/sections';
import { groupStats, partsOf } from '../lib/stats';
import type { Answers, Group } from '../types';
import { BigButton, BookStrip, GroupBadge, PartList, Score } from './ui';

type Props = { group: Group; answers: Answers; onPick: (s: number) => void; onHome: () => void };

/** Bitta guruh (sinf ishi yoki uy vazifasi) natijasi */
export function Results({ group, answers, onPick, onHome }: Props) {
  const g = GROUPS[group];
  const { done, got, total } = groupStats(answers, group);
  const pct = total ? Math.round((got / total) * 100) : 0;
  const writingLeft = partsOf(group).some((s) => SECTIONS[s].kind === 'writing' && !answers[SECTIONS[s].id]?.[0]?.ok);
  const msg =
    done < total
      ? `${done} of ${total} answered. Finish all parts.`
      : pct >= 90
        ? 'Excellent!'
        : pct >= 70
          ? 'Good work!'
          : pct >= 50
            ? 'Not bad. Try again.'
            : `Keep practising: ${g.pages}.`;

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <GroupBadge group={group} />
        <span className="text-sm font-bold text-muted">{g.where} · Results</span>
      </div>
      <p className="mt-2 mb-0 text-base text-muted">{g.pages}</p>
      <BookStrip group={group} />
      <Score got={got} total={total} />
      <p className="mt-1.5 mb-2 text-muted">
        <b className="text-ink">{pct}%</b> correct. {msg}
      </p>
      {writingLeft && <p className="m-0 font-bold text-hw">Don't forget: fill in your form.</p>}
      <PartList group={group} answers={answers} onPick={onPick} numbersOnly />
      <BigButton variant="ghost" className="mt-5" onClick={onHome}>
        Back to start
      </BigButton>
    </>
  );
}
