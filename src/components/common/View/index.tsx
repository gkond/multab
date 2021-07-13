import React from "react";
import "./styles.css";

export const View:React.FunctionComponent<{ title: string, content: React.ReactElement }> = ({title, content}) => {
  return (
    <div className="view">
      <h1 className="view_title">
        {title}
      </h1>
      <div>
        {content}
      </div>
    </div>
  );
};
