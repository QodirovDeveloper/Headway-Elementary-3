import type { ReactNode } from 'react';

/** Variantli savol: `q` dagi "___" — bo'sh joy */
export type McItem = { q: string; options: string[]; answer: number; hint?: string };
/** Yoziladigan savol: `accept[0]` — namuna javob */
export type TypeItem = { q: string; accept: string[] };

type Base = { id: string; title: string; task: string; tip?: ReactNode };
export type Section =
  | (Base & { kind: 'mc'; items: McItem[] })
  | (Base & { kind: 'type'; placeholder: string; items: TypeItem[] });

/** O'quvchi javobi: nima tanladi/yozdi va to'g'rimi */
export type Answer = { given: string; ok: boolean };
/** sectionId → savol raqami → javob */
export type Answers = Record<string, Record<number, Answer>>;

export type View =
  | { name: 'home' }
  | { name: 'question'; s: number; i: number }
  | { name: 'partEnd'; s: number }
  | { name: 'results' };
