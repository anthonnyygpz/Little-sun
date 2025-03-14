from src.db.base import Base
from sqlalchemy import Column, DateTime, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func


class Client(Base):
    __tablename__ = "clients"

    client_id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    phone_number = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), nullable=False, default=func.now())

    appointment = relationship("Appointment", back_populates="client")
