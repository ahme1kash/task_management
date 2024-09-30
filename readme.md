# Task Management Web Application Documentation

## Table of Contents
- [Problem Statement](#problem-statement)
- [Solution Overview](#solution-overview)
- [Technologies and Libraries Used](#technologies-and-libraries-used)
- [Running the Project](#running-the-project)
  - [Setup and Installation](#setup-and-installation)
  - [Running the API](#running-the-api)
  - [Testing the APIs](#testing-the-apis)
  - [Running the Client App](#running-the-client-app)
- [API Endpoints](#api-endpoints)
  - [Create a Task](#create-a-task)
  - [Retrieve a Task by ID](#retrieve-a-task-by-id)
  - [Retrieve All Tasks](#retrieve-all-tasks)
  - [Update a Task](#update-a-task)
  - [Delete a Task](#delete-a-task)
- [API Testcases](#api-testcases)
    

---

## Problem Statement

The goal of this project is to create a task management web application that allows users to manage tasks efficiently through a RESTful API. The system should support the following core functionalities:

1. **Create/Add a new task**: Add a new task with a title and description.
2. **Retrieve a task by its ID**: Get details of a specific task using its unique identifier.
3. **Retrieve a list of all tasks**: Fetch a list of all tasks stored in the system.
4. **Update an existing task**: Modify the details of an existing task.
5. **Delete a task by its ID**: Remove a task from the system.

---

## Solution Overview

This project is a **web application** with the following architecture:

1. **Backend**: Built using Python's FastAPI to provide RESTful API services for task management, including full CRUD operations (Create, Read, Update, Delete).
2. **Frontend**: A basic web page using **ReactJS** to interface with the API.
3. **Database**: MySQL is used as the relational database to store tasks.

The backend service includes proper error handling, input validation, and documentation through FastAPI's built-in **Swagger UI**. The application supports API testing and includes unit tests to ensure reliability.

---

## Technologies and Libraries Used

1. **FastAPI**: A modern, fast (high-performance) web framework for building APIs with Python.
2. **ReactJS**: A JavaScript library for building user interfaces.
3. **SQLAlchemy**: SQL toolkit and Object-Relational Mapping (ORM) library for Python.
4. **MySQL**: Relational database used to store task data.
5. **Pydantic**: Data validation and settings management using Python type annotations.
6. **PyTest**: Testing framework used to create unit tests for the application.
7. **Uvicorn**: ASGI server implementation used for running FastAPI.
8. **Axios**: Third Party Library for creating HTTP requests.
9. **React Hot Toast** : Toast Notifications on UI as per the results of the HTTP Actions Performed.
10. **React-Icons** : React's Icon Library.

---

## Running the Project

### Setup and Installation

#### 1. Clone the Project Repository:
```bash
git clone <repository-url>
cd <project-directory>
```

#### 2. Set Up a MySQL Database:
Ensure you have MySQL installed and create a database for this project:
```sql
CREATE DATABASE taskapplication;
```

#### 3. Install Dependencies:
Create a virtual environment and install the required Python packages.
```bash
python3 -m venv venv
source venv/bin/activate  # For Linux/macOS
venv\Scripts\activate  # For Windows
pip install -r requirements.txt
```

#### 4. Configure the Database Connection:
In `app/db/database.py`, update the `DATABASE_URL` with your MySQL credentials:
```python
DATABASE_URL = "mysql+pymysql://<username>:<password>@localhost:3306/taskapplication"
```

#### 5. Initialize the Database Tables:
Run the script to create the necessary tables in the database:
```bash
cd backend
python create_table.py
```

### Running the API

#### 1. Start the FastAPI Application:
```bash
cd backend
uvicorn app.main:app --reload
```

FastAPI will run on `http://127.0.0.1:8000/` by default. You can visit `http://127.0.0.1:8000/docs` to explore the **Swagger UI** for the API.

### Testing the APIs

Unit tests are provided to validate the API functionality. To run the tests, make sure you've set up a separate testing database and run the tests using:
```bash
pytest
```

### Running the Client App

#### 1. Start the ReactJS Application:
```bash
cd frontend
npm run dev
```

React will run on `http://127.0.0.1:5173/` by default.

---

## API Endpoints

### Create a Task

- **Method**: `POST`
- **Endpoint**: `/tasks/`
- **Request Body**:
  ```json
  {
    "title": "Task Title",
    "description": "Task Description"
  }
  ```
- **Response**:
  ```json
  {
    "task_id": 1,
    "title": "Task Title",
    "description": "Task Description"
  }
  ```

### Retrieve a Task by ID

- **Method**: `GET`
- **Endpoint**: `/tasks/{task_id}`
- **Response**:
  ```json
  {
    "task_id": 1,
    "title": "Task Title",
    "description": "Task Description"
  }
  ```

### Retrieve All Tasks

- **Method**: `GET`
- **Endpoint**: `/tasks/`
- **Query Parameters**: 
  - `skip` (default = 0): Number of records to skip.
  - `limit` (default = 10): Number of records to retrieve.
- **Response**:
  ```json
  [
    {
      "task_id": 1,
      "title": "Task 1",
      "description": "Description 1"
    },
    {
      "task_id": 2,
      "title": "Task 2",
      "description": "Description 2"
    }
  ]
  ```

### Update a Task

- **Method**: `PUT`
- **Endpoint**: `/tasks/{task_id}`
- **Request Body**:
  ```json
  {
    "title": "Updated Title",
    "description": "Updated Description"
  }
  ```
- **Response**:
  ```json
  {
    "task_id": 1,
    "title": "Updated Title",
    "description": "Updated Description"
  }
  ```

### Delete a Task

- **Method**: `DELETE`
- **Endpoint**: `/tasks/{task_id}`
- **Response**:
  ```json
  {
    "message": "Task deleted successfully"
  }
  ```

---

## API Testcases

To ensure the API functionality, unit tests are implemented in `tests/test_task.py`. These tests check the following functionalities:

1. Creating a new task
2. Retrieving a task by its ID
3. Retrieving all tasks
4. Updating an existing task
5. Deleting a task

Run the tests using `pytest` as described earlier to verify the application's functionality.
