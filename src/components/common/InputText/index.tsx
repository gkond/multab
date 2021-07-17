import React from "react";
import styles from "./styles.module.css";

export const InputText:React.FunctionComponent<{
  autoFocus?: boolean,
  disabled?: boolean,
  value?: number | string | null,
  maxLength?: number,
  onChange: (value: string) => void
}> = ({
  autoFocus = false,
  disabled = false,
  value,
  maxLength,
  onChange
}) => (
  <input
    autoFocus={autoFocus}
    className={styles.input}
    disabled={disabled}
    onChange={(e) => {
      const value = e.target.value;
      onChange(value);
    }}
    maxLength={maxLength}
    size={maxLength}
    value={value ?? ''}
    type="text"
  />
);


