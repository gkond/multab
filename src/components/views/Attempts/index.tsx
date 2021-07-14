import React, {useEffect, useState} from "react";
import {Attempt} from "../../../types";
import {Button} from "../../common/Button";
import {InputText} from "../../common/InputText";
import cx from "classnames";
import styles from "./styles.module.css";

const AttemptCard: React.FunctionComponent<{
  attempt: Attempt,
  total: number,
  onSolve: (nextSolution: number | null) => void
}> = ({attempt, total, onSolve}) => {
  const [value, setValue] = useState<number | null>(null);
  const [solved, setSolved] = useState<boolean>(false);
  useEffect(() => {
    setValue(null);
    setSolved(false);
  }, [attempt])
  return (
    <div className={cx(styles.attempt, {
      [styles.__correct]: value === attempt.a * attempt.b,
      [styles.__incorrect]: value !== attempt.a * attempt.b
    })}>
      <div className={styles.attempt_id}>{`${attempt.id + 1} / ${total}`}</div>
      <div className={styles.attempt_line}>
        <span className={styles.attempt_number}>{attempt.a}</span>
        <span className={styles.attempt_sign}>&times;</span>
        <span className={styles.attempt_number}>{attempt.b}</span>
        <span className={styles.attempt_sign}>=</span>
        <span className={styles.attempt_input}>
          <InputText
            disabled={solved}
            onChange={(value) => {
              const num = Number(value);
              if (Number.isFinite(num)) {
                setValue(Number(num));
              }
            }}
            maxLength={3}
            value={value}
          />
        </span>

        <Button
          disabled={value === null || solved}
          text={"Готово"}
          onClick={() => {
            setSolved(true);
            onSolve(value);
          }}
        />
      </div>
    </div>
  )
};

export const ViewAttempts: React.FunctionComponent<{
  attempts: Attempt[],
  onSolveAttempt: (nextSolution: Attempt) => void,
  onCancel: () => void,
  onSubmit: () => void
}> = ({
  attempts,
  onSolveAttempt,
  onCancel,
  onSubmit
}) => {
  const [index, setIndex] = useState<number>(0);
  return (
    <div>
      <AttemptCard
        attempt={attempts[index]}
        total={attempts.length}
        onSolve={(value) => {
          onSolveAttempt({
            ...attempts[index],
            user: 'default',
            solution: value
          });
          setTimeout(() => {
            if (index < attempts.length - 1) {
              setIndex(index + 1);
            } else {
              onSubmit();
            }
          }, 500)
        }}
      />
      <div>
        <Button
          text={"Назад"}
          onClick={onCancel}
        />
      </div>
    </div>
  );
}
