import React from "react";
import {Example} from "../../../types";
import "./styles.css";

export const ViewExamples: React.FunctionComponent<{
  examples: Example[],
  solutions: number[],
  onSolutionsChange: (nextExampleCount: number[]) => void,
  onCancel: () => void,
  onSubmit: () => void
}> = ({
  examples,
  solutions,
  onSolutionsChange,
  onCancel,
  onSubmit
}) => (
  <div>
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
