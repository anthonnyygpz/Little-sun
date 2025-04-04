from src.db.base import Base
from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, func
from sqlalchemy.orm import relationship


class Appointment(Base):
    __tablename__ = "appointments"

    appointment_id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.user_id"))
    client_id = Column(Integer, ForeignKey("clients.client_id"))
    nail_size_id = Column(
        Integer, ForeignKey("sculping_nail_sizes.size_id"), nullable=True
    )
    created_at = Column(DateTime(timezone=True), nullable=False, default=func.now())
    status = Column(String, default="Pending")
    date_appointment = Column(String, nullable=False)
    appointment_time = Column(String, nullable=False)

    # relationship
    nail_service = relationship(
        "src.models.nail_service.NailService",
        secondary="appointment_services",
        back_populates="appointment",
    )
    nail_design = relationship(
        "NailDesign", secondary="appointment_designs", back_populates="appointment"
    )
    client = relationship("Client", back_populates="appointment")
    sculping_size = relationship("SculpingNailSize", back_populates="appointment")
    user = relationship("User", back_populates="appointment")
