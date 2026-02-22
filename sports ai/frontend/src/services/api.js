const API_BASE = "http://127.0.0.1:8000";

export async function analyzeVideo(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to analyze video");
  }

  return await response.json();
}