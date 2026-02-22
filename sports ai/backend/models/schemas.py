from pydantic import BaseModel
from typing import List

class AnalysisResponse(BaseModel):
    filename: str
    total_frames: int
    pose_frames: int
    pose_detection_accuracy: float
    average_knee_angle: float
    performance_score: int
    tips: List[str]