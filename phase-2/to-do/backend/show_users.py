import os
from dotenv import load_dotenv
from sqlmodel import create_engine, Session, select
from src.db.models import User

# Load environment variables from .env file
load_dotenv()

# Get the database URL from the environment
DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("No DATABASE_URL found in environment variables")

# Create the database engine
engine = create_engine(DATABASE_URL)

def show_users():
    """
    Connects to the database and prints all users.
    """
    with Session(engine) as session:
        statement = select(User)
        users = session.exec(statement).all()
        
        if not users:
            print("No users found in the database.")
            return
            
        print("Users in the database:")
        for user in users:
            print(f"  - ID: {user.id}, Username: {user.username}, Email: {user.email}, Hashed Password: {user.hashed_password}")

if __name__ == "__main__":
    show_users()
