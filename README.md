# 🚀 FlowDesk - Project Management Application

A **full-stack project management application** designed to help teams efficiently track clients, manage tasks, and monitor project progress. Features real-time task updates, automated default workflows, and comprehensive filtering capabilities.

## 🌐 Live Demo

**https://flowdesk-qexia6st1-damaris-projects-68c92c9e.vercel.app/**

Try it now:
1. Add a new client → automatic default tasks are created
2. View tasks by status (Pending, Completed, Overdue)
3. Filter tasks by date range or client name
4. Track task completion and deadlines
5. Monitor overdue tasks automatically

---

## ✨ Key Features

### 👥 Client Management
- **Create clients** with name, email, and company information
- **Auto-generate default tasks** (Kickoff Meeting & Requirements Gathering) when new clients are added
- **View all clients** with creation timestamps
- **Update client information** (partial updates supported)
- **Delete clients** with cascading task deletion

### ✅ Task Management
- **Create tasks** for specific clients with title, description, and due dates
- **Track task status**: Pending, Completed, or Overdue
- **Auto-calculate overdue tasks** - tasks past their due date appear in overdue section
- **Mark tasks as complete** with automatic completion timestamps
- **Filter tasks** by:
  - Status (Pending/Completed/Overdue)
  - Client name
  - Due date ranges
- **View all overdue tasks** for priority management
- **Delete tasks** individually

### 🎯 Automated Workflows
- **Default Tasks Generated**:
  - *Kickoff Meeting* - Due 3 days from client creation
  - *Requirements Gathering* - Due 7 days from client creation
- **Smart Date Handling** - Automatic EDD calculation and overdue detection
- **Cascading Deletes** - Removing a client removes all associated tasks

### 🎨 User Interface
- **Responsive design** - Works on desktop and tablets
- **Real-time filtering** - Search by date, client name, or task status
- **Clean dashboard** - Easy navigation between clients and tasks
- **Status indicators** - Visual feedback for task completion and overdue items
- **Intuitive controls** - One-click operations for common actions

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|-----------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript (ES6+) |
| **Backend** | Node.js, Express.js |
| **Database** | PostgreSQL (relational DB) |
| **Deployment** | Vercel (Frontend), Custom Backend |
| **API Communication** | RESTful API with Fetch API |
| **Version Control** | Git & GitHub |

---

## 📁 Project Structure

```
flowdesk/
├── controllers/
│   ├── clientController.js      # Client CRUD operations
│   └── taskController.js        # Task CRUD & filtering logic
├── routes/
│   ├── index.js                 # Main router
│   ├── clientRoutes.js          # Client endpoints
│   └── taskRoutes.js            # Task endpoints
├── db/
│   └── db.js                    # PostgreSQL connection configuration
├── public/                      # Frontend (deployed to Vercel)
│   ├── index.html               # Main UI
│   ├── css/
│   │   └── style.css            # Responsive styling
│   └── js/
│       └── app.js               # Client-side logic
├── server.js                    # Express app & server entry point
├── package.json                 # Dependencies & scripts
├── .env.example                 # Environment template
└── README.md                    # Documentation
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- PostgreSQL (v12+)
- Git
- Postman (optional, for API testing)

### 🔧 Local Installation

**1. Clone & Setup**
```bash
git clone https://github.com/WanjiruNgari2/flowdesk.git
cd flowdesk
npm install
```

**2. Database Setup**
```bash
# Start PostgreSQL and create database
createdb flowdesk

# Or via psql:
psql -U postgres
CREATE DATABASE flowdesk;
\c flowdesk;
```

**3. Create Tables**
```sql
-- Clients table
CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    company VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tasks table with foreign key constraint
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
```

**4. Environment Configuration**
```bash
cp .env.example .env
# Edit .env with your database credentials:
# DATABASE_URL=postgresql://user:password@localhost:5432/flowdesk
```

**5. Start Development Server**
```bash
npm run dev
# Server runs at http://localhost:3000
```

---

## 📡 API Endpoints

**Base URL**: `http://localhost:3000/api`

### Client Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/clients` | Get all clients (sorted by creation date) |
| GET | `/clients/:id` | Get single client by ID |
| POST | `/clients` | Create new client (auto-generates default tasks) |
| PATCH | `/clients/:id` | Update client info |
| DELETE | `/clients/:id` | Delete client & cascade delete tasks |

**Example: Create a Client**
```bash
POST /api/clients
Content-Type: application/json

{
  "name": "Tech Startup Inc",
  "email": "hello@techstartup.com",
  "company": "Tech Startup LLC"
}
```

**Response** (201 Created):
```json
{
  "id": 1,
  "name": "Tech Startup Inc",
  "email": "hello@techstartup.com",
  "company": "Tech Startup LLC",
  "created_at": "2026-05-11T10:30:00.000Z",
  "message": "Client created! Default tasks generated."
}
```

### Task Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks` | Get all tasks |
| GET | `/tasks/:id` | Get single task |
| GET | `/tasks/client/:id` | Get all tasks for a client |
| GET | `/tasks/overdue` | Get overdue tasks (past due date) |
| POST | `/tasks` | Create new task |
| PATCH | `/tasks/:id/status` | Update task status & set completion timestamp |
| DELETE | `/tasks/:id` | Delete task |

**Example: Get Overdue Tasks**
```bash
GET /api/tasks/overdue
```

**Response**:
```json
[
  {
    "id": 2,
    "client_id": 1,
    "title": "Design Homepage",
    "status": "Pending",
    "due_date": "2026-04-15",
    "created_at": "2026-05-01T00:00:00.000Z",
    "client_name": "Tech Startup Inc"
  }
]
```

**Example: Mark Task Complete**
```bash
PATCH /api/tasks/2/status
Content-Type: application/json

{
  "status": "Completed"
}
```

---

## 🎯 How It Works

### Workflow Example

1. **User adds a client** → "Acme Corp"
   - Client record created in database
   - System automatically creates 2 default tasks:
     - "Kickoff Meeting" (due in 3 days)
     - "Requirements Gathering" (due in 7 days)

2. **User adds additional tasks** → "Design Mockups" (due 2026-06-01)
   - Task linked to client via `client_id`
   - Task saved with status "Pending"

3. **User filters tasks**
   - By status: See all "Pending" tasks
   - By client: See all tasks for "Acme Corp"
   - By date: See tasks due in next week
   - By overdue: Automatically shows tasks past due date

4. **User marks task complete**
   - Status changes to "Completed"
   - `completed_at` timestamp is set automatically
   - Task no longer appears in "Pending" or "Overdue" sections

---

## 🧪 Testing the Application

### Manual Testing (UI)
1. Open: https://flowdesk-qexia6st1-damaris-projects-68c92c9e.vercel.app/
2. Add a new client
3. Verify default tasks appear
4. Create additional tasks with different due dates
5. Filter by status, date range, or client name
6. Mark tasks as complete
7. Check overdue section

### API Testing (Postman)
```bash
# Get all clients
GET http://localhost:3000/api/clients

# Create a task
POST http://localhost:3000/api/tasks
Body: {
  "client_id": 1,
  "title": "Deploy to Production",
  "description": "Push latest changes to live server",
  "due_date": "2026-06-15"
}

# Get overdue tasks
GET http://localhost:3000/api/tasks/overdue
```

---

## 💡 Key Features Demonstrated

### Backend Skills
✅ **RESTful API Design** - Proper HTTP methods and status codes  
✅ **Database Modeling** - Relational schema with foreign keys & cascading deletes  
✅ **Business Logic** - Auto-generate tasks, calculate overdue items  
✅ **Error Handling** - Graceful error messages  
✅ **CORS & Middleware** - Proper request handling  
✅ **Environment Management** - Secure .env configuration  

### Frontend Skills
✅ **DOM Manipulation** - Dynamic task/client rendering  
✅ **Async Operations** - Fetch API for server communication  
✅ **State Management** - Track clients, tasks, filters locally  
✅ **Event Handling** - Buttons, forms, filters  
✅ **Responsive Design** - Works on different screen sizes  
✅ **User Experience** - Intuitive filtering & searching  

### DevOps/Deployment
✅ **Live Deployment** - Frontend on Vercel  
✅ **Environment Configuration** - .env files for security  
✅ **Version Control** - Git commits & GitHub repo  
✅ **API Integration** - Frontend ↔ Backend communication  

---

## 🔄 Default Tasks Explained

When a client is created, the system automatically generates two kickoff tasks:

| Task | Due Date | Purpose |
|------|----------|---------|
| **Kickoff Meeting** | +3 days | Initial onboarding call with client |
| **Requirements Gathering** | +7 days | Document and collect project requirements |

This saves time and ensures no client is missed!

---

## 📈 What's Working

- ✅ Full CRUD operations for clients and tasks
- ✅ Automatic task generation on client creation
- ✅ Overdue task detection and filtering
- ✅ Status tracking (Pending → Completed)
- ✅ Cascading deletes (remove client = remove tasks)
- ✅ Responsive UI
- ✅ Live deployment
- ✅ Real-time filtering and search
- ✅ Date-based task management

---

## 🚀 Future Enhancements

- Add user authentication (login/signup)
- Real-time notifications when tasks are overdue
- Task priority levels (High, Medium, Low)
- Task assignment to team members
- Comments/notes on tasks
- File attachments to tasks
- Calendar view
- Email reminders before due dates
- Task templates for recurring projects
- Analytics dashboard

---

## 🛠️ Technologies Used

**Frontend**
- HTML5 - Semantic markup
- CSS3 - Responsive design, Flexbox
- Vanilla JavaScript (ES6+) - No framework, pure JS
- Fetch API - Async HTTP requests

**Backend**
- Node.js - JavaScript runtime
- Express.js - Web framework
- PostgreSQL - Relational database
- CORS - Cross-origin requests
- Dotenv - Environment variables

**DevOps**
- Vercel - Frontend hosting
- Git - Version control
- GitHub - Repository hosting

---

## 📝 Learning Outcomes

Through building FlowDesk, I learned:

✅ **REST API Architecture** - Designing logical, scalable endpoints  
✅ **Database Design** - Relationships, constraints, cascading operations  
✅ **Frontend-Backend Communication** - Async operations & error handling  
✅ **Business Logic Implementation** - Auto-generation, calculated fields  
✅ **Deployment Workflow** - Getting projects from localhost to production  
✅ **Problem Solving** - Debugging across full stack  
✅ **Git & Collaboration** - Version control best practices  
✅ **User Experience** - Building intuitive interfaces  

---

## 🤝 Contributing

This is a personal portfolio project. However, if you'd like to:
- Report bugs
- Suggest improvements
- Ask questions about the code

Feel free to open an issue on GitHub!

---

## 📄 License

MIT License - Feel free to use this project as a reference

---

## 👨‍💻 Author

**Damaris Ngari**

Built with ❤️ as a full-stack learning project demonstrating backend API design, database management, and complete deployment workflow.

---

## 📞 Questions?

If you have questions about how FlowDesk works:
1. Check the API Endpoints section
2. Try the live demo
3. Review the code structure
4. Email: wanjirungari2@gmail.com

---

**Status**: ✅ Production Ready | 📱 Fully Responsive | 🌐 Live Demo Available
