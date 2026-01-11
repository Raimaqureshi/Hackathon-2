from pydantic import BaseModel, EmailStr, constr
from uuid import UUID

class UserCreate(BaseModel):
    email: EmailStr
    password: constr(min_length=8, max_length=72)

class UserRead(BaseModel):
    id: UUID
    email: EmailStr

    class Config:
        from_attributes = True

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
