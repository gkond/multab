import React from "react";
import {Attempt} from "../../../types";
import {Button} from "../../common/Button";
import cx from "classnames";
import styles from "./styles.module.css";

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
    <ul className={styles.resultsList}>
      {solutions.map((solution) => {
        const correct = solution.a * solution.b === solution.solution;
        return (
          <li
            className={cx(styles.result, {
              [styles.__correct]: correct,
              [styles.__incorrect]: !correct,
            })}
            key={solution.id}
          >
            <span className={styles.result_example}>{solution.a} &times; {solution.b}</span>
            <span> = </span>
            <span className={styles.result_solution}>
              {solution.solution}
            </span>
            {!correct && (
              <span className={styles.result_correct}>
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
