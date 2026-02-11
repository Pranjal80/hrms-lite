# HRMS Lite - Quick Start Guide

Get HRMS Lite running on your local machine in under 5 minutes!

## ⚡ Prerequisites

- Node.js 18+ ([Download](https://nodejs.org/))
- Python 3.11+ ([Download](https://www.python.org/downloads/))
- Git ([Download](https://git-scm.com/downloads))

## 🚀 Quick Start

### Option 1: Automated Setup (Recommended)

#### For Linux/Mac:
```bash
# Clone the repository
git clone https://github.com/your-username/hrms-lite.git
cd hrms-lite

# Run automated setup script
chmod +x setup.sh
./setup.sh
```

#### For Windows:
```cmd
# Clone the repository
git clone https://github.com/your-username/hrms-lite.git
cd hrms-lite

# Run automated setup script
setup.bat
```

### Option 2: Manual Setup

#### Step 1: Clone Repository
```bash
git clone https://github.com/your-username/hrms-lite.git
cd hrms-lite
```

#### Step 2: Setup Backend (Terminal 1)
```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Linux/Mac:
source venv/bin/activate
# Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Run server
uvicorn main:app --reload --port 8000
```

✅ Backend running at: `http://localhost:8000`  
📚 API Docs at: `http://localhost:8000/docs`

#### Step 3: Setup Frontend (Terminal 2)
```bash
# Open new terminal and navigate to frontend
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev
```

✅ Frontend running at: `http://localhost:3000`

## 🎯 Using the Application

### 1. Add Employees
1. Navigate to "Employees" page
2. Click "Add Employee" button
3. Fill in employee details:
   - Employee ID (e.g., EMP001)
   - Full Name (e.g., John Doe)
   - Email (e.g., john@company.com)
   - Department (e.g., Engineering)
4. Click "Add Employee"

### 2. Mark Attendance
1. Navigate to "Attendance" page
2. Click "Mark Attendance" button
3. Select:
   - Employee from dropdown
   - Date (today or past date)
   - Status (Present or Absent)
4. Click "Mark Attendance"

### 3. View Dashboard
- Navigate to "Dashboard" to see:
  - Total employees
  - Total attendance records
  - Today's present/absent counts

### 4. Filter Attendance
1. Go to "Attendance" page
2. Use filters:
   - Select employee
   - Choose start date
   - Choose end date
3. Click "Apply Filters"

## 📦 Project Structure

```
hrms-lite/
├── backend/          # FastAPI backend
│   ├── main.py      # API routes
│   ├── models.py    # Database models
│   └── schemas.py   # Validation schemas
│
└── frontend/         # React frontend
    └── src/
        ├── pages/   # Dashboard, Employees, Attendance
        ├── components/  # Reusable UI components
        └── api/     # API configuration
```

## 🧪 Testing the Application

### Test Backend API
```bash
# Health check
curl http://localhost:8000/health

# Get all employees
curl http://localhost:8000/api/employees

# View API documentation
# Open browser: http://localhost:8000/docs
```

### Test Frontend
1. Open browser: `http://localhost:3000`
2. Navigate through all pages
3. Try creating an employee
4. Try marking attendance
5. Check if data persists

## 🐛 Common Issues & Solutions

### Backend Issues

**Issue**: `ModuleNotFoundError: No module named 'fastapi'`
```bash
# Solution: Activate venv and reinstall
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
```

**Issue**: `Address already in use` (Port 8000)
```bash
# Solution: Kill process or use different port
# Find process:
lsof -i :8000  # Mac/Linux
netstat -ano | findstr :8000  # Windows

# Use different port:
uvicorn main:app --reload --port 8001
```

**Issue**: Database errors
```bash
# Solution: Delete and recreate database
rm hrms_lite.db
# Restart backend - it will create new database
```

### Frontend Issues

**Issue**: `Cannot find module` errors
```bash
# Solution: Clean install
rm -rf node_modules package-lock.json
npm install
```

**Issue**: `Failed to fetch` / CORS errors
```bash
# Solution: Check backend is running
# Verify backend URL in .env:
# VITE_API_URL=http://localhost:8000
```

**Issue**: Blank page
```bash
# Solution: Check browser console for errors
# Ensure backend is running first
# Clear browser cache
```

## 🔄 Making Changes

### Backend Changes
1. Edit files in `backend/`
2. FastAPI auto-reloads on save
3. Test at `http://localhost:8000/docs`

### Frontend Changes
1. Edit files in `frontend/src/`
2. Vite auto-reloads on save
3. View at `http://localhost:3000`

### Database Changes
```bash
# Delete database and restart
cd backend
rm hrms_lite.db
# Backend creates new database on restart
```

## 🛑 Stopping the Application

### Stop Backend
```bash
# In backend terminal:
Ctrl + C
```

### Stop Frontend
```bash
# In frontend terminal:
Ctrl + C
```

### Deactivate Virtual Environment
```bash
deactivate
```

## 📚 Learn More

### Backend (FastAPI)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [SQLAlchemy ORM](https://docs.sqlalchemy.org/)
- [Pydantic Validation](https://docs.pydantic.dev/)

### Frontend (React)
- [React Documentation](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)

## 🎓 Next Steps

1. **Explore the Code**: Understand the project structure
2. **Add Features**: Try implementing new functionality
3. **Customize**: Modify colors, layouts, add new fields
4. **Deploy**: Follow DEPLOYMENT.md to deploy online
5. **Learn**: Read the technologies' documentation

## 💡 Tips for Development

1. Keep backend terminal open to see API logs
2. Use browser DevTools to debug frontend
3. Test API endpoints using `/docs` interface
4. Use React DevTools extension for component debugging
5. Check console for errors and warnings

## ✅ You're Ready!

Your HRMS Lite application is now running locally. Start by:
1. Adding a few employees
2. Marking their attendance
3. Exploring the dashboard

Happy coding! 🚀

---

Need help? Check:
- README.md - Full documentation
- DEPLOYMENT.md - Deployment guide
- GitHub Issues - Report problems
