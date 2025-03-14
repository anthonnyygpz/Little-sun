from src.db.base import Base
from sqlalchemy import Column, ForeignKey, Integer


class AppointmentService(Base):
    __tablename__ = "appointment_services"

    appointment_id = Column(
        Integer, ForeignKey("appointments.appointment_id"), primary_key=True
    )
    service_id = Column(
        Integer, ForeignKey("nail_services.service_id"), primary_key=True
    )
