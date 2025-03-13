from pydantic import BaseModel


class AppointmentServiceBase(BaseModel):
    appointment_id: int | None = None
    service_id: int | None = None


class AppointmentServiceCreate(AppointmentServiceBase):
    pass


class AppointmentServiceUpdate(AppointmentServiceBase):
    pass


class AppointmentServiceResponse(AppointmentServiceBase):
    pass

    class Config:
        from_atributtes = True
