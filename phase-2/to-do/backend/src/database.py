from sqlmodel import create_engine, Session, SQLModel
from dotenv import load_dotenv
# src/database.py ke andar
from .db.models import User, Task



import os

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

# For SQLite, we need to handle the URL format properly
# and add check_same_thread=False for SQLModel compatibility
if DATABASE_URL.startswith("sqlite:///"):
    engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
else:
    engine = create_engine(DATABASE_URL)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session
