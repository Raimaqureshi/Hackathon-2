import os
from dotenv import load_dotenv
from sqlmodel import create_engine, SQLModel
import uvicorn

# Load environment variables from .env file
load_dotenv()

# Get the database URL from the environment
DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("No DATABASE_URL found in environment variables")

# Create the database engine
engine = create_engine(DATABASE_URL)

def create_db_and_tables():
    """
    Creates the database and all tables defined in the SQLModel metadata.
    """
    SQLModel.metadata.create_all(engine)

if __name__ == "__main__":
    # Create the database and tables before starting the server
    create_db_and_tables()

    # Run the FastAPI application using uvicorn
    # The app is defined in src/main.py as "app"
    # Disable reload for production/stable testing
    # Use port 8001 to avoid conflicts
    uvicorn.run("src.main:app", host="0.0.0.0", port=8001, reload=False)