import { SECTIONS } from '../data/sections';
import { correctText } from '../lib/check';
import { sectionStats } from '../lib/stats';
import type { Answers } from '../types';
import { BigButton, BookLine, PartHeader, Score } from './ui';

type Props = {
  s: number;
  answers: Answers;
  nextLabel: string;
  onNext: () => void;
  onRetry: () => void;
};

/** Bo'lim tugagach: ball, xatolar ro'yxati, keyingi bo'lim / qaytadan */
export function PartEnd({ s, answers, nextLabel, onNext, onRetry }: Props) {
  const section = SECTIONS[s];
  const st = sectionStats(section, answers);
  const a = answers[section.id] ?? {};
  const mistakes = section.items.map((item, i) => ({ item, i })).filter(({ i }) => a[i] && !a[i].ok);
  const msg =
    st.got === st.total
      ? 'Perfect! No mistakes.'
      : st.got / st.total >= 0.7
        ? 'Good work! Look at your mistakes below.'
        : 'Read the mistakes below, then try this part again.';

  return (
    <>
      <PartHeader s={s} right="Finished" />
      <h2 className="mt-3.5 mb-0 font-display text-3xl font-extrabold text-balance">{section.title}</h2>
      <BookLine s={s} />
      <Score got={st.got} total={st.total} />
      <p className="mt-1.5 mb-5 text-muted">{msg}</p>

      {mistakes.length > 0 && (
        <>
          <p className="mb-2 font-bold">Your mistakes</p>
          <ul className="m-0 mb-6 flex list-none flex-col gap-2 p-0">
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
        <BigButton variant={section.group === 'home' ? 'homework' : 'primary'} onClick={onNext}>
          {nextLabel}
        </BigButton>
        {st.got < st.total && (
          <BigButton variant="ghost" onClick={onRetry}>
            Try this part again
          </BigButton>
        )}
      </div>
    </>
  );
}
