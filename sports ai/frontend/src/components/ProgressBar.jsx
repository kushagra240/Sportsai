import React from "react";
import "../styles/dashboard.css";

function ProgressBar({ score }) {
  return (
    <div className="progress-bar">
      <div
        className="progress-fill"
        style={{ width: `${score}%` }}
      ></div>
    </div>
  );
}

export default ProgressBar;