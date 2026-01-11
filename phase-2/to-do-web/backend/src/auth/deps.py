from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from .jwt import verify_token
from sqlmodel import Session
from ..database import get_session
from src.services.auth import UserService
from src.db.models import User
import uuid

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/login")

def get_current_user(token: str = Depends(oauth2_scheme), session: Session = Depends(get_session)) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    user_id_str = verify_token(token, credentials_exception)
    try:
        user_id = uuid.UUID(user_id_str)
    except ValueError:
        raise credentials_exception

    user_service = UserService(session)
    user = user_service.get_user_by_id(user_id) # This method doesn't exist yet
    if user is None:
        raise credentials_exception
    return user
