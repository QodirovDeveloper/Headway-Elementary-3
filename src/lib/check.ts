import type { Section, TypeItem } from '../types';

/** "Doesn't" → "does not", tinish belgilari va katta harflar olib tashlanadi */
export function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[’‘`´]/g, "'")
    .replace(/\bdon't\b/g, 'do not')
    .replace(/\bdoesn't\b/g, 'does not')
    .replace(/\bisn't\b/g, 'is not')
    .replace(/\baren't\b/g, 'are not')
    .replace(/\bi'm\b/g, 'i am')
    .replace(/\bwe're\b/g, 'we are')
    .replace(/\bthey're\b/g, 'they are')
    .replace(/[^a-z' ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export const isTypedCorrect = (item: TypeItem, given: string) =>
  item.accept.some((a) => normalize(a) === normalize(given));

/** Ikkala savol turi uchun to'g'ri javob matni */
export function correctText(section: Section, i: number): string {
  if (section.kind === 'mc') {
    const item = section.items[i];
    return item.options[item.answer];
  }
  return section.items[i].accept[0];
}
