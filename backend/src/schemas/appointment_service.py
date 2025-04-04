from pydantic import BaseModel


class AppointmentServiceBase(BaseModel):
    appointment_id: int
    service_id: int


class AppointmentServiceCreate(AppointmentServiceBase):
    pass
