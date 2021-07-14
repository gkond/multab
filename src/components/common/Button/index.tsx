import React from "react";
import styles from "./styles.module.css";

const audio = new Audio('./click.mp3');

export const Button:React.FunctionComponent<{
  disabled?: boolean,
  text: string,
  onClick: () => void
}> = ({disabled = false, text, onClick}) => (
  <button
    className={styles.button}
    disabled={disabled}
    onClick={() => {
      audio.play();
      onClick();
    }}
    type="button"
  >
    {text}
  </button>
);
