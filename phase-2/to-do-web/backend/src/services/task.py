from sqlmodel import Session, select
from src.db.models import Task, User
from typing import List, Optional
import uuid


class TaskService:
    def __init__(self, session: Session):
        self.session = session

    def create_task(self, description: str, user_id: uuid.UUID) -> Task:
        db_task = Task(description=description, user_id=user_id)
        self.session.add(db_task)
        self.session.commit()
        self.session.refresh(db_task)
        return db_task

    def get_tasks_for_user(self, user_id: uuid.UUID) -> List[Task]:
        statement = select(Task).where(Task.user_id == user_id)
        return self.session.exec(statement).all()

    def get_task_for_user(
        self, task_id: uuid.UUID, user_id: uuid.UUID
    ) -> Optional[Task]:
        statement = (
            select(Task).where(Task.id == task_id).where(Task.user_id == user_id)
        )
        return self.session.exec(statement).first()

    def update_task(
        self, task_id: uuid.UUID, description: str, is_complete: bool, user_id: uuid.UUID
    ) -> Optional[Task]:
        task = self.get_task_for_user(task_id, user_id)
        if task:
            if description is not None:
                task.description = description
            if is_complete is not None:
                task.is_complete = is_complete
            self.session.add(task)
            self.session.commit()
            self.session.refresh(task)
        return task

    def delete_task(self, task_id: uuid.UUID, user_id: uuid.UUID) -> bool:
        task = self.get_task_for_user(task_id, user_id)
        if task:
            self.session.delete(task)
            self.session.commit()
            return True
        return False
        
    def toggle_task_completion(self, task_id: uuid.UUID, user_id: uuid.UUID) -> Optional[Task]:
        task = self.get_task_for_user(task_id, user_id)
        if task:
            task.is_complete = not task.is_complete
            self.session.add(task)
            self.session.commit()
            self.session.refresh(task)
        return task
