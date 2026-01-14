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
    create_db_and_tables()
    port = int(os.environ.get("PORT", 7860))
    uvicorn.run("src.main:app", host="0.0.0.0", port=port, reload=False)
    print(f"Server is running on https://raima-123-qureshi-to-do-web.hf.space.")