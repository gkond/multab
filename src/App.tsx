import React, {useState} from "react";
import {Example} from "./types";
import {View} from "./components/common/View/";
import {ViewSettings} from "./components/views/Settings/";
import {ViewExamples} from "./components/views/Examples/";
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
  EXAMPLES: "EXAMPLES",
  RESULTS: "RESULTS"
};

const DEFAULT_EXAMPLE_COUNT = 5;
const FROM = 1;
const TO = 10;

const generateRandomInt = (from: number, to: number): number =>
  Math.floor((Math.random() * (to - from)) + from);

const generateExamples = (count: number): Example[] =>
  new Array(count)
    .fill(0)
    .map((_, index): Example => ({
      id: index,
      a: generateRandomInt(FROM, TO),
      b: generateRandomInt(FROM, TO)
    }));

const App = () => {
  const [view, setView] = useState(VIEWS.SETTINGS)
  const [exampleCount, setExampleCount] = useState(DEFAULT_EXAMPLE_COUNT)
  const [examples, setExamples] = useState<Example[]>([]);
  const [solutions, setSolutions] = useState<number[]>([]);
  return (
    <div className="app">
      {view === VIEWS.SETTINGS && (
        <View
          title={"Учим таблицу умножения"}
          content={(
            <ViewSettings
              exampleCount={exampleCount}
              onExampleCountChange={(value: number) => {
                setExampleCount(value);
              }}
              onStart={() => {
                setView(VIEWS.EXAMPLES);
                setExamples(generateExamples(exampleCount));
                setSolutions([]);
              }}
            />
          )}
        />
      )}
      {view === VIEWS.EXAMPLES && (
        <View
          title={"Примеры"}
          content={(
            <ViewExamples
              examples={examples}
              solutions={solutions}
              onSolutionsChange={(nextSolutions) => setSolutions(nextSolutions)}
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
              examples={examples}
              solutions={solutions}
              onSettingsChange={() => setView(VIEWS.SETTINGS)}
              onRestart={() => {
                setView(VIEWS.EXAMPLES);
                setExamples(generateExamples(exampleCount));
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
