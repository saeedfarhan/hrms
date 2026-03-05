from pydantic import BaseModel, EmailStr, validator, Field
from datetime import date
from typing import Optional
from enum import Enum

class AttendanceStatus(str, Enum):
    PRESENT = "present"
    ABSENT = "absent"

class EmployeeBase(BaseModel):
    employee_id: str = Field(..., min_length=4, max_length=20)
    full_name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    department: str

class EmployeeCreate(EmployeeBase):
    pass

class EmployeeResponse(EmployeeBase):
    id: int
    
    class Config:
        from_attributes = True

class AttendanceCreate(BaseModel):
    date: date
    status: AttendanceStatus

class AttendanceResponse(BaseModel):
    id: int
    date: date
    status: AttendanceStatus
    employee_id: int
    
    class Config:
        from_attributes = True

# TODO
# class EmployeeWithAttendance(EmployeeResponse):
#     attendances: list[AttendanceResponse] = []
