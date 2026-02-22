import React, { useState } from "react";
import ScoreCard from "../components/ScoreCard";

function Dashboard({ sport }) {
  const [file, setFile] = useState(null);

  const dummyData = {
    performance_score: 85,
    pose_detection_accuracy: 90,
    total_frames: 300,
    frames_with_pose: 270,
    tips: ["Lift knees higher", "Avoid locking knees"]
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="content-wrapper">
      {/* Modern File Upload */}
      <div className="upload-container">
        <label className="custom-file-upload">
          {file ? file.name : "Choose Video File"}
          <input type="file" accept="video/*" onChange={handleFileChange} />
        </label>
        <button disabled={!file}>Upload</button>
      </div>

      {/* Video Preview */}
      {file && (
        <div className="video-preview">
          <video controls src={URL.createObjectURL(file)} />
        </div>
      )}

      <ScoreCard data={dummyData} />
    </div>
  );
}

export default Dashboard;