from sqlmodel import Session
from src.db.models import User
from src.auth.security import get_password_hash
from typing import Optional
import uuid


class UserService:
    def __init__(self, session: Session):
        self.session = session

    def create_user(self, email: str, password: str) -> User:
        hashed_password = get_password_hash(password)
        db_user = User(email=email, hashed_password=hashed_password)
        self.session.add(db_user)
        self.session.commit()
        self.session.refresh(db_user)
        return db_user

    def get_user_by_email(self, email: str) -> Optional[User]:
        return self.session.query(User).filter(User.email == email).first()

    def get_user_by_id(self, user_id: uuid.UUID) -> Optional[User]:
        return self.session.get(User, user_id)
