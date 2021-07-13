import React from "react";

const MIN_EXAMPLE_COUNT = 1;
const MAX_EXAMPLE_COUNT = 20;

export const ViewSettings: React.FunctionComponent<{
  exampleCount: number,
  onExampleCountChange: (nextExampleCount: number) => void,
  onStart: () => void
}> = ({
  exampleCount,
  onExampleCountChange,
  onStart
}) => (
  <div>
    <label>
      {"Число примеров:"}
      <input
        onChange={(e) => {
          const num = Number(e.target.value);
          if (Number.isFinite(num)) {
            let nextExampleCount = num;
            nextExampleCount = Math.min(nextExampleCount, MAX_EXAMPLE_COUNT)
            nextExampleCount = Math.max(nextExampleCount, MIN_EXAMPLE_COUNT)
            onExampleCountChange(nextExampleCount);
          }
        }}
        value={exampleCount}
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
