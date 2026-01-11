from fastapi import FastAPI
from typing import Dict
from fastapi.middleware.cors import CORSMiddleware

from .database import create_db_and_tables
from src.api import auth, tasks

import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# ✅ CORS CONFIG (yeh zaroori hai)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://localhost:3001",
        "http://127.0.0.1:3001",
        "http://127.0.0.1:8001",  # Our API port
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
