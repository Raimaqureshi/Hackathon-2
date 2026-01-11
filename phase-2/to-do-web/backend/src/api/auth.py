from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session
from ..database import get_session
from src.auth.schemas import UserCreate, UserRead, LoginRequest, Token
from src.services.auth import UserService
from src.auth.security import verify_password
from src.auth.jwt import create_access_token
from datetime import timedelta
import traceback
import logging

router = APIRouter()

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)


@router.post("/signup", response_model=UserRead)
def signup(user: UserCreate, session: Session = Depends(get_session)):
    try:
        logger.debug(f"Signup attempt for email: {user.email}")
        user_service = UserService(session)
        db_user = user_service.get_user_by_email(email=user.email)
        if db_user:
            logger.warning(f"Email already registered: {user.email}")
            raise HTTPException(status_code=400, detail="Email already registered")

        logger.debug(f"Creating new user with email: {user.email}")
        result = user_service.create_user(email=user.email, password=user.password)
        logger.debug(f"User created successfully: {result.id}")
        return result
    except Exception as e:
        logger.error(f"Signup error: {str(e)}")
        logger.error(traceback.format_exc())
        raise HTTPException(status_code=500, detail=f"Signup failed: {str(e)}")


@router.post("/login", response_model=Token)
def login(form_data: LoginRequest, session: Session = Depends(get_session)):
    user_service = UserService(session)
    user = user_service.get_user_by_email(email=form_data.email)
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": str(user.id)}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/logout")
def logout():
    return {"message": "Successfully logged out"}