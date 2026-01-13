# check_db.py
from src.database import DATABASE_URL, engine

print("Using database URL:", DATABASE_URL)
print("Engine URL:", engine.url)
