import React from "react";
import styles from "./styles.module.css";

export const View:React.FunctionComponent<{
  title: string,
  content: React.ReactElement
}> = ({title, content}) => {
  return (
    <div className={styles.view}>
      <h1 className={styles.view_title}>
        {title}
      </h1>
      <div>
        {content}
      </div>
    </div>
  );
};
