import { useState } from "react";
import { analyzeVideo } from "../services/api";
import Spinner from "./Spinner";

function UploadForm({ onResult }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleUpload = async () => {
    if (!file) return alert("Select a video");

    setLoading(true);
    try {
      const result = await analyzeVideo(file);
      onResult(result);
    } catch (err) {
      alert("Analysis failed");
    }
    setLoading(false);
  };

  return (
    <div className="upload-container">
      {loading && <Spinner />}
      <input type="file" onChange={handleFileChange} accept="video/*" />
      <button onClick={handleUpload}>
        {loading ? "Analyzing..." : "Analyze Performance"}
      </button>

      {preview && (
        <div className="video-preview">
          <video src={preview} controls width="400" />
        </div>
      )}
    </div>
  );
}

export default UploadForm;