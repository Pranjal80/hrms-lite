from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import and_
from datetime import date
from typing import List, Optional

import models
import schemas
from database import get_db

router = APIRouter(prefix="/api", tags=["Attendance"])


# ✅ Mark Attendance
@router.post("/attendance", response_model=schemas.AttendanceResponse)
def mark_attendance(
    attendance: schemas.AttendanceCreate,
    db: Session = Depends(get_db)
):
    # Check if employee exists
    employee = db.query(models.Employee).filter(
        models.Employee.id == attendance.employee_id
    ).first()

    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    # Prevent duplicate same-day attendance
    existing = db.query(models.Attendance).filter(
        and_(
            models.Attendance.employee_id == attendance.employee_id,
            models.Attendance.date == attendance.date
        )
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Attendance already marked for this employee on this date"
        )

    new_attendance = models.Attendance(
        employee_id=attendance.employee_id,
        date=attendance.date,
        status=attendance.status.value
    )

    db.add(new_attendance)
    db.commit()
    db.refresh(new_attendance)

    return new_attendance


# ✅ Get All Attendance (with filters)
@router.get("/attendance", response_model=List[schemas.AttendanceWithEmployee])
def get_attendance(
    employee_id: Optional[int] = Query(None),
    start_date: Optional[date] = Query(None),
    end_date: Optional[date] = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(models.Attendance)

    if employee_id:
        query = query.filter(models.Attendance.employee_id == employee_id)

    if start_date:
        query = query.filter(models.Attendance.date >= start_date)

    if end_date:
        query = query.filter(models.Attendance.date <= end_date)

    records = query.order_by(models.Attendance.date.desc()).all()

    return records


# ✅ Get Attendance For Specific Employee
@router.get(
    "/employees/{employee_id}/attendance",
    response_model=List[schemas.AttendanceResponse]
)
def get_employee_attendance(employee_id: int, db: Session = Depends(get_db)):
    employee = db.query(models.Employee).filter(
        models.Employee.id == employee_id
    ).first()

    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    return employee.attendance_records
