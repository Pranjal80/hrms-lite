from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine
from models import Base
import models
from routes import employees
from routes import attendance
from routes import dashboard

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(employees.router, prefix="/api/employees", tags=["Employees"])
app.include_router(attendance.router)
app.include_router(dashboard.router)


@app.get("/")
def root():
    return {"message": "HRMS Lite API running"}
