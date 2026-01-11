from pydantic import BaseModel
from typing import Optional
import uuid
from datetime import datetime


class TaskCreate(BaseModel):
    description: str


class TaskRead(BaseModel):
    id: uuid.UUID
    description: str
    is_complete: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True


class TaskUpdate(BaseModel):
    description: Optional[str] = None
    is_complete: Optional[bool] = None
