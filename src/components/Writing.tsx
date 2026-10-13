import { useEffect, useRef, useState } from 'react';
import { SECTIONS } from '../data/sections';
import { checkForm, describe, emptyForm, type FormData } from '../lib/form';
import type { Answer, Answers } from '../types';
import { FormCard } from './FormCard';
import { BigButton, BookLine, PartHeader } from './ui';

type Props = {
  s: number;
  answers: Answers;
  onSave: (a: Answer) => void;
  nextLabel: string;
  onNext: () => void;
};

function load(given?: string): FormData {
  try {
    return given ? { ...emptyForm(), ...(JSON.parse(given) as Partial<FormData>) } : emptyForm();
  } catch {
    return emptyForm();
  }
}

/**
 * Yozma ish: o'quvchi o'z arizasini to'ldiradi. Forma har o'zgarishda saqlanadi (ok: false),
 * tekshiruvdan o'tganda — ok: true va "o'zim haqimda" matni chiqadi.
 */
export function Writing({ s, answers, onSave, nextLabel, onNext }: Props) {
  const section = SECTIONS[s];
  const saved = answers[section.id]?.[0];
  const [form, setForm] = useState<FormData>(() => load(saved?.given));
  const [problems, setProblems] = useState<string[]>([]);
  const done = !!saved?.ok;
  const textRef = useRef<HTMLDivElement>(null);
  const problemsRef = useRef<HTMLDivElement>(null);

  const update = (f: FormData) => {
    setForm(f);
    setProblems([]);
    onSave({ given: JSON.stringify(f), ok: false });
  };

  const check = () => {
    const found = checkForm(form);
    setProblems(found);
    if (found.length === 0) onSave({ given: JSON.stringify(form), ok: true });
    else requestAnimationFrame(() => problemsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }));
  };

  // Tekshiruvdan o'tgach matnni ko'rsatamiz
  useEffect(() => {
    if (done) textRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [done]);

  return (
    <>
      <PartHeader s={s} right={done ? 'done' : 'writing'} />
      <h3 className="mt-[18px] mb-0 font-display text-[22px] font-extrabold">{section.title}</h3>
      <p className="mt-0.5 mb-1 text-base text-muted">{section.task}</p>
      <BookLine s={s} />
      {section.tip && <div className="mb-4 rounded-xl bg-accent-soft px-3.5 py-3 text-base">{section.tip}</div>}

      <FormCard form={form} onChange={update} />

      {problems.length > 0 && (
        <div ref={problemsRef} className="mt-4 rounded-xl border-2 border-bad bg-bad-soft px-4 py-3 text-base" role="alert">
          <p className="m-0 mb-1 font-bold text-bad">Not finished:</p>
          <ul className="m-0 list-disc pl-5">
            {problems.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      )}

      {!done && (
        <BigButton className="mt-4" onClick={check}>
          Check my form
        </BigButton>
      )}

      {done && (
        <div ref={textRef} className="mt-5 scroll-mt-20">
          <div className="rounded-2xl border-2 border-ok bg-ok-soft px-4 py-4">
            <p className="m-0 mb-2 text-[19px] font-bold text-ok">Well done!</p>
            <p className="m-0 mb-1 text-sm font-bold tracking-[0.06em] text-muted uppercase">Your text</p>
            <p className="m-0 text-lg leading-relaxed">{describe(form).join(' ')}</p>
          </div>
          <p className="mt-2 mb-4 text-base text-muted">Read it aloud. Show your teacher.</p>
          <BigButton variant="homework" onClick={onNext}>
            {nextLabel}
          </BigButton>
        </div>
      )}
    </>
  );
}
