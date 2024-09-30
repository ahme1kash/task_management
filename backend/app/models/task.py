from sqlalchemy import Column, Integer, String
from app.db.database import Base  # Import the Base class

# Define the Task model that maps to the tasks table in the database
class Task(Base):
    __tablename__ = "tasks"

    task_id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(String(255), nullable=True)

