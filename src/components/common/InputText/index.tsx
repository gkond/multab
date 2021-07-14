import React from "react";
import styles from "./styles.module.css";

export const InputText:React.FunctionComponent<{
  disabled?: boolean,
  value?: number | string | null,
  maxLength?: number,
  onChange: (value: string) => void
}> = ({
  disabled = false,
  value,
  maxLength,
  onChange
}) => (
  <input
    className={styles.input}
    disabled={disabled}
    onChange={(e) => {
      const value = e.target.value;
      onChange(value);
    }}
    maxLength={maxLength}
    value={value ?? ''}
    type="text"
  />
);


