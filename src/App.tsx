import React, {useState} from "react";
import {Attempt} from "./types";
import {View} from "./components/common/View/";
import {ViewSettings} from "./components/views/Settings/";
import {ViewAttempts} from "./components/views/Attempts/";
import {ViewResults} from "./components/views/Results/";
import "./App.css";

/* TODO:
- 3 жизни
- имя пользователя
- карточки по одной
- статистика ошибок
 */

const VIEWS = {
  SETTINGS: "SETTINGS",
  ATTEMPTS: "ATTEMPTS",
  RESULTS: "RESULTS"
};

const DEFAULT_ATTEMPT_COUNT = 2;

const generateAttempts = (count: number): Attempt[] => {
  const generateRandomInt = (from: number, to: number): number =>
    Math.floor((Math.random() * (to - from)) + from);
  const FROM = 1;
  const TO = 10;
  return new Array(count)
    .fill(0)
    .map((_, index): Attempt => ({
      id: index,
      a: generateRandomInt(FROM, TO),
      b: generateRandomInt(FROM, TO),
      user: null,
      solution: null
    }));
}

const App = () => {
  const [view, setView] = useState(VIEWS.SETTINGS)
  const [attemptCount, setAttemptCount] = useState(DEFAULT_ATTEMPT_COUNT)
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [solutions, setSolutions] = useState<Attempt[]>([]);
  console.log('solutions', solutions);
  return (
    <div className="app">
      {view === VIEWS.SETTINGS && (
        <View
          title={"Учим таблицу умножения"}
          content={(
            <ViewSettings
              attemptCount={attemptCount}
              onAttemptCountChange={(value: number) => {
                setAttemptCount(value);
              }}
              onStart={() => {
                setView(VIEWS.ATTEMPTS);
                setAttempts(generateAttempts(attemptCount));
                setSolutions([]);
              }}
            />
          )}
        />
      )}
      {view === VIEWS.ATTEMPTS && (
        <View
          title={"Примеры"}
          content={(
            <ViewAttempts
              attempts={attempts}
              onSolveAttempt={(nextSolution) => setSolutions([...solutions, nextSolution])}
              onCancel={() => setView(VIEWS.SETTINGS)}
              onSubmit={() => setView(VIEWS.RESULTS)}
            />
          )}
        />
      )}
      {view === VIEWS.RESULTS && (
        <View
          title={"Результат"}
          content={(
            <ViewResults
              solutions={solutions}
              onSettingsChange={() => setView(VIEWS.SETTINGS)}
              onRestart={() => {
                setView(VIEWS.ATTEMPTS);
                setAttempts(generateAttempts(attemptCount));
                setSolutions([]);
              }}
            />
          )}
        />
      )}
    </div>
  );
};

export default App;
