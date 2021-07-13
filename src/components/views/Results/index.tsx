import React from "react";
import {Attempt} from "../../../types";
import "./styles.css";

export const ViewResults: React.FunctionComponent<{
  attempts: Attempt[],
  solutions: number[],
  onSettingsChange: () => void,
  onRestart: () => void,
}> = ({
  attempts,
  solutions,
  onSettingsChange,
  onRestart
}) => (
  <div>
    <ul className="resultsList">
      {attempts.map(({id, a, b}) => (
        <li
          className="result"
          key={id}
        >
          <span>{id + 1} {a} &times; {b}</span>
          <span> = {solutions[id]} </span>
          {solutions[id] === a * b && 'верно'}
          {solutions[id] !== a * b && 'не верно'}
        </li>
      ))}
    </ul>
    <div>
      <button onClick={() => onSettingsChange} type="button">
        {"Изменить настройки"}
      </button>
      <button onClick={() => onRestart()} type="button">
        {"Повторить"}
      </button>
    </div>
  </div>
);
