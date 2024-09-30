from app.db.database import engine, Base
from app.models.task import Task

# Create the database tables
Base.metadata.create_all(bind=engine)

