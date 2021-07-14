import React, {useEffect, useState} from "react";
import {Attempt} from "../../../types";
import {Button} from "../../common/Button";
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
            disabled={solved}
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
