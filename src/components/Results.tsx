import { totalStats } from '../lib/stats';
import type { Answers } from '../types';
import { BigButton, Eyebrow, PartList, Score } from './ui';

type Props = { answers: Answers; onPick: (s: number) => void; onHome: () => void };

export function Results({ answers, onPick, onHome }: Props) {
  const { done, got, total } = totalStats(answers);
  const pct = Math.round((got / total) * 100);
  const msg =
    done < total
      ? `You answered ${done} of ${total} questions. Finish all the parts to get your full score.`
      : pct >= 90
        ? 'Excellent! You know Unit 3 very well.'
        : pct >= 70
          ? 'Good work! Try the parts with mistakes again.'
          : pct >= 50
            ? 'Not bad. Read Unit 3 again and repeat the difficult parts.'
            : 'Keep practising. Read pages 22–23 again, then try again.';

  return (
    <>
      <Eyebrow>Unit 3 · Final results</Eyebrow>
      <Score got={got} total={total} />
      <p className="mt-1.5 mb-5 text-muted">
        <b className="text-ink">{pct}%</b> correct. {msg}
      </p>
      <PartList answers={answers} onPick={onPick} numbersOnly />
      <BigButton variant="ghost" className="mt-5" onClick={onHome}>
        Back to start
      </BigButton>
    </>
  );
}
