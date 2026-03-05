from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List

from db import engine, Base, get_db
from helpers import create_employee, create_attendance
from schemas.schemas import (
    EmployeeCreate, EmployeeResponse, 
    AttendanceCreate, AttendanceResponse
)
from models.models import Employee, Attendance

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="HRMS Lite API",
    description="Lightweight Human Resource Management System",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://hrms-lite-three-orcin.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/", response_model=EmployeeResponse, status_code=status.HTTP_201_CREATED)
def create_new_employee(employee: EmployeeCreate, db: Session = Depends(get_db)):
    
    if db.query(Employee).filter(Employee.employee_id == employee.employee_id).first():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Employee ID already exists"
        )
    if db.query(Employee).filter(Employee.email == employee.email).first():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already exists"
        )
    return create_employee(db=db, employee=employee)



@app.get("/", response_model=List[EmployeeResponse])
def read_employees(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    employees = db.query(Employee).offset(skip).limit(limit).all()
    return employees




@app.delete("/{employee_id}", status_code=status.HTTP_204_NO_CONTENT)
def remove_employee(employee_id: int, db: Session = Depends(get_db)):
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )
        
    db.delete(employee)
    db.commit()
    return None



@app.get("/{employee_id}/attendances", response_model=List[AttendanceResponse])
def read_employee_attendances(employee_id: int, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    attendence = db.query(Attendance).filter(Attendance.employee_id == employee_id).order_by(Attendance.date.desc()).offset(skip).limit(limit).all()
    # present_days = sum(1 for attendance in attendence if attendance.status == 'present')
        
    return attendence




@app.post("/{employee_id}/attendances", response_model=AttendanceResponse)
def mark_attendance(employee_id: int, attendance: AttendanceCreate, db: Session = Depends(get_db)):
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    return create_attendance(db, attendance, employee_id)

# if __name__ == "__main__":
#     uvicorn.run(app, port=8000)
