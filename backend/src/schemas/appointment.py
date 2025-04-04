from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, Field


class AppointmentBase(BaseModel):
    client_name: str = Field(..., min_length=2, max_length=100)
    phone_number: str | None = None
    nail_size_id: int | None = None
    nail_designs: Optional[List[int]]
    nail_services: Optional[List[int]]
    date_appointment: str
    appointment_time: str


class AppointmentFullCreate(AppointmentBase):
    pass


class AppointmentCreate(BaseModel):
    client_id: int
    user_id: int
    nail_size_id: int | None = None
    nail_designs: Optional[List[int]]
    nail_services: Optional[List[int]]
    date_appointment: str
    appointment_time: str


class AppointmentUpdate(BaseModel):
    client_id: int | None = None
    nail_size_id: int | None = None


class AppointmentFullUpdate(BaseModel):
    appointment_id: int
    client_id: int | None = None
    nail_size_id: int | None = None
    client_name: str | None = None
    phone_number: str | None = None
    size_name: str | None = None
    nail_designs: List[int] | None = None
    nail_serivces: List[int] | None = None
    status: str | None = None


class AppointmentResponse(BaseModel):
    appointment_id: int
    user_id: int
    client_id: int
    nail_size_id: int
    client_name: str
    phone_number: str
    size_name: str
    nail_services: str
    nail_designs: str
    status: str
    created_at: datetime
    total_amount: float

    class Config:
        from_atributtes = True
