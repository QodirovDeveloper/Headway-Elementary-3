/** "Fit & Well" ariza formasi (Writing Unit 3, 106-bet): maydonlar, Lena namunasi, tekshirish va matn yasash */

/**
 * Formadagi maydon. O'quvchi minimal yozadi (Z avlodi uchun): faqat ism va familiya klaviaturada,
 * qolgani bosish bilan — sana kalendardan, millat/shahar tugmalardan, imzo bitta tugma.
 */
type Field = {
  key: string;
  label: string;
  /** Bo'sh bo'lsa chiqadigan xabar (to'ldirish shart) */
  ask?: string;
  /** O'quvchi to'ldiradigan maydon; qolganlari faqat Lenaning formasida ko'rinadi */
  input?: 'text' | 'date' | 'choice' | 'sign' | 'auto';
  /** `choice` uchun tayyor variantlar (o'zi ham yozishi mumkin) */
  choices?: string[];
};

export const FIELDS = [
  { key: 'first', label: 'First Name', ask: 'Write your first name.', input: 'text' },
  { key: 'surname', label: 'Surname', ask: 'Write your surname.', input: 'text' },
  { key: 'dob', label: 'Date of birth', ask: 'Choose your date of birth.', input: 'date' },
  {
    key: 'nationality',
    label: 'Nationality',
    ask: 'Choose your nationality.',
    input: 'choice',
    // Kitobdagi (Unit 1–3) odamlarning millatlari
    choices: ['AUSTRALIAN', 'AMERICAN', 'ENGLISH', 'FRENCH', 'ITALIAN', 'SPANISH', 'INDIAN'],
  },
  { key: 'address', label: 'Address' },
  {
    key: 'town',
    label: 'Town/City',
    ask: 'Choose your town or city.',
    input: 'choice',
    // Kitobdagi (Unit 1–3) shaharlar
    choices: ['SHEFFIELD', 'LONDON', 'BRISTOL', 'OXFORD', 'NEW YORK', 'CHICAGO', 'SYDNEY', 'MUMBAI'],
  },
  { key: 'postcode', label: 'Post Code' },
  { key: 'email', label: 'Email address' },
  { key: 'daytime', label: 'Daytime telephone' },
  { key: 'mobile', label: 'Mobile phone' },
] as const satisfies readonly Field[];

/** Forma oxiri: imzo — bitta tugma, sana — bugungi kun (o'zi qo'yiladi) */
export const FOOT_FIELDS = [
  { key: 'signature', label: 'Signature', ask: 'Tap “Sign”.', input: 'sign' },
  { key: 'date', label: 'Date', input: 'auto' },
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

const nice = (s: string) => s.trim().toLowerCase().replace(/(^|[\s-])\p{L}/gu, (c) => c.toUpperCase());

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

/** Imzo: "AZIZ KARIMOV" → "Aziz Karimov" */
export const signatureOf = (f: FormData) => `${nice(f.first)} ${nice(f.surname)}`.trim();

/** Tekshirish: bo'sh qolgan majburiy maydonlar, title, belgilangan qiziqish */
export function checkForm(f: FormData): string[] {
  const out: string[] = [];
  for (const field of [...FIELDS, ...FOOT_FIELDS] as readonly Field[]) {
    const v = f[field.key as FieldKey].trim();
    // Sana uchta tanlovdan yig'iladi — chala bo'lsa ("15//") ham to'ldirilmagan hisoblanadi
    if (field.ask && (!v || (field.input === 'date' && !parseDate(v)))) out.push(field.ask);
  }
  if (!f.title) out.push('Tap Mr, Mrs, Miss or Ms.');
  if (!f.interests.length) out.push('Tick (✓) one or more sports.');
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
