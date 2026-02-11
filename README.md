# HRMS Lite - Human Resource Management System

A lightweight, full-stack web application for managing employee records and tracking daily attendance. Built with modern technologies and designed for production deployment.

![HRMS Lite](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## 🚀 Live Demo

- **Frontend URL**: [Your Vercel URL]
- **Backend API**: [Your Railway/Render URL]
- **API Documentation**: [Your Backend URL]/docs

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Screenshots](#screenshots)
- [Assumptions & Limitations](#assumptions--limitations)

## 📖 Overview

HRMS Lite is a lightweight Human Resource Management System that allows administrators to efficiently manage employee records and track daily attendance. The application features a clean, professional interface with real-time updates and comprehensive data management capabilities.

## ✨ Features

### Employee Management
- ✅ Add new employees with unique IDs
- ✅ View all employees in a card-based grid layout
- ✅ Delete employees (with cascade deletion of attendance records)
- ✅ Validation for duplicate employee IDs and emails
- ✅ Professional employee cards with department information

### Attendance Management
- ✅ Mark daily attendance (Present/Absent)
- ✅ View all attendance records in a table format
- ✅ Filter attendance by employee, date range
- ✅ Automatic date validation (cannot mark future dates)
- ✅ Update attendance if already marked for the same date

### Dashboard
- ✅ Real-time statistics overview
- ✅ Total employees count
- ✅ Total attendance records
- ✅ Today's present/absent counts
- ✅ Visual stat cards with icons

### UI/UX Features
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Loading states for all async operations
- ✅ Empty states with helpful messages
- ✅ Error handling with user-friendly messages
- ✅ Confirmation dialogs for destructive actions
- ✅ Form validation with real-time feedback
- ✅ Modal-based forms for better UX

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18.2
- **Build Tool**: Vite 5.0
- **Routing**: React Router v6
- **Styling**: TailwindCSS 3.4
- **HTTP Client**: Axios 1.6
- **Date Handling**: date-fns 3.0
- **Icons**: lucide-react 0.303

### Backend
- **Framework**: FastAPI 0.109
- **Server**: Uvicorn
- **ORM**: SQLAlchemy 2.0
- **Validation**: Pydantic 2.5
- **Database**: PostgreSQL (Production) / SQLite (Development)
- **Migrations**: Alembic 1.13

### Deployment
- **Frontend**: Vercel
- **Backend**: Railway / Render
- **Database**: Railway PostgreSQL / Render PostgreSQL

## 📁 Project Structure

```
hrms-lite/
├── backend/
│   ├── main.py              # FastAPI application & routes
│   ├── models.py            # SQLAlchemy database models
│   ├── schemas.py           # Pydantic schemas for validation
│   ├── database.py          # Database configuration
│   ├── requirements.txt     # Python dependencies
│   ├── Procfile            # Deployment configuration
│   ├── .env.example        # Environment variables template
│   └── .gitignore
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── config.js   # API configuration & endpoints
│   │   ├── components/
│   │   │   ├── Layout.jsx  # Main layout with navigation
│   │   │   ├── Loading.jsx # Loading spinner component
│   │   │   ├── EmptyState.jsx
│   │   │   ├── ErrorState.jsx
│   │   │   └── Modal.jsx   # Reusable modal component
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Employees.jsx
│   │   │   └── Attendance.jsx
│   │   ├── App.jsx         # Main app component
│   │   ├── main.jsx        # Entry point
│   │   └── index.css       # TailwindCSS styles
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── .env.example
│   └── .gitignore
│
└── README.md
```

## 💻 Installation & Setup

### Prerequisites
- Node.js 18+ and npm/yarn
- Python 3.11+
- PostgreSQL (for production) or SQLite (for development)

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your database URL
   ```

5. **Run the server**
   ```bash
   uvicorn main:app --reload --port 8000
   ```

   The API will be available at `http://localhost:8000`
   API docs at `http://localhost:8000/docs`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your backend API URL
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:3000`

## 📚 API Documentation

### Base URL
```
Production: https://your-backend-url.com
Development: http://localhost:8000
```

### Endpoints

#### Employees

**GET /api/employees**
- Get all employees
- Response: Array of employee objects

**POST /api/employees**
- Create new employee
- Body:
  ```json
  {
    "employee_id": "EMP001",
    "full_name": "John Doe",
    "email": "john@company.com",
    "department": "Engineering"
  }
  ```

**GET /api/employees/{id}**
- Get employee by ID with attendance records

**DELETE /api/employees/{id}**
- Delete employee (cascades to attendance records)

#### Attendance

**GET /api/attendance**
- Get all attendance records
- Query params: `employee_id`, `start_date`, `end_date`

**POST /api/attendance**
- Mark attendance
- Body:
  ```json
  {
    "employee_id": 1,
    "date": "2026-02-11",
    "status": "Present"
  }
  ```

**GET /api/employees/{id}/attendance**
- Get attendance for specific employee

#### Dashboard

**GET /api/dashboard**
- Get dashboard summary statistics

For complete API documentation, visit `/docs` endpoint on your backend server.

## 🚀 Deployment

### Backend Deployment (Railway)

1. **Create Railway account** at [railway.app](https://railway.app)

2. **Create new project**
   - New Project → Deploy from GitHub
   - Select your repository
   - Select backend directory

3. **Add PostgreSQL database**
   - Add service → PostgreSQL
   - Railway automatically provides `DATABASE_URL`

4. **Deploy**
   - Railway auto-deploys from main branch
   - Get your backend URL from deployment

### Backend Deployment (Render)

1. **Create Render account** at [render.com](https://render.com)

2. **Create PostgreSQL database**
   - New → PostgreSQL
   - Copy the Internal Database URL

3. **Create Web Service**
   - New → Web Service
   - Connect your GitHub repository
   - Settings:
     - Root Directory: `backend`
     - Build Command: `pip install -r requirements.txt`
     - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - Environment Variables:
     - `DATABASE_URL`: Your PostgreSQL URL
     - `PYTHON_VERSION`: `3.11.0`

### Frontend Deployment (Vercel)

1. **Create Vercel account** at [vercel.com](https://vercel.com)

2. **Import project**
   - New Project → Import from Git
   - Select your repository

3. **Configure**
   - Root Directory: `frontend`
   - Framework Preset: Vite
   - Environment Variables:
     - `VITE_API_URL`: Your backend URL

4. **Deploy**
   - Vercel auto-deploys on push to main

## 📸 Screenshots

### Dashboard
![Dashboard](screenshots/dashboard.png)

### Employee Management
![Employees](screenshots/employees.png)

### Attendance Tracking
![Attendance](screenshots/attendance.png)

## 🔒 Assumptions & Limitations

### Assumptions
- Single admin user (no authentication required)
- Employee IDs are unique strings
- Attendance can be marked for current and past dates only
- One attendance record per employee per day
- Deleting an employee cascades to all their attendance records

### Limitations
- No authentication/authorization system
- No role-based access control
- No leave management features
- No payroll integration
- No file upload for employee documents
- No email notifications
- No audit logs
- No data export functionality

### Future Enhancements
- User authentication and role management
- Leave management system
- Payroll integration
- Employee performance tracking
- Document management
- Email notifications
- Advanced reporting and analytics
- Mobile application
- Multi-tenant support

## 🤝 Contributing

This is an assignment project. For production use, consider implementing:
- Authentication (JWT/OAuth)
- Role-based access control
- Input sanitization
- Rate limiting
- Comprehensive testing
- Logging and monitoring
- Data backup strategies

## 📄 License

MIT License - feel free to use this project for learning purposes.

## 👨‍💻 Developer

**Your Name**
- GitHub: [@your-github](https://github.com/your-github)
- Email: your.email@example.com

## 🙏 Acknowledgments

- FastAPI documentation
- React documentation
- TailwindCSS for styling
- Lucide React for icons

---

**Note**: This project was built as a full-stack coding assignment to demonstrate end-to-end development capabilities including frontend, backend, database design, and deployment.
