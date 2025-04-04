from pydantic import BaseModel


class AppointmentDesignBase(BaseModel):
    appointment_id: int
    design_id: int


class AppointmenDesigntCreate(AppointmentDesignBase):
    pass
