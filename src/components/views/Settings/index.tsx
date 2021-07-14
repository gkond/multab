import React from "react";
import {Button} from "../../common/Button";
import {InputText} from "../../common/InputText";

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
      <InputText
        onChange={(value) => {
          const num = Number(value);
          if (Number.isFinite(num)) {
            let nextAttemptCount = num;
            nextAttemptCount = Math.min(nextAttemptCount, MAX_ATTEMPT_COUNT)
            nextAttemptCount = Math.max(nextAttemptCount, MIN_ATTEMPT_COUNT)
            onAttemptCountChange(nextAttemptCount);
          }
        }}
        value={attemptCount}
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
