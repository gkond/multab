import React from "react";
import {Attempt} from "../../../types";
import "./styles.css";

export const ViewAttempts: React.FunctionComponent<{
  attempts: Attempt[],
  solutions: number[],
  onSolutionsChange: (nextAttemptsCount: number[]) => void,
  onCancel: () => void,
  onSubmit: () => void
}> = ({
  attempts,
  solutions,
  onSolutionsChange,
  onCancel,
  onSubmit
}) => (
  <div>
    <ul className="attemptsList">
      {attempts.map(({id, a, b}) => (
        <li
          className="attempt"
          key={id}
        >
          <div className="attempt_id">{id + 1}</div>
          <div className="attempt_line">
            <span className="attempt_number">{a}</span>
            <span className="attempt_sign">&times;</span>
            <span className="attempt_number">{b}</span>
            <span className="attempt_sign">=</span>
            <span className="attempt_input">
              <input
                onChange={(e) => {
                  const num = Number(e.target.value);
                  if (Number.isFinite(num)) {
                    const nextSolutions = [...solutions];
                    nextSolutions[id] = num;
                    onSolutionsChange(nextSolutions);
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
    <div>
      <button onClick={() => onCancel()} type="button">
        {"Назад"}
      </button>
      <button onClick={() => onSubmit()} type="button">
        {"Проверить результаты"}
      </button>
    </div>
  </div>
);
