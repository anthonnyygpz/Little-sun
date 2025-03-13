from sqlalchemy import Column, Integer, ForeignKey

from src.db.base import Base


class AppointmentDesign(Base):
    __tablename__ = "appointment_designs"

    appointment_id = Column(
        Integer, ForeignKey("appointments.appointment_id"), primary_key=True
    )
    design_id = Column(Integer, ForeignKey("nail_designs.design_id"))
