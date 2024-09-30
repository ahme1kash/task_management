from pydantic import BaseModel

class TaskBase(BaseModel):
    title: str
    description: str | None = None

class TaskCreate(TaskBase):
    pass

class Task(TaskBase):
    task_id: int

    class Config:
        orm_mode = True  # This allows FastAPI to read ORM models and convert to response objects

