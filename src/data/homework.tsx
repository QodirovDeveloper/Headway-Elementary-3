import { FormCard } from '../components/FormCard';
import { LENA } from '../lib/form';
import type { SectionData } from '../types';
import { mc } from './classwork';

const YES_NO = ['Yes, she does.', "No, she doesn't."];

/**
 * Uy vazifasi: kitobning orqa qismidagi Unit 3 —
 * Writing Unit 3 "Form filling" (106-bet) va Grammar Reference 3.1–3.3 (135–136-betlar)
 */
export const HOMEWORK: SectionData[] = [
  {
    id: 'hw-lena',
    title: "Lena's application form",
    task: "Read Lena's form. Then answer the questions about her.",
    pages: 'page 106',
    figure: { label: "Lena's application form", content: <FormCard form={LENA} /> },
    kind: 'mc',
    items: [
      mc("What's her surname?", ['Lena', 'Prentis', 'Park'], 1),
      mc('Is she married?', ['Yes, she is.', "No, she isn't."], 1, { why: 'Her title is Miss. Miss = a woman who isn’t married.' }),
      mc("What's her nationality?", ['Australia', 'Australian', 'Sheffield'], 1),
      mc('Where does she live?', ['In Sheffield.', 'In Australia.', 'In London.'], 0),
      mc('When is her birthday?', ['2nd July', '7th February', '10th April'], 0, {
        why: 'dd/mm/yy: 02 is the day, 07 is the month (July), 84 is the year (1984).',
      }),
      mc('How old is she on the day she writes the form (10/04/11)?', ['24', '26', '27'], 1, {
        why: 'She was born on 2nd July 1984. On 10th April 2011 she is 26. Her birthday is later, in July.',
      }),
      mc("What's her mobile phone number?", ['0114 496 0154', '0770 900687', 'S1 4AX'], 1),
      mc("What's her post code?", ['23A', 'S1 4AX', '0114'], 1),
      mc('She likes swimming, outdoor tennis and ___.', ['squash', 'badminton', 'indoor tennis'], 0),
      mc('Does she like badminton?', YES_NO, 1, { why: 'There is no tick (✓) next to Badminton.' }),
      mc('Does she like going to the gym?', YES_NO, 0),
    ],
  },
  {
    id: 'hw-words',
    title: 'Form words',
    task: 'What do these words on a form mean?',
    pages: 'page 106',
    kind: 'mc',
    items: [
      mc('Surname', ['your family name', 'your first name', 'your town'], 0),
      mc('“Please write in BLOCK CAPITALS.” Which is correct?', ['Lena Prentis', 'LENA PRENTIS', 'lena prentis'], 1),
      mc('“Please tick (✓).”', ['put ✓ in the box', 'write your name', 'draw a line under the word'], 0),
      mc('“Please underline.”', ['put ✓ in the box', 'draw a line under the word', 'write in capitals'], 1),
      mc('Date of birth: 02/07/84 (dd/mm/yy)', ['2nd July 1984', '7th February 1984', '2nd July 2084'], 0),
      mc('Which word is a nationality?', ['Australia', 'Australian', 'Sheffield'], 1),
      mc('Title for a man', ['Mr', 'Mrs', 'Miss'], 0),
      mc("Title for a woman who isn't married", ['Mrs', 'Miss', 'Mr'], 1),
      mc('Signature', ['your name, written by you', 'your email address', 'your phone number'], 0),
      mc('Daytime telephone', ['your phone number in the day', 'your phone number at night', 'your post code'], 0),
    ],
  },
  {
    id: 'hw-myform',
    title: 'Your application form',
    task: "Fill in the same form for you. Then read your text about you and Lena.",
    pages: 'page 106',
    tip: (
      <>
        Write in <b>BLOCK CAPITALS</b> (LIKE THIS). Sign with your normal writing.
        <br />
        Your form stays on this phone. You can use invented details.
      </>
    ),
    kind: 'writing',
    items: [],
  },
  {
    id: 'hw-gr31',
    title: 'Present Simple: short answers',
    task: 'Grammar Reference 3.1. Choose the correct word.',
    pages: 'page 135',
    tip: (
      <>
        <b>I / you / we / they</b>: Do you live …? — Yes, I <b>do</b>. / No, I <b>don't</b>.
        <br />
        <b>he / she / it</b>: Does she live …? — Yes, she <b>does</b>. / No, she <b>doesn't</b>.
      </>
    ),
    kind: 'mc',
    items: [
      mc('“Do you like playing cards?” “Yes, I ___.”', ['do', 'like', 'am'], 0),
      mc('“Do they go out on Sunday?” “No, they ___.”', ["don't", "doesn't", "aren't"], 0),
      mc('“Does he live in New York?” “No, he ___.”', ["don't", "doesn't", "isn't"], 1),
      mc('“Do you and your sister work?” “Yes, we ___.”', ['do', 'are', 'does'], 0),
      mc('Where ___ they live?', ['do', 'does', 'are'], 0),
      mc('We ___ live in New York.', ["don't", "doesn't", 'not'], 0),
      mc('___ she go out on Sunday?', ['Do', 'Does', 'Is'], 1),
    ],
  },
  {
    id: 'hw-gr32',
    title: 'Adverbs of frequency',
    task: 'Grammar Reference 3.2. Write the sentence with the word in brackets.',
    pages: 'page 136',
    tip: (
      <>
        Before the main verb: I <b>often</b> eat in a restaurant.
        <br />
        After am / is / are: She's <b>always</b> late.
        <br />
        <b>Sometimes</b> and <b>usually</b> can also go at the beginning or the end.
        <br />
        <b>Never</b> and <b>always</b> can't.
      </>
    ),
    kind: 'type',
    placeholder: 'Write the full sentence',
    items: [
      { q: 'I work late. (sometimes)', accept: ['I sometimes work late.', 'Sometimes I work late.', 'I work late sometimes.'] },
      { q: 'We stop work at 6.00. (always)', accept: ['We always stop work at 6.00.'] },
      { q: 'She goes out on Sundays. (never)', accept: ['She never goes out on Sundays.'] },
      { q: "She's late. (always)", accept: ["She's always late."] },
      { q: "I'm hungry in the morning. (never)", accept: ["I'm never hungry in the morning."] },
      { q: 'I walk to school. (usually)', accept: ['I usually walk to school.', 'Usually I walk to school.', 'I walk to school usually.'] },
      { q: 'I eat in a restaurant. (often)', accept: ['I often eat in a restaurant.'] },
    ],
  },
  {
    id: 'hw-gr33',
    title: 'like / love + -ing',
    task: 'Grammar Reference 3.3. Choose the correct form.',
    pages: 'page 136',
    tip: (
      <>
        <b>like / love + verb-ing</b>: I like cook<b>ing</b>. She loves listen<b>ing</b> to music.
      </>
    ),
    kind: 'mc',
    items: [
      mc('I like ___.', ['cook', 'cooking', 'to cooking'], 1),
      mc('She loves ___ to music.', ['listening', 'listen', 'listens'], 0),
      mc("I don't like ___.", ['studing', 'studying', 'study'], 1),
      mc('They love ___ in the sea.', ['swiming', 'swimming', 'swim'], 1),
      mc('Do you like ___ cards?', ['play', 'playing', 'plays'], 1),
    ],
  },
  {
    id: 'hw-prep',
    title: 'Prepositions',
    task: 'Grammar Reference, Unit 3. Choose the correct preposition.',
    pages: 'page 136',
    kind: 'mc',
    items: [
      mc('___ Monday to Friday I work in a bookstore.', ['From', 'On', 'At'], 0),
      mc('___ Saturdays I have another job.', ['On', 'In', 'At'], 0),
      mc("I'm a singer ___ a band.", ['with', 'at', 'on'], 0),
      mc('I start work ___ 6.00.', ['at', 'on', 'in'], 0),
      mc('I work ___ 10.00 at night.', ['until', 'on', 'in'], 0),
      mc("I'm ___ home on Saturdays.", ['at', 'in', 'on'], 0),
      mc('Do you relax ___ weekends?', ['at', 'in', 'of'], 0),
      mc('I go skiing ___ winter.', ['in', 'on', 'at'], 0),
      mc('I listen ___ music.', ['to', 'at', 'for'], 0),
      mc('My garden is full ___ flowers.', ['of', 'with', 'from'], 0),
      mc('We go ___ Spain or France.', ['to', 'at', 'in'], 0),
    ],
  },
];
