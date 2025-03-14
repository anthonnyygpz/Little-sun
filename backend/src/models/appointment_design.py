from src.db.base import Base
from sqlalchemy import Column, ForeignKey, Integer


class AppointmentDesign(Base):
    __tablename__ = "appointment_designs"

    appointment_id = Column(
        Integer, ForeignKey("appointments.appointment_id"), primary_key=True
    )
    design_id = Column(Integer, ForeignKey("nail_designs.design_id"))
