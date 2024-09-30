from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Define the SQLAlchemy database URL (update with your actual DB credentials)
DATABASE_URL = "mysql+pymysql://root:SqlServer$etup_acc232@localhost:3306/taskapplication"

# Create the engine for connecting to the database
engine = create_engine(DATABASE_URL)

# Session local, which will be used to interact with the database
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create a declarative base class
Base = declarative_base()

# Dependency to get a session for interacting with the database
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
