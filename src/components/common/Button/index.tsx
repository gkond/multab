import React from "react";
import "./styles.css";

const audio = new Audio('./sfx/click.mp3');

export const Button:React.FunctionComponent<{
  disabled?: boolean,
  text: string,
  onClick: () => void
}> = ({disabled = false, text, onClick}) => (
  <button
    className="button"
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
