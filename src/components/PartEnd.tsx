import { SECTIONS } from '../data/sections';
import { correctText } from '../lib/check';
import { sectionStats } from '../lib/stats';
import type { Answers } from '../types';
import { BigButton, Score } from './ui';

type Props = {
  s: number;
  answers: Answers;
  onNext: () => void;
  onRetry: () => void;
};

/** Bo'lim tugagach: ball, xatolar ro'yxati, keyingi bo'lim / qaytadan */
export function PartEnd({ s, answers, onNext, onRetry }: Props) {
  const section = SECTIONS[s];
  const st = sectionStats(section, answers);
  const a = answers[section.id] ?? {};
  const mistakes = section.items.map((item, i) => ({ item, i })).filter(({ i }) => a[i] && !a[i].ok);
  const lastPart = s + 1 === SECTIONS.length;
  const msg =
    st.got === st.total
      ? 'Perfect! No mistakes.'
      : st.got / st.total >= 0.7
        ? 'Good work! Look at your mistakes below.'
        : 'Read the mistakes below, then try this part again.';

  return (
    <>
      <div className="flex justify-between text-sm font-bold text-muted">
        <span>
          Part {s + 1} of {SECTIONS.length}
        </span>
        <span>Finished</span>
      </div>
      <h2 className="mt-3.5 font-display text-3xl font-extrabold text-balance">{section.title}</h2>
      <Score got={st.got} total={st.total} />
      <p className="mt-1.5 mb-5 text-muted">{msg}</p>

      {mistakes.length > 0 && (
        <>
          <p className="mb-2 font-bold">Your mistakes</p>
          <ul className="mb-6 flex flex-col gap-2">
            {mistakes.map(({ item, i }) => (
              <li key={i} className="rounded-xl border-[1.5px] border-line bg-card px-3.5 py-2.5 text-base">
                {item.q.replace('___', '…')}
                <br />
                You: <s>{a[i].given}</s> · <span className="font-bold text-ok">{correctText(section, i)}</span>
              </li>
            ))}
          </ul>
        </>
      )}

      <div className="flex flex-col gap-2.5">
        <BigButton onClick={onNext}>{lastPart ? 'See final results' : 'Next part →'}</BigButton>
        {st.got < st.total && (
          <BigButton variant="ghost" onClick={onRetry}>
            Try this part again
          </BigButton>
        )}
      </div>
    </>
  );
}
