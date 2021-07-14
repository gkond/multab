import React from "react";
import {Button} from "../../common/Button";

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
      {"Примеры:"}
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
      <Button
        text={"Начать тренировку"}
        onClick={onStart}>
      </Button>
    </div>
  </div>
);
