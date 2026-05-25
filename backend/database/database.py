from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker

# PostgreSQL URL
DATABASE_URL = (
    "postgresql://postgres:postgres123@localhost:5432/expense_ai"
)

# Create Engine
engine = create_engine(
    DATABASE_URL
)

# Session
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# Base
Base = declarative_base()

# Dependency
def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()