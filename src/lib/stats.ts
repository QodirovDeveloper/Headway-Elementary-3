import { SECTIONS, TOTAL } from '../data/sections';
import type { Answers, Section, View } from '../types';

export function sectionStats(section: Section, answers: Answers) {
  const a = answers[section.id] ?? {};
  let done = 0;
  let got = 0;
  section.items.forEach((_, i) => {
    if (a[i]) {
      done++;
      if (a[i].ok) got++;
    }
  });
  return { done, got, total: section.items.length, full: done === section.items.length };
}

export function totalStats(answers: Answers) {
  let done = 0;
  let got = 0;
  for (const s of SECTIONS) {
    const st = sectionStats(s, answers);
    done += st.done;
    got += st.got;
  }
  return { done, got, total: TOTAL };
}

/** Bo'limni ochish: tugagan bo'lsa — natijasi, bo'lmasa — birinchi javobsiz savol */
export function openSection(s: number, answers: Answers): View {
  const a = answers[SECTIONS[s].id] ?? {};
  const i = SECTIONS[s].items.findIndex((_, k) => !a[k]);
  return i < 0 ? { name: 'partEnd', s } : { name: 'question', s, i };
}

/** Testdagi birinchi javobsiz savol, hammasi tugagan bo'lsa — natijalar */
export function continueView(answers: Answers): View {
  const s = SECTIONS.findIndex((sec) => !sectionStats(sec, answers).full);
  return s < 0 ? { name: 'results' } : openSection(s, answers);
}
