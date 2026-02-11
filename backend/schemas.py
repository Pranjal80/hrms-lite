from pydantic import BaseModel, EmailStr, Field, validator
from datetime import date
from typing import Optional, List
from enum import Enum


# -------------------------
# ENUMS
# -------------------------

class AttendanceStatus(str, Enum):
    PRESENT = "Present"
    ABSENT = "Absent"


# -------------------------
# EMPLOYEE SCHEMAS
# -------------------------

class EmployeeBase(BaseModel):
    employee_id: str = Field(..., min_length=1, max_length=50)
    full_name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    department: str = Field(..., min_length=1, max_length=50)


class EmployeeCreate(EmployeeBase):

    @validator('employee_id', 'full_name', 'department')
    def validate_not_empty(cls, v):
        if not v or not v.strip():
            raise ValueError('Field cannot be empty or whitespace')
        return v.strip()

    @validator('email')
    def validate_email(cls, v):
        if not v or not v.strip():
            raise ValueError('Email cannot be empty')
        return v.strip().lower()


class EmployeeResponse(EmployeeBase):
    id: int

    class Config:
        orm_mode = True


class EmployeeWithAttendance(EmployeeResponse):
    total_present_days: Optional[int] = 0
    attendance_records: List["AttendanceResponse"] = []

    class Config:
        orm_mode = True


# -------------------------
# ATTENDANCE SCHEMAS
# -------------------------

class AttendanceBase(BaseModel):
    date: date
    status: AttendanceStatus


class AttendanceCreate(AttendanceBase):
    employee_id: int = Field(..., gt=0)


class AttendanceResponse(AttendanceBase):
    id: int
    employee_id: int

    class Config:
        orm_mode = True


class AttendanceWithEmployee(AttendanceResponse):
    employee: EmployeeResponse

    class Config:
        orm_mode = True


# Resolve forward references
EmployeeWithAttendance.update_forward_refs()


# -------------------------
# DASHBOARD
# -------------------------

class DashboardSummary(BaseModel):
    total_employees: int
    total_attendance_records: int
    present_today: int
    absent_today: int


# -------------------------
# ERROR RESPONSE
# -------------------------

class ErrorResponse(BaseModel):
    detail: str
