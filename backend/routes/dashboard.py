from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import date

import models
import schemas
from database import get_db

router = APIRouter(prefix="/api", tags=["Dashboard"])


@router.get("/dashboard", response_model=schemas.DashboardSummary)
def get_dashboard_summary(db: Session = Depends(get_db)):

    today = date.today()

    total_employees = db.query(models.Employee).count()

    total_attendance_records = db.query(models.Attendance).count()

    present_today = (
        db.query(models.Attendance)
        .filter(
            models.Attendance.date == today,
            models.Attendance.status == "Present"
        )
        .count()
    )

    absent_today = (
        db.query(models.Attendance)
        .filter(
            models.Attendance.date == today,
            models.Attendance.status == "Absent"
        )
        .count()
    )

    return {
        "total_employees": total_employees,
        "total_attendance_records": total_attendance_records,
        "present_today": present_today,
        "absent_today": absent_today,
    }
