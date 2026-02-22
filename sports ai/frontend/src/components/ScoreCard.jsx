import React from "react";
import ProgressBar from "./ProgressBar"; // make sure you have this component
import "../styles/dashboard.css"; // all CSS here

// Simple predicted score logic
function predictScore(currentScore, tips) {
  // Each tip improves performance by 2 points, max 100
  return Math.min(currentScore + tips.length * 2, 100);
}

function ScoreCard({ data }) {
  const predictedScore = predictScore(data.performance_score, data.tips);

  return (
    <div className="score-card">
      {/* Main Performance */}
      <h2>🏆 Performance Score</h2>
      <div className="score-number">{data.performance_score}</div>
      <ProgressBar score={data.performance_score} />

      {/* Metrics */}
      <div className="metrics">
        <p>Pose Accuracy: {data.pose_detection_accuracy}%</p>
        <p>Total Frames: {data.total_frames}</p>
        <p>Frames With Pose: {data.frames_with_pose}</p>
      </div>

      {/* Tips */}
      {data.tips && data.tips.length > 0 && (
        <div className="tips">
          <h3>Tips to Improve:</h3>
          <ul>
            {data.tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Predicted Score */}
      <div className="predicted">
        <h3>Predicted Score if Tips Followed:</h3>
        <div className="score-number">{predictedScore}</div>
        <ProgressBar score={predictedScore} />
      </div>
    </div>
  );
}

export default ScoreCard;