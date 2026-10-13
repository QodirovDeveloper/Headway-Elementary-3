import type { ReactNode } from 'react';

/** Variantli savol: `q` dagi "___" — bo'sh joy; `hint` — savol ostidagi javob namunasi; `why` — javobdan keyingi izoh */
export type McItem = { q: string; options: string[]; answer: number; hint?: string; why?: string };

/** class — kitobning old qismi (sinfda), home — orqa qismi (uy vazifasi) */
export type Group = 'class' | 'home';

type Base = {
  id: string;
  title: string;
  task: string;
  /** Kitobdagi bet: "page 106" */
  pages: string;
  tip?: ReactNode;
  /** Savol tepasida ochib-yopiladigan rasm/forma */
  figure?: { label: string; content: ReactNode };
};
/** Hamma savollar bosib javob beriladi; yozish faqat yozma ishda (ism, familiya) */
export type SectionData =
  | (Base & { kind: 'mc'; items: McItem[] })
  /** Ballsiz yozma ish (o'z arizasini to'ldirish) */
  | (Base & { kind: 'writing'; items: [] });
export type Section = SectionData & { group: Group };

/** O'quvchi javobi: nima tanladi va to'g'rimi */
export type Answer = { given: string; ok: boolean };
/** sectionId → savol raqami → javob */
export type Answers = Record<string, Record<number, Answer>>;

export type View =
  | { name: 'home' }
  | { name: 'question'; s: number; i: number }
  | { name: 'writing'; s: number }
  | { name: 'partEnd'; s: number }
  | { name: 'results'; group: Group };
