from src.db.base import Base
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship


class NailDesign(Base):
    __tablename__ = "nail_designs"

    design_id = Column(Integer, primary_key=True, autoincrement=True)
    design_name = Column(String, nullable=False)
    base_price = Column(Integer, nullable=False)

    appointment = relationship(
        "Appointment", secondary="appointment_designs", back_populates="nail_design"
    )
