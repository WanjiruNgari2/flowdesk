# FlowDesk - Project Management Application
## Table of Contents
    Overview

    Technologies Used

    Project Structure

    Prerequisites

    Installation Guide

    Database Setup

    Backend API Documentation

    Frontend Development

    Testing the Application

    Git Version Control

    Deployment Considerations

    Future Enhancements

    Troubleshooting

## Overview
FlowDesk is a full-stack project management application designed to help teams track clients, tasks, and project progress. The application allows users to create and manage client records, assign tasks with due dates, track task statuses, and monitor overdue items. This project demonstrates proficiency in database design, RESTful API development, and frontend integration.

 It includes comprehensive CRUD operations for both clients and tasks, with relational database constraints ensuring data integrity.

## Technologies Used
    Backend
    Node.js - JavaScript runtime environment
    Express.js - Web application framework for routing and middleware
    PostgreSQL - Relational database management system
    pg - PostgreSQL client for Node.js
    Nodemon - Development tool for automatic server restarts

    Frontend (To Be Developed)
    HTML5 - Markup language for structure
    CSS3 - Styling and responsive design
    JavaScript - Client-side interactivity
    Fetch API - HTTP requests to backend services

    Development Tools
    Postman - API testing and documentation
    Git - Version control system
    GitHub - Remote repository hosting


## Project Structure
The project follows a modular, organized structure that separates concerns and promotes code reusability.

        text
        flowdesk/
        │
        ├── controllers/
        │   ├── clientController.js      # Client-related database operations
        │   └── taskController.js         # Task-related database operations
        │
        ├── routes/
        │   ├── index.js                  # Main router combining all routes
        │   ├── clientRoutes.js           # Client endpoint definitions
        │   └── taskRoutes.js              # Task endpoint definitions
        │
        ├── db/
        │   └── db.js                      # Database connection configuration
        │
        ├── public/
        │   ├── index.html                 # Main frontend entry point
        │   ├── css/
        │   │   └── style.css              # Frontend styling
        │   └── js/
        │       └── app.js                  # Frontend JavaScript logic
        │
        ├── node_modules/                   # Dependencies (ignored by Git)
        ├── .gitignore                       # Git ignore rules
        ├── package.json                     # Project dependencies and scripts
        ├── package-lock.json                 # Locked dependency versions
        ├── plan.md                           # Development planning document
        ├── server.js                         # Main application entry point
        └── README.md                         # Project documentation
## Prerequisites
Before installing and running this application, ensure you have the following installed on your system:

        Node.js (version 14 or higher)
        Download from: https://nodejs.org/
        Verify installation: node --version
        PostgreSQL (version 18 or higher)
        Download from: https://www.postgresql.org/download/windows/
        Verify installation: psql --version
        Git (for version control)
        Download from: https://git-scm.com/download/win
        Verify installation: git --version
        Postman (for API testing)
        Download from: https://www.postman.com/downloads/
        Code Editor (VS Code recommended)
        Download from: https://code.visualstudio.com/

## Installation Guide
Step 1: Clone the Repository
bash
### Clone from GitHub
git clone https://github.com/WanjiruNgari2/flowdesk.git

### Navigate to project directory
cd flowdesk
Step 2: Install Dependencies
bash
### Install all required Node.js packages
npm install
This installs the following dependencies:

express: Web framework
pg: PostgreSQL client
nodemon: Development server with auto-reload

Step 3: Environment Configuration
Create a .env file in the root directory (this file is ignored by Git for security):



## DATABASE SETUP
Step 1: Start PostgreSQL Service
Ensure PostgreSQL is running on your system:

bash
### Check if PostgreSQL service is running
net start postgresql-x64-18
Step 2: Create Database
Connect to PostgreSQL and create the database:

bash
### Connect to default postgres database
psql -U postgres

### Create the flowdesk database
CREATE DATABASE flowdesk;

### Connect to the new database
\c flowdesk;
Step 3: Create Tables
Execute the following SQL commands to create the required tables:

sql
-- Create clients table
        CREATE TABLE clients (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE,
            company VARCHAR(100),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

-- Create tasks table with foreign key constraint
        CREATE TABLE tasks (
            id SERIAL PRIMARY KEY,
            client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            status VARCHAR(50) DEFAULT 'Pending',
            due_date DATE,
            completed_at TIMESTAMP,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

-- Verify tables were created
\dt
Step 4: Verify Database Connection
Test the database connection using the Node.js application:

bash
### Start the server
npm run dev

### In another terminal, test the connection
curl http://localhost:3000/
Expected response: "Project currently running!"


## Backend API Documentation
The backend provides RESTful endpoints for managing clients and tasks. All endpoints return JSON responses.

Base URL:  http://localhost:3000/api
Client Endpoints
### 1. Get All Clients
URL: /api/clients
Method: GET
Description: Retrieves all clients ordered by creation date
Response: Array of client objects
        [
        {
            "id": 1,
            "name": "Acme Corporation",
            "email": "contact@acme.com",
            "company": "Acme Inc",
            "created_at": "2026-02-24T10:30:00.000Z"
        }
        ]


### 2. Get Single Client
URL: /api/clients/:id
Method: GET
Description: Retrieves a specific client by ID
Response: Single client object or 404 error

### 3. Create Client
URL: /api/clients
Method: POST
Description: Creates a new client and automatically generates two default tasks
Request Body:

        {
        "name": "Tech Startup",
        "email": "info@techstartup.com",
        "company": "Tech Startup LLC"
        }
Response: Created client object with success message

### 4. Update Client
URL: /api/clients/:id
Method: PATCH
Description: Updates client information (partial updates supported)
Request Body:

        json
        {
        "name": "Updated Company Name",
        "email": "newemail@company.com"
        }


### 5. Delete Client
URL: /api/clients/:id
Method: DELETE
Description: Removes a client and all associated tasks (cascade delete)
Response: Confirmation message


## Task Endpoints
### 1. Get All Tasks
URL: /api/tasks
Method: GET
Description: Retrieves all tasks with optional status filter
Query Parameters: ?status=Pending or ?status=Completed
Response: Array of task objects with client names

### 2. Get Tasks by Client
URL: /api/tasks/client/:id
Method: GET
Description: Retrieves all tasks for a specific client
Response: Array of task objects

### 3. Create Task
URL: /api/tasks
Method: POST
Description: Creates a new task for an existing client
Request Body:

        json
        {
        "client_id": 1,
        "title": "Design homepage",
        "description": "Create wireframes and mockups",
        "due_date": "2026-03-01"
        }


### 4. Update Task Status
URL: /api/tasks/:id/status
Method: PATCH
Description: Updates task status and automatically sets completion timestamp

Request Body:

        json
        {
        "status": "Completed"
        }


### 5. Get Overdue Tasks
URL: /api/tasks/overdue
Method: GET
Description: Retrieves all incomplete tasks past their due date
Response: Array of overdue task objects

### 6. Delete Task
URL: /api/tasks/:id
Method: DELETE
Description: Removes a specific task
Response: Deleted task object and confirmation



## Default Tasks Generated
When a new client is created, the system automatically generates these two tasks:

    Kickoff Meeting
    Due: 3 days from client creation
    Description: Initial onboarding call with the client
    Requirements Gathering
    Due: 7 days from client creation
    Description: Collect and document project requirements



## FRONTEND DVT