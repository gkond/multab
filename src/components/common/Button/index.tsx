import React from "react";
import styles from "./styles.module.css";

export const Button:React.FunctionComponent<{
  disabled?: boolean,
  text: string,
  onClick: () => void
}> = ({disabled = false, text, onClick}) => (
  <button
    className={styles.button}
    disabled={disabled}
    onClick={() => {
      const audio = new Audio('./click.mp3');
      audio.play();
      onClick();
    }}
    type="button"
  >
    {text}
  </button>
);
