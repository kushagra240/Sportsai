import cv2
import numpy as np
from ultralytics import YOLO
import os
import shutil

model = YOLO("yolov8n-pose.pt")

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


def calculate_angle(a, b, c):
    a = np.array(a)
    b = np.array(b)
    c = np.array(c)

    ba = a - b
    bc = c - b

    cosine_angle = np.dot(ba, bc) / (np.linalg.norm(ba) * np.linalg.norm(bc))
    angle = np.degrees(np.arccos(np.clip(cosine_angle, -1.0, 1.0)))

    return float(angle)


def analyze_video(file):

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    cap = cv2.VideoCapture(file_path)

    total_frames = 0
    pose_frames = 0
    knee_angles = []

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        total_frames += 1
        results = model(frame)

        if results[0].keypoints is not None:
            keypoints = results[0].keypoints.xy.cpu().numpy()

            if len(keypoints) > 0:
                pose_frames += 1
                try:
                    hip = keypoints[0][12]
                    knee = keypoints[0][14]
                    ankle = keypoints[0][16]

                    angle = calculate_angle(hip, knee, ankle)
                    knee_angles.append(angle)
                except:
                    pass

    cap.release()

    if total_frames == 0:
        return None

    pose_accuracy = (pose_frames / total_frames) * 100
    avg_knee_angle = float(np.mean(knee_angles)) if knee_angles else 0.0

    performance_score = int(
        max(0, min(100, 100 - abs(avg_knee_angle - 160)))
    )

    if avg_knee_angle < 150:
        tip = "Lift your knees higher for stronger stride"
    elif avg_knee_angle > 175:
        tip = "Avoid locking your knees while running"
    else:
        tip = "Good running posture"

    return {
        "filename": file.filename,
        "total_frames": int(total_frames),
        "pose_frames": int(pose_frames),
        "pose_detection_accuracy": round(pose_accuracy, 2),
        "average_knee_angle": round(avg_knee_angle, 2),
        "performance_score": performance_score,
        "tips": [tip]
    }