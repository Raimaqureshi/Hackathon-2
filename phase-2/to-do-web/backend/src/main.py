from fastapi import FastAPI
from typing import Dict
from fastapi.middleware.cors import CORSMiddleware

from .database import create_db_and_tables
from src.api import auth, tasks

import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

@app.get("/")
def root():
    return {"status": "Backend is running 🚀"}

# ✅ CORS CONFIG (yeh zaroori hai)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://hackathon-2-mo1p74szg-raima-qureshi-s-projects.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(tasks.router, prefix="/api/tasks", tags=["tasks"])


@app.on_event("startup")
def on_startup():
    logger.info("Application startup: Creating database tables.")
    create_db_and_tables()


@app.get("/health", response_model=Dict[str, str])
async def health_check():
    return {"status": "ok"}
