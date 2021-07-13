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
      {solutions.map((solution) => {
        const correct = solution.a * solution.b === solution.solution;
        return (
          <li
            className={correct
              ? "result __correct"
              : "result __incorrect"
            }
            key={solution.id}
          >
            <span className="result_example">{solution.a} &times; {solution.b}</span>
            <span> = </span>
            <span className="result_solution">
              {solution.solution}
            </span>
            {!correct && (
              <span className="result_correct">
                {solution.a * solution.b}
              </span>
            )}
          </li>
        );
      })}
    </ul>
    <div>
      <button onClick={() => onSettingsChange()} type="button">
        {"Изменить настройки"}
      </button>
      <button onClick={() => onRestart()} type="button">
        {"Повторить"}
      </button>
    </div>
  </div>
);
