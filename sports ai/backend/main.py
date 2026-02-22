from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.analysis import router as analysis_router

app = FastAPI(title="Sports AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analysis_router)