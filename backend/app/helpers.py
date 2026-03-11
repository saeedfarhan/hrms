from sqlalchemy.orm import Session
from sqlalchemy import func, and_
from typing import List, Optional
from models.models import Employee, Attendance, AttendanceStatus
from schemas.schemas import EmployeeCreate, AttendanceCreate
from fastapi import HTTPException


def create_employee(db: Session, employee: EmployeeCreate) -> Employee:
    db_employee = Employee(**employee.dict())
    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)
    return db_employee


def create_attendance(db: Session, attendance: AttendanceCreate, employee_id: int) -> Attendance:
    existing = db.query(Attendance).filter(
        and_(
            Attendance.employee_id == employee_id,
            Attendance.date == attendance.date
        )
    ).first()
    
    if existing:
        raise HTTPException(status_code=400, detail="Attendance already marked for this date")
        # raise ValueError("Attendance already marked for this date")
    
    db_attendance = Attendance(**attendance.dict(), employee_id=employee_id)
    db.add(db_attendance)
    db.commit()
    db.refresh(db_attendance)
    return db_attendance

