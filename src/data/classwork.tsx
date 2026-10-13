import type { McItem, SectionData } from '../types';

/** Qisqa yozuv: mc('Where ___ you live?', ['do', 'does', 'are'], 0) */
export const mc = (q: string, options: string[], answer: number, extra?: Pick<McItem, 'hint' | 'why'>): McItem => ({
  q,
  options,
  answer,
  ...extra,
});
const WHO = ['Jamie', 'Shilpa', 'Both'];

/** Sinf ishi: Headway Elementary (4th ed.), Unit 3 "Work hard, play hard!", kitobning old qismi, 22–29-betlar */
export const CLASSWORK: SectionData[] = [
  {
    id: 'story',
    title: "Marco's two jobs",
    pages: 'page 22',
    task: 'Marco has two jobs. Choose the correct verb.',
    kind: 'mc',
    items: [
      mc("Hi, I'm Marco. I'm 27 years old and I ___ in London.", ['live', 'work', 'stay', 'cook'], 0),
      mc('From Monday to Friday I ___ in a café near the river.', ['sing', 'eat', 'work', 'love'], 2),
      mc('On Saturdays I ___ another job. I play the guitar in a band.', ['finish', 'have', 'stay', "don't go"], 1),
      mc("It's great because I ___ music!", ['love', 'live', 'eat', "don't do"], 0),
      mc("On weekdays I usually ___ work at 5 o'clock.", ['stay', 'finish', 'have', 'sing'], 1),
      mc("But sometimes I ___ late, until 8 or 9 o'clock.", ['cook', 'live', 'stay', 'eat'], 2),
      mc('On Saturday nights we ___ and play in small clubs.', ['sing', 'finish', 'have', "don't do"], 0),
      mc("I ___ to bed until 2 o'clock in the morning.", ["don't do", "don't go", 'stay', 'finish'], 1),
      mc('On Sundays I ___ much at all.', ["don't go", 'have', "don't do", 'love'], 2),
      mc('I often ___ lunch with my family.', ['eat', 'sing', 'work', 'finish'], 0),
      mc("But I never ___ on Sundays. I'm too tired!", ['live', 'stay', 'cook', 'have'], 2),
    ],
  },
  {
    id: 'qneg',
    title: 'Questions & negatives',
    pages: 'page 23',
    task: 'Choose the correct word.',
    tip: (
      <>
        <b>I / you / we / they</b> → <b>do</b> / <b>don't</b>
        <br />
        <b>he / she / it</b> → <b>does</b> / <b>doesn't</b>
      </>
    ),
    kind: 'mc',
    items: [
      mc('Where ___ you live?', ['do', 'does', 'are'], 0),
      mc('___ she work in London?', ['Do', 'Does', 'Is'], 1),
      mc('“Does he like his job?” “No, he ___.”', ["don't", "isn't", "doesn't"], 2),
      mc('“Do you like your job?” “Yes, I ___.”', ['do', 'am', 'like'], 0),
      mc('Why ___ you relax at weekends?', ["doesn't", "don't", 'not'], 1),
      mc('I ___ like cooking.', ["doesn't", 'not', "don't"], 2),
      mc('They ___ to learn English.', ['want', 'wants', 'wanting'], 0),
      mc('We ___ to bed early on Saturdays.', ["doesn't go", "don't go", 'not go'], 1),
      mc('What time ___ you finish work?', ['do', 'does', 'are'], 0),
      mc('How many jobs ___ Lisa have?', ['do', 'is', 'does'], 2),
    ],
  },
  {
    id: 'qwords',
    title: 'Question words',
    pages: 'page 24',
    task: 'Choose the question word. The answer helps you.',
    kind: 'mc',
    items: [
      mc('___ do you get up?', ['Where', 'What time', 'Who'], 1, { hint: "At about 7 o'clock." }),
      mc('___ do you go on holiday?', ['Where', 'When', 'How'], 0, { hint: 'To Turkey or Egypt.' }),
      mc('___ do you do on Sundays?', ['Why', 'Who', 'What'], 2, { hint: 'I always relax.' }),
      mc('___ do you do your homework?', ['When', 'Where', 'What'], 0, { hint: 'When I get home.' }),
      mc('___ do you live with?', ['What', 'Who', 'How'], 1, { hint: 'My mother and my brothers.' }),
      mc('___ do you like your job?', ['How', 'Why', 'When'], 1, { hint: "Because it's interesting." }),
      mc('___ do you travel to school?', ['How', 'What', 'Who'], 0, { hint: 'Usually by bus.' }),
      mc('___ you go out on Friday evenings?', ['Are', 'Does', 'Do'], 2, { hint: 'Yes, I do sometimes.' }),
    ],
  },
  {
    id: 'opp',
    title: 'Make it opposite',
    pages: 'page 24',
    task: 'Write the opposite: positive → negative, negative → positive.',
    tip: (
      <>
        Example:
        <br />
        <b>I don't like cooking.</b> → <b>I like cooking.</b>
        <br />
        <b>She speaks French.</b> → <b>She doesn't speak French.</b>
      </>
    ),
    kind: 'type',
    placeholder: 'Write the opposite sentence',
    items: [
      { q: "She doesn't speak Spanish.", accept: ['She speaks Spanish.'] },
      { q: 'They want to learn English.', accept: ["They don't want to learn English."] },
      { q: 'I like playing golf.', accept: ["I don't like playing golf."] },
      { q: "We don't work on Sundays.", accept: ['We work on Sundays.'] },
      { q: 'He lives in New York.', accept: ["He doesn't live in New York."] },
      { q: "You don't go to the gym.", accept: ['You go to the gym.'] },
      { q: 'I work at home because I have a computer.', accept: ["I don't work at home because I don't have a computer."] },
    ],
  },
  {
    id: 'freq',
    title: 'How often?',
    pages: 'page 23',
    task: 'Choose the correct answer.',
    tip: (
      <>
        <b>always</b> 100% → <b>usually</b> → <b>often</b> → <b>sometimes</b> → <b>never</b> 0%
        <br />
        The adverb goes <b>before</b> the verb, but <b>after</b> am / is / are.
      </>
    ),
    kind: 'mc',
    items: [
      mc('Which sentence is correct?', ['I always am busy.', 'I am always busy.', 'Always I am busy.'], 1),
      mc('Which sentence is correct?', ['I usually finish work at six.', 'I finish usually work at six.', 'I finish work usually at six.'], 0),
      mc('Which sentence is correct?', ['She eats often in a restaurant.', 'Often she eats in restaurant.', 'She often eats in a restaurant.'], 2),
      mc('Which sentence is correct?', ['I cook never on Sundays.', 'I never cook on Sundays.', "I don't never cook on Sundays."], 1),
      mc('Which word means 0%?', ['sometimes', 'never', 'often'], 1),
      mc('Which word means 100%?', ['usually', 'always', 'often'], 1),
      mc(
        'Which order is correct, from most to least?',
        ['always, usually, often, sometimes, never', 'always, often, usually, never, sometimes', 'usually, always, sometimes, often, never'],
        0,
      ),
    ],
  },
  {
    id: 'free',
    title: 'Free time',
    pages: 'pages 24–25',
    task: 'Choose the best word.',
    kind: 'mc',
    items: [
      mc('You need snow for ___.', ['sailing', 'skiing', 'cycling'], 1),
      mc('You need a racket for ___.', ['tennis', 'golf', 'running'], 0),
      mc('You need wind and water for ___.', ['dancing', 'windsurfing', 'reading'], 1),
      mc('watch ___', ['the piano', 'shopping', 'TV'], 2),
      mc('listen to ___', ['music', 'dinner', 'late'], 0),
      mc('play ___', ['the piano', 'shopping', 'TV'], 0),
      mc('get up ___', ['dinner', 'late', 'music'], 1),
      mc('cook ___', ['late', 'dancing', 'dinner'], 2),
      mc('go ___', ['the guitar', 'shopping', 'TV'], 1),
      mc('Which month comes after June?', ['July', 'May', 'August'], 0),
      mc('Which season comes after winter?', ['autumn', 'summer', 'spring'], 2),
      mc('Which days are the weekend?', ['Friday and Saturday', 'Saturday and Sunday', 'Sunday and Monday'], 1),
    ],
  },
  {
    id: 'ing',
    title: 'like + -ing',
    pages: 'page 25',
    task: 'Write the verb in the -ing form.',
    tip: (
      <>
        <b>like / love / enjoy + verb-ing</b>
        <br />
        play → play<b>ing</b>, danc<b>e</b> → danc<b>ing</b>, ru<b>n</b> → ru<b>nn</b>ing
      </>
    ),
    kind: 'type',
    placeholder: 'Write the -ing form',
    items: [
      { q: 'I like ___ golf. (play)', accept: ['playing'] },
      { q: "She doesn't like ___. (run)", accept: ['running'] },
      { q: 'We love ___ on Friday nights. (dance)', accept: ['dancing'] },
      { q: 'Do you like ___ in the sea? (swim)', accept: ['swimming'] },
      { q: 'He enjoys ___ in the park. (cycle)', accept: ['cycling'] },
      { q: 'They like ___ to music. (listen)', accept: ['listening'] },
      { q: 'I love ___ Indian food. (cook)', accept: ['cooking'] },
      { q: 'My dad likes ___ cards. (play)', accept: ['playing'] },
    ],
  },
  {
    id: 'read',
    title: 'Jamie or Shilpa?',
    pages: 'pages 26–27',
    task: 'Remember the reading “Town and country weekends”.',
    kind: 'mc',
    items: [
      mc('Who lives in a flat in north-west London?', WHO, 0),
      mc('Who starts the weekend at home in the countryside?', WHO, 1),
      mc('Who plays poker with friends or family?', WHO, 2),
      mc('Who drinks green tea?', WHO, 1),
      mc('Who plays the piano in the kitchen?', WHO, 0),
      mc('Who goes to Portobello Market?', WHO, 0),
      mc('Who gets up late on Saturday?', WHO, 2),
      mc('Who loves walking barefoot on the grass?', WHO, 1),
      mc('Who cooks Sunday dinner?', WHO, 0),
      mc('Who watches cookery programmes on TV?', WHO, 1),
      mc('Who watches French or Japanese films?', WHO, 0),
      mc('Who loves flowers and garden centres?', WHO, 1),
    ],
  },
  {
    id: 'social',
    title: 'Social expressions',
    pages: 'page 29',
    task: 'Choose the best reply.',
    kind: 'mc',
    items: [
      mc('“Bye! Have a nice day!”', ['Thanks. Same to you. See you later.', 'Yes, it is. Sit down.', 'It means in two languages.'], 0),
      mc("“I'm sorry I'm late. The bus was very slow.”", ['Pardon?', 'Never mind. Come and sit down.', 'Good, thanks.'], 1),
      mc("“What's the matter? Do you have a problem?”", ['Sure. Good idea.', 'Same to you.', "Yes. I don't understand this exercise."], 2),
      mc(
        "“Can I open the window? It's really warm in here.”",
        ["Sure. Good idea. It is hot in here, isn't it?", "I'm sorry, I don't speak French.", 'Never mind.'],
        0,
      ),
      mc('“Excuse me, what does ‘busy’ mean?”', ['Yes, it is.', 'It means you have a lot to do.', 'See you later.'], 1),
      mc('“Excuse me! Is this seat free?”', ['Good, thanks.', 'Yes, it is. Do sit down.', "Pardon? I'm late."], 1),
      mc('“Parlez-vous français?”', ['Thanks. Same to you.', 'Yes, I do sometimes.', "I'm sorry. I don't speak French."], 2),
      mc('“Hi! How was your day?”', ['Good, thanks. Really interesting. How about you?', 'Never mind.', "It's half past five."], 0),
      mc("You don't hear the question. What do you say?", ['Same to you!', 'Pardon? Can you say that again?', 'Sure. Good idea.'], 1),
    ],
  },
];
