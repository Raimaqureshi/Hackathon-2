import os
import sys
import traceback
from dotenv import load_dotenv
from sqlmodel import create_engine, SQLModel
import uvicorn
from src.main import app

# Load environment variables from .env file
load_dotenv()

# Get the database URL from the environment
DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("No DATABASE_URL found in environment variables")

# Create the database engine
engine = create_engine(DATABASE_URL)

def create_db_and_tables():
    """Creates the database and all tables defined in the SQLModel metadata."""
    SQLModel.metadata.create_all(engine)

# Create the database and tables before starting the server
create_db_and_tables()

print("Starting server...")

def handle_exception(exc_type, exc_value, exc_traceback):
    if issubclass(exc_type, KeyboardInterrupt):
        sys.__excepthook__(exc_type, exc_value, exc_traceback)
        return
    print("Uncaught exception:")
    traceback.print_exception(exc_type, exc_value, exc_traceback)

sys.excepthook = handle_exception

# Run the FastAPI application using uvicorn
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=False, log_level="debug")