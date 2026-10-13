import type { Group, Section } from '../types';
import { CLASSWORK } from './classwork';
import { HOMEWORK } from './homework';

/** Kitobdagi betlar soni — "kitob chizig'i"da bet qayerdaligini ko'rsatish uchun */
export const BOOK_PAGES = 160;

/** O'quvchiga ko'rinadigan guruh ma'lumoti: kitobning qaysi qismi va nima uchun */
export const GROUPS: Record<Group, { label: string; where: string; pages: string; note: string; marks: [number, number][] }> = {
  class: {
    label: 'Classwork',
    where: 'Front of the book',
    pages: 'Unit 3 · pages 22–29',
    note: 'Done in class.',
    marks: [[22, 29]],
  },
  home: {
    label: 'Homework',
    where: 'Back of the book',
    pages: 'Unit 3 · pages 106, 135–136',
    note: 'Do it at home.',
    marks: [
      [106, 106],
      [135, 136],
    ],
  },
};

export const SECTIONS: Section[] = [
  ...CLASSWORK.map((s) => ({ ...s, group: 'class' as const })),
  ...HOMEWORK.map((s) => ({ ...s, group: 'home' as const })),
];
