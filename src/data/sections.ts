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
    pages: 'Unit 3, pages 22–29',
    note: 'You did this part in class with your teacher.',
    marks: [[22, 29]],
  },
  home: {
    label: 'Homework',
    where: 'Back of the book',
    pages: 'Writing Unit 3 (page 106) and Grammar Reference (pages 135–136)',
    note: 'Do this part at home on your own.',
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
