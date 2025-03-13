from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from ..db.base import Base


class NailService(Base):
    __tablename__ = "nail_services"

    service_id = Column(Integer, primary_key=True, autoincrement=True)
    service_name = Column(String, nullable=False)
    base_price = Column(Integer, nullable=False)

    appointment = relationship(
        "Appointment", secondary="appointment_services", back_populates="nail_service"
    )
