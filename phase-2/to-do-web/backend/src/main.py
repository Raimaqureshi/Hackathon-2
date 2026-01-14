from fastapi import FastAPI, Request
from typing import Dict
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address

from .database import create_db_and_tables
from src.api import auth, tasks
from src.exceptions import UnauthorizedException, ForbiddenException, NotFoundException, ValidationException, InternalServerErrorException

import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize rate limiter
limiter = Limiter(key_func=get_remote_address)

app = FastAPI()
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
app.router.redirect_slashes = False

@app.get("/")
def root():
    return {"status": "Backend is running 🚀"}

# ✅ CORS CONFIG (yeh zaroori hai)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://hackathon-2-mo1p74szg-raima-qureshi-s-projects.vercel.app",
        "https://raima-123-qureshi-to-do-fullstack.hf.space",
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:8000",
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
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
    return {"status": "healthy"}

@app.get("/ready", response_model=Dict[str, str])
async def readiness_check():
    # Add any additional checks here to determine if the app is ready to serve traffic
    return {"status": "ready"}


# Global exception handlers
@app.exception_handler(UnauthorizedException)
async def unauthorized_exception_handler(request: Request, exc: UnauthorizedException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail}
    )


@app.exception_handler(ForbiddenException)
async def forbidden_exception_handler(request: Request, exc: ForbiddenException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail}
    )


@app.exception_handler(NotFoundException)
async def not_found_exception_handler(request: Request, exc: NotFoundException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail}
    )


@app.exception_handler(ValidationException)
async def validation_exception_handler(request: Request, exc: ValidationException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail}
    )


@app.exception_handler(InternalServerErrorException)
async def internal_server_error_exception_handler(request: Request, exc: InternalServerErrorException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail}
    )
