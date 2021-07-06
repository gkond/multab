import React, {useState} from "react";
import "./App.css";

interface Example {
  id: number;
  a: number;
  b: number;
}

const VIEWS = {
  SETTINGS: "SETTINGS",
  EXAMPLES: "EXAMPLES",
  RESULTS: "RESULTS"
};

const DEFAULT_EXAMPLE_COUNT = 5   ;
const MIN_EXAMPLE_COUNT = 1;
const MAX_EXAMPLE_COUNT = 20;
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
  console.log('solutions', solutions);
  return (
    <div className="app">
      {view === VIEWS.SETTINGS && (
        <div className="view">
          <h1 className="view_title">
            {"Учим таблицу умножения"}
          </h1>
          <div>
            <label>
              {"Число примеров:"}
              <input
                onChange={(e) => {
                  const num = Number(e.target.value);
                  if (Number.isFinite(num)) {
                    let nextExampleCount = num;
                    nextExampleCount = Math.min(nextExampleCount, MAX_EXAMPLE_COUNT)
                    nextExampleCount = Math.max(nextExampleCount, MIN_EXAMPLE_COUNT)
                    setExampleCount(nextExampleCount);
                  }
                }}
                value={exampleCount}
                type="text"
              />
            </label>
          </div>
          <div>
            <button onClick={() => {
              setView(VIEWS.EXAMPLES);
              setExamples(generateExamples(exampleCount));
              setSolutions([]);
            }} type="button">
              {"Начать тренировку"}
            </button>
          </div>
        </div>
      )}
      {view === VIEWS.EXAMPLES && (
        <div className="view">
          <h1 className="view_title">
            {"Примеры"}
          </h1>
          <ul className="examplesList">
            {examples.map(({id, a, b}) => (
              <li
                className="example"
                key={id}
              >
                <div className="example_id">{id + 1}</div>
                <div className="example_line">
                  <span className="example_number">{a}</span>
                  <span className="example_sign">&times;</span>
                  <span className="example_number">{b}</span>
                  <span className="example_sign">=</span>
                  <span className="example_input">
                    <input
                      onChange={(e) => {
                        const num = Number(e.target.value);
                        if (Number.isFinite(num)) {
                          const nextSolutions = [...solutions];
                          nextSolutions[id] = num;
                          setSolutions(nextSolutions);
                        }
                      }}
                      maxLength={3}
                      value={solutions[id]}
                      type="text"
                    />
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <button onClick={() => setView(VIEWS.SETTINGS)} type="button">
            {"Назад"}
          </button>
          <button onClick={() => setView(VIEWS.RESULTS)} type="button">
            {"Проверить результаты"}
          </button>
        </div>
      )}
      {view === VIEWS.RESULTS && (
        <div className="view">
          <h1 className="view_title">
            {"Результат"}
          </h1>
          <ul className="examplesList">
            {examples.map(({id, a, b}) => (
              <li
                className="example"
                key={id}
              >
                <span>{id + 1} {a} &times; {b}</span>
                <span> = {solutions[id]} </span>
                {solutions[id] === a * b && 'верно'}
                {solutions[id] !== a * b && 'не верно'}
              </li>
            ))}
          </ul>
          <button onClick={() => setView(VIEWS.SETTINGS)} type="button">
            {"Изменить настройки"}
          </button>
          <button onClick={() => {
            setView(VIEWS.EXAMPLES);
            setExamples(generateExamples(exampleCount));
            setSolutions([]);
          }} type="button">
            {"Повторить"}
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
