import { useEffect, useState } from 'react';
import { Home } from './components/Home';
import { PartEnd } from './components/PartEnd';
import { Question } from './components/Question';
import { Results } from './components/Results';
import { TopBar } from './components/TopBar';
import { SECTIONS } from './data/sections';
import { continueView, openSection, totalStats } from './lib/stats';
import { useAnswers } from './store';
import type { View } from './types';

export default function App() {
  const { answers, answer, resetSection, resetAll } = useAnswers();
  const [view, setView] = useState<View>({ name: 'home' });
  const { done, got, total } = totalStats(answers);

  // Yangi ekran doim tepadan boshlansin
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const pick = (s: number) => setView(openSection(s, answers));
  const home = () => setView({ name: 'home' });

  return (
    <div className="mx-auto max-w-[600px] px-4">
      <TopBar done={done} got={got} total={total} onMenu={view.name === 'home' ? undefined : home} />
      <main className="pt-5 pb-44" aria-live="polite">
        {view.name === 'home' && (
          <Home
            answers={answers}
            onStart={() => setView(continueView(answers))}
            onPick={pick}
            onErase={resetAll}
          />
        )}

        {view.name === 'question' && (
          <Question
            key={`${view.s}-${view.i}`}
            s={view.s}
            i={view.i}
            answers={answers}
            onAnswer={(a) => answer(SECTIONS[view.s].id, view.i, a)}
            onNext={() =>
              setView(
                view.i + 1 < SECTIONS[view.s].items.length
                  ? { name: 'question', s: view.s, i: view.i + 1 }
                  : { name: 'partEnd', s: view.s },
              )
            }
          />
        )}

        {view.name === 'partEnd' && (
          <PartEnd
            s={view.s}
            answers={answers}
            onNext={() => setView(view.s + 1 < SECTIONS.length ? openSection(view.s + 1, answers) : { name: 'results' })}
            onRetry={() => {
              resetSection(SECTIONS[view.s].id);
              setView({ name: 'question', s: view.s, i: 0 });
            }}
          />
        )}

        {view.name === 'results' && <Results answers={answers} onPick={pick} onHome={home} />}
      </main>
    </div>
  );
}
