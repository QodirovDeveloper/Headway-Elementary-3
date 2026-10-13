import type { Section } from '../types';

/** To'g'ri javob matni (yozma ishda — bo'sh) */
export function correctText(section: Section, i: number): string {
  if (section.kind !== 'mc') return '';
  const item = section.items[i];
  return item.options[item.answer];
}
