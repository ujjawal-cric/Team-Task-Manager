# Team Task Manager

A full-stack MERN application for managing projects, assigning tasks, tracking progress, and handling role-based access control between Admins and Members.

Built as part of the Ethara.AI Full-Stack Assessment.

---

# Live Demo

## Frontend

https://team-task-manager-production-abe3.up.railway.app

## Backend API

https://team-task-manager-production-300d.up.railway.app

---

# Demo Credentials

## Admin Account

```text id="uhp8sk"
Email: admin@test.com
Password: admin123
```

## Member Account

```text id="i9n5cf"
Email: member@test.com
Password: member123
```

## Admin Registration Secret

Use this secret while registering a new admin account:

```text id="03b7xw"
ujjusec
```

---

# Features

# Authentication System

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Persistent Login State
* Admin Secret Validation

---

# Role-Based Access Control

## Admin

* Create Projects
* Update Projects
* Delete Projects
* Create Tasks
* Assign Tasks
* Delete Tasks
* Manage Team Members

## Member

* View Assigned Tasks
* Update Assigned Task Status
* Track Task Progress

---

# Dashboard Features

* Total Tasks Counter
* Completed Tasks Counter
* Pending Tasks Counter
* In Progress Tasks Counter
* Overdue Tasks Counter
* Total Projects Counter
* Completion Progress Bar
* Recent Tasks Section

---

# Project Management

* Create Projects
* Edit Projects
* Delete Projects
* Assign Team Members
* View Project Members
* View Project Creator

---

# Task Management

* Create Tasks
* Edit Assigned Tasks
* Delete Tasks
* Task Status Tracking
* Task Priority System
* Due Date Management
* Overdue Task Highlighting

---

# Tech Stack

## Frontend

* React.js
* Vite
* Tailwind CSS
* Axios
* React Router DOM
* React Hot Toast
* Lucide React Icons

## Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* bcryptjs
* express-async-handler

## Deployment

* Frontend: Vercel
* Backend: Railway
* Database: MongoDB Atlas

---

# Folder Structure

```bash id="2w5k3n"
project-management-system/
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── routes/
│   │   └── main.jsx
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
│
└── README.md
```

---

# REST API Routes

# Authentication Routes

| Method | Route              | Description      |
| ------ | ------------------ | ---------------- |
| POST   | /api/auth/register | Register User    |
| POST   | /api/auth/login    | Login User       |
| GET    | /api/auth/me       | Get Current User |

---

# Project Routes

| Method | Route             | Description      |
| ------ | ----------------- | ---------------- |
| GET    | /api/projects     | Get All Projects |
| POST   | /api/projects     | Create Project   |
| PUT    | /api/projects/:id | Update Project   |
| DELETE | /api/projects/:id | Delete Project   |

---

# Task Routes

| Method | Route          | Description   |
| ------ | -------------- | ------------- |
| GET    | /api/tasks     | Get All Tasks |
| POST   | /api/tasks     | Create Task   |
| PUT    | /api/tasks/:id | Update Task   |
| DELETE | /api/tasks/:id | Delete Task   |

---

# Environment Variables

## Backend `.env`

```env id="ecjlwm"
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_SECRET=your_admin_secret
```

---

# Installation

## Clone Repository

```bash id="j8r1mp"
git clone https://github.com/your-username/project-management-system.git
```

---

# Backend Setup

```bash id="g8k1wy"
cd server
npm install
npm run dev
```

---

# Frontend Setup

```bash id="y4j0lv"
cd frontend
npm install
npm run dev
```

---

# Deployment

# Backend Deployment (Railway)

1. Push project to GitHub
2. Create Railway Project
3. Select GitHub Repository
4. Set Root Directory = `server`
5. Add Environment Variables
6. Deploy Backend

---

# Frontend Deployment (Vercel)

1. Import GitHub Repository
2. Set Root Directory = `frontend`
3. Add Production API URL
4. Deploy Frontend

---

# Security Features

* JWT Authentication
* Password Hashing using bcrypt
* Protected Backend Routes
* Role-Based Authorization
* Admin Secret Validation
* Task Ownership Validation
* Middleware-Based Access Control

---

# Validation & Error Handling

* Required Field Validation
* Email Format Validation
* Password Length Validation
* Duplicate User Prevention
* Invalid Admin Secret Handling
* API Error Responses
* Loading States & Toast Notifications

---

# Future Improvements

* Real-Time Notifications
* Activity Logs
* Team Chat
* File Upload Support
* Analytics Charts
* Email Notifications
* Search & Filtering
* Pagination
* Dark Mode

---

# Author

Ujjawal

---

# Submission Notes

This project was developed as part of the Ethara.AI Full-Stack Assessment Round 1.

The application demonstrates:

* Full-stack MERN development
* REST API architecture
* Authentication & Authorization
* Role-Based Access Control
* Database Relationships
* Dashboard Analytics
* Responsive UI Design
* Production Deployment
