import { BigButton } from './ui';

/** Javobdan keyin pastdan chiqadi: "Correct!" yoki to'g'ri javob + "Continue" */
export function FeedbackBar({ ok, correct, label, onNext }: { ok: boolean; correct: string; label: string; onNext: () => void }) {
  return (
    <div
      role="status"
      className={`safe-bottom slide-up fixed inset-x-0 bottom-0 z-20 border-t-2 px-4 pt-3.5 ${
        ok ? 'border-ok bg-ok-soft' : 'border-bad bg-bad-soft'
      }`}
    >
      <div className="mx-auto flex max-w-[600px] flex-col gap-2.5">
        <div>
          <div className={`text-[19px] font-bold ${ok ? 'text-ok' : 'text-bad'}`}>{ok ? 'Correct!' : 'Not quite.'}</div>
          {!ok && <div className="text-base">Correct answer: {correct}</div>}
        </div>
        <BigButton variant={ok ? 'ok' : 'bad'} onClick={onNext} autoFocus>
          {label}
        </BigButton>
      </div>
    </div>
  );
}
