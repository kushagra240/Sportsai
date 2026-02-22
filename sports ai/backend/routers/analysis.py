from fastapi import APIRouter, UploadFile, File
from models.schemas import AnalysisResponse
from services.pose_service import analyze_video

router = APIRouter()


@router.post("/upload", response_model=AnalysisResponse)
async def upload_video(file: UploadFile = File(...)):
    result = analyze_video(file)

    if result is None:
        return {"error": "Video processing failed"}

    return result