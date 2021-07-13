import React from "react";

const MIN_ATTEMPT_COUNT = 1;
const MAX_ATTEMPT_COUNT = 20;

export const ViewSettings: React.FunctionComponent<{
  attemptCount: number,
  onAttemptCountChange: (nextAttemptCount: number) => void,
  onStart: () => void
}> = ({
  attemptCount,
  onAttemptCountChange,
  onStart
}) => (
  <div>
    <label>
      {"Число примеров:"}
      <input
        onChange={(e) => {
          const num = Number(e.target.value);
          if (Number.isFinite(num)) {
            let nextAttemptCount = num;
            nextAttemptCount = Math.min(nextAttemptCount, MAX_ATTEMPT_COUNT)
            nextAttemptCount = Math.max(nextAttemptCount, MIN_ATTEMPT_COUNT)
            onAttemptCountChange(nextAttemptCount);
          }
        }}
        value={attemptCount}
        type="text"
      />
    </label>
    <div>
      <button onClick={onStart} type="button">
        {"Начать тренировку"}
      </button>

    </div>
  </div>
);
