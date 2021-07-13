import React, {useEffect, useState} from "react";
import {Attempt} from "../../../types";
import "./styles.css";

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
    <div className={solved
      ? `attempt ${
          value === attempt.a * attempt.b
            ? "__correct"
            : "__incorrect"
        }`
      : "attempt"
    }>
      <div className="attempt_id">{`${attempt.id + 1} / ${total}`}</div>
      <div className="attempt_line">
        <span className="attempt_number">{attempt.a}</span>
        <span className="attempt_sign">&times;</span>
        <span className="attempt_number">{attempt.b}</span>
        <span className="attempt_sign">=</span>
        <span className="attempt_input">
          <input
            onChange={(e) => {
              const num = Number(e.target.value);
              if (Number.isFinite(num)) {
                setValue(num);
              }
            }}
            maxLength={3}
            value={value ?? ''}
            type="text"
          />
        </span>
        <button onClick={() => {
          setSolved(true);
          onSolve(value);
        }} type="button">
          {"Готово"}
        </button>
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
          if (index < attempts.length - 1) {
            setTimeout(() => {
              setIndex(index + 1);
            }, 1000)
          } else {
            onSubmit();
          }
        }}
      />
      <div>
        <button onClick={() => onCancel()} type="button">
          {"Назад"}
        </button>
      </div>
    </div>
  );

}
