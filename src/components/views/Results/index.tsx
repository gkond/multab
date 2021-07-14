import React from "react";
import {Attempt} from "../../../types";
import {Button} from "../../common/Button";
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
                (Верный ответ: {solution.a * solution.b})
              </span>
            )}
          </li>
        );
      })}
    </ul>
    <div>
      <Button
        text={"Изменить настройки"}
        onClick={onSettingsChange}>
      </Button>
      <Button
        text={"Повторить"}
        onClick={onRestart}>
      </Button>
    </div>
  </div>
);
