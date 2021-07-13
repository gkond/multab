import React from "react";
import {Attempt} from "../../../types";
import "./styles.css";

export const ViewResults: React.FunctionComponent<{
  solutions: Attempt[],
  onSettingsChange: () => void,
  onRestart: () => void,
}> = ({
  solutions,
  onSettingsChange,
  onRestart
}) => (
  <div>
    <ul className="resultsList">
      {solutions.map((solution) => (
        <li
          className="result"
          key={solution.id}
        >
          <span>{solution.id + 1} {solution.a} &times; {solution.b}</span>
          <span> = {solution.solution} </span>
          {solution.solution === solution.a * solution.b && 'верно'}
          {solution.solution !== solution.a * solution.b && 'не верно'}
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
