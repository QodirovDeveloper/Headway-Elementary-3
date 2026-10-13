import { useLayoutEffect, useRef, useState } from 'react';
import { Home } from './components/Home';
import { PartEnd } from './components/PartEnd';
import { Question } from './components/Question';
import { Results } from './components/Results';
import { TopBar } from './components/TopBar';
import { Writing } from './components/Writing';
import { GROUPS, SECTIONS } from './data/sections';
import { continueView, groupStats, nextPart, openSection, viewGroup } from './lib/stats';
import { useAnswers } from './store';
import type { View } from './types';

/** Savol matnining ekrandagi o'rni; tepadagi panel ostida yashirinib qolmasin */
function promptTop(): number | null {
  const prompt = document.getElementById('prompt');
  if (!prompt) return null;
  const barBottom = document.getElementById('topbar')?.getBoundingClientRect().bottom ?? 0;
  return Math.max(prompt.getBoundingClientRect().top, barBottom + 12);
}

export default function App() {
  const { answers, answer, resetSection, resetAll } = useAnswers();
  const [view, setView] = useState<View>({ name: 'home' });
  const [figureOpen, setFigureOpen] = useState(true);
  const group = viewGroup(view);
  const { done, got, total } = groupStats(answers, group);
  /** "Continue" bosilganda savol matni ekranda qayerda edi — keyingi savol ham shu joyda chiqadi */
  const keepPromptAt = useRef<number | null>(null);

  // Bir qism ichida savoldan savolga — o'quvchi turgan joy saqlanadi; boshqa ekranlar tepadan boshlanadi
  useLayoutEffect(() => {
    const top = keepPromptAt.current;
    keepPromptAt.current = null;
    const prompt = document.getElementById('prompt');
    if (top !== null && prompt) window.scrollBy(0, prompt.getBoundingClientRect().top - top);
    else window.scrollTo(0, 0);
  }, [view]);

  const pick = (s: number) => setView(openSection(s, answers));
  const home = () => setView({ name: 'home' });

  /** Bo'lim tugagach: shu guruhdagi keyingi bo'lim yoki guruh natijasi */
  const afterPart = (s: number) => {
    const next = nextPart(s);
    return {
      label: next === null ? `See ${GROUPS[SECTIONS[s].group].label.toLowerCase()} results` : 'Next part →',
      go: () => setView(next === null ? { name: 'results', group: SECTIONS[s].group } : openSection(next, answers)),
    };
  };

  return (
    <div className="mx-auto max-w-[600px] px-4">
      <TopBar done={done} got={got} total={total} onMenu={view.name === 'home' ? undefined : home} />
      <main className="pt-5 pb-44" aria-live="polite">
        {view.name === 'home' && (
          <Home answers={answers} onStart={(g) => setView(continueView(answers, g))} onPick={pick} onErase={resetAll} />
        )}

        {view.name === 'question' && (
          <Question
            key={`${view.s}-${view.i}`}
            s={view.s}
            i={view.i}
            answers={answers}
            onAnswer={(a) => answer(SECTIONS[view.s].id, view.i, a)}
            onNext={() => {
              if (view.i + 1 < SECTIONS[view.s].items.length) {
                keepPromptAt.current = promptTop();
                setView({ name: 'question', s: view.s, i: view.i + 1 });
              } else setView({ name: 'partEnd', s: view.s });
            }}
            figureOpen={figureOpen}
            onFigureToggle={setFigureOpen}
          />
        )}

        {view.name === 'writing' && (
          <Writing
            key={view.s}
            s={view.s}
            answers={answers}
            onSave={(a) => answer(SECTIONS[view.s].id, 0, a)}
            nextLabel={afterPart(view.s).label}
            onNext={afterPart(view.s).go}
          />
        )}

        {view.name === 'partEnd' && (
          <PartEnd
            s={view.s}
            answers={answers}
            nextLabel={afterPart(view.s).label}
            onNext={afterPart(view.s).go}
            onRetry={() => {
              resetSection(SECTIONS[view.s].id);
              setView({ name: 'question', s: view.s, i: 0 });
            }}
          />
        )}

        {view.name === 'results' && <Results group={view.group} answers={answers} onPick={pick} onHome={home} />}
      </main>
    </div>
  );
}
