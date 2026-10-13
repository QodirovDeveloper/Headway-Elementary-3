/** "Fit & Well" ariza formasi (Writing Unit 3, 106-bet): maydonlar, Lena namunasi, tekshirish va matn yasash */

type Field = {
  key: string;
  label: string;
  /** Bo'sh bo'lsa chiqadigan xabar; yo'q bo'lsa — maydon ixtiyoriy */
  ask?: string;
  /** BLOCK CAPITALS bilan yozilishi shart */
  caps?: boolean;
  /** dd/mm/yy ko'rinishidagi sana */
  date?: boolean;
  inputMode?: 'email' | 'tel' | 'numeric';
};

export const FIELDS = [
  { key: 'first', label: 'First Name', ask: 'Write your first name.', caps: true },
  { key: 'surname', label: 'Surname', ask: 'Write your surname.', caps: true },
  { key: 'dob', label: 'Date of birth', ask: 'Write your date of birth.', date: true, inputMode: 'numeric' },
  { key: 'nationality', label: 'Nationality', ask: 'Write your nationality.', caps: true },
  { key: 'address', label: 'Address', caps: true },
  { key: 'town', label: 'Town/City', ask: 'Write your town or city.', caps: true },
  { key: 'postcode', label: 'Post Code', caps: true },
  { key: 'email', label: 'Email address', inputMode: 'email' },
  { key: 'daytime', label: 'Daytime telephone', inputMode: 'tel' },
  { key: 'mobile', label: 'Mobile phone', inputMode: 'tel' },
] as const satisfies readonly Field[];

/** Forma oxiridagi maydonlar: imzo oddiy yozuvda, sana — dd/mm/yy */
export const FOOT_FIELDS = [
  { key: 'signature', label: 'Signature', ask: 'Sign the form: write your name in the Signature box.' },
  { key: 'date', label: 'Date', ask: 'Write the date.', date: true, inputMode: 'numeric' },
] as const satisfies readonly Field[];

export type FieldDef = Field;
type FieldKey = (typeof FIELDS)[number]['key'] | (typeof FOOT_FIELDS)[number]['key'];

export const TITLES = ['Mr', 'Mrs', 'Miss', 'Ms'] as const;
export const SPORTS = ['Swimming', 'Indoor tennis', 'Outdoor tennis', 'Badminton', 'Squash'];
export const FITNESS = ['Gym', 'Spa', 'Exercise classes'];

export type FormData = Record<FieldKey, string> & { title: (typeof TITLES)[number] | ''; interests: string[] };

export const LENA: FormData = {
  first: 'LENA',
  surname: 'PRENTIS',
  title: 'Miss',
  dob: '02/07/84',
  nationality: 'AUSTRALIAN',
  address: '23A PARK ROAD',
  town: 'SHEFFIELD',
  postcode: 'S1 4AX',
  email: 'Len.pren@talktalk.com',
  daytime: '0114 496 0154',
  mobile: '0770 900687',
  interests: ['Swimming', 'Outdoor tennis', 'Squash', 'Gym', 'Exercise classes'],
  signature: 'Lena Prentis',
  date: '10/04/11',
};

const pad = (n: number) => String(n).padStart(2, '0');
export const formatDate = (d: Date) => `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${pad(d.getFullYear() % 100)}`;

export const emptyForm = (today = new Date()): FormData => ({
  first: '',
  surname: '',
  title: '',
  dob: '',
  nationality: '',
  address: '',
  town: '',
  postcode: '',
  email: '',
  daytime: '',
  mobile: '',
  interests: [],
  signature: '',
  date: formatDate(today),
});

const DATE = /^(\d{1,2})\/(\d{1,2})\/(\d{2})$/;

/** "02/07/84" → 1984-07-02; yil kelajakda bo'lib qolsa — 1900-yillar */
export function parseDate(text: string, today = new Date()): Date | null {
  const m = DATE.exec(text.trim());
  if (!m) return null;
  const [day, month, yy] = [+m[1], +m[2], +m[3]];
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  const year = yy <= today.getFullYear() % 100 ? 2000 + yy : 1900 + yy;
  return new Date(year, month - 1, day);
}

/** Tekshirish: bo'sh maydon, BLOCK CAPITALS, sana ko'rinishi, title, belgilangan qiziqish */
export function checkForm(f: FormData): string[] {
  const out: string[] = [];
  for (const field of [...FIELDS, ...FOOT_FIELDS] as readonly Field[]) {
    const v = f[field.key as FieldKey].trim();
    if (!v) {
      if (field.ask) out.push(field.ask);
      continue;
    }
    if (field.caps && v !== v.toUpperCase()) out.push(`${field.label}: write it in BLOCK CAPITALS, LIKE THIS.`);
    if (field.date && !parseDate(v)) out.push(`${field.label}: write it like this: 02/07/84 (dd/mm/yy).`);
  }
  if (!f.title) out.push('Title: underline Mr, Mrs, Miss or Ms.');
  if (!f.interests.length) out.push('Tick (✓) at least one interest.');
  return out;
}

const PHRASE: Record<string, string> = {
  Swimming: 'swimming',
  'Indoor tennis': 'playing indoor tennis',
  'Outdoor tennis': 'playing outdoor tennis',
  Badminton: 'playing badminton',
  Squash: 'playing squash',
  Gym: 'going to the gym',
  Spa: 'going to the spa',
  'Exercise classes': 'doing exercise classes',
};

const list = (xs: string[]) => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`);
const likes = (xs: string[]) => list(xs.map((x) => PHRASE[x] ?? x.toLowerCase()));
const nice = (s: string) => s.trim().toLowerCase().replace(/(^|[\s-])\p{L}/gu, (c) => c.toUpperCase());

/** To'g'ri to'ldirilgan formadan "o'zim haqimda" matni va Lena bilan solishtirish */
export function describe(f: FormData, today = new Date()): string[] {
  const out = [`My name's ${nice(f.first)} ${nice(f.surname)}.`];

  const born = parseDate(f.dob, today);
  if (born) {
    const hadBirthday =
      today.getMonth() > born.getMonth() || (today.getMonth() === born.getMonth() && today.getDate() >= born.getDate());
    const age = today.getFullYear() - born.getFullYear() - (hadBirthday ? 0 : 1);
    if (age > 0 && age < 120) out.push(`I'm ${age} years old.`);
  }
  if (f.title === 'Miss') out.push("I'm not married.");
  if (f.title === 'Mrs') out.push("I'm married.");
  out.push(`I'm ${nice(f.nationality)}.`, `I live in ${nice(f.town)}.`, `I like ${likes(f.interests)}.`);

  const both = f.interests.filter((x) => LENA.interests.includes(x));
  const onlyMe = f.interests.filter((x) => !LENA.interests.includes(x));
  const onlyLena = LENA.interests.filter((x) => !f.interests.includes(x));
  if (both.length) out.push(`Lena and I both like ${likes(both)}.`);
  if (onlyMe.length) out.push(`I like ${likes(onlyMe)}, but Lena doesn't.`);
  if (onlyLena.length) out.push(`Lena likes ${likes(onlyLena)}, but I don't.`);
  return out;
}
