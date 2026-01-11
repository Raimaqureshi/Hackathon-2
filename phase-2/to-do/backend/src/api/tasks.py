from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session
from ..database import get_session
from src.auth.deps import get_current_user
from src.db.models import User
from src.services.task import TaskService
from .schemas import TaskCreate, TaskRead, TaskUpdate
from typing import List
import uuid

router = APIRouter()


@router.post("/", response_model=TaskRead)
def create_task(
    task: TaskCreate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    task_service = TaskService(session)
    return task_service.create_task(
        description=task.description, user_id=current_user.id
    )


@router.get("/", response_model=List[TaskRead])
def get_tasks(
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    task_service = TaskService(session)
    return task_service.get_tasks_for_user(user_id=current_user.id)


@router.get("/{task_id}", response_model=TaskRead)
def get_task(
    task_id: uuid.UUID,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    task_service = TaskService(session)
    task = task_service.get_task_for_user(task_id=task_id, user_id=current_user.id)
    if not task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    return task


@router.put("/{task_id}", response_model=TaskRead)
def update_task(
    task_id: uuid.UUID,
    task_update: TaskUpdate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    task_service = TaskService(session)
    updated_task = task_service.update_task(
        task_id=task_id,
        description=task_update.description,
        is_complete=task_update.is_complete,
        user_id=current_user.id,
    )
    if not updated_task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    return updated_task


@router.patch("/{task_id}/complete", response_model=TaskRead)
def toggle_task_completion(
    task_id: uuid.UUID,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    task_service = TaskService(session)
    updated_task = task_service.toggle_task_completion(
        task_id=task_id, user_id=current_user.id
    )
    if not updated_task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    return updated_task


@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(
    task_id: uuid.UUID,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    task_service = TaskService(session)
    deleted = task_service.delete_task(task_id=task_id, user_id=current_user.id)
    if not deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
