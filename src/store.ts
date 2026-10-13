import { useEffect, useState } from 'react';
import type { Answer, Answers } from './types';

const KEY = 'headway-unit3-answers';

function load(): Answers {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '{}') as Answers;
  } catch {
    return {};
  }
}

/** Hamma javoblar bitta joyda; har o'zgarishda localStorage'ga saqlanadi */
export function useAnswers() {
  const [answers, setAnswers] = useState<Answers>(load);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(answers));
    } catch {
      /* yopiq rejimda saqlanmasa ham test ishlayveradi */
    }
  }, [answers]);

  const answer = (sectionId: string, i: number, a: Answer) =>
    setAnswers((p) => ({ ...p, [sectionId]: { ...p[sectionId], [i]: a } }));

  const resetSection = (sectionId: string) =>
    setAnswers((p) => {
      const next = { ...p };
      delete next[sectionId];
      return next;
    });

  const resetAll = () => setAnswers({});

  return { answers, answer, resetSection, resetAll };
}
