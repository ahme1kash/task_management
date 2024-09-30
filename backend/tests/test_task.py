import pytest
from fastapi.testclient import TestClient
from app.main import app
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.db.database import Base, get_db
from app.models.task import Task

# MySQL database URL for testing
SQLALCHEMY_DATABASE_URL = "mysql+pymysql://root:SqlServer$etup_acc232@localhost:3306/testtaskapplication"

# Create a test engine and session for the database
engine = create_engine(SQLALCHEMY_DATABASE_URL)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Set up test client
client = TestClient(app)

# Dependency override to use the test database
def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

# Test database setup and teardown fixture
@pytest.fixture(scope="module", autouse=True)
def setup_database():
    # Create the test tables
    Base.metadata.create_all(bind=engine)
    yield
    # Drop the test tables
    Base.metadata.drop_all(bind=engine)

# Helper function to create a task for testing
def create_sample_task(title="Sample Task", description="Sample Description"):
    return client.post("/createTask/", json={"title": title, "description": description})

# Test: Creating a new task successfully
def test_create_task():
    response = create_sample_task()
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Sample Task"
    assert data["description"] == "Sample Description"
    assert "task_id" in data

# Test: Retrieving a task by its ID
def test_read_task():
    create_response = create_sample_task()
    task_id = create_response.json()["task_id"]
    
    response = client.get(f"/tasks/{task_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["task_id"] == task_id
    assert data["title"] == "Sample Task"
    assert data["description"] == "Sample Description"

# Test: Retrieving a task by a non-existent ID
def test_read_task_not_found():
    response = client.get("/tasks/9999999")
    assert response.status_code == 404
    assert response.json() == {"detail": "Task not found"}

# Test: Retrieving all tasks
def test_read_all_tasks():
    create_sample_task("Task 1", "Description 1")
    create_sample_task("Task 2", "Description 2")

    response = client.get("/tasks/?skip=0&limit=10")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 2  # At least 2 tasks should be present

    task = data[0]
    assert "task_id" in task
    assert "title" in task
    assert "description" in task

# Test: Updating an existing task successfully
def test_update_task():
    create_response = create_sample_task("Old Title", "Old Description")
    task_id = create_response.json()["task_id"]

    response = client.put(f"/updateTask/{task_id}", json={"title": "New Title", "description": "New Description"})
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "New Title"
    assert data["description"] == "New Description"
    assert data["task_id"] == task_id

# Test: Updating a non-existent task
def test_update_task_not_found():
    response = client.put("/updateTask/9999999", json={"title": "Nonexistent", "description": "Nonexistent"})
    assert response.status_code == 404
    assert response.json() == {"detail": "Task not found"}

# Test: Deleting an existing task
def test_delete_task():
    create_response = create_sample_task()
    task_id = create_response.json()["task_id"]

    response = client.delete(f"/tasks/{task_id}")
    assert response.status_code == 200
    assert response.json() == {"message": "Task deleted successfully"}

    response = client.get(f"/tasks/{task_id}")
    assert response.status_code == 404

# Test: Deleting a non-existent task
def test_delete_task_not_found():
    response = client.delete("/tasks/9999")
    assert response.status_code == 404
    assert response.json() == {"detail": "Task not found"}
