from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, Field


class AppointmentBase(BaseModel):
    client_name: str = Field(..., min_length=2, max_length=100)
    phone_number: str | None = None
    designs: List[int] = Field(default_factory=List)
    services: List[int] = Field(default_factory=List)
    nail_size_id: int | None = None


class Appointment(AppointmentBase):
    pass
    # @field_validator("designs", "services")
    # def validate_ids(cls, v):
    #     if any(id <= 0 for id in v):
    #         raise ValueError("IDs must be positive integers")
    #     return v


class AppointmentServiceCreate(BaseModel):
    appointment_id: int
    service_id: int


class AppointmenDesigntCreate(BaseModel):
    appointment_id: int
    design_id: int


class AppointmentCreate(BaseModel):
    client_id: int
    nail_size_id: int | None = None


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
