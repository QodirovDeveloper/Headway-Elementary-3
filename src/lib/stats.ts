import { SECTIONS } from '../data/sections';
import type { Answers, Group, Section, View } from '../types';

export function sectionStats(section: Section, answers: Answers) {
  const a = answers[section.id] ?? {};
  // Yozma ish ballsiz: faqat "bajarildi / bajarilmadi"
  if (section.kind === 'writing') return { done: 0, got: 0, total: 0, full: !!a[0]?.ok };
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

/** Guruhdagi bo'limlarning SECTIONS ichidagi raqamlari */
export const partsOf = (group: Group) => SECTIONS.flatMap((sec, s) => (sec.group === group ? [s] : []));

/** "Part 2 of 7" uchun: bo'lim o'z guruhida nechanchi */
export function partNumber(s: number) {
  const parts = partsOf(SECTIONS[s].group);
  return { n: parts.indexOf(s) + 1, of: parts.length };
}

/** Shu guruhdagi keyingi bo'lim, oxirgisi bo'lsa — null */
export function nextPart(s: number): number | null {
  const parts = partsOf(SECTIONS[s].group);
  const k = parts.indexOf(s);
  return k + 1 < parts.length ? parts[k + 1] : null;
}

/** Guruh (yoki hamma) bo'yicha ball */
export function groupStats(answers: Answers, group?: Group) {
  let done = 0;
  let got = 0;
  let total = 0;
  for (const s of SECTIONS) {
    if (group && s.group !== group) continue;
    const st = sectionStats(s, answers);
    done += st.done;
    got += st.got;
    total += st.total;
  }
  return { done, got, total };
}

/** Bo'limni ochish: yozma ish — forma; tugagan — natijasi; bo'lmasa — birinchi javobsiz savol */
export function openSection(s: number, answers: Answers): View {
  const sec = SECTIONS[s];
  if (sec.kind === 'writing') return { name: 'writing', s };
  const a = answers[sec.id] ?? {};
  const i = sec.items.findIndex((_, k) => !a[k]);
  return i < 0 ? { name: 'partEnd', s } : { name: 'question', s, i };
}

/** Guruhdagi birinchi tugamagan bo'lim, hammasi tugagan bo'lsa — natijalar */
export function continueView(answers: Answers, group: Group): View {
  const s = partsOf(group).find((k) => !sectionStats(SECTIONS[k], answers).full);
  return s === undefined ? { name: 'results', group } : openSection(s, answers);
}

/** Ekran qaysi guruhga tegishli (bosh sahifa — hech qaysi) */
export const viewGroup = (view: View): Group | undefined =>
  view.name === 'results' ? view.group : view.name === 'home' ? undefined : SECTIONS[view.s].group;
